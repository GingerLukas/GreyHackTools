using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace GreyHackTools
{
    public partial class GreyHackCompiler
    {
        internal class Token
        {
            public Token Prev { get; set; }
            public Token Next { get; set; }
            public virtual string Value { get; set; }
            public virtual bool Custom { get; set; }
            public bool Optimizable { get; set; } = true;
            public bool EndStatement { get; set; }

            public override string ToString()
            {
                return Value;
            }

            public virtual Token Optimize(Context context)
            {
                if (Optimizable && //flag from tokenization  
                    Value.Length > 0 &&
                    !char.IsDigit(Value[0]) &&
                    !context.IgnoreOptimize(Value))
                {
                    Value = context.nameProvider.GetReplace(Value);
                }
                return this;
            }

            public virtual Token Compile(Context context, bool force = false)
            {
                if (context.StringBuilder.Length != 0 && Prev != null && !char.IsWhiteSpace(context.StringBuilder[^1]))
                {
                    if (_tokenSpaces[Prev.GetType()][GetType()]) context.StringBuilder.Append(' ');
                }

                context.StringBuilder.Append(Value);
                if (EndStatement && Next != null && !force) context.StringBuilder.Append(_separator);
                return this;
            }

            private bool CompareBeginningOfValue(string s)
            {
                if (s.Length > Value.Length) return false;
                for (int i = 0; i < s.Length; i++)
                {
                    if (Value[i] != s[i]) return false;
                }

                return true;
            }

            public class Keyword : Token
            {
                public Keyword()
                {
                    Optimizable = false;
                }

                public override Token Optimize(Context context)
                {
                    if (Value == "true") Value = "1";
                    if (Value == "false") Value = "0";
                    return base.Optimize(context);
                }
            }

            public class Operator : Variable
            {
                public bool NeedsLeft => _operators.ContainsKey(Value) && _operators[Value].Contains("$a");
                public bool NeedsRight => _operators.ContainsKey(Value) && _operators[Value].Contains("$b");
                public override bool Custom
                {
                    get { return _operators.ContainsKey(Value); }
                    set { }
                }


                public Operator()
                {
                    Optimizable = false;
                }
                public override Token Compile(Context context, bool force = false)
                {
                    if (Custom)
                    {
                        string s = _operators[Value];
                        if (NeedsLeft && Prev != null)
                        {
                            if (Prev is Bracket b && b.IsOpening)
                                throw new Exception($"invalid syntax for template {Value}");
                            context.stringBuilders.Push(new StringBuilder());
                            Prev.Compile(context, true);
                            s = s.Replace("$a", context.StringBuilder.ToString());
                            context.stringBuilders.Pop();

                            if (Prev?.Prev != null)
                            {
                                Prev = Prev.Prev;
                                Prev.Next = this;
                            }
                            else
                            {
                                context.RootToken = this;
                            }
                        }

                        if (NeedsRight && Next != null)
                        {
                            context.stringBuilders.Push(new StringBuilder());
                            Next.Compile(context, true);
                            s = s.Replace("$b", context.StringBuilder.ToString());
                            context.stringBuilders.Pop();
                            EndStatement = Next.EndStatement;
                            if (Next?.Next != null)
                            {
                                Next = Next.Next;
                                Next.Prev = this;
                            }
                            else
                            {
                                Next = null;
                                context.LastToken = this;
                            }
                        }

                        Value = s;

                        return base.Compile(context, force);
                    }
                    else
                    {
                        return base.Compile(context, force);
                    }
                }

                public override string ToString()
                {
                    return $"Operator: {base.ToString()}";
                }
            }

            public class Variable : Token
            {
                public override Token Compile(Context context, bool force = false)
                {
                    if (this is Bracket br && !br.Custom && (br.Value.Length == 0 || br.Value[0] != '{')) return base.Compile(context);
                    
                    if ((Next != null && !_tokenOperators.Contains(Value.First()) && (Next.Value == "." || Next.Value == "(" || Next.Value == "[")))
                    {
                        context.stringBuilders.Push(new StringBuilder());
                        context.StringBuilder.Append(Value);
                        while (Next != null && !_tokenOperators.Contains(Value.First()) && (Next.Value == "." || Next.Value == "(" || Next.Value == "["))
                        {
                            Next.Compile(context, true);
                            if (Next.Value != ".")
                            {
                                Next = Next.Next;
                            }
                            else
                            {
                                Next = Next.Next;
                                Next?.Compile(context, true);
                                Next = Next?.Next;
                            }
                        }

                        if (Next != null)
                        {
                            Next.Prev = this;
                        }
                        else
                        {
                            context.LastToken = this;
                        }
                        Value = context.StringBuilder.ToString();
                        context.stringBuilders.Pop();
                    }

                    if (Next != null && Next is Operator o && o.NeedsLeft)
                    {
                        if (force)
                        {
                            bool b = EndStatement;
                            EndStatement = false;
                            var r = base.Compile(context);
                            EndStatement = b;
                            return r;
                        }
                        else
                        {
                            return this;
                        }
                    }

                    if (Prev != null && Prev is Operator oo && oo.NeedsRight)
                    {
                        if (force)
                        {
                            bool b = EndStatement;
                            EndStatement = false;
                            var r = base.Compile(context);
                            EndStatement = b;
                            return r;
                        }
                        else
                        {
                            return this;
                        }
                    }

                    return base.Compile(context);
                }

                public override string ToString()
                {
                    return $"Variable: {base.ToString()}";
                }
            }

            public class String : Token
            {

                public override Token Compile(Context context, bool force = false)
                {
                    if (Custom)
                    {
                        context.StringBuilder.Append("(\"");
                        int depth = 0;
                        int last = 0;
                        for (int i = 0; i < Value.Length; i++)
                        {
                            if (i + 1 < Value.Length && Value[i] == '\\' &&
                                (Value[i + 1] == '{' || Value[i + 1] == '}'))
                            {
                                i++;
                                context.StringBuilder.Append(Value[i]);
                                continue;
                            }
                            if (Value[i] == '{')
                            {
                                if (depth == 0) last = i + 1;
                                depth++;
                            }

                            else if (Value[i] == '}' && (i == 0 || Value[i - 1] != '\\'))
                            {
                                depth--;
                                if (depth < 0) throw new Exception($"string format ({Value}) is not valid");
                                if (depth == 0)
                                {
                                    context.StringBuilder.Append("\"+(");
                                    Context innerCodeContext = Tokenize(Value.Substring(last, i - last).Replace(@"""""", @""""));
                                    innerCodeContext.nameProvider = context.nameProvider;
                                    string compiled = innerCodeContext.Compile(context.optimizeEnabled);
                                    context.StringBuilder.Append(compiled);
                                    context.StringBuilder.Append(")+\"");
                                }
                            }
                            else if (depth == 0)
                            {
                                context.StringBuilder.Append(Value[i]);
                            }
                        }
                        context.StringBuilder.Append("\")");
                    }
                    else
                    {
                        context.StringBuilder.Append('"');
                        context.StringBuilder.Append(Value);
                        context.StringBuilder.Append('"');
                    }

                    if (EndStatement) context.StringBuilder.Append(_separator);
                    return this;
                }

                public override string ToString()
                {
                    return $"String: {(Custom ? "$" : "")}{base.ToString()}";
                }
            }

            
            
            public class Bracket : Variable
            {
                public bool IsOpening => Value == "(" || Value == "[" || Value == "{";
                public bool IsClosing => Value == ")" || Value == "]" || Value == "}";

                private Dictionary<char, char> _openingToClosing = new Dictionary<char, char>()
                    {{'(', ')'}, {'[', ']'}, {'{', '}'}};
                public Bracket()
                {
                    Optimizable = false;
                }

                private Token CompileInside(Context context,bool includeLastBracket = true,bool customBody = false,string postfix = "")
                {
                    
                    bool b = false;
                    Token last = null;
                    Token node = Next;
                    while (node != null)
                    {
                        if (!customBody)
                        {
                            b = node.EndStatement;
                            node.EndStatement = false;
                        }
                        //check for last bracket before compiling it
                        if (!includeLastBracket && node is Bracket tb && tb.IsClosing &&
                                 tb.Value.Last() == _openingToClosing[Value.Last()])
                        {
                            if (tb.EndStatement && last != null &&
                                                    !last.EndStatement && !last.Value.Contains(_separator))
                            {
                                context.StringBuilder.Append(_separator);
                            }

                            break;
                        }
                        
                        Token tmp = node.Compile(context);
                        if (!customBody) node.EndStatement = b;
                        //checking for last bracket after compile
                        if (node is Bracket br && br.IsClosing) break;
                        last = node;
                        node = tmp.Next;
                    }

                    context.StringBuilder.Append(postfix);
                    Value = context.StringBuilder.ToString();
                    context.stringBuilders.Pop();
                    return node;
                }
                
                public override Token Compile(Context context, bool force = false)
                {
                    if (Custom) return base.Compile(context, force);
                    if (IsOpening)
                    {
                        Token node = Next;
                        context.stringBuilders.Push(new StringBuilder());
                        
                        if (Value == "{" && (Prev is Bracket {Custom: true} || Prev.CompareBeginningOfValue("function")))
                        {
                            if (!EndStatement) EndStatement = true;
                            Token t;
                            string type = "";
                            if (Prev.CompareBeginningOfValue("function"))
                            {
                                type = "function";
                                t = Prev;
                            }
                            else
                            {
                                t = Prev.Prev;
                            }

                            if ((bool) t?.CompareBeginningOfValue("if"))
                            {
                                type = "if";
                                context.StringBuilder.Append(" then");
                            }
                            else if ((bool) t?.CompareBeginningOfValue("for"))
                            {
                                type = "for";
                            }
                            else if ((bool) t?.CompareBeginningOfValue("while"))
                            {
                                type = "while";
                            }

                            if (t.EndStatement||EndStatement) context.StringBuilder.Append(_separator);
                            node = CompileInside(context,false,true,$"end {type}");
                        }
                        else if (Prev is Keyword k && k.Value == "for")
                        {
                            context.StringBuilder.Append(' ');
                            node = CompileInside(context,false);
                        }
                        else
                        {
                            context.StringBuilder.Append(Value);
                            node = CompileInside(context);
                        }
                        
                        Next = node?.Next;
                        if (node != null) EndStatement = node.EndStatement;

                        if (Prev == null)
                        {
                            context.RootToken = this;
                        }
                        else
                        {
                            Prev.Next = this;
                        }

                        if (node == null || node.Next == null)
                        {
                            context.LastToken = this;
                        }
                        else
                        {
                            node.Next.Prev = this;
                        }

                        Custom = true;
                        return Compile(context, force);
                    }
                    else
                    {
                        return base.Compile(context, force);
                    }
                }

                public override string ToString()
                {
                    return $"Bracket: {Value}";
                }
            }

            public class Separator : Token
            {
                public Separator()
                {
                    Optimizable = false;
                }
                public override string ToString()
                {
                    return $"Separator: {Value}";
                }
            }

            public class Include : Token
            {
                public Include()
                {
                    Optimizable = false;
                }

                public override Token Compile(Context context, bool force = false)
                {
                    Value = context.httpClient.GetStringAsync(Value).GetAwaiter().GetResult();
                    return base.Compile(context, force);
                }

                public override string ToString()
                {
                    return $"Include: {base.ToString()}";
                }
            }

            public class Template : Token
            {
                public override string Value
                {
                    get => _value;
                    set
                    {
                        if (_value != null) return;
                        _value = value;
                    }
                }

                private string _value = null;
                public ETemplate TemplateType { get; set; }
                public string RegexString { get; set; }
                public MatchCollection Matches { get; set; }
                public override Token Optimize(Context context)
                {
                    switch (TemplateType)
                    {
                        case ETemplate.IterationIndex:
                            if (Prev != null && Prev.Value == ".")
                            {
                                return base.Optimize(context);
                            }

                            string var_name = Matches[0].Groups[2].Value;
                            if (string.IsNullOrWhiteSpace(var_name) || context.IgnoreOptimize(var_name)) return this;
                            _value = Regex.Replace(Value, RegexString, $"$1{context.nameProvider.GetReplace(var_name)}$3");
                            break;
                        case ETemplate.IgnoreOptimization:
                            break;
                    }
                    return this;
                }

                public override Token Compile(Context context, bool force = false)
                {
                    switch (TemplateType)
                    {
                        case ETemplate.Comment:
                            if ((context.Settings & Settings.RemoveComments) != 0)
                            {
                                if (Prev != null)
                                {
                                    Prev.Next = Next;
                                    if (!Prev.EndStatement)
                                    {
                                        Prev.EndStatement = true;
                                        context.StringBuilder.Append(_separator);
                                    }
                                }
                                else
                                {
                                    context.RootToken = Next;
                                }

                                if (Next != null)
                                {
                                    Next.Prev = Prev;
                                }
                                else
                                {
                                    context.LastToken = Prev;
                                }
                                return this;
                            }
                            break;
                    }

                    return base.Compile(context, force);
                }

                private bool IsValueString()
                {
                    if (Value.Length < 2) return false;
                    return Value[0] == '"' && Value[^1] == '"';
                }

                public Template()
                {

                }
                public Template(ETemplate template, MatchCollection matches, string regex, Context context) : base()
                {
                    TemplateType = template;
                    Matches = matches;
                    RegexString = regex;

                    switch (template)
                    {
                        case ETemplate.IgnoreOptimization:
                            _value = Matches[0].Groups[2].Value;
                            if (IsValueString())
                            {
                                _value = _value.Substring(1, _value.Length - 2);
                                if (!context.IgnoreOptimize(_value)) context.customIgnoreOptimize.Add(_value);
                                _value = '"' + _value + '"';
                            }
                            else
                            {
                                if (!context.IgnoreOptimize(Matches[0].Groups[2].Value)) context.customIgnoreOptimize.Add(Matches[0].Groups[2].Value);
                            }
                            break;
                    }
                }
            }
        }
    }
}

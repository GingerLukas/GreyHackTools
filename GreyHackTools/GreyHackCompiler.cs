using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.RegularExpressions;

namespace GreyHackTools
{
    public class GreyHackCompiler
    {
        #region Settings

        [Flags]
        public enum Settings
        {
            None = 0,
            IgnoreMapVariables = 1,
        }

        #endregion

        #region Internal

        private static HashSet<char> _tokenSeparators = new HashSet<char>() { ' ', '.', ',', ':'};
        private static HashSet<char> _tokenBrackets = new HashSet<char>() { '(', ')', '[', ']', '{', '}', };

        private static HashSet<char> _tokenOperators = new HashSet<char>()
        {
            '+', '-', '*', '/', '%', //standard operators
            '<', '>', '=', '!', //comparators
            '^', '&', '|', //bitwise
        };

        private static HashSet<string> _tokenEndStatements = new HashSet<string>() { "\n","\r\n", ";" };

        private static HashSet<string> _tokenInclude = new HashSet<string>() {"#!"};
        private static HashSet<char> _tokenEndInclude = new HashSet<char>() {'!'};

        private static HashSet<char> _tokenStrings = new HashSet<char>() { '"', '$' };

        private static Dictionary<Type, Dictionary<Type, bool>> _tokenSpaces =
            new Dictionary<Type, Dictionary<Type, bool>>()
            {
                {
                    typeof(Token.Keyword), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), true},
                        {typeof(Token.Operator), false},
                        {typeof(Token.Variable), true},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},
                        {typeof(Token.Template), true},

                    }
                },
                {
                    typeof(Token.Operator), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), false},
                        {typeof(Token.Operator), false},
                        {typeof(Token.Variable), false},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},
                        {typeof(Token.Template), false},

                    }
                },
                {
                    typeof(Token.Variable), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), true},
                        {typeof(Token.Operator), false},
                        {typeof(Token.Variable), true},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},
                        {typeof(Token.Template), true},

                    }
                },
                {
                    typeof(Token.String), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), false},
                        {typeof(Token.Operator), false},
                        {typeof(Token.Variable), false},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},
                        {typeof(Token.Template), false},

                    }
                },
                {
                    typeof(Token.Bracket), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), false},
                        {typeof(Token.Operator), false},
                        {typeof(Token.Variable), false},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},
                        {typeof(Token.Template), false},

                    }
                },
                {
                    typeof(Token.Separator), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), false},
                        {typeof(Token.Operator), false},
                        {typeof(Token.Variable), false},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},
                        {typeof(Token.Template), false},

                    }
                },
                {
                    typeof(Token.Include), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), false},
                        {typeof(Token.Operator), false},
                        {typeof(Token.Variable), false},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},
                        {typeof(Token.Template), false},

                    }
                },
                {
                    typeof(Token.Template), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), true},
                        {typeof(Token.Operator), false},
                        {typeof(Token.Variable), true},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},
                        {typeof(Token.Template), true},

                    }
                },
            };

        private static HashSet<string> _keywords = new HashSet<string>()
        {
            "if", "then", "else", "end", "while", "for", "in", "and", "or", "not", "true", "false", "null", "return",
            "continue", "break", "function", "new", "self"
        };

        private static HashSet<string> _ignoreOptimize = new HashSet<string>()
        {
            "File", "abs", "acos", "active_net_card", "active_user", "aircrack", "airmon", "asin", "atan", "bitwise",
            "bssid_name", "build", "ceil", "change_password", "char", "chmod", "close_program", "code", "command_info",
            "connect_ethernet", "connect_service", "connect_wifi", "content", "copy", "cos", "create_folder",
            "create_group", "create_user", "current_date", "current_path", "decipher", "delete", "delete_group",
            "delete_user", "device_ports", "devices_lan_ip", "dump_lib", "essid_name", "exit", "floor",
            "format_columns", "get_files", "get_folders", "get_lan_ip", "get_ports", "get_router", "get_shell", "group",
            "groups", "hasIndex", "has_permission", "host_computer", "include_lib", "indexOf", "indexes", "is_binary",
            "is_closed", "is_folder", "is_lan_ip", "is_network_active", "is_valid_ip", "join", "lan_ip", "lastIndexOf",
            "launch", "len", "lib_name", "load", "local_ip", "locals", "lower", "md5", "move", "name", "net_use",
            "network_devices", "network_gateway", "nslookup", "overflow", "owner", "parent", "parent_path", "path",
            "permissions", "pi", "ping", "ping_port", "pop", "port_info", "port_number", "print", "program_path",
            "public_ip", "pull", "push", "put", "range", "remove", "rename", "replace", "reverse", "rnd", "round",
            "scan", "scan_address", "scp", "set_content", "set_group", "show_procs", "shuffle", "sign", "sin", "size",
            "slice", "smtp_user_list", "sort", "split", "sqrt", "start_terminal", "str", "sum", "tan", "to_int",
            "touch", "trim", "typeof", "upper", "used_ports", "user_bank_number", "user_input", "user_mail_address",
            "val", "values", "version", "whois", "wifi_networks", "params", 
            
            "__isa",


            "if", "then", "else", "end", "while", "for", "in", "and", "or", "not", "true", "false", "null", "return",
            "continue", "break", "function", "new", "self"
        };

        private static Dictionary<string, string> _operators = new Dictionary<string, string>()
        {
            {"<<", @"bitwise(""<<"",$a,$b)"},
            {">>", @"bitwise("">>"",$a,$b)"},
            {">>>", @"bitwise("">>>"",$a,$b)"},
            {"^^", @"bitwise(""^"",$a,$b)"},
            {"&", @"bitwise(""&"",$a,$b)"},
            {"|", @"bitwise(""|"",$a,$b)"},
            {"++", @"$a=$a+1"},
            {"--", @"$a=$a-1"},
            {"+=", @"$a=$a+$b"},
            {"-=", @"$a=$a-$b"},
            {"*=", @"$a=$a*$b"},
            {"/=", @"$a=$a/$b"},
            {"%=", @"$a=$a%$b"},
        };

        public enum ETemplate
        {
            None,
            IterationIndex,
            IgnoreOptimization,
            TernaryOperator
        }

        private static Dictionary<string,ETemplate> _templates = new Dictionary<string, ETemplate>()
        {
            { @"(__)(.*)(_idx)",ETemplate.IterationIndex }, // __var_idx
            { @"(\\)(\S*)",ETemplate.IgnoreOptimization }, // \exact_var_name

        };

        private static bool IsTemplate(string input,out string regex,out MatchCollection matches, out ETemplate template)
        {
            foreach (KeyValuePair<string, ETemplate> pair in _templates)
            {
                matches = Regex.Matches(input, pair.Key);
                if (matches.Count!=0)
                {
                    regex = pair.Key;
                    template = pair.Value;
                    return true;
                }
            }

            matches = null;
            regex = null;
            template = ETemplate.None;
            return false;
        }

        #endregion

        public static string Compile(string code,bool optimize = false, Settings settings = Settings.None)
        {
            return Tokenize(code,settings).Compile(optimize);
        }

        private static Context Tokenize(string plainCode,Settings settings = Settings.None)
        {
            Context context = new Context(settings){PlainInput = new Queue<char>(plainCode)};

            Token token = null;
            while ((token = GetNextToken(context))!=null)
            {
                if (!context.TokensByValue.ContainsKey(token.Value))
                    context.TokensByValue[token.Value] = new List<Token>();
                context.TokensByValue[token.Value].Add(token);

                context.AddToken(token);
            }

            return context;
        }

        private static void RemoveSpaces(Queue<char> queue)
        {
            while (queue.Count != 0 && char.IsWhiteSpace(queue.Peek()))
            {
                queue.Dequeue();
            }
        }

        private static Func<Context,bool> GetSeparationSelector(Context context, out Token token)
        {
            if (context.MapActive.Peek())
            {
                token = new Token.Separator();

                switch (context.PlainInput.Peek())
                {
                    case ',':
                        context.ShouldOptimizeString.Pop();
                        context.ShouldOptimizeString.Push(!context.Settings.HasFlag(Settings.IgnoreMapVariables));
                        return x => false;
                        break;
                    case ':':
                        context.ShouldOptimizeString.Pop();
                        context.ShouldOptimizeString.Push(false);
                        return x => false;
                        break;
                }

            }

            if (context.PlainInput.Peek() == '\\')
            {
                token = new Token();
                return x=> !_tokenBrackets.Contains(x.PlainInput.Peek()) &&
                           !_tokenSeparators.Contains(x.PlainInput.Peek()) &&
                           !_tokenOperators.Contains(x.PlainInput.Peek()) &&
                           !_tokenEndStatements.Contains(x.PlainInput.Peek().ToString()) &&
                           !_tokenEndStatements.Contains(x.PlainInput.Peek().ToString() + x.PlainInput.Skip(1).FirstOrDefault().ToString());
            }

            if (_tokenInclude.Contains(context.PlainInput.Peek() +
                                       context.PlainInput.Skip(1).FirstOrDefault().ToString())) //include
            {
                token = new Token.Include();
                context.PlainInput.Dequeue();
                context.PlainInput.Dequeue();
                return x =>
                {
                    if (_tokenEndInclude.Contains(x.PlainInput.Peek()))
                    {
                        x.PlainInput.Dequeue();
                        return false;
                    }

                    return true;
                };
            }

            if (_tokenOperators.Contains(context.PlainInput.Peek())) //operator
            {
                token = new Token.Operator();
                return x => _tokenOperators.Contains(x.PlainInput.Peek());
            }
            if (_tokenBrackets.Contains(context.PlainInput.Peek())) //brackets
            {
                token = new Token.Bracket();
                switch (context.PlainInput.Peek())
                {
                    case '(':
                        context.ShouldOptimizeString.Push(false);
                        break;
                    case ')':
                        context.ShouldOptimizeString.Pop();
                        break;
                    case '[':
                        context.ShouldOptimizeString.Push((!(context.LastToken == null ||
                                                             context.LastToken is Token.Operator)) &&
                                                          (context.Settings & Settings.IgnoreMapVariables) == 0);
                        break;
                    case ']':
                        context.ShouldOptimizeString.Pop();
                        break;
                    case '{':
                        context.MapActive.Push(true);
                        context.ShouldOptimizeString.Push((context.Settings & Settings.IgnoreMapVariables) == 0);
                        break;
                    case '}':
                        context.MapActive.Pop();
                        context.ShouldOptimizeString.Pop();
                        break;
                }

                return x => false;
            }
            if (_tokenSeparators.Contains(context.PlainInput.Peek())) //separators
            {
                token = new Token.Separator();
                return x => false;
            }

            if (_tokenStrings.Contains(context.PlainInput.Peek())) //strings
            {
                token = new Token.String();
                token.Optimizable = context.ShouldOptimizeString.Peek();
                if (context.PlainInput.Peek() == '$')
                {
                    token.Custom = true;
                    token.Optimizable = false;
                    context.PlainInput.Dequeue();
                }

                return x =>
                {
                    GetString(x);
                    return false;
                };
            }
            token = new Token.Variable();
            return x => !_tokenBrackets.Contains(x.PlainInput.Peek()) &&
                        !_tokenSeparators.Contains(x.PlainInput.Peek()) &&
                        !_tokenStrings.Contains(x.PlainInput.Peek()) &&
                        !_tokenOperators.Contains(x.PlainInput.Peek()) &&
                        !_tokenEndStatements.Contains(x.PlainInput.Peek().ToString()) &&
                        !_tokenEndStatements.Contains(x.PlainInput.Peek().ToString() + x.PlainInput.Skip(1).FirstOrDefault().ToString());
        }

        private static void GetString(Context context)
        {
            
            while (context.PlainInput.Count>0&&context.PlainInput.Peek()!='"')
            {
                context.StringBuilder.Append(context.PlainInput.Dequeue());
            }

            if (context.PlainInput.Count != 0)
                context.StringBuilder.Append(context.PlainInput.Dequeue());
            if (context.PlainInput.Count > 0 && context.PlainInput.Peek() == '"')
            {
                context.StringBuilder.Append(context.PlainInput.Dequeue());
                GetString(context);
                return;
            }

            context.StringBuilder.Remove(0, 1);
            context.StringBuilder.Remove(context.StringBuilder.Length - 1, 1);
        }
        private static Token GetNextToken(Context context)
        {
            context.StringBuilder.Clear();
            StringBuilder sb = context.StringBuilder;
            RemoveSpaces(context.PlainInput);
            if (context.PlainInput.Count == 0) return null;
            Func<Context,bool> separator = GetSeparationSelector(context, out Token t);
            do
            {
                sb.Append(context.PlainInput.Dequeue());
            } while (context.PlainInput.Count > 0 && separator(context));

            string tmp_value = sb.ToString();
            if (IsTemplate(tmp_value, out string regex,out MatchCollection matches,out ETemplate template))
            {
                t = new Token.Template(template, matches, regex);
            }
            else if (_keywords.Contains(tmp_value) && t is not Token.String)
            {
                t = new Token.Keyword();
            }

            if (t.Optimizable && _ignoreOptimize.Contains(t.Value))
            {
                t.Optimizable = false;
            }

            t.Value = tmp_value;
            while (context.PlainInput.Count > 0 && context.PlainInput.Peek() == ' ') context.PlainInput.Dequeue();
            t.EndStatement = context.PlainInput.Count == 0 || _tokenEndStatements.Contains(context.PlainInput.Peek().ToString() + context.PlainInput.Skip(1).FirstOrDefault().ToString()) || _tokenEndStatements.Contains(context.PlainInput.Peek().ToString());
            

            return t;
        }

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

            public virtual void Optimize(Context context)
            {
                if (Optimizable && //flag from tokenization  
                    (Prev == null || (Prev.Value != "." || (context.Settings & Settings.IgnoreMapVariables) == 0)) && //ignore maps
                    Value.Length > 0 &&
                    !char.IsDigit(Value[0]) &&
                    !_ignoreOptimize.Contains(Value))
                {
                    Value = context.nameProvider.GetReplace(Value);
                }
            }

            public virtual Token Compile(Context context, bool force = false)
            {
                if (context.StringBuilder.Length != 0 && Prev != null && !char.IsWhiteSpace(context.StringBuilder[^1]))
                {
                    if (_tokenSpaces[Prev.GetType()][GetType()]) context.StringBuilder.Append(' ');
                }

                context.StringBuilder.Append(Value);
                if (EndStatement && Next != null && !force) context.StringBuilder.Append(Environment.NewLine);
                return this;
            }

            public class Keyword : Token
            {
                public Keyword()
                {
                    Optimizable = false;
                }
            }

            public class Operator : Token
            {
                public bool NeedsLeft => _operators.ContainsKey(Value) && _operators[Value].Contains("$a");
                public bool NeedsRight => _operators.ContainsKey(Value) && _operators[Value].Contains("$b");
                public override bool Custom
                {
                    get { return _operators.ContainsKey(Value); }
                    set { }
                }

                public bool NeedsValue = false;

                public Operator()
                {
                    Optimizable = false;
                }
                public override Token Compile(Context context, bool force = false)
                {
                    if (Custom)
                    {
                        NeedsValue = true;
                        string s = _operators[Value];
                        if (NeedsLeft&&Prev != null)
                        {
                            context.stringBuilders.Push(new StringBuilder());
                            Prev.Compile(context,true);
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

                        if (NeedsRight&&Next != null)
                        {
                            context.stringBuilders.Push(new StringBuilder());
                            Next.Compile(context,true);
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

                        NeedsValue = false;

                        Value = s;

                        return base.Compile(context,force);
                    }
                    else
                    {
                        return base.Compile(context,force);
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
                    if ((Next != null && (Next.Value == "." || Next.Value == "(")))
                    {
                        context.stringBuilders.Push(new StringBuilder());
                        context.StringBuilder.Append(Value);
                        while (Next != null && (Next.Value == "." || Next.Value == "("))
                        {
                            Next.Compile(context);
                            if (Next.Value != ".")
                            {
                                Next = Next.Next;
                            }
                            else
                            {
                                Next = Next.Next;
                                Next?.Compile(context);
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

                    Token next = Next;
                    //if (next != null && next.Value == ")") next = next.Next;
                    if (next != null && next is Operator o && o.NeedsLeft)
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
                                if (depth == 0) last = i+1;
                                depth++;
                            }

                            else if (Value[i] == '}' && (i == 0 || Value[i - 1] != '\\'))
                            {
                                depth--;
                                if (depth < 0) throw new Exception($"string format ({Value}) is not valid");
                                if (depth == 0)
                                {
                                    context.StringBuilder.Append("\"+(");
                                    Context innerCodeContext = Tokenize(Value.Substring(last, i - last).Replace(@"""""",@""""));
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

                    if (EndStatement) context.StringBuilder.Append(Environment.NewLine);
                    return this;
                }

                public override string ToString()
                {
                    return $"String: {(Custom?"$":"")}{base.ToString()}";
                }
            }

            public class Bracket : Token
            {
                public Bracket()
                {
                    Optimizable = false;
                }
                public override Token Compile(Context context, bool force = false)
                {
                    if (Custom) return base.Compile(context, force);
                    if (Value == "(")
                    {
                        context.stringBuilders.Push(new StringBuilder());
                        context.StringBuilder.Append(Value);
                        
                        //TODO compile inside
                        Token node = Next;
                        while (node!=null)
                        {
                            bool b = node.EndStatement;
                            node.EndStatement = false;
                            Token tmp = node.Compile(context);
                            node.EndStatement = b;
                            if (node.Value == ")") break;
                            node = tmp.Next;
                        }

                        Value = context.StringBuilder.ToString();
                        context.stringBuilders.Pop();
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

                        if (node==null || node.Next == null)
                        {
                            context.LastToken = this;
                        }
                        else
                        {
                            node.Next.Prev = this;
                        }

                        Custom = true;
                        return Compile(context,force);
                    }
                    else
                    {
                        return base.Compile(context,force);
                    }
                }

                public override string ToString()
                {
                    return $"Bracket: {base.ToString()}";
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
                    return $"Separator: {base.ToString()}";
                }
            }

            public class Include : Token
            {
                public Include()
                {
                    Optimizable = false;
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
                public override void Optimize(Context context)
                {
                    switch (TemplateType)
                    {
                        case ETemplate.IterationIndex:
                            if (Prev != null && Prev.Value == ".")
                            {
                                base.Optimize(context);
                                return;
                            }

                            string var_name = Matches[0].Groups[2].Value;
                            if (string.IsNullOrWhiteSpace(var_name) || _ignoreOptimize.Contains(var_name)) return;
                            _value = Regex.Replace(Value, RegexString, $"$1{context.nameProvider.GetReplace(var_name)}$3");
                            break;
                        case ETemplate.IgnoreOptimization:
                            break;
                    }
                }

                private bool IsValueString()
                {
                    if (Value.Length < 2) return false;
                    return Value[0] == '"' && Value[^1] == '"';
                }

                public Template(ETemplate template,MatchCollection matches,string regex) : base()
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
                                if (!_ignoreOptimize.Contains(_value)) _ignoreOptimize.Add(_value);
                                _value = '"'+ _value + '"';
                            }
                            else
                            {
                                if (!_ignoreOptimize.Contains(Matches[0].Groups[2].Value)) _ignoreOptimize.Add(Matches[0].Groups[2].Value);
                            }
                            break;
                    }
                }
            }
        }

        internal class Context
        {
            public Queue<char> PlainInput { get; set; }
            public Token RootToken { get; set; }
            public Token LastToken { get; set; }
            public StringBuilder StringBuilder => stringBuilders.Peek();

            internal Stack<StringBuilder> stringBuilders = new Stack<StringBuilder>();
            internal Stack<bool> ShouldOptimizeString = new Stack<bool>();
            internal Stack<bool> MapActive = new Stack<bool>();
            internal Dictionary<string, List<Token>> TokensByValue = new Dictionary<string, List<Token>> ();
            internal VariableNameProvider nameProvider = new VariableNameProvider();
            internal bool optimizeEnabled = false;
            internal Settings Settings = Settings.None;

            public void AddToken(Token token)
            {
                if (RootToken == null)
                {
                    RootToken = token;
                    LastToken = token;
                }
                else
                {
                    LastToken.Next = token;
                    token.Prev = LastToken;
                    LastToken = token;
                }
            }
            public Context(Settings settings)
            {
                Settings = settings;
                PlainInput = new Queue<char>();

                stringBuilders.Push(new StringBuilder());

                ShouldOptimizeString.Push(false);
                MapActive.Push(false);
            }

            //TODO
            public string Compile(bool optimize = false)
            {
                optimizeEnabled = optimize;
                StringBuilder.Clear();

                Token node;
                if (optimize)
                {
                    node = RootToken;
                    while (node!=null)
                    {
                        node.Optimize(this);
                        node = node.Next;
                    }
                }
                
                node = RootToken;
                while (node != null)
                {
                    node = node.Compile(this).Next;
                }
                

                optimizeEnabled = false;
                return StringBuilder.ToString();
            }
            public override string ToString()
            {
                return StringBuilder.ToString();
                StringBuilder sb = new StringBuilder();
                Token node = RootToken;
                while (node!=null)
                {
                    /*
                    if (node is Token.String)
                        sb.Append('"'+node.Value+ '"');
                    else
                        sb.Append(node.Value);
                    if (node.EndStatement)
                    {
                        sb.Append('\n');
                    }
                    else
                    {
                        sb.Append(' ');
                    }*/

                    sb.AppendLine(node.ToString());
                    node = node.Next;
                }

                return sb.ToString();
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace GreyHackTools
{
    public partial class GreyHackCompiler
    {
        internal partial class Token
        {
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
                public override Token Optimize(Context context, bool replace = true)
                {
                    switch (TemplateType)
                    {
                        case ETemplate.IterationIndex:
                            if (Prev != null && Prev.Value == ".")
                            {
                                return base.Optimize(context, replace);
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

                    if (Prev!=null && Next!=null)
                    {
                        Prev.Next = Next;
                        Next.Prev = Prev;
                        context.StringBuilder.AppendLine(Value);
                    }
                    return this;
                }

                private bool IsValueString()
                {
                    if (Value.Length < 2) return false;
                    return Value[0] == '"' && Value.LastOrDefault() == '"';
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
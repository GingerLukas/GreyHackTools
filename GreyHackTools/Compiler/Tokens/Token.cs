using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace GreyHackTools
{
    public partial class GreyHackCompiler
    {
        internal partial class Token
        {
            public Token Prev { get; set; }
            public Token Next { get; set; }
            public virtual string Value { get; set; }
            public virtual bool Custom { get; set; }
            public bool Optimizable { get; set; } = true;
            private bool _endStatement = false;
            public bool EndStatement { get{
                if (ForceEndStatement)
                {
                    return ForceEndStatementValue;
                }

                return _endStatement;
            }
                set { _endStatement = value; }
            }
            public bool ForceEndStatement { get; set; }
            public bool ForceEndStatementValue { get; set; }

            public override string ToString()
            {
                return Value;
            }

            public virtual Token Optimize(Context context,bool replace = true)
            {
                if (Optimizable && //flag from tokenization  
                    Value.Length > 0 &&
                    !char.IsDigit(Value[0]) &&
                    !context.IgnoreOptimize(Value))
                {
                    if (replace)
                    {
                        Value = context.nameProvider.GetReplace(Value);
                    }
                    else
                    {
                        context.nameProvider.Define(Value);
                    }
                    
                }
                return this;
            }

            public virtual Token Compile(Context context, bool force = false)
            {
                if (string.IsNullOrWhiteSpace(Value)) return this;
                if (context.StringBuilder.Length != 0 &&
                    ((Regex.IsMatch(context.StringBuilder[context.StringBuilder.Length - 1].ToString(), "\\w") &&
                      Value.Length > 0 && Regex.IsMatch(Value[0].ToString(), "\\w")) ||
                     (Prev != null && Prev is Keyword && this is Bracket b && (b.Value.FirstOrDefault() == '(' || b.Value.FirstOrDefault() == '['))))
                {
                    context.StringBuilder.Append(' ');
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

            private bool CompareBeginningOfValue(char c)
            {
                if (Value.Length<1) return false;
                return Value[0] == c;
            }
        }
    }
}


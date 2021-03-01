using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreyHackTools
{
    public partial class GreyHackCompiler
    {
        internal partial class Token
        {
            public class String : Token
            {
                public override async Task<Token> Compile(Context context, bool force = false)
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
                                    Context innerCodeContext =
                                        Tokenize(Value.Substring(last, i - last).Replace(@"""""", @""""),
                                            context.Clone());
                                    string compiled = await innerCodeContext.Compile(context.optimizeEnabled,true);
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

        }
    }
}

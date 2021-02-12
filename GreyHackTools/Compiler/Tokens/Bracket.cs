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

                private Token CompileInside(Context context, bool includeLastBracket = true, bool customBody = false, string postfix = "")
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

                    if (node?.Next == null || node.Next?.Value != "else")
                    {
                        context.StringBuilder.Append(postfix);
                    }
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

                        if (Value == "{" && ((Prev is Bracket b && b.Custom) ||
                                             Prev.CompareBeginningOfValue("function") ||
                                             Prev.Value == "else"))
                        {
                            if (!EndStatement) EndStatement = true;
                            Token t;
                            string type = "";
                            if (Prev.CompareBeginningOfValue("function"))
                            {
                                type = "function";
                                t = Prev;
                            }
                            else if (Prev.Value == "else")
                            {
                                type = "if";
                                t = Prev;
                            }
                            else
                            {
                                t = Prev.Prev;
                            }

                            if (t.CompareBeginningOfValue("if"))
                            {
                                type = "if";
                                context.StringBuilder.Append(" then");
                            }
                            else if (t.CompareBeginningOfValue("for"))
                            {
                                type = "for";
                            }
                            else if (t.CompareBeginningOfValue("while"))
                            {
                                type = "while";
                            }

                            if (t.EndStatement || EndStatement) context.StringBuilder.Append(_separator);
                            node = CompileInside(context, false, true, $"end {type}");
                        }
                        else if (Prev is Keyword k && k.Value == "for")
                        {
                            context.StringBuilder.Append(' ');
                            node = CompileInside(context, false);
                        }
                        else
                        {
                            context.StringBuilder.Append(Value);
                            node = CompileInside(context);
                        }

                        Next = node?.Next;
                        if (node != null)
                            EndStatement = node.EndStatement && !Value.EndsWith(GreyHackCompiler._separator);

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

        }
    }
}
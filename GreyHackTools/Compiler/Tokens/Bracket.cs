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

                private Token CompileInside(Context context, bool multiLine = false, string prefix = "", string postfix = "")
                {
                    Token last = this;
                    Token current = Next;
                    context.stringBuilders.Push(new StringBuilder(prefix));
                    char close = _openingToClosing[Value.First()];

                    while (current!=null)
                    {
                        if (!multiLine)
                        {
                            current.ForceEndStatement = true;
                            current.ForceEndStatementValue = false;
                        }
                        else
                        {
                            current.EndStatement = current.EndStatement || current.Next.CompareBeginningOfValue(close);
                        }
                        
                        last = current;
                        if (current.CompareBeginningOfValue(close)) break;
                        current.Compile(context);
                        current = current.Next;
                    }

                    if (last.Next != null && last.Next.Value == "else" && multiLine)
                    {
                        last.Value = "";
                        last.ForceEndStatement = true;
                        last.ForceEndStatementValue = false;
                    }
                    else if (!string.IsNullOrWhiteSpace(postfix))
                    {
                        last.Value = postfix;
                    }
                    last.ForceEndStatement = true;
                    last.ForceEndStatementValue = false;
                    last.Compile(context);
                    last.ForceEndStatement = false;
                    EndStatement = last.EndStatement;
                    Value = context.StringBuilder.ToString();
                    context.stringBuilders.Pop();
                    return last;
                }
                
                public override Task<Token> Compile(Context context, bool force = false)
                {
                    if (IsOpening)
                    {
                        context.bracketDepth++;
                    }
                    else if(IsClosing)
                    {
                        context.bracketDepth--;
                    }
                    if (Custom) return base.Compile(context, force);
                    if (IsOpening)
                    {
                        Token node = null;

                        if (Prev != null && Value == "{" && Prev.SupportsMultiLineBracket)
                        {
                            string prefix = "";
                            string postfix = "";
                            if (Prev.Value == "else")
                            {
                                postfix = "end if";
                            }
                            else if (Prev.CompareBeginningOfValue("if"))
                            {
                                prefix = "then";
                                postfix = "end if";
                            }
                            else if(Prev.Value == "=>")
                            {
                                postfix = "end function";
                            }
                            else if (Prev.CompareBeginningOfValue("function"))
                            {
                                postfix = "end function";
                            }
                            else if(Prev.CompareBeginningOfValue("for"))
                            {
                                postfix = "end for";
                            }
                            else if (Prev.CompareBeginningOfValue("while"))
                            {
                                postfix = "end while";
                            }

                            node = CompileInside(context, true, prefix+"\n", postfix);
                        }
                        else
                        {
                            node = CompileInside(context,false,Value);
                        }

                        Next = node?.Next;
                        
                        if (Prev == null)
                        {
                            context.RootToken = this;
                        }
                        else
                        {
                            Prev.Next = this;
                        }

                        if (node?.Next == null)
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
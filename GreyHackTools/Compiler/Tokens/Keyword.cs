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
            public class Keyword : Token
            {
                public Keyword()
                {
                    Optimizable = false;
                }

                public override GreyHackCompiler.Token Optimize(GreyHackCompiler.Context context, bool replace = true)
                {
                    if (Value == "true") Value = "1";
                    if (Value == "false") Value = "0";
                    return base.Optimize(context,replace);
                }

                public override Task<Token> Compile(Context context, bool force = false)
                {
                    switch (Value)
                    {
                        case "else":
                            SupportsMultiLineBracket = true;
                            break;
                        case "for":
                        case "while":
                        case "if":
                            CompileNext(context);
                            SupportsMultiLineBracket = true;
                            break;
                        case "function":
                            CompileNext(context,false);
                            SupportsMultiLineBracket = true;
                            break;
                    }
                    return base.Compile(context, force);
                }

                private void CompileNext(Context context,bool removeBracets = true)
                {
                    if (!(Next is Bracket))
                    {
                        return;
                    }
                    context.stringBuilders.Push(new StringBuilder());
                    Next.Compile(context,true);
                    
                    if (removeBracets)
                    {
                        context.StringBuilder[0] = ' ';
                        Value += context.StringBuilder.ToString(0, context.StringBuilder.Length - 1);
                    }
                    else
                    {
                        Value += context.StringBuilder.ToString();
                    }
                    context.stringBuilders.Pop();
                    
                    if (Next.Next!=null)
                    {
                        Next.Next.Prev = this;
                    }

                    EndStatement = Next.EndStatement;
                    Next = Next.Next;
                }
            }
        }
    }
    
}

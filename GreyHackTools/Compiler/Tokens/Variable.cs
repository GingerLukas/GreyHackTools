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
            public class Variable : Token
            {
                public override async Task<Token> Compile(Context context, bool force = false)
                {
                    if (this is Bracket br && !br.Custom && (br.Value.Length == 0 || br.Value[0] != '{'))
                        return await base.Compile(context);

                    if ((Next != null && !_tokenOperators.Contains(Value.First()) &&
                         (Next.Value == "." || Next.Value == "(" || Next.Value == "[")))
                    {
                        context.stringBuilders.Push(new StringBuilder(Value));
                        if (Next.Value == ".")
                        {
                            Next = Next.Next;
                            context.StringBuilder.Append('.');
                        }

                        if (Next!=null)
                        {
                            Next.Compile(context, true);
                            EndStatement = Next.EndStatement;
                            Next = Next.Next;
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
                            return await base.Compile(context, true);
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
                            return await base.Compile(context, true);
                        }
                        else
                        {
                            return this;
                        }
                    }

                    return await base.Compile(context, force);
                }

                public override string ToString()
                {
                    return $"Variable: {base.ToString()}";
                }
            }

        }
    }
}

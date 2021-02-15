using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GreyHackTools.Debugger;

namespace GreyHackTools
{
    public partial class GreyHackCompiler
    {
        internal partial class Token
        {
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
                        long depth = context.bracketDepth;
                        string left = "";
                        string right = "";
                        Token tmpRight = null;
                        Token tmpLeft = null;
                        string s = _operators[Value];
                        if (NeedsLeft && Prev != null)
                        {
                            if (Prev is Bracket b && b.IsOpening)
                                throw new Exception($"invalid syntax for template {Value}");
                            context.stringBuilders.Push(new StringBuilder());
                            tmpLeft = Prev.Compile(context, true);
                            left = context.StringBuilder.ToString();
                            s = s.Replace("$a", left);
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
                            tmpRight = Next.Compile(context, true);
                            right = context.StringBuilder.ToString();
                            s = s.Replace("$b", right);
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

                        if (Value=="=>" && tmpLeft.Prev != null && tmpLeft.Prev.Value != "=")
                        {
                            string name = context.nameProvider.GetFree(context.optimizeEnabled);
                            Value = "@" + name;
                            context.CodePrefix.Append(name);
                            context.CodePrefix.Append("=");
                            context.CodePrefix.AppendLine(s);
                            EndStatement = tmpRight.EndStatement;
                            return base.Compile(context,force);
                        }
                        else
                        {
                            Value = s;

                            return base.Compile(context, force);
                        }
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

        }
    }
}
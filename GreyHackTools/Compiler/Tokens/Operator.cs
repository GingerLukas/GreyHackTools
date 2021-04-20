using System;
using System.Text;

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
                //TODO: change operator templates to Classes derived from StringBuilders for less allocation
                public override void Compile(Context context, bool force = false)
                {
                    if (Custom)
                    {
                        if (Value == "=>")
                        {
                            SupportsMultiLineBracket = true;
                        }
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
                            Prev.Compile(context, true);
                            tmpLeft = Prev;
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
                            Next.Compile(context, true);
                            tmpRight = Next;
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
                            base.Compile(context, force);
                            return; 
                        }
                        else
                        {
                            Value = s;
                            base.Compile(context, force);
                            return; 
                        }
                    }
                    else
                    {
                        base.Compile(context, force);
                        return;
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
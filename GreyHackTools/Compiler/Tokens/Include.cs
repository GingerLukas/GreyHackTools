using System;
using System.Net;
using System.Threading.Tasks;
using WebAssembly;

namespace GreyHackTools
{
    public partial class GreyHackCompiler
    {
        internal partial class Token
        {
            public class Include : Token
            {
                public Include()
                {
                    Optimizable = false;
                }
                
                public override void Compile(Context context, bool force = false)
                {
                    try
                    {
                        if (context.includeToFullPath.ContainsKey(Value))
                        {
                            string fullPath = context.includeToFullPath[Value];
                            if (!context.included.Contains(fullPath))
                            {
                                context.included.Add(fullPath);
                                Value = Tokenize(context.includeToCode[Value], context.Clone(Value)).Compile(context.optimizeEnabled, true);
                            }
                            else
                            {
                                Value = "";
                            }
                        }
                        else
                        {
                            Value = $"//include of \"{Value}\" failed (not found)";
                        }

                    }
                    catch (Exception e)
                    {
                        Value = $"//include of \"{Value}\" failed ({e.Message})";
                    }

                    base.Compile(context, force);
                }

                public override string ToString()
                {
                    return $"Include: {base.ToString()}";
                }
            }

        }
    }
}
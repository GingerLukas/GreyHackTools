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
            public class Include : Token
            {
                public Include()
                {
                    Optimizable = false;
                }

                public override Token Compile(Context context, bool force = false)
                {
#if js

#else
                    if (Environment.OSVersion.Platform == PlatformID.Other)
                    {
                        Value = "//include is not yet implemented in web";
                    }
                    else
                    {
                        Value = context.httpClient.GetStringAsync(Value).GetAwaiter().GetResult();
                    }
#endif


                    return base.Compile(context, force);
                }

                public override string ToString()
                {
                    return $"Include: {base.ToString()}";
                }
            }

        }
    }
}
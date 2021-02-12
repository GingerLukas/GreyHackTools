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

                public override GreyHackCompiler.Token Optimize(GreyHackCompiler.Context context)
                {
                    if (Value == "true") Value = "1";
                    if (Value == "false") Value = "0";
                    return base.Optimize(context);
                }
            }
        }
    }
    
}

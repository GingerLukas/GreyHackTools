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
            public class Separator : Token
            {
                public Separator()
                {
                    Optimizable = false;
                }
                public override string ToString()
                {
                    return $"Separator: {Value}";
                }
            }
        }
    }
}
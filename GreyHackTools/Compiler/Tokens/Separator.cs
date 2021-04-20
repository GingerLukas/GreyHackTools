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
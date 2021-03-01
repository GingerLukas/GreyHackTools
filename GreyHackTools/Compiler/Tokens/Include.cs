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

                public override async Task<Token> Compile(Context context, bool force = false)
                {
                    if (IncludeToCode.ContainsKey(Value))
                    {
                        Value = await Tokenize(IncludeToCode[Value], context.Clone()).Compile(context.optimizeEnabled, true);
                        return await base.Compile(context, force);
                    }


                    Value = $"//include of \"{Value}\" failed";

                    return await base.Compile(context, force);
                }

                public override string ToString()
                {
                    return $"Include: {base.ToString()}";
                }
            }

        }
    }
}
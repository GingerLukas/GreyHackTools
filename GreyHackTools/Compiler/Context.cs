using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GreyHackTools
{
    public partial class GreyHackCompiler
    {
        internal class Context
        {
            public Queue<char> PlainInput { get; set; }
            public Token RootToken { get; set; }
            public Token LastToken { get; set; }
            public StringBuilder StringBuilder => stringBuilders.Peek();

            internal StringBuilder CodePrefix { get; set; }

            internal string directory = "";
            internal string name = "";
            
            internal long bracketDepth = 0;
            internal Stack<StringBuilder> stringBuilders = new Stack<StringBuilder>();
            internal Stack<bool> ShouldOptimizeString = new Stack<bool>();
            internal Stack<bool> MapActive = new Stack<bool>();
            internal HashSet<string> includes = new HashSet<string>();
            internal VariableNameProvider nameProvider = new VariableNameProvider();
            internal bool optimizeEnabled = false;
            internal Settings Settings = Settings.None;
            internal HashSet<string> customIgnoreOptimize = new HashSet<string>();
            internal Dictionary<string, string> includeToCode = new Dictionary<string, string>();
            internal HashSet<string> included = new HashSet<string>();
            internal Dictionary<string, string> includeToFullPath = new Dictionary<string, string>();

            public Context(Settings settings,string dir,string includeName)
            {
                directory = dir;
                name = includeName;
                Settings = settings;
                PlainInput = new Queue<char>();

                stringBuilders.Push(new StringBuilder());
                CodePrefix = new StringBuilder();

                ShouldOptimizeString.Push(false);
                MapActive.Push(false);
            }

            public Context Clone(string name)
            {
                int index = name.LastIndexOfAny(new char[] {'\\', '/'});
                string dir = (directory + '/' + name.Substring(0, index)).Replace('\\', '/').Replace("//", "/");
                name = this.name.Substring(index);
                return new Context(Settings, dir, name)
                {
                    nameProvider = nameProvider,
                    CodePrefix = CodePrefix,
                    includes = includes,
                    customIgnoreOptimize = customIgnoreOptimize,
                    includeToCode = includeToCode,
                    included = included,
                    includeToFullPath = includeToFullPath,
                };
            }

            public bool IgnoreOptimize(string value) => _ignoreOptimize.Contains(value) || customIgnoreOptimize.Contains(value);

            public void AddToken(Token token)
            {
                if (token is Token.Include && !includes.Contains(token.Value))
                {
                    includes.Add(token.Value);
                }
                if (RootToken == null)
                {
                    RootToken = token;
                    LastToken = token;
                }
                else
                {
                    LastToken.Next = token;
                    token.Prev = LastToken;
                    LastToken = token;
                }
            }
            
            
            public string Compile(bool optimize = false,bool ignorePrefix = false)
            {
                optimizeEnabled = optimize;
                StringBuilder.Clear();
                
                CompileTokens(optimize);
                
                return GetResultCode(ignorePrefix);
            }

            public string[] GetIncludes()
            {
                return includes.ToArray();
            }

            private string GetResultCode(bool ignorePrefix)
            {
                optimizeEnabled = false;
                if (ignorePrefix)
                {
                    return StringBuilder.ToString();
                }
                CodePrefix.Append(StringBuilder.ToString());
                return CodePrefix.ToString();
            }
            
            private void CompileTokens(bool optimize)
            {
                Token node;
                node = RootToken;
                while (node != null)
                {
                    node = node.Optimize(this, optimize).Next;
                }

                node = RootToken;
                while (node != null)
                {
                    node.Compile(this);
                    node = node.Next;
                }
            }
            
            public override string ToString()
            {
                return StringBuilder.ToString();
                StringBuilder sb = new StringBuilder();
                Token node = RootToken;
                while (node != null)
                {
                    /*
                    if (node is Token.String)
                        sb.Append('"'+node.Value+ '"');
                    else
                        sb.Append(node.Value);
                    if (node.EndStatement)
                    {
                        sb.Append('\n');
                    }
                    else
                    {
                        sb.Append(' ');
                    }*/

                    sb.AppendLine(node.ToString());
                    node = node.Next;
                }

                return sb.ToString();
            }
        }
    }

    public class Ref<T>
    {
        public T Value { get; set; }

        public Ref(T value)
        {
            Value = value;
        }
    }
}

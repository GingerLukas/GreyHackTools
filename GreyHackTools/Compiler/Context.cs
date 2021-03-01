using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            
            internal long bracketDepth = 0;
            internal Stack<StringBuilder> stringBuilders = new Stack<StringBuilder>();
            internal Stack<bool> ShouldOptimizeString = new Stack<bool>();
            internal Stack<bool> MapActive = new Stack<bool>();
            internal HashSet<string> includes = new HashSet<string>();
            internal VariableNameProvider nameProvider = new VariableNameProvider();
            internal bool optimizeEnabled = false;
            internal Settings Settings = Settings.None;
            internal HashSet<string> customIgnoreOptimize = new HashSet<string>();

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
            public Context(Settings settings)
            {
                Settings = settings;
                PlainInput = new Queue<char>();

                stringBuilders.Push(new StringBuilder());
                CodePrefix = new StringBuilder();

                ShouldOptimizeString.Push(false);
                MapActive.Push(false);
            }

            public Context Clone()
            {
                return new Context(Settings) {nameProvider = nameProvider, CodePrefix = CodePrefix,includes = includes,customIgnoreOptimize = customIgnoreOptimize};
            }
            
            public async Task<string> Compile(bool optimize = false,bool ignorePrefix = false)
            {
                optimizeEnabled = optimize;
                StringBuilder.Clear();
                
                Ref<int> counter = new Ref<int>(0);
                foreach (string include in includes)
                {
                    if (!IncludeToCode.ContainsKey(include))
                    {
                        if (OnInclude!=null)
                        {
                            counter.Value++;
                            OnInclude.Invoke(include, IncludeToCode, counter);
                        }
                        
                        
                    }
                }

                while (counter.Value!=0)
                {
                    await Task.Delay(200);
                }
                
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
            
            private async void CompileTokens(bool optimize)
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
                    node = (await node.Compile(this)).Next;
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

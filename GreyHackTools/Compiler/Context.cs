﻿using System;
using System.Collections.Generic;
using System.Net.Http;
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

            internal Stack<StringBuilder> stringBuilders = new Stack<StringBuilder>();
            internal Stack<bool> ShouldOptimizeString = new Stack<bool>();
            internal Stack<bool> MapActive = new Stack<bool>();
            internal VariableNameProvider nameProvider = new VariableNameProvider();
            internal bool optimizeEnabled = false;
            internal Settings Settings = Settings.None;
            internal HashSet<string> customIgnoreOptimize = new HashSet<string>();
#if js

#else
            internal HttpClient httpClient = new HttpClient();
#endif
            public bool IgnoreOptimize(string value) => _ignoreOptimize.Contains(value) || customIgnoreOptimize.Contains(value);

            public void AddToken(Token token)
            {
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

                ShouldOptimizeString.Push(false);
                MapActive.Push(false);
            }

            public string Compile(bool optimize = false)
            {
                optimizeEnabled = optimize;
                StringBuilder.Clear();
                
                

                Token node;
                if (optimize)
                {
                    node = RootToken;
                    while (node != null)
                    {
                        node = node.Optimize(this).Next;
                    }
                }

                node = RootToken;
                while (node != null)
                {
                    node = node.Compile(this).Next;
                }




                optimizeEnabled = false;
                return StringBuilder.ToString();
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
}

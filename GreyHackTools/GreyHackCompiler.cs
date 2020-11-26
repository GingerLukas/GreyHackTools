using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;

namespace GreyHackTools
{
    public class GreyHackCompiler
    {
        #region Internal

        private static HashSet<char> _tokenSeparators = new HashSet<char>() { ' ', '.', ',', ':'};
        private static HashSet<char> _tokenBrackets = new HashSet<char>() { '(', ')', '[', ']', '{', '}', };

        private static HashSet<char> _tokenOperators = new HashSet<char>()
        {
            '+', '-', '*', '/', '%', //standard operators
            '<', '>', '=', '!', //comparators
            '^', '&', '|', //bitwise
        };

        private static HashSet<string> _tokenEndStatements = new HashSet<string>() { "\n","\r\n", ";" };

        private static HashSet<string> _tokenInclude = new HashSet<string>() {"#!"};
        private static HashSet<char> _tokenEndInclude = new HashSet<char>() {'!'};

        private static HashSet<char> _tokenStrings = new HashSet<char>() { '"', '$' };

        private static Dictionary<Type, Dictionary<Type, bool>> _tokenSpaces =
            new Dictionary<Type, Dictionary<Type, bool>>()
            {
                {
                    typeof(Token.Keyword), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), true},
                        {typeof(Token.Operator), false},
                        {typeof(Token.Variable), true},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},

                    }
                },
                {
                    typeof(Token.Operator), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), false},
                        {typeof(Token.Operator), true},
                        {typeof(Token.Variable), false},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},

                    }
                },
                {
                    typeof(Token.Variable), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), true},
                        {typeof(Token.Operator), false},
                        {typeof(Token.Variable), true},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},

                    }
                },
                {
                    typeof(Token.String), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), true},
                        {typeof(Token.Operator), false},
                        {typeof(Token.Variable), false},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},

                    }
                },
                {
                    typeof(Token.Bracket), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), false},
                        {typeof(Token.Operator), false},
                        {typeof(Token.Variable), false},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},

                    }
                },
                {
                    typeof(Token.Separator), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), false},
                        {typeof(Token.Operator), false},
                        {typeof(Token.Variable), false},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},

                    }
                },
                {
                    typeof(Token.Include), new Dictionary<Type, bool>()
                    {
                        {typeof(Token.Keyword), false},
                        {typeof(Token.Operator), false},
                        {typeof(Token.Variable), false},
                        {typeof(Token.String), false},
                        {typeof(Token.Bracket), false},
                        {typeof(Token.Separator), false},
                        {typeof(Token.Include), false},

                    }
                },
            };

        private static HashSet<string> _keywords = new HashSet<string>()
        {
            "if", "then", "else", "end", "while", "for", "in", "and", "or", "not", "true", "false", "null", "return",
            "continue", "break", "function", "new", "self"
        };

        private static HashSet<string> _ignoreOptimize = new HashSet<string>()
        {
            "File", "abs", "acos", "active_net_card", "active_user", "aircrack", "airmon", "asin", "atan", "bitwise",
            "bssid_name", "build", "ceil", "change_password", "char", "chmod", "close_program", "command_info",
            "connect_ethernet", "connect_service", "connect_wifi", "content", "copy", "cos", "create_folder",
            "create_group", "create_user", "current_date", "current_path", "decipher", "delete", "delete_group",
            "delete_user", "device_ports", "devices_lan_ip", "dump_lib", "essid_name", "exit", "floor",
            "format_columns", "get_files", "get_folders", "get_lan_ip", "get_ports", "get_router", "get_shell", "group",
            "groups", "hasIndex", "has_permission", "host_computer", "include_lib", "indexOf", "indexes", "is_binary",
            "is_closed", "is_folder", "is_lan_ip", "is_network_active", "is_valid_ip", "join", "lan_ip", "lastIndexOf",
            "launch", "len", "lib_name", "load", "local_ip", "locals", "lower", "md5", "move", "name", "net_use",
            "network_devices", "network_gateway", "nslookup", "overflow", "owner", "parent", "parent_path", "path",
            "permissions", "pi", "ping", "ping_port", "pop", "port_info", "port_number", "print", "program_path",
            "public_ip", "pull", "push", "put", "range", "remove", "rename", "replace", "reverse", "rnd", "round",
            "scan", "scan_address", "scp", "set_content", "set_group", "show_procs", "shuffle", "sign", "sin", "size",
            "slice", "smtp_user_list", "sort", "split", "sqrt", "start_terminal", "str", "sum", "tan", "to_int",
            "touch", "trim", "typeof", "upper", "used_ports", "user_bank_number", "user_input", "user_mail_address",
            "val", "values", "version", "whois", "wifi_networks",


            "if", "then", "else", "end", "while", "for", "in", "and", "or", "not", "true", "false", "null", "return", "continue", "break", "function", "new", "self"
        };

        private static Dictionary<string, string> _operators = new Dictionary<string, string>()
        {
            {"<<", @"bitwise(""<<"",$a,$b)"},
            {">>", @"bitwise("">>"",$a,$b)"},
            {"++", @"$a=$a+1"},
            {"--", @"$a=$a-1"},
            {"+=", @"$a=$a+$b"},
            {"-=", @"$a=$a-$b"},
            {"*=", @"$a=$a*$b"},
            {"/=", @"$a=$a/$b"},
            {"%=", @"$a=$a%$b"},
        };

        #endregion

        public static string Compile(string code,bool optimize = false)
        {
            return Tokenize(code).Compile(optimize);
        }

        private static Context Tokenize(string plainCode)
        {
            Context context = new Context(){PlainInput = new Queue<char>(plainCode)};

            Token token = null;
            while ((token = GetNextToken(context))!=null)
            {
                if (!context.TokensByValue.ContainsKey(token.Value))
                    context.TokensByValue[token.Value] = new List<Token>();
                context.TokensByValue[token.Value].Add(token);

                context.AddToken(token);
            }

            return context;
        }

        private static void RemoveSpaces(Queue<char> queue)
        {
            while (queue.Count != 0 && char.IsWhiteSpace(queue.Peek()))
            {
                queue.Dequeue();
            }
        }

        private static Func<Context,bool> GetSeparationSelector(Context context, out Token token)
        {
            if (context.MapActive.Peek())
            {
                token = new Token.Separator();

                switch (context.PlainInput.Peek())
                {
                    case ',':
                        context.ShouldOptimizeString.Pop();
                        context.ShouldOptimizeString.Push(true);
                        return x => false;
                        break;
                    case ':':
                        context.ShouldOptimizeString.Pop();
                        context.ShouldOptimizeString.Push(false);
                        return x => false;
                        break;
                }

            }

            if (_tokenInclude.Contains(context.PlainInput.Peek() +
                                       context.PlainInput.Skip(1).FirstOrDefault().ToString()))
            {
                token = new Token.Include();
                context.PlainInput.Dequeue();
                context.PlainInput.Dequeue();
                return x =>
                {
                    if (_tokenEndInclude.Contains(x.PlainInput.Peek()))
                    {
                        x.PlainInput.Dequeue();
                        return false;
                    }

                    return true;
                };
            }

            if (_tokenOperators.Contains(context.PlainInput.Peek())) //operator
            {
                token = new Token.Operator();
                return x => _tokenOperators.Contains(x.PlainInput.Peek());
            }
            if (_tokenBrackets.Contains(context.PlainInput.Peek())) //brackets
            {
                token = new Token.Bracket();
                switch (context.PlainInput.Peek())
                {
                    case '(':
                        context.ShouldOptimizeString.Push(false);
                        break;
                    case ')':
                        context.ShouldOptimizeString.Pop();
                        break;
                    case '[':
                        context.ShouldOptimizeString.Push(true);
                        break;
                    case ']':
                        context.ShouldOptimizeString.Pop();
                        break;
                    case '{':
                        context.MapActive.Push(true);
                        context.ShouldOptimizeString.Push(true);
                        break;
                    case '}':
                        context.MapActive.Pop();
                        context.ShouldOptimizeString.Pop();
                        break;
                }

                return x => false;
            }
            if (_tokenSeparators.Contains(context.PlainInput.Peek())) //separators
            {
                token = new Token.Separator();
                return x => false;
            }

            if (_tokenStrings.Contains(context.PlainInput.Peek())) //strings
            {
                token = new Token.String();
                token.Optimizable = context.ShouldOptimizeString.Peek();
                if (context.PlainInput.Peek() == '$')
                {
                    token.Custom = true;
                    context.PlainInput.Dequeue();
                }
                context.PlainInput.Dequeue();
                if (EndOfString(context))
                {
                    return x =>
                    {
                        context.StringBuilder.Clear();
                        return false;
                    };
                }
                return x =>
                {
                    if (!EndOfString(context))
                    {
                        return true;
                    }

                    x.PlainInput.Dequeue();
                    return false;
                };
            }
            token = new Token.Variable();
            return x => !_tokenBrackets.Contains(x.PlainInput.Peek()) &&
                        !_tokenSeparators.Contains(x.PlainInput.Peek()) &&
                        !_tokenStrings.Contains(x.PlainInput.Peek()) &&
                        !_tokenOperators.Contains(x.PlainInput.Peek()) &&
                        !_tokenEndStatements.Contains(x.PlainInput.Peek().ToString()) &&
                        !_tokenEndStatements.Contains(x.PlainInput.Peek().ToString() + x.PlainInput.Skip(1).FirstOrDefault().ToString());
        }

        private static bool EndOfString(Context context)
        {
            return !(context.PlainInput.Peek() != '"' || context.PlainInput.Skip(1).FirstOrDefault() == '"');
        }

        private static Token GetNextToken(Context context)
        {
            context.StringBuilder.Clear();
            StringBuilder sb = context.StringBuilder;
            RemoveSpaces(context.PlainInput);
            if (context.PlainInput.Count == 0) return null;
            Func<Context,bool> separator = GetSeparationSelector(context, out Token t);
            do
            {
                sb.Append(context.PlainInput.Dequeue());
            } while (context.PlainInput.Count > 0 && separator(context));

            string tmp_value = sb.ToString();
            if (_keywords.Contains(tmp_value))
            {
                t = new Token.Keyword();
                t.Optimizable = false;
            }
            else if (t.Optimizable && _ignoreOptimize.Contains(t.Value))
            {
                t.Optimizable = false;
            }

            t.Value = tmp_value;
            t.EndStatement = context.PlainInput.Count == 0 || _tokenEndStatements.Contains(context.PlainInput.Peek().ToString() + context.PlainInput.Skip(1).FirstOrDefault().ToString());
            

            return t;
        }

        internal class Token
        {
            public Token Prev { get; set; }
            public Token Next { get; set; }
            public string Value { get; set; }
            public virtual bool Custom { get; set; }
            public bool Optimizable { get; set; } = true;
            public bool EndStatement { get; set; }

            public override string ToString()
            {
                return Value;
            }

            public virtual void Optimize(Context context)
            {

            }

            public virtual Token Compile(Context context)
            {
                if ((Next != null && Next.Value == "."))
                {
                    context.stringBuilders.Push(new StringBuilder());
                    context.StringBuilder.Append(Value);
                    while (Next != null && Next.Value == ".")
                    {
                        Next.Compile(context);
                        Next = Next.Next;
                        Next?.Compile(context);
                        Next = Next?.Next;
                    }

                    Next.Prev = this;
                    Value = context.StringBuilder.ToString();
                    context.stringBuilders.Pop();
                }
                
                if (context.StringBuilder.Length != 0 && Prev != null && !char.IsWhiteSpace(context.StringBuilder[^1]))
                {
                    if (_tokenSpaces[Prev.GetType()][GetType()]) context.StringBuilder.Append(' ');
                }

                context.StringBuilder.Append(Value);
                if (EndStatement && Next != null) context.StringBuilder.Append('\n');
                return this;
            }

            public class Keyword : Token
            {/*
                public override Token Compile(Context context)
                {
                    if (!(Prev == null || Prev.EndStatement || Prev is Keyword))
                    {
                        context.StringBuilder.Append(' ');
                    }

                    context.StringBuilder.Append(Value);
                    if (Next != null)
                    {
                        if (EndStatement)
                        {
                            context.StringBuilder.Append('\n');
                        }
                        else
                        {
                            context.StringBuilder.Append(' ');
                        }
                    }

                    return this;
                }*/
            }

            public class Operator : Token
            {
                public bool NeedsLeft => _operators.ContainsKey(Value) && _operators[Value].Contains("$a");
                public bool NeedsRight => _operators.ContainsKey(Value) && _operators[Value].Contains("$b");
                public override bool Custom
                {
                    get { return _operators.ContainsKey(Value); }
                    set { }
                }

                public bool NeedsValue = false;

                public Operator()
                {
                    Optimizable = false;
                }
                public override Token Compile(Context context)
                {
                    if (Custom)
                    {
                        NeedsValue = true;
                        string s = _operators[Value];
                        if (NeedsLeft&&Prev != null)
                        {
                            context.stringBuilders.Push(new StringBuilder());
                            Prev.Compile(context);
                            s = s.Replace("$a", context.StringBuilder.ToString());
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

                        if (NeedsRight&&Next != null)
                        {
                            context.stringBuilders.Push(new StringBuilder());
                            Next.Compile(context);
                            s = s.Replace("$b", context.StringBuilder.ToString());
                            context.stringBuilders.Pop();
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

                        NeedsValue = false;

                        Value = s;

                        return Compile(context);
                    }
                    else
                    {
                        return base.Compile(context);
                    }
                }

                public override string ToString()
                {
                    return $"Operator: {base.ToString()}";
                }
            }

            public class Variable : Token
            {
                public override Token Compile(Context context)
                {
                    if (Next != null && Next is Operator o && o.NeedsLeft)
                    {
                        return o.NeedsValue ? base.Compile(context) : this;
                    }

                    if (Prev != null && Prev is Operator oo && oo.NeedsRight)
                    {
                        return oo.NeedsValue ? base.Compile(context) : this;
                    }

                    return base.Compile(context);
                }

                public override string ToString()
                {
                    return $"Variable: {base.ToString()}";
                }
            }

            public class String : Token
            {
                public override Token Compile(Context context)
                {
                    if (Custom)
                    {
                        context.StringBuilder.Append("(\"");
                        int depth = 0;
                        int last = 0;
                        for (int i = 0; i < Value.Length; i++)
                        {
                            if (Value[i] == '{')
                            {
                                if (depth == 0) last = i+1;
                                depth++;
                            }

                            else if (Value[i] == '}')
                            {
                                depth--;
                                if (depth<0) throw new Exception($"string format ({Value}) is not valid");
                                if (depth == 0)
                                {
                                    context.StringBuilder.Append("\"+(");
                                    context.StringBuilder.Append(GreyHackCompiler.Compile(Value.Substring(last, i - last), context.optimizeEnabled));
                                    context.StringBuilder.Append(")+\"");
                                }
                            }
                            else if (depth == 0)
                            {
                                context.StringBuilder.Append(Value[i]);
                            }
                        }
                        context.StringBuilder.Append("\")");
                    }
                    else
                    {
                        context.StringBuilder.Append("\"");
                        context.StringBuilder.Append(Value);
                        context.StringBuilder.Append("\"");
                    }

                    if (EndStatement) context.StringBuilder.Append('\n');
                    return this;
                }

                public override string ToString()
                {
                    return $"String: {(Custom?"$":"")}\"{base.ToString()}\"";
                }
            }

            public class Bracket : Token
            {
                public Bracket()
                {
                    Optimizable = false;
                }
                public override Token Compile(Context context)
                {
                    if (Value == "(")
                    {
                        context.stringBuilders.Push(new StringBuilder());
                        context.StringBuilder.Append(Value);
                        
                        //TODO compile inside
                        Token node = Next;
                        while (node!=null)
                        {
                            Token tmp = node.Compile(context);
                            if (node.Value == ")") break;
                            node = tmp.Next;
                        }

                        Value = context.StringBuilder.ToString();

                        StringBuilder tmp_sb = context.StringBuilder;
                        context.stringBuilders.Pop();
                        context.StringBuilder.Append(tmp_sb);

                        if (node?.Next != null)
                        {
                            Next = node.Next;
                            node.Next.Prev = this;
                        }
                        else
                        {
                            context.LastToken = this;
                            this.Next = null;
                        }

                        return this;
                    }
                    else
                    {
                        return base.Compile(context);
                    }
                }

                public override string ToString()
                {
                    return $"Bracket: {base.ToString()}";
                }
            }

            public class Separator : Token
            {
                public override string ToString()
                {
                    return $"Separator: {base.ToString()}";
                }
            }

            public class Include : Token
            {
                public override string ToString()
                {
                    return $"Include: {base.ToString()}";
                }
            }
        }

        internal class Context
        {
            public Queue<char> PlainInput { get; set; }
            public Token RootToken { get; set; }
            public Token LastToken { get; set; }
            public StringBuilder StringBuilder => stringBuilders.Peek();

            internal Stack<StringBuilder> stringBuilders = new Stack<StringBuilder>();
            internal Stack<bool> ShouldOptimizeString = new Stack<bool>();
            internal Stack<bool> MapActive = new Stack<bool>();
            internal Dictionary<string, List<Token>> TokensByValue = new Dictionary<string, List<Token>> ();
            internal bool optimizeEnabled = false;

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
            public Context()
            {
                PlainInput = new Queue<char>();

                stringBuilders.Push(new StringBuilder());

                ShouldOptimizeString.Push(false);
                MapActive.Push(false);
            }

            //TODO
            public string Compile(bool optimize = false)
            {
                optimizeEnabled = optimize;
                StringBuilder.Clear();

                if (optimize)
                {
                    Token node = RootToken;
                    while (node!=null)
                    {
                        node.Optimize(this);
                        node = node.Compile(this).Next;
                    }
                }
                else
                {
                    Token node = RootToken;
                    while (node != null)
                    {
                        node = node.Compile(this).Next;
                    }
                }

                optimizeEnabled = false;
                return StringBuilder.ToString();
            }
            public override string ToString()
            {
                StringBuilder sb = new StringBuilder();
                Token node = RootToken;
                while (node!=null)
                {
                    sb.Append(node.Value);
                    if (node.EndStatement)
                    {
                        sb.Append('\n');
                    }
                    else
                    {
                        sb.Append(' ');
                    }
                    node = node.Next;
                }

                return sb.ToString();
            }
        }
    }
}

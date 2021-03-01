using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace GreyHackTools
{
    public partial class GreyHackCompiler
    {
        #region Settings

        [Flags]
        public enum Settings
        {
            None = 0,
            IgnoreMapVariables = 1,
            RemoveComments = 2,
        }

        #endregion

        #region Internal

        private static string _separator = Environment.NewLine;
        //private static string _separator = ";";
        private static readonly HashSet<char> _tokenSeparators = new HashSet<char>() { ' ', '.', ',', ':','\t' };
        private static readonly HashSet<char> _tokenBrackets = new HashSet<char>() { '(', ')', '[', ']', '{', '}', };
        private static readonly HashSet<char> _tokenOperators = new HashSet<char>()
        {
            '+', '-', '*', '/', '%', //standard operators
            '<', '>', '=', '!', //comparators
            '^', '&', '|', //bitwise
            '@','~'
        };

        private static readonly HashSet<string> _tokenEndStatements = new HashSet<string>() { "\n", "\r\n", ";" ,"}"};

        private static readonly HashSet<string> _tokenInclude = new HashSet<string>() { "#!" };
        private static readonly HashSet<char> _tokenEndInclude = new HashSet<char>() { '!' };

        private static readonly HashSet<char> _tokenStrings = new HashSet<char>() { '"', '$' };

        private static readonly HashSet<string> _keywords = new HashSet<string>()
        {
            "if", "then", "else", "end", "while", "for", "in", "and", "or", "not", "true", "false",  "return",
            "continue", "break",  "new","function"
        };

        private static readonly HashSet<string> _ignoreOptimize = new HashSet<string>()
        {
            "File", "abs", "acos", "active_net_card", "active_user", "aircrack", "airmon", "asin", "atan", "bitwise",
            "bssid_name", "build", "ceil", "change_password", "char", "chmod", "close_program", "code", "command_info",
            "connect_ethernet", "connect_service", "connect_wifi", "copy", "cos", "create_folder",
            "create_group", "create_user", "current_date", "current_path", "decipher", "delete", "delete_group",
            "delete_user", "device_ports", "devices_lan_ip", "dump_lib", "essid_name", "exit", "floor",
            "format_columns", "get_files", "get_folders", "get_lan_ip", "get_ports", "get_router", "get_shell","globals", "group",
            "groups", "hasIndex", "has_permission", "host_computer", "include_lib", "indexOf", "indexes", "is_binary",
            "is_closed", "is_folder", "is_lan_ip", "is_network_active", "is_valid_ip", "join",  "lastIndexOf",
            "launch", "len", "lib_name", "load", "local_ip", "locals", "lower", "md5", "move", "name", "net_use",
            "network_devices", "network_gateway", "nslookup", "overflow", "owner", "parent", "parent_path", "path",
            "permissions", "pi", "ping", "ping_port", "pop", "port_info", "port_number", "print", "program_path",
            "public_ip", "pull", "push", "put", "range", "remove", "rename", "replace", "reverse", "rnd", "round",
            "scan", "scan_address", "scp", "set_content", "set_group", "show_procs", "shuffle", "sign", "sin", "size",
            "slice", "smtp_user_list", "sort", "split", "sqrt", "start_terminal", "str", "sum", "tan", "to_int",
            "touch", "trim", "typeof", "upper", "used_ports", "user_bank_number", "user_input", "user_mail_address",
            "val", "values", "version", "whois", "wifi_networks", "params", "clear_screen", "wait",

            "self","null","function",

            "content",
            "lan_ip",

            "get_content",

            "aireplay",
            "firewall_rules",
            "kernel_version",
            "kernel_version",
            "rshell_server",
            "rshell_server",



            "__isa",


            "if", "then", "else", "end", "while", "for", "in", "and", "or", "not", "true", "false", "null", "return",
            "continue", "break", "function", "new", "self"
        };



        private static readonly Dictionary<string, string> _operators = new Dictionary<string, string>()
        {
            { "&&", @" and " },
            { "||", @" or " },
            { "<<", @"bitwise(""<<"",$a,$b)"},
            {">>", @"bitwise("">>"",$a,$b)"},
            {">>>", @"bitwise("">>>"",$a,$b)"},
            {"^^", @"bitwise(""^"",$a,$b)"},
            {"&", @"bitwise(""&"",$a,$b)"},
            {"|", @"bitwise(""|"",$a,$b)"},
            {"~", @"bitwise(""~"",$b)"},
            {"++", @"$a=$a+1"},
            {"--", @"$a=$a-1"},
            {"+=", @"$a=$a+$b"},
            {"-=", @"$a=$a-$b"},
            {"*=", @"$a=$a*$b"},
            {"/=", @"$a=$a/$b"},
            {"%=", @"$a=$a%$b"},
            {"=>", @"function$a$b"},
        };

        public enum ETemplate
        {
            None,
            IterationIndex,
            IgnoreOptimization,
            TernaryOperator,
            Comment,
        }

        private static readonly Dictionary<string, ETemplate> _templates = new Dictionary<string, ETemplate>()
        {
            { @"^(__)(.*)(_idx)$",ETemplate.IterationIndex }, // __var_idx
            { @"^(\\)(\S*)$",ETemplate.IgnoreOptimization },  // \exact_var_name
            { @"^(\/\/)(.*)$", ETemplate.Comment },         //comment

        };

        private static bool IsTemplate(string input, out string regex, out MatchCollection matches, out ETemplate template)
        {
            foreach (KeyValuePair<string, ETemplate> pair in _templates)
            {
                matches = Regex.Matches(input, pair.Key);
                if (matches.Count != 0)
                {
                    regex = pair.Key;
                    template = pair.Value;
                    return true;
                }
            }

            matches = null;
            regex = null;
            template = ETemplate.None;
            return false;
        }

        #endregion

        public static Dictionary<string, string> IncludeToCode = new Dictionary<string, string>();

        public delegate void IncludeHandler(string include,Dictionary<string,string> includeToCode, Ref<int> counter);

        public static event IncludeHandler OnInclude;
        public static string[] GetIncludes(string code)
        {
            return Tokenize(code).GetIncludes();
        }
        
        public static async Task<string> Compile(string code, bool optimize = false, Settings settings = Settings.None)
        {
            return await Tokenize(code, settings).Compile(optimize);
        }

        public static async Task<bool> TryCompile(string code, Ref<string> compiledCode, bool optimize = false, Settings settings = Settings.None)
        {
            try
            {
                compiledCode.Value = await Compile(code, optimize, settings);
                return true;
            }
            catch (Exception e)
            {
                compiledCode.Value = e.Message;
                return false;
            }
        }

        private static Context Tokenize(string plainCode, Settings settings = Settings.None)
        {
            Context context = new Context(settings) { PlainInput = new Queue<char>(plainCode) };

            Token token = null;
            while ((token = GetNextToken(context)) != null)
            {
                context.AddToken(token);


                if ((context.Settings & Settings.IgnoreMapVariables) != 0 && token.Prev != null && token.Prev.Value == ".")
                {
                    if (!context.IgnoreOptimize(token.Value))
                    {
                        context.customIgnoreOptimize.Add(token.Value);
                    }
                }
            }

            return context;
        }

        private static Context Tokenize(string plainCode,Context context, Settings settings = Settings.None)
        {
            context.PlainInput = new Queue<char>(plainCode);

            Token token = null;
            while ((token = GetNextToken(context)) != null)
            {
                context.AddToken(token);


                if ((context.Settings & Settings.IgnoreMapVariables) != 0 && token.Prev != null && token.Prev.Value == ".")
                {
                    if (!context.IgnoreOptimize(token.Value))
                    {
                        context.customIgnoreOptimize.Add(token.Value);
                    }
                }
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

        private static Func<Context, bool> GetSeparationSelector(Context context, out Token token)
        {
            if (context.PlainInput.Peek() == '/' && context.PlainInput.Skip(1).FirstOrDefault() == '/')
            {
                token = new Token.Template();
                return x => (context.PlainInput.Peek() == '\n' || (context.PlainInput.Count > 1 &&
                                                                   context.PlainInput.Peek() == '\r' &&
                                                                   context.PlainInput.Skip(1).First() == '\n'));
            }

            if (context.MapActive.Peek())
            {
                token = new Token.Separator();

                switch (context.PlainInput.Peek())
                {
                    case ',':
                        context.ShouldOptimizeString.Pop();
                        context.ShouldOptimizeString.Push(!context.Settings.HasFlag(Settings.IgnoreMapVariables));
                        return x => true;
                    case ':':
                        context.ShouldOptimizeString.Pop();
                        context.ShouldOptimizeString.Push(false);
                        return x => true;
                }

            }

            if (context.PlainInput.Peek() == '\\')
            {
                token = new Token.Template();
                return x => _tokenBrackets.Contains(x.PlainInput.Peek()) ||
                            _tokenSeparators.Contains(x.PlainInput.Peek()) ||
                            _tokenOperators.Contains(x.PlainInput.Peek()) ||
                            _tokenEndStatements.Contains(x.PlainInput.Peek().ToString()) ||
                            _tokenEndStatements.Contains(x.PlainInput.Peek().ToString() + x.PlainInput.Skip(1).FirstOrDefault().ToString());
            }

            if (_tokenInclude.Contains(context.PlainInput.Peek() +
                                       context.PlainInput.Skip(1).FirstOrDefault().ToString())) //include
            {
                token = new Token.Include();
                context.PlainInput.Dequeue();
                context.PlainInput.Dequeue();
                return x =>
                {
                    if (_tokenEndInclude.Contains(x.PlainInput.Peek()))
                    {
                        x.PlainInput.Dequeue();
                        return true;
                    }

                    return false;
                };
            }

            if (_tokenOperators.Contains(context.PlainInput.Peek())) //operator
            {
                token = new Token.Operator();
                return x => !_tokenOperators.Contains(x.PlainInput.Peek());
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
                        context.ShouldOptimizeString.Push((!(context.LastToken == null ||
                                                             context.LastToken is Token.Operator)) &&
                                                          (context.Settings & Settings.IgnoreMapVariables) == 0);
                        break;
                    case ']':
                        context.ShouldOptimizeString.Pop();
                        break;
                    case '{':
                        if (context.LastToken == null || (!context.LastToken.Value.EndsWith(")") && context.LastToken.Value != "=>"))
                        {
                            context.MapActive.Push(true);
                            context.ShouldOptimizeString.Push((context.Settings & Settings.IgnoreMapVariables) == 0);
                        }
                        else
                        {
                            context.MapActive.Push(false);
                            context.ShouldOptimizeString.Push(false);
                        }

                        break;
                    case '}':
                        context.MapActive.Pop();
                        context.ShouldOptimizeString.Pop();
                        break;
                }

                return x => true;
            }
            if (_tokenSeparators.Contains(context.PlainInput.Peek())) //separators
            {
                token = new Token.Separator();
                return x => true;
            }

            if (_tokenStrings.Contains(context.PlainInput.Peek())) //strings
            {
                token = new Token.String();
                token.Optimizable = context.ShouldOptimizeString.Peek();
                if (context.PlainInput.Peek() == '$')
                {
                    token.Custom = true;
                    token.Optimizable = false;
                    context.PlainInput.Dequeue();
                }

                return x =>
                {
                    GetString(x);
                    return true;
                };
            }
            token = new Token.Variable();
            return x => _tokenBrackets.Contains(x.PlainInput.Peek()) ||
                        _tokenSeparators.Contains(x.PlainInput.Peek()) ||
                        _tokenStrings.Contains(x.PlainInput.Peek()) ||
                        _tokenOperators.Contains(x.PlainInput.Peek()) ||
                        _tokenEndStatements.Contains(x.PlainInput.Peek().ToString()) ||
                        _tokenEndStatements.Contains(x.PlainInput.Peek().ToString() + x.PlainInput.Skip(1).FirstOrDefault().ToString());
        }

        private static void GetString(Context context)
        {

            while (context.PlainInput.Count > 0 && context.PlainInput.Peek() != '"')
            {
                context.StringBuilder.Append(context.PlainInput.Dequeue());
            }

            if (context.PlainInput.Count != 0)
                context.StringBuilder.Append(context.PlainInput.Dequeue());
            if (context.PlainInput.Count > 0 && context.PlainInput.Peek() == '"')
            {
                context.StringBuilder.Append(context.PlainInput.Dequeue());
                GetString(context);
                return;
            }

            context.StringBuilder.Remove(0, 1);
            context.StringBuilder.Remove(context.StringBuilder.Length - 1, 1);
        }
        private static Token GetNextToken(Context context)
        {
            context.StringBuilder.Clear();
            StringBuilder sb = context.StringBuilder;
            RemoveSpaces(context.PlainInput);
            if (context.PlainInput.Count == 0) return null;
            Func<Context, bool> separator = GetSeparationSelector(context, out Token t);
            do
            {
                sb.Append(context.PlainInput.Dequeue());
            } while (context.PlainInput.Count > 0 && !separator(context));

            string tmp_value = sb.ToString();
            if (!(t is Token.String) && IsTemplate(tmp_value, out string regex, out MatchCollection matches, out ETemplate template))
            {
                t = new Token.Template(template, matches, regex, context);
            }
            else if (_keywords.Contains(tmp_value) && !(t is Token.String))
            {
                t = new Token.Keyword();
            }

            if (t.Optimizable && context.IgnoreOptimize(t.Value))
            {
                t.Optimizable = false;
            }

            t.Value = tmp_value;

            while (context.PlainInput.Count > 0 && context.PlainInput.Peek() == ' ')
                context.PlainInput.Dequeue();

            t.EndStatement = IsEndOfLine(context);
            if (context.PlainInput.Count > 0 && context.PlainInput.Peek() == ';') context.PlainInput.Dequeue();

            return t;
        }

        private static bool IsEndOfLine(Context context) => context.PlainInput.Count == 0 ||
                _tokenEndStatements.Contains(context.PlainInput.Peek().ToString() + context.PlainInput.Skip(1).FirstOrDefault().ToString()) ||
                _tokenEndStatements.Contains(context.PlainInput.Peek().ToString());
    }

    
}
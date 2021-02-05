/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2021
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("JsMSppCompiler", function ($asm, globals) {
    "use strict";

    Bridge.define("GreyHackTools.GreyHackCompiler", {
        statics: {
            fields: {
                _separator: null,
                _tokenSeparators: null,
                _tokenBrackets: null,
                _tokenOperators: null,
                _tokenEndStatements: null,
                _tokenInclude: null,
                _tokenEndInclude: null,
                _tokenStrings: null,
                _keywords: null,
                _ignoreOptimize: null,
                _operators: null,
                _templates: null
            },
            ctors: {
                init: function () {
                    this._separator = "\n";
                    this._tokenSeparators = function (_o1) {
                            _o1.add(32);
                            _o1.add(46);
                            _o1.add(44);
                            _o1.add(58);
                            return _o1;
                        }(new (System.Collections.Generic.HashSet$1(System.Char)).ctor());
                    this._tokenBrackets = function (_o2) {
                            _o2.add(40);
                            _o2.add(41);
                            _o2.add(91);
                            _o2.add(93);
                            _o2.add(123);
                            _o2.add(125);
                            return _o2;
                        }(new (System.Collections.Generic.HashSet$1(System.Char)).ctor());
                    this._tokenOperators = function (_o3) {
                            _o3.add(43);
                            _o3.add(45);
                            _o3.add(42);
                            _o3.add(47);
                            _o3.add(37);
                            _o3.add(60);
                            _o3.add(62);
                            _o3.add(61);
                            _o3.add(33);
                            _o3.add(94);
                            _o3.add(38);
                            _o3.add(124);
                            _o3.add(64);
                            _o3.add(126);
                            return _o3;
                        }(new (System.Collections.Generic.HashSet$1(System.Char)).ctor());
                    this._tokenEndStatements = function (_o4) {
                            _o4.add("\n");
                            _o4.add("\r\n");
                            _o4.add(";");
                            return _o4;
                        }(new (System.Collections.Generic.HashSet$1(System.String)).ctor());
                    this._tokenInclude = function (_o5) {
                            _o5.add("#!");
                            return _o5;
                        }(new (System.Collections.Generic.HashSet$1(System.String)).ctor());
                    this._tokenEndInclude = function (_o6) {
                            _o6.add(33);
                            return _o6;
                        }(new (System.Collections.Generic.HashSet$1(System.Char)).ctor());
                    this._tokenStrings = function (_o7) {
                            _o7.add(34);
                            _o7.add(36);
                            return _o7;
                        }(new (System.Collections.Generic.HashSet$1(System.Char)).ctor());
                    this._keywords = function (_o8) {
                            _o8.add("if");
                            _o8.add("then");
                            _o8.add("else");
                            _o8.add("end");
                            _o8.add("while");
                            _o8.add("for");
                            _o8.add("in");
                            _o8.add("and");
                            _o8.add("or");
                            _o8.add("not");
                            _o8.add("true");
                            _o8.add("false");
                            _o8.add("return");
                            _o8.add("continue");
                            _o8.add("break");
                            _o8.add("new");
                            return _o8;
                        }(new (System.Collections.Generic.HashSet$1(System.String)).ctor());
                    this._ignoreOptimize = function (_o9) {
                            _o9.add("File");
                            _o9.add("abs");
                            _o9.add("acos");
                            _o9.add("active_net_card");
                            _o9.add("active_user");
                            _o9.add("aircrack");
                            _o9.add("airmon");
                            _o9.add("asin");
                            _o9.add("atan");
                            _o9.add("bitwise");
                            _o9.add("bssid_name");
                            _o9.add("build");
                            _o9.add("ceil");
                            _o9.add("change_password");
                            _o9.add("char");
                            _o9.add("chmod");
                            _o9.add("close_program");
                            _o9.add("code");
                            _o9.add("command_info");
                            _o9.add("connect_ethernet");
                            _o9.add("connect_service");
                            _o9.add("connect_wifi");
                            _o9.add("copy");
                            _o9.add("cos");
                            _o9.add("create_folder");
                            _o9.add("create_group");
                            _o9.add("create_user");
                            _o9.add("current_date");
                            _o9.add("current_path");
                            _o9.add("decipher");
                            _o9.add("delete");
                            _o9.add("delete_group");
                            _o9.add("delete_user");
                            _o9.add("device_ports");
                            _o9.add("devices_lan_ip");
                            _o9.add("dump_lib");
                            _o9.add("essid_name");
                            _o9.add("exit");
                            _o9.add("floor");
                            _o9.add("format_columns");
                            _o9.add("get_files");
                            _o9.add("get_folders");
                            _o9.add("get_lan_ip");
                            _o9.add("get_ports");
                            _o9.add("get_router");
                            _o9.add("get_shell");
                            _o9.add("globals");
                            _o9.add("group");
                            _o9.add("groups");
                            _o9.add("hasIndex");
                            _o9.add("has_permission");
                            _o9.add("host_computer");
                            _o9.add("include_lib");
                            _o9.add("indexOf");
                            _o9.add("indexes");
                            _o9.add("is_binary");
                            _o9.add("is_closed");
                            _o9.add("is_folder");
                            _o9.add("is_lan_ip");
                            _o9.add("is_network_active");
                            _o9.add("is_valid_ip");
                            _o9.add("join");
                            _o9.add("lastIndexOf");
                            _o9.add("launch");
                            _o9.add("len");
                            _o9.add("lib_name");
                            _o9.add("load");
                            _o9.add("local_ip");
                            _o9.add("locals");
                            _o9.add("lower");
                            _o9.add("md5");
                            _o9.add("move");
                            _o9.add("name");
                            _o9.add("net_use");
                            _o9.add("network_devices");
                            _o9.add("network_gateway");
                            _o9.add("nslookup");
                            _o9.add("overflow");
                            _o9.add("owner");
                            _o9.add("parent");
                            _o9.add("parent_path");
                            _o9.add("path");
                            _o9.add("permissions");
                            _o9.add("pi");
                            _o9.add("ping");
                            _o9.add("ping_port");
                            _o9.add("pop");
                            _o9.add("port_info");
                            _o9.add("port_number");
                            _o9.add("print");
                            _o9.add("program_path");
                            _o9.add("public_ip");
                            _o9.add("pull");
                            _o9.add("push");
                            _o9.add("put");
                            _o9.add("range");
                            _o9.add("remove");
                            _o9.add("rename");
                            _o9.add("replace");
                            _o9.add("reverse");
                            _o9.add("rnd");
                            _o9.add("round");
                            _o9.add("scan");
                            _o9.add("scan_address");
                            _o9.add("scp");
                            _o9.add("set_content");
                            _o9.add("set_group");
                            _o9.add("show_procs");
                            _o9.add("shuffle");
                            _o9.add("sign");
                            _o9.add("sin");
                            _o9.add("size");
                            _o9.add("slice");
                            _o9.add("smtp_user_list");
                            _o9.add("sort");
                            _o9.add("split");
                            _o9.add("sqrt");
                            _o9.add("start_terminal");
                            _o9.add("str");
                            _o9.add("sum");
                            _o9.add("tan");
                            _o9.add("to_int");
                            _o9.add("touch");
                            _o9.add("trim");
                            _o9.add("typeof");
                            _o9.add("upper");
                            _o9.add("used_ports");
                            _o9.add("user_bank_number");
                            _o9.add("user_input");
                            _o9.add("user_mail_address");
                            _o9.add("val");
                            _o9.add("values");
                            _o9.add("version");
                            _o9.add("whois");
                            _o9.add("wifi_networks");
                            _o9.add("params");
                            _o9.add("clear_screen");
                            _o9.add("wait");
                            _o9.add("self");
                            _o9.add("null");
                            _o9.add("function");
                            _o9.add("content");
                            _o9.add("lan_ip");
                            _o9.add("get_content");
                            _o9.add("aireplay");
                            _o9.add("firewall_rules");
                            _o9.add("kernel_version");
                            _o9.add("kernel_version");
                            _o9.add("rshell_server");
                            _o9.add("rshell_server");
                            _o9.add("__isa");
                            _o9.add("if");
                            _o9.add("then");
                            _o9.add("else");
                            _o9.add("end");
                            _o9.add("while");
                            _o9.add("for");
                            _o9.add("in");
                            _o9.add("and");
                            _o9.add("or");
                            _o9.add("not");
                            _o9.add("true");
                            _o9.add("false");
                            _o9.add("null");
                            _o9.add("return");
                            _o9.add("continue");
                            _o9.add("break");
                            _o9.add("function");
                            _o9.add("new");
                            _o9.add("self");
                            return _o9;
                        }(new (System.Collections.Generic.HashSet$1(System.String)).ctor());
                    this._operators = function (_o10) {
                            _o10.add("&&", " and ");
                            _o10.add("||", " or ");
                            _o10.add("<<", "bitwise(\"<<\",$a,$b)");
                            _o10.add(">>", "bitwise(\">>\",$a,$b)");
                            _o10.add(">>>", "bitwise(\">>>\",$a,$b)");
                            _o10.add("^^", "bitwise(\"^\",$a,$b)");
                            _o10.add("&", "bitwise(\"&\",$a,$b)");
                            _o10.add("|", "bitwise(\"|\",$a,$b)");
                            _o10.add("~", "bitwise(\"~\",$b)");
                            _o10.add("++", "$a=$a+1");
                            _o10.add("--", "$a=$a-1");
                            _o10.add("+=", "$a=$a+$b");
                            _o10.add("-=", "$a=$a-$b");
                            _o10.add("*=", "$a=$a*$b");
                            _o10.add("/=", "$a=$a/$b");
                            _o10.add("%=", "$a=$a%$b");
                            _o10.add("=>", "function$a");
                            return _o10;
                        }(new (System.Collections.Generic.Dictionary$2(System.String,System.String)).ctor());
                    this._templates = function (_o11) {
                            _o11.add("(__)(.*)(_idx)", GreyHackTools.GreyHackCompiler.ETemplate.IterationIndex);
                            _o11.add("(\\\\)(\\S*)", GreyHackTools.GreyHackCompiler.ETemplate.IgnoreOptimization);
                            _o11.add("(\\/\\/)(.*)$", GreyHackTools.GreyHackCompiler.ETemplate.Comment);
                            return _o11;
                        }(new (System.Collections.Generic.Dictionary$2(System.String,GreyHackTools.GreyHackCompiler.ETemplate)).ctor());
                }
            },
            methods: {
                IsTemplate: function (input, regex, matches, template) {
                    var $t;
                    $t = Bridge.getEnumerator(GreyHackTools.GreyHackCompiler._templates);
                    try {
                        while ($t.moveNext()) {
                            var pair = $t.Current;
                            matches.v = System.Text.RegularExpressions.Regex.matches(input, pair.key);
                            if (matches.v.getCount() !== 0) {
                                regex.v = pair.key;
                                template.v = pair.value;
                                return true;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }

                    matches.v = null;
                    regex.v = null;
                    template.v = GreyHackTools.GreyHackCompiler.ETemplate.None;
                    return false;
                },
                Compile: function (code, optimize, settings) {
                    if (optimize === void 0) { optimize = false; }
                    if (settings === void 0) { settings = 0; }
                    return GreyHackTools.GreyHackCompiler.Tokenize(code, settings).Compile(optimize);
                },
                TryCompile: function (code, compiledCode, optimize, settings) {
                    if (optimize === void 0) { optimize = false; }
                    if (settings === void 0) { settings = 0; }
                    try {
                        compiledCode.v = GreyHackTools.GreyHackCompiler.Compile(code, optimize, settings);
                        return true;
                    } catch (e) {
                        e = System.Exception.create(e);
                        compiledCode.v = e.Message;
                        return false;
                    }
                },
                Tokenize: function (plainCode, settings) {
                    var $t;
                    if (settings === void 0) { settings = 0; }
                    var context = ($t = new GreyHackTools.GreyHackCompiler.Context(settings), $t.PlainInput = new (System.Collections.Generic.Queue$1(System.Char)).$ctor1(plainCode), $t);

                    var token = null;
                    while (((token = GreyHackTools.GreyHackCompiler.GetNextToken(context))) != null) {
                        context.AddToken(token);


                        if ((context.Settings & GreyHackTools.GreyHackCompiler.Settings.IgnoreMapVariables) !== 0 && token.Prev != null && Bridge.referenceEquals(token.Prev.Value, ".")) {
                            if (!context.IgnoreOptimize(token.Value)) {
                                context.customIgnoreOptimize.add(token.Value);
                            }
                        }
                    }

                    return context;
                },
                RemoveSpaces: function (queue) {
                    while (queue.Count !== 0 && System.Char.isWhiteSpace(String.fromCharCode(queue.Peek()))) {
                        queue.Dequeue();
                    }
                },
                GetSeparationSelector: function (context, token) {
                    if (context.PlainInput.Peek() === 47 && System.Linq.Enumerable.from(context.PlainInput, System.Char).skip(1).firstOrDefault(null, 0) === 47) {
                        token.v = new GreyHackTools.GreyHackCompiler.Token.Template.ctor();
                        return function (x) {
                            return !GreyHackTools.GreyHackCompiler.IsEndOfLine(x);
                        };
                    }

                    if (context.MapActive.Peek()) {
                        token.v = new GreyHackTools.GreyHackCompiler.Token.Separator();

                        switch (context.PlainInput.Peek()) {
                            case 44: 
                                context.ShouldOptimizeString.Pop();
                                context.ShouldOptimizeString.Push(!System.Enum.hasFlag(context.Settings, Bridge.box(GreyHackTools.GreyHackCompiler.Settings.IgnoreMapVariables, GreyHackTools.GreyHackCompiler.Settings, System.Enum.toStringFn(GreyHackTools.GreyHackCompiler.Settings))));
                                return function (x) {
                                    return false;
                                };
                            case 58: 
                                context.ShouldOptimizeString.Pop();
                                context.ShouldOptimizeString.Push(false);
                                return function (x) {
                                    return false;
                                };
                        }

                    }

                    if (context.PlainInput.Peek() === 92) {
                        token.v = new GreyHackTools.GreyHackCompiler.Token.Template.ctor();
                        return function (x) {
                            return !GreyHackTools.GreyHackCompiler._tokenBrackets.contains(x.PlainInput.Peek()) && !GreyHackTools.GreyHackCompiler._tokenSeparators.contains(x.PlainInput.Peek()) && !GreyHackTools.GreyHackCompiler._tokenOperators.contains(x.PlainInput.Peek()) && !GreyHackTools.GreyHackCompiler._tokenEndStatements.contains(String.fromCharCode(x.PlainInput.Peek())) && !GreyHackTools.GreyHackCompiler._tokenEndStatements.contains((String.fromCharCode(x.PlainInput.Peek()) || "") + (String.fromCharCode(System.Linq.Enumerable.from(x.PlainInput, System.Char).skip(1).firstOrDefault(null, 0)) || ""));
                        };
                    }

                    if (GreyHackTools.GreyHackCompiler._tokenInclude.contains(String.fromCharCode(context.PlainInput.Peek()) + (String.fromCharCode(System.Linq.Enumerable.from(context.PlainInput, System.Char).skip(1).firstOrDefault(null, 0)) || ""))) {
                        token.v = new GreyHackTools.GreyHackCompiler.Token.Include();
                        context.PlainInput.Dequeue();
                        context.PlainInput.Dequeue();
                        return function (x) {
                            if (GreyHackTools.GreyHackCompiler._tokenEndInclude.contains(x.PlainInput.Peek())) {
                                x.PlainInput.Dequeue();
                                return false;
                            }

                            return true;
                        };
                    }

                    if (GreyHackTools.GreyHackCompiler._tokenOperators.contains(context.PlainInput.Peek())) {
                        token.v = new GreyHackTools.GreyHackCompiler.Token.Operator();
                        return function (x) {
                            return GreyHackTools.GreyHackCompiler._tokenOperators.contains(x.PlainInput.Peek());
                        };
                    }
                    if (GreyHackTools.GreyHackCompiler._tokenBrackets.contains(context.PlainInput.Peek())) {
                        token.v = new GreyHackTools.GreyHackCompiler.Token.Bracket();
                        switch (context.PlainInput.Peek()) {
                            case 40: 
                                context.ShouldOptimizeString.Push(false);
                                break;
                            case 41: 
                                context.ShouldOptimizeString.Pop();
                                break;
                            case 91: 
                                context.ShouldOptimizeString.Push((!(context.LastToken == null || Bridge.is(context.LastToken, GreyHackTools.GreyHackCompiler.Token.Operator))) && (context.Settings & GreyHackTools.GreyHackCompiler.Settings.IgnoreMapVariables) === 0);
                                break;
                            case 93: 
                                context.ShouldOptimizeString.Pop();
                                break;
                            case 123: 
                                context.MapActive.Push(true);
                                context.ShouldOptimizeString.Push((context.Settings & GreyHackTools.GreyHackCompiler.Settings.IgnoreMapVariables) === 0);
                                break;
                            case 125: 
                                context.MapActive.Pop();
                                context.ShouldOptimizeString.Pop();
                                break;
                        }

                        return function (x) {
                            return false;
                        };
                    }
                    if (GreyHackTools.GreyHackCompiler._tokenSeparators.contains(context.PlainInput.Peek())) {
                        token.v = new GreyHackTools.GreyHackCompiler.Token.Separator();
                        return function (x) {
                            return false;
                        };
                    }

                    if (GreyHackTools.GreyHackCompiler._tokenStrings.contains(context.PlainInput.Peek())) {
                        token.v = new GreyHackTools.GreyHackCompiler.Token.String();
                        token.v.Optimizable = context.ShouldOptimizeString.Peek();
                        if (context.PlainInput.Peek() === 36) {
                            token.v.Custom = true;
                            token.v.Optimizable = false;
                            context.PlainInput.Dequeue();
                        }

                        return function (x) {
                            GreyHackTools.GreyHackCompiler.GetString(x);
                            return false;
                        };
                    }
                    token.v = new GreyHackTools.GreyHackCompiler.Token.Variable();
                    return function (x) {
                        return !GreyHackTools.GreyHackCompiler._tokenBrackets.contains(x.PlainInput.Peek()) && !GreyHackTools.GreyHackCompiler._tokenSeparators.contains(x.PlainInput.Peek()) && !GreyHackTools.GreyHackCompiler._tokenStrings.contains(x.PlainInput.Peek()) && !GreyHackTools.GreyHackCompiler._tokenOperators.contains(x.PlainInput.Peek()) && !GreyHackTools.GreyHackCompiler._tokenEndStatements.contains(String.fromCharCode(x.PlainInput.Peek())) && !GreyHackTools.GreyHackCompiler._tokenEndStatements.contains((String.fromCharCode(x.PlainInput.Peek()) || "") + (String.fromCharCode(System.Linq.Enumerable.from(x.PlainInput, System.Char).skip(1).firstOrDefault(null, 0)) || ""));
                    };
                },
                GetString: function (context) {

                    while (context.PlainInput.Count > 0 && context.PlainInput.Peek() !== 34) {
                        context.StringBuilder.append(String.fromCharCode(context.PlainInput.Dequeue()));
                    }

                    if (context.PlainInput.Count !== 0) {
                        context.StringBuilder.append(String.fromCharCode(context.PlainInput.Dequeue()));
                    }
                    if (context.PlainInput.Count > 0 && context.PlainInput.Peek() === 34) {
                        context.StringBuilder.append(String.fromCharCode(context.PlainInput.Dequeue()));
                        GreyHackTools.GreyHackCompiler.GetString(context);
                        return;
                    }

                    context.StringBuilder.remove(0, 1);
                    context.StringBuilder.remove(((context.StringBuilder.getLength() - 1) | 0), 1);
                },
                GetNextToken: function (context) {
                    context.StringBuilder.clear();
                    var sb = context.StringBuilder;
                    GreyHackTools.GreyHackCompiler.RemoveSpaces(context.PlainInput);
                    if (context.PlainInput.Count === 0) {
                        return null;
                    }
                    var t = { };
                    var separator = GreyHackTools.GreyHackCompiler.GetSeparationSelector(context, t);
                    do {
                        sb.append(String.fromCharCode(context.PlainInput.Dequeue()));
                    } while (context.PlainInput.Count > 0 && separator(context));

                    var tmp_value = sb.toString();
                    var regex = { };
                    var matches = { };
                    var template = { v : new GreyHackTools.GreyHackCompiler.ETemplate() };
                    if (!(Bridge.is(t.v, GreyHackTools.GreyHackCompiler.Token.String)) && GreyHackTools.GreyHackCompiler.IsTemplate(tmp_value, regex, matches, template)) {
                        t.v = new GreyHackTools.GreyHackCompiler.Token.Template.$ctor1(template.v, matches.v, regex.v, context);
                    } else if (GreyHackTools.GreyHackCompiler._keywords.contains(tmp_value) && !(Bridge.is(t.v, GreyHackTools.GreyHackCompiler.Token.String))) {
                        t.v = new GreyHackTools.GreyHackCompiler.Token.Keyword();
                    }

                    if (t.v.Optimizable && context.IgnoreOptimize(t.v.Value)) {
                        t.v.Optimizable = false;
                    }

                    t.v.Value = tmp_value;

                    while (context.PlainInput.Count > 0 && context.PlainInput.Peek() === 32) {
                        context.PlainInput.Dequeue();
                    }

                    t.v.EndStatement = GreyHackTools.GreyHackCompiler.IsEndOfLine(context);
                    if (context.PlainInput.Count > 0 && context.PlainInput.Peek() === 59) {
                        context.PlainInput.Dequeue();
                    }

                    return t.v;
                },
                IsEndOfLine: function (context) {
                    return context.PlainInput.Count === 0 || GreyHackTools.GreyHackCompiler._tokenEndStatements.contains((String.fromCharCode(context.PlainInput.Peek()) || "") + (String.fromCharCode(System.Linq.Enumerable.from(context.PlainInput, System.Char).skip(1).firstOrDefault(null, 0)) || "")) || GreyHackTools.GreyHackCompiler._tokenEndStatements.contains(String.fromCharCode(context.PlainInput.Peek()));
                }
            }
        }
    });

    Bridge.define("GreyHackTools.GreyHackCompiler.Context", {
        $kind: "nested class",
        fields: {
            PlainInput: null,
            RootToken: null,
            LastToken: null,
            stringBuilders: null,
            ShouldOptimizeString: null,
            MapActive: null,
            nameProvider: null,
            optimizeEnabled: false,
            Settings: 0,
            customIgnoreOptimize: null
        },
        props: {
            StringBuilder: {
                get: function () {
                    return this.stringBuilders.Peek();
                }
            }
        },
        ctors: {
            init: function () {
                this.stringBuilders = new (System.Collections.Generic.Stack$1(System.Text.StringBuilder)).ctor();
                this.ShouldOptimizeString = new (System.Collections.Generic.Stack$1(System.Boolean)).ctor();
                this.MapActive = new (System.Collections.Generic.Stack$1(System.Boolean)).ctor();
                this.nameProvider = new GreyHackTools.VariableNameProvider();
                this.optimizeEnabled = false;
                this.Settings = GreyHackTools.GreyHackCompiler.Settings.None;
                this.customIgnoreOptimize = new (System.Collections.Generic.HashSet$1(System.String)).ctor();
            },
            ctor: function (settings) {
                this.$initialize();
                this.Settings = settings;
                this.PlainInput = new (System.Collections.Generic.Queue$1(System.Char)).ctor();

                this.stringBuilders.Push(new System.Text.StringBuilder());

                this.ShouldOptimizeString.Push(false);
                this.MapActive.Push(false);
            }
        },
        methods: {
            IgnoreOptimize: function (value) {
                return GreyHackTools.GreyHackCompiler._ignoreOptimize.contains(value) || this.customIgnoreOptimize.contains(value);
            },
            AddToken: function (token) {
                if (this.RootToken == null) {
                    this.RootToken = token;
                    this.LastToken = token;
                } else {
                    this.LastToken.Next = token;
                    token.Prev = this.LastToken;
                    this.LastToken = token;
                }
            },
            Compile: function (optimize) {
                if (optimize === void 0) { optimize = false; }
                this.optimizeEnabled = optimize;
                this.StringBuilder.clear();



                var node;
                if (optimize) {
                    node = this.RootToken;
                    while (node != null) {
                        node = node.Optimize(this).Next;
                    }
                }

                node = this.RootToken;
                while (node != null) {
                    node = node.Compile(this).Next;
                }




                this.optimizeEnabled = false;
                return this.StringBuilder.toString();
            },
            toString: function () {
                return this.StringBuilder.toString();

            }
        }
    });

    Bridge.define("GreyHackTools.GreyHackCompiler.ETemplate", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                IterationIndex: 1,
                IgnoreOptimization: 2,
                TernaryOperator: 3,
                Comment: 4
            }
        }
    });

    Bridge.define("GreyHackTools.GreyHackCompiler.Settings", {
        $kind: "nested enum",
        statics: {
            fields: {
                None: 0,
                IgnoreMapVariables: 1,
                RemoveComments: 2
            }
        },
        $flags: true
    });

    Bridge.define("GreyHackTools.GreyHackCompiler.Token", {
        $kind: "nested class",
        fields: {
            Prev: null,
            Next: null,
            Value: null,
            Custom: false,
            Optimizable: false,
            EndStatement: false
        },
        ctors: {
            init: function () {
                this.Optimizable = true;
            }
        },
        methods: {
            toString: function () {
                return this.Value;
            },
            Optimize: function (context) {
                if (this.Optimizable && this.Value.length > 0 && !System.Char.isDigit(this.Value.charCodeAt(0)) && !context.IgnoreOptimize(this.Value)) {
                    this.Value = context.nameProvider.GetReplace(this.Value);
                }
                return this;
            },
            Compile: function (context, force) {
                if (force === void 0) { force = false; }
                if (context.StringBuilder.getLength() !== 0 && System.Text.RegularExpressions.Regex.isMatch(String.fromCharCode(context.StringBuilder.getChar(((context.StringBuilder.getLength() - 1) | 0))), "\\w") && this.Value.length > 0 && System.Text.RegularExpressions.Regex.isMatch(String.fromCharCode(this.Value.charCodeAt(0)), "\\w")) {
                    context.StringBuilder.append(String.fromCharCode(32));
                }

                context.StringBuilder.append(this.Value);
                if (this.EndStatement && this.Next != null && !force) {
                    context.StringBuilder.append(GreyHackTools.GreyHackCompiler._separator);
                }
                return this;
            },
            CompareBeginningOfValue: function (s) {
                if (s.length > this.Value.length) {
                    return false;
                }
                for (var i = 0; i < s.length; i = (i + 1) | 0) {
                    if (this.Value.charCodeAt(i) !== s.charCodeAt(i)) {
                        return false;
                    }
                }

                return true;
            }
        }
    });

    Bridge.define("GreyHackTools.VariableNameProvider", {
        fields: {
            _replace: null,
            _state: 0,
            _chars: null
        },
        ctors: {
            init: function () {
                this._replace = new (System.Collections.Generic.Dictionary$2(System.String,System.String)).ctor();
                this._chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            }
        },
        methods: {
            Next: function () {
                var sb = new System.Text.StringBuilder();
                var index = this._state;

                do {
                    var i = index % this._chars.length;
                    var c = this._chars.charCodeAt(i);
                    sb.append(String.fromCharCode(c));
                    index = (Bridge.Int.div(index, this._chars.length)) | 0;
                } while (index > 0);

                this._state = (this._state + 1) | 0;
                return sb.toString();
            },
            Defined: function (name) {
                return this._replace.containsKey(name);
            },
            GetReplace: function (orig) {
                if (!this._replace.containsKey(orig)) {
                    this._replace.setItem(orig, this.Next());
                }

                return this._replace.getItem(orig);
            }
        }
    });

    Bridge.define("JsMSppCompiler.App", {
        main: function Main () {

        }
    });

    Bridge.define("GreyHackTools.GreyHackCompiler.Token.Variable", {
        inherits: [GreyHackTools.GreyHackCompiler.Token],
        $kind: "nested class",
        methods: {
            Compile: function (context, force) {
                var $t, $t1;
                if (force === void 0) { force = false; }
                var br;
                if (((br = Bridge.as(this, GreyHackTools.GreyHackCompiler.Token.Bracket))) != null && !br.Custom && (br.Value.length === 0 || br.Value.charCodeAt(0) !== 123)) {
                    return GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context);
                }

                if ((this.Next != null && !GreyHackTools.GreyHackCompiler._tokenOperators.contains(System.Linq.Enumerable.from(this.Value, System.Char).first()) && (Bridge.referenceEquals(this.Next.Value, ".") || Bridge.referenceEquals(this.Next.Value, "(") || Bridge.referenceEquals(this.Next.Value, "[")))) {
                    context.stringBuilders.Push(new System.Text.StringBuilder());
                    context.StringBuilder.append(this.Value);
                    while (this.Next != null && !GreyHackTools.GreyHackCompiler._tokenOperators.contains(System.Linq.Enumerable.from(this.Value, System.Char).first()) && (Bridge.referenceEquals(this.Next.Value, ".") || Bridge.referenceEquals(this.Next.Value, "(") || Bridge.referenceEquals(this.Next.Value, "["))) {
                        this.Next.Compile(context, true);
                        if (!Bridge.referenceEquals(this.Next.Value, ".")) {
                            this.Next = this.Next.Next;
                        } else {
                            this.Next = this.Next.Next;
                            ($t = this.Next) != null ? $t.Compile(context, true) : null;
                            this.Next = ($t1 = this.Next) != null ? $t1.Next : null;
                        }
                    }

                    if (this.Next != null) {
                        this.Next.Prev = this;
                    } else {
                        context.LastToken = this;
                    }
                    this.Value = context.StringBuilder.toString();
                    context.stringBuilders.Pop();
                }
                var o;
                if (this.Next != null && ((o = Bridge.as(this.Next, GreyHackTools.GreyHackCompiler.Token.Operator))) != null && o.NeedsLeft) {
                    if (force) {
                        var b = this.EndStatement;
                        this.EndStatement = false;
                        var r = GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context);
                        this.EndStatement = b;
                        return r;
                    } else {
                        return this;
                    }
                }
                var oo;
                if (this.Prev != null && ((oo = Bridge.as(this.Prev, GreyHackTools.GreyHackCompiler.Token.Operator))) != null && oo.NeedsRight) {
                    if (force) {
                        var b1 = this.EndStatement;
                        this.EndStatement = false;
                        var r1 = GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context);
                        this.EndStatement = b1;
                        return r1;
                    } else {
                        return this;
                    }
                }

                return GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context);
            },
            toString: function () {
                return System.String.format("Variable: {0}", [GreyHackTools.GreyHackCompiler.Token.prototype.toString.call(this)]);
            }
        }
    });

    Bridge.define("GreyHackTools.GreyHackCompiler.Token.Include", {
        inherits: [GreyHackTools.GreyHackCompiler.Token],
        $kind: "nested class",
        ctors: {
            ctor: function () {
                this.$initialize();
                GreyHackTools.GreyHackCompiler.Token.ctor.call(this);
                this.Optimizable = false;
            }
        },
        methods: {
            Compile: function (context, force) {
                if (force === void 0) { force = false; }
                return GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context, force);
            },
            toString: function () {
                return System.String.format("Include: {0}", [GreyHackTools.GreyHackCompiler.Token.prototype.toString.call(this)]);
            }
        }
    });

    Bridge.define("GreyHackTools.GreyHackCompiler.Token.Keyword", {
        inherits: [GreyHackTools.GreyHackCompiler.Token],
        $kind: "nested class",
        ctors: {
            ctor: function () {
                this.$initialize();
                GreyHackTools.GreyHackCompiler.Token.ctor.call(this);
                this.Optimizable = false;
            }
        },
        methods: {
            Optimize: function (context) {
                if (Bridge.referenceEquals(this.Value, "true")) {
                    this.Value = "1";
                }
                if (Bridge.referenceEquals(this.Value, "false")) {
                    this.Value = "0";
                }
                return GreyHackTools.GreyHackCompiler.Token.prototype.Optimize.call(this, context);
            }
        }
    });

    Bridge.define("GreyHackTools.GreyHackCompiler.Token.Separator", {
        inherits: [GreyHackTools.GreyHackCompiler.Token],
        $kind: "nested class",
        ctors: {
            ctor: function () {
                this.$initialize();
                GreyHackTools.GreyHackCompiler.Token.ctor.call(this);
                this.Optimizable = false;
            }
        },
        methods: {
            toString: function () {
                return System.String.format("Separator: {0}", [this.Value]);
            }
        }
    });

    Bridge.define("GreyHackTools.GreyHackCompiler.Token.String", {
        inherits: [GreyHackTools.GreyHackCompiler.Token],
        $kind: "nested class",
        methods: {
            Compile: function (context, force) {
                if (force === void 0) { force = false; }
                if (this.Custom) {
                    context.StringBuilder.append("(\"");
                    var depth = 0;
                    var last = 0;
                    for (var i = 0; i < this.Value.length; i = (i + 1) | 0) {
                        if (((i + 1) | 0) < this.Value.length && this.Value.charCodeAt(i) === 92 && (this.Value.charCodeAt(((i + 1) | 0)) === 123 || this.Value.charCodeAt(((i + 1) | 0)) === 125)) {
                            i = (i + 1) | 0;
                            context.StringBuilder.append(String.fromCharCode(this.Value.charCodeAt(i)));
                            continue;
                        }
                        if (this.Value.charCodeAt(i) === 123) {
                            if (depth === 0) {
                                last = (i + 1) | 0;
                            }
                            depth = (depth + 1) | 0;
                        } else if (this.Value.charCodeAt(i) === 125 && (i === 0 || this.Value.charCodeAt(((i - 1) | 0)) !== 92)) {
                            depth = (depth - 1) | 0;
                            if (depth < 0) {
                                throw new System.Exception(System.String.format("string format ({0}) is not valid", [this.Value]));
                            }
                            if (depth === 0) {
                                context.StringBuilder.append("\"+(");
                                var innerCodeContext = GreyHackTools.GreyHackCompiler.Tokenize(System.String.replaceAll(this.Value.substr(last, ((i - last) | 0)), "\"\"", "\""));
                                innerCodeContext.nameProvider = context.nameProvider;
                                var compiled = innerCodeContext.Compile(context.optimizeEnabled);
                                context.StringBuilder.append(compiled);
                                context.StringBuilder.append(")+\"");
                            }
                        } else if (depth === 0) {
                            context.StringBuilder.append(String.fromCharCode(this.Value.charCodeAt(i)));
                        }
                    }
                    context.StringBuilder.append("\")");
                } else {
                    context.StringBuilder.append(String.fromCharCode(34));
                    context.StringBuilder.append(this.Value);
                    context.StringBuilder.append(String.fromCharCode(34));
                }

                if (this.EndStatement) {
                    context.StringBuilder.append(GreyHackTools.GreyHackCompiler._separator);
                }
                return this;
            },
            toString: function () {
                return System.String.format("String: {0}{1}", (this.Custom ? "$" : ""), GreyHackTools.GreyHackCompiler.Token.prototype.toString.call(this));
            }
        }
    });

    Bridge.define("GreyHackTools.GreyHackCompiler.Token.Template", {
        inherits: [GreyHackTools.GreyHackCompiler.Token],
        $kind: "nested class",
        fields: {
            _value: null,
            TemplateType: 0,
            RegexString: null,
            Matches: null
        },
        props: {
            Value: {
                get: function () {
                    return this._value;
                },
                set: function (value) {
                    if (this._value != null) {
                        return;
                    }
                    this._value = value;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                GreyHackTools.GreyHackCompiler.Token.ctor.call(this);

            },
            $ctor1: function (template, matches, regex, context) {
                this.$initialize();
                GreyHackTools.GreyHackCompiler.Token.ctor.call(this);
                this.TemplateType = template;
                this.Matches = matches;
                this.RegexString = regex;

                switch (template) {
                    case GreyHackTools.GreyHackCompiler.ETemplate.IgnoreOptimization: 
                        this._value = this.Matches.get(0).getGroups().get(2).getValue();
                        if (this.IsValueString()) {
                            this._value = this._value.substr(1, ((this._value.length - 2) | 0));
                            if (!context.IgnoreOptimize(this._value)) {
                                context.customIgnoreOptimize.add(this._value);
                            }
                            this._value = String.fromCharCode(34) + (this._value || "") + String.fromCharCode(34);
                        } else {
                            if (!context.IgnoreOptimize(this.Matches.get(0).getGroups().get(2).getValue())) {
                                context.customIgnoreOptimize.add(this.Matches.get(0).getGroups().get(2).getValue());
                            }
                        }
                        break;
                }
            }
        },
        methods: {
            Optimize: function (context) {
                switch (this.TemplateType) {
                    case GreyHackTools.GreyHackCompiler.ETemplate.IterationIndex: 
                        if (this.Prev != null && Bridge.referenceEquals(this.Prev.Value, ".")) {
                            return GreyHackTools.GreyHackCompiler.Token.prototype.Optimize.call(this, context);
                        }
                        var var_name = this.Matches.get(0).getGroups().get(2).getValue();
                        if (System.String.isNullOrWhiteSpace(var_name) || context.IgnoreOptimize(var_name)) {
                            return this;
                        }
                        this._value = System.Text.RegularExpressions.Regex.replace(this.Value, this.RegexString, System.String.format("$1{0}$3", [context.nameProvider.GetReplace(var_name)]));
                        break;
                    case GreyHackTools.GreyHackCompiler.ETemplate.IgnoreOptimization: 
                        break;
                }
                return this;
            },
            Compile: function (context, force) {
                if (force === void 0) { force = false; }
                switch (this.TemplateType) {
                    case GreyHackTools.GreyHackCompiler.ETemplate.Comment: 
                        if ((context.Settings & GreyHackTools.GreyHackCompiler.Settings.RemoveComments) !== 0) {
                            if (this.Prev != null) {
                                this.Prev.Next = this.Next;
                                if (!this.Prev.EndStatement) {
                                    this.Prev.EndStatement = true;
                                    context.StringBuilder.append(GreyHackTools.GreyHackCompiler._separator);
                                }
                            } else {
                                context.RootToken = this.Next;
                            }

                            if (this.Next != null) {
                                this.Next.Prev = this.Prev;
                            } else {
                                context.LastToken = this.Prev;
                            }
                            return this;
                        }
                        break;
                }

                return GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context, force);
            },
            IsValueString: function () {
                if (this.Value.length < 2) {
                    return false;
                }
                return this.Value.charCodeAt(0) === 34 && this.Value.charCodeAt(((this.Value.length - 1) | 0)) === 34;
            }
        }
    });

    Bridge.define("GreyHackTools.GreyHackCompiler.Token.Bracket", {
        inherits: [GreyHackTools.GreyHackCompiler.Token.Variable],
        $kind: "nested class",
        fields: {
            _openingToClosing: null
        },
        props: {
            IsOpening: {
                get: function () {
                    return Bridge.referenceEquals(this.Value, "(") || Bridge.referenceEquals(this.Value, "[") || Bridge.referenceEquals(this.Value, "{");
                }
            },
            IsClosing: {
                get: function () {
                    return Bridge.referenceEquals(this.Value, ")") || Bridge.referenceEquals(this.Value, "]") || Bridge.referenceEquals(this.Value, "}");
                }
            }
        },
        ctors: {
            init: function () {
                this._openingToClosing = function (_o1) {
                        _o1.add(40, 41);
                        _o1.add(91, 93);
                        _o1.add(123, 125);
                        return _o1;
                    }(new (System.Collections.Generic.Dictionary$2(System.Char,System.Char)).ctor());
            },
            ctor: function () {
                this.$initialize();
                GreyHackTools.GreyHackCompiler.Token.Variable.ctor.call(this);
                this.Optimizable = false;
            }
        },
        methods: {
            CompileInside: function (context, includeLastBracket, customBody, postfix) {
                if (includeLastBracket === void 0) { includeLastBracket = true; }
                if (customBody === void 0) { customBody = false; }
                if (postfix === void 0) { postfix = ""; }

                var b = false;
                var last = null;
                var node = this.Next;
                while (node != null) {
                    if (!customBody) {
                        b = node.EndStatement;
                        node.EndStatement = false;
                    }
                    var tb;
                    if (!includeLastBracket && ((tb = Bridge.as(node, GreyHackTools.GreyHackCompiler.Token.Bracket))) != null && tb.IsClosing && System.Linq.Enumerable.from(tb.Value, System.Char).last() === this._openingToClosing.getItem(System.Linq.Enumerable.from(this.Value, System.Char).last())) {
                        if (tb.EndStatement && last != null && !last.EndStatement && !System.String.contains(last.Value,GreyHackTools.GreyHackCompiler._separator)) {
                            context.StringBuilder.append(GreyHackTools.GreyHackCompiler._separator);
                        }

                        break;
                    }

                    var tmp = node.Compile(context);
                    if (!customBody) {
                        node.EndStatement = b;
                    }
                    var br;
                    if (((br = Bridge.as(node, GreyHackTools.GreyHackCompiler.Token.Bracket))) != null && br.IsClosing) {
                        break;
                    }
                    last = node;
                    node = tmp.Next;
                }

                context.StringBuilder.append(postfix);
                this.Value = context.StringBuilder.toString();
                context.stringBuilders.Pop();
                return node;
            },
            Compile: function (context, force) {
                if (force === void 0) { force = false; }
                if (this.Custom) {
                    return GreyHackTools.GreyHackCompiler.Token.Variable.prototype.Compile.call(this, context, force);
                }
                if (this.IsOpening) {
                    var node = this.Next;
                    context.stringBuilders.Push(new System.Text.StringBuilder());
                    var b;
                    if (Bridge.referenceEquals(this.Value, "{") && ((((b = Bridge.as(this.Prev, GreyHackTools.GreyHackCompiler.Token.Bracket))) != null && b.Custom) || this.Prev.CompareBeginningOfValue("function"))) {
                        if (!this.EndStatement) {
                            this.EndStatement = true;
                        }
                        var t;
                        var type = "";
                        if (this.Prev.CompareBeginningOfValue("function")) {
                            type = "function";
                            t = this.Prev;
                        } else {
                            t = this.Prev.Prev;
                        }

                        if (System.Nullable.getValue((t != null ? t.CompareBeginningOfValue("if") : null))) {
                            type = "if";
                            context.StringBuilder.append(" then");
                        } else if (System.Nullable.getValue((t != null ? t.CompareBeginningOfValue("for") : null))) {
                            type = "for";
                        } else if (System.Nullable.getValue((t != null ? t.CompareBeginningOfValue("while") : null))) {
                            type = "while";
                        }

                        if (t.EndStatement || this.EndStatement) {
                            context.StringBuilder.append(GreyHackTools.GreyHackCompiler._separator);
                        }
                        node = this.CompileInside(context, false, true, System.String.format("end {0}", [type]));
                    } else {
                        var k;
                        if (((k = Bridge.as(this.Prev, GreyHackTools.GreyHackCompiler.Token.Keyword))) != null && Bridge.referenceEquals(k.Value, "for")) {
                            context.StringBuilder.append(String.fromCharCode(32));
                            node = this.CompileInside(context, false);
                        } else {
                            context.StringBuilder.append(this.Value);
                            node = this.CompileInside(context);
                        }
                    }
                    this.Next = node != null ? node.Next : null;
                    if (node != null) {
                        this.EndStatement = node.EndStatement;
                    }

                    if (this.Prev == null) {
                        context.RootToken = this;
                    } else {
                        this.Prev.Next = this;
                    }

                    if (node == null || node.Next == null) {
                        context.LastToken = this;
                    } else {
                        node.Next.Prev = this;
                    }

                    this.Custom = true;
                    return this.Compile(context, force);
                } else {
                    return GreyHackTools.GreyHackCompiler.Token.Variable.prototype.Compile.call(this, context, force);
                }
            },
            toString: function () {
                return System.String.format("Bracket: {0}", [this.Value]);
            }
        }
    });

    Bridge.define("GreyHackTools.GreyHackCompiler.Token.Operator", {
        inherits: [GreyHackTools.GreyHackCompiler.Token.Variable],
        $kind: "nested class",
        props: {
            NeedsLeft: {
                get: function () {
                    return GreyHackTools.GreyHackCompiler._operators.containsKey(this.Value) && System.String.contains(GreyHackTools.GreyHackCompiler._operators.getItem(this.Value),"$a");
                }
            },
            NeedsRight: {
                get: function () {
                    return GreyHackTools.GreyHackCompiler._operators.containsKey(this.Value) && System.String.contains(GreyHackTools.GreyHackCompiler._operators.getItem(this.Value),"$b");
                }
            },
            Custom: {
                get: function () {
                    return GreyHackTools.GreyHackCompiler._operators.containsKey(this.Value);
                },
                set: function (value) { }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                GreyHackTools.GreyHackCompiler.Token.Variable.ctor.call(this);
                this.Optimizable = false;
            }
        },
        methods: {
            Compile: function (context, force) {
                var $t, $t1;
                if (force === void 0) { force = false; }
                if (this.Custom) {
                    var s = GreyHackTools.GreyHackCompiler._operators.getItem(this.Value);
                    if (this.NeedsLeft && this.Prev != null) {
                        var b;
                        if (((b = Bridge.as(this.Prev, GreyHackTools.GreyHackCompiler.Token.Bracket))) != null && b.IsOpening) {
                            throw new System.Exception(System.String.format("invalid syntax for template {0}", [this.Value]));
                        }
                        context.stringBuilders.Push(new System.Text.StringBuilder());
                        this.Prev.Compile(context, true);
                        s = System.String.replaceAll(s, "$a", context.StringBuilder.toString());
                        context.stringBuilders.Pop();

                        if ((($t = this.Prev) != null ? $t.Prev : null) != null) {
                            this.Prev = this.Prev.Prev;
                            this.Prev.Next = this;
                        } else {
                            context.RootToken = this;
                        }
                    }

                    if (this.NeedsRight && this.Next != null) {
                        context.stringBuilders.Push(new System.Text.StringBuilder());
                        this.Next.Compile(context, true);
                        s = System.String.replaceAll(s, "$b", context.StringBuilder.toString());
                        context.stringBuilders.Pop();
                        this.EndStatement = this.Next.EndStatement;
                        if ((($t1 = this.Next) != null ? $t1.Next : null) != null) {
                            this.Next = this.Next.Next;
                            this.Next.Prev = this;
                        } else {
                            this.Next = null;
                            context.LastToken = this;
                        }
                    }

                    this.Value = s;

                    return GreyHackTools.GreyHackCompiler.Token.Variable.prototype.Compile.call(this, context, force);
                } else {
                    return GreyHackTools.GreyHackCompiler.Token.Variable.prototype.Compile.call(this, context, force);
                }
            },
            toString: function () {
                return System.String.format("Operator: {0}", [GreyHackTools.GreyHackCompiler.Token.Variable.prototype.toString.call(this)]);
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJKc01TcHBDb21waWxlci5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FvSjJDQTs0Q0FFc0JBLEFBQWtEQSxVQUFDQTs0QkFBT0E7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBLE9BQU9BOzBCQUF2RkEsS0FBSUE7MENBQ3BDQSxBQUFrREEsVUFBQ0E7NEJBQU9BOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBLE9BQU9BOzBCQUFqSEEsS0FBSUE7MkNBQ2pDQSxBQUFrREEsVUFBQ0E7NEJBQU9BOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUEsT0FBT0E7MEJBQXpOQSxLQUFJQTsrQ0FFNUJBLEFBQW9EQSxVQUFDQTs0QkFBT0E7NEJBQWNBOzRCQUFnQkE7NEJBQWFBLE9BQU9BOzBCQUFoRkEsS0FBSUE7eUNBRXhDQSxBQUFvREEsVUFBQ0E7NEJBQU9BOzRCQUFjQSxPQUFPQTswQkFBbkRBLEtBQUlBOzRDQUNqQ0EsQUFBa0RBLFVBQUNBOzRCQUFPQTs0QkFBYUEsT0FBT0E7MEJBQWhEQSxLQUFJQTt5Q0FFckNBLEFBQWtEQSxVQUFDQTs0QkFBT0E7NEJBQWFBOzRCQUFhQSxPQUFPQTswQkFBN0RBLEtBQUlBO3FDQUVwQ0EsQUFBb0RBLFVBQUNBOzRCQUFPQTs0QkFBY0E7NEJBQWdCQTs0QkFBZ0JBOzRCQUFlQTs0QkFBaUJBOzRCQUFlQTs0QkFBY0E7NEJBQWVBOzRCQUFjQTs0QkFBZUE7NEJBQWdCQTs0QkFBaUJBOzRCQUFrQkE7NEJBQW9CQTs0QkFBaUJBOzRCQUFlQSxPQUFPQTswQkFBblNBLEtBQUlBOzJDQUU1QkEsQUFBb0RBLFVB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dXNpbmcgQnJpZGdlO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRleHQuUmVndWxhckV4cHJlc3Npb25zO1xyXG5cclxubmFtZXNwYWNlIEpzTVNwcENvbXBpbGVyXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBjbGFzcyBDb250ZXh0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgUXVldWU8Y2hhcj4gUGxhaW5JbnB1dCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUb2tlbiBSb290VG9rZW4geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgVG9rZW4gTGFzdFRva2VuIHsgZ2V0OyBzZXQ7IH1cclxucHVibGljIFN0cmluZ0J1aWxkZXIgU3RyaW5nQnVpbGRlclxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nQnVpbGRlcnMuUGVlaygpO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgICAgIGludGVybmFsIFN0YWNrPFN0cmluZ0J1aWxkZXI+IHN0cmluZ0J1aWxkZXJzID0gbmV3IFN0YWNrPFN0cmluZ0J1aWxkZXI+KCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIFN0YWNrPGJvb2w+IFNob3VsZE9wdGltaXplU3RyaW5nID0gbmV3IFN0YWNrPGJvb2w+KCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIFN0YWNrPGJvb2w+IE1hcEFjdGl2ZSA9IG5ldyBTdGFjazxib29sPigpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBWYXJpYWJsZU5hbWVQcm92aWRlciBuYW1lUHJvdmlkZXIgPSBuZXcgVmFyaWFibGVOYW1lUHJvdmlkZXIoKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgYm9vbCBvcHRpbWl6ZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgU2V0dGluZ3MgU2V0dGluZ3MgPSBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuU2V0dGluZ3MuTm9uZTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgSGFzaFNldDxzdHJpbmc+IGN1c3RvbUlnbm9yZU9wdGltaXplID0gbmV3IEhhc2hTZXQ8c3RyaW5nPigpO1xyXG5wdWJsaWMgYm9vbCBJZ25vcmVPcHRpbWl6ZShzdHJpbmcgdmFsdWUpXHJcbntcclxuICAgIHJldHVybiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX2lnbm9yZU9wdGltaXplLkNvbnRhaW5zKHZhbHVlKSB8fCBjdXN0b21JZ25vcmVPcHRpbWl6ZS5Db250YWlucyh2YWx1ZSk7XHJcbn1cclxuICAgICAgICAgICAgcHVibGljIHZvaWQgQWRkVG9rZW4oVG9rZW4gdG9rZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChSb290VG9rZW4gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBSb290VG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICBMYXN0VG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBMYXN0VG9rZW4uTmV4dCA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuLlByZXYgPSBMYXN0VG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgTGFzdFRva2VuID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHVibGljIENvbnRleHQoU2V0dGluZ3Mgc2V0dGluZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICBQbGFpbklucHV0ID0gbmV3IFF1ZXVlPGNoYXI+KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcigpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBTaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIE1hcEFjdGl2ZS5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0cmluZyBDb21waWxlKGJvb2wgb3B0aW1pemUgPSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3B0aW1pemVFbmFibGVkID0gb3B0aW1pemU7XHJcbiAgICAgICAgICAgICAgICBTdHJpbmdCdWlsZGVyLkNsZWFyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBUb2tlbiBub2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGltaXplKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBSb290VG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLk9wdGltaXplKHRoaXMpLk5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUgPSBSb290VG9rZW47XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLkNvbXBpbGUodGhpcykuTmV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBTdHJpbmdCdWlsZGVyIHNiID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICAgICAgICAgIFRva2VuIG5vZGUgPSBSb290VG9rZW47XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgaXMgVG9rZW4uU3RyaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQoJ1wiJytub2RlLlZhbHVlKyAnXCInKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLkFwcGVuZChub2RlLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5FbmRTdGF0ZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQoJ1xcbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQoJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kTGluZShub2RlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLk5leHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNiLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gU2V0dGluZ3NcclxuXHJcbiAgICAgICAgW0ZsYWdzXVxyXG4gICAgICAgIHB1YmxpYyBlbnVtIFNldHRpbmdzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOb25lID0gMCxcclxuICAgICAgICAgICAgSWdub3JlTWFwVmFyaWFibGVzID0gMSxcclxuICAgICAgICAgICAgUmVtb3ZlQ29tbWVudHMgPSAyLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIEludGVybmFsXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHN0cmluZyBfc2VwYXJhdG9yID0gRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAvL3ByaXZhdGUgc3RhdGljIHN0cmluZyBfc2VwYXJhdG9yID0gXCI7XCI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxjaGFyPiBfdG9rZW5TZXBhcmF0b3JzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8Y2hhcj4oKSwoX28xKT0+e19vMS5BZGQoJyAnKTtfbzEuQWRkKCcuJyk7X28xLkFkZCgnLCcpO19vMS5BZGQoJzonKTtyZXR1cm4gX28xO30pO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuQnJhY2tldHMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzIpPT57X28yLkFkZCgnKCcpO19vMi5BZGQoJyknKTtfbzIuQWRkKCdbJyk7X28yLkFkZCgnXScpO19vMi5BZGQoJ3snKTtfbzIuQWRkKCd9Jyk7cmV0dXJuIF9vMjt9KTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlbk9wZXJhdG9ycyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vMyk9PntfbzMuQWRkKCcrJyk7X28zLkFkZCgnLScpO19vMy5BZGQoJyonKTtfbzMuQWRkKCcvJyk7X28zLkFkZCgnJScpO19vMy5BZGQoJzwnKTtfbzMuQWRkKCc+Jyk7X28zLkFkZCgnPScpO19vMy5BZGQoJyEnKTtfbzMuQWRkKCdeJyk7X28zLkFkZCgnJicpO19vMy5BZGQoJ3wnKTtfbzMuQWRkKCdAJyk7X28zLkFkZCgnficpO3JldHVybiBfbzM7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8c3RyaW5nPiBfdG9rZW5FbmRTdGF0ZW1lbnRzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8c3RyaW5nPigpLChfbzQpPT57X280LkFkZChcIlxcblwiKTtfbzQuQWRkKFwiXFxyXFxuXCIpO19vNC5BZGQoXCI7XCIpO3JldHVybiBfbzQ7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8c3RyaW5nPiBfdG9rZW5JbmNsdWRlID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8c3RyaW5nPigpLChfbzUpPT57X281LkFkZChcIiMhXCIpO3JldHVybiBfbzU7fSk7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxjaGFyPiBfdG9rZW5FbmRJbmNsdWRlID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8Y2hhcj4oKSwoX282KT0+e19vNi5BZGQoJyEnKTtyZXR1cm4gX282O30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlblN0cmluZ3MgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzcpPT57X283LkFkZCgnXCInKTtfbzcuQWRkKCckJyk7cmV0dXJuIF9vNzt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxzdHJpbmc+IF9rZXl3b3JkcyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PHN0cmluZz4oKSwoX284KT0+e19vOC5BZGQoXCJpZlwiKTtfbzguQWRkKFwidGhlblwiKTtfbzguQWRkKFwiZWxzZVwiKTtfbzguQWRkKFwiZW5kXCIpO19vOC5BZGQoXCJ3aGlsZVwiKTtfbzguQWRkKFwiZm9yXCIpO19vOC5BZGQoXCJpblwiKTtfbzguQWRkKFwiYW5kXCIpO19vOC5BZGQoXCJvclwiKTtfbzguQWRkKFwibm90XCIpO19vOC5BZGQoXCJ0cnVlXCIpO19vOC5BZGQoXCJmYWxzZVwiKTtfbzguQWRkKFwicmV0dXJuXCIpO19vOC5BZGQoXCJjb250aW51ZVwiKTtfbzguQWRkKFwiYnJlYWtcIik7X284LkFkZChcIm5ld1wiKTtyZXR1cm4gX284O30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PHN0cmluZz4gX2lnbm9yZU9wdGltaXplID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8c3RyaW5nPigpLChfbzkpPT57X285LkFkZChcIkZpbGVcIik7X285LkFkZChcImFic1wiKTtfbzkuQWRkKFwiYWNvc1wiKTtfbzkuQWRkKFwiYWN0aXZlX25ldF9jYXJkXCIpO19vOS5BZGQoXCJhY3RpdmVfdXNlclwiKTtfbzkuQWRkKFwiYWlyY3JhY2tcIik7X285LkFkZChcImFpcm1vblwiKTtfbzkuQWRkKFwiYXNpblwiKTtfbzkuQWRkKFwiYXRhblwiKTtfbzkuQWRkKFwiYml0d2lzZVwiKTtfbzkuQWRkKFwiYnNzaWRfbmFtZVwiKTtfbzkuQWRkKFwiYnVpbGRcIik7X285LkFkZChcImNlaWxcIik7X285LkFkZChcImNoYW5nZV9wYXNzd29yZFwiKTtfbzkuQWRkKFwiY2hhclwiKTtfbzkuQWRkKFwiY2htb2RcIik7X285LkFkZChcImNsb3NlX3Byb2dyYW1cIik7X285LkFkZChcImNvZGVcIik7X285LkFkZChcImNvbW1hbmRfaW5mb1wiKTtfbzkuQWRkKFwiY29ubmVjdF9ldGhlcm5ldFwiKTtfbzkuQWRkKFwiY29ubmVjdF9zZXJ2aWNlXCIpO19vOS5BZGQoXCJjb25uZWN0X3dpZmlcIik7X285LkFkZChcImNvcHlcIik7X285LkFkZChcImNvc1wiKTtfbzkuQWRkKFwiY3JlYXRlX2ZvbGRlclwiKTtfbzkuQWRkKFwiY3JlYXRlX2dyb3VwXCIpO19vOS5BZGQoXCJjcmVhdGVfdXNlclwiKTtfbzkuQWRkKFwiY3VycmVudF9kYXRlXCIpO19vOS5BZGQoXCJjdXJyZW50X3BhdGhcIik7X285LkFkZChcImRlY2lwaGVyXCIpO19vOS5BZGQoXCJkZWxldGVcIik7X285LkFkZChcImRlbGV0ZV9ncm91cFwiKTtfbzkuQWRkKFwiZGVsZXRlX3VzZXJcIik7X285LkFkZChcImRldmljZV9wb3J0c1wiKTtfbzkuQWRkKFwiZGV2aWNlc19sYW5faXBcIik7X285LkFkZChcImR1bXBfbGliXCIpO19vOS5BZGQoXCJlc3NpZF9uYW1lXCIpO19vOS5BZGQoXCJleGl0XCIpO19vOS5BZGQoXCJmbG9vclwiKTtfbzkuQWRkKFwiZm9ybWF0X2NvbHVtbnNcIik7X285LkFkZChcImdldF9maWxlc1wiKTtfbzkuQWRkKFwiZ2V0X2ZvbGRlcnNcIik7X285LkFkZChcImdldF9sYW5faXBcIik7X285LkFkZChcImdldF9wb3J0c1wiKTtfbzkuQWRkKFwiZ2V0X3JvdXRlclwiKTtfbzkuQWRkKFwiZ2V0X3NoZWxsXCIpO19vOS5BZGQoXCJnbG9iYWxzXCIpO19vOS5BZGQoXCJncm91cFwiKTtfbzkuQWRkKFwiZ3JvdXBzXCIpO19vOS5BZGQoXCJoYXNJbmRleFwiKTtfbzkuQWRkKFwiaGFzX3Blcm1pc3Npb25cIik7X285LkFkZChcImhvc3RfY29tcHV0ZXJcIik7X285LkFkZChcImluY2x1ZGVfbGliXCIpO19vOS5BZGQoXCJpbmRleE9mXCIpO19vOS5BZGQoXCJpbmRleGVzXCIpO19vOS5BZGQoXCJpc19iaW5hcnlcIik7X285LkFkZChcImlzX2Nsb3NlZFwiKTtfbzkuQWRkKFwiaXNfZm9sZGVyXCIpO19vOS5BZGQoXCJpc19sYW5faXBcIik7X285LkFkZChcImlzX25ldHdvcmtfYWN0aXZlXCIpO19vOS5BZGQoXCJpc192YWxpZF9pcFwiKTtfbzkuQWRkKFwiam9pblwiKTtfbzkuQWRkKFwibGFzdEluZGV4T2ZcIik7X285LkFkZChcImxhdW5jaFwiKTtfbzkuQWRkKFwibGVuXCIpO19vOS5BZGQoXCJsaWJfbmFtZVwiKTtfbzkuQWRkKFwibG9hZFwiKTtfbzkuQWRkKFwibG9jYWxfaXBcIik7X285LkFkZChcImxvY2Fsc1wiKTtfbzkuQWRkKFwibG93ZXJcIik7X285LkFkZChcIm1kNVwiKTtfbzkuQWRkKFwibW92ZVwiKTtfbzkuQWRkKFwibmFtZVwiKTtfbzkuQWRkKFwibmV0X3VzZVwiKTtfbzkuQWRkKFwibmV0d29ya19kZXZpY2VzXCIpO19vOS5BZGQoXCJuZXR3b3JrX2dhdGV3YXlcIik7X285LkFkZChcIm5zbG9va3VwXCIpO19vOS5BZGQoXCJvdmVyZmxvd1wiKTtfbzkuQWRkKFwib3duZXJcIik7X285LkFkZChcInBhcmVudFwiKTtfbzkuQWRkKFwicGFyZW50X3BhdGhcIik7X285LkFkZChcInBhdGhcIik7X285LkFkZChcInBlcm1pc3Npb25zXCIpO19vOS5BZGQoXCJwaVwiKTtfbzkuQWRkKFwicGluZ1wiKTtfbzkuQWRkKFwicGluZ19wb3J0XCIpO19vOS5BZGQoXCJwb3BcIik7X285LkFkZChcInBvcnRfaW5mb1wiKTtfbzkuQWRkKFwicG9ydF9udW1iZXJcIik7X285LkFkZChcInByaW50XCIpO19vOS5BZGQoXCJwcm9ncmFtX3BhdGhcIik7X285LkFkZChcInB1YmxpY19pcFwiKTtfbzkuQWRkKFwicHVsbFwiKTtfbzkuQWRkKFwicHVzaFwiKTtfbzkuQWRkKFwicHV0XCIpO19vOS5BZGQoXCJyYW5nZVwiKTtfbzkuQWRkKFwicmVtb3ZlXCIpO19vOS5BZGQoXCJyZW5hbWVcIik7X285LkFkZChcInJlcGxhY2VcIik7X285LkFkZChcInJldmVyc2VcIik7X285LkFkZChcInJuZFwiKTtfbzkuQWRkKFwicm91bmRcIik7X285LkFkZChcInNjYW5cIik7X285LkFkZChcInNjYW5fYWRkcmVzc1wiKTtfbzkuQWRkKFwic2NwXCIpO19vOS5BZGQoXCJzZXRfY29udGVudFwiKTtfbzkuQWRkKFwic2V0X2dyb3VwXCIpO19vOS5BZGQoXCJzaG93X3Byb2NzXCIpO19vOS5BZGQoXCJzaHVmZmxlXCIpO19vOS5BZGQoXCJzaWduXCIpO19vOS5BZGQoXCJzaW5cIik7X285LkFkZChcInNpemVcIik7X285LkFkZChcInNsaWNlXCIpO19vOS5BZGQoXCJzbXRwX3VzZXJfbGlzdFwiKTtfbzkuQWRkKFwic29ydFwiKTtfbzkuQWRkKFwic3BsaXRcIik7X285LkFkZChcInNxcnRcIik7X285LkFkZChcInN0YXJ0X3Rlcm1pbmFsXCIpO19vOS5BZGQoXCJzdHJcIik7X285LkFkZChcInN1bVwiKTtfbzkuQWRkKFwidGFuXCIpO19vOS5BZGQoXCJ0b19pbnRcIik7X285LkFkZChcInRvdWNoXCIpO19vOS5BZGQoXCJ0cmltXCIpO19vOS5BZGQoXCJ0eXBlb2ZcIik7X285LkFkZChcInVwcGVyXCIpO19vOS5BZGQoXCJ1c2VkX3BvcnRzXCIpO19vOS5BZGQoXCJ1c2VyX2JhbmtfbnVtYmVyXCIpO19vOS5BZGQoXCJ1c2VyX2lucHV0XCIpO19vOS5BZGQoXCJ1c2VyX21haWxfYWRkcmVzc1wiKTtfbzkuQWRkKFwidmFsXCIpO19vOS5BZGQoXCJ2YWx1ZXNcIik7X285LkFkZChcInZlcnNpb25cIik7X285LkFkZChcIndob2lzXCIpO19vOS5BZGQoXCJ3aWZpX25ldHdvcmtzXCIpO19vOS5BZGQoXCJwYXJhbXNcIik7X285LkFkZChcImNsZWFyX3NjcmVlblwiKTtfbzkuQWRkKFwid2FpdFwiKTtfbzkuQWRkKFwic2VsZlwiKTtfbzkuQWRkKFwibnVsbFwiKTtfbzkuQWRkKFwiZnVuY3Rpb25cIik7X285LkFkZChcImNvbnRlbnRcIik7X285LkFkZChcImxhbl9pcFwiKTtfbzkuQWRkKFwiZ2V0X2NvbnRlbnRcIik7X285LkFkZChcImFpcmVwbGF5XCIpO19vOS5BZGQoXCJmaXJld2FsbF9ydWxlc1wiKTtfbzkuQWRkKFwia2VybmVsX3ZlcnNpb25cIik7X285LkFkZChcImtlcm5lbF92ZXJzaW9uXCIpO19vOS5BZGQoXCJyc2hlbGxfc2VydmVyXCIpO19vOS5BZGQoXCJyc2hlbGxfc2VydmVyXCIpO19vOS5BZGQoXCJfX2lzYVwiKTtfbzkuQWRkKFwiaWZcIik7X285LkFkZChcInRoZW5cIik7X285LkFkZChcImVsc2VcIik7X285LkFkZChcImVuZFwiKTtfbzkuQWRkKFwid2hpbGVcIik7X285LkFkZChcImZvclwiKTtfbzkuQWRkKFwiaW5cIik7X285LkFkZChcImFuZFwiKTtfbzkuQWRkKFwib3JcIik7X285LkFkZChcIm5vdFwiKTtfbzkuQWRkKFwidHJ1ZVwiKTtfbzkuQWRkKFwiZmFsc2VcIik7X285LkFkZChcIm51bGxcIik7X285LkFkZChcInJldHVyblwiKTtfbzkuQWRkKFwiY29udGludWVcIik7X285LkFkZChcImJyZWFrXCIpO19vOS5BZGQoXCJmdW5jdGlvblwiKTtfbzkuQWRkKFwibmV3XCIpO19vOS5BZGQoXCJzZWxmXCIpO3JldHVybiBfbzk7fSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRGljdGlvbmFyeTxzdHJpbmcsIHN0cmluZz4gX29wZXJhdG9ycyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgc3RyaW5nPigpLChfbzEwKT0+e19vMTAuQWRkKFwiJiZcIixAXCIgYW5kIFwiKTtfbzEwLkFkZChcInx8XCIsQFwiIG9yIFwiKTtfbzEwLkFkZChcIjw8XCIsQFwiYml0d2lzZShcIlwiPDxcIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcIj4+XCIsQFwiYml0d2lzZShcIlwiPj5cIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcIj4+PlwiLEBcImJpdHdpc2UoXCJcIj4+PlwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwiXl5cIixAXCJiaXR3aXNlKFwiXCJeXCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCImXCIsQFwiYml0d2lzZShcIlwiJlwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwifFwiLEBcImJpdHdpc2UoXCJcInxcIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcIn5cIixAXCJiaXR3aXNlKFwiXCJ+XCJcIiwkYilcIik7X28xMC5BZGQoXCIrK1wiLEBcIiRhPSRhKzFcIik7X28xMC5BZGQoXCItLVwiLEBcIiRhPSRhLTFcIik7X28xMC5BZGQoXCIrPVwiLEBcIiRhPSRhKyRiXCIpO19vMTAuQWRkKFwiLT1cIixAXCIkYT0kYS0kYlwiKTtfbzEwLkFkZChcIio9XCIsQFwiJGE9JGEqJGJcIik7X28xMC5BZGQoXCIvPVwiLEBcIiRhPSRhLyRiXCIpO19vMTAuQWRkKFwiJT1cIixAXCIkYT0kYSUkYlwiKTtfbzEwLkFkZChcIj0+XCIsQFwiZnVuY3Rpb24kYVwiKTtyZXR1cm4gX28xMDt9KTtcclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gRVRlbXBsYXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOb25lLFxyXG4gICAgICAgICAgICBJdGVyYXRpb25JbmRleCxcclxuICAgICAgICAgICAgSWdub3JlT3B0aW1pemF0aW9uLFxyXG4gICAgICAgICAgICBUZXJuYXJ5T3BlcmF0b3IsXHJcbiAgICAgICAgICAgIENvbW1lbnQsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBEaWN0aW9uYXJ5PHN0cmluZywgRVRlbXBsYXRlPiBfdGVtcGxhdGVzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBFVGVtcGxhdGU+KCksKF9vMTEpPT57X28xMS5BZGQoQFwiKF9fKSguKikoX2lkeClcIixFVGVtcGxhdGUuSXRlcmF0aW9uSW5kZXgpO19vMTEuQWRkKEBcIihcXFxcKShcXFMqKVwiLEVUZW1wbGF0ZS5JZ25vcmVPcHRpbWl6YXRpb24pO19vMTEuQWRkKEBcIihcXC9cXC8pKC4qKSRcIixFVGVtcGxhdGUuQ29tbWVudCk7cmV0dXJuIF9vMTE7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGJvb2wgSXNUZW1wbGF0ZShzdHJpbmcgaW5wdXQsIG91dCBzdHJpbmcgcmVnZXgsIG91dCBNYXRjaENvbGxlY3Rpb24gbWF0Y2hlcywgb3V0IEVUZW1wbGF0ZSB0ZW1wbGF0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKEtleVZhbHVlUGFpcjxzdHJpbmcsIEVUZW1wbGF0ZT4gcGFpciBpbiBfdGVtcGxhdGVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtYXRjaGVzID0gUmVnZXguTWF0Y2hlcyhpbnB1dCwgcGFpci5LZXkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMuQ291bnQgIT0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZWdleCA9IHBhaXIuS2V5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gcGFpci5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWF0Y2hlcyA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlZ2V4ID0gbnVsbDtcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSBFVGVtcGxhdGUuTm9uZTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBDb21waWxlKHN0cmluZyBjb2RlLCBib29sIG9wdGltaXplID0gZmFsc2UsIFNldHRpbmdzIHNldHRpbmdzID0gU2V0dGluZ3MuTm9uZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUb2tlbml6ZShjb2RlLCBzZXR0aW5ncykuQ29tcGlsZShvcHRpbWl6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgVHJ5Q29tcGlsZShzdHJpbmcgY29kZSwgb3V0IHN0cmluZyBjb21waWxlZENvZGUsIGJvb2wgb3B0aW1pemUgPSBmYWxzZSwgU2V0dGluZ3Mgc2V0dGluZ3MgPSBTZXR0aW5ncy5Ob25lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHJ5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbXBpbGVkQ29kZSA9IENvbXBpbGUoY29kZSwgb3B0aW1pemUsIHNldHRpbmdzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChFeGNlcHRpb24gZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29tcGlsZWRDb2RlID0gZS5NZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBDb250ZXh0IFRva2VuaXplKHN0cmluZyBwbGFpbkNvZGUsIFNldHRpbmdzIHNldHRpbmdzID0gU2V0dGluZ3MuTm9uZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnRleHQgY29udGV4dCA9IG5ldyBDb250ZXh0KHNldHRpbmdzKSB7IFBsYWluSW5wdXQgPSBuZXcgUXVldWU8Y2hhcj4ocGxhaW5Db2RlKSB9O1xyXG5cclxuICAgICAgICAgICAgVG9rZW4gdG9rZW4gPSBudWxsO1xyXG4gICAgICAgICAgICB3aGlsZSAoKHRva2VuID0gR2V0TmV4dFRva2VuKGNvbnRleHQpKSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LkFkZFRva2VuKHRva2VuKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChjb250ZXh0LlNldHRpbmdzICYgU2V0dGluZ3MuSWdub3JlTWFwVmFyaWFibGVzKSAhPSAwICYmIHRva2VuLlByZXYgIT0gbnVsbCAmJiB0b2tlbi5QcmV2LlZhbHVlID09IFwiLlwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZSh0b2tlbi5WYWx1ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmN1c3RvbUlnbm9yZU9wdGltaXplLkFkZCh0b2tlbi5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgUmVtb3ZlU3BhY2VzKFF1ZXVlPGNoYXI+IHF1ZXVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2hpbGUgKHF1ZXVlLkNvdW50ICE9IDAgJiYgY2hhci5Jc1doaXRlU3BhY2UocXVldWUuUGVlaygpKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcXVldWUuRGVxdWV1ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBGdW5jPENvbnRleHQsIGJvb2w+IEdldFNlcGFyYXRpb25TZWxlY3RvcihDb250ZXh0IGNvbnRleHQsIG91dCBUb2tlbiB0b2tlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICcvJyAmJiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oY29udGV4dC5QbGFpbklucHV0LDEpLkZpcnN0T3JEZWZhdWx0KCkgPT0gJy8nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5UZW1wbGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gIUlzRW5kT2ZMaW5lKHgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5NYXBBY3RpdmUuUGVlaygpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5TZXBhcmF0b3IoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnLCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaCghY29udGV4dC5TZXR0aW5ncy5IYXNGbGFnKFNldHRpbmdzLklnbm9yZU1hcFZhcmlhYmxlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geCA9PiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICc6JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnXFxcXCcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlRlbXBsYXRlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PiAhX3Rva2VuQnJhY2tldHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlblNlcGFyYXRvcnMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlbk9wZXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICFfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSArIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPih4LlBsYWluSW5wdXQsMSkuRmlyc3RPckRlZmF1bHQoKS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKF90b2tlbkluY2x1ZGUuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSArXHJcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPiggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlBsYWluSW5wdXQsMSkuRmlyc3RPckRlZmF1bHQoKS5Ub1N0cmluZygpKSkgLy9pbmNsdWRlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLkluY2x1ZGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHggPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3Rva2VuRW5kSW5jbHVkZS5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHguUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKF90b2tlbk9wZXJhdG9ycy5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpKSkgLy9vcGVyYXRvclxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5PcGVyYXRvcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5CcmFja2V0cy5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpKSkgLy9icmFja2V0c1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5CcmFja2V0KCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnKCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJyknOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdbJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKCghKGNvbnRleHQuTGFzdFRva2VuID09IG51bGwgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTGFzdFRva2VuIGlzIFRva2VuLk9wZXJhdG9yKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjb250ZXh0LlNldHRpbmdzICYgU2V0dGluZ3MuSWdub3JlTWFwVmFyaWFibGVzKSA9PSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnXSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3snOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lk1hcEFjdGl2ZS5QdXNoKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goKGNvbnRleHQuU2V0dGluZ3MgJiBTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd9JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5NYXBBY3RpdmUuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5TZXBhcmF0b3JzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL3NlcGFyYXRvcnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uU2VwYXJhdG9yKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKF90b2tlblN0cmluZ3MuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSkpIC8vc3RyaW5nc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHRva2VuLk9wdGltaXphYmxlID0gY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QZWVrKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnJCcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4uQ3VzdG9tID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5PcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHggPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHZXRTdHJpbmcoeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4geCA9PiAhX3Rva2VuQnJhY2tldHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlblNlcGFyYXRvcnMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlblN0cmluZ3MuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlbk9wZXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSArIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPih4LlBsYWluSW5wdXQsMSkuRmlyc3RPckRlZmF1bHQoKS5Ub1N0cmluZygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgR2V0U3RyaW5nKENvbnRleHQgY29udGV4dClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMCAmJiBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpICE9ICdcIicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgIT0gMClcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKSk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJ1wiJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpKTtcclxuICAgICAgICAgICAgICAgIEdldFN0cmluZyhjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLlJlbW92ZSgwLCAxKTtcclxuICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLlJlbW92ZShjb250ZXh0LlN0cmluZ0J1aWxkZXIuTGVuZ3RoIC0gMSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFRva2VuIEdldE5leHRUb2tlbihDb250ZXh0IGNvbnRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQ2xlYXIoKTtcclxuICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IGNvbnRleHQuU3RyaW5nQnVpbGRlcjtcclxuICAgICAgICAgICAgUmVtb3ZlU3BhY2VzKGNvbnRleHQuUGxhaW5JbnB1dCk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPT0gMCkgcmV0dXJuIG51bGw7XHJcbkdyZXlIYWNrQ29tcGlsZXIuVG9rZW4gdDtcbiAgICAgICAgICAgIEZ1bmM8Q29udGV4dCwgYm9vbD4gc2VwYXJhdG9yID0gR2V0U2VwYXJhdGlvblNlbGVjdG9yKGNvbnRleHQsIG91dCB0KTtcclxuICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2IuQXBwZW5kKGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCkpO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIHNlcGFyYXRvcihjb250ZXh0KSk7XHJcblxyXG4gICAgICAgICAgICBzdHJpbmcgdG1wX3ZhbHVlID0gc2IuVG9TdHJpbmcoKTtcclxuc3RyaW5nIHJlZ2V4O1xuTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXM7XG5HcmV5SGFja0NvbXBpbGVyLkVUZW1wbGF0ZSB0ZW1wbGF0ZTtcbiAgICAgICAgICAgIGlmICghKHQgaXMgVG9rZW4uU3RyaW5nKSAmJiBJc1RlbXBsYXRlKHRtcF92YWx1ZSwgb3V0IHJlZ2V4LCBvdXQgbWF0Y2hlcywgb3V0IHRlbXBsYXRlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdCA9IG5ldyBUb2tlbi5UZW1wbGF0ZSh0ZW1wbGF0ZSwgbWF0Y2hlcywgcmVnZXgsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF9rZXl3b3Jkcy5Db250YWlucyh0bXBfdmFsdWUpICYmICEodCBpcyBUb2tlbi5TdHJpbmcpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ID0gbmV3IFRva2VuLktleXdvcmQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHQuT3B0aW1pemFibGUgJiYgY29udGV4dC5JZ25vcmVPcHRpbWl6ZSh0LlZhbHVlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdC5PcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0LlZhbHVlID0gdG1wX3ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA+IDAgJiYgY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG5cclxuICAgICAgICAgICAgdC5FbmRTdGF0ZW1lbnQgPSBJc0VuZE9mTGluZShjb250ZXh0KTtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA+IDAgJiYgY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnOycpIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9XHJcbnByaXZhdGUgc3RhdGljIGJvb2wgSXNFbmRPZkxpbmUoQ29udGV4dCBjb250ZXh0KVxyXG57XHJcbiAgICByZXR1cm4gY29udGV4dC5QbGFpbklucHV0LkNvdW50ID09IDAgfHwgX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkgKyBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oY29udGV4dC5QbGFpbklucHV0LDEpLkZpcnN0T3JEZWZhdWx0KCkuVG9TdHJpbmcoKSkgfHwgX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkpO1xyXG59ICAgIH1cclxufVxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBUb2tlbiBQcmV2IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIFRva2VuIE5leHQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgdmlydHVhbCBzdHJpbmcgVmFsdWUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgdmlydHVhbCBib29sIEN1c3RvbSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIE9wdGltaXphYmxlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGJvb2wgRW5kU3RhdGVtZW50IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyB2aXJ0dWFsIFRva2VuIE9wdGltaXplKENvbnRleHQgY29udGV4dClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKE9wdGltaXphYmxlICYmIC8vZmxhZyBmcm9tIHRva2VuaXphdGlvbiAgXHJcbiAgICAgICAgICAgICAgICAgICAgVmFsdWUuTGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFjaGFyLklzRGlnaXQoVmFsdWVbMF0pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIWNvbnRleHQuSWdub3JlT3B0aW1pemUoVmFsdWUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFZhbHVlID0gY29udGV4dC5uYW1lUHJvdmlkZXIuR2V0UmVwbGFjZShWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHZpcnR1YWwgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuU3RyaW5nQnVpbGRlci5MZW5ndGggIT0gMCAmJiBSZWdleC5Jc01hdGNoKGNvbnRleHQuU3RyaW5nQnVpbGRlcltjb250ZXh0LlN0cmluZ0J1aWxkZXIuTGVuZ3RoLTFdLlRvU3RyaW5nKCksIFwiXFxcXHdcIikgJiZcclxuICAgICAgICAgICAgICAgICAgICBWYWx1ZS5MZW5ndGggPiAwICYmIFJlZ2V4LklzTWF0Y2goVmFsdWVbMF0uVG9TdHJpbmcoKSwgXCJcXFxcd1wiKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoRW5kU3RhdGVtZW50ICYmIE5leHQgIT0gbnVsbCAmJiAhZm9yY2UpIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoX3NlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJpdmF0ZSBib29sIENvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKHN0cmluZyBzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocy5MZW5ndGggPiBWYWx1ZS5MZW5ndGgpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWVbaV0gIT0gc1tpXSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgS2V5d29yZCA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBLZXl3b3JkKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBPcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBPcHRpbWl6ZShDb250ZXh0IGNvbnRleHQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlID09IFwidHJ1ZVwiKSBWYWx1ZSA9IFwiMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZSA9PSBcImZhbHNlXCIpIFZhbHVlID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuT3B0aW1pemUoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBPcGVyYXRvciA6IFZhcmlhYmxlXHJcbiAgICAgICAgICAgIHtcclxucHVibGljIGJvb2wgTmVlZHNMZWZ0XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX29wZXJhdG9ycy5Db250YWluc0tleShWYWx1ZSkgJiYgX29wZXJhdG9yc1tWYWx1ZV0uQ29udGFpbnMoXCIkYVwiKTtcclxuICAgIH1cclxufXB1YmxpYyBib29sIE5lZWRzUmlnaHRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5fb3BlcmF0b3JzLkNvbnRhaW5zS2V5KFZhbHVlKSAmJiBfb3BlcmF0b3JzW1ZhbHVlXS5Db250YWlucyhcIiRiXCIpO1xyXG4gICAgfVxyXG59ICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEN1c3RvbVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldCB7IHJldHVybiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX29wZXJhdG9ycy5Db250YWluc0tleShWYWx1ZSk7IH1cclxuICAgICAgICAgICAgICAgICAgICBzZXQgeyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBPcGVyYXRvcigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChDdXN0b20pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgcyA9IF9vcGVyYXRvcnNbVmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmVlZHNMZWZ0ICYmIFByZXYgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5CcmFja2V0IGI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYiA9IFByZXYgYXMgQnJhY2tldCkgIT0gbnVsbCYmIGIuSXNPcGVuaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcImludmFsaWQgc3ludGF4IGZvciB0ZW1wbGF0ZSB7MH1cIixWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyA9IHMuUmVwbGFjZShcIiRhXCIsIGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLFByZXYpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxUb2tlbj4oXCJrZXkxXCIpLlByZXY6KFRva2VuKW51bGwpICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldiA9IFByZXYuUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2Lk5leHQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUm9vdFRva2VuID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5lZWRzUmlnaHQgJiYgTmV4dCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LkNvbXBpbGUoY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzID0gcy5SZXBsYWNlKFwiJGJcIiwgY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZFN0YXRlbWVudCA9IE5leHQuRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MlwiLE5leHQpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxUb2tlbj4oXCJrZXkyXCIpLk5leHQ6KFRva2VuKW51bGwpICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dCA9IE5leHQuTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LlByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTGFzdFRva2VuID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIk9wZXJhdG9yOiB7MH1cIixiYXNlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgVmFyaWFibGUgOiBUb2tlblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuQnJhY2tldCBicjsgICAgICAgICAgICAgICAgICAgIGlmICgoYnIgPSB0aGlzIGFzIEJyYWNrZXQpICE9IG51bGwmJiAhYnIuQ3VzdG9tICYmIChici5WYWx1ZS5MZW5ndGggPT0gMCB8fCBici5WYWx1ZVswXSAhPSAneycpKSByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKE5leHQgIT0gbnVsbCAmJiAhR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl90b2tlbk9wZXJhdG9ycy5Db250YWlucyhTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PGNoYXI+KFZhbHVlKSkgJiYgKE5leHQuVmFsdWUgPT0gXCIuXCIgfHwgTmV4dC5WYWx1ZSA9PSBcIihcIiB8fCBOZXh0LlZhbHVlID09IFwiW1wiKSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoTmV4dCAhPSBudWxsICYmICFHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Y2hhcj4oVmFsdWUpKSAmJiAoTmV4dC5WYWx1ZSA9PSBcIi5cIiB8fCBOZXh0LlZhbHVlID09IFwiKFwiIHx8IE5leHQuVmFsdWUgPT0gXCJbXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LkNvbXBpbGUoY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dC5WYWx1ZSAhPSBcIi5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gTmV4dC5OZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBOZXh0Lk5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTNcIixOZXh0KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8VG9rZW4+KFwia2V5M1wiKS5Db21waWxlKGNvbnRleHQsIHRydWUpOihUb2tlbiludWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5NFwiLE5leHQpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxUb2tlbj4oXCJrZXk0XCIpLk5leHQ6KFRva2VuKW51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZXh0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQuUHJldiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbk9wZXJhdG9yIG87XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE5leHQgIT0gbnVsbCAmJiAobyA9IE5leHQgYXMgT3BlcmF0b3IpICE9IG51bGwmJiBvLk5lZWRzTGVmdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBiID0gRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IGJhc2UuQ29tcGlsZShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZFN0YXRlbWVudCA9IGI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5PcGVyYXRvciBvbztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoUHJldiAhPSBudWxsICYmIChvbyA9IFByZXYgYXMgT3BlcmF0b3IpICE9IG51bGwmJiBvby5OZWVkc1JpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29sIGIgPSBFbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gYmFzZS5Db21waWxlKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gYjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJWYXJpYWJsZTogezB9XCIsYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIFN0cmluZyA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ3VzdG9tKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChcIihcXFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgZGVwdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgbGFzdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgVmFsdWUuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICsgMSA8IFZhbHVlLkxlbmd0aCAmJiBWYWx1ZVtpXSA9PSAnXFxcXCcgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoVmFsdWVbaSArIDFdID09ICd7JyB8fCBWYWx1ZVtpICsgMV0gPT0gJ30nKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChWYWx1ZVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWVbaV0gPT0gJ3snKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCA9PSAwKSBsYXN0ID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGgrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChWYWx1ZVtpXSA9PSAnfScgJiYgKGkgPT0gMCB8fCBWYWx1ZVtpIC0gMV0gIT0gJ1xcXFwnKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXB0aC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCA8IDApIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcInN0cmluZyBmb3JtYXQgKHswfSkgaXMgbm90IHZhbGlkXCIsVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVwdGggPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoXCJcXFwiKyhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRleHQgaW5uZXJDb2RlQ29udGV4dCA9IFRva2VuaXplKFZhbHVlLlN1YnN0cmluZyhsYXN0LCBpIC0gbGFzdCkuUmVwbGFjZShAXCJcIlwiXCJcIlwiLCBAXCJcIlwiXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJDb2RlQ29udGV4dC5uYW1lUHJvdmlkZXIgPSBjb250ZXh0Lm5hbWVQcm92aWRlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGNvbXBpbGVkID0gaW5uZXJDb2RlQ29udGV4dC5Db21waWxlKGNvbnRleHQub3B0aW1pemVFbmFibGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb21waWxlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoXCIpK1xcXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGVwdGggPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiXFxcIilcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEVuZFN0YXRlbWVudCkgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChfc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIlN0cmluZzogezB9ezF9XCIsKEN1c3RvbSA/IFwiJFwiIDogXCJcIiksYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgQnJhY2tldCA6IFZhcmlhYmxlXHJcbiAgICAgICAgICAgIHtcclxucHVibGljIGJvb2wgSXNPcGVuaW5nXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBWYWx1ZSA9PSBcIihcIiB8fCBWYWx1ZSA9PSBcIltcIiB8fCBWYWx1ZSA9PSBcIntcIjtcclxuICAgIH1cclxufXB1YmxpYyBib29sIElzQ2xvc2luZ1xyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVmFsdWUgPT0gXCIpXCIgfHwgVmFsdWUgPT0gXCJdXCIgfHwgVmFsdWUgPT0gXCJ9XCI7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAgICAgICAgIHByaXZhdGUgRGljdGlvbmFyeTxjaGFyLCBjaGFyPiBfb3BlbmluZ1RvQ2xvc2luZyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PGNoYXIsIGNoYXI+KCksKF9vMSk9PntfbzEuQWRkKCcoJywnKScpO19vMS5BZGQoJ1snLCddJyk7X28xLkFkZCgneycsJ30nKTtyZXR1cm4gX28xO30pO1xyXG4gICAgICAgICAgICAgICAgcHVibGljIEJyYWNrZXQoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBUb2tlbiBDb21waWxlSW5zaWRlKENvbnRleHQgY29udGV4dCwgYm9vbCBpbmNsdWRlTGFzdEJyYWNrZXQgPSB0cnVlLCBib29sIGN1c3RvbUJvZHkgPSBmYWxzZSwgc3RyaW5nIHBvc3RmaXggPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBib29sIGIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBUb2tlbiBsYXN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBUb2tlbiBub2RlID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXN0b21Cb2R5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiID0gbm9kZS5FbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLkVuZFN0YXRlbWVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbkJyYWNrZXQgdGI7ICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayBmb3IgbGFzdCBicmFja2V0IGJlZm9yZSBjb21waWxpbmcgaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbmNsdWRlTGFzdEJyYWNrZXQgJiYgKHRiID0gbm9kZSBhcyBCcmFja2V0KSAhPSBudWxsJiYgdGIuSXNDbG9zaW5nICYmXHJcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuTGFzdDxjaGFyPiggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Yi5WYWx1ZSkgPT0gX29wZW5pbmdUb0Nsb3NpbmdbU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5MYXN0PGNoYXI+KFZhbHVlKV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0Yi5FbmRTdGF0ZW1lbnQgJiYgbGFzdCAhPSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhbGFzdC5FbmRTdGF0ZW1lbnQgJiYgIWxhc3QuVmFsdWUuQ29udGFpbnMoX3NlcGFyYXRvcikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChfc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVG9rZW4gdG1wID0gbm9kZS5Db21waWxlKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWN1c3RvbUJvZHkpIG5vZGUuRW5kU3RhdGVtZW50ID0gYjtcclxuQnJhY2tldCBicjsgICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNraW5nIGZvciBsYXN0IGJyYWNrZXQgYWZ0ZXIgY29tcGlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGJyID0gbm9kZSBhcyBCcmFja2V0KSAhPSBudWxsJiYgYnIuSXNDbG9zaW5nKSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0bXAuTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQocG9zdGZpeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChDdXN0b20pIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChJc09wZW5pbmcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb2tlbiBub2RlID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG5CcmFja2V0IGI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZSA9PSBcIntcIiAmJiAoKChiID0gUHJldiBhcyBCcmFja2V0KSAhPSBudWxsJiYgYi5DdXN0b20pIHx8IFByZXYuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoXCJmdW5jdGlvblwiKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghRW5kU3RhdGVtZW50KSBFbmRTdGF0ZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9rZW4gdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyB0eXBlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChQcmV2LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiZnVuY3Rpb25cIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwiZnVuY3Rpb25cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ID0gUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ID0gUHJldi5QcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYm9vbCkodCE9bnVsbD90LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiaWZcIik6KGJvb2w/KW51bGwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcImlmXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChcIiB0aGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoKGJvb2wpKHQhPW51bGw/dC5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcImZvclwiKTooYm9vbD8pbnVsbCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwiZm9yXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgoYm9vbCkodCE9bnVsbD90LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwid2hpbGVcIik6KGJvb2w/KW51bGwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcIndoaWxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQuRW5kU3RhdGVtZW50IHx8IEVuZFN0YXRlbWVudCkgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChfc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBDb21waWxlSW5zaWRlKGNvbnRleHQsIGZhbHNlLCB0cnVlLCBzdHJpbmcuRm9ybWF0KFwiZW5kIHswfVwiLHR5cGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgIEtleXdvcmQgaztcclxuICAgIGlmICgoayA9IFByZXYgYXMgS2V5d29yZCkgIT0gbnVsbCYmIGsuVmFsdWUgPT0gXCJmb3JcIilcclxuICAgIHtcclxuICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgbm9kZSA9IENvbXBpbGVJbnNpZGUoY29udGV4dCwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWUpO1xyXG4gICAgICAgIG5vZGUgPSBDb21waWxlSW5zaWRlKGNvbnRleHQpO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBub2RlIT1udWxsP25vZGUuTmV4dDooVG9rZW4pbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkgRW5kU3RhdGVtZW50ID0gbm9kZS5FbmRTdGF0ZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoUHJldiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlJvb3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2Lk5leHQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSA9PSBudWxsIHx8IG5vZGUuTmV4dCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLk5leHQuUHJldiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN1c3RvbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBDb21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiQnJhY2tldDogezB9XCIsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgU2VwYXJhdG9yIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIFNlcGFyYXRvcigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiU2VwYXJhdG9yOiB7MH1cIixWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBJbmNsdWRlIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIEluY2x1ZGUoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJJbmNsdWRlOiB7MH1cIixiYXNlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgVGVtcGxhdGUgOiBUb2tlblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFZhbHVlXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBpZiAoX3ZhbHVlICE9IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBfdmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3ZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBFVGVtcGxhdGUgVGVtcGxhdGVUeXBlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBzdHJpbmcgUmVnZXhTdHJpbmcgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIE1hdGNoQ29sbGVjdGlvbiBNYXRjaGVzIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBPcHRpbWl6ZShDb250ZXh0IGNvbnRleHQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChUZW1wbGF0ZVR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuSXRlcmF0aW9uSW5kZXg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUHJldiAhPSBudWxsICYmIFByZXYuVmFsdWUgPT0gXCIuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuT3B0aW1pemUoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHZhcl9uYW1lID0gTWF0Y2hlc1swXS5Hcm91cHNbMl0uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yV2hpdGVTcGFjZSh2YXJfbmFtZSkgfHwgY29udGV4dC5JZ25vcmVPcHRpbWl6ZSh2YXJfbmFtZSkpIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbHVlID0gUmVnZXguUmVwbGFjZShWYWx1ZSwgUmVnZXhTdHJpbmcsIHN0cmluZy5Gb3JtYXQoXCIkMXswfSQzXCIsY29udGV4dC5uYW1lUHJvdmlkZXIuR2V0UmVwbGFjZSh2YXJfbmFtZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuSWdub3JlT3B0aW1pemF0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoVGVtcGxhdGVUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuRVRlbXBsYXRlLkNvbW1lbnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvbnRleHQuU2V0dGluZ3MgJiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuU2V0dGluZ3MuUmVtb3ZlQ29tbWVudHMpICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYuTmV4dCA9IE5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghUHJldi5FbmRTdGF0ZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYuRW5kU3RhdGVtZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoX3NlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Sb290VG9rZW4gPSBOZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5leHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQuUHJldiA9IFByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTGFzdFRva2VuID0gUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYm9vbCBJc1ZhbHVlU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWUuTGVuZ3RoIDwgMikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBWYWx1ZVswXSA9PSAnXCInICYmIFZhbHVlW1ZhbHVlLkxlbmd0aC0xXSA9PSAnXCInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBUZW1wbGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIFRlbXBsYXRlKEVUZW1wbGF0ZSB0ZW1wbGF0ZSwgTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXMsIHN0cmluZyByZWdleCwgQ29udGV4dCBjb250ZXh0KSA6IGJhc2UoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRlbXBsYXRlVHlwZSA9IHRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIE1hdGNoZXMgPSBtYXRjaGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlZ2V4U3RyaW5nID0gcmVnZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGVtcGxhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuSWdub3JlT3B0aW1pemF0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbHVlID0gTWF0Y2hlc1swXS5Hcm91cHNbMl0uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNWYWx1ZVN0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9IF92YWx1ZS5TdWJzdHJpbmcoMSwgX3ZhbHVlLkxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZShfdmFsdWUpKSBjb250ZXh0LmN1c3RvbUlnbm9yZU9wdGltaXplLkFkZChfdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9ICdcIicgKyBfdmFsdWUgKyAnXCInO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZShNYXRjaGVzWzBdLkdyb3Vwc1syXS5WYWx1ZSkpIGNvbnRleHQuY3VzdG9tSWdub3JlT3B0aW1pemUuQWRkKE1hdGNoZXNbMF0uR3JvdXBzWzJdLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cbiAgICAgICAgXG5wcml2YXRlIGJvb2wgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX09wdGltaXphYmxlPXRydWU7fVxyXG4gICAgfVxyXG59XHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIGNsYXNzIFZhcmlhYmxlTmFtZVByb3ZpZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBEaWN0aW9uYXJ5PHN0cmluZywgc3RyaW5nPiBfcmVwbGFjZSA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgc3RyaW5nPigpO1xyXG4gICAgICAgIHByaXZhdGUgaW50IF9zdGF0ZTtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfY2hhcnMgPSBcImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIjtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBOZXh0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgc2IgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgICAgICBpbnQgaW5kZXggPSBfc3RhdGU7XHJcblxyXG4gICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgaSA9IGluZGV4ICUgX2NoYXJzLkxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGNoYXIgYyA9IF9jaGFyc1tpXTtcclxuICAgICAgICAgICAgICAgIHNiLkFwcGVuZChjKTtcclxuICAgICAgICAgICAgICAgIGluZGV4IC89IF9jaGFycy5MZW5ndGg7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKGluZGV4ID4gMCk7XHJcblxyXG4gICAgICAgICAgICBfc3RhdGUrKztcclxuICAgICAgICAgICAgcmV0dXJuIHNiLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBEZWZpbmVkKHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9yZXBsYWNlLkNvbnRhaW5zS2V5KG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldFJlcGxhY2Uoc3RyaW5nIG9yaWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIV9yZXBsYWNlLkNvbnRhaW5zS2V5KG9yaWcpKVxyXG4gICAgICAgICAgICAgICAgX3JlcGxhY2Vbb3JpZ10gPSBOZXh0KCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gX3JlcGxhY2Vbb3JpZ107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K

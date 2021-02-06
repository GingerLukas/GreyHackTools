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
                var b;
                if (context.StringBuilder.getLength() !== 0 && ((System.Text.RegularExpressions.Regex.isMatch(String.fromCharCode(context.StringBuilder.getChar(((context.StringBuilder.getLength() - 1) | 0))), "\\w") && this.Value.length > 0 && System.Text.RegularExpressions.Regex.isMatch(String.fromCharCode(this.Value.charCodeAt(0)), "\\w")) || (this.Prev != null && Bridge.is(this.Prev, GreyHackTools.GreyHackCompiler.Token.Keyword) && ((b = Bridge.as(this, GreyHackTools.GreyHackCompiler.Token.Bracket))) != null && (System.Linq.Enumerable.from(b.Value, System.Char).firstOrDefault(null, 0) === 40 || System.Linq.Enumerable.from(b.Value, System.Char).firstOrDefault(null, 0) === 91)))) {
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
                return this.Value.charCodeAt(0) === 34 && System.Linq.Enumerable.from(this.Value, System.Char).lastOrDefault(null, 0) === 34;
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
                var $t;
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

                if ((node != null ? node.Next : null) == null || !Bridge.referenceEquals((($t = node.Next) != null ? $t.Value : null), "else")) {
                    context.StringBuilder.append(postfix);
                }
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
                    if (Bridge.referenceEquals(this.Value, "{") && ((((b = Bridge.as(this.Prev, GreyHackTools.GreyHackCompiler.Token.Bracket))) != null && b.Custom) || this.Prev.CompareBeginningOfValue("function") || Bridge.referenceEquals(this.Prev.Value, "else"))) {
                        if (!this.EndStatement) {
                            this.EndStatement = true;
                        }
                        var t;
                        var type = "";
                        if (this.Prev.CompareBeginningOfValue("function")) {
                            type = "function";
                            t = this.Prev;
                        } else if (Bridge.referenceEquals(this.Prev.Value, "else")) {
                            type = "if";
                            t = this.Prev;
                        } else {
                            t = this.Prev.Prev;
                        }

                        if (t.CompareBeginningOfValue("if")) {
                            type = "if";
                            context.StringBuilder.append(" then");
                        } else if (t.CompareBeginningOfValue("for")) {
                            type = "for";
                        } else if (t.CompareBeginningOfValue("while")) {
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
                        this.EndStatement = node.EndStatement && !System.String.endsWith(this.Value, GreyHackTools.GreyHackCompiler._separator);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJKc01TcHBDb21waWxlci5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FzQzJDQTs0Q0FFc0JBLEFBQWtEQSxVQUFDQTs0QkFBT0E7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBLE9BQU9BOzBCQUF2RkEsS0FBSUE7MENBQ3BDQSxBQUFrREEsVUFBQ0E7NEJBQU9BOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBLE9BQU9BOzBCQUFqSEEsS0FBSUE7MkNBQ2pDQSxBQUFrREEsVUFBQ0E7NEJBQU9BOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUEsT0FBT0E7MEJBQXpOQSxLQUFJQTsrQ0FFNUJBLEFBQW9EQSxVQUFDQTs0QkFBT0E7NEJBQWNBOzRCQUFnQkE7NEJBQWFBLE9BQU9BOzBCQUFoRkEsS0FBSUE7eUNBRXhDQSxBQUFvREEsVUFBQ0E7NEJBQU9BOzRCQUFjQSxPQUFPQTswQkFBbkRBLEtBQUlBOzRDQUNqQ0EsQUFBa0RBLFVBQUNBOzRCQUFPQTs0QkFBYUEsT0FBT0E7MEJBQWhEQSxLQUFJQTt5Q0FFckNBLEFBQWtEQSxVQUFDQTs0QkFBT0E7NEJBQWFBOzRCQUFhQSxPQUFPQTswQkFBN0RBLEtBQUlBO3FDQUVwQ0EsQUFBb0RBLFVBQUNBOzRCQUFPQTs0QkFBY0E7NEJBQWdCQTs0QkFBZ0JBOzRCQUFlQTs0QkFBaUJBOzRCQUFlQTs0QkFBY0E7NEJBQWVBOzRCQUFjQTs0QkFBZUE7NEJBQWdCQTs0QkFBaUJBOzRCQUFrQkE7NEJBQW9CQTs0QkFBaUJBOzRCQUFlQSxPQUFPQTswQkFBblNBLEtBQUlBOzJDQUU1QkEsQUFBb0RBLFVB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WUFBT0E7NEJBQ1BBLGlCQUFZQTs7NEJBSVpBLFlBQU9BOzRCQUNQQSxvQkFBb0JBOzs7O29CQUk1QkEsYUFBUUE7O29CQUVSQSxPQUFPQSwyRUFBYUEsU0FBU0E7O29CQUk3QkEsT0FBT0EsMkVBQWFBLFNBQVNBOzs7O2dCQU1qQ0EsT0FBT0EsdUNBQThCQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyIjZGVmaW5lIGpzXHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UZXh0LlJlZ3VsYXJFeHByZXNzaW9ucztcclxuXHJcbm5hbWVzcGFjZSBKc01TcHBDb21waWxlclxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBTZXR0aW5nc1xyXG5cclxuICAgICAgICBbRmxhZ3NdXHJcbiAgICAgICAgcHVibGljIGVudW0gU2V0dGluZ3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5vbmUgPSAwLFxyXG4gICAgICAgICAgICBJZ25vcmVNYXBWYXJpYWJsZXMgPSAxLFxyXG4gICAgICAgICAgICBSZW1vdmVDb21tZW50cyA9IDIsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gSW50ZXJuYWxcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nIF9zZXBhcmF0b3IgPSBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgc3RyaW5nIF9zZXBhcmF0b3IgPSBcIjtcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlblNlcGFyYXRvcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzEpPT57X28xLkFkZCgnICcpO19vMS5BZGQoJy4nKTtfbzEuQWRkKCcsJyk7X28xLkFkZCgnOicpO3JldHVybiBfbzE7fSk7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxjaGFyPiBfdG9rZW5CcmFja2V0cyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vMik9PntfbzIuQWRkKCcoJyk7X28yLkFkZCgnKScpO19vMi5BZGQoJ1snKTtfbzIuQWRkKCddJyk7X28yLkFkZCgneycpO19vMi5BZGQoJ30nKTtyZXR1cm4gX28yO30pO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuT3BlcmF0b3JzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8Y2hhcj4oKSwoX28zKT0+e19vMy5BZGQoJysnKTtfbzMuQWRkKCctJyk7X28zLkFkZCgnKicpO19vMy5BZGQoJy8nKTtfbzMuQWRkKCclJyk7X28zLkFkZCgnPCcpO19vMy5BZGQoJz4nKTtfbzMuQWRkKCc9Jyk7X28zLkFkZCgnIScpO19vMy5BZGQoJ14nKTtfbzMuQWRkKCcmJyk7X28zLkFkZCgnfCcpO19vMy5BZGQoJ0AnKTtfbzMuQWRkKCd+Jyk7cmV0dXJuIF9vMzt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxzdHJpbmc+IF90b2tlbkVuZFN0YXRlbWVudHMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vNCk9PntfbzQuQWRkKFwiXFxuXCIpO19vNC5BZGQoXCJcXHJcXG5cIik7X280LkFkZChcIjtcIik7cmV0dXJuIF9vNDt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxzdHJpbmc+IF90b2tlbkluY2x1ZGUgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vNSk9PntfbzUuQWRkKFwiIyFcIik7cmV0dXJuIF9vNTt9KTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlbkVuZEluY2x1ZGUgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzYpPT57X282LkFkZCgnIScpO3JldHVybiBfbzY7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuU3RyaW5ncyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vNyk9PntfbzcuQWRkKCdcIicpO19vNy5BZGQoJyQnKTtyZXR1cm4gX283O30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PHN0cmluZz4gX2tleXdvcmRzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8c3RyaW5nPigpLChfbzgpPT57X284LkFkZChcImlmXCIpO19vOC5BZGQoXCJ0aGVuXCIpO19vOC5BZGQoXCJlbHNlXCIpO19vOC5BZGQoXCJlbmRcIik7X284LkFkZChcIndoaWxlXCIpO19vOC5BZGQoXCJmb3JcIik7X284LkFkZChcImluXCIpO19vOC5BZGQoXCJhbmRcIik7X284LkFkZChcIm9yXCIpO19vOC5BZGQoXCJub3RcIik7X284LkFkZChcInRydWVcIik7X284LkFkZChcImZhbHNlXCIpO19vOC5BZGQoXCJyZXR1cm5cIik7X284LkFkZChcImNvbnRpbnVlXCIpO19vOC5BZGQoXCJicmVha1wiKTtfbzguQWRkKFwibmV3XCIpO3JldHVybiBfbzg7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8c3RyaW5nPiBfaWdub3JlT3B0aW1pemUgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vOSk9PntfbzkuQWRkKFwiRmlsZVwiKTtfbzkuQWRkKFwiYWJzXCIpO19vOS5BZGQoXCJhY29zXCIpO19vOS5BZGQoXCJhY3RpdmVfbmV0X2NhcmRcIik7X285LkFkZChcImFjdGl2ZV91c2VyXCIpO19vOS5BZGQoXCJhaXJjcmFja1wiKTtfbzkuQWRkKFwiYWlybW9uXCIpO19vOS5BZGQoXCJhc2luXCIpO19vOS5BZGQoXCJhdGFuXCIpO19vOS5BZGQoXCJiaXR3aXNlXCIpO19vOS5BZGQoXCJic3NpZF9uYW1lXCIpO19vOS5BZGQoXCJidWlsZFwiKTtfbzkuQWRkKFwiY2VpbFwiKTtfbzkuQWRkKFwiY2hhbmdlX3Bhc3N3b3JkXCIpO19vOS5BZGQoXCJjaGFyXCIpO19vOS5BZGQoXCJjaG1vZFwiKTtfbzkuQWRkKFwiY2xvc2VfcHJvZ3JhbVwiKTtfbzkuQWRkKFwiY29kZVwiKTtfbzkuQWRkKFwiY29tbWFuZF9pbmZvXCIpO19vOS5BZGQoXCJjb25uZWN0X2V0aGVybmV0XCIpO19vOS5BZGQoXCJjb25uZWN0X3NlcnZpY2VcIik7X285LkFkZChcImNvbm5lY3Rfd2lmaVwiKTtfbzkuQWRkKFwiY29weVwiKTtfbzkuQWRkKFwiY29zXCIpO19vOS5BZGQoXCJjcmVhdGVfZm9sZGVyXCIpO19vOS5BZGQoXCJjcmVhdGVfZ3JvdXBcIik7X285LkFkZChcImNyZWF0ZV91c2VyXCIpO19vOS5BZGQoXCJjdXJyZW50X2RhdGVcIik7X285LkFkZChcImN1cnJlbnRfcGF0aFwiKTtfbzkuQWRkKFwiZGVjaXBoZXJcIik7X285LkFkZChcImRlbGV0ZVwiKTtfbzkuQWRkKFwiZGVsZXRlX2dyb3VwXCIpO19vOS5BZGQoXCJkZWxldGVfdXNlclwiKTtfbzkuQWRkKFwiZGV2aWNlX3BvcnRzXCIpO19vOS5BZGQoXCJkZXZpY2VzX2xhbl9pcFwiKTtfbzkuQWRkKFwiZHVtcF9saWJcIik7X285LkFkZChcImVzc2lkX25hbWVcIik7X285LkFkZChcImV4aXRcIik7X285LkFkZChcImZsb29yXCIpO19vOS5BZGQoXCJmb3JtYXRfY29sdW1uc1wiKTtfbzkuQWRkKFwiZ2V0X2ZpbGVzXCIpO19vOS5BZGQoXCJnZXRfZm9sZGVyc1wiKTtfbzkuQWRkKFwiZ2V0X2xhbl9pcFwiKTtfbzkuQWRkKFwiZ2V0X3BvcnRzXCIpO19vOS5BZGQoXCJnZXRfcm91dGVyXCIpO19vOS5BZGQoXCJnZXRfc2hlbGxcIik7X285LkFkZChcImdsb2JhbHNcIik7X285LkFkZChcImdyb3VwXCIpO19vOS5BZGQoXCJncm91cHNcIik7X285LkFkZChcImhhc0luZGV4XCIpO19vOS5BZGQoXCJoYXNfcGVybWlzc2lvblwiKTtfbzkuQWRkKFwiaG9zdF9jb21wdXRlclwiKTtfbzkuQWRkKFwiaW5jbHVkZV9saWJcIik7X285LkFkZChcImluZGV4T2ZcIik7X285LkFkZChcImluZGV4ZXNcIik7X285LkFkZChcImlzX2JpbmFyeVwiKTtfbzkuQWRkKFwiaXNfY2xvc2VkXCIpO19vOS5BZGQoXCJpc19mb2xkZXJcIik7X285LkFkZChcImlzX2xhbl9pcFwiKTtfbzkuQWRkKFwiaXNfbmV0d29ya19hY3RpdmVcIik7X285LkFkZChcImlzX3ZhbGlkX2lwXCIpO19vOS5BZGQoXCJqb2luXCIpO19vOS5BZGQoXCJsYXN0SW5kZXhPZlwiKTtfbzkuQWRkKFwibGF1bmNoXCIpO19vOS5BZGQoXCJsZW5cIik7X285LkFkZChcImxpYl9uYW1lXCIpO19vOS5BZGQoXCJsb2FkXCIpO19vOS5BZGQoXCJsb2NhbF9pcFwiKTtfbzkuQWRkKFwibG9jYWxzXCIpO19vOS5BZGQoXCJsb3dlclwiKTtfbzkuQWRkKFwibWQ1XCIpO19vOS5BZGQoXCJtb3ZlXCIpO19vOS5BZGQoXCJuYW1lXCIpO19vOS5BZGQoXCJuZXRfdXNlXCIpO19vOS5BZGQoXCJuZXR3b3JrX2RldmljZXNcIik7X285LkFkZChcIm5ldHdvcmtfZ2F0ZXdheVwiKTtfbzkuQWRkKFwibnNsb29rdXBcIik7X285LkFkZChcIm92ZXJmbG93XCIpO19vOS5BZGQoXCJvd25lclwiKTtfbzkuQWRkKFwicGFyZW50XCIpO19vOS5BZGQoXCJwYXJlbnRfcGF0aFwiKTtfbzkuQWRkKFwicGF0aFwiKTtfbzkuQWRkKFwicGVybWlzc2lvbnNcIik7X285LkFkZChcInBpXCIpO19vOS5BZGQoXCJwaW5nXCIpO19vOS5BZGQoXCJwaW5nX3BvcnRcIik7X285LkFkZChcInBvcFwiKTtfbzkuQWRkKFwicG9ydF9pbmZvXCIpO19vOS5BZGQoXCJwb3J0X251bWJlclwiKTtfbzkuQWRkKFwicHJpbnRcIik7X285LkFkZChcInByb2dyYW1fcGF0aFwiKTtfbzkuQWRkKFwicHVibGljX2lwXCIpO19vOS5BZGQoXCJwdWxsXCIpO19vOS5BZGQoXCJwdXNoXCIpO19vOS5BZGQoXCJwdXRcIik7X285LkFkZChcInJhbmdlXCIpO19vOS5BZGQoXCJyZW1vdmVcIik7X285LkFkZChcInJlbmFtZVwiKTtfbzkuQWRkKFwicmVwbGFjZVwiKTtfbzkuQWRkKFwicmV2ZXJzZVwiKTtfbzkuQWRkKFwicm5kXCIpO19vOS5BZGQoXCJyb3VuZFwiKTtfbzkuQWRkKFwic2NhblwiKTtfbzkuQWRkKFwic2Nhbl9hZGRyZXNzXCIpO19vOS5BZGQoXCJzY3BcIik7X285LkFkZChcInNldF9jb250ZW50XCIpO19vOS5BZGQoXCJzZXRfZ3JvdXBcIik7X285LkFkZChcInNob3dfcHJvY3NcIik7X285LkFkZChcInNodWZmbGVcIik7X285LkFkZChcInNpZ25cIik7X285LkFkZChcInNpblwiKTtfbzkuQWRkKFwic2l6ZVwiKTtfbzkuQWRkKFwic2xpY2VcIik7X285LkFkZChcInNtdHBfdXNlcl9saXN0XCIpO19vOS5BZGQoXCJzb3J0XCIpO19vOS5BZGQoXCJzcGxpdFwiKTtfbzkuQWRkKFwic3FydFwiKTtfbzkuQWRkKFwic3RhcnRfdGVybWluYWxcIik7X285LkFkZChcInN0clwiKTtfbzkuQWRkKFwic3VtXCIpO19vOS5BZGQoXCJ0YW5cIik7X285LkFkZChcInRvX2ludFwiKTtfbzkuQWRkKFwidG91Y2hcIik7X285LkFkZChcInRyaW1cIik7X285LkFkZChcInR5cGVvZlwiKTtfbzkuQWRkKFwidXBwZXJcIik7X285LkFkZChcInVzZWRfcG9ydHNcIik7X285LkFkZChcInVzZXJfYmFua19udW1iZXJcIik7X285LkFkZChcInVzZXJfaW5wdXRcIik7X285LkFkZChcInVzZXJfbWFpbF9hZGRyZXNzXCIpO19vOS5BZGQoXCJ2YWxcIik7X285LkFkZChcInZhbHVlc1wiKTtfbzkuQWRkKFwidmVyc2lvblwiKTtfbzkuQWRkKFwid2hvaXNcIik7X285LkFkZChcIndpZmlfbmV0d29ya3NcIik7X285LkFkZChcInBhcmFtc1wiKTtfbzkuQWRkKFwiY2xlYXJfc2NyZWVuXCIpO19vOS5BZGQoXCJ3YWl0XCIpO19vOS5BZGQoXCJzZWxmXCIpO19vOS5BZGQoXCJudWxsXCIpO19vOS5BZGQoXCJmdW5jdGlvblwiKTtfbzkuQWRkKFwiY29udGVudFwiKTtfbzkuQWRkKFwibGFuX2lwXCIpO19vOS5BZGQoXCJnZXRfY29udGVudFwiKTtfbzkuQWRkKFwiYWlyZXBsYXlcIik7X285LkFkZChcImZpcmV3YWxsX3J1bGVzXCIpO19vOS5BZGQoXCJrZXJuZWxfdmVyc2lvblwiKTtfbzkuQWRkKFwia2VybmVsX3ZlcnNpb25cIik7X285LkFkZChcInJzaGVsbF9zZXJ2ZXJcIik7X285LkFkZChcInJzaGVsbF9zZXJ2ZXJcIik7X285LkFkZChcIl9faXNhXCIpO19vOS5BZGQoXCJpZlwiKTtfbzkuQWRkKFwidGhlblwiKTtfbzkuQWRkKFwiZWxzZVwiKTtfbzkuQWRkKFwiZW5kXCIpO19vOS5BZGQoXCJ3aGlsZVwiKTtfbzkuQWRkKFwiZm9yXCIpO19vOS5BZGQoXCJpblwiKTtfbzkuQWRkKFwiYW5kXCIpO19vOS5BZGQoXCJvclwiKTtfbzkuQWRkKFwibm90XCIpO19vOS5BZGQoXCJ0cnVlXCIpO19vOS5BZGQoXCJmYWxzZVwiKTtfbzkuQWRkKFwibnVsbFwiKTtfbzkuQWRkKFwicmV0dXJuXCIpO19vOS5BZGQoXCJjb250aW51ZVwiKTtfbzkuQWRkKFwiYnJlYWtcIik7X285LkFkZChcImZ1bmN0aW9uXCIpO19vOS5BZGQoXCJuZXdcIik7X285LkFkZChcInNlbGZcIik7cmV0dXJuIF9vOTt9KTtcclxuXHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBEaWN0aW9uYXJ5PHN0cmluZywgc3RyaW5nPiBfb3BlcmF0b3JzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBzdHJpbmc+KCksKF9vMTApPT57X28xMC5BZGQoXCImJlwiLEBcIiBhbmQgXCIpO19vMTAuQWRkKFwifHxcIixAXCIgb3IgXCIpO19vMTAuQWRkKFwiPDxcIixAXCJiaXR3aXNlKFwiXCI8PFwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwiPj5cIixAXCJiaXR3aXNlKFwiXCI+PlwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwiPj4+XCIsQFwiYml0d2lzZShcIlwiPj4+XCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCJeXlwiLEBcImJpdHdpc2UoXCJcIl5cIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcIiZcIixAXCJiaXR3aXNlKFwiXCImXCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCJ8XCIsQFwiYml0d2lzZShcIlwifFwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwiflwiLEBcImJpdHdpc2UoXCJcIn5cIlwiLCRiKVwiKTtfbzEwLkFkZChcIisrXCIsQFwiJGE9JGErMVwiKTtfbzEwLkFkZChcIi0tXCIsQFwiJGE9JGEtMVwiKTtfbzEwLkFkZChcIis9XCIsQFwiJGE9JGErJGJcIik7X28xMC5BZGQoXCItPVwiLEBcIiRhPSRhLSRiXCIpO19vMTAuQWRkKFwiKj1cIixAXCIkYT0kYSokYlwiKTtfbzEwLkFkZChcIi89XCIsQFwiJGE9JGEvJGJcIik7X28xMC5BZGQoXCIlPVwiLEBcIiRhPSRhJSRiXCIpO19vMTAuQWRkKFwiPT5cIixAXCJmdW5jdGlvbiRhXCIpO3JldHVybiBfbzEwO30pO1xyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBFVGVtcGxhdGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5vbmUsXHJcbiAgICAgICAgICAgIEl0ZXJhdGlvbkluZGV4LFxyXG4gICAgICAgICAgICBJZ25vcmVPcHRpbWl6YXRpb24sXHJcbiAgICAgICAgICAgIFRlcm5hcnlPcGVyYXRvcixcclxuICAgICAgICAgICAgQ29tbWVudCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IERpY3Rpb25hcnk8c3RyaW5nLCBFVGVtcGxhdGU+IF90ZW1wbGF0ZXMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIEVUZW1wbGF0ZT4oKSwoX28xMSk9PntfbzExLkFkZChAXCIoX18pKC4qKShfaWR4KVwiLEVUZW1wbGF0ZS5JdGVyYXRpb25JbmRleCk7X28xMS5BZGQoQFwiKFxcXFwpKFxcUyopXCIsRVRlbXBsYXRlLklnbm9yZU9wdGltaXphdGlvbik7X28xMS5BZGQoQFwiKFxcL1xcLykoLiopJFwiLEVUZW1wbGF0ZS5Db21tZW50KTtyZXR1cm4gX28xMTt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgYm9vbCBJc1RlbXBsYXRlKHN0cmluZyBpbnB1dCwgb3V0IHN0cmluZyByZWdleCwgb3V0IE1hdGNoQ29sbGVjdGlvbiBtYXRjaGVzLCBvdXQgRVRlbXBsYXRlIHRlbXBsYXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAoS2V5VmFsdWVQYWlyPHN0cmluZywgRVRlbXBsYXRlPiBwYWlyIGluIF90ZW1wbGF0ZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBSZWdleC5NYXRjaGVzKGlucHV0LCBwYWlyLktleSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcy5Db3VudCAhPSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4ID0gcGFpci5LZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgPSBwYWlyLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtYXRjaGVzID0gbnVsbDtcclxuICAgICAgICAgICAgcmVnZXggPSBudWxsO1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IEVUZW1wbGF0ZS5Ob25lO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIENvbXBpbGUoc3RyaW5nIGNvZGUsIGJvb2wgb3B0aW1pemUgPSBmYWxzZSwgU2V0dGluZ3Mgc2V0dGluZ3MgPSBTZXR0aW5ncy5Ob25lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRva2VuaXplKGNvZGUsIHNldHRpbmdzKS5Db21waWxlKG9wdGltaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBUcnlDb21waWxlKHN0cmluZyBjb2RlLCBvdXQgc3RyaW5nIGNvbXBpbGVkQ29kZSwgYm9vbCBvcHRpbWl6ZSA9IGZhbHNlLCBTZXR0aW5ncyBzZXR0aW5ncyA9IFNldHRpbmdzLk5vbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29tcGlsZWRDb2RlID0gQ29tcGlsZShjb2RlLCBvcHRpbWl6ZSwgc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb21waWxlZENvZGUgPSBlLk1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIENvbnRleHQgVG9rZW5pemUoc3RyaW5nIHBsYWluQ29kZSwgU2V0dGluZ3Mgc2V0dGluZ3MgPSBTZXR0aW5ncy5Ob25lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udGV4dCBjb250ZXh0ID0gbmV3IENvbnRleHQoc2V0dGluZ3MpIHsgUGxhaW5JbnB1dCA9IG5ldyBRdWV1ZTxjaGFyPihwbGFpbkNvZGUpIH07XHJcblxyXG4gICAgICAgICAgICBUb2tlbiB0b2tlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHdoaWxlICgodG9rZW4gPSBHZXROZXh0VG9rZW4oY29udGV4dCkpICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuQWRkVG9rZW4odG9rZW4pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoKGNvbnRleHQuU2V0dGluZ3MgJiBTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpICE9IDAgJiYgdG9rZW4uUHJldiAhPSBudWxsICYmIHRva2VuLlByZXYuVmFsdWUgPT0gXCIuXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0Lklnbm9yZU9wdGltaXplKHRva2VuLlZhbHVlKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY3VzdG9tSWdub3JlT3B0aW1pemUuQWRkKHRva2VuLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZW1vdmVTcGFjZXMoUXVldWU8Y2hhcj4gcXVldWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3aGlsZSAocXVldWUuQ291bnQgIT0gMCAmJiBjaGFyLklzV2hpdGVTcGFjZShxdWV1ZS5QZWVrKCkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBxdWV1ZS5EZXF1ZXVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEZ1bmM8Q29udGV4dCwgYm9vbD4gR2V0U2VwYXJhdGlvblNlbGVjdG9yKENvbnRleHQgY29udGV4dCwgb3V0IFRva2VuIHRva2VuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJy8nICYmIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPihjb250ZXh0LlBsYWluSW5wdXQsMSkuRmlyc3RPckRlZmF1bHQoKSA9PSAnLycpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlRlbXBsYXRlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PiAhSXNFbmRPZkxpbmUoeCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0Lk1hcEFjdGl2ZS5QZWVrKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlNlcGFyYXRvcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICcsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKCFjb250ZXh0LlNldHRpbmdzLkhhc0ZsYWcoU2V0dGluZ3MuSWdub3JlTWFwVmFyaWFibGVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJzonOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geCA9PiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICdcXFxcJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uVGVtcGxhdGUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+ICFfdG9rZW5CcmFja2V0cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuU2VwYXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICFfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpICsgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KHguUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoX3Rva2VuSW5jbHVkZS5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpICtcclxuU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpLlRvU3RyaW5nKCkpKSAvL2luY2x1ZGVcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uSW5jbHVkZSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdG9rZW5FbmRJbmNsdWRlLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL29wZXJhdG9yXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLk9wZXJhdG9yKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PiBfdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF90b2tlbkJyYWNrZXRzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL2JyYWNrZXRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLkJyYWNrZXQoKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICcoJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnKSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1snOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goKCEoY29udGV4dC5MYXN0VG9rZW4gPT0gbnVsbCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gaXMgVG9rZW4uT3BlcmF0b3IpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbnRleHQuU2V0dGluZ3MgJiBTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICddJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAneyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTWFwQWN0aXZlLlB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaCgoY29udGV4dC5TZXR0aW5ncyAmIFNldHRpbmdzLklnbm9yZU1hcFZhcmlhYmxlcykgPT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ30nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lk1hcEFjdGl2ZS5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF90b2tlblNlcGFyYXRvcnMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSkpIC8vc2VwYXJhdG9yc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5TZXBhcmF0b3IoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoX3Rva2VuU3RyaW5ncy5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpKSkgLy9zdHJpbmdzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdG9rZW4uT3B0aW1pemFibGUgPSBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBlZWsoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICckJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5DdXN0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuLk9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdldFN0cmluZyh4KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB4ID0+ICFfdG9rZW5CcmFja2V0cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuU2VwYXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuU3RyaW5ncy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpICsgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KHguUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBHZXRTdHJpbmcoQ29udGV4dCBjb250ZXh0KVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgIT0gJ1wiJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCAhPSAwKVxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpKTtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA+IDAgJiYgY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnXCInKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCkpO1xyXG4gICAgICAgICAgICAgICAgR2V0U3RyaW5nKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuUmVtb3ZlKDAsIDEpO1xyXG4gICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuUmVtb3ZlKGNvbnRleHQuU3RyaW5nQnVpbGRlci5MZW5ndGggLSAxLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVG9rZW4gR2V0TmV4dFRva2VuKENvbnRleHQgY29udGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5DbGVhcigpO1xyXG4gICAgICAgICAgICBTdHJpbmdCdWlsZGVyIHNiID0gY29udGV4dC5TdHJpbmdCdWlsZGVyO1xyXG4gICAgICAgICAgICBSZW1vdmVTcGFjZXMoY29udGV4dC5QbGFpbklucHV0KTtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA9PSAwKSByZXR1cm4gbnVsbDtcclxuR3JleUhhY2tDb21waWxlci5Ub2tlbiB0O1xuICAgICAgICAgICAgRnVuYzxDb250ZXh0LCBib29sPiBzZXBhcmF0b3IgPSBHZXRTZXBhcmF0aW9uU2VsZWN0b3IoY29udGV4dCwgb3V0IHQpO1xyXG4gICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzYi5BcHBlbmQoY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKSk7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA+IDAgJiYgc2VwYXJhdG9yKGNvbnRleHQpKTtcclxuXHJcbiAgICAgICAgICAgIHN0cmluZyB0bXBfdmFsdWUgPSBzYi5Ub1N0cmluZygpO1xyXG5zdHJpbmcgcmVnZXg7XG5NYXRjaENvbGxlY3Rpb24gbWF0Y2hlcztcbkdyZXlIYWNrQ29tcGlsZXIuRVRlbXBsYXRlIHRlbXBsYXRlO1xuICAgICAgICAgICAgaWYgKCEodCBpcyBUb2tlbi5TdHJpbmcpICYmIElzVGVtcGxhdGUodG1wX3ZhbHVlLCBvdXQgcmVnZXgsIG91dCBtYXRjaGVzLCBvdXQgdGVtcGxhdGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ID0gbmV3IFRva2VuLlRlbXBsYXRlKHRlbXBsYXRlLCBtYXRjaGVzLCByZWdleCwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoX2tleXdvcmRzLkNvbnRhaW5zKHRtcF92YWx1ZSkgJiYgISh0IGlzIFRva2VuLlN0cmluZykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHQgPSBuZXcgVG9rZW4uS2V5d29yZCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodC5PcHRpbWl6YWJsZSAmJiBjb250ZXh0Lklnbm9yZU9wdGltaXplKHQuVmFsdWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0Lk9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHQuVmFsdWUgPSB0bXBfdmFsdWU7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMCAmJiBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICcgJylcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcblxyXG4gICAgICAgICAgICB0LkVuZFN0YXRlbWVudCA9IElzRW5kT2ZMaW5lKGNvbnRleHQpO1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMCAmJiBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICc7JykgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgIH1cclxucHJpdmF0ZSBzdGF0aWMgYm9vbCBJc0VuZE9mTGluZShDb250ZXh0IGNvbnRleHQpXHJcbntcclxuICAgIHJldHVybiBjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPT0gMCB8fCBfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSArIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPihjb250ZXh0LlBsYWluSW5wdXQsMSkuRmlyc3RPckRlZmF1bHQoKS5Ub1N0cmluZygpKSB8fCBfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSk7XHJcbn0gICAgfVxyXG59XHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBjbGFzcyBDb250ZXh0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgUXVldWU8Y2hhcj4gUGxhaW5JbnB1dCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUb2tlbiBSb290VG9rZW4geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgVG9rZW4gTGFzdFRva2VuIHsgZ2V0OyBzZXQ7IH1cclxucHVibGljIFN0cmluZ0J1aWxkZXIgU3RyaW5nQnVpbGRlclxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nQnVpbGRlcnMuUGVlaygpO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgICAgIGludGVybmFsIFN0YWNrPFN0cmluZ0J1aWxkZXI+IHN0cmluZ0J1aWxkZXJzID0gbmV3IFN0YWNrPFN0cmluZ0J1aWxkZXI+KCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIFN0YWNrPGJvb2w+IFNob3VsZE9wdGltaXplU3RyaW5nID0gbmV3IFN0YWNrPGJvb2w+KCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIFN0YWNrPGJvb2w+IE1hcEFjdGl2ZSA9IG5ldyBTdGFjazxib29sPigpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBWYXJpYWJsZU5hbWVQcm92aWRlciBuYW1lUHJvdmlkZXIgPSBuZXcgVmFyaWFibGVOYW1lUHJvdmlkZXIoKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgYm9vbCBvcHRpbWl6ZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgU2V0dGluZ3MgU2V0dGluZ3MgPSBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuU2V0dGluZ3MuTm9uZTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgSGFzaFNldDxzdHJpbmc+IGN1c3RvbUlnbm9yZU9wdGltaXplID0gbmV3IEhhc2hTZXQ8c3RyaW5nPigpO1xyXG4jaWYganNcclxuI2Vsc2VcclxuICAgICAgICAgICAgaW50ZXJuYWwgSHR0cENsaWVudCBodHRwQ2xpZW50ID0gbmV3IEh0dHBDbGllbnQoKTtcclxuI2VuZGlmXHJcbnB1YmxpYyBib29sIElnbm9yZU9wdGltaXplKHN0cmluZyB2YWx1ZSlcclxue1xyXG4gICAgcmV0dXJuIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5faWdub3JlT3B0aW1pemUuQ29udGFpbnModmFsdWUpIHx8IGN1c3RvbUlnbm9yZU9wdGltaXplLkNvbnRhaW5zKHZhbHVlKTtcclxufVxyXG4gICAgICAgICAgICBwdWJsaWMgdm9pZCBBZGRUb2tlbihUb2tlbiB0b2tlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKFJvb3RUb2tlbiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJvb3RUb2tlbiA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIExhc3RUb2tlbiA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIExhc3RUb2tlbi5OZXh0ID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4uUHJldiA9IExhc3RUb2tlbjtcclxuICAgICAgICAgICAgICAgICAgICBMYXN0VG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwdWJsaWMgQ29udGV4dChTZXR0aW5ncyBzZXR0aW5ncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgICAgIFBsYWluSW5wdXQgPSBuZXcgUXVldWU8Y2hhcj4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIFNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgTWFwQWN0aXZlLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RyaW5nIENvbXBpbGUoYm9vbCBvcHRpbWl6ZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZUVuYWJsZWQgPSBvcHRpbWl6ZTtcclxuICAgICAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIuQ2xlYXIoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIFRva2VuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW1pemUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IFJvb3RUb2tlbjtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUuT3B0aW1pemUodGhpcykuTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IFJvb3RUb2tlbjtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChub2RlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUuQ29tcGlsZSh0aGlzKS5OZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIG9wdGltaXplRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgc2IgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgICAgICAgICAgVG9rZW4gbm9kZSA9IFJvb3RUb2tlbjtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChub2RlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSBpcyBUb2tlbi5TdHJpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLkFwcGVuZCgnXCInK25vZGUuVmFsdWUrICdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kKG5vZGUuVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLkVuZFN0YXRlbWVudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLkFwcGVuZCgnXFxuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0qL1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKG5vZGUuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUuTmV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2IuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgY2xhc3MgVmFyaWFibGVOYW1lUHJvdmlkZXJcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIERpY3Rpb25hcnk8c3RyaW5nLCBzdHJpbmc+IF9yZXBsYWNlID0gbmV3IERpY3Rpb25hcnk8c3RyaW5nLCBzdHJpbmc+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgX3N0YXRlO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9jaGFycyA9IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIE5leHQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgICAgIGludCBpbmRleCA9IF9zdGF0ZTtcclxuXHJcbiAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBpID0gaW5kZXggJSBfY2hhcnMuTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgY2hhciBjID0gX2NoYXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgc2IuQXBwZW5kKGMpO1xyXG4gICAgICAgICAgICAgICAgaW5kZXggLz0gX2NoYXJzLkxlbmd0aDtcclxuICAgICAgICAgICAgfSB3aGlsZSAoaW5kZXggPiAwKTtcclxuXHJcbiAgICAgICAgICAgIF9zdGF0ZSsrO1xyXG4gICAgICAgICAgICByZXR1cm4gc2IuVG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIERlZmluZWQoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX3JlcGxhY2UuQ29udGFpbnNLZXkobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0UmVwbGFjZShzdHJpbmcgb3JpZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghX3JlcGxhY2UuQ29udGFpbnNLZXkob3JpZykpXHJcbiAgICAgICAgICAgICAgICBfcmVwbGFjZVtvcmlnXSA9IE5leHQoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBfcmVwbGFjZVtvcmlnXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBjbGFzcyBUb2tlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFRva2VuIFByZXYgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgVG9rZW4gTmV4dCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyB2aXJ0dWFsIHN0cmluZyBWYWx1ZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgQ3VzdG9tIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGJvb2wgT3B0aW1pemFibGUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBFbmRTdGF0ZW1lbnQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHZpcnR1YWwgVG9rZW4gT3B0aW1pemUoQ29udGV4dCBjb250ZXh0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT3B0aW1pemFibGUgJiYgLy9mbGFnIGZyb20gdG9rZW5pemF0aW9uICBcclxuICAgICAgICAgICAgICAgICAgICBWYWx1ZS5MZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIWNoYXIuSXNEaWdpdChWYWx1ZVswXSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAhY29udGV4dC5JZ25vcmVPcHRpbWl6ZShWYWx1ZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBjb250ZXh0Lm5hbWVQcm92aWRlci5HZXRSZXBsYWNlKFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgdmlydHVhbCBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbkJyYWNrZXQgYjsgICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuU3RyaW5nQnVpbGRlci5MZW5ndGggIT0gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICgoUmVnZXguSXNNYXRjaChjb250ZXh0LlN0cmluZ0J1aWxkZXJbY29udGV4dC5TdHJpbmdCdWlsZGVyLkxlbmd0aC0xXS5Ub1N0cmluZygpLCBcIlxcXFx3XCIpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICBWYWx1ZS5MZW5ndGggPiAwICYmIFJlZ2V4LklzTWF0Y2goVmFsdWVbMF0uVG9TdHJpbmcoKSwgXCJcXFxcd1wiKSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgKFByZXYgIT0gbnVsbCAmJiBQcmV2IGlzIEtleXdvcmQgJiYgKGIgPSB0aGlzIGFzIEJyYWNrZXQpICE9IG51bGwmJiAoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxjaGFyPihiLlZhbHVlKSA9PSAnKCcgfHwgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxjaGFyPihiLlZhbHVlKSA9PSAnWycpKSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKEVuZFN0YXRlbWVudCAmJiBOZXh0ICE9IG51bGwgJiYgIWZvcmNlKSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKF9zZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHByaXZhdGUgYm9vbCBDb21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShzdHJpbmcgcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHMuTGVuZ3RoID4gVmFsdWUuTGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlW2ldICE9IHNbaV0pIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIEtleXdvcmQgOiBUb2tlblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgS2V5d29yZCgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gT3B0aW1pemUoQ29udGV4dCBjb250ZXh0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZSA9PSBcInRydWVcIikgVmFsdWUgPSBcIjFcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWUgPT0gXCJmYWxzZVwiKSBWYWx1ZSA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLk9wdGltaXplKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgT3BlcmF0b3IgOiBWYXJpYWJsZVxyXG4gICAgICAgICAgICB7XHJcbnB1YmxpYyBib29sIE5lZWRzTGVmdFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl9vcGVyYXRvcnMuQ29udGFpbnNLZXkoVmFsdWUpICYmIF9vcGVyYXRvcnNbVmFsdWVdLkNvbnRhaW5zKFwiJGFcIik7XHJcbiAgICB9XHJcbn1wdWJsaWMgYm9vbCBOZWVkc1JpZ2h0XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX29wZXJhdG9ycy5Db250YWluc0tleShWYWx1ZSkgJiYgX29wZXJhdG9yc1tWYWx1ZV0uQ29udGFpbnMoXCIkYlwiKTtcclxuICAgIH1cclxufSAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBDdXN0b21cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXQgeyByZXR1cm4gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl9vcGVyYXRvcnMuQ29udGFpbnNLZXkoVmFsdWUpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0IHsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgT3BlcmF0b3IoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ3VzdG9tKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHMgPSBfb3BlcmF0b3JzW1ZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5lZWRzTGVmdCAmJiBQcmV2ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuQnJhY2tldCBiOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGIgPSBQcmV2IGFzIEJyYWNrZXQpICE9IG51bGwmJiBiLklzT3BlbmluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJpbnZhbGlkIHN5bnRheCBmb3IgdGVtcGxhdGUgezB9XCIsVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYuQ29tcGlsZShjb250ZXh0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgPSBzLlJlcGxhY2UoXCIkYVwiLCBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlBvcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIixQcmV2KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8VG9rZW4+KFwia2V5MVwiKS5QcmV2OihUb2tlbiludWxsKSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYgPSBQcmV2LlByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5OZXh0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlJvb3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZWVkc1JpZ2h0ICYmIE5leHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyA9IHMuUmVwbGFjZShcIiRiXCIsIGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSBOZXh0LkVuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTJcIixOZXh0KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8VG9rZW4+KFwia2V5MlwiKS5OZXh0OihUb2tlbiludWxsKSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBOZXh0Lk5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5QcmV2ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlID0gcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJPcGVyYXRvcjogezB9XCIsYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIFZhcmlhYmxlIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbkJyYWNrZXQgYnI7ICAgICAgICAgICAgICAgICAgICBpZiAoKGJyID0gdGhpcyBhcyBCcmFja2V0KSAhPSBudWxsJiYgIWJyLkN1c3RvbSAmJiAoYnIuVmFsdWUuTGVuZ3RoID09IDAgfHwgYnIuVmFsdWVbMF0gIT0gJ3snKSkgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChOZXh0ICE9IG51bGwgJiYgIUdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5fdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxjaGFyPihWYWx1ZSkpICYmIChOZXh0LlZhbHVlID09IFwiLlwiIHx8IE5leHQuVmFsdWUgPT0gXCIoXCIgfHwgTmV4dC5WYWx1ZSA9PSBcIltcIikpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKE5leHQgIT0gbnVsbCAmJiAhR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl90b2tlbk9wZXJhdG9ycy5Db250YWlucyhTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PGNoYXI+KFZhbHVlKSkgJiYgKE5leHQuVmFsdWUgPT0gXCIuXCIgfHwgTmV4dC5WYWx1ZSA9PSBcIihcIiB8fCBOZXh0LlZhbHVlID09IFwiW1wiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5leHQuVmFsdWUgIT0gXCIuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dCA9IE5leHQuTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gTmV4dC5OZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkzXCIsTmV4dCkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFRva2VuPihcImtleTNcIikuQ29tcGlsZShjb250ZXh0LCB0cnVlKTooVG9rZW4pbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTRcIixOZXh0KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8VG9rZW4+KFwia2V5NFwiKS5OZXh0OihUb2tlbiludWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LlByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlID0gY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5PcGVyYXRvciBvO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChOZXh0ICE9IG51bGwgJiYgKG8gPSBOZXh0IGFzIE9wZXJhdG9yKSAhPSBudWxsJiYgby5OZWVkc0xlZnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvb2wgYiA9IEVuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZFN0YXRlbWVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBiYXNlLkNvbXBpbGUoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSBiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuT3BlcmF0b3Igb287XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYgIT0gbnVsbCAmJiAob28gPSBQcmV2IGFzIE9wZXJhdG9yKSAhPSBudWxsJiYgb28uTmVlZHNSaWdodClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBiID0gRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IGJhc2UuQ29tcGlsZShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZFN0YXRlbWVudCA9IGI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiVmFyaWFibGU6IHswfVwiLGJhc2UuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBTdHJpbmcgOiBUb2tlblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEN1c3RvbSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoXCIoXFxcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGRlcHRoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGxhc3QgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFZhbHVlLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSArIDEgPCBWYWx1ZS5MZW5ndGggJiYgVmFsdWVbaV0gPT0gJ1xcXFwnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFZhbHVlW2kgKyAxXSA9PSAneycgfHwgVmFsdWVbaSArIDFdID09ICd9JykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWVbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlW2ldID09ICd7JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVwdGggPT0gMCkgbGFzdCA9IGkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoVmFsdWVbaV0gPT0gJ30nICYmIChpID09IDAgfHwgVmFsdWVbaSAtIDFdICE9ICdcXFxcJykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGgtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVwdGggPCAwKSB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJzdHJpbmcgZm9ybWF0ICh7MH0pIGlzIG5vdCB2YWxpZFwiLFZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiXFxcIisoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250ZXh0IGlubmVyQ29kZUNvbnRleHQgPSBUb2tlbml6ZShWYWx1ZS5TdWJzdHJpbmcobGFzdCwgaSAtIGxhc3QpLlJlcGxhY2UoQFwiXCJcIlwiXCJcIiwgQFwiXCJcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyQ29kZUNvbnRleHQubmFtZVByb3ZpZGVyID0gY29udGV4dC5uYW1lUHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBjb21waWxlZCA9IGlubmVyQ29kZUNvbnRleHQuQ29tcGlsZShjb250ZXh0Lm9wdGltaXplRW5hYmxlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29tcGlsZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiKStcXFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRlcHRoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChWYWx1ZVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChcIlxcXCIpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZCgnXCInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChFbmRTdGF0ZW1lbnQpIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoX3NlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJTdHJpbmc6IHswfXsxfVwiLChDdXN0b20gPyBcIiRcIiA6IFwiXCIpLGJhc2UuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIEJyYWNrZXQgOiBWYXJpYWJsZVxyXG4gICAgICAgICAgICB7XHJcbnB1YmxpYyBib29sIElzT3BlbmluZ1xyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVmFsdWUgPT0gXCIoXCIgfHwgVmFsdWUgPT0gXCJbXCIgfHwgVmFsdWUgPT0gXCJ7XCI7XHJcbiAgICB9XHJcbn1wdWJsaWMgYm9vbCBJc0Nsb3Npbmdcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFZhbHVlID09IFwiKVwiIHx8IFZhbHVlID09IFwiXVwiIHx8IFZhbHVlID09IFwifVwiO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIERpY3Rpb25hcnk8Y2hhciwgY2hhcj4gX29wZW5pbmdUb0Nsb3NpbmcgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxjaGFyLCBjaGFyPigpLChfbzEpPT57X28xLkFkZCgnKCcsJyknKTtfbzEuQWRkKCdbJywnXScpO19vMS5BZGQoJ3snLCd9Jyk7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBCcmFja2V0KClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBPcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHByaXZhdGUgVG9rZW4gQ29tcGlsZUluc2lkZShDb250ZXh0IGNvbnRleHQsIGJvb2wgaW5jbHVkZUxhc3RCcmFja2V0ID0gdHJ1ZSwgYm9vbCBjdXN0b21Cb2R5ID0gZmFsc2UsIHN0cmluZyBwb3N0Zml4ID0gXCJcIilcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBiID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9rZW4gbGFzdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9rZW4gbm9kZSA9IE5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VzdG9tQm9keSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYiA9IG5vZGUuRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5FbmRTdGF0ZW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5CcmFja2V0IHRiOyAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgZm9yIGxhc3QgYnJhY2tldCBiZWZvcmUgY29tcGlsaW5nIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW5jbHVkZUxhc3RCcmFja2V0ICYmICh0YiA9IG5vZGUgYXMgQnJhY2tldCkgIT0gbnVsbCYmIHRiLklzQ2xvc2luZyAmJlxyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkxhc3Q8Y2hhcj4oICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGIuVmFsdWUpID09IF9vcGVuaW5nVG9DbG9zaW5nW1N5c3RlbS5MaW5xLkVudW1lcmFibGUuTGFzdDxjaGFyPihWYWx1ZSldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGIuRW5kU3RhdGVtZW50ICYmIGxhc3QgIT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWxhc3QuRW5kU3RhdGVtZW50ICYmICFsYXN0LlZhbHVlLkNvbnRhaW5zKF9zZXBhcmF0b3IpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoX3NlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRva2VuIHRtcCA9IG5vZGUuQ29tcGlsZShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXN0b21Cb2R5KSBub2RlLkVuZFN0YXRlbWVudCA9IGI7XHJcbkJyYWNrZXQgYnI7ICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVja2luZyBmb3IgbGFzdCBicmFja2V0IGFmdGVyIGNvbXBpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChiciA9IG5vZGUgYXMgQnJhY2tldCkgIT0gbnVsbCYmIGJyLklzQ2xvc2luZykgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3QgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gdG1wLk5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKG5vZGUhPW51bGw/bm9kZS5OZXh0OihUb2tlbiludWxsKSA9PSBudWxsIHx8IChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5NVwiLG5vZGUuTmV4dCkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFRva2VuPihcImtleTVcIikuVmFsdWU6KHN0cmluZyludWxsKSAhPSBcImVsc2VcIilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQocG9zdGZpeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFZhbHVlID0gY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ3VzdG9tKSByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSXNPcGVuaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG9rZW4gbm9kZSA9IE5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcigpKTtcclxuQnJhY2tldCBiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWUgPT0gXCJ7XCIgJiYgKCgoYiA9IFByZXYgYXMgQnJhY2tldCkgIT0gbnVsbCYmIGIuQ3VzdG9tKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiZnVuY3Rpb25cIikgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5WYWx1ZSA9PSBcImVsc2VcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghRW5kU3RhdGVtZW50KSBFbmRTdGF0ZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9rZW4gdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyB0eXBlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChQcmV2LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiZnVuY3Rpb25cIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwiZnVuY3Rpb25cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ID0gUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFByZXYuVmFsdWUgPT0gXCJlbHNlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwiaWZcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ID0gUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ID0gUHJldi5QcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiaWZcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwiaWZcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiIHRoZW5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiZm9yXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcImZvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodC5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcIndoaWxlXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcIndoaWxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQuRW5kU3RhdGVtZW50IHx8IEVuZFN0YXRlbWVudCkgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChfc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBDb21waWxlSW5zaWRlKGNvbnRleHQsIGZhbHNlLCB0cnVlLCBzdHJpbmcuRm9ybWF0KFwiZW5kIHswfVwiLHR5cGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgIEtleXdvcmQgaztcclxuICAgIGlmICgoayA9IFByZXYgYXMgS2V5d29yZCkgIT0gbnVsbCYmIGsuVmFsdWUgPT0gXCJmb3JcIilcclxuICAgIHtcclxuICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgbm9kZSA9IENvbXBpbGVJbnNpZGUoY29udGV4dCwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWUpO1xyXG4gICAgICAgIG5vZGUgPSBDb21waWxlSW5zaWRlKGNvbnRleHQpO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBub2RlIT1udWxsP25vZGUuTmV4dDooVG9rZW4pbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZFN0YXRlbWVudCA9IG5vZGUuRW5kU3RhdGVtZW50ICYmICFWYWx1ZS5FbmRzV2l0aChHcmV5SGFja0NvbXBpbGVyLl9zZXBhcmF0b3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Sb290VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5OZXh0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCB8fCBub2RlLk5leHQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5OZXh0LlByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdXN0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIkJyYWNrZXQ6IHswfVwiLFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIFNlcGFyYXRvciA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBTZXBhcmF0b3IoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIlNlcGFyYXRvcjogezB9XCIsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgSW5jbHVkZSA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBJbmNsdWRlKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBPcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4jaWYganNcclxuXHJcbiNlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEVudmlyb25tZW50Lk9TVmVyc2lvbi5QbGF0Zm9ybSA9PSBQbGF0Zm9ybUlELk90aGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBcIi8vaW5jbHVkZSBpcyBub3QgeWV0IGltcGxlbWVudGVkIGluIHdlYlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IGNvbnRleHQuaHR0cENsaWVudC5HZXRTdHJpbmdBc3luYyhWYWx1ZSkuR2V0QXdhaXRlcigpLkdldFJlc3VsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuI2VuZGlmXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIkluY2x1ZGU6IHswfVwiLGJhc2UuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBUZW1wbGF0ZSA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVmFsdWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIGlmIChfdmFsdWUgIT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIF92YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHN0cmluZyBfdmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgcHVibGljIEVUZW1wbGF0ZSBUZW1wbGF0ZVR5cGUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIHN0cmluZyBSZWdleFN0cmluZyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgTWF0Y2hDb2xsZWN0aW9uIE1hdGNoZXMgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIE9wdGltaXplKENvbnRleHQgY29udGV4dClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKFRlbXBsYXRlVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLkVUZW1wbGF0ZS5JdGVyYXRpb25JbmRleDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChQcmV2ICE9IG51bGwgJiYgUHJldi5WYWx1ZSA9PSBcIi5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5PcHRpbWl6ZShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgdmFyX25hbWUgPSBNYXRjaGVzWzBdLkdyb3Vwc1syXS5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmcuSXNOdWxsT3JXaGl0ZVNwYWNlKHZhcl9uYW1lKSB8fCBjb250ZXh0Lklnbm9yZU9wdGltaXplKHZhcl9uYW1lKSkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdmFsdWUgPSBSZWdleC5SZXBsYWNlKFZhbHVlLCBSZWdleFN0cmluZywgc3RyaW5nLkZvcm1hdChcIiQxezB9JDNcIixjb250ZXh0Lm5hbWVQcm92aWRlci5HZXRSZXBsYWNlKHZhcl9uYW1lKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLkVUZW1wbGF0ZS5JZ25vcmVPcHRpbWl6YXRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChUZW1wbGF0ZVR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuQ29tbWVudDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY29udGV4dC5TZXR0aW5ncyAmIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5TZXR0aW5ncy5SZW1vdmVDb21tZW50cykgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUHJldiAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5OZXh0ID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFQcmV2LkVuZFN0YXRlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5FbmRTdGF0ZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChfc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlJvb3RUb2tlbiA9IE5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5QcmV2ID0gUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gPSBQcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBib29sIElzVmFsdWVTdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZS5MZW5ndGggPCAyKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbHVlWzBdID09ICdcIicgJiYgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5MYXN0T3JEZWZhdWx0PGNoYXI+KFZhbHVlKSA9PSAnXCInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBUZW1wbGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIFRlbXBsYXRlKEVUZW1wbGF0ZSB0ZW1wbGF0ZSwgTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXMsIHN0cmluZyByZWdleCwgQ29udGV4dCBjb250ZXh0KSA6IGJhc2UoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRlbXBsYXRlVHlwZSA9IHRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIE1hdGNoZXMgPSBtYXRjaGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlZ2V4U3RyaW5nID0gcmVnZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGVtcGxhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuSWdub3JlT3B0aW1pemF0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbHVlID0gTWF0Y2hlc1swXS5Hcm91cHNbMl0uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNWYWx1ZVN0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9IF92YWx1ZS5TdWJzdHJpbmcoMSwgX3ZhbHVlLkxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZShfdmFsdWUpKSBjb250ZXh0LmN1c3RvbUlnbm9yZU9wdGltaXplLkFkZChfdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9ICdcIicgKyBfdmFsdWUgKyAnXCInO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZShNYXRjaGVzWzBdLkdyb3Vwc1syXS5WYWx1ZSkpIGNvbnRleHQuY3VzdG9tSWdub3JlT3B0aW1pemUuQWRkKE1hdGNoZXNbMF0uR3JvdXBzWzJdLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cbiAgICAgICAgXG5wcml2YXRlIGJvb2wgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX09wdGltaXphYmxlPXRydWU7fVxyXG4gICAgfVxyXG59XHJcblxyXG4iXQp9Cg==

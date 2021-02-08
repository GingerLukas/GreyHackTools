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
                                {
                                    var b;
                                    if ((!(((b = Bridge.as(context.LastToken, GreyHackTools.GreyHackCompiler.Token.Bracket))) != null) || b.IsOpening) && !Bridge.referenceEquals(context.LastToken.Value, "=>")) {
                                        context.MapActive.Push(true);
                                        context.ShouldOptimizeString.Push((context.Settings & GreyHackTools.GreyHackCompiler.Settings.IgnoreMapVariables) === 0);
                                    } else {
                                        context.MapActive.Push(false);
                                        context.ShouldOptimizeString.Push(false);
                                    }
                                }
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJKc01TcHBDb21waWxlci5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FxQzJDQTs0Q0FFc0JBLEFBQWtEQSxVQUFDQTs0QkFBT0E7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBLE9BQU9BOzBCQUF2RkEsS0FBSUE7MENBQ3BDQSxBQUFrREEsVUFBQ0E7NEJBQU9BOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBLE9BQU9BOzBCQUFqSEEsS0FBSUE7MkNBQ2pDQSxBQUFrREEsVUFBQ0E7NEJBQU9BOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUEsT0FBT0E7MEJBQXpOQSxLQUFJQTsrQ0FFNUJBLEFBQW9EQSxVQUFDQTs0QkFBT0E7NEJBQWNBOzRCQUFnQkE7NEJBQWFBLE9BQU9BOzBCQUFoRkEsS0FBSUE7eUNBRXhDQSxBQUFvREEsVUFBQ0E7NEJBQU9BOzRCQUFjQSxPQUFPQTswQkFBbkRBLEtBQUlBOzRDQUNqQ0EsQUFBa0RBLFVBQUNBOzRCQUFPQTs0QkFBYUEsT0FBT0E7MEJBQWhEQSxLQUFJQTt5Q0FFckNBLEFBQWtEQSxVQUFDQTs0QkFBT0E7NEJBQWFBOzRCQUFhQSxPQUFPQTswQkFBN0RBLEtBQUlBO3FDQUVwQ0EsQUFBb0RBLFVBQUNBOzRCQUFPQTs0QkFBY0E7NEJBQWdCQTs0QkFBZ0JBOzRCQUFlQTs0QkFBaUJBOzRCQUFlQTs0QkFBY0E7NEJBQWVBOzRCQUFjQTs0QkFBZUE7NEJBQWdCQTs0QkFBaUJBOzRCQUFrQkE7NEJBQW9CQTs0QkFBaUJBOzRCQUFlQSxPQUFPQTswQkFBblNBLEtBQUlBOzJDQUU1QkEsQUFBb0RBLFVB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QUFnQkE7d0JBQ3BCQTt3QkFDQUEsb0JBQWVBO3dCQUNmQSxJQUFJQSxDQUFDQSxPQUFvQ0EsY0FBT0EsT0FBS0EsV0FBbURBLEFBQU9BLFNBQVNBOzRCQUVwSEEsWUFBT0E7NEJBQ1BBLGlCQUFZQTs7NEJBSVpBLFlBQU9BOzRCQUNQQSxvQkFBb0JBOzs7O29CQUk1QkEsYUFBUUE7O29CQUVSQSxPQUFPQSwyRUFBYUEsU0FBU0E7O29CQUk3QkEsT0FBT0EsMkVBQWFBLFNBQVNBOzs7O2dCQU1qQ0EsT0FBT0EsdUNBQThCQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyIjZGVmaW5lIGpzXHJcbnVzaW5nIEJyaWRnZTtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UZXh0LlJlZ3VsYXJFeHByZXNzaW9ucztcclxuXHJcbm5hbWVzcGFjZSBKc01TcHBDb21waWxlclxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFNldHRpbmdzXHJcblxyXG4gICAgICAgIFtGbGFnc11cclxuICAgICAgICBwdWJsaWMgZW51bSBTZXR0aW5nc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTm9uZSA9IDAsXHJcbiAgICAgICAgICAgIElnbm9yZU1hcFZhcmlhYmxlcyA9IDEsXHJcbiAgICAgICAgICAgIFJlbW92ZUNvbW1lbnRzID0gMixcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBJbnRlcm5hbFxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmcgX3NlcGFyYXRvciA9IEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgLy9wcml2YXRlIHN0YXRpYyBzdHJpbmcgX3NlcGFyYXRvciA9IFwiO1wiO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuU2VwYXJhdG9ycyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vMSk9PntfbzEuQWRkKCcgJyk7X28xLkFkZCgnLicpO19vMS5BZGQoJywnKTtfbzEuQWRkKCc6Jyk7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlbkJyYWNrZXRzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8Y2hhcj4oKSwoX28yKT0+e19vMi5BZGQoJygnKTtfbzIuQWRkKCcpJyk7X28yLkFkZCgnWycpO19vMi5BZGQoJ10nKTtfbzIuQWRkKCd7Jyk7X28yLkFkZCgnfScpO3JldHVybiBfbzI7fSk7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxjaGFyPiBfdG9rZW5PcGVyYXRvcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzMpPT57X28zLkFkZCgnKycpO19vMy5BZGQoJy0nKTtfbzMuQWRkKCcqJyk7X28zLkFkZCgnLycpO19vMy5BZGQoJyUnKTtfbzMuQWRkKCc8Jyk7X28zLkFkZCgnPicpO19vMy5BZGQoJz0nKTtfbzMuQWRkKCchJyk7X28zLkFkZCgnXicpO19vMy5BZGQoJyYnKTtfbzMuQWRkKCd8Jyk7X28zLkFkZCgnQCcpO19vMy5BZGQoJ34nKTtyZXR1cm4gX28zO30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PHN0cmluZz4gX3Rva2VuRW5kU3RhdGVtZW50cyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PHN0cmluZz4oKSwoX280KT0+e19vNC5BZGQoXCJcXG5cIik7X280LkFkZChcIlxcclxcblwiKTtfbzQuQWRkKFwiO1wiKTtyZXR1cm4gX280O30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PHN0cmluZz4gX3Rva2VuSW5jbHVkZSA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PHN0cmluZz4oKSwoX281KT0+e19vNS5BZGQoXCIjIVwiKTtyZXR1cm4gX281O30pO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuRW5kSW5jbHVkZSA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vNik9PntfbzYuQWRkKCchJyk7cmV0dXJuIF9vNjt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxjaGFyPiBfdG9rZW5TdHJpbmdzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8Y2hhcj4oKSwoX283KT0+e19vNy5BZGQoJ1wiJyk7X283LkFkZCgnJCcpO3JldHVybiBfbzc7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8c3RyaW5nPiBfa2V5d29yZHMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vOCk9PntfbzguQWRkKFwiaWZcIik7X284LkFkZChcInRoZW5cIik7X284LkFkZChcImVsc2VcIik7X284LkFkZChcImVuZFwiKTtfbzguQWRkKFwid2hpbGVcIik7X284LkFkZChcImZvclwiKTtfbzguQWRkKFwiaW5cIik7X284LkFkZChcImFuZFwiKTtfbzguQWRkKFwib3JcIik7X284LkFkZChcIm5vdFwiKTtfbzguQWRkKFwidHJ1ZVwiKTtfbzguQWRkKFwiZmFsc2VcIik7X284LkFkZChcInJldHVyblwiKTtfbzguQWRkKFwiY29udGludWVcIik7X284LkFkZChcImJyZWFrXCIpO19vOC5BZGQoXCJuZXdcIik7cmV0dXJuIF9vODt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxzdHJpbmc+IF9pZ25vcmVPcHRpbWl6ZSA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PHN0cmluZz4oKSwoX285KT0+e19vOS5BZGQoXCJGaWxlXCIpO19vOS5BZGQoXCJhYnNcIik7X285LkFkZChcImFjb3NcIik7X285LkFkZChcImFjdGl2ZV9uZXRfY2FyZFwiKTtfbzkuQWRkKFwiYWN0aXZlX3VzZXJcIik7X285LkFkZChcImFpcmNyYWNrXCIpO19vOS5BZGQoXCJhaXJtb25cIik7X285LkFkZChcImFzaW5cIik7X285LkFkZChcImF0YW5cIik7X285LkFkZChcImJpdHdpc2VcIik7X285LkFkZChcImJzc2lkX25hbWVcIik7X285LkFkZChcImJ1aWxkXCIpO19vOS5BZGQoXCJjZWlsXCIpO19vOS5BZGQoXCJjaGFuZ2VfcGFzc3dvcmRcIik7X285LkFkZChcImNoYXJcIik7X285LkFkZChcImNobW9kXCIpO19vOS5BZGQoXCJjbG9zZV9wcm9ncmFtXCIpO19vOS5BZGQoXCJjb2RlXCIpO19vOS5BZGQoXCJjb21tYW5kX2luZm9cIik7X285LkFkZChcImNvbm5lY3RfZXRoZXJuZXRcIik7X285LkFkZChcImNvbm5lY3Rfc2VydmljZVwiKTtfbzkuQWRkKFwiY29ubmVjdF93aWZpXCIpO19vOS5BZGQoXCJjb3B5XCIpO19vOS5BZGQoXCJjb3NcIik7X285LkFkZChcImNyZWF0ZV9mb2xkZXJcIik7X285LkFkZChcImNyZWF0ZV9ncm91cFwiKTtfbzkuQWRkKFwiY3JlYXRlX3VzZXJcIik7X285LkFkZChcImN1cnJlbnRfZGF0ZVwiKTtfbzkuQWRkKFwiY3VycmVudF9wYXRoXCIpO19vOS5BZGQoXCJkZWNpcGhlclwiKTtfbzkuQWRkKFwiZGVsZXRlXCIpO19vOS5BZGQoXCJkZWxldGVfZ3JvdXBcIik7X285LkFkZChcImRlbGV0ZV91c2VyXCIpO19vOS5BZGQoXCJkZXZpY2VfcG9ydHNcIik7X285LkFkZChcImRldmljZXNfbGFuX2lwXCIpO19vOS5BZGQoXCJkdW1wX2xpYlwiKTtfbzkuQWRkKFwiZXNzaWRfbmFtZVwiKTtfbzkuQWRkKFwiZXhpdFwiKTtfbzkuQWRkKFwiZmxvb3JcIik7X285LkFkZChcImZvcm1hdF9jb2x1bW5zXCIpO19vOS5BZGQoXCJnZXRfZmlsZXNcIik7X285LkFkZChcImdldF9mb2xkZXJzXCIpO19vOS5BZGQoXCJnZXRfbGFuX2lwXCIpO19vOS5BZGQoXCJnZXRfcG9ydHNcIik7X285LkFkZChcImdldF9yb3V0ZXJcIik7X285LkFkZChcImdldF9zaGVsbFwiKTtfbzkuQWRkKFwiZ2xvYmFsc1wiKTtfbzkuQWRkKFwiZ3JvdXBcIik7X285LkFkZChcImdyb3Vwc1wiKTtfbzkuQWRkKFwiaGFzSW5kZXhcIik7X285LkFkZChcImhhc19wZXJtaXNzaW9uXCIpO19vOS5BZGQoXCJob3N0X2NvbXB1dGVyXCIpO19vOS5BZGQoXCJpbmNsdWRlX2xpYlwiKTtfbzkuQWRkKFwiaW5kZXhPZlwiKTtfbzkuQWRkKFwiaW5kZXhlc1wiKTtfbzkuQWRkKFwiaXNfYmluYXJ5XCIpO19vOS5BZGQoXCJpc19jbG9zZWRcIik7X285LkFkZChcImlzX2ZvbGRlclwiKTtfbzkuQWRkKFwiaXNfbGFuX2lwXCIpO19vOS5BZGQoXCJpc19uZXR3b3JrX2FjdGl2ZVwiKTtfbzkuQWRkKFwiaXNfdmFsaWRfaXBcIik7X285LkFkZChcImpvaW5cIik7X285LkFkZChcImxhc3RJbmRleE9mXCIpO19vOS5BZGQoXCJsYXVuY2hcIik7X285LkFkZChcImxlblwiKTtfbzkuQWRkKFwibGliX25hbWVcIik7X285LkFkZChcImxvYWRcIik7X285LkFkZChcImxvY2FsX2lwXCIpO19vOS5BZGQoXCJsb2NhbHNcIik7X285LkFkZChcImxvd2VyXCIpO19vOS5BZGQoXCJtZDVcIik7X285LkFkZChcIm1vdmVcIik7X285LkFkZChcIm5hbWVcIik7X285LkFkZChcIm5ldF91c2VcIik7X285LkFkZChcIm5ldHdvcmtfZGV2aWNlc1wiKTtfbzkuQWRkKFwibmV0d29ya19nYXRld2F5XCIpO19vOS5BZGQoXCJuc2xvb2t1cFwiKTtfbzkuQWRkKFwib3ZlcmZsb3dcIik7X285LkFkZChcIm93bmVyXCIpO19vOS5BZGQoXCJwYXJlbnRcIik7X285LkFkZChcInBhcmVudF9wYXRoXCIpO19vOS5BZGQoXCJwYXRoXCIpO19vOS5BZGQoXCJwZXJtaXNzaW9uc1wiKTtfbzkuQWRkKFwicGlcIik7X285LkFkZChcInBpbmdcIik7X285LkFkZChcInBpbmdfcG9ydFwiKTtfbzkuQWRkKFwicG9wXCIpO19vOS5BZGQoXCJwb3J0X2luZm9cIik7X285LkFkZChcInBvcnRfbnVtYmVyXCIpO19vOS5BZGQoXCJwcmludFwiKTtfbzkuQWRkKFwicHJvZ3JhbV9wYXRoXCIpO19vOS5BZGQoXCJwdWJsaWNfaXBcIik7X285LkFkZChcInB1bGxcIik7X285LkFkZChcInB1c2hcIik7X285LkFkZChcInB1dFwiKTtfbzkuQWRkKFwicmFuZ2VcIik7X285LkFkZChcInJlbW92ZVwiKTtfbzkuQWRkKFwicmVuYW1lXCIpO19vOS5BZGQoXCJyZXBsYWNlXCIpO19vOS5BZGQoXCJyZXZlcnNlXCIpO19vOS5BZGQoXCJybmRcIik7X285LkFkZChcInJvdW5kXCIpO19vOS5BZGQoXCJzY2FuXCIpO19vOS5BZGQoXCJzY2FuX2FkZHJlc3NcIik7X285LkFkZChcInNjcFwiKTtfbzkuQWRkKFwic2V0X2NvbnRlbnRcIik7X285LkFkZChcInNldF9ncm91cFwiKTtfbzkuQWRkKFwic2hvd19wcm9jc1wiKTtfbzkuQWRkKFwic2h1ZmZsZVwiKTtfbzkuQWRkKFwic2lnblwiKTtfbzkuQWRkKFwic2luXCIpO19vOS5BZGQoXCJzaXplXCIpO19vOS5BZGQoXCJzbGljZVwiKTtfbzkuQWRkKFwic210cF91c2VyX2xpc3RcIik7X285LkFkZChcInNvcnRcIik7X285LkFkZChcInNwbGl0XCIpO19vOS5BZGQoXCJzcXJ0XCIpO19vOS5BZGQoXCJzdGFydF90ZXJtaW5hbFwiKTtfbzkuQWRkKFwic3RyXCIpO19vOS5BZGQoXCJzdW1cIik7X285LkFkZChcInRhblwiKTtfbzkuQWRkKFwidG9faW50XCIpO19vOS5BZGQoXCJ0b3VjaFwiKTtfbzkuQWRkKFwidHJpbVwiKTtfbzkuQWRkKFwidHlwZW9mXCIpO19vOS5BZGQoXCJ1cHBlclwiKTtfbzkuQWRkKFwidXNlZF9wb3J0c1wiKTtfbzkuQWRkKFwidXNlcl9iYW5rX251bWJlclwiKTtfbzkuQWRkKFwidXNlcl9pbnB1dFwiKTtfbzkuQWRkKFwidXNlcl9tYWlsX2FkZHJlc3NcIik7X285LkFkZChcInZhbFwiKTtfbzkuQWRkKFwidmFsdWVzXCIpO19vOS5BZGQoXCJ2ZXJzaW9uXCIpO19vOS5BZGQoXCJ3aG9pc1wiKTtfbzkuQWRkKFwid2lmaV9uZXR3b3Jrc1wiKTtfbzkuQWRkKFwicGFyYW1zXCIpO19vOS5BZGQoXCJjbGVhcl9zY3JlZW5cIik7X285LkFkZChcIndhaXRcIik7X285LkFkZChcInNlbGZcIik7X285LkFkZChcIm51bGxcIik7X285LkFkZChcImZ1bmN0aW9uXCIpO19vOS5BZGQoXCJjb250ZW50XCIpO19vOS5BZGQoXCJsYW5faXBcIik7X285LkFkZChcImdldF9jb250ZW50XCIpO19vOS5BZGQoXCJhaXJlcGxheVwiKTtfbzkuQWRkKFwiZmlyZXdhbGxfcnVsZXNcIik7X285LkFkZChcImtlcm5lbF92ZXJzaW9uXCIpO19vOS5BZGQoXCJrZXJuZWxfdmVyc2lvblwiKTtfbzkuQWRkKFwicnNoZWxsX3NlcnZlclwiKTtfbzkuQWRkKFwicnNoZWxsX3NlcnZlclwiKTtfbzkuQWRkKFwiX19pc2FcIik7X285LkFkZChcImlmXCIpO19vOS5BZGQoXCJ0aGVuXCIpO19vOS5BZGQoXCJlbHNlXCIpO19vOS5BZGQoXCJlbmRcIik7X285LkFkZChcIndoaWxlXCIpO19vOS5BZGQoXCJmb3JcIik7X285LkFkZChcImluXCIpO19vOS5BZGQoXCJhbmRcIik7X285LkFkZChcIm9yXCIpO19vOS5BZGQoXCJub3RcIik7X285LkFkZChcInRydWVcIik7X285LkFkZChcImZhbHNlXCIpO19vOS5BZGQoXCJudWxsXCIpO19vOS5BZGQoXCJyZXR1cm5cIik7X285LkFkZChcImNvbnRpbnVlXCIpO19vOS5BZGQoXCJicmVha1wiKTtfbzkuQWRkKFwiZnVuY3Rpb25cIik7X285LkFkZChcIm5ld1wiKTtfbzkuQWRkKFwic2VsZlwiKTtyZXR1cm4gX285O30pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IERpY3Rpb25hcnk8c3RyaW5nLCBzdHJpbmc+IF9vcGVyYXRvcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIHN0cmluZz4oKSwoX28xMCk9PntfbzEwLkFkZChcIiYmXCIsQFwiIGFuZCBcIik7X28xMC5BZGQoXCJ8fFwiLEBcIiBvciBcIik7X28xMC5BZGQoXCI8PFwiLEBcImJpdHdpc2UoXCJcIjw8XCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCI+PlwiLEBcImJpdHdpc2UoXCJcIj4+XCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCI+Pj5cIixAXCJiaXR3aXNlKFwiXCI+Pj5cIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcIl5eXCIsQFwiYml0d2lzZShcIlwiXlwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwiJlwiLEBcImJpdHdpc2UoXCJcIiZcIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcInxcIixAXCJiaXR3aXNlKFwiXCJ8XCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCJ+XCIsQFwiYml0d2lzZShcIlwiflwiXCIsJGIpXCIpO19vMTAuQWRkKFwiKytcIixAXCIkYT0kYSsxXCIpO19vMTAuQWRkKFwiLS1cIixAXCIkYT0kYS0xXCIpO19vMTAuQWRkKFwiKz1cIixAXCIkYT0kYSskYlwiKTtfbzEwLkFkZChcIi09XCIsQFwiJGE9JGEtJGJcIik7X28xMC5BZGQoXCIqPVwiLEBcIiRhPSRhKiRiXCIpO19vMTAuQWRkKFwiLz1cIixAXCIkYT0kYS8kYlwiKTtfbzEwLkFkZChcIiU9XCIsQFwiJGE9JGElJGJcIik7X28xMC5BZGQoXCI9PlwiLEBcImZ1bmN0aW9uJGFcIik7cmV0dXJuIF9vMTA7fSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEVUZW1wbGF0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTm9uZSxcclxuICAgICAgICAgICAgSXRlcmF0aW9uSW5kZXgsXHJcbiAgICAgICAgICAgIElnbm9yZU9wdGltaXphdGlvbixcclxuICAgICAgICAgICAgVGVybmFyeU9wZXJhdG9yLFxyXG4gICAgICAgICAgICBDb21tZW50LFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRGljdGlvbmFyeTxzdHJpbmcsIEVUZW1wbGF0ZT4gX3RlbXBsYXRlcyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgRVRlbXBsYXRlPigpLChfbzExKT0+e19vMTEuQWRkKEBcIihfXykoLiopKF9pZHgpXCIsRVRlbXBsYXRlLkl0ZXJhdGlvbkluZGV4KTtfbzExLkFkZChAXCIoXFxcXCkoXFxTKilcIixFVGVtcGxhdGUuSWdub3JlT3B0aW1pemF0aW9uKTtfbzExLkFkZChAXCIoXFwvXFwvKSguKikkXCIsRVRlbXBsYXRlLkNvbW1lbnQpO3JldHVybiBfbzExO30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIElzVGVtcGxhdGUoc3RyaW5nIGlucHV0LCBvdXQgc3RyaW5nIHJlZ2V4LCBvdXQgTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXMsIG91dCBFVGVtcGxhdGUgdGVtcGxhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoIChLZXlWYWx1ZVBhaXI8c3RyaW5nLCBFVGVtcGxhdGU+IHBhaXIgaW4gX3RlbXBsYXRlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWF0Y2hlcyA9IFJlZ2V4Lk1hdGNoZXMoaW5wdXQsIHBhaXIuS2V5KTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzLkNvdW50ICE9IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggPSBwYWlyLktleTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHBhaXIuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1hdGNoZXMgPSBudWxsO1xyXG4gICAgICAgICAgICByZWdleCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gRVRlbXBsYXRlLk5vbmU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgQ29tcGlsZShzdHJpbmcgY29kZSwgYm9vbCBvcHRpbWl6ZSA9IGZhbHNlLCBTZXR0aW5ncyBzZXR0aW5ncyA9IFNldHRpbmdzLk5vbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVG9rZW5pemUoY29kZSwgc2V0dGluZ3MpLkNvbXBpbGUob3B0aW1pemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIFRyeUNvbXBpbGUoc3RyaW5nIGNvZGUsIG91dCBzdHJpbmcgY29tcGlsZWRDb2RlLCBib29sIG9wdGltaXplID0gZmFsc2UsIFNldHRpbmdzIHNldHRpbmdzID0gU2V0dGluZ3MuTm9uZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb21waWxlZENvZGUgPSBDb21waWxlKGNvZGUsIG9wdGltaXplLCBzZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbXBpbGVkQ29kZSA9IGUuTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgQ29udGV4dCBUb2tlbml6ZShzdHJpbmcgcGxhaW5Db2RlLCBTZXR0aW5ncyBzZXR0aW5ncyA9IFNldHRpbmdzLk5vbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb250ZXh0IGNvbnRleHQgPSBuZXcgQ29udGV4dChzZXR0aW5ncykgeyBQbGFpbklucHV0ID0gbmV3IFF1ZXVlPGNoYXI+KHBsYWluQ29kZSkgfTtcclxuXHJcbiAgICAgICAgICAgIFRva2VuIHRva2VuID0gbnVsbDtcclxuICAgICAgICAgICAgd2hpbGUgKCh0b2tlbiA9IEdldE5leHRUb2tlbihjb250ZXh0KSkgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5BZGRUb2tlbih0b2tlbik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoY29udGV4dC5TZXR0aW5ncyAmIFNldHRpbmdzLklnbm9yZU1hcFZhcmlhYmxlcykgIT0gMCAmJiB0b2tlbi5QcmV2ICE9IG51bGwgJiYgdG9rZW4uUHJldi5WYWx1ZSA9PSBcIi5cIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRleHQuSWdub3JlT3B0aW1pemUodG9rZW4uVmFsdWUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jdXN0b21JZ25vcmVPcHRpbWl6ZS5BZGQodG9rZW4uVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlbW92ZVNwYWNlcyhRdWV1ZTxjaGFyPiBxdWV1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdoaWxlIChxdWV1ZS5Db3VudCAhPSAwICYmIGNoYXIuSXNXaGl0ZVNwYWNlKHF1ZXVlLlBlZWsoKSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHF1ZXVlLkRlcXVldWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgRnVuYzxDb250ZXh0LCBib29sPiBHZXRTZXBhcmF0aW9uU2VsZWN0b3IoQ29udGV4dCBjb250ZXh0LCBvdXQgVG9rZW4gdG9rZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnLycgJiYgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KGNvbnRleHQuUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpID09ICcvJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uVGVtcGxhdGUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+ICFJc0VuZE9mTGluZSh4KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuTWFwQWN0aXZlLlBlZWsoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uU2VwYXJhdG9yKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJywnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goIWNvbnRleHQuU2V0dGluZ3MuSGFzRmxhZyhTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnOic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJ1xcXFwnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5UZW1wbGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gIV90b2tlbkJyYWNrZXRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICFfdG9rZW5TZXBhcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICFfdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkgKyBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oeC5QbGFpbklucHV0LDEpLkZpcnN0T3JEZWZhdWx0KCkuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5JbmNsdWRlLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgK1xyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LDEpLkZpcnN0T3JEZWZhdWx0KCkuVG9TdHJpbmcoKSkpIC8vaW5jbHVkZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5JbmNsdWRlKCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90b2tlbkVuZEluY2x1ZGUuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSkpIC8vb3BlcmF0b3JcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uT3BlcmF0b3IoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IF90b2tlbk9wZXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX3Rva2VuQnJhY2tldHMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSkpIC8vYnJhY2tldHNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uQnJhY2tldCgpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJygnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICcpJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnWyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaCgoIShjb250ZXh0Lkxhc3RUb2tlbiA9PSBudWxsIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiBpcyBUb2tlbi5PcGVyYXRvcikpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY29udGV4dC5TZXR0aW5ncyAmIFNldHRpbmdzLklnbm9yZU1hcFZhcmlhYmxlcykgPT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ10nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd7Jzpcclxue1xyXG4gICAgVG9rZW4uQnJhY2tldCBiO1xyXG4gICAgaWYgKCghKChiID0gY29udGV4dC5MYXN0VG9rZW4gYXMgVG9rZW4uQnJhY2tldCkgIT0gbnVsbCkgfHwgYi5Jc09wZW5pbmcpICYmIGNvbnRleHQuTGFzdFRva2VuLlZhbHVlICE9IFwiPT5cIilcclxuICAgIHtcclxuICAgICAgICBjb250ZXh0Lk1hcEFjdGl2ZS5QdXNoKHRydWUpO1xyXG4gICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaCgoY29udGV4dC5TZXR0aW5ncyAmIFNldHRpbmdzLklnbm9yZU1hcFZhcmlhYmxlcykgPT0gMCk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dC5NYXBBY3RpdmUuUHVzaChmYWxzZSk7XHJcbiAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKGZhbHNlKTtcclxuICAgIH1cclxufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd9JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5NYXBBY3RpdmUuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5TZXBhcmF0b3JzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL3NlcGFyYXRvcnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uU2VwYXJhdG9yKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKF90b2tlblN0cmluZ3MuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSkpIC8vc3RyaW5nc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHRva2VuLk9wdGltaXphYmxlID0gY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QZWVrKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnJCcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4uQ3VzdG9tID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5PcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHggPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHZXRTdHJpbmcoeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4geCA9PiAhX3Rva2VuQnJhY2tldHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlblNlcGFyYXRvcnMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlblN0cmluZ3MuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlbk9wZXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSArIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPih4LlBsYWluSW5wdXQsMSkuRmlyc3RPckRlZmF1bHQoKS5Ub1N0cmluZygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgR2V0U3RyaW5nKENvbnRleHQgY29udGV4dClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMCAmJiBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpICE9ICdcIicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgIT0gMClcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKSk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJ1wiJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpKTtcclxuICAgICAgICAgICAgICAgIEdldFN0cmluZyhjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLlJlbW92ZSgwLCAxKTtcclxuICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLlJlbW92ZShjb250ZXh0LlN0cmluZ0J1aWxkZXIuTGVuZ3RoIC0gMSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFRva2VuIEdldE5leHRUb2tlbihDb250ZXh0IGNvbnRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQ2xlYXIoKTtcclxuICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IGNvbnRleHQuU3RyaW5nQnVpbGRlcjtcclxuICAgICAgICAgICAgUmVtb3ZlU3BhY2VzKGNvbnRleHQuUGxhaW5JbnB1dCk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPT0gMCkgcmV0dXJuIG51bGw7XHJcbkdyZXlIYWNrQ29tcGlsZXIuVG9rZW4gdDtcbiAgICAgICAgICAgIEZ1bmM8Q29udGV4dCwgYm9vbD4gc2VwYXJhdG9yID0gR2V0U2VwYXJhdGlvblNlbGVjdG9yKGNvbnRleHQsIG91dCB0KTtcclxuICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2IuQXBwZW5kKGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCkpO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIHNlcGFyYXRvcihjb250ZXh0KSk7XHJcblxyXG4gICAgICAgICAgICBzdHJpbmcgdG1wX3ZhbHVlID0gc2IuVG9TdHJpbmcoKTtcclxuc3RyaW5nIHJlZ2V4O1xuTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXM7XG5HcmV5SGFja0NvbXBpbGVyLkVUZW1wbGF0ZSB0ZW1wbGF0ZTtcbiAgICAgICAgICAgIGlmICghKHQgaXMgVG9rZW4uU3RyaW5nKSAmJiBJc1RlbXBsYXRlKHRtcF92YWx1ZSwgb3V0IHJlZ2V4LCBvdXQgbWF0Y2hlcywgb3V0IHRlbXBsYXRlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdCA9IG5ldyBUb2tlbi5UZW1wbGF0ZSh0ZW1wbGF0ZSwgbWF0Y2hlcywgcmVnZXgsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF9rZXl3b3Jkcy5Db250YWlucyh0bXBfdmFsdWUpICYmICEodCBpcyBUb2tlbi5TdHJpbmcpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ID0gbmV3IFRva2VuLktleXdvcmQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHQuT3B0aW1pemFibGUgJiYgY29udGV4dC5JZ25vcmVPcHRpbWl6ZSh0LlZhbHVlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdC5PcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0LlZhbHVlID0gdG1wX3ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA+IDAgJiYgY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG5cclxuICAgICAgICAgICAgdC5FbmRTdGF0ZW1lbnQgPSBJc0VuZE9mTGluZShjb250ZXh0KTtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA+IDAgJiYgY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnOycpIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9XHJcbnByaXZhdGUgc3RhdGljIGJvb2wgSXNFbmRPZkxpbmUoQ29udGV4dCBjb250ZXh0KVxyXG57XHJcbiAgICByZXR1cm4gY29udGV4dC5QbGFpbklucHV0LkNvdW50ID09IDAgfHwgX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkgKyBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oY29udGV4dC5QbGFpbklucHV0LDEpLkZpcnN0T3JEZWZhdWx0KCkuVG9TdHJpbmcoKSkgfHwgX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkpO1xyXG59ICAgIH1cclxufVxyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIGNsYXNzIENvbnRleHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBRdWV1ZTxjaGFyPiBQbGFpbklucHV0IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIFRva2VuIFJvb3RUb2tlbiB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUb2tlbiBMYXN0VG9rZW4geyBnZXQ7IHNldDsgfVxyXG5wdWJsaWMgU3RyaW5nQnVpbGRlciBTdHJpbmdCdWlsZGVyXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmdCdWlsZGVycy5QZWVrKCk7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAgICAgaW50ZXJuYWwgU3RhY2s8U3RyaW5nQnVpbGRlcj4gc3RyaW5nQnVpbGRlcnMgPSBuZXcgU3RhY2s8U3RyaW5nQnVpbGRlcj4oKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgU3RhY2s8Ym9vbD4gU2hvdWxkT3B0aW1pemVTdHJpbmcgPSBuZXcgU3RhY2s8Ym9vbD4oKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgU3RhY2s8Ym9vbD4gTWFwQWN0aXZlID0gbmV3IFN0YWNrPGJvb2w+KCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIFZhcmlhYmxlTmFtZVByb3ZpZGVyIG5hbWVQcm92aWRlciA9IG5ldyBWYXJpYWJsZU5hbWVQcm92aWRlcigpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBib29sIG9wdGltaXplRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBTZXR0aW5ncyBTZXR0aW5ncyA9IEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5TZXR0aW5ncy5Ob25lO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBIYXNoU2V0PHN0cmluZz4gY3VzdG9tSWdub3JlT3B0aW1pemUgPSBuZXcgSGFzaFNldDxzdHJpbmc+KCk7XHJcbiNpZiBqc1xyXG4jZWxzZVxyXG4gICAgICAgICAgICBpbnRlcm5hbCBIdHRwQ2xpZW50IGh0dHBDbGllbnQgPSBuZXcgSHR0cENsaWVudCgpO1xyXG4jZW5kaWZcclxucHVibGljIGJvb2wgSWdub3JlT3B0aW1pemUoc3RyaW5nIHZhbHVlKVxyXG57XHJcbiAgICByZXR1cm4gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl9pZ25vcmVPcHRpbWl6ZS5Db250YWlucyh2YWx1ZSkgfHwgY3VzdG9tSWdub3JlT3B0aW1pemUuQ29udGFpbnModmFsdWUpO1xyXG59XHJcbiAgICAgICAgICAgIHB1YmxpYyB2b2lkIEFkZFRva2VuKFRva2VuIHRva2VuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoUm9vdFRva2VuID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUm9vdFRva2VuID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgTGFzdFRva2VuID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTGFzdFRva2VuLk5leHQgPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5QcmV2ID0gTGFzdFRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIExhc3RUb2tlbiA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBDb250ZXh0KFNldHRpbmdzIHNldHRpbmdzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgICAgICAgICAgUGxhaW5JbnB1dCA9IG5ldyBRdWV1ZTxjaGFyPigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBNYXBBY3RpdmUuUHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdHJpbmcgQ29tcGlsZShib29sIG9wdGltaXplID0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9wdGltaXplRW5hYmxlZCA9IG9wdGltaXplO1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nQnVpbGRlci5DbGVhcigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgVG9rZW4gbm9kZTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpbWl6ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlID0gUm9vdFRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChub2RlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5PcHRpbWl6ZSh0aGlzKS5OZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBub2RlID0gUm9vdFRva2VuO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5Db21waWxlKHRoaXMpLk5leHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgb3B0aW1pemVFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgICAgICAgICBUb2tlbiBub2RlID0gUm9vdFRva2VuO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlIGlzIFRva2VuLlN0cmluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kKCdcIicrbm9kZS5WYWx1ZSsgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQobm9kZS5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuRW5kU3RhdGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kKCdcXG4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSovXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNiLkFwcGVuZExpbmUobm9kZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5OZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBjbGFzcyBWYXJpYWJsZU5hbWVQcm92aWRlclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgRGljdGlvbmFyeTxzdHJpbmcsIHN0cmluZz4gX3JlcGxhY2UgPSBuZXcgRGljdGlvbmFyeTxzdHJpbmcsIHN0cmluZz4oKTtcclxuICAgICAgICBwcml2YXRlIGludCBfc3RhdGU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX2NoYXJzID0gXCJhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgTmV4dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTdHJpbmdCdWlsZGVyIHNiID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICAgICAgaW50IGluZGV4ID0gX3N0YXRlO1xyXG5cclxuICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IGkgPSBpbmRleCAlIF9jaGFycy5MZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBjaGFyIGMgPSBfY2hhcnNbaV07XHJcbiAgICAgICAgICAgICAgICBzYi5BcHBlbmQoYyk7XHJcbiAgICAgICAgICAgICAgICBpbmRleCAvPSBfY2hhcnMuTGVuZ3RoO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChpbmRleCA+IDApO1xyXG5cclxuICAgICAgICAgICAgX3N0YXRlKys7XHJcbiAgICAgICAgICAgIHJldHVybiBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRGVmaW5lZChzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfcmVwbGFjZS5Db250YWluc0tleShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRSZXBsYWNlKHN0cmluZyBvcmlnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFfcmVwbGFjZS5Db250YWluc0tleShvcmlnKSlcclxuICAgICAgICAgICAgICAgIF9yZXBsYWNlW29yaWddID0gTmV4dCgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIF9yZXBsYWNlW29yaWddO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgVG9rZW4gUHJldiB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUb2tlbiBOZXh0IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIHZpcnR1YWwgc3RyaW5nIFZhbHVlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIHZpcnR1YWwgYm9vbCBDdXN0b20geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBPcHRpbWl6YWJsZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIEVuZFN0YXRlbWVudCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgdmlydHVhbCBUb2tlbiBPcHRpbWl6ZShDb250ZXh0IGNvbnRleHQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChPcHRpbWl6YWJsZSAmJiAvL2ZsYWcgZnJvbSB0b2tlbml6YXRpb24gIFxyXG4gICAgICAgICAgICAgICAgICAgIFZhbHVlLkxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAhY2hhci5Jc0RpZ2l0KFZhbHVlWzBdKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFjb250ZXh0Lklnbm9yZU9wdGltaXplKFZhbHVlKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IGNvbnRleHQubmFtZVByb3ZpZGVyLkdldFJlcGxhY2UoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyB2aXJ0dWFsIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuQnJhY2tldCBiOyAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5TdHJpbmdCdWlsZGVyLkxlbmd0aCAhPSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKChSZWdleC5Jc01hdGNoKGNvbnRleHQuU3RyaW5nQnVpbGRlcltjb250ZXh0LlN0cmluZ0J1aWxkZXIuTGVuZ3RoLTFdLlRvU3RyaW5nKCksIFwiXFxcXHdcIikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgIFZhbHVlLkxlbmd0aCA+IDAgJiYgUmVnZXguSXNNYXRjaChWYWx1ZVswXS5Ub1N0cmluZygpLCBcIlxcXFx3XCIpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAoUHJldiAhPSBudWxsICYmIFByZXYgaXMgS2V5d29yZCAmJiAoYiA9IHRoaXMgYXMgQnJhY2tldCkgIT0gbnVsbCYmIChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PGNoYXI+KGIuVmFsdWUpID09ICcoJyB8fCBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PGNoYXI+KGIuVmFsdWUpID09ICdbJykpKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoRW5kU3RhdGVtZW50ICYmIE5leHQgIT0gbnVsbCAmJiAhZm9yY2UpIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoX3NlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJpdmF0ZSBib29sIENvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKHN0cmluZyBzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocy5MZW5ndGggPiBWYWx1ZS5MZW5ndGgpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWVbaV0gIT0gc1tpXSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgS2V5d29yZCA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBLZXl3b3JkKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBPcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBPcHRpbWl6ZShDb250ZXh0IGNvbnRleHQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlID09IFwidHJ1ZVwiKSBWYWx1ZSA9IFwiMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZSA9PSBcImZhbHNlXCIpIFZhbHVlID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuT3B0aW1pemUoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBPcGVyYXRvciA6IFZhcmlhYmxlXHJcbiAgICAgICAgICAgIHtcclxucHVibGljIGJvb2wgTmVlZHNMZWZ0XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX29wZXJhdG9ycy5Db250YWluc0tleShWYWx1ZSkgJiYgX29wZXJhdG9yc1tWYWx1ZV0uQ29udGFpbnMoXCIkYVwiKTtcclxuICAgIH1cclxufXB1YmxpYyBib29sIE5lZWRzUmlnaHRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5fb3BlcmF0b3JzLkNvbnRhaW5zS2V5KFZhbHVlKSAmJiBfb3BlcmF0b3JzW1ZhbHVlXS5Db250YWlucyhcIiRiXCIpO1xyXG4gICAgfVxyXG59ICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEN1c3RvbVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldCB7IHJldHVybiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX29wZXJhdG9ycy5Db250YWluc0tleShWYWx1ZSk7IH1cclxuICAgICAgICAgICAgICAgICAgICBzZXQgeyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBPcGVyYXRvcigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChDdXN0b20pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgcyA9IF9vcGVyYXRvcnNbVmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmVlZHNMZWZ0ICYmIFByZXYgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5CcmFja2V0IGI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYiA9IFByZXYgYXMgQnJhY2tldCkgIT0gbnVsbCYmIGIuSXNPcGVuaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcImludmFsaWQgc3ludGF4IGZvciB0ZW1wbGF0ZSB7MH1cIixWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyA9IHMuUmVwbGFjZShcIiRhXCIsIGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLFByZXYpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxUb2tlbj4oXCJrZXkxXCIpLlByZXY6KFRva2VuKW51bGwpICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldiA9IFByZXYuUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2Lk5leHQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUm9vdFRva2VuID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5lZWRzUmlnaHQgJiYgTmV4dCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LkNvbXBpbGUoY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzID0gcy5SZXBsYWNlKFwiJGJcIiwgY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZFN0YXRlbWVudCA9IE5leHQuRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MlwiLE5leHQpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxUb2tlbj4oXCJrZXkyXCIpLk5leHQ6KFRva2VuKW51bGwpICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dCA9IE5leHQuTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LlByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTGFzdFRva2VuID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIk9wZXJhdG9yOiB7MH1cIixiYXNlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgVmFyaWFibGUgOiBUb2tlblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuQnJhY2tldCBicjsgICAgICAgICAgICAgICAgICAgIGlmICgoYnIgPSB0aGlzIGFzIEJyYWNrZXQpICE9IG51bGwmJiAhYnIuQ3VzdG9tICYmIChici5WYWx1ZS5MZW5ndGggPT0gMCB8fCBici5WYWx1ZVswXSAhPSAneycpKSByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKE5leHQgIT0gbnVsbCAmJiAhR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl90b2tlbk9wZXJhdG9ycy5Db250YWlucyhTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PGNoYXI+KFZhbHVlKSkgJiYgKE5leHQuVmFsdWUgPT0gXCIuXCIgfHwgTmV4dC5WYWx1ZSA9PSBcIihcIiB8fCBOZXh0LlZhbHVlID09IFwiW1wiKSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoTmV4dCAhPSBudWxsICYmICFHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Y2hhcj4oVmFsdWUpKSAmJiAoTmV4dC5WYWx1ZSA9PSBcIi5cIiB8fCBOZXh0LlZhbHVlID09IFwiKFwiIHx8IE5leHQuVmFsdWUgPT0gXCJbXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LkNvbXBpbGUoY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dC5WYWx1ZSAhPSBcIi5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gTmV4dC5OZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBOZXh0Lk5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTNcIixOZXh0KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8VG9rZW4+KFwia2V5M1wiKS5Db21waWxlKGNvbnRleHQsIHRydWUpOihUb2tlbiludWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5NFwiLE5leHQpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxUb2tlbj4oXCJrZXk0XCIpLk5leHQ6KFRva2VuKW51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZXh0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQuUHJldiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbk9wZXJhdG9yIG87XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE5leHQgIT0gbnVsbCAmJiAobyA9IE5leHQgYXMgT3BlcmF0b3IpICE9IG51bGwmJiBvLk5lZWRzTGVmdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBiID0gRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IGJhc2UuQ29tcGlsZShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZFN0YXRlbWVudCA9IGI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5PcGVyYXRvciBvbztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoUHJldiAhPSBudWxsICYmIChvbyA9IFByZXYgYXMgT3BlcmF0b3IpICE9IG51bGwmJiBvby5OZWVkc1JpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29sIGIgPSBFbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gYmFzZS5Db21waWxlKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gYjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJWYXJpYWJsZTogezB9XCIsYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIFN0cmluZyA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ3VzdG9tKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChcIihcXFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgZGVwdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgbGFzdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgVmFsdWUuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICsgMSA8IFZhbHVlLkxlbmd0aCAmJiBWYWx1ZVtpXSA9PSAnXFxcXCcgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoVmFsdWVbaSArIDFdID09ICd7JyB8fCBWYWx1ZVtpICsgMV0gPT0gJ30nKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChWYWx1ZVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWVbaV0gPT0gJ3snKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCA9PSAwKSBsYXN0ID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGgrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChWYWx1ZVtpXSA9PSAnfScgJiYgKGkgPT0gMCB8fCBWYWx1ZVtpIC0gMV0gIT0gJ1xcXFwnKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXB0aC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCA8IDApIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcInN0cmluZyBmb3JtYXQgKHswfSkgaXMgbm90IHZhbGlkXCIsVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVwdGggPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoXCJcXFwiKyhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRleHQgaW5uZXJDb2RlQ29udGV4dCA9IFRva2VuaXplKFZhbHVlLlN1YnN0cmluZyhsYXN0LCBpIC0gbGFzdCkuUmVwbGFjZShAXCJcIlwiXCJcIlwiLCBAXCJcIlwiXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJDb2RlQ29udGV4dC5uYW1lUHJvdmlkZXIgPSBjb250ZXh0Lm5hbWVQcm92aWRlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGNvbXBpbGVkID0gaW5uZXJDb2RlQ29udGV4dC5Db21waWxlKGNvbnRleHQub3B0aW1pemVFbmFibGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb21waWxlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoXCIpK1xcXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGVwdGggPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiXFxcIilcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEVuZFN0YXRlbWVudCkgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChfc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIlN0cmluZzogezB9ezF9XCIsKEN1c3RvbSA/IFwiJFwiIDogXCJcIiksYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgQnJhY2tldCA6IFZhcmlhYmxlXHJcbiAgICAgICAgICAgIHtcclxucHVibGljIGJvb2wgSXNPcGVuaW5nXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBWYWx1ZSA9PSBcIihcIiB8fCBWYWx1ZSA9PSBcIltcIiB8fCBWYWx1ZSA9PSBcIntcIjtcclxuICAgIH1cclxufXB1YmxpYyBib29sIElzQ2xvc2luZ1xyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVmFsdWUgPT0gXCIpXCIgfHwgVmFsdWUgPT0gXCJdXCIgfHwgVmFsdWUgPT0gXCJ9XCI7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAgICAgICAgIHByaXZhdGUgRGljdGlvbmFyeTxjaGFyLCBjaGFyPiBfb3BlbmluZ1RvQ2xvc2luZyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PGNoYXIsIGNoYXI+KCksKF9vMSk9PntfbzEuQWRkKCcoJywnKScpO19vMS5BZGQoJ1snLCddJyk7X28xLkFkZCgneycsJ30nKTtyZXR1cm4gX28xO30pO1xyXG4gICAgICAgICAgICAgICAgcHVibGljIEJyYWNrZXQoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBUb2tlbiBDb21waWxlSW5zaWRlKENvbnRleHQgY29udGV4dCwgYm9vbCBpbmNsdWRlTGFzdEJyYWNrZXQgPSB0cnVlLCBib29sIGN1c3RvbUJvZHkgPSBmYWxzZSwgc3RyaW5nIHBvc3RmaXggPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBib29sIGIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBUb2tlbiBsYXN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBUb2tlbiBub2RlID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXN0b21Cb2R5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiID0gbm9kZS5FbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLkVuZFN0YXRlbWVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbkJyYWNrZXQgdGI7ICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayBmb3IgbGFzdCBicmFja2V0IGJlZm9yZSBjb21waWxpbmcgaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbmNsdWRlTGFzdEJyYWNrZXQgJiYgKHRiID0gbm9kZSBhcyBCcmFja2V0KSAhPSBudWxsJiYgdGIuSXNDbG9zaW5nICYmXHJcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuTGFzdDxjaGFyPiggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Yi5WYWx1ZSkgPT0gX29wZW5pbmdUb0Nsb3NpbmdbU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5MYXN0PGNoYXI+KFZhbHVlKV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0Yi5FbmRTdGF0ZW1lbnQgJiYgbGFzdCAhPSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhbGFzdC5FbmRTdGF0ZW1lbnQgJiYgIWxhc3QuVmFsdWUuQ29udGFpbnMoX3NlcGFyYXRvcikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChfc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVG9rZW4gdG1wID0gbm9kZS5Db21waWxlKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWN1c3RvbUJvZHkpIG5vZGUuRW5kU3RhdGVtZW50ID0gYjtcclxuQnJhY2tldCBicjsgICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNraW5nIGZvciBsYXN0IGJyYWNrZXQgYWZ0ZXIgY29tcGlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGJyID0gbm9kZSBhcyBCcmFja2V0KSAhPSBudWxsJiYgYnIuSXNDbG9zaW5nKSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0bXAuTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgobm9kZSE9bnVsbD9ub2RlLk5leHQ6KFRva2VuKW51bGwpID09IG51bGwgfHwgKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXk1XCIsbm9kZS5OZXh0KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8VG9rZW4+KFwia2V5NVwiKS5WYWx1ZTooc3RyaW5nKW51bGwpICE9IFwiZWxzZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChwb3N0Zml4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChDdXN0b20pIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChJc09wZW5pbmcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb2tlbiBub2RlID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG5CcmFja2V0IGI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZSA9PSBcIntcIiAmJiAoKChiID0gUHJldiBhcyBCcmFja2V0KSAhPSBudWxsJiYgYi5DdXN0b20pIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoXCJmdW5jdGlvblwiKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2LlZhbHVlID09IFwiZWxzZVwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFFbmRTdGF0ZW1lbnQpIEVuZFN0YXRlbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUb2tlbiB0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHR5cGUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoXCJmdW5jdGlvblwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJmdW5jdGlvblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgPSBQcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoUHJldi5WYWx1ZSA9PSBcImVsc2VcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJpZlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgPSBQcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgPSBQcmV2LlByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoXCJpZlwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJpZlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoXCIgdGhlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHQuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoXCJmb3JcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwiZm9yXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwid2hpbGVcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwid2hpbGVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodC5FbmRTdGF0ZW1lbnQgfHwgRW5kU3RhdGVtZW50KSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKF9zZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IENvbXBpbGVJbnNpZGUoY29udGV4dCwgZmFsc2UsIHRydWUsIHN0cmluZy5Gb3JtYXQoXCJlbmQgezB9XCIsdHlwZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgS2V5d29yZCBrO1xyXG4gICAgaWYgKChrID0gUHJldiBhcyBLZXl3b3JkKSAhPSBudWxsJiYgay5WYWx1ZSA9PSBcImZvclwiKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoJyAnKTtcclxuICAgICAgICBub2RlID0gQ29tcGlsZUluc2lkZShjb250ZXh0LCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChWYWx1ZSk7XHJcbiAgICAgICAgbm9kZSA9IENvbXBpbGVJbnNpZGUoY29udGV4dCk7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgTmV4dCA9IG5vZGUhPW51bGw/bm9kZS5OZXh0OihUb2tlbiludWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gbm9kZS5FbmRTdGF0ZW1lbnQgJiYgIVZhbHVlLkVuZHNXaXRoKEdyZXlIYWNrQ29tcGlsZXIuX3NlcGFyYXRvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoUHJldiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlJvb3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2Lk5leHQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSA9PSBudWxsIHx8IG5vZGUuTmV4dCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLk5leHQuUHJldiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN1c3RvbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBDb21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiQnJhY2tldDogezB9XCIsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgU2VwYXJhdG9yIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIFNlcGFyYXRvcigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiU2VwYXJhdG9yOiB7MH1cIixWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBJbmNsdWRlIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIEluY2x1ZGUoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiNpZiBqc1xyXG5cclxuI2Vsc2VcclxuICAgICAgICAgICAgICAgICAgICBpZiAoRW52aXJvbm1lbnQuT1NWZXJzaW9uLlBsYXRmb3JtID09IFBsYXRmb3JtSUQuT3RoZXIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IFwiLy9pbmNsdWRlIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gd2ViXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlID0gY29udGV4dC5odHRwQ2xpZW50LkdldFN0cmluZ0FzeW5jKFZhbHVlKS5HZXRBd2FpdGVyKCkuR2V0UmVzdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4jZW5kaWZcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiSW5jbHVkZTogezB9XCIsYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIFRlbXBsYXRlIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBWYWx1ZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKF92YWx1ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc3RyaW5nIF92YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgRVRlbXBsYXRlIFRlbXBsYXRlVHlwZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgc3RyaW5nIFJlZ2V4U3RyaW5nIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBNYXRjaENvbGxlY3Rpb24gTWF0Y2hlcyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gT3B0aW1pemUoQ29udGV4dCBjb250ZXh0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoVGVtcGxhdGVUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuRVRlbXBsYXRlLkl0ZXJhdGlvbkluZGV4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYgIT0gbnVsbCAmJiBQcmV2LlZhbHVlID09IFwiLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLk9wdGltaXplKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyB2YXJfbmFtZSA9IE1hdGNoZXNbMF0uR3JvdXBzWzJdLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPcldoaXRlU3BhY2UodmFyX25hbWUpIHx8IGNvbnRleHQuSWdub3JlT3B0aW1pemUodmFyX25hbWUpKSByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9IFJlZ2V4LlJlcGxhY2UoVmFsdWUsIFJlZ2V4U3RyaW5nLCBzdHJpbmcuRm9ybWF0KFwiJDF7MH0kM1wiLGNvbnRleHQubmFtZVByb3ZpZGVyLkdldFJlcGxhY2UodmFyX25hbWUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuRVRlbXBsYXRlLklnbm9yZU9wdGltaXphdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKFRlbXBsYXRlVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLkVUZW1wbGF0ZS5Db21tZW50OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjb250ZXh0LlNldHRpbmdzICYgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLlNldHRpbmdzLlJlbW92ZUNvbW1lbnRzKSAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChQcmV2ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2Lk5leHQgPSBOZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIVByZXYuRW5kU3RhdGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2LkVuZFN0YXRlbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKF9zZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUm9vdFRva2VuID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZXh0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LlByZXYgPSBQcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IFByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGJvb2wgSXNWYWx1ZVN0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlLkxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVmFsdWVbMF0gPT0gJ1wiJyAmJiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkxhc3RPckRlZmF1bHQ8Y2hhcj4oVmFsdWUpID09ICdcIic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIFRlbXBsYXRlKClcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgVGVtcGxhdGUoRVRlbXBsYXRlIHRlbXBsYXRlLCBNYXRjaENvbGxlY3Rpb24gbWF0Y2hlcywgc3RyaW5nIHJlZ2V4LCBDb250ZXh0IGNvbnRleHQpIDogYmFzZSgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGVtcGxhdGVUeXBlID0gdGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgTWF0Y2hlcyA9IG1hdGNoZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVnZXhTdHJpbmcgPSByZWdleDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0ZW1wbGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLkVUZW1wbGF0ZS5JZ25vcmVPcHRpbWl6YXRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdmFsdWUgPSBNYXRjaGVzWzBdLkdyb3Vwc1syXS5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJc1ZhbHVlU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbHVlID0gX3ZhbHVlLlN1YnN0cmluZygxLCBfdmFsdWUuTGVuZ3RoIC0gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0Lklnbm9yZU9wdGltaXplKF92YWx1ZSkpIGNvbnRleHQuY3VzdG9tSWdub3JlT3B0aW1pemUuQWRkKF92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbHVlID0gJ1wiJyArIF92YWx1ZSArICdcIic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0Lklnbm9yZU9wdGltaXplKE1hdGNoZXNbMF0uR3JvdXBzWzJdLlZhbHVlKSkgY29udGV4dC5jdXN0b21JZ25vcmVPcHRpbWl6ZS5BZGQoTWF0Y2hlc1swXS5Hcm91cHNbMl0uVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxuICAgICAgICBcbnByaXZhdGUgYm9vbCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fT3B0aW1pemFibGU9dHJ1ZTt9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdCn0K

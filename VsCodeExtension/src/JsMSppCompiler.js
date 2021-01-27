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
                _tokenSpaces: null,
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
                    this._tokenSpaces = function (_o16) {
                            _o16.add(GreyHackTools.GreyHackCompiler.Token.Keyword, function (_o8) {
                                    _o8.add(GreyHackTools.GreyHackCompiler.Token.Keyword, true);
                                    _o8.add(GreyHackTools.GreyHackCompiler.Token.Operator, true);
                                    _o8.add(GreyHackTools.GreyHackCompiler.Token.Variable, true);
                                    _o8.add(GreyHackTools.GreyHackCompiler.Token.String, false);
                                    _o8.add(GreyHackTools.GreyHackCompiler.Token.Bracket, false);
                                    _o8.add(GreyHackTools.GreyHackCompiler.Token.Separator, false);
                                    _o8.add(GreyHackTools.GreyHackCompiler.Token.Include, false);
                                    _o8.add(GreyHackTools.GreyHackCompiler.Token.Template, true);
                                    return _o8;
                                }(new (System.Collections.Generic.Dictionary$2(System.Type,System.Boolean)).ctor()));
                            _o16.add(GreyHackTools.GreyHackCompiler.Token.Operator, function (_o9) {
                                    _o9.add(GreyHackTools.GreyHackCompiler.Token.Keyword, true);
                                    _o9.add(GreyHackTools.GreyHackCompiler.Token.Operator, false);
                                    _o9.add(GreyHackTools.GreyHackCompiler.Token.Variable, false);
                                    _o9.add(GreyHackTools.GreyHackCompiler.Token.String, false);
                                    _o9.add(GreyHackTools.GreyHackCompiler.Token.Bracket, false);
                                    _o9.add(GreyHackTools.GreyHackCompiler.Token.Separator, false);
                                    _o9.add(GreyHackTools.GreyHackCompiler.Token.Include, false);
                                    _o9.add(GreyHackTools.GreyHackCompiler.Token.Template, false);
                                    return _o9;
                                }(new (System.Collections.Generic.Dictionary$2(System.Type,System.Boolean)).ctor()));
                            _o16.add(GreyHackTools.GreyHackCompiler.Token.Variable, function (_o10) {
                                    _o10.add(GreyHackTools.GreyHackCompiler.Token.Keyword, true);
                                    _o10.add(GreyHackTools.GreyHackCompiler.Token.Operator, false);
                                    _o10.add(GreyHackTools.GreyHackCompiler.Token.Variable, true);
                                    _o10.add(GreyHackTools.GreyHackCompiler.Token.String, false);
                                    _o10.add(GreyHackTools.GreyHackCompiler.Token.Bracket, false);
                                    _o10.add(GreyHackTools.GreyHackCompiler.Token.Separator, false);
                                    _o10.add(GreyHackTools.GreyHackCompiler.Token.Include, false);
                                    _o10.add(GreyHackTools.GreyHackCompiler.Token.Template, true);
                                    return _o10;
                                }(new (System.Collections.Generic.Dictionary$2(System.Type,System.Boolean)).ctor()));
                            _o16.add(GreyHackTools.GreyHackCompiler.Token.String, function (_o11) {
                                    _o11.add(GreyHackTools.GreyHackCompiler.Token.Keyword, false);
                                    _o11.add(GreyHackTools.GreyHackCompiler.Token.Operator, false);
                                    _o11.add(GreyHackTools.GreyHackCompiler.Token.Variable, false);
                                    _o11.add(GreyHackTools.GreyHackCompiler.Token.String, false);
                                    _o11.add(GreyHackTools.GreyHackCompiler.Token.Bracket, false);
                                    _o11.add(GreyHackTools.GreyHackCompiler.Token.Separator, false);
                                    _o11.add(GreyHackTools.GreyHackCompiler.Token.Include, false);
                                    _o11.add(GreyHackTools.GreyHackCompiler.Token.Template, false);
                                    return _o11;
                                }(new (System.Collections.Generic.Dictionary$2(System.Type,System.Boolean)).ctor()));
                            _o16.add(GreyHackTools.GreyHackCompiler.Token.Bracket, function (_o12) {
                                    _o12.add(GreyHackTools.GreyHackCompiler.Token.Keyword, false);
                                    _o12.add(GreyHackTools.GreyHackCompiler.Token.Operator, false);
                                    _o12.add(GreyHackTools.GreyHackCompiler.Token.Variable, false);
                                    _o12.add(GreyHackTools.GreyHackCompiler.Token.String, false);
                                    _o12.add(GreyHackTools.GreyHackCompiler.Token.Bracket, false);
                                    _o12.add(GreyHackTools.GreyHackCompiler.Token.Separator, false);
                                    _o12.add(GreyHackTools.GreyHackCompiler.Token.Include, false);
                                    _o12.add(GreyHackTools.GreyHackCompiler.Token.Template, false);
                                    return _o12;
                                }(new (System.Collections.Generic.Dictionary$2(System.Type,System.Boolean)).ctor()));
                            _o16.add(GreyHackTools.GreyHackCompiler.Token.Separator, function (_o13) {
                                    _o13.add(GreyHackTools.GreyHackCompiler.Token.Keyword, false);
                                    _o13.add(GreyHackTools.GreyHackCompiler.Token.Operator, false);
                                    _o13.add(GreyHackTools.GreyHackCompiler.Token.Variable, false);
                                    _o13.add(GreyHackTools.GreyHackCompiler.Token.String, false);
                                    _o13.add(GreyHackTools.GreyHackCompiler.Token.Bracket, false);
                                    _o13.add(GreyHackTools.GreyHackCompiler.Token.Separator, false);
                                    _o13.add(GreyHackTools.GreyHackCompiler.Token.Include, false);
                                    _o13.add(GreyHackTools.GreyHackCompiler.Token.Template, false);
                                    return _o13;
                                }(new (System.Collections.Generic.Dictionary$2(System.Type,System.Boolean)).ctor()));
                            _o16.add(GreyHackTools.GreyHackCompiler.Token.Include, function (_o14) {
                                    _o14.add(GreyHackTools.GreyHackCompiler.Token.Keyword, false);
                                    _o14.add(GreyHackTools.GreyHackCompiler.Token.Operator, false);
                                    _o14.add(GreyHackTools.GreyHackCompiler.Token.Variable, false);
                                    _o14.add(GreyHackTools.GreyHackCompiler.Token.String, false);
                                    _o14.add(GreyHackTools.GreyHackCompiler.Token.Bracket, false);
                                    _o14.add(GreyHackTools.GreyHackCompiler.Token.Separator, false);
                                    _o14.add(GreyHackTools.GreyHackCompiler.Token.Include, false);
                                    _o14.add(GreyHackTools.GreyHackCompiler.Token.Template, false);
                                    return _o14;
                                }(new (System.Collections.Generic.Dictionary$2(System.Type,System.Boolean)).ctor()));
                            _o16.add(GreyHackTools.GreyHackCompiler.Token.Template, function (_o15) {
                                    _o15.add(GreyHackTools.GreyHackCompiler.Token.Keyword, true);
                                    _o15.add(GreyHackTools.GreyHackCompiler.Token.Operator, false);
                                    _o15.add(GreyHackTools.GreyHackCompiler.Token.Variable, true);
                                    _o15.add(GreyHackTools.GreyHackCompiler.Token.String, false);
                                    _o15.add(GreyHackTools.GreyHackCompiler.Token.Bracket, false);
                                    _o15.add(GreyHackTools.GreyHackCompiler.Token.Separator, false);
                                    _o15.add(GreyHackTools.GreyHackCompiler.Token.Include, false);
                                    _o15.add(GreyHackTools.GreyHackCompiler.Token.Template, true);
                                    return _o15;
                                }(new (System.Collections.Generic.Dictionary$2(System.Type,System.Boolean)).ctor()));
                            return _o16;
                        }(new (System.Collections.Generic.Dictionary$2(System.Type,System.Collections.Generic.Dictionary$2(System.Type,System.Boolean))).ctor());
                    this._keywords = function (_o17) {
                            _o17.add("if");
                            _o17.add("then");
                            _o17.add("else");
                            _o17.add("end");
                            _o17.add("while");
                            _o17.add("for");
                            _o17.add("in");
                            _o17.add("and");
                            _o17.add("or");
                            _o17.add("not");
                            _o17.add("true");
                            _o17.add("false");
                            _o17.add("return");
                            _o17.add("continue");
                            _o17.add("break");
                            _o17.add("new");
                            return _o17;
                        }(new (System.Collections.Generic.HashSet$1(System.String)).ctor());
                    this._ignoreOptimize = function (_o18) {
                            _o18.add("File");
                            _o18.add("abs");
                            _o18.add("acos");
                            _o18.add("active_net_card");
                            _o18.add("active_user");
                            _o18.add("aircrack");
                            _o18.add("airmon");
                            _o18.add("asin");
                            _o18.add("atan");
                            _o18.add("bitwise");
                            _o18.add("bssid_name");
                            _o18.add("build");
                            _o18.add("ceil");
                            _o18.add("change_password");
                            _o18.add("char");
                            _o18.add("chmod");
                            _o18.add("close_program");
                            _o18.add("code");
                            _o18.add("command_info");
                            _o18.add("connect_ethernet");
                            _o18.add("connect_service");
                            _o18.add("connect_wifi");
                            _o18.add("copy");
                            _o18.add("cos");
                            _o18.add("create_folder");
                            _o18.add("create_group");
                            _o18.add("create_user");
                            _o18.add("current_date");
                            _o18.add("current_path");
                            _o18.add("decipher");
                            _o18.add("delete");
                            _o18.add("delete_group");
                            _o18.add("delete_user");
                            _o18.add("device_ports");
                            _o18.add("devices_lan_ip");
                            _o18.add("dump_lib");
                            _o18.add("essid_name");
                            _o18.add("exit");
                            _o18.add("floor");
                            _o18.add("format_columns");
                            _o18.add("get_files");
                            _o18.add("get_folders");
                            _o18.add("get_lan_ip");
                            _o18.add("get_ports");
                            _o18.add("get_router");
                            _o18.add("get_shell");
                            _o18.add("globals");
                            _o18.add("group");
                            _o18.add("groups");
                            _o18.add("hasIndex");
                            _o18.add("has_permission");
                            _o18.add("host_computer");
                            _o18.add("include_lib");
                            _o18.add("indexOf");
                            _o18.add("indexes");
                            _o18.add("is_binary");
                            _o18.add("is_closed");
                            _o18.add("is_folder");
                            _o18.add("is_lan_ip");
                            _o18.add("is_network_active");
                            _o18.add("is_valid_ip");
                            _o18.add("join");
                            _o18.add("lastIndexOf");
                            _o18.add("launch");
                            _o18.add("len");
                            _o18.add("lib_name");
                            _o18.add("load");
                            _o18.add("local_ip");
                            _o18.add("locals");
                            _o18.add("lower");
                            _o18.add("md5");
                            _o18.add("move");
                            _o18.add("name");
                            _o18.add("net_use");
                            _o18.add("network_devices");
                            _o18.add("network_gateway");
                            _o18.add("nslookup");
                            _o18.add("overflow");
                            _o18.add("owner");
                            _o18.add("parent");
                            _o18.add("parent_path");
                            _o18.add("path");
                            _o18.add("permissions");
                            _o18.add("pi");
                            _o18.add("ping");
                            _o18.add("ping_port");
                            _o18.add("pop");
                            _o18.add("port_info");
                            _o18.add("port_number");
                            _o18.add("print");
                            _o18.add("program_path");
                            _o18.add("public_ip");
                            _o18.add("pull");
                            _o18.add("push");
                            _o18.add("put");
                            _o18.add("range");
                            _o18.add("remove");
                            _o18.add("rename");
                            _o18.add("replace");
                            _o18.add("reverse");
                            _o18.add("rnd");
                            _o18.add("round");
                            _o18.add("scan");
                            _o18.add("scan_address");
                            _o18.add("scp");
                            _o18.add("set_content");
                            _o18.add("set_group");
                            _o18.add("show_procs");
                            _o18.add("shuffle");
                            _o18.add("sign");
                            _o18.add("sin");
                            _o18.add("size");
                            _o18.add("slice");
                            _o18.add("smtp_user_list");
                            _o18.add("sort");
                            _o18.add("split");
                            _o18.add("sqrt");
                            _o18.add("start_terminal");
                            _o18.add("str");
                            _o18.add("sum");
                            _o18.add("tan");
                            _o18.add("to_int");
                            _o18.add("touch");
                            _o18.add("trim");
                            _o18.add("typeof");
                            _o18.add("upper");
                            _o18.add("used_ports");
                            _o18.add("user_bank_number");
                            _o18.add("user_input");
                            _o18.add("user_mail_address");
                            _o18.add("val");
                            _o18.add("values");
                            _o18.add("version");
                            _o18.add("whois");
                            _o18.add("wifi_networks");
                            _o18.add("params");
                            _o18.add("clear_screen");
                            _o18.add("wait");
                            _o18.add("self");
                            _o18.add("null");
                            _o18.add("function");
                            _o18.add("content");
                            _o18.add("lan_ip");
                            _o18.add("get_content");
                            _o18.add("aireplay");
                            _o18.add("firewall_rules");
                            _o18.add("kernel_version");
                            _o18.add("kernel_version");
                            _o18.add("rshell_server");
                            _o18.add("rshell_server");
                            _o18.add("__isa");
                            _o18.add("if");
                            _o18.add("then");
                            _o18.add("else");
                            _o18.add("end");
                            _o18.add("while");
                            _o18.add("for");
                            _o18.add("in");
                            _o18.add("and");
                            _o18.add("or");
                            _o18.add("not");
                            _o18.add("true");
                            _o18.add("false");
                            _o18.add("null");
                            _o18.add("return");
                            _o18.add("continue");
                            _o18.add("break");
                            _o18.add("function");
                            _o18.add("new");
                            _o18.add("self");
                            return _o18;
                        }(new (System.Collections.Generic.HashSet$1(System.String)).ctor());
                    this._operators = function (_o19) {
                            _o19.add("<<", "bitwise(\"<<\",$a,$b)");
                            _o19.add(">>", "bitwise(\">>\",$a,$b)");
                            _o19.add(">>>", "bitwise(\">>>\",$a,$b)");
                            _o19.add("^^", "bitwise(\"^\",$a,$b)");
                            _o19.add("&", "bitwise(\"&\",$a,$b)");
                            _o19.add("|", "bitwise(\"|\",$a,$b)");
                            _o19.add("~", "bitwise(\"~\",$b)");
                            _o19.add("++", "$a=$a+1");
                            _o19.add("--", "$a=$a-1");
                            _o19.add("+=", "$a=$a+$b");
                            _o19.add("-=", "$a=$a-$b");
                            _o19.add("*=", "$a=$a*$b");
                            _o19.add("/=", "$a=$a/$b");
                            _o19.add("%=", "$a=$a%$b");
                            _o19.add("=>", "function$a");
                            return _o19;
                        }(new (System.Collections.Generic.Dictionary$2(System.String,System.String)).ctor());
                    this._templates = function (_o20) {
                            _o20.add("(__)(.*)(_idx)", GreyHackTools.GreyHackCompiler.ETemplate.IterationIndex);
                            _o20.add("(\\\\)(\\S*)", GreyHackTools.GreyHackCompiler.ETemplate.IgnoreOptimization);
                            _o20.add("^(\\/\\/)(.*)$", GreyHackTools.GreyHackCompiler.ETemplate.Comment);
                            return _o20;
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
                if (context.StringBuilder.getLength() !== 0 && this.Prev != null && !System.Char.isWhiteSpace(String.fromCharCode(context.StringBuilder.getChar(((context.StringBuilder.getLength() - 1) | 0))))) {
                    if (GreyHackTools.GreyHackCompiler._tokenSpaces.getItem(Bridge.getType(this.Prev)).getItem(Bridge.getType(this))) {
                        context.StringBuilder.append(String.fromCharCode(32));
                    }
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
            System.Console.WriteLine(GreyHackTools.GreyHackCompiler.Compile("for(i in range(10)){print(i)}"));




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
                    var bra;
                    if (Bridge.referenceEquals(this.Value, "{") && ((((bra = Bridge.as(this.Prev, GreyHackTools.GreyHackCompiler.Token.Bracket))) != null && bra.Custom) || this.Prev.CompareBeginningOfValue("function"))) {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJKc01TcHBDb21waWxlci5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBMEsyQ0E7NENBRXNCQSxBQUFrREEsVUFBQ0E7NEJBQU9BOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQSxPQUFPQTswQkFBdkZBLEtBQUlBOzBDQUNwQ0EsQUFBa0RBLFVBQUNBOzRCQUFPQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQSxPQUFPQTswQkFBakhBLEtBQUlBOzJDQUNqQ0EsQUFBa0RBLFVBQUNBOzRCQUFPQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBOzRCQUFhQTs0QkFBYUE7NEJBQWFBLE9BQU9BOzBCQUF6TkEsS0FBSUE7K0NBRTVCQSxBQUFvREEsVUFBQ0E7NEJBQU9BOzRCQUFjQTs0QkFBZ0JBOzRCQUFhQSxPQUFPQTswQkFBaEZBLEtBQUlBO3lDQUV4Q0EsQUFBb0RBLFVBQUNBOzRCQUFPQTs0QkFBY0EsT0FBT0E7MEJBQW5EQSxLQUFJQTs0Q0FDakNBLEFBQWtEQSxVQUFDQTs0QkFBT0E7NEJBQWFBLE9BQU9BOzBCQUFoREEsS0FBSUE7eUNBRXJDQSxBQUFrREEsVUFBQ0E7NEJBQU9BOzRCQUFhQTs0QkFBYUEsT0FBT0E7MEJBQTdEQSxLQUFJQTt3Q0FHcEZBLEFBQTZFQSxVQUFDQTs0QkFBUUEsU0FBU0EsQUFBT0EsOENBQWVBLEFBQTJEQSxVQUFDQTtvQ0FBT0EsUUFBUUEsQUFBT0E7b0NBQXFCQSxRQUFRQSxBQUFPQTtvQ0FBc0JBLFFBQVFBLEFBQU9BO29DQUFzQkEsUUFBUUEsQUFBT0E7b0NBQXFCQSxRQUFRQSxBQUFPQTtvQ0FBc0JBLFFBQVFBLEFBQU9BO29DQUF3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Q29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgR3JleUhhY2tUb29scztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5OZXQ7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBTeXN0ZW0uR2xvYmFsaXphdGlvbjtcclxudXNpbmcgU3lzdGVtLlJlZmxlY3Rpb247XHJcbnVzaW5nIFN5c3RlbS5SdW50aW1lLkludGVyb3BTZXJ2aWNlcztcclxudXNpbmcgU3lzdGVtLlRleHQuUmVndWxhckV4cHJlc3Npb25zO1xyXG5cclxubmFtZXNwYWNlIEpzTVNwcENvbXBpbGVyXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBXcml0ZSBhIG1lc3NhZ2UgdG8gdGhlIENvbnNvbGVcclxuICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoR3JleUhhY2tDb21waWxlci5Db21waWxlKFwiZm9yKGkgaW4gcmFuZ2UoMTApKXtwcmludChpKX1cIikpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWZ0ZXIgYnVpbGRpbmcgKEN0cmwgKyBTaGlmdCArIEIpIHRoaXMgcHJvamVjdCwgXHJcbiAgICAgICAgICAgIC8vIGJyb3dzZSB0byB0aGUgL2Jpbi9EZWJ1ZyBvciAvYmluL1JlbGVhc2UgZm9sZGVyLlxyXG5cclxuICAgICAgICAgICAgLy8gQSBuZXcgYnJpZGdlLyBmb2xkZXIgaGFzIGJlZW4gY3JlYXRlZCBhbmRcclxuICAgICAgICAgICAgLy8gY29udGFpbnMgeW91ciBwcm9qZWN0cyBKYXZhU2NyaXB0IGZpbGVzLiBcclxuXHJcbiAgICAgICAgICAgIC8vIE9wZW4gdGhlIGJyaWRnZS9pbmRleC5odG1sIGZpbGUgaW4gYSBicm93c2VyIGJ5XHJcbiAgICAgICAgICAgIC8vIFJpZ2h0LUNsaWNrID4gT3BlbiBXaXRoLi4uLCB0aGVuIGNob29zZSBhXHJcbiAgICAgICAgICAgIC8vIHdlYiBicm93c2VyIGZyb20gdGhlIGxpc3RcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgYXBwbGljYXRpb24gd2lsbCB0aGVuIHJ1biBpbiB0aGUgYnJvd3Nlci5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIGNsYXNzIENvbnRleHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBRdWV1ZTxjaGFyPiBQbGFpbklucHV0IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIFRva2VuIFJvb3RUb2tlbiB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUb2tlbiBMYXN0VG9rZW4geyBnZXQ7IHNldDsgfVxyXG5wdWJsaWMgU3RyaW5nQnVpbGRlciBTdHJpbmdCdWlsZGVyXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmdCdWlsZGVycy5QZWVrKCk7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAgICAgaW50ZXJuYWwgU3RhY2s8U3RyaW5nQnVpbGRlcj4gc3RyaW5nQnVpbGRlcnMgPSBuZXcgU3RhY2s8U3RyaW5nQnVpbGRlcj4oKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgU3RhY2s8Ym9vbD4gU2hvdWxkT3B0aW1pemVTdHJpbmcgPSBuZXcgU3RhY2s8Ym9vbD4oKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgU3RhY2s8Ym9vbD4gTWFwQWN0aXZlID0gbmV3IFN0YWNrPGJvb2w+KCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIFZhcmlhYmxlTmFtZVByb3ZpZGVyIG5hbWVQcm92aWRlciA9IG5ldyBWYXJpYWJsZU5hbWVQcm92aWRlcigpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBib29sIG9wdGltaXplRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBTZXR0aW5ncyBTZXR0aW5ncyA9IEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5TZXR0aW5ncy5Ob25lO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBIYXNoU2V0PHN0cmluZz4gY3VzdG9tSWdub3JlT3B0aW1pemUgPSBuZXcgSGFzaFNldDxzdHJpbmc+KCk7XHJcbnB1YmxpYyBib29sIElnbm9yZU9wdGltaXplKHN0cmluZyB2YWx1ZSlcclxue1xyXG4gICAgcmV0dXJuIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5faWdub3JlT3B0aW1pemUuQ29udGFpbnModmFsdWUpIHx8IGN1c3RvbUlnbm9yZU9wdGltaXplLkNvbnRhaW5zKHZhbHVlKTtcclxufVxyXG4gICAgICAgICAgICBwdWJsaWMgdm9pZCBBZGRUb2tlbihUb2tlbiB0b2tlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKFJvb3RUb2tlbiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJvb3RUb2tlbiA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIExhc3RUb2tlbiA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIExhc3RUb2tlbi5OZXh0ID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4uUHJldiA9IExhc3RUb2tlbjtcclxuICAgICAgICAgICAgICAgICAgICBMYXN0VG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwdWJsaWMgQ29udGV4dChTZXR0aW5ncyBzZXR0aW5ncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgICAgIFBsYWluSW5wdXQgPSBuZXcgUXVldWU8Y2hhcj4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIFNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgTWFwQWN0aXZlLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RyaW5nIENvbXBpbGUoYm9vbCBvcHRpbWl6ZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZUVuYWJsZWQgPSBvcHRpbWl6ZTtcclxuICAgICAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIuQ2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBUb2tlbiBub2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGltaXplKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBSb290VG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLk9wdGltaXplKHRoaXMpLk5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUgPSBSb290VG9rZW47XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLkNvbXBpbGUodGhpcykuTmV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBTdHJpbmdCdWlsZGVyIHNiID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICAgICAgICAgIFRva2VuIG5vZGUgPSBSb290VG9rZW47XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgaXMgVG9rZW4uU3RyaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQoJ1wiJytub2RlLlZhbHVlKyAnXCInKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLkFwcGVuZChub2RlLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5FbmRTdGF0ZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQoJ1xcbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQoJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kTGluZShub2RlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLk5leHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNiLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBTZXR0aW5nc1xyXG5cclxuICAgICAgICBbRmxhZ3NdXHJcbiAgICAgICAgcHVibGljIGVudW0gU2V0dGluZ3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5vbmUgPSAwLFxyXG4gICAgICAgICAgICBJZ25vcmVNYXBWYXJpYWJsZXMgPSAxLFxyXG4gICAgICAgICAgICBSZW1vdmVDb21tZW50cyA9IDIsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gSW50ZXJuYWxcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nIF9zZXBhcmF0b3IgPSBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgc3RyaW5nIF9zZXBhcmF0b3IgPSBcIjtcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlblNlcGFyYXRvcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzEpPT57X28xLkFkZCgnICcpO19vMS5BZGQoJy4nKTtfbzEuQWRkKCcsJyk7X28xLkFkZCgnOicpO3JldHVybiBfbzE7fSk7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxjaGFyPiBfdG9rZW5CcmFja2V0cyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vMik9PntfbzIuQWRkKCcoJyk7X28yLkFkZCgnKScpO19vMi5BZGQoJ1snKTtfbzIuQWRkKCddJyk7X28yLkFkZCgneycpO19vMi5BZGQoJ30nKTtyZXR1cm4gX28yO30pO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuT3BlcmF0b3JzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8Y2hhcj4oKSwoX28zKT0+e19vMy5BZGQoJysnKTtfbzMuQWRkKCctJyk7X28zLkFkZCgnKicpO19vMy5BZGQoJy8nKTtfbzMuQWRkKCclJyk7X28zLkFkZCgnPCcpO19vMy5BZGQoJz4nKTtfbzMuQWRkKCc9Jyk7X28zLkFkZCgnIScpO19vMy5BZGQoJ14nKTtfbzMuQWRkKCcmJyk7X28zLkFkZCgnfCcpO19vMy5BZGQoJ0AnKTtfbzMuQWRkKCd+Jyk7cmV0dXJuIF9vMzt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxzdHJpbmc+IF90b2tlbkVuZFN0YXRlbWVudHMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vNCk9PntfbzQuQWRkKFwiXFxuXCIpO19vNC5BZGQoXCJcXHJcXG5cIik7X280LkFkZChcIjtcIik7cmV0dXJuIF9vNDt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxzdHJpbmc+IF90b2tlbkluY2x1ZGUgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vNSk9PntfbzUuQWRkKFwiIyFcIik7cmV0dXJuIF9vNTt9KTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlbkVuZEluY2x1ZGUgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzYpPT57X282LkFkZCgnIScpO3JldHVybiBfbzY7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuU3RyaW5ncyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vNyk9PntfbzcuQWRkKCdcIicpO19vNy5BZGQoJyQnKTtyZXR1cm4gX283O30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBEaWN0aW9uYXJ5PFR5cGUsIERpY3Rpb25hcnk8VHlwZSwgYm9vbD4+IF90b2tlblNwYWNlcyA9XHJcbiAgICAgICAgICAgIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PFR5cGUsIERpY3Rpb25hcnk8VHlwZSwgYm9vbD4+KCksKF9vMTYpPT57X28xNi5BZGQodHlwZW9mKFRva2VuLktleXdvcmQpLGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PFR5cGUsIGJvb2w+KCksKF9vOCk9PntfbzguQWRkKHR5cGVvZihUb2tlbi5LZXl3b3JkKSx0cnVlKTtfbzguQWRkKHR5cGVvZihUb2tlbi5PcGVyYXRvciksdHJ1ZSk7X284LkFkZCh0eXBlb2YoVG9rZW4uVmFyaWFibGUpLHRydWUpO19vOC5BZGQodHlwZW9mKFRva2VuLlN0cmluZyksZmFsc2UpO19vOC5BZGQodHlwZW9mKFRva2VuLkJyYWNrZXQpLGZhbHNlKTtfbzguQWRkKHR5cGVvZihUb2tlbi5TZXBhcmF0b3IpLGZhbHNlKTtfbzguQWRkKHR5cGVvZihUb2tlbi5JbmNsdWRlKSxmYWxzZSk7X284LkFkZCh0eXBlb2YoVG9rZW4uVGVtcGxhdGUpLHRydWUpO3JldHVybiBfbzg7fSkpO19vMTYuQWRkKHR5cGVvZihUb2tlbi5PcGVyYXRvciksZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8VHlwZSwgYm9vbD4oKSwoX285KT0+e19vOS5BZGQodHlwZW9mKFRva2VuLktleXdvcmQpLHRydWUpO19vOS5BZGQodHlwZW9mKFRva2VuLk9wZXJhdG9yKSxmYWxzZSk7X285LkFkZCh0eXBlb2YoVG9rZW4uVmFyaWFibGUpLGZhbHNlKTtfbzkuQWRkKHR5cGVvZihUb2tlbi5TdHJpbmcpLGZhbHNlKTtfbzkuQWRkKHR5cGVvZihUb2tlbi5CcmFja2V0KSxmYWxzZSk7X285LkFkZCh0eXBlb2YoVG9rZW4uU2VwYXJhdG9yKSxmYWxzZSk7X285LkFkZCh0eXBlb2YoVG9rZW4uSW5jbHVkZSksZmFsc2UpO19vOS5BZGQodHlwZW9mKFRva2VuLlRlbXBsYXRlKSxmYWxzZSk7cmV0dXJuIF9vOTt9KSk7X28xNi5BZGQodHlwZW9mKFRva2VuLlZhcmlhYmxlKSxnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxUeXBlLCBib29sPigpLChfbzEwKT0+e19vMTAuQWRkKHR5cGVvZihUb2tlbi5LZXl3b3JkKSx0cnVlKTtfbzEwLkFkZCh0eXBlb2YoVG9rZW4uT3BlcmF0b3IpLGZhbHNlKTtfbzEwLkFkZCh0eXBlb2YoVG9rZW4uVmFyaWFibGUpLHRydWUpO19vMTAuQWRkKHR5cGVvZihUb2tlbi5TdHJpbmcpLGZhbHNlKTtfbzEwLkFkZCh0eXBlb2YoVG9rZW4uQnJhY2tldCksZmFsc2UpO19vMTAuQWRkKHR5cGVvZihUb2tlbi5TZXBhcmF0b3IpLGZhbHNlKTtfbzEwLkFkZCh0eXBlb2YoVG9rZW4uSW5jbHVkZSksZmFsc2UpO19vMTAuQWRkKHR5cGVvZihUb2tlbi5UZW1wbGF0ZSksdHJ1ZSk7cmV0dXJuIF9vMTA7fSkpO19vMTYuQWRkKHR5cGVvZihUb2tlbi5TdHJpbmcpLGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PFR5cGUsIGJvb2w+KCksKF9vMTEpPT57X28xMS5BZGQodHlwZW9mKFRva2VuLktleXdvcmQpLGZhbHNlKTtfbzExLkFkZCh0eXBlb2YoVG9rZW4uT3BlcmF0b3IpLGZhbHNlKTtfbzExLkFkZCh0eXBlb2YoVG9rZW4uVmFyaWFibGUpLGZhbHNlKTtfbzExLkFkZCh0eXBlb2YoVG9rZW4uU3RyaW5nKSxmYWxzZSk7X28xMS5BZGQodHlwZW9mKFRva2VuLkJyYWNrZXQpLGZhbHNlKTtfbzExLkFkZCh0eXBlb2YoVG9rZW4uU2VwYXJhdG9yKSxmYWxzZSk7X28xMS5BZGQodHlwZW9mKFRva2VuLkluY2x1ZGUpLGZhbHNlKTtfbzExLkFkZCh0eXBlb2YoVG9rZW4uVGVtcGxhdGUpLGZhbHNlKTtyZXR1cm4gX28xMTt9KSk7X28xNi5BZGQodHlwZW9mKFRva2VuLkJyYWNrZXQpLGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PFR5cGUsIGJvb2w+KCksKF9vMTIpPT57X28xMi5BZGQodHlwZW9mKFRva2VuLktleXdvcmQpLGZhbHNlKTtfbzEyLkFkZCh0eXBlb2YoVG9rZW4uT3BlcmF0b3IpLGZhbHNlKTtfbzEyLkFkZCh0eXBlb2YoVG9rZW4uVmFyaWFibGUpLGZhbHNlKTtfbzEyLkFkZCh0eXBlb2YoVG9rZW4uU3RyaW5nKSxmYWxzZSk7X28xMi5BZGQodHlwZW9mKFRva2VuLkJyYWNrZXQpLGZhbHNlKTtfbzEyLkFkZCh0eXBlb2YoVG9rZW4uU2VwYXJhdG9yKSxmYWxzZSk7X28xMi5BZGQodHlwZW9mKFRva2VuLkluY2x1ZGUpLGZhbHNlKTtfbzEyLkFkZCh0eXBlb2YoVG9rZW4uVGVtcGxhdGUpLGZhbHNlKTtyZXR1cm4gX28xMjt9KSk7X28xNi5BZGQodHlwZW9mKFRva2VuLlNlcGFyYXRvciksZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8VHlwZSwgYm9vbD4oKSwoX28xMyk9PntfbzEzLkFkZCh0eXBlb2YoVG9rZW4uS2V5d29yZCksZmFsc2UpO19vMTMuQWRkKHR5cGVvZihUb2tlbi5PcGVyYXRvciksZmFsc2UpO19vMTMuQWRkKHR5cGVvZihUb2tlbi5WYXJpYWJsZSksZmFsc2UpO19vMTMuQWRkKHR5cGVvZihUb2tlbi5TdHJpbmcpLGZhbHNlKTtfbzEzLkFkZCh0eXBlb2YoVG9rZW4uQnJhY2tldCksZmFsc2UpO19vMTMuQWRkKHR5cGVvZihUb2tlbi5TZXBhcmF0b3IpLGZhbHNlKTtfbzEzLkFkZCh0eXBlb2YoVG9rZW4uSW5jbHVkZSksZmFsc2UpO19vMTMuQWRkKHR5cGVvZihUb2tlbi5UZW1wbGF0ZSksZmFsc2UpO3JldHVybiBfbzEzO30pKTtfbzE2LkFkZCh0eXBlb2YoVG9rZW4uSW5jbHVkZSksZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8VHlwZSwgYm9vbD4oKSwoX28xNCk9PntfbzE0LkFkZCh0eXBlb2YoVG9rZW4uS2V5d29yZCksZmFsc2UpO19vMTQuQWRkKHR5cGVvZihUb2tlbi5PcGVyYXRvciksZmFsc2UpO19vMTQuQWRkKHR5cGVvZihUb2tlbi5WYXJpYWJsZSksZmFsc2UpO19vMTQuQWRkKHR5cGVvZihUb2tlbi5TdHJpbmcpLGZhbHNlKTtfbzE0LkFkZCh0eXBlb2YoVG9rZW4uQnJhY2tldCksZmFsc2UpO19vMTQuQWRkKHR5cGVvZihUb2tlbi5TZXBhcmF0b3IpLGZhbHNlKTtfbzE0LkFkZCh0eXBlb2YoVG9rZW4uSW5jbHVkZSksZmFsc2UpO19vMTQuQWRkKHR5cGVvZihUb2tlbi5UZW1wbGF0ZSksZmFsc2UpO3JldHVybiBfbzE0O30pKTtfbzE2LkFkZCh0eXBlb2YoVG9rZW4uVGVtcGxhdGUpLGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PFR5cGUsIGJvb2w+KCksKF9vMTUpPT57X28xNS5BZGQodHlwZW9mKFRva2VuLktleXdvcmQpLHRydWUpO19vMTUuQWRkKHR5cGVvZihUb2tlbi5PcGVyYXRvciksZmFsc2UpO19vMTUuQWRkKHR5cGVvZihUb2tlbi5WYXJpYWJsZSksdHJ1ZSk7X28xNS5BZGQodHlwZW9mKFRva2VuLlN0cmluZyksZmFsc2UpO19vMTUuQWRkKHR5cGVvZihUb2tlbi5CcmFja2V0KSxmYWxzZSk7X28xNS5BZGQodHlwZW9mKFRva2VuLlNlcGFyYXRvciksZmFsc2UpO19vMTUuQWRkKHR5cGVvZihUb2tlbi5JbmNsdWRlKSxmYWxzZSk7X28xNS5BZGQodHlwZW9mKFRva2VuLlRlbXBsYXRlKSx0cnVlKTtyZXR1cm4gX28xNTt9KSk7cmV0dXJuIF9vMTY7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8c3RyaW5nPiBfa2V5d29yZHMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vMTcpPT57X28xNy5BZGQoXCJpZlwiKTtfbzE3LkFkZChcInRoZW5cIik7X28xNy5BZGQoXCJlbHNlXCIpO19vMTcuQWRkKFwiZW5kXCIpO19vMTcuQWRkKFwid2hpbGVcIik7X28xNy5BZGQoXCJmb3JcIik7X28xNy5BZGQoXCJpblwiKTtfbzE3LkFkZChcImFuZFwiKTtfbzE3LkFkZChcIm9yXCIpO19vMTcuQWRkKFwibm90XCIpO19vMTcuQWRkKFwidHJ1ZVwiKTtfbzE3LkFkZChcImZhbHNlXCIpO19vMTcuQWRkKFwicmV0dXJuXCIpO19vMTcuQWRkKFwiY29udGludWVcIik7X28xNy5BZGQoXCJicmVha1wiKTtfbzE3LkFkZChcIm5ld1wiKTtyZXR1cm4gX28xNzt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxzdHJpbmc+IF9pZ25vcmVPcHRpbWl6ZSA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PHN0cmluZz4oKSwoX28xOCk9PntfbzE4LkFkZChcIkZpbGVcIik7X28xOC5BZGQoXCJhYnNcIik7X28xOC5BZGQoXCJhY29zXCIpO19vMTguQWRkKFwiYWN0aXZlX25ldF9jYXJkXCIpO19vMTguQWRkKFwiYWN0aXZlX3VzZXJcIik7X28xOC5BZGQoXCJhaXJjcmFja1wiKTtfbzE4LkFkZChcImFpcm1vblwiKTtfbzE4LkFkZChcImFzaW5cIik7X28xOC5BZGQoXCJhdGFuXCIpO19vMTguQWRkKFwiYml0d2lzZVwiKTtfbzE4LkFkZChcImJzc2lkX25hbWVcIik7X28xOC5BZGQoXCJidWlsZFwiKTtfbzE4LkFkZChcImNlaWxcIik7X28xOC5BZGQoXCJjaGFuZ2VfcGFzc3dvcmRcIik7X28xOC5BZGQoXCJjaGFyXCIpO19vMTguQWRkKFwiY2htb2RcIik7X28xOC5BZGQoXCJjbG9zZV9wcm9ncmFtXCIpO19vMTguQWRkKFwiY29kZVwiKTtfbzE4LkFkZChcImNvbW1hbmRfaW5mb1wiKTtfbzE4LkFkZChcImNvbm5lY3RfZXRoZXJuZXRcIik7X28xOC5BZGQoXCJjb25uZWN0X3NlcnZpY2VcIik7X28xOC5BZGQoXCJjb25uZWN0X3dpZmlcIik7X28xOC5BZGQoXCJjb3B5XCIpO19vMTguQWRkKFwiY29zXCIpO19vMTguQWRkKFwiY3JlYXRlX2ZvbGRlclwiKTtfbzE4LkFkZChcImNyZWF0ZV9ncm91cFwiKTtfbzE4LkFkZChcImNyZWF0ZV91c2VyXCIpO19vMTguQWRkKFwiY3VycmVudF9kYXRlXCIpO19vMTguQWRkKFwiY3VycmVudF9wYXRoXCIpO19vMTguQWRkKFwiZGVjaXBoZXJcIik7X28xOC5BZGQoXCJkZWxldGVcIik7X28xOC5BZGQoXCJkZWxldGVfZ3JvdXBcIik7X28xOC5BZGQoXCJkZWxldGVfdXNlclwiKTtfbzE4LkFkZChcImRldmljZV9wb3J0c1wiKTtfbzE4LkFkZChcImRldmljZXNfbGFuX2lwXCIpO19vMTguQWRkKFwiZHVtcF9saWJcIik7X28xOC5BZGQoXCJlc3NpZF9uYW1lXCIpO19vMTguQWRkKFwiZXhpdFwiKTtfbzE4LkFkZChcImZsb29yXCIpO19vMTguQWRkKFwiZm9ybWF0X2NvbHVtbnNcIik7X28xOC5BZGQoXCJnZXRfZmlsZXNcIik7X28xOC5BZGQoXCJnZXRfZm9sZGVyc1wiKTtfbzE4LkFkZChcImdldF9sYW5faXBcIik7X28xOC5BZGQoXCJnZXRfcG9ydHNcIik7X28xOC5BZGQoXCJnZXRfcm91dGVyXCIpO19vMTguQWRkKFwiZ2V0X3NoZWxsXCIpO19vMTguQWRkKFwiZ2xvYmFsc1wiKTtfbzE4LkFkZChcImdyb3VwXCIpO19vMTguQWRkKFwiZ3JvdXBzXCIpO19vMTguQWRkKFwiaGFzSW5kZXhcIik7X28xOC5BZGQoXCJoYXNfcGVybWlzc2lvblwiKTtfbzE4LkFkZChcImhvc3RfY29tcHV0ZXJcIik7X28xOC5BZGQoXCJpbmNsdWRlX2xpYlwiKTtfbzE4LkFkZChcImluZGV4T2ZcIik7X28xOC5BZGQoXCJpbmRleGVzXCIpO19vMTguQWRkKFwiaXNfYmluYXJ5XCIpO19vMTguQWRkKFwiaXNfY2xvc2VkXCIpO19vMTguQWRkKFwiaXNfZm9sZGVyXCIpO19vMTguQWRkKFwiaXNfbGFuX2lwXCIpO19vMTguQWRkKFwiaXNfbmV0d29ya19hY3RpdmVcIik7X28xOC5BZGQoXCJpc192YWxpZF9pcFwiKTtfbzE4LkFkZChcImpvaW5cIik7X28xOC5BZGQoXCJsYXN0SW5kZXhPZlwiKTtfbzE4LkFkZChcImxhdW5jaFwiKTtfbzE4LkFkZChcImxlblwiKTtfbzE4LkFkZChcImxpYl9uYW1lXCIpO19vMTguQWRkKFwibG9hZFwiKTtfbzE4LkFkZChcImxvY2FsX2lwXCIpO19vMTguQWRkKFwibG9jYWxzXCIpO19vMTguQWRkKFwibG93ZXJcIik7X28xOC5BZGQoXCJtZDVcIik7X28xOC5BZGQoXCJtb3ZlXCIpO19vMTguQWRkKFwibmFtZVwiKTtfbzE4LkFkZChcIm5ldF91c2VcIik7X28xOC5BZGQoXCJuZXR3b3JrX2RldmljZXNcIik7X28xOC5BZGQoXCJuZXR3b3JrX2dhdGV3YXlcIik7X28xOC5BZGQoXCJuc2xvb2t1cFwiKTtfbzE4LkFkZChcIm92ZXJmbG93XCIpO19vMTguQWRkKFwib3duZXJcIik7X28xOC5BZGQoXCJwYXJlbnRcIik7X28xOC5BZGQoXCJwYXJlbnRfcGF0aFwiKTtfbzE4LkFkZChcInBhdGhcIik7X28xOC5BZGQoXCJwZXJtaXNzaW9uc1wiKTtfbzE4LkFkZChcInBpXCIpO19vMTguQWRkKFwicGluZ1wiKTtfbzE4LkFkZChcInBpbmdfcG9ydFwiKTtfbzE4LkFkZChcInBvcFwiKTtfbzE4LkFkZChcInBvcnRfaW5mb1wiKTtfbzE4LkFkZChcInBvcnRfbnVtYmVyXCIpO19vMTguQWRkKFwicHJpbnRcIik7X28xOC5BZGQoXCJwcm9ncmFtX3BhdGhcIik7X28xOC5BZGQoXCJwdWJsaWNfaXBcIik7X28xOC5BZGQoXCJwdWxsXCIpO19vMTguQWRkKFwicHVzaFwiKTtfbzE4LkFkZChcInB1dFwiKTtfbzE4LkFkZChcInJhbmdlXCIpO19vMTguQWRkKFwicmVtb3ZlXCIpO19vMTguQWRkKFwicmVuYW1lXCIpO19vMTguQWRkKFwicmVwbGFjZVwiKTtfbzE4LkFkZChcInJldmVyc2VcIik7X28xOC5BZGQoXCJybmRcIik7X28xOC5BZGQoXCJyb3VuZFwiKTtfbzE4LkFkZChcInNjYW5cIik7X28xOC5BZGQoXCJzY2FuX2FkZHJlc3NcIik7X28xOC5BZGQoXCJzY3BcIik7X28xOC5BZGQoXCJzZXRfY29udGVudFwiKTtfbzE4LkFkZChcInNldF9ncm91cFwiKTtfbzE4LkFkZChcInNob3dfcHJvY3NcIik7X28xOC5BZGQoXCJzaHVmZmxlXCIpO19vMTguQWRkKFwic2lnblwiKTtfbzE4LkFkZChcInNpblwiKTtfbzE4LkFkZChcInNpemVcIik7X28xOC5BZGQoXCJzbGljZVwiKTtfbzE4LkFkZChcInNtdHBfdXNlcl9saXN0XCIpO19vMTguQWRkKFwic29ydFwiKTtfbzE4LkFkZChcInNwbGl0XCIpO19vMTguQWRkKFwic3FydFwiKTtfbzE4LkFkZChcInN0YXJ0X3Rlcm1pbmFsXCIpO19vMTguQWRkKFwic3RyXCIpO19vMTguQWRkKFwic3VtXCIpO19vMTguQWRkKFwidGFuXCIpO19vMTguQWRkKFwidG9faW50XCIpO19vMTguQWRkKFwidG91Y2hcIik7X28xOC5BZGQoXCJ0cmltXCIpO19vMTguQWRkKFwidHlwZW9mXCIpO19vMTguQWRkKFwidXBwZXJcIik7X28xOC5BZGQoXCJ1c2VkX3BvcnRzXCIpO19vMTguQWRkKFwidXNlcl9iYW5rX251bWJlclwiKTtfbzE4LkFkZChcInVzZXJfaW5wdXRcIik7X28xOC5BZGQoXCJ1c2VyX21haWxfYWRkcmVzc1wiKTtfbzE4LkFkZChcInZhbFwiKTtfbzE4LkFkZChcInZhbHVlc1wiKTtfbzE4LkFkZChcInZlcnNpb25cIik7X28xOC5BZGQoXCJ3aG9pc1wiKTtfbzE4LkFkZChcIndpZmlfbmV0d29ya3NcIik7X28xOC5BZGQoXCJwYXJhbXNcIik7X28xOC5BZGQoXCJjbGVhcl9zY3JlZW5cIik7X28xOC5BZGQoXCJ3YWl0XCIpO19vMTguQWRkKFwic2VsZlwiKTtfbzE4LkFkZChcIm51bGxcIik7X28xOC5BZGQoXCJmdW5jdGlvblwiKTtfbzE4LkFkZChcImNvbnRlbnRcIik7X28xOC5BZGQoXCJsYW5faXBcIik7X28xOC5BZGQoXCJnZXRfY29udGVudFwiKTtfbzE4LkFkZChcImFpcmVwbGF5XCIpO19vMTguQWRkKFwiZmlyZXdhbGxfcnVsZXNcIik7X28xOC5BZGQoXCJrZXJuZWxfdmVyc2lvblwiKTtfbzE4LkFkZChcImtlcm5lbF92ZXJzaW9uXCIpO19vMTguQWRkKFwicnNoZWxsX3NlcnZlclwiKTtfbzE4LkFkZChcInJzaGVsbF9zZXJ2ZXJcIik7X28xOC5BZGQoXCJfX2lzYVwiKTtfbzE4LkFkZChcImlmXCIpO19vMTguQWRkKFwidGhlblwiKTtfbzE4LkFkZChcImVsc2VcIik7X28xOC5BZGQoXCJlbmRcIik7X28xOC5BZGQoXCJ3aGlsZVwiKTtfbzE4LkFkZChcImZvclwiKTtfbzE4LkFkZChcImluXCIpO19vMTguQWRkKFwiYW5kXCIpO19vMTguQWRkKFwib3JcIik7X28xOC5BZGQoXCJub3RcIik7X28xOC5BZGQoXCJ0cnVlXCIpO19vMTguQWRkKFwiZmFsc2VcIik7X28xOC5BZGQoXCJudWxsXCIpO19vMTguQWRkKFwicmV0dXJuXCIpO19vMTguQWRkKFwiY29udGludWVcIik7X28xOC5BZGQoXCJicmVha1wiKTtfbzE4LkFkZChcImZ1bmN0aW9uXCIpO19vMTguQWRkKFwibmV3XCIpO19vMTguQWRkKFwic2VsZlwiKTtyZXR1cm4gX28xODt9KTtcclxuXHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBEaWN0aW9uYXJ5PHN0cmluZywgc3RyaW5nPiBfb3BlcmF0b3JzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBzdHJpbmc+KCksKF9vMTkpPT57X28xOS5BZGQoXCI8PFwiLEBcImJpdHdpc2UoXCJcIjw8XCJcIiwkYSwkYilcIik7X28xOS5BZGQoXCI+PlwiLEBcImJpdHdpc2UoXCJcIj4+XCJcIiwkYSwkYilcIik7X28xOS5BZGQoXCI+Pj5cIixAXCJiaXR3aXNlKFwiXCI+Pj5cIlwiLCRhLCRiKVwiKTtfbzE5LkFkZChcIl5eXCIsQFwiYml0d2lzZShcIlwiXlwiXCIsJGEsJGIpXCIpO19vMTkuQWRkKFwiJlwiLEBcImJpdHdpc2UoXCJcIiZcIlwiLCRhLCRiKVwiKTtfbzE5LkFkZChcInxcIixAXCJiaXR3aXNlKFwiXCJ8XCJcIiwkYSwkYilcIik7X28xOS5BZGQoXCJ+XCIsQFwiYml0d2lzZShcIlwiflwiXCIsJGIpXCIpO19vMTkuQWRkKFwiKytcIixAXCIkYT0kYSsxXCIpO19vMTkuQWRkKFwiLS1cIixAXCIkYT0kYS0xXCIpO19vMTkuQWRkKFwiKz1cIixAXCIkYT0kYSskYlwiKTtfbzE5LkFkZChcIi09XCIsQFwiJGE9JGEtJGJcIik7X28xOS5BZGQoXCIqPVwiLEBcIiRhPSRhKiRiXCIpO19vMTkuQWRkKFwiLz1cIixAXCIkYT0kYS8kYlwiKTtfbzE5LkFkZChcIiU9XCIsQFwiJGE9JGElJGJcIik7X28xOS5BZGQoXCI9PlwiLEBcImZ1bmN0aW9uJGFcIik7cmV0dXJuIF9vMTk7fSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEVUZW1wbGF0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTm9uZSxcclxuICAgICAgICAgICAgSXRlcmF0aW9uSW5kZXgsXHJcbiAgICAgICAgICAgIElnbm9yZU9wdGltaXphdGlvbixcclxuICAgICAgICAgICAgVGVybmFyeU9wZXJhdG9yLFxyXG4gICAgICAgICAgICBDb21tZW50LFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRGljdGlvbmFyeTxzdHJpbmcsIEVUZW1wbGF0ZT4gX3RlbXBsYXRlcyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgRVRlbXBsYXRlPigpLChfbzIwKT0+e19vMjAuQWRkKEBcIihfXykoLiopKF9pZHgpXCIsRVRlbXBsYXRlLkl0ZXJhdGlvbkluZGV4KTtfbzIwLkFkZChAXCIoXFxcXCkoXFxTKilcIixFVGVtcGxhdGUuSWdub3JlT3B0aW1pemF0aW9uKTtfbzIwLkFkZChAXCJeKFxcL1xcLykoLiopJFwiLEVUZW1wbGF0ZS5Db21tZW50KTtyZXR1cm4gX28yMDt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgYm9vbCBJc1RlbXBsYXRlKHN0cmluZyBpbnB1dCwgb3V0IHN0cmluZyByZWdleCwgb3V0IE1hdGNoQ29sbGVjdGlvbiBtYXRjaGVzLCBvdXQgRVRlbXBsYXRlIHRlbXBsYXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAoS2V5VmFsdWVQYWlyPHN0cmluZywgRVRlbXBsYXRlPiBwYWlyIGluIF90ZW1wbGF0ZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBSZWdleC5NYXRjaGVzKGlucHV0LCBwYWlyLktleSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcy5Db3VudCAhPSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4ID0gcGFpci5LZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgPSBwYWlyLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtYXRjaGVzID0gbnVsbDtcclxuICAgICAgICAgICAgcmVnZXggPSBudWxsO1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IEVUZW1wbGF0ZS5Ob25lO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIENvbXBpbGUoc3RyaW5nIGNvZGUsIGJvb2wgb3B0aW1pemUgPSBmYWxzZSwgU2V0dGluZ3Mgc2V0dGluZ3MgPSBTZXR0aW5ncy5Ob25lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRva2VuaXplKGNvZGUsIHNldHRpbmdzKS5Db21waWxlKG9wdGltaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBUcnlDb21waWxlKHN0cmluZyBjb2RlLCBvdXQgc3RyaW5nIGNvbXBpbGVkQ29kZSwgYm9vbCBvcHRpbWl6ZSA9IGZhbHNlLCBTZXR0aW5ncyBzZXR0aW5ncyA9IFNldHRpbmdzLk5vbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29tcGlsZWRDb2RlID0gQ29tcGlsZShjb2RlLCBvcHRpbWl6ZSwgc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb21waWxlZENvZGUgPSBlLk1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIENvbnRleHQgVG9rZW5pemUoc3RyaW5nIHBsYWluQ29kZSwgU2V0dGluZ3Mgc2V0dGluZ3MgPSBTZXR0aW5ncy5Ob25lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udGV4dCBjb250ZXh0ID0gbmV3IENvbnRleHQoc2V0dGluZ3MpIHsgUGxhaW5JbnB1dCA9IG5ldyBRdWV1ZTxjaGFyPihwbGFpbkNvZGUpIH07XHJcblxyXG4gICAgICAgICAgICBUb2tlbiB0b2tlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHdoaWxlICgodG9rZW4gPSBHZXROZXh0VG9rZW4oY29udGV4dCkpICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuQWRkVG9rZW4odG9rZW4pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoKGNvbnRleHQuU2V0dGluZ3MgJiBTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpICE9IDAgJiYgdG9rZW4uUHJldiAhPSBudWxsICYmIHRva2VuLlByZXYuVmFsdWUgPT0gXCIuXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0Lklnbm9yZU9wdGltaXplKHRva2VuLlZhbHVlKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY3VzdG9tSWdub3JlT3B0aW1pemUuQWRkKHRva2VuLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZW1vdmVTcGFjZXMoUXVldWU8Y2hhcj4gcXVldWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3aGlsZSAocXVldWUuQ291bnQgIT0gMCAmJiBjaGFyLklzV2hpdGVTcGFjZShxdWV1ZS5QZWVrKCkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBxdWV1ZS5EZXF1ZXVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEZ1bmM8Q29udGV4dCwgYm9vbD4gR2V0U2VwYXJhdGlvblNlbGVjdG9yKENvbnRleHQgY29udGV4dCwgb3V0IFRva2VuIHRva2VuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJy8nICYmIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPihjb250ZXh0LlBsYWluSW5wdXQsMSkuRmlyc3RPckRlZmF1bHQoKSA9PSAnLycpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlRlbXBsYXRlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PiAhSXNFbmRPZkxpbmUoeCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0Lk1hcEFjdGl2ZS5QZWVrKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlNlcGFyYXRvcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICcsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKCFjb250ZXh0LlNldHRpbmdzLkhhc0ZsYWcoU2V0dGluZ3MuSWdub3JlTWFwVmFyaWFibGVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJzonOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geCA9PiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICdcXFxcJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uVGVtcGxhdGUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+ICFfdG9rZW5CcmFja2V0cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuU2VwYXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICFfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpICsgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KHguUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoX3Rva2VuSW5jbHVkZS5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpICtcclxuU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpLlRvU3RyaW5nKCkpKSAvL2luY2x1ZGVcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uSW5jbHVkZSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdG9rZW5FbmRJbmNsdWRlLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL29wZXJhdG9yXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLk9wZXJhdG9yKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PiBfdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF90b2tlbkJyYWNrZXRzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL2JyYWNrZXRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLkJyYWNrZXQoKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICcoJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnKSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1snOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goKCEoY29udGV4dC5MYXN0VG9rZW4gPT0gbnVsbCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gaXMgVG9rZW4uT3BlcmF0b3IpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbnRleHQuU2V0dGluZ3MgJiBTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICddJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAneyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTWFwQWN0aXZlLlB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaCgoY29udGV4dC5TZXR0aW5ncyAmIFNldHRpbmdzLklnbm9yZU1hcFZhcmlhYmxlcykgPT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ30nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lk1hcEFjdGl2ZS5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF90b2tlblNlcGFyYXRvcnMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSkpIC8vc2VwYXJhdG9yc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5TZXBhcmF0b3IoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoX3Rva2VuU3RyaW5ncy5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpKSkgLy9zdHJpbmdzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdG9rZW4uT3B0aW1pemFibGUgPSBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBlZWsoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICckJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5DdXN0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuLk9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdldFN0cmluZyh4KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB4ID0+ICFfdG9rZW5CcmFja2V0cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuU2VwYXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuU3RyaW5ncy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpICsgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KHguUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBHZXRTdHJpbmcoQ29udGV4dCBjb250ZXh0KVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgIT0gJ1wiJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCAhPSAwKVxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpKTtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA+IDAgJiYgY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnXCInKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCkpO1xyXG4gICAgICAgICAgICAgICAgR2V0U3RyaW5nKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuUmVtb3ZlKDAsIDEpO1xyXG4gICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuUmVtb3ZlKGNvbnRleHQuU3RyaW5nQnVpbGRlci5MZW5ndGggLSAxLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVG9rZW4gR2V0TmV4dFRva2VuKENvbnRleHQgY29udGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5DbGVhcigpO1xyXG4gICAgICAgICAgICBTdHJpbmdCdWlsZGVyIHNiID0gY29udGV4dC5TdHJpbmdCdWlsZGVyO1xyXG4gICAgICAgICAgICBSZW1vdmVTcGFjZXMoY29udGV4dC5QbGFpbklucHV0KTtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA9PSAwKSByZXR1cm4gbnVsbDtcclxuR3JleUhhY2tDb21waWxlci5Ub2tlbiB0O1xuICAgICAgICAgICAgRnVuYzxDb250ZXh0LCBib29sPiBzZXBhcmF0b3IgPSBHZXRTZXBhcmF0aW9uU2VsZWN0b3IoY29udGV4dCwgb3V0IHQpO1xyXG4gICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzYi5BcHBlbmQoY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKSk7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA+IDAgJiYgc2VwYXJhdG9yKGNvbnRleHQpKTtcclxuXHJcbiAgICAgICAgICAgIHN0cmluZyB0bXBfdmFsdWUgPSBzYi5Ub1N0cmluZygpO1xyXG5zdHJpbmcgcmVnZXg7XG5NYXRjaENvbGxlY3Rpb24gbWF0Y2hlcztcbkdyZXlIYWNrQ29tcGlsZXIuRVRlbXBsYXRlIHRlbXBsYXRlO1xuICAgICAgICAgICAgaWYgKCEodCBpcyBUb2tlbi5TdHJpbmcpICYmIElzVGVtcGxhdGUodG1wX3ZhbHVlLCBvdXQgcmVnZXgsIG91dCBtYXRjaGVzLCBvdXQgdGVtcGxhdGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ID0gbmV3IFRva2VuLlRlbXBsYXRlKHRlbXBsYXRlLCBtYXRjaGVzLCByZWdleCwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoX2tleXdvcmRzLkNvbnRhaW5zKHRtcF92YWx1ZSkgJiYgISh0IGlzIFRva2VuLlN0cmluZykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHQgPSBuZXcgVG9rZW4uS2V5d29yZCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodC5PcHRpbWl6YWJsZSAmJiBjb250ZXh0Lklnbm9yZU9wdGltaXplKHQuVmFsdWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0Lk9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHQuVmFsdWUgPSB0bXBfdmFsdWU7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMCAmJiBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICcgJylcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcblxyXG4gICAgICAgICAgICB0LkVuZFN0YXRlbWVudCA9IElzRW5kT2ZMaW5lKGNvbnRleHQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgIH1cclxucHJpdmF0ZSBzdGF0aWMgYm9vbCBJc0VuZE9mTGluZShDb250ZXh0IGNvbnRleHQpXHJcbntcclxuICAgIHJldHVybiBjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPT0gMCB8fCBfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSArIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPihjb250ZXh0LlBsYWluSW5wdXQsMSkuRmlyc3RPckRlZmF1bHQoKS5Ub1N0cmluZygpKSB8fCBfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSk7XHJcbn0gICAgfVxyXG59XHJcblxyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgVG9rZW4gUHJldiB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUb2tlbiBOZXh0IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIHZpcnR1YWwgc3RyaW5nIFZhbHVlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIHZpcnR1YWwgYm9vbCBDdXN0b20geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBPcHRpbWl6YWJsZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIEVuZFN0YXRlbWVudCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgdmlydHVhbCBUb2tlbiBPcHRpbWl6ZShDb250ZXh0IGNvbnRleHQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChPcHRpbWl6YWJsZSAmJiAvL2ZsYWcgZnJvbSB0b2tlbml6YXRpb24gIFxyXG4gICAgICAgICAgICAgICAgICAgIFZhbHVlLkxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAhY2hhci5Jc0RpZ2l0KFZhbHVlWzBdKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFjb250ZXh0Lklnbm9yZU9wdGltaXplKFZhbHVlKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IGNvbnRleHQubmFtZVByb3ZpZGVyLkdldFJlcGxhY2UoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyB2aXJ0dWFsIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LlN0cmluZ0J1aWxkZXIuTGVuZ3RoICE9IDAgJiYgUHJldiAhPSBudWxsICYmICFjaGFyLklzV2hpdGVTcGFjZShjb250ZXh0LlN0cmluZ0J1aWxkZXJbY29udGV4dC5TdHJpbmdCdWlsZGVyLkxlbmd0aCAtIDFdKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3Rva2VuU3BhY2VzW1ByZXYuR2V0VHlwZSgpXVtHZXRUeXBlKCldKSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoRW5kU3RhdGVtZW50ICYmIE5leHQgIT0gbnVsbCAmJiAhZm9yY2UpIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoX3NlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJpdmF0ZSBib29sIENvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKHN0cmluZyBzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocy5MZW5ndGggPiBWYWx1ZS5MZW5ndGgpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWVbaV0gIT0gc1tpXSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgS2V5d29yZCA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBLZXl3b3JkKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBPcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgT3BlcmF0b3IgOiBWYXJpYWJsZVxyXG4gICAgICAgICAgICB7XHJcbnB1YmxpYyBib29sIE5lZWRzTGVmdFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl9vcGVyYXRvcnMuQ29udGFpbnNLZXkoVmFsdWUpICYmIF9vcGVyYXRvcnNbVmFsdWVdLkNvbnRhaW5zKFwiJGFcIik7XHJcbiAgICB9XHJcbn1wdWJsaWMgYm9vbCBOZWVkc1JpZ2h0XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX29wZXJhdG9ycy5Db250YWluc0tleShWYWx1ZSkgJiYgX29wZXJhdG9yc1tWYWx1ZV0uQ29udGFpbnMoXCIkYlwiKTtcclxuICAgIH1cclxufSAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBDdXN0b21cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXQgeyByZXR1cm4gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl9vcGVyYXRvcnMuQ29udGFpbnNLZXkoVmFsdWUpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0IHsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgT3BlcmF0b3IoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ3VzdG9tKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHMgPSBfb3BlcmF0b3JzW1ZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5lZWRzTGVmdCAmJiBQcmV2ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuQnJhY2tldCBiOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGIgPSBQcmV2IGFzIEJyYWNrZXQpICE9IG51bGwmJiBiLklzT3BlbmluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJpbnZhbGlkIHN5bnRheCBmb3IgdGVtcGxhdGUgezB9XCIsVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYuQ29tcGlsZShjb250ZXh0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgPSBzLlJlcGxhY2UoXCIkYVwiLCBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlBvcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIixQcmV2KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8VG9rZW4+KFwia2V5MVwiKS5QcmV2OihUb2tlbiludWxsKSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYgPSBQcmV2LlByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5OZXh0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlJvb3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZWVkc1JpZ2h0ICYmIE5leHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyA9IHMuUmVwbGFjZShcIiRiXCIsIGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSBOZXh0LkVuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTJcIixOZXh0KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8VG9rZW4+KFwia2V5MlwiKS5OZXh0OihUb2tlbiludWxsKSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBOZXh0Lk5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5QcmV2ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlID0gcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJPcGVyYXRvcjogezB9XCIsYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIFZhcmlhYmxlIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbkJyYWNrZXQgYnI7ICAgICAgICAgICAgICAgICAgICBpZiAoKGJyID0gdGhpcyBhcyBCcmFja2V0KSAhPSBudWxsJiYgIWJyLkN1c3RvbSAmJiAoYnIuVmFsdWUuTGVuZ3RoID09IDAgfHwgYnIuVmFsdWVbMF0gIT0gJ3snKSkgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChOZXh0ICE9IG51bGwgJiYgIUdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5fdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxjaGFyPihWYWx1ZSkpICYmIChOZXh0LlZhbHVlID09IFwiLlwiIHx8IE5leHQuVmFsdWUgPT0gXCIoXCIgfHwgTmV4dC5WYWx1ZSA9PSBcIltcIikpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKE5leHQgIT0gbnVsbCAmJiAhR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl90b2tlbk9wZXJhdG9ycy5Db250YWlucyhTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PGNoYXI+KFZhbHVlKSkgJiYgKE5leHQuVmFsdWUgPT0gXCIuXCIgfHwgTmV4dC5WYWx1ZSA9PSBcIihcIiB8fCBOZXh0LlZhbHVlID09IFwiW1wiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5leHQuVmFsdWUgIT0gXCIuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dCA9IE5leHQuTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gTmV4dC5OZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkzXCIsTmV4dCkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFRva2VuPihcImtleTNcIikuQ29tcGlsZShjb250ZXh0LCB0cnVlKTooVG9rZW4pbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTRcIixOZXh0KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8VG9rZW4+KFwia2V5NFwiKS5OZXh0OihUb2tlbiludWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LlByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlID0gY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5PcGVyYXRvciBvO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChOZXh0ICE9IG51bGwgJiYgKG8gPSBOZXh0IGFzIE9wZXJhdG9yKSAhPSBudWxsJiYgby5OZWVkc0xlZnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvb2wgYiA9IEVuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZFN0YXRlbWVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBiYXNlLkNvbXBpbGUoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSBiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuT3BlcmF0b3Igb287XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYgIT0gbnVsbCAmJiAob28gPSBQcmV2IGFzIE9wZXJhdG9yKSAhPSBudWxsJiYgb28uTmVlZHNSaWdodClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBiID0gRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IGJhc2UuQ29tcGlsZShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZFN0YXRlbWVudCA9IGI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiVmFyaWFibGU6IHswfVwiLGJhc2UuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBTdHJpbmcgOiBUb2tlblxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEN1c3RvbSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoXCIoXFxcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGRlcHRoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGxhc3QgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFZhbHVlLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSArIDEgPCBWYWx1ZS5MZW5ndGggJiYgVmFsdWVbaV0gPT0gJ1xcXFwnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFZhbHVlW2kgKyAxXSA9PSAneycgfHwgVmFsdWVbaSArIDFdID09ICd9JykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWVbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlW2ldID09ICd7JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVwdGggPT0gMCkgbGFzdCA9IGkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoVmFsdWVbaV0gPT0gJ30nICYmIChpID09IDAgfHwgVmFsdWVbaSAtIDFdICE9ICdcXFxcJykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGgtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVwdGggPCAwKSB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJzdHJpbmcgZm9ybWF0ICh7MH0pIGlzIG5vdCB2YWxpZFwiLFZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiXFxcIisoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250ZXh0IGlubmVyQ29kZUNvbnRleHQgPSBUb2tlbml6ZShWYWx1ZS5TdWJzdHJpbmcobGFzdCwgaSAtIGxhc3QpLlJlcGxhY2UoQFwiXCJcIlwiXCJcIiwgQFwiXCJcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyQ29kZUNvbnRleHQubmFtZVByb3ZpZGVyID0gY29udGV4dC5uYW1lUHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBjb21waWxlZCA9IGlubmVyQ29kZUNvbnRleHQuQ29tcGlsZShjb250ZXh0Lm9wdGltaXplRW5hYmxlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29tcGlsZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiKStcXFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRlcHRoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChWYWx1ZVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChcIlxcXCIpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZCgnXCInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChFbmRTdGF0ZW1lbnQpIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoX3NlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJTdHJpbmc6IHswfXsxfVwiLChDdXN0b20gPyBcIiRcIiA6IFwiXCIpLGJhc2UuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIEJyYWNrZXQgOiBWYXJpYWJsZVxyXG4gICAgICAgICAgICB7XHJcbnB1YmxpYyBib29sIElzT3BlbmluZ1xyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVmFsdWUgPT0gXCIoXCIgfHwgVmFsdWUgPT0gXCJbXCIgfHwgVmFsdWUgPT0gXCJ7XCI7XHJcbiAgICB9XHJcbn1wdWJsaWMgYm9vbCBJc0Nsb3Npbmdcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFZhbHVlID09IFwiKVwiIHx8IFZhbHVlID09IFwiXVwiIHx8IFZhbHVlID09IFwifVwiO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIERpY3Rpb25hcnk8Y2hhciwgY2hhcj4gX29wZW5pbmdUb0Nsb3NpbmcgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxjaGFyLCBjaGFyPigpLChfbzEpPT57X28xLkFkZCgnKCcsJyknKTtfbzEuQWRkKCdbJywnXScpO19vMS5BZGQoJ3snLCd9Jyk7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBCcmFja2V0KClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBPcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHByaXZhdGUgVG9rZW4gQ29tcGlsZUluc2lkZShDb250ZXh0IGNvbnRleHQsIGJvb2wgaW5jbHVkZUxhc3RCcmFja2V0ID0gdHJ1ZSwgYm9vbCBjdXN0b21Cb2R5ID0gZmFsc2UsIHN0cmluZyBwb3N0Zml4ID0gXCJcIilcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBiID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9rZW4gbGFzdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9rZW4gbm9kZSA9IE5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VzdG9tQm9keSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYiA9IG5vZGUuRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5FbmRTdGF0ZW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5CcmFja2V0IHRiOyAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgZm9yIGxhc3QgYnJhY2tldCBiZWZvcmUgY29tcGlsaW5nIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW5jbHVkZUxhc3RCcmFja2V0ICYmICh0YiA9IG5vZGUgYXMgQnJhY2tldCkgIT0gbnVsbCYmIHRiLklzQ2xvc2luZyAmJlxyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkxhc3Q8Y2hhcj4oICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGIuVmFsdWUpID09IF9vcGVuaW5nVG9DbG9zaW5nW1N5c3RlbS5MaW5xLkVudW1lcmFibGUuTGFzdDxjaGFyPihWYWx1ZSldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGIuRW5kU3RhdGVtZW50ICYmIGxhc3QgIT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWxhc3QuRW5kU3RhdGVtZW50ICYmICFsYXN0LlZhbHVlLkNvbnRhaW5zKF9zZXBhcmF0b3IpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoX3NlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRva2VuIHRtcCA9IG5vZGUuQ29tcGlsZShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXN0b21Cb2R5KSBub2RlLkVuZFN0YXRlbWVudCA9IGI7XHJcbkJyYWNrZXQgYnI7ICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVja2luZyBmb3IgbGFzdCBicmFja2V0IGFmdGVyIGNvbXBpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChiciA9IG5vZGUgYXMgQnJhY2tldCkgIT0gbnVsbCYmIGJyLklzQ2xvc2luZykgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3QgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gdG1wLk5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKHBvc3RmaXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFZhbHVlID0gY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ3VzdG9tKSByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSXNPcGVuaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG9rZW4gbm9kZSA9IE5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcigpKTtcclxuQnJhY2tldCBicmE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZSA9PSBcIntcIiAmJiAoKChicmEgPSBQcmV2IGFzIEJyYWNrZXQpICE9IG51bGwmJiBicmEuQ3VzdG9tKSB8fCBQcmV2LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiZnVuY3Rpb25cIikpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUVuZFN0YXRlbWVudCkgRW5kU3RhdGVtZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRva2VuIHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgdHlwZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUHJldi5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcImZ1bmN0aW9uXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcImZ1bmN0aW9uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA9IFByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA9IFByZXYuUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGJvb2wpKHQhPW51bGw/dC5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcImlmXCIpOihib29sPyludWxsKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJpZlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoXCIgdGhlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKChib29sKSh0IT1udWxsP3QuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoXCJmb3JcIik6KGJvb2w/KW51bGwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcImZvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoKGJvb2wpKHQhPW51bGw/dC5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcIndoaWxlXCIpOihib29sPyludWxsKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJ3aGlsZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0LkVuZFN0YXRlbWVudCB8fCBFbmRTdGF0ZW1lbnQpIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoX3NlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gQ29tcGlsZUluc2lkZShjb250ZXh0LCBmYWxzZSwgdHJ1ZSwgc3RyaW5nLkZvcm1hdChcImVuZCB7MH1cIix0eXBlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICBLZXl3b3JkIGs7XHJcbiAgICBpZiAoKGsgPSBQcmV2IGFzIEtleXdvcmQpICE9IG51bGwmJiBrLlZhbHVlID09IFwiZm9yXCIpXHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZCgnICcpO1xyXG4gICAgICAgIG5vZGUgPSBDb21waWxlSW5zaWRlKGNvbnRleHQsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlKTtcclxuICAgICAgICBub2RlID0gQ29tcGlsZUluc2lkZShjb250ZXh0KTtcclxuICAgIH1cclxufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gbm9kZSE9bnVsbD9ub2RlLk5leHQ6KFRva2VuKW51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlICE9IG51bGwpIEVuZFN0YXRlbWVudCA9IG5vZGUuRW5kU3RhdGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Sb290VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5OZXh0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCB8fCBub2RlLk5leHQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5OZXh0LlByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdXN0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIkJyYWNrZXQ6IHswfVwiLFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIFNlcGFyYXRvciA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBTZXBhcmF0b3IoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIlNlcGFyYXRvcjogezB9XCIsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgSW5jbHVkZSA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBJbmNsdWRlKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBPcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiSW5jbHVkZTogezB9XCIsYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIFRlbXBsYXRlIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBWYWx1ZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKF92YWx1ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc3RyaW5nIF92YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgRVRlbXBsYXRlIFRlbXBsYXRlVHlwZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgc3RyaW5nIFJlZ2V4U3RyaW5nIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBNYXRjaENvbGxlY3Rpb24gTWF0Y2hlcyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gT3B0aW1pemUoQ29udGV4dCBjb250ZXh0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoVGVtcGxhdGVUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuRVRlbXBsYXRlLkl0ZXJhdGlvbkluZGV4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYgIT0gbnVsbCAmJiBQcmV2LlZhbHVlID09IFwiLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLk9wdGltaXplKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyB2YXJfbmFtZSA9IE1hdGNoZXNbMF0uR3JvdXBzWzJdLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPcldoaXRlU3BhY2UodmFyX25hbWUpIHx8IGNvbnRleHQuSWdub3JlT3B0aW1pemUodmFyX25hbWUpKSByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9IFJlZ2V4LlJlcGxhY2UoVmFsdWUsIFJlZ2V4U3RyaW5nLCBzdHJpbmcuRm9ybWF0KFwiJDF7MH0kM1wiLGNvbnRleHQubmFtZVByb3ZpZGVyLkdldFJlcGxhY2UodmFyX25hbWUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuRVRlbXBsYXRlLklnbm9yZU9wdGltaXphdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKFRlbXBsYXRlVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLkVUZW1wbGF0ZS5Db21tZW50OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjb250ZXh0LlNldHRpbmdzICYgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLlNldHRpbmdzLlJlbW92ZUNvbW1lbnRzKSAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChQcmV2ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2Lk5leHQgPSBOZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIVByZXYuRW5kU3RhdGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2LkVuZFN0YXRlbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKF9zZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUm9vdFRva2VuID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZXh0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LlByZXYgPSBQcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IFByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGJvb2wgSXNWYWx1ZVN0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlLkxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVmFsdWVbMF0gPT0gJ1wiJyAmJiBWYWx1ZVtWYWx1ZS5MZW5ndGggLSAxXSA9PSAnXCInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBUZW1wbGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIFRlbXBsYXRlKEVUZW1wbGF0ZSB0ZW1wbGF0ZSwgTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXMsIHN0cmluZyByZWdleCwgQ29udGV4dCBjb250ZXh0KSA6IGJhc2UoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRlbXBsYXRlVHlwZSA9IHRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIE1hdGNoZXMgPSBtYXRjaGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlZ2V4U3RyaW5nID0gcmVnZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGVtcGxhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuSWdub3JlT3B0aW1pemF0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbHVlID0gTWF0Y2hlc1swXS5Hcm91cHNbMl0uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNWYWx1ZVN0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9IF92YWx1ZS5TdWJzdHJpbmcoMSwgX3ZhbHVlLkxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZShfdmFsdWUpKSBjb250ZXh0LmN1c3RvbUlnbm9yZU9wdGltaXplLkFkZChfdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9ICdcIicgKyBfdmFsdWUgKyAnXCInO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZShNYXRjaGVzWzBdLkdyb3Vwc1syXS5WYWx1ZSkpIGNvbnRleHQuY3VzdG9tSWdub3JlT3B0aW1pemUuQWRkKE1hdGNoZXNbMF0uR3JvdXBzWzJdLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cbiAgICAgICAgXG5wcml2YXRlIGJvb2wgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX09wdGltaXphYmxlPXRydWU7fVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgY2xhc3MgVmFyaWFibGVOYW1lUHJvdmlkZXJcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIERpY3Rpb25hcnk8c3RyaW5nLCBzdHJpbmc+IF9yZXBsYWNlID0gbmV3IERpY3Rpb25hcnk8c3RyaW5nLCBzdHJpbmc+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgX3N0YXRlO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9jaGFycyA9IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIE5leHQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgICAgIGludCBpbmRleCA9IF9zdGF0ZTtcclxuXHJcbiAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBpID0gaW5kZXggJSBfY2hhcnMuTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgY2hhciBjID0gX2NoYXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgc2IuQXBwZW5kKGMpO1xyXG4gICAgICAgICAgICAgICAgaW5kZXggLz0gX2NoYXJzLkxlbmd0aDtcclxuICAgICAgICAgICAgfSB3aGlsZSAoaW5kZXggPiAwKTtcclxuXHJcbiAgICAgICAgICAgIF9zdGF0ZSsrO1xyXG4gICAgICAgICAgICByZXR1cm4gc2IuVG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIERlZmluZWQoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX3JlcGxhY2UuQ29udGFpbnNLZXkobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0UmVwbGFjZShzdHJpbmcgb3JpZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghX3JlcGxhY2UuQ29udGFpbnNLZXkob3JpZykpXHJcbiAgICAgICAgICAgICAgICBfcmVwbGFjZVtvcmlnXSA9IE5leHQoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBfcmVwbGFjZVtvcmlnXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0KfQo=

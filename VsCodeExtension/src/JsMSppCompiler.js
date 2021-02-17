/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2021
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("JsMSppCompiler", function ($asm, globals) {
    "use strict";

    Bridge.define("GreyHackTools.Debugger.MD5", {
        statics: {
            fields: {
                s: null,
                K: null
            },
            ctors: {
                init: function () {
                    this.s = System.Array.init([7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21], System.Int32);
                    this.K = System.Array.init([3614090360, 3905402710, 606105819, 3250441966, 4118548399, 1200080426, 2821735955, 4249261313, 1770035416, 2336552879, 4294925233, 2304563134, 1804603682, 4254626195, 2792965006, 1236535329, 4129170786, 3225465664, 643717713, 3921069994, 3593408605, 38016083, 3634488961, 3889429448, 568446438, 3275163606, 4107603335, 1163531501, 2850285829, 4243563512, 1735328473, 2368359562, 4294588738, 2272392833, 1839030562, 4259657740, 2763975236, 1272893353, 4139469664, 3200236656, 681279174, 3936430074, 3572445317, 76029189, 3654602809, 3873151461, 530742520, 3299628645, 4096336452, 1126891415, 2878612391, 4237533241, 1700485571, 2399980690, 4293915773, 2240044497, 1873313359, 4264355552, 2734768916, 1309151649, 4149444226, 3174756917, 718787259, 3951481745], System.UInt32);
                }
            },
            methods: {
                leftRotate: function (x, c) {
                    return (((((x << c) >>> 0)) | (x >>> (((32 - c) | 0)))) >>> 0);
                },
                Calculate: function (input) {
                    var a0 = 1732584193;
                    var b0 = 4023233417;
                    var c0 = 2562383102;
                    var d0 = 271733878;

                    var addLength = (((56 - ((((input.length + 1) | 0)) % 64)) | 0)) % 64;
                    var processedInput = System.Array.init(((((((input.length + 1) | 0) + addLength) | 0) + 8) | 0), 0, System.Byte);
                    System.Array.copy(input, 0, processedInput, 0, input.length);
                    processedInput[System.Array.index(input.length, processedInput)] = 128;

                    var length = System.BitConverter.getBytes$4(Bridge.Int.mul(input.length, 8));
                    System.Array.copy(length, 0, processedInput, ((processedInput.length - 8) | 0), 4);

                    for (var i = 0; i < ((Bridge.Int.div(processedInput.length, 64)) | 0); i = (i + 1) | 0) {
                        var M = System.Array.init(16, 0, System.UInt32);
                        for (var j = 0; j < 16; j = (j + 1) | 0) {
                            M[System.Array.index(j, M)] = System.BitConverter.toUInt32(processedInput, (((Bridge.Int.mul(i, 64)) + (Bridge.Int.mul(j, 4))) | 0));
                        }

                        var A = a0, B = b0, C = c0, D = d0, F = 0, g = 0;

                        for (var k = 0; k < 64; k = (k + 1) >>> 0) {
                            if (k <= 15) {
                                F = ((((B & C) >>> 0)) | (((~B & D) >>> 0))) >>> 0;
                                g = k;
                            } else if (k >= 16 && k <= 31) {
                                F = ((((D & B) >>> 0)) | (((~D & C) >>> 0))) >>> 0;
                                g = ((((Bridge.Int.umul(5, k)) + 1) >>> 0)) % 16;
                            } else if (k >= 32 && k <= 47) {
                                F = (((B ^ C) >>> 0) ^ D) >>> 0;
                                g = ((((Bridge.Int.umul(3, k)) + 5) >>> 0)) % 16;
                            } else if (k >= 48) {
                                F = (C ^ (((B | ~D) >>> 0))) >>> 0;
                                g = (Bridge.Int.umul(7, k)) % 16;
                            }

                            var dtemp = D;
                            D = C;
                            C = B;
                            B = (B + GreyHackTools.Debugger.MD5.leftRotate((((((((A + F) >>> 0) + GreyHackTools.Debugger.MD5.K[System.Array.index(k, GreyHackTools.Debugger.MD5.K)]) >>> 0) + M[System.Array.index(g, M)]) >>> 0)), GreyHackTools.Debugger.MD5.s[System.Array.index(k, GreyHackTools.Debugger.MD5.s)])) >>> 0;
                            A = dtemp;
                        }

                        a0 = (a0 + A) >>> 0;
                        b0 = (b0 + B) >>> 0;
                        c0 = (c0 + C) >>> 0;
                        d0 = (d0 + D) >>> 0;
                    }

                    return (GreyHackTools.Debugger.MD5.GetByteString(a0) || "") + (GreyHackTools.Debugger.MD5.GetByteString(b0) || "") + (GreyHackTools.Debugger.MD5.GetByteString(c0) || "") + (GreyHackTools.Debugger.MD5.GetByteString(d0) || "");
                },
                GetByteString: function (x) {
                    return Bridge.toArray(System.Linq.Enumerable.from(System.BitConverter.getBytes$8(x), System.Byte).select(function (y) {
                                return System.Byte.format(y, "x2");
                            })).join("");
                }
            }
        }
    });

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
                            _o1.add(9);
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
                            _o4.add("}");
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
                            _o8.add("function");
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
                            _o10.add("=>", "function$a$b");
                            return _o10;
                        }(new (System.Collections.Generic.Dictionary$2(System.String,System.String)).ctor());
                    this._templates = function (_o11) {
                            _o11.add("^(__)(.*)(_idx)$", GreyHackTools.GreyHackCompiler.ETemplate.IterationIndex);
                            _o11.add("^(\\\\)(\\S*)$", GreyHackTools.GreyHackCompiler.ETemplate.IgnoreOptimization);
                            _o11.add("^(\\/\\/)(.*)$", GreyHackTools.GreyHackCompiler.ETemplate.Comment);
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
                            return (context.PlainInput.Peek() === 10 || (context.PlainInput.Count > 1 && context.PlainInput.Peek() === 13 && System.Linq.Enumerable.from(context.PlainInput, System.Char).skip(1).first() === 10));
                        };
                    }

                    if (context.MapActive.Peek()) {
                        token.v = new GreyHackTools.GreyHackCompiler.Token.Separator();

                        switch (context.PlainInput.Peek()) {
                            case 44: 
                                context.ShouldOptimizeString.Pop();
                                context.ShouldOptimizeString.Push(!System.Enum.hasFlag(context.Settings, Bridge.box(GreyHackTools.GreyHackCompiler.Settings.IgnoreMapVariables, GreyHackTools.GreyHackCompiler.Settings, System.Enum.toStringFn(GreyHackTools.GreyHackCompiler.Settings))));
                                return function (x) {
                                    return true;
                                };
                            case 58: 
                                context.ShouldOptimizeString.Pop();
                                context.ShouldOptimizeString.Push(false);
                                return function (x) {
                                    return true;
                                };
                        }

                    }

                    if (context.PlainInput.Peek() === 92) {
                        token.v = new GreyHackTools.GreyHackCompiler.Token.Template.ctor();
                        return function (x) {
                            return GreyHackTools.GreyHackCompiler._tokenBrackets.contains(x.PlainInput.Peek()) || GreyHackTools.GreyHackCompiler._tokenSeparators.contains(x.PlainInput.Peek()) || GreyHackTools.GreyHackCompiler._tokenOperators.contains(x.PlainInput.Peek()) || GreyHackTools.GreyHackCompiler._tokenEndStatements.contains(String.fromCharCode(x.PlainInput.Peek())) || GreyHackTools.GreyHackCompiler._tokenEndStatements.contains((String.fromCharCode(x.PlainInput.Peek()) || "") + (String.fromCharCode(System.Linq.Enumerable.from(x.PlainInput, System.Char).skip(1).firstOrDefault(null, 0)) || ""));
                        };
                    }

                    if (GreyHackTools.GreyHackCompiler._tokenInclude.contains(String.fromCharCode(context.PlainInput.Peek()) + (String.fromCharCode(System.Linq.Enumerable.from(context.PlainInput, System.Char).skip(1).firstOrDefault(null, 0)) || ""))) {
                        token.v = new GreyHackTools.GreyHackCompiler.Token.Include();
                        context.PlainInput.Dequeue();
                        context.PlainInput.Dequeue();
                        return function (x) {
                            if (GreyHackTools.GreyHackCompiler._tokenEndInclude.contains(x.PlainInput.Peek())) {
                                x.PlainInput.Dequeue();
                                return true;
                            }

                            return false;
                        };
                    }

                    if (GreyHackTools.GreyHackCompiler._tokenOperators.contains(context.PlainInput.Peek())) {
                        token.v = new GreyHackTools.GreyHackCompiler.Token.Operator();
                        return function (x) {
                            return !GreyHackTools.GreyHackCompiler._tokenOperators.contains(x.PlainInput.Peek());
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
                                if (context.LastToken == null || (!System.String.endsWith(context.LastToken.Value, ")") && !Bridge.referenceEquals(context.LastToken.Value, "=>"))) {
                                    context.MapActive.Push(true);
                                    context.ShouldOptimizeString.Push((context.Settings & GreyHackTools.GreyHackCompiler.Settings.IgnoreMapVariables) === 0);
                                } else {
                                    context.MapActive.Push(false);
                                    context.ShouldOptimizeString.Push(false);
                                }
                                break;
                            case 125: 
                                context.MapActive.Pop();
                                context.ShouldOptimizeString.Pop();
                                break;
                        }

                        return function (x) {
                            return true;
                        };
                    }
                    if (GreyHackTools.GreyHackCompiler._tokenSeparators.contains(context.PlainInput.Peek())) {
                        token.v = new GreyHackTools.GreyHackCompiler.Token.Separator();
                        return function (x) {
                            return true;
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
                            return true;
                        };
                    }
                    token.v = new GreyHackTools.GreyHackCompiler.Token.Variable();
                    return function (x) {
                        return GreyHackTools.GreyHackCompiler._tokenBrackets.contains(x.PlainInput.Peek()) || GreyHackTools.GreyHackCompiler._tokenSeparators.contains(x.PlainInput.Peek()) || GreyHackTools.GreyHackCompiler._tokenStrings.contains(x.PlainInput.Peek()) || GreyHackTools.GreyHackCompiler._tokenOperators.contains(x.PlainInput.Peek()) || GreyHackTools.GreyHackCompiler._tokenEndStatements.contains(String.fromCharCode(x.PlainInput.Peek())) || GreyHackTools.GreyHackCompiler._tokenEndStatements.contains((String.fromCharCode(x.PlainInput.Peek()) || "") + (String.fromCharCode(System.Linq.Enumerable.from(x.PlainInput, System.Char).skip(1).firstOrDefault(null, 0)) || ""));
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
                    } while (context.PlainInput.Count > 0 && !separator(context));

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
            CodePrefix: null,
            bracketDepth: System.Int64(0),
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
                this.bracketDepth = System.Int64(0);
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
                this.CodePrefix = new System.Text.StringBuilder();

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
            Compile: function (optimize, isStringFormat) {
                if (optimize === void 0) { optimize = false; }
                if (isStringFormat === void 0) { isStringFormat = false; }
                this.optimizeEnabled = optimize;
                this.StringBuilder.clear();



                var node;
                node = this.RootToken;
                while (node != null) {
                    node = node.Optimize(this, optimize).Next;
                }

                node = this.RootToken;
                while (node != null) {
                    node = node.Compile(this).Next;
                }




                this.optimizeEnabled = false;
                if (isStringFormat) {
                    return this.StringBuilder.toString();
                }
                this.CodePrefix.append(this.StringBuilder.toString());
                return this.CodePrefix.toString();
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
            SupportsMultiLineBracket: false,
            Optimizable: false,
            _endStatement: false,
            ForceEndStatement: false,
            ForceEndStatementValue: false
        },
        props: {
            EndStatement: {
                get: function () {
                    if (this.ForceEndStatement) {
                        return this.ForceEndStatementValue;
                    }

                    return this._endStatement;
                },
                set: function (value) {
                    this._endStatement = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.SupportsMultiLineBracket = false;
                this.Optimizable = true;
                this._endStatement = false;
            }
        },
        methods: {
            toString: function () {
                return this.Value;
            },
            Optimize: function (context, replace) {
                if (replace === void 0) { replace = true; }
                if (this.Optimizable && this.Value.length > 0 && !System.Char.isDigit(this.Value.charCodeAt(0)) && !context.IgnoreOptimize(this.Value)) {
                    if (replace) {
                        this.Value = context.nameProvider.GetReplace(this.Value);
                    } else {
                        context.nameProvider.Define(this.Value);
                    }

                }
                return this;
            },
            Compile: function (context, force) {
                if (force === void 0) { force = false; }
                if (System.String.isNullOrWhiteSpace(this.Value)) {
                    return this;
                }
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
            CompareBeginningOfValue$1: function (s) {
                if (s.length > this.Value.length) {
                    return false;
                }
                for (var i = 0; i < s.length; i = (i + 1) | 0) {
                    if (this.Value.charCodeAt(i) !== s.charCodeAt(i)) {
                        return false;
                    }
                }

                return true;
            },
            CompareBeginningOfValue: function (c) {
                if (this.Value.length < 1) {
                    return false;
                }
                return this.Value.charCodeAt(0) === c;
            }
        }
    });

    Bridge.define("GreyHackTools.VariableNameProvider", {
        fields: {
            _replace: null,
            _names: null,
            _state: 0,
            _chars: null
        },
        ctors: {
            init: function () {
                this._replace = new (System.Collections.Generic.Dictionary$2(System.String,System.String)).ctor();
                this._names = new (System.Collections.Generic.HashSet$1(System.String)).ctor();
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
            GetFree: function (optimize) {
                var name = "";
                var c;
                if (optimize) {
                    var s = this.Next();
                    this._names.add(s);
                    return s;
                }
                do {
                    name = this.Next();
                } while (this._names.contains(name));



                return name;
            },
            IsDefined: function (name) {
                return this._replace.containsKey(name);
            },
            GetReplace: function (orig) {
                if (!this._replace.containsKey(orig)) {
                    var s = this.Next();
                    this._replace.setItem(orig, s);
                    return s;
                }

                return this._replace.getItem(orig);
            },
            Define: function (name) {
                if (!this._names.contains(name)) {
                    this._names.add(name);
                }
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
                if (force === void 0) { force = false; }
                var br;
                if (((br = Bridge.as(this, GreyHackTools.GreyHackCompiler.Token.Bracket))) != null && !br.Custom && (br.Value.length === 0 || br.Value.charCodeAt(0) !== 123)) {
                    return GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context);
                }

                if ((this.Next != null && !GreyHackTools.GreyHackCompiler._tokenOperators.contains(System.Linq.Enumerable.from(this.Value, System.Char).first()) && (Bridge.referenceEquals(this.Next.Value, ".") || Bridge.referenceEquals(this.Next.Value, "(") || Bridge.referenceEquals(this.Next.Value, "[")))) {
                    context.stringBuilders.Push(new System.Text.StringBuilder(this.Value));
                    if (Bridge.referenceEquals(this.Next.Value, ".")) {
                        this.Next = this.Next.Next;
                        context.StringBuilder.append(String.fromCharCode(46));
                    }

                    if (this.Next != null) {
                        this.Next.Compile(context, true);
                        this.EndStatement = this.Next.EndStatement;
                        this.ForceEndStatement = this.Next.ForceEndStatement;
                        this.ForceEndStatementValue = this.Next.ForceEndStatementValue;
                        this.Next = this.Next.Next;
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
                        var r = GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context, true);
                        return r;
                    } else {
                        return this;
                    }
                }
                var oo;
                if (this.Prev != null && ((oo = Bridge.as(this.Prev, GreyHackTools.GreyHackCompiler.Token.Operator))) != null && oo.NeedsRight) {
                    if (force) {
                        var r1 = GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context, true);
                        return r1;
                    } else {
                        return this;
                    }
                }

                return GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context, force);
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
            Optimize: function (context, replace) {
                if (replace === void 0) { replace = true; }
                if (Bridge.referenceEquals(this.Value, "true")) {
                    this.Value = "1";
                }
                if (Bridge.referenceEquals(this.Value, "false")) {
                    this.Value = "0";
                }
                return GreyHackTools.GreyHackCompiler.Token.prototype.Optimize.call(this, context, replace);
            },
            Compile: function (context, force) {
                if (force === void 0) { force = false; }
                switch (this.Value) {
                    case "else": 
                        this.SupportsMultiLineBracket = true;
                        break;
                    case "for": 
                    case "while": 
                    case "if": 
                        this.CompileNext(context);
                        this.SupportsMultiLineBracket = true;
                        break;
                    case "function": 
                        this.CompileNext(context, false);
                        this.SupportsMultiLineBracket = true;
                        break;
                }
                return GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context, force);
            },
            CompileNext: function (context, removeBracets) {
                if (removeBracets === void 0) { removeBracets = true; }
                if (!(Bridge.is(this.Next, GreyHackTools.GreyHackCompiler.Token.Bracket))) {
                    return;
                }
                context.stringBuilders.Push(new System.Text.StringBuilder());
                this.Next.Compile(context, true);

                if (removeBracets) {
                    context.StringBuilder.setChar(0, 32);
                    this.Value = (this.Value || "") + ((context.StringBuilder.toString(0, ((context.StringBuilder.getLength() - 1) | 0))) || "");
                } else {
                    this.Value = (this.Value || "") + ((context.StringBuilder.toString()) || "");
                }
                context.stringBuilders.Pop();

                if (this.Next.Next != null) {
                    this.Next.Next.Prev = this;
                }

                this.EndStatement = this.Next.EndStatement;
                this.Next = this.Next.Next;
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
                                innerCodeContext.CodePrefix = context.CodePrefix;
                                var compiled = innerCodeContext.Compile(context.optimizeEnabled, true);
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
            CompileInside: function (context, multiLine, prefix, postfix) {
                if (multiLine === void 0) { multiLine = false; }
                if (prefix === void 0) { prefix = ""; }
                if (postfix === void 0) { postfix = ""; }
                var last = this;
                var current = this.Next;
                context.stringBuilders.Push(new System.Text.StringBuilder(prefix));
                var close = this._openingToClosing.getItem(System.Linq.Enumerable.from(this.Value, System.Char).first());

                while (current != null) {
                    if (!multiLine) {
                        current.ForceEndStatement = true;
                        current.ForceEndStatementValue = false;
                    } else {
                        current.EndStatement = current.EndStatement || current.Next.CompareBeginningOfValue(close);
                    }

                    last = current;
                    if (current.CompareBeginningOfValue(close)) {
                        break;
                    }
                    current.Compile(context);
                    current = current.Next;
                }

                if (last.Next != null && Bridge.referenceEquals(last.Next.Value, "else") && multiLine) {
                    last.Value = "";
                    last.ForceEndStatement = true;
                    last.ForceEndStatementValue = false;
                } else if (!System.String.isNullOrWhiteSpace(postfix)) {
                    last.Value = postfix;
                }
                last.ForceEndStatement = true;
                last.ForceEndStatementValue = false;
                last.Compile(context);
                last.ForceEndStatement = false;
                this.EndStatement = last.EndStatement;
                this.Value = context.StringBuilder.toString();
                context.stringBuilders.Pop();
                return last;
            },
            Compile: function (context, force) {
                if (force === void 0) { force = false; }
                if (this.IsOpening) {
                    context.bracketDepth = context.bracketDepth.inc();
                } else if (this.IsClosing) {
                    context.bracketDepth = context.bracketDepth.dec();
                }
                if (this.Custom) {
                    return GreyHackTools.GreyHackCompiler.Token.Variable.prototype.Compile.call(this, context, force);
                }
                if (this.IsOpening) {
                    var node = null;

                    if (this.Prev != null && Bridge.referenceEquals(this.Value, "{") && this.Prev.SupportsMultiLineBracket) {
                        var prefix = "";
                        var postfix = "";
                        if (Bridge.referenceEquals(this.Prev.Value, "else")) {
                            postfix = "end if";
                        } else if (this.Prev.CompareBeginningOfValue$1("if")) {
                            prefix = "then";
                            postfix = "end if";
                        } else if (Bridge.referenceEquals(this.Prev.Value, "=>")) {
                            postfix = "end function";
                        } else if (this.Prev.CompareBeginningOfValue$1("function")) {
                            postfix = "end function";
                        } else if (this.Prev.CompareBeginningOfValue$1("for")) {
                            postfix = "end for";
                        } else if (this.Prev.CompareBeginningOfValue$1("while")) {
                            postfix = "end while";
                        }

                        node = this.CompileInside(context, true, (prefix || "") + "\n", postfix);
                    } else {
                        node = this.CompileInside(context, false, this.Value);
                    }

                    this.Next = node != null ? node.Next : null;

                    if (this.Prev == null) {
                        context.RootToken = this;
                    } else {
                        this.Prev.Next = this;
                    }

                    if ((node != null ? node.Next : null) == null) {
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
                    if (Bridge.referenceEquals(this.Value, "=>")) {
                        this.SupportsMultiLineBracket = true;
                    }
                    var depth = context.bracketDepth;
                    var left = "";
                    var right = "";
                    var tmpRight = null;
                    var tmpLeft = null;
                    var s = GreyHackTools.GreyHackCompiler._operators.getItem(this.Value);
                    if (this.NeedsLeft && this.Prev != null) {
                        var b;
                        if (((b = Bridge.as(this.Prev, GreyHackTools.GreyHackCompiler.Token.Bracket))) != null && b.IsOpening) {
                            throw new System.Exception(System.String.format("invalid syntax for template {0}", [this.Value]));
                        }
                        context.stringBuilders.Push(new System.Text.StringBuilder());
                        tmpLeft = this.Prev.Compile(context, true);
                        left = context.StringBuilder.toString();
                        s = System.String.replaceAll(s, "$a", left);
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
                        tmpRight = this.Next.Compile(context, true);
                        right = context.StringBuilder.toString();
                        s = System.String.replaceAll(s, "$b", right);
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

                    if (Bridge.referenceEquals(this.Value, "=>") && tmpLeft.Prev != null && !Bridge.referenceEquals(tmpLeft.Prev.Value, "=")) {
                        var name = context.nameProvider.GetFree(context.optimizeEnabled);
                        this.Value = "@" + (name || "");
                        context.CodePrefix.append(name);
                        context.CodePrefix.append("=");
                        context.CodePrefix.appendLine(s);
                        this.EndStatement = tmpRight.EndStatement;
                        return GreyHackTools.GreyHackCompiler.Token.Variable.prototype.Compile.call(this, context, force);
                    } else {
                        this.Value = s;

                        return GreyHackTools.GreyHackCompiler.Token.Variable.prototype.Compile.call(this, context, force);
                    }
                } else {
                    return GreyHackTools.GreyHackCompiler.Token.Variable.prototype.Compile.call(this, context, force);
                }
            },
            toString: function () {
                return System.String.format("Operator: {0}", [GreyHackTools.GreyHackCompiler.Token.Variable.prototype.toString.call(this)]);
            }
        }
    });

    Bridge.define("GreyHackTools.GreyHackCompiler.Token.Template", {
        inherits: [GreyHackTools.GreyHackCompiler.Token.Variable],
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
                GreyHackTools.GreyHackCompiler.Token.Variable.ctor.call(this);

            },
            $ctor1: function (template, matches, regex, context) {
                this.$initialize();
                GreyHackTools.GreyHackCompiler.Token.Variable.ctor.call(this);
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
            Optimize: function (context, replace) {
                if (replace === void 0) { replace = true; }
                switch (this.TemplateType) {
                    case GreyHackTools.GreyHackCompiler.ETemplate.IterationIndex: 
                        if (replace) {
                            var var_name = this.Matches.get(0).getGroups().get(2).getValue();
                            if (System.String.isNullOrWhiteSpace(var_name) || context.IgnoreOptimize(var_name)) {
                                return this;
                            }
                            this._value = System.Text.RegularExpressions.Regex.replace(this.Value, this.RegexString, System.String.format("$1{0}$3", [context.nameProvider.GetReplace(var_name)]));
                        }
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


                return GreyHackTools.GreyHackCompiler.Token.Variable.prototype.Compile.call(this, context, force);
            },
            IsValueString: function () {
                if (this.Value.length < 2) {
                    return false;
                }
                return this.Value.charCodeAt(0) === 34 && System.Linq.Enumerable.from(this.Value, System.Char).lastOrDefault(null, 0) === 34;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJKc01TcHBDb21waWxlci5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiRGVidWdnZXIvR3JleUhhY2tFbXVsYXRpb24vTUQ1LmNzIiwiQ29tcGlsZXIvR3JleUhhY2tDb21waWxlci5jcyIsIkNvbXBpbGVyL0NvbnRleHQuY3MiLCJDb21waWxlci9Ub2tlbnMvVG9rZW4uY3MiLCJDb21waWxlci9WYXJpYWJsZU5hbWVQcm92aWRlci5jcyIsIkNvbXBpbGVyL1Rva2Vucy9WYXJpYWJsZS5jcyIsIkNvbXBpbGVyL1Rva2Vucy9JbmNsdWRlLmNzIiwiQ29tcGlsZXIvVG9rZW5zL0tleXdvcmQuY3MiLCJDb21waWxlci9Ub2tlbnMvU2VwYXJhdG9yLmNzIiwiQ29tcGlsZXIvVG9rZW5zL1N0cmluZy5jcyIsIkNvbXBpbGVyL1Rva2Vucy9CcmFja2V0LmNzIiwiQ29tcGlsZXIvVG9rZW5zL09wZXJhdG9yLmNzIiwiQ29tcGlsZXIvVG9rZW5zL1RlbXBsYXRlLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OzZCQVV5QkE7NkJBVUNBOzs7O3NDQWtCWUEsR0FBUUE7b0JBRWxDQSxPQUFPQSxHQUFDQSxPQUFLQSxhQUFLQSxDQUFDQSxNQUFLQSxDQUFDQSxPQUFLQTs7cUNBSUhBO29CQUUzQkE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7O29CQUVBQSxnQkFBZ0JBLENBQUNBLE9BQUtBLENBQUNBLENBQUNBO29CQUN4QkEscUJBQXFCQSxrQkFBU0EsK0JBQW1CQTtvQkFDakRBLGtCQUFXQSxVQUFPQSxtQkFBZ0JBO29CQUNsQ0Esa0NBQWVBLGNBQWZBOztvQkFFQUEsYUFBZ0JBLCtCQUFzQkE7b0JBQ3RDQSxrQkFBV0EsV0FBV0EsZ0JBQWdCQTs7b0JBRXRDQSxLQUFLQSxXQUFXQSxJQUFJQSxtREFBOEJBO3dCQUc5Q0EsUUFBV0E7d0JBQ1hBLEtBQUtBLFdBQVdBLFFBQVVBOzRCQUN0QkEs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QkFBdUJBOzRCQUF3QkE7NEJBQXdCQTs0QkFBb0JBOzRCQUFrQkE7NEJBQXdCQTs0QkFBdUJBOzRCQUF3QkE7NEJBQTBCQTs0QkFBb0JBOzRCQUFzQkE7NEJBQWdCQTs0QkFBaUJBOzRCQUEwQkE7NEJBQXFCQTs0QkFBdUJBOzRCQUFzQkE7NEJBQXFCQTs0QkFBc0JBOzRCQUFxQkE7NEJBQW1CQTs0QkFBaUJBOzRCQUFrQkE7NEJBQW9CQTs0QkFBMEJBOzRCQUF5QkE7NEJBQXVCQTs0QkFBbUJBOzRCQUFtQkE7NEJBQXFCQTs0QkFBcUJBOzRCQUFxQkE7NEJBQXFCQTs0QkFBNkJBOzRCQUF1QkE7NEJBQWdCQTs0QkFBdUJBOzRCQUFrQkE7NEJBQWVBOzRCQUFvQkE7NEJBQWdCQTs0QkFBb0JBOzRCQUFrQkE7NEJBQWlCQTs0QkFBZUE7NEJBQWdCQTs0QkFBZ0JBOzRCQUFtQkE7NEJBQTJCQTs0QkFBMkJBOzRCQUFvQkE7NEJBQW9CQTs0QkFBaUJBOzRCQUFrQkE7NEJBQXVCQTs0QkFBZ0JBOzRCQUF1QkE7NEJBQWNBOzRCQUFnQkE7NEJBQXFCQTs0QkFBZUE7NEJBQXFCQTs0QkFBdUJBOzRCQUFpQkE7NEJBQXdCQTs0QkFBcUJBOzRCQUFnQkE7NEJBQWdCQTs0QkFBZUE7NEJBQWlCQTs0QkFBa0JBOzRCQUFrQkE7NEJBQW1CQTs0QkFBbUJBOzRCQUFlQTs0QkFBaUJBOzRCQUFnQkE7NEJBQXdCQTs0QkFBZUE7NEJBQXVCQTs0QkFBcUJBOzRCQUFzQkE7NEJBQW1CQTs0QkFBZ0JBOzRCQUFlQTs0QkFBZ0JBOzRCQUFpQkE7NEJBQTBCQTs0QkFBZ0JBOzRCQUFpQkE7NEJBQWdCQTs0QkFBMEJBOzRCQUFlQTs0QkFBZUE7NEJBQWVBOzRCQUFrQkE7NEJBQWlCQTs0QkFBZ0JBOzRCQUFrQkE7NEJBQWlCQTs0QkFBc0JBOzRCQUE0QkE7NEJBQXNCQTs0QkFBNkJBOzRCQUFlQTs0QkFBa0JBOzRCQUFtQkE7NEJBQWlCQTs0QkFBeUJBOzRCQUFrQkE7NEJBQXdCQTs0QkFBZ0JBOzRCQUFnQkE7NEJBQWdCQTs0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d0JBRTlGQTs7Ozs7Z0NBaEdtQkEsU0FBaUJBOztnQkFFNUNBLFFBQVFBO29CQUVKQSxLQUFLQTt3QkFDREEsSUFBSUE7NEJBRUFBLGVBQWtCQTs0QkFDbEJBLElBQUlBLGlDQUEwQkEsYUFBYUEsdUJBQXVCQTtnQ0FDOURBLE9BQU9BOzs0QkFDWEEsY0FBU0EsNkNBQWNBLFlBQU9BLGtCQUM5REEsaUNBQXdCQSxnQ0FBZ0NBOzt3QkFHNUJBO29CQUNKQSxLQUFLQTt3QkFDREE7O2dCQUVSQSxPQUFPQTs7K0JBR21CQSxTQUFpQkE7O2dCQUUzQ0EsUUFBUUE7b0JBRUpBLEtBQUtBO3dCQUNEQSxJQUFJQSxDQUFDQSxtQkFBbUJBOzRCQUVwQkEsSUFBSUEsYUFBUUE7Z0NBRVJBLGlCQUFZQTtnQ0FDWkEsSUFBSUEsQ0FBQ0E7b0NBRURBO29DQUNBQSw2QkFBNkJBOzs7Z0NBS2pDQSxvQkFBb0JBOzs7NEJBR3hCQSxJQUFJQSxhQUFRQTtnQ0FFUkEsaUJBQVlBOztnQ0FJWkEsb0JBQW9CQTs7NEJBRXhCQSxPQUFPQTs7d0JBR1hBOzs7O2dCQVVSQSxPQUFPQSwyRUFBYUEsU0FBU0E7OztnQkFLN0JBLElBQUlBO29CQUFrQkE7O2dCQUN0QkEsT0FBT0EsbUNBQW1CQSw0QkFBMkNBLFlBQU5BIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29scy5EZWJ1Z2dlclxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTUQ1XHJcbiAgICB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBSb3VuZCBzaGlmdCB2YWx1ZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBzdGF0aWMgaW50W10gcyA9IG5ldyBpbnRbNjRdIHtcclxuICAgICAgICAgICAgNywgMTIsIDE3LCAyMiwgIDcsIDEyLCAxNywgMjIsICA3LCAxMiwgMTcsIDIyLCAgNywgMTIsIDE3LCAyMixcclxuICAgICAgICAgICAgNSwgIDksIDE0LCAyMCwgIDUsICA5LCAxNCwgMjAsICA1LCAgOSwgMTQsIDIwLCAgNSwgIDksIDE0LCAyMCxcclxuICAgICAgICAgICAgNCwgMTEsIDE2LCAyMywgIDQsIDExLCAxNiwgMjMsICA0LCAxMSwgMTYsIDIzLCAgNCwgMTEsIDE2LCAyMyxcclxuICAgICAgICAgICAgNiwgMTAsIDE1LCAyMSwgIDYsIDEwLCAxNSwgMjEsICA2LCAxMCwgMTUsIDIxLCAgNiwgMTAsIDE1LCAyMVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogQ29uc3RhbnQgSyBWYWx1ZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBzdGF0aWMgdWludFtdIEsgPSBuZXcgdWludFs2NF0ge1xyXG4gICAgICAgICAgICAweGQ3NmFhNDc4LCAzOTA1NDAyNzEwVSwgNjA2MTA1ODE5LCAzMjUwNDQxOTY2VSxcclxuICAgICAgICAgICAgMHhmNTdjMGZhZiwgMHg0Nzg3YzYyYSwgMHhhODMwNDYxMywgMHhmZDQ2OTUwMSxcclxuICAgICAgICAgICAgMHg2OTgwOThkOCwgMjMzNjU1Mjg3OVUsIDQyOTQ5MjUyMzNVLCAyMzA0NTYzMTM0VSxcclxuMTgwNDYwMzY4MiwgMHhmZDk4NzE5MywgMHhhNjc5NDM4ZSwgMTIzNjUzNTMyOSxcclxuICAgICAgICAgICAgMHhmNjFlMjU2MiwgMzIyNTQ2NTY2NFUsIDB4MjY1ZTVhNTEsIDM5MjEwNjk5OTRVLFxyXG4gICAgICAgICAgICAweGQ2MmYxMDVkLCAweDAyNDQxNDUzLCAweGQ4YTFlNjgxLCAzODg5NDI5NDQ4VSxcclxuICAgICAgICAgICAgMHgyMWUxY2RlNiwgMHhjMzM3MDdkNiwgMHhmNGQ1MGQ4NywgMHg0NTVhMTRlZCxcclxuICAgICAgICAgICAgMHhhOWUzZTkwNSwgMHhmY2VmYTNmOCwgMHg2NzZmMDJkOSwgMHg4ZDJhNGM4YSxcclxuICAgICAgICAgICAgMHhmZmZhMzk0MiwgMHg4NzcxZjY4MSwgMHg2ZDlkNjEyMiwgMHhmZGU1MzgwYyxcclxuMjc2Mzk3NTIzNlUsIDEyNzI4OTMzNTMsIDQxMzk0Njk2NjRVLCAzMjAwMjM2NjU2VSxcclxuNjgxMjc5MTc0LCAweGVhYTEyN2ZhLCAweGQ0ZWYzMDg1LCAweDA0ODgxZDA1LFxyXG4gICAgICAgICAgICAweGQ5ZDRkMDM5LCAzODczMTUxNDYxVSwgMHgxZmEyN2NmOCwgMHhjNGFjNTY2NSxcclxuICAgICAgICAgICAgMHhmNDI5MjI0NCwgMHg0MzJhZmY5NywgMjg3ODYxMjM5MVUsIDB4ZmM5M2EwMzksXHJcbjE3MDA0ODU1NzEsIDB4OGYwY2NjOTIsIDB4ZmZlZmY0N2QsIDB4ODU4NDVkZDEsXHJcbiAgICAgICAgICAgIDB4NmZhODdlNGYsIDB4ZmUyY2U2ZTAsIDB4YTMwMTQzMTQsIDB4NGUwODExYTEsXHJcbiAgICAgICAgICAgIDB4Zjc1MzdlODIsIDMxNzQ3NTY5MTdVLCA3MTg3ODcyNTksIDM5NTE0ODE3NDVVICAgICAgICB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHVpbnQgbGVmdFJvdGF0ZSh1aW50IHgsIGludCBjKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICh4IDw8IGMpIHwgKHggPj4gKDMyIC0gYykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYXNzdW1lcyB3aG9sZSBieXRlcyBhcyBpbnB1dFxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIENhbGN1bGF0ZShieXRlW10gaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1aW50IGEwID0gMHg2NzQ1MjMwMTsgICAvLyBBXHJcbiAgICAgICAgICAgIHVpbnQgYjAgPSA0MDIzMjMzNDE3VTsgICAvLyBCXHJcbiAgICAgICAgICAgIHVpbnQgYzAgPSAyNTYyMzgzMTAyVTsgICAvLyBDXHJcbiAgICAgICAgICAgIHVpbnQgZDAgPSAweDEwMzI1NDc2OyAgIC8vIERcclxuXHJcbiAgICAgICAgICAgIHZhciBhZGRMZW5ndGggPSAoNTYgLSAoKGlucHV0Lkxlbmd0aCArIDEpICUgNjQpKSAlIDY0OyAvLyBjYWxjdWxhdGUgdGhlIG5ldyBsZW5ndGggd2l0aCBwYWRkaW5nXHJcbiAgICAgICAgICAgIHZhciBwcm9jZXNzZWRJbnB1dCA9IG5ldyBieXRlW2lucHV0Lkxlbmd0aCArIDEgKyBhZGRMZW5ndGggKyA4XTtcclxuICAgICAgICAgICAgQXJyYXkuQ29weShpbnB1dCwgcHJvY2Vzc2VkSW5wdXQsIGlucHV0Lkxlbmd0aCk7XHJcbiAgICAgICAgICAgIHByb2Nlc3NlZElucHV0W2lucHV0Lkxlbmd0aF0gPSAweDgwOyAvLyBhZGQgMVxyXG5cclxuICAgICAgICAgICAgYnl0ZVtdIGxlbmd0aCA9IEJpdENvbnZlcnRlci5HZXRCeXRlcyhpbnB1dC5MZW5ndGggKiA4KTsgLy8gYml0IGNvbnZlcnRlciByZXR1cm5zIGxpdHRsZS1lbmRpYW5cclxuICAgICAgICAgICAgQXJyYXkuQ29weShsZW5ndGgsIDAsIHByb2Nlc3NlZElucHV0LCBwcm9jZXNzZWRJbnB1dC5MZW5ndGggLSA4LCA0KTsgLy8gYWRkIGxlbmd0aCBpbiBiaXRzXHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2Nlc3NlZElucHV0Lkxlbmd0aCAvIDY0OyArK2kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvcHkgdGhlIGlucHV0IHRvIE1cclxuICAgICAgICAgICAgICAgIHVpbnRbXSBNID0gbmV3IHVpbnRbMTZdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCAxNjsgKytqKVxyXG4gICAgICAgICAgICAgICAgICAgIE1bal0gPSBCaXRDb252ZXJ0ZXIuVG9VSW50MzIocHJvY2Vzc2VkSW5wdXQsIChpICogNjQpICsgKGogKiA0KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSByb3VuZCB2YXJpYWJsZXNcclxuICAgICAgICAgICAgICAgIHVpbnQgQSA9IGEwLCBCID0gYjAsIEMgPSBjMCwgRCA9IGQwLCBGID0gMCwgZyA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcHJpbWFyeSBsb29wXHJcbiAgICAgICAgICAgICAgICBmb3IgKHVpbnQgayA9IDA7IGsgPCA2NDsgKytrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrIDw9IDE1KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRiA9IChCICYgQykgfCAofkIgJiBEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZyA9IGs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPj0gMTYgJiYgayA8PSAzMSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEYgPSAoRCAmIEIpIHwgKH5EICYgQyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcgPSAoKDUgKiBrKSArIDEpICUgMTY7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPj0gMzIgJiYgayA8PSA0NylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEYgPSBCIF4gQyBeIEQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcgPSAoKDMgKiBrKSArIDUpICUgMTY7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPj0gNDgpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGID0gQyBeIChCIHwgfkQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnID0gKDcgKiBrKSAlIDE2O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGR0ZW1wID0gRDtcclxuICAgICAgICAgICAgICAgICAgICBEID0gQztcclxuICAgICAgICAgICAgICAgICAgICBDID0gQjtcclxuICAgICAgICAgICAgICAgICAgICBCID0gQiArIGxlZnRSb3RhdGUoKEEgKyBGICsgS1trXSArIE1bZ10pLCBzW2tdKTtcclxuICAgICAgICAgICAgICAgICAgICBBID0gZHRlbXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYTAgKz0gQTtcclxuICAgICAgICAgICAgICAgIGIwICs9IEI7XHJcbiAgICAgICAgICAgICAgICBjMCArPSBDO1xyXG4gICAgICAgICAgICAgICAgZDAgKz0gRDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdldEJ5dGVTdHJpbmcoYTApICsgR2V0Qnl0ZVN0cmluZyhiMCkgKyBHZXRCeXRlU3RyaW5nKGMwKSArIEdldEJ5dGVTdHJpbmcoZDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nIEdldEJ5dGVTdHJpbmcodWludCB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5Kb2luKFwiXCIsIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0PGJ5dGUsc3RyaW5nPihCaXRDb252ZXJ0ZXIuR2V0Qnl0ZXMoeCksKEZ1bmM8Ynl0ZSxzdHJpbmc+KSh5ID0+IHkuVG9TdHJpbmcoXCJ4MlwiKSkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGV4dC5SZWd1bGFyRXhwcmVzc2lvbnM7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBTZXR0aW5nc1xyXG5cclxuICAgICAgICBbRmxhZ3NdXHJcbiAgICAgICAgcHVibGljIGVudW0gU2V0dGluZ3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5vbmUgPSAwLFxyXG4gICAgICAgICAgICBJZ25vcmVNYXBWYXJpYWJsZXMgPSAxLFxyXG4gICAgICAgICAgICBSZW1vdmVDb21tZW50cyA9IDIsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gSW50ZXJuYWxcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nIF9zZXBhcmF0b3IgPSBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgc3RyaW5nIF9zZXBhcmF0b3IgPSBcIjtcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlblNlcGFyYXRvcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzEpPT57X28xLkFkZCgnICcpO19vMS5BZGQoJy4nKTtfbzEuQWRkKCcsJyk7X28xLkFkZCgnOicpO19vMS5BZGQoJ1xcdCcpO3JldHVybiBfbzE7fSk7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxjaGFyPiBfdG9rZW5CcmFja2V0cyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vMik9PntfbzIuQWRkKCcoJyk7X28yLkFkZCgnKScpO19vMi5BZGQoJ1snKTtfbzIuQWRkKCddJyk7X28yLkFkZCgneycpO19vMi5BZGQoJ30nKTtyZXR1cm4gX28yO30pO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuT3BlcmF0b3JzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8Y2hhcj4oKSwoX28zKT0+e19vMy5BZGQoJysnKTtfbzMuQWRkKCctJyk7X28zLkFkZCgnKicpO19vMy5BZGQoJy8nKTtfbzMuQWRkKCclJyk7X28zLkFkZCgnPCcpO19vMy5BZGQoJz4nKTtfbzMuQWRkKCc9Jyk7X28zLkFkZCgnIScpO19vMy5BZGQoJ14nKTtfbzMuQWRkKCcmJyk7X28zLkFkZCgnfCcpO19vMy5BZGQoJ0AnKTtfbzMuQWRkKCd+Jyk7cmV0dXJuIF9vMzt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxzdHJpbmc+IF90b2tlbkVuZFN0YXRlbWVudHMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vNCk9PntfbzQuQWRkKFwiXFxuXCIpO19vNC5BZGQoXCJcXHJcXG5cIik7X280LkFkZChcIjtcIik7X280LkFkZChcIn1cIik7cmV0dXJuIF9vNDt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxzdHJpbmc+IF90b2tlbkluY2x1ZGUgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vNSk9PntfbzUuQWRkKFwiIyFcIik7cmV0dXJuIF9vNTt9KTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlbkVuZEluY2x1ZGUgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzYpPT57X282LkFkZCgnIScpO3JldHVybiBfbzY7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuU3RyaW5ncyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vNyk9PntfbzcuQWRkKCdcIicpO19vNy5BZGQoJyQnKTtyZXR1cm4gX283O30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PHN0cmluZz4gX2tleXdvcmRzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8c3RyaW5nPigpLChfbzgpPT57X284LkFkZChcImlmXCIpO19vOC5BZGQoXCJ0aGVuXCIpO19vOC5BZGQoXCJlbHNlXCIpO19vOC5BZGQoXCJlbmRcIik7X284LkFkZChcIndoaWxlXCIpO19vOC5BZGQoXCJmb3JcIik7X284LkFkZChcImluXCIpO19vOC5BZGQoXCJhbmRcIik7X284LkFkZChcIm9yXCIpO19vOC5BZGQoXCJub3RcIik7X284LkFkZChcInRydWVcIik7X284LkFkZChcImZhbHNlXCIpO19vOC5BZGQoXCJyZXR1cm5cIik7X284LkFkZChcImNvbnRpbnVlXCIpO19vOC5BZGQoXCJicmVha1wiKTtfbzguQWRkKFwibmV3XCIpO19vOC5BZGQoXCJmdW5jdGlvblwiKTtyZXR1cm4gX284O30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PHN0cmluZz4gX2lnbm9yZU9wdGltaXplID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8c3RyaW5nPigpLChfbzkpPT57X285LkFkZChcIkZpbGVcIik7X285LkFkZChcImFic1wiKTtfbzkuQWRkKFwiYWNvc1wiKTtfbzkuQWRkKFwiYWN0aXZlX25ldF9jYXJkXCIpO19vOS5BZGQoXCJhY3RpdmVfdXNlclwiKTtfbzkuQWRkKFwiYWlyY3JhY2tcIik7X285LkFkZChcImFpcm1vblwiKTtfbzkuQWRkKFwiYXNpblwiKTtfbzkuQWRkKFwiYXRhblwiKTtfbzkuQWRkKFwiYml0d2lzZVwiKTtfbzkuQWRkKFwiYnNzaWRfbmFtZVwiKTtfbzkuQWRkKFwiYnVpbGRcIik7X285LkFkZChcImNlaWxcIik7X285LkFkZChcImNoYW5nZV9wYXNzd29yZFwiKTtfbzkuQWRkKFwiY2hhclwiKTtfbzkuQWRkKFwiY2htb2RcIik7X285LkFkZChcImNsb3NlX3Byb2dyYW1cIik7X285LkFkZChcImNvZGVcIik7X285LkFkZChcImNvbW1hbmRfaW5mb1wiKTtfbzkuQWRkKFwiY29ubmVjdF9ldGhlcm5ldFwiKTtfbzkuQWRkKFwiY29ubmVjdF9zZXJ2aWNlXCIpO19vOS5BZGQoXCJjb25uZWN0X3dpZmlcIik7X285LkFkZChcImNvcHlcIik7X285LkFkZChcImNvc1wiKTtfbzkuQWRkKFwiY3JlYXRlX2ZvbGRlclwiKTtfbzkuQWRkKFwiY3JlYXRlX2dyb3VwXCIpO19vOS5BZGQoXCJjcmVhdGVfdXNlclwiKTtfbzkuQWRkKFwiY3VycmVudF9kYXRlXCIpO19vOS5BZGQoXCJjdXJyZW50X3BhdGhcIik7X285LkFkZChcImRlY2lwaGVyXCIpO19vOS5BZGQoXCJkZWxldGVcIik7X285LkFkZChcImRlbGV0ZV9ncm91cFwiKTtfbzkuQWRkKFwiZGVsZXRlX3VzZXJcIik7X285LkFkZChcImRldmljZV9wb3J0c1wiKTtfbzkuQWRkKFwiZGV2aWNlc19sYW5faXBcIik7X285LkFkZChcImR1bXBfbGliXCIpO19vOS5BZGQoXCJlc3NpZF9uYW1lXCIpO19vOS5BZGQoXCJleGl0XCIpO19vOS5BZGQoXCJmbG9vclwiKTtfbzkuQWRkKFwiZm9ybWF0X2NvbHVtbnNcIik7X285LkFkZChcImdldF9maWxlc1wiKTtfbzkuQWRkKFwiZ2V0X2ZvbGRlcnNcIik7X285LkFkZChcImdldF9sYW5faXBcIik7X285LkFkZChcImdldF9wb3J0c1wiKTtfbzkuQWRkKFwiZ2V0X3JvdXRlclwiKTtfbzkuQWRkKFwiZ2V0X3NoZWxsXCIpO19vOS5BZGQoXCJnbG9iYWxzXCIpO19vOS5BZGQoXCJncm91cFwiKTtfbzkuQWRkKFwiZ3JvdXBzXCIpO19vOS5BZGQoXCJoYXNJbmRleFwiKTtfbzkuQWRkKFwiaGFzX3Blcm1pc3Npb25cIik7X285LkFkZChcImhvc3RfY29tcHV0ZXJcIik7X285LkFkZChcImluY2x1ZGVfbGliXCIpO19vOS5BZGQoXCJpbmRleE9mXCIpO19vOS5BZGQoXCJpbmRleGVzXCIpO19vOS5BZGQoXCJpc19iaW5hcnlcIik7X285LkFkZChcImlzX2Nsb3NlZFwiKTtfbzkuQWRkKFwiaXNfZm9sZGVyXCIpO19vOS5BZGQoXCJpc19sYW5faXBcIik7X285LkFkZChcImlzX25ldHdvcmtfYWN0aXZlXCIpO19vOS5BZGQoXCJpc192YWxpZF9pcFwiKTtfbzkuQWRkKFwiam9pblwiKTtfbzkuQWRkKFwibGFzdEluZGV4T2ZcIik7X285LkFkZChcImxhdW5jaFwiKTtfbzkuQWRkKFwibGVuXCIpO19vOS5BZGQoXCJsaWJfbmFtZVwiKTtfbzkuQWRkKFwibG9hZFwiKTtfbzkuQWRkKFwibG9jYWxfaXBcIik7X285LkFkZChcImxvY2Fsc1wiKTtfbzkuQWRkKFwibG93ZXJcIik7X285LkFkZChcIm1kNVwiKTtfbzkuQWRkKFwibW92ZVwiKTtfbzkuQWRkKFwibmFtZVwiKTtfbzkuQWRkKFwibmV0X3VzZVwiKTtfbzkuQWRkKFwibmV0d29ya19kZXZpY2VzXCIpO19vOS5BZGQoXCJuZXR3b3JrX2dhdGV3YXlcIik7X285LkFkZChcIm5zbG9va3VwXCIpO19vOS5BZGQoXCJvdmVyZmxvd1wiKTtfbzkuQWRkKFwib3duZXJcIik7X285LkFkZChcInBhcmVudFwiKTtfbzkuQWRkKFwicGFyZW50X3BhdGhcIik7X285LkFkZChcInBhdGhcIik7X285LkFkZChcInBlcm1pc3Npb25zXCIpO19vOS5BZGQoXCJwaVwiKTtfbzkuQWRkKFwicGluZ1wiKTtfbzkuQWRkKFwicGluZ19wb3J0XCIpO19vOS5BZGQoXCJwb3BcIik7X285LkFkZChcInBvcnRfaW5mb1wiKTtfbzkuQWRkKFwicG9ydF9udW1iZXJcIik7X285LkFkZChcInByaW50XCIpO19vOS5BZGQoXCJwcm9ncmFtX3BhdGhcIik7X285LkFkZChcInB1YmxpY19pcFwiKTtfbzkuQWRkKFwicHVsbFwiKTtfbzkuQWRkKFwicHVzaFwiKTtfbzkuQWRkKFwicHV0XCIpO19vOS5BZGQoXCJyYW5nZVwiKTtfbzkuQWRkKFwicmVtb3ZlXCIpO19vOS5BZGQoXCJyZW5hbWVcIik7X285LkFkZChcInJlcGxhY2VcIik7X285LkFkZChcInJldmVyc2VcIik7X285LkFkZChcInJuZFwiKTtfbzkuQWRkKFwicm91bmRcIik7X285LkFkZChcInNjYW5cIik7X285LkFkZChcInNjYW5fYWRkcmVzc1wiKTtfbzkuQWRkKFwic2NwXCIpO19vOS5BZGQoXCJzZXRfY29udGVudFwiKTtfbzkuQWRkKFwic2V0X2dyb3VwXCIpO19vOS5BZGQoXCJzaG93X3Byb2NzXCIpO19vOS5BZGQoXCJzaHVmZmxlXCIpO19vOS5BZGQoXCJzaWduXCIpO19vOS5BZGQoXCJzaW5cIik7X285LkFkZChcInNpemVcIik7X285LkFkZChcInNsaWNlXCIpO19vOS5BZGQoXCJzbXRwX3VzZXJfbGlzdFwiKTtfbzkuQWRkKFwic29ydFwiKTtfbzkuQWRkKFwic3BsaXRcIik7X285LkFkZChcInNxcnRcIik7X285LkFkZChcInN0YXJ0X3Rlcm1pbmFsXCIpO19vOS5BZGQoXCJzdHJcIik7X285LkFkZChcInN1bVwiKTtfbzkuQWRkKFwidGFuXCIpO19vOS5BZGQoXCJ0b19pbnRcIik7X285LkFkZChcInRvdWNoXCIpO19vOS5BZGQoXCJ0cmltXCIpO19vOS5BZGQoXCJ0eXBlb2ZcIik7X285LkFkZChcInVwcGVyXCIpO19vOS5BZGQoXCJ1c2VkX3BvcnRzXCIpO19vOS5BZGQoXCJ1c2VyX2JhbmtfbnVtYmVyXCIpO19vOS5BZGQoXCJ1c2VyX2lucHV0XCIpO19vOS5BZGQoXCJ1c2VyX21haWxfYWRkcmVzc1wiKTtfbzkuQWRkKFwidmFsXCIpO19vOS5BZGQoXCJ2YWx1ZXNcIik7X285LkFkZChcInZlcnNpb25cIik7X285LkFkZChcIndob2lzXCIpO19vOS5BZGQoXCJ3aWZpX25ldHdvcmtzXCIpO19vOS5BZGQoXCJwYXJhbXNcIik7X285LkFkZChcImNsZWFyX3NjcmVlblwiKTtfbzkuQWRkKFwid2FpdFwiKTtfbzkuQWRkKFwic2VsZlwiKTtfbzkuQWRkKFwibnVsbFwiKTtfbzkuQWRkKFwiZnVuY3Rpb25cIik7X285LkFkZChcImNvbnRlbnRcIik7X285LkFkZChcImxhbl9pcFwiKTtfbzkuQWRkKFwiZ2V0X2NvbnRlbnRcIik7X285LkFkZChcImFpcmVwbGF5XCIpO19vOS5BZGQoXCJmaXJld2FsbF9ydWxlc1wiKTtfbzkuQWRkKFwia2VybmVsX3ZlcnNpb25cIik7X285LkFkZChcImtlcm5lbF92ZXJzaW9uXCIpO19vOS5BZGQoXCJyc2hlbGxfc2VydmVyXCIpO19vOS5BZGQoXCJyc2hlbGxfc2VydmVyXCIpO19vOS5BZGQoXCJfX2lzYVwiKTtfbzkuQWRkKFwiaWZcIik7X285LkFkZChcInRoZW5cIik7X285LkFkZChcImVsc2VcIik7X285LkFkZChcImVuZFwiKTtfbzkuQWRkKFwid2hpbGVcIik7X285LkFkZChcImZvclwiKTtfbzkuQWRkKFwiaW5cIik7X285LkFkZChcImFuZFwiKTtfbzkuQWRkKFwib3JcIik7X285LkFkZChcIm5vdFwiKTtfbzkuQWRkKFwidHJ1ZVwiKTtfbzkuQWRkKFwiZmFsc2VcIik7X285LkFkZChcIm51bGxcIik7X285LkFkZChcInJldHVyblwiKTtfbzkuQWRkKFwiY29udGludWVcIik7X285LkFkZChcImJyZWFrXCIpO19vOS5BZGQoXCJmdW5jdGlvblwiKTtfbzkuQWRkKFwibmV3XCIpO19vOS5BZGQoXCJzZWxmXCIpO3JldHVybiBfbzk7fSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRGljdGlvbmFyeTxzdHJpbmcsIHN0cmluZz4gX29wZXJhdG9ycyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgc3RyaW5nPigpLChfbzEwKT0+e19vMTAuQWRkKFwiJiZcIixAXCIgYW5kIFwiKTtfbzEwLkFkZChcInx8XCIsQFwiIG9yIFwiKTtfbzEwLkFkZChcIjw8XCIsQFwiYml0d2lzZShcIlwiPDxcIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcIj4+XCIsQFwiYml0d2lzZShcIlwiPj5cIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcIj4+PlwiLEBcImJpdHdpc2UoXCJcIj4+PlwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwiXl5cIixAXCJiaXR3aXNlKFwiXCJeXCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCImXCIsQFwiYml0d2lzZShcIlwiJlwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwifFwiLEBcImJpdHdpc2UoXCJcInxcIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcIn5cIixAXCJiaXR3aXNlKFwiXCJ+XCJcIiwkYilcIik7X28xMC5BZGQoXCIrK1wiLEBcIiRhPSRhKzFcIik7X28xMC5BZGQoXCItLVwiLEBcIiRhPSRhLTFcIik7X28xMC5BZGQoXCIrPVwiLEBcIiRhPSRhKyRiXCIpO19vMTAuQWRkKFwiLT1cIixAXCIkYT0kYS0kYlwiKTtfbzEwLkFkZChcIio9XCIsQFwiJGE9JGEqJGJcIik7X28xMC5BZGQoXCIvPVwiLEBcIiRhPSRhLyRiXCIpO19vMTAuQWRkKFwiJT1cIixAXCIkYT0kYSUkYlwiKTtfbzEwLkFkZChcIj0+XCIsQFwiZnVuY3Rpb24kYSRiXCIpO3JldHVybiBfbzEwO30pO1xyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBFVGVtcGxhdGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5vbmUsXHJcbiAgICAgICAgICAgIEl0ZXJhdGlvbkluZGV4LFxyXG4gICAgICAgICAgICBJZ25vcmVPcHRpbWl6YXRpb24sXHJcbiAgICAgICAgICAgIFRlcm5hcnlPcGVyYXRvcixcclxuICAgICAgICAgICAgQ29tbWVudCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IERpY3Rpb25hcnk8c3RyaW5nLCBFVGVtcGxhdGU+IF90ZW1wbGF0ZXMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIEVUZW1wbGF0ZT4oKSwoX28xMSk9PntfbzExLkFkZChAXCJeKF9fKSguKikoX2lkeCkkXCIsRVRlbXBsYXRlLkl0ZXJhdGlvbkluZGV4KTtfbzExLkFkZChAXCJeKFxcXFwpKFxcUyopJFwiLEVUZW1wbGF0ZS5JZ25vcmVPcHRpbWl6YXRpb24pO19vMTEuQWRkKEBcIl4oXFwvXFwvKSguKikkXCIsRVRlbXBsYXRlLkNvbW1lbnQpO3JldHVybiBfbzExO30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIElzVGVtcGxhdGUoc3RyaW5nIGlucHV0LCBvdXQgc3RyaW5nIHJlZ2V4LCBvdXQgTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXMsIG91dCBFVGVtcGxhdGUgdGVtcGxhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoIChLZXlWYWx1ZVBhaXI8c3RyaW5nLCBFVGVtcGxhdGU+IHBhaXIgaW4gX3RlbXBsYXRlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWF0Y2hlcyA9IFJlZ2V4Lk1hdGNoZXMoaW5wdXQsIHBhaXIuS2V5KTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzLkNvdW50ICE9IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggPSBwYWlyLktleTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHBhaXIuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1hdGNoZXMgPSBudWxsO1xyXG4gICAgICAgICAgICByZWdleCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gRVRlbXBsYXRlLk5vbmU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgQ29tcGlsZShzdHJpbmcgY29kZSwgYm9vbCBvcHRpbWl6ZSA9IGZhbHNlLCBTZXR0aW5ncyBzZXR0aW5ncyA9IFNldHRpbmdzLk5vbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVG9rZW5pemUoY29kZSwgc2V0dGluZ3MpLkNvbXBpbGUob3B0aW1pemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIFRyeUNvbXBpbGUoc3RyaW5nIGNvZGUsIG91dCBzdHJpbmcgY29tcGlsZWRDb2RlLCBib29sIG9wdGltaXplID0gZmFsc2UsIFNldHRpbmdzIHNldHRpbmdzID0gU2V0dGluZ3MuTm9uZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb21waWxlZENvZGUgPSBDb21waWxlKGNvZGUsIG9wdGltaXplLCBzZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbXBpbGVkQ29kZSA9IGUuTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgQ29udGV4dCBUb2tlbml6ZShzdHJpbmcgcGxhaW5Db2RlLCBTZXR0aW5ncyBzZXR0aW5ncyA9IFNldHRpbmdzLk5vbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb250ZXh0IGNvbnRleHQgPSBuZXcgQ29udGV4dChzZXR0aW5ncykgeyBQbGFpbklucHV0ID0gbmV3IFF1ZXVlPGNoYXI+KHBsYWluQ29kZSkgfTtcclxuXHJcbiAgICAgICAgICAgIFRva2VuIHRva2VuID0gbnVsbDtcclxuICAgICAgICAgICAgd2hpbGUgKCh0b2tlbiA9IEdldE5leHRUb2tlbihjb250ZXh0KSkgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5BZGRUb2tlbih0b2tlbik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoY29udGV4dC5TZXR0aW5ncyAmIFNldHRpbmdzLklnbm9yZU1hcFZhcmlhYmxlcykgIT0gMCAmJiB0b2tlbi5QcmV2ICE9IG51bGwgJiYgdG9rZW4uUHJldi5WYWx1ZSA9PSBcIi5cIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRleHQuSWdub3JlT3B0aW1pemUodG9rZW4uVmFsdWUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jdXN0b21JZ25vcmVPcHRpbWl6ZS5BZGQodG9rZW4uVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlbW92ZVNwYWNlcyhRdWV1ZTxjaGFyPiBxdWV1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdoaWxlIChxdWV1ZS5Db3VudCAhPSAwICYmIGNoYXIuSXNXaGl0ZVNwYWNlKHF1ZXVlLlBlZWsoKSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHF1ZXVlLkRlcXVldWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgRnVuYzxDb250ZXh0LCBib29sPiBHZXRTZXBhcmF0aW9uU2VsZWN0b3IoQ29udGV4dCBjb250ZXh0LCBvdXQgVG9rZW4gdG9rZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnLycgJiYgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KGNvbnRleHQuUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpID09ICcvJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uVGVtcGxhdGUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICdcXG4nIHx8IChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICdcXHInICYmXHJcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPiggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LDEpLkZpcnN0KCkgPT0gJ1xcbicpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuTWFwQWN0aXZlLlBlZWsoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uU2VwYXJhdG9yKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJywnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goIWNvbnRleHQuU2V0dGluZ3MuSGFzRmxhZyhTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICc6JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICdcXFxcJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uVGVtcGxhdGUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IF90b2tlbkJyYWNrZXRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdG9rZW5TZXBhcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkgKyBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oeC5QbGFpbklucHV0LDEpLkZpcnN0T3JEZWZhdWx0KCkuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5JbmNsdWRlLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgK1xyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LDEpLkZpcnN0T3JEZWZhdWx0KCkuVG9TdHJpbmcoKSkpIC8vaW5jbHVkZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5JbmNsdWRlKCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90b2tlbkVuZEluY2x1ZGUuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSkpIC8vb3BlcmF0b3JcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uT3BlcmF0b3IoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+ICFfdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF90b2tlbkJyYWNrZXRzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL2JyYWNrZXRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLkJyYWNrZXQoKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICcoJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnKSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1snOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goKCEoY29udGV4dC5MYXN0VG9rZW4gPT0gbnVsbCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gaXMgVG9rZW4uT3BlcmF0b3IpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbnRleHQuU2V0dGluZ3MgJiBTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICddJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAneyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0Lkxhc3RUb2tlbiA9PSBudWxsIHx8ICghY29udGV4dC5MYXN0VG9rZW4uVmFsdWUuRW5kc1dpdGgoXCIpXCIpICYmIGNvbnRleHQuTGFzdFRva2VuLlZhbHVlICE9IFwiPT5cIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTWFwQWN0aXZlLlB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goKGNvbnRleHQuU2V0dGluZ3MgJiBTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5NYXBBY3RpdmUuUHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd9JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5NYXBBY3RpdmUuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF90b2tlblNlcGFyYXRvcnMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSkpIC8vc2VwYXJhdG9yc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5TZXBhcmF0b3IoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5TdHJpbmdzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL3N0cmluZ3NcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB0b2tlbi5PcHRpbWl6YWJsZSA9IGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUGVlaygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJyQnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuLkN1c3RvbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4uT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2V0U3RyaW5nKHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4geCA9PiBfdG9rZW5CcmFja2V0cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdG9rZW5TZXBhcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90b2tlblN0cmluZ3MuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSArIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPih4LlBsYWluSW5wdXQsMSkuRmlyc3RPckRlZmF1bHQoKS5Ub1N0cmluZygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgR2V0U3RyaW5nKENvbnRleHQgY29udGV4dClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMCAmJiBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpICE9ICdcIicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgIT0gMClcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKSk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJ1wiJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpKTtcclxuICAgICAgICAgICAgICAgIEdldFN0cmluZyhjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLlJlbW92ZSgwLCAxKTtcclxuICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLlJlbW92ZShjb250ZXh0LlN0cmluZ0J1aWxkZXIuTGVuZ3RoIC0gMSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFRva2VuIEdldE5leHRUb2tlbihDb250ZXh0IGNvbnRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQ2xlYXIoKTtcclxuICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IGNvbnRleHQuU3RyaW5nQnVpbGRlcjtcclxuICAgICAgICAgICAgUmVtb3ZlU3BhY2VzKGNvbnRleHQuUGxhaW5JbnB1dCk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPT0gMCkgcmV0dXJuIG51bGw7XHJcbkdyZXlIYWNrQ29tcGlsZXIuVG9rZW4gdDtcbiAgICAgICAgICAgIEZ1bmM8Q29udGV4dCwgYm9vbD4gc2VwYXJhdG9yID0gR2V0U2VwYXJhdGlvblNlbGVjdG9yKGNvbnRleHQsIG91dCB0KTtcclxuICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2IuQXBwZW5kKGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCkpO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmICFzZXBhcmF0b3IoY29udGV4dCkpO1xyXG5cclxuICAgICAgICAgICAgc3RyaW5nIHRtcF92YWx1ZSA9IHNiLlRvU3RyaW5nKCk7XHJcbnN0cmluZyByZWdleDtcbk1hdGNoQ29sbGVjdGlvbiBtYXRjaGVzO1xuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUgdGVtcGxhdGU7XG4gICAgICAgICAgICBpZiAoISh0IGlzIFRva2VuLlN0cmluZykgJiYgSXNUZW1wbGF0ZSh0bXBfdmFsdWUsIG91dCByZWdleCwgb3V0IG1hdGNoZXMsIG91dCB0ZW1wbGF0ZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHQgPSBuZXcgVG9rZW4uVGVtcGxhdGUodGVtcGxhdGUsIG1hdGNoZXMsIHJlZ2V4LCBjb250ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfa2V5d29yZHMuQ29udGFpbnModG1wX3ZhbHVlKSAmJiAhKHQgaXMgVG9rZW4uU3RyaW5nKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdCA9IG5ldyBUb2tlbi5LZXl3b3JkKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0Lk9wdGltaXphYmxlICYmIGNvbnRleHQuSWdub3JlT3B0aW1pemUodC5WYWx1ZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHQuT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdC5WYWx1ZSA9IHRtcF92YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuXHJcbiAgICAgICAgICAgIHQuRW5kU3RhdGVtZW50ID0gSXNFbmRPZkxpbmUoY29udGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJzsnKSBjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgfVxyXG5wcml2YXRlIHN0YXRpYyBib29sIElzRW5kT2ZMaW5lKENvbnRleHQgY29udGV4dClcclxue1xyXG4gICAgcmV0dXJuIGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA9PSAwIHx8IF90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpICsgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KGNvbnRleHQuUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpLlRvU3RyaW5nKCkpIHx8IF90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpKTtcclxufSAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG4jaWYganNcclxuI2Vsc2VcclxudXNpbmcgU3lzdGVtLk5ldC5IdHRwO1xyXG4jZW5kaWZcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgY2xhc3MgQ29udGV4dFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFF1ZXVlPGNoYXI+IFBsYWluSW5wdXQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgVG9rZW4gUm9vdFRva2VuIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIFRva2VuIExhc3RUb2tlbiB7IGdldDsgc2V0OyB9XHJcbnB1YmxpYyBTdHJpbmdCdWlsZGVyIFN0cmluZ0J1aWxkZXJcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ0J1aWxkZXJzLlBlZWsoKTtcclxuICAgIH1cclxufVxyXG4gICAgICAgICAgICBpbnRlcm5hbCBTdHJpbmdCdWlsZGVyIENvZGVQcmVmaXggeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaW50ZXJuYWwgbG9uZyBicmFja2V0RGVwdGggPSAwO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBTdGFjazxTdHJpbmdCdWlsZGVyPiBzdHJpbmdCdWlsZGVycyA9IG5ldyBTdGFjazxTdHJpbmdCdWlsZGVyPigpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBTdGFjazxib29sPiBTaG91bGRPcHRpbWl6ZVN0cmluZyA9IG5ldyBTdGFjazxib29sPigpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBTdGFjazxib29sPiBNYXBBY3RpdmUgPSBuZXcgU3RhY2s8Ym9vbD4oKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgVmFyaWFibGVOYW1lUHJvdmlkZXIgbmFtZVByb3ZpZGVyID0gbmV3IFZhcmlhYmxlTmFtZVByb3ZpZGVyKCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIGJvb2wgb3B0aW1pemVFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGludGVybmFsIFNldHRpbmdzIFNldHRpbmdzID0gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLlNldHRpbmdzLk5vbmU7XHJcbiAgICAgICAgICAgIGludGVybmFsIEhhc2hTZXQ8c3RyaW5nPiBjdXN0b21JZ25vcmVPcHRpbWl6ZSA9IG5ldyBIYXNoU2V0PHN0cmluZz4oKTtcclxuI2lmIGpzXHJcbiNlbHNlXHJcbiAgICAgICAgICAgIGludGVybmFsIEh0dHBDbGllbnQgaHR0cENsaWVudCA9IG5ldyBIdHRwQ2xpZW50KCk7XHJcbiNlbmRpZlxyXG5wdWJsaWMgYm9vbCBJZ25vcmVPcHRpbWl6ZShzdHJpbmcgdmFsdWUpXHJcbntcclxuICAgIHJldHVybiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX2lnbm9yZU9wdGltaXplLkNvbnRhaW5zKHZhbHVlKSB8fCBjdXN0b21JZ25vcmVPcHRpbWl6ZS5Db250YWlucyh2YWx1ZSk7XHJcbn1cclxuICAgICAgICAgICAgcHVibGljIHZvaWQgQWRkVG9rZW4oVG9rZW4gdG9rZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChSb290VG9rZW4gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBSb290VG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICBMYXN0VG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBMYXN0VG9rZW4uTmV4dCA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuLlByZXYgPSBMYXN0VG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgTGFzdFRva2VuID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHVibGljIENvbnRleHQoU2V0dGluZ3Mgc2V0dGluZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICBQbGFpbklucHV0ID0gbmV3IFF1ZXVlPGNoYXI+KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcigpKTtcclxuICAgICAgICAgICAgICAgIENvZGVQcmVmaXggPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIFNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgTWFwQWN0aXZlLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RyaW5nIENvbXBpbGUoYm9vbCBvcHRpbWl6ZSA9IGZhbHNlLGJvb2wgaXNTdHJpbmdGb3JtYXQgPSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3B0aW1pemVFbmFibGVkID0gb3B0aW1pemU7XHJcbiAgICAgICAgICAgICAgICBTdHJpbmdCdWlsZGVyLkNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIFRva2VuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gUm9vdFRva2VuO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5PcHRpbWl6ZSh0aGlzLG9wdGltaXplKS5OZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUgPSBSb290VG9rZW47XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLkNvbXBpbGUodGhpcykuTmV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZ0Zvcm1hdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgQ29kZVByZWZpeC5BcHBlbmQoU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBDb2RlUHJlZml4LlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBTdHJpbmdCdWlsZGVyIHNiID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICAgICAgICAgIFRva2VuIG5vZGUgPSBSb290VG9rZW47XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgaXMgVG9rZW4uU3RyaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQoJ1wiJytub2RlLlZhbHVlKyAnXCInKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLkFwcGVuZChub2RlLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5FbmRTdGF0ZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQoJ1xcbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQoJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kTGluZShub2RlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLk5leHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNiLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGV4dC5SZWd1bGFyRXhwcmVzc2lvbnM7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgcGFydGlhbCBjbGFzcyBUb2tlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFRva2VuIFByZXYgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgVG9rZW4gTmV4dCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyB2aXJ0dWFsIHN0cmluZyBWYWx1ZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgQ3VzdG9tIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIHZpcnR1YWwgYm9vbCBTdXBwb3J0c011bHRpTGluZUJyYWNrZXQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBPcHRpbWl6YWJsZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHByaXZhdGUgYm9vbCBfZW5kU3RhdGVtZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIEVuZFN0YXRlbWVudCB7IGdldHtcclxuICAgICAgICAgICAgICAgIGlmIChGb3JjZUVuZFN0YXRlbWVudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRm9yY2VFbmRTdGF0ZW1lbnRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2VuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2V0IHsgX2VuZFN0YXRlbWVudCA9IHZhbHVlOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHVibGljIGJvb2wgRm9yY2VFbmRTdGF0ZW1lbnQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBGb3JjZUVuZFN0YXRlbWVudFZhbHVlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyB2aXJ0dWFsIFRva2VuIE9wdGltaXplKENvbnRleHQgY29udGV4dCxib29sIHJlcGxhY2UgPSB0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT3B0aW1pemFibGUgJiYgLy9mbGFnIGZyb20gdG9rZW5pemF0aW9uICBcclxuICAgICAgICAgICAgICAgICAgICBWYWx1ZS5MZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIWNoYXIuSXNEaWdpdChWYWx1ZVswXSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAhY29udGV4dC5JZ25vcmVPcHRpbWl6ZShWYWx1ZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcGxhY2UpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IGNvbnRleHQubmFtZVByb3ZpZGVyLkdldFJlcGxhY2UoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lm5hbWVQcm92aWRlci5EZWZpbmUoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgdmlydHVhbCBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yV2hpdGVTcGFjZShWYWx1ZSkpIHJldHVybiB0aGlzO1xyXG5CcmFja2V0IGI7ICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LlN0cmluZ0J1aWxkZXIuTGVuZ3RoICE9IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAoKFJlZ2V4LklzTWF0Y2goY29udGV4dC5TdHJpbmdCdWlsZGVyW2NvbnRleHQuU3RyaW5nQnVpbGRlci5MZW5ndGggLSAxXS5Ub1N0cmluZygpLCBcIlxcXFx3XCIpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICBWYWx1ZS5MZW5ndGggPiAwICYmIFJlZ2V4LklzTWF0Y2goVmFsdWVbMF0uVG9TdHJpbmcoKSwgXCJcXFxcd1wiKSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgKFByZXYgIT0gbnVsbCAmJiBQcmV2IGlzIEtleXdvcmQgJiYgKGIgPSB0aGlzIGFzIEJyYWNrZXQpICE9IG51bGwmJiAoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxjaGFyPihiLlZhbHVlKSA9PSAnKCcgfHwgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxjaGFyPihiLlZhbHVlKSA9PSAnWycpKSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKEVuZFN0YXRlbWVudCAmJiBOZXh0ICE9IG51bGwgJiYgIWZvcmNlKSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKF9zZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHByaXZhdGUgYm9vbCBDb21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShzdHJpbmcgcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHMuTGVuZ3RoID4gVmFsdWUuTGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlW2ldICE9IHNbaV0pIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJpdmF0ZSBib29sIENvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKGNoYXIgYylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKFZhbHVlLkxlbmd0aDwxKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVmFsdWVbMF0gPT0gYztcclxuICAgICAgICAgICAgfVxyXG5cbiAgICAgICAgXG5wcml2YXRlIGJvb2wgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1N1cHBvcnRzTXVsdGlMaW5lQnJhY2tldD1mYWxzZTtwcml2YXRlIGJvb2wgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX09wdGltaXphYmxlPXRydWU7fVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBjbGFzcyBWYXJpYWJsZU5hbWVQcm92aWRlclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgRGljdGlvbmFyeTxzdHJpbmcsc3RyaW5nPiBfcmVwbGFjZSA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgc3RyaW5nPigpO1xyXG4gICAgICAgIHByaXZhdGUgSGFzaFNldDxzdHJpbmc+IF9uYW1lcyA9IG5ldyBIYXNoU2V0PHN0cmluZz4oKTtcclxuICAgICAgICBwcml2YXRlIGludCBfc3RhdGU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX2NoYXJzID0gXCJhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgTmV4dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTdHJpbmdCdWlsZGVyIHNiID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICAgICAgaW50IGluZGV4ID0gX3N0YXRlO1xyXG5cclxuICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IGkgPSBpbmRleCAlIF9jaGFycy5MZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBjaGFyIGMgPSBfY2hhcnNbaV07XHJcbiAgICAgICAgICAgICAgICBzYi5BcHBlbmQoYyk7XHJcbiAgICAgICAgICAgICAgICBpbmRleCAvPSBfY2hhcnMuTGVuZ3RoO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChpbmRleCA+IDApO1xyXG5cclxuICAgICAgICAgICAgX3N0YXRlKys7XHJcbiAgICAgICAgICAgIHJldHVybiBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRGcmVlKGJvb2wgb3B0aW1pemUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHJpbmcgbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGJvb2wgYztcclxuICAgICAgICAgICAgaWYgKG9wdGltaXplKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgcyA9IE5leHQoKTtcclxuICAgICAgICAgICAgICAgIF9uYW1lcy5BZGQocyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gTmV4dCgpO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChfbmFtZXMuQ29udGFpbnMobmFtZSkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRGVmaW5lZChzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfcmVwbGFjZS5Db250YWluc0tleShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRSZXBsYWNlKHN0cmluZyBvcmlnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFfcmVwbGFjZS5Db250YWluc0tleShvcmlnKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nIHMgPSBOZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBfcmVwbGFjZVtvcmlnXSA9IHM7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIF9yZXBsYWNlW29yaWddO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRGVmaW5lKHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFfbmFtZXMuQ29udGFpbnMobmFtZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9uYW1lcy5BZGQobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBWYXJpYWJsZSA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG5CcmFja2V0IGJyOyAgICAgICAgICAgICAgICAgICAgaWYgKChiciA9IHRoaXMgYXMgQnJhY2tldCkgIT0gbnVsbCYmICFici5DdXN0b20gJiYgKGJyLlZhbHVlLkxlbmd0aCA9PSAwIHx8IGJyLlZhbHVlWzBdICE9ICd7JykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoTmV4dCAhPSBudWxsICYmICFHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Y2hhcj4oVmFsdWUpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKE5leHQuVmFsdWUgPT0gXCIuXCIgfHwgTmV4dC5WYWx1ZSA9PSBcIihcIiB8fCBOZXh0LlZhbHVlID09IFwiW1wiKSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIoVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5leHQuVmFsdWUgPT0gXCIuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBOZXh0Lk5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCcuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZXh0IT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LkNvbXBpbGUoY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSBOZXh0LkVuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcmNlRW5kU3RhdGVtZW50ID0gTmV4dC5Gb3JjZUVuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcmNlRW5kU3RhdGVtZW50VmFsdWUgPSBOZXh0LkZvcmNlRW5kU3RhdGVtZW50VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gTmV4dC5OZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LlByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuT3BlcmF0b3IgbztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dCAhPSBudWxsICYmIChvID0gTmV4dCBhcyBPcGVyYXRvcikgIT0gbnVsbCYmIG8uTmVlZHNMZWZ0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IGJhc2UuQ29tcGlsZShjb250ZXh0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbk9wZXJhdG9yIG9vO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChQcmV2ICE9IG51bGwgJiYgKG9vID0gUHJldiBhcyBPcGVyYXRvcikgIT0gbnVsbCYmIG9vLk5lZWRzUmlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gYmFzZS5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJWYXJpYWJsZTogezB9XCIsYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBJbmNsdWRlIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIEluY2x1ZGUoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiNpZiBqc1xyXG5cclxuI2Vsc2VcclxuICAgICAgICAgICAgICAgICAgICBpZiAoRW52aXJvbm1lbnQuT1NWZXJzaW9uLlBsYXRmb3JtID09IFBsYXRmb3JtSUQuT3RoZXIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IFwiLy9pbmNsdWRlIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gd2ViXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlID0gY29udGV4dC5odHRwQ2xpZW50LkdldFN0cmluZ0FzeW5jKFZhbHVlKS5HZXRBd2FpdGVyKCkuR2V0UmVzdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4jZW5kaWZcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiSW5jbHVkZTogezB9XCIsYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgcGFydGlhbCBjbGFzcyBUb2tlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIEtleXdvcmQgOiBUb2tlblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgS2V5d29yZCgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgR3JleUhhY2tDb21waWxlci5Ub2tlbiBPcHRpbWl6ZShHcmV5SGFja0NvbXBpbGVyLkNvbnRleHQgY29udGV4dCwgYm9vbCByZXBsYWNlID0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWUgPT0gXCJ0cnVlXCIpIFZhbHVlID0gXCIxXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlID09IFwiZmFsc2VcIikgVmFsdWUgPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5PcHRpbWl6ZShjb250ZXh0LHJlcGxhY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoVmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZWxzZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3VwcG9ydHNNdWx0aUxpbmVCcmFja2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZm9yXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3aGlsZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWZcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbXBpbGVOZXh0KGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3VwcG9ydHNNdWx0aUxpbmVCcmFja2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbXBpbGVOZXh0KGNvbnRleHQsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3VwcG9ydHNNdWx0aUxpbmVCcmFja2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHZvaWQgQ29tcGlsZU5leHQoQ29udGV4dCBjb250ZXh0LGJvb2wgcmVtb3ZlQnJhY2V0cyA9IHRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoTmV4dCBpcyBCcmFja2V0KSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIE5leHQuQ29tcGlsZShjb250ZXh0LHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW1vdmVCcmFjZXRzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyWzBdID0gJyAnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSArPSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoMCwgY29udGV4dC5TdHJpbmdCdWlsZGVyLkxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSArPSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dC5OZXh0IT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5OZXh0LlByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gTmV4dC5FbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgTmV4dCA9IE5leHQuTmV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgU2VwYXJhdG9yIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIFNlcGFyYXRvcigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiU2VwYXJhdG9yOiB7MH1cIixWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgcGFydGlhbCBjbGFzcyBUb2tlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIFN0cmluZyA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChDdXN0b20pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiKFxcXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBkZXB0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBsYXN0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBWYWx1ZS5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgKyAxIDwgVmFsdWUuTGVuZ3RoICYmIFZhbHVlW2ldID09ICdcXFxcJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChWYWx1ZVtpICsgMV0gPT0gJ3snIHx8IFZhbHVlW2kgKyAxXSA9PSAnfScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZVtpXSA9PSAneycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoID09IDApIGxhc3QgPSBpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXB0aCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFZhbHVlW2ldID09ICd9JyAmJiAoaSA9PSAwIHx8IFZhbHVlW2kgLSAxXSAhPSAnXFxcXCcpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoIDwgMCkgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwic3RyaW5nIGZvcm1hdCAoezB9KSBpcyBub3QgdmFsaWRcIixWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChcIlxcXCIrKFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29udGV4dCBpbm5lckNvZGVDb250ZXh0ID0gVG9rZW5pemUoVmFsdWUuU3Vic3RyaW5nKGxhc3QsIGkgLSBsYXN0KS5SZXBsYWNlKEBcIlwiXCJcIlwiXCIsIEBcIlwiXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckNvZGVDb250ZXh0Lm5hbWVQcm92aWRlciA9IGNvbnRleHQubmFtZVByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckNvZGVDb250ZXh0LkNvZGVQcmVmaXggPSBjb250ZXh0LkNvZGVQcmVmaXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBjb21waWxlZCA9IGlubmVyQ29kZUNvbnRleHQuQ29tcGlsZShjb250ZXh0Lm9wdGltaXplRW5hYmxlZCx0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb21waWxlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoXCIpK1xcXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGVwdGggPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiXFxcIilcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEVuZFN0YXRlbWVudCkgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChfc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIlN0cmluZzogezB9ezF9XCIsKEN1c3RvbSA/IFwiJFwiIDogXCJcIiksYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBCcmFja2V0IDogVmFyaWFibGVcclxuICAgICAgICAgICAge1xyXG5wdWJsaWMgYm9vbCBJc09wZW5pbmdcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFZhbHVlID09IFwiKFwiIHx8IFZhbHVlID09IFwiW1wiIHx8IFZhbHVlID09IFwie1wiO1xyXG4gICAgfVxyXG59cHVibGljIGJvb2wgSXNDbG9zaW5nXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBWYWx1ZSA9PSBcIilcIiB8fCBWYWx1ZSA9PSBcIl1cIiB8fCBWYWx1ZSA9PSBcIn1cIjtcclxuICAgIH1cclxufVxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBEaWN0aW9uYXJ5PGNoYXIsIGNoYXI+IF9vcGVuaW5nVG9DbG9zaW5nID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8Y2hhciwgY2hhcj4oKSwoX28xKT0+e19vMS5BZGQoJygnLCcpJyk7X28xLkFkZCgnWycsJ10nKTtfbzEuQWRkKCd7JywnfScpO3JldHVybiBfbzE7fSk7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgQnJhY2tldCgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIFRva2VuIENvbXBpbGVJbnNpZGUoQ29udGV4dCBjb250ZXh0LCBib29sIG11bHRpTGluZSA9IGZhbHNlLCBzdHJpbmcgcHJlZml4ID0gXCJcIiwgc3RyaW5nIHBvc3RmaXggPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRva2VuIGxhc3QgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIFRva2VuIGN1cnJlbnQgPSBOZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcihwcmVmaXgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGFyIGNsb3NlID0gX29wZW5pbmdUb0Nsb3NpbmdbU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxjaGFyPihWYWx1ZSldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoY3VycmVudCE9bnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbXVsdGlMaW5lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50LkZvcmNlRW5kU3RhdGVtZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuRm9yY2VFbmRTdGF0ZW1lbnRWYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudC5FbmRTdGF0ZW1lbnQgPSBjdXJyZW50LkVuZFN0YXRlbWVudCB8fCBjdXJyZW50Lk5leHQuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoY2xvc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0ID0gY3VycmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoY2xvc2UpKSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudC5Db21waWxlKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5OZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3QuTmV4dCAhPSBudWxsICYmIGxhc3QuTmV4dC5WYWx1ZSA9PSBcImVsc2VcIiAmJiBtdWx0aUxpbmUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0LlZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdC5Gb3JjZUVuZFN0YXRlbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3QuRm9yY2VFbmRTdGF0ZW1lbnRWYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghc3RyaW5nLklzTnVsbE9yV2hpdGVTcGFjZShwb3N0Zml4KSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3QuVmFsdWUgPSBwb3N0Zml4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsYXN0LkZvcmNlRW5kU3RhdGVtZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0LkZvcmNlRW5kU3RhdGVtZW50VmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0LkNvbXBpbGUoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdC5Gb3JjZUVuZFN0YXRlbWVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIEVuZFN0YXRlbWVudCA9IGxhc3QuRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIFZhbHVlID0gY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGFzdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKElzT3BlbmluZylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2tldERlcHRoKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoSXNDbG9zaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5icmFja2V0RGVwdGgtLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEN1c3RvbSkgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKElzT3BlbmluZylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRva2VuIG5vZGUgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYgIT0gbnVsbCAmJiBWYWx1ZSA9PSBcIntcIiAmJiBQcmV2LlN1cHBvcnRzTXVsdGlMaW5lQnJhY2tldClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHByZWZpeCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgcG9zdGZpeCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUHJldi5WYWx1ZSA9PSBcImVsc2VcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0Zml4ID0gXCJlbmQgaWZcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFByZXYuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoXCJpZlwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXggPSBcInRoZW5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0Zml4ID0gXCJlbmQgaWZcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoUHJldi5WYWx1ZSA9PSBcIj0+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGZ1bmN0aW9uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChQcmV2LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiZnVuY3Rpb25cIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGZ1bmN0aW9uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKFByZXYuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoXCJmb3JcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGZvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoUHJldi5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcIndoaWxlXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RmaXggPSBcImVuZCB3aGlsZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBDb21waWxlSW5zaWRlKGNvbnRleHQsIHRydWUsIHByZWZpeCtcIlxcblwiLCBwb3N0Zml4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBDb21waWxlSW5zaWRlKGNvbnRleHQsZmFsc2UsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gbm9kZSE9bnVsbD9ub2RlLk5leHQ6KFRva2VuKW51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoUHJldiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlJvb3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2Lk5leHQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG5vZGUhPW51bGw/bm9kZS5OZXh0OihUb2tlbiludWxsKSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLk5leHQuUHJldiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN1c3RvbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBDb21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiQnJhY2tldDogezB9XCIsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgR3JleUhhY2tUb29scy5EZWJ1Z2dlcjtcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgT3BlcmF0b3IgOiBWYXJpYWJsZVxyXG4gICAgICAgICAgICB7XHJcbnB1YmxpYyBib29sIE5lZWRzTGVmdFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl9vcGVyYXRvcnMuQ29udGFpbnNLZXkoVmFsdWUpICYmIF9vcGVyYXRvcnNbVmFsdWVdLkNvbnRhaW5zKFwiJGFcIik7XHJcbiAgICB9XHJcbn1wdWJsaWMgYm9vbCBOZWVkc1JpZ2h0XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX29wZXJhdG9ycy5Db250YWluc0tleShWYWx1ZSkgJiYgX29wZXJhdG9yc1tWYWx1ZV0uQ29udGFpbnMoXCIkYlwiKTtcclxuICAgIH1cclxufSAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBDdXN0b21cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXQgeyByZXR1cm4gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl9vcGVyYXRvcnMuQ29udGFpbnNLZXkoVmFsdWUpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0IHsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBPcGVyYXRvcigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChDdXN0b20pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWUgPT0gXCI9PlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdXBwb3J0c011bHRpTGluZUJyYWNrZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmcgZGVwdGggPSBjb250ZXh0LmJyYWNrZXREZXB0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGxlZnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgcmlnaHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb2tlbiB0bXBSaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRva2VuIHRtcExlZnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgcyA9IF9vcGVyYXRvcnNbVmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmVlZHNMZWZ0ICYmIFByZXYgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5CcmFja2V0IGI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYiA9IFByZXYgYXMgQnJhY2tldCkgIT0gbnVsbCYmIGIuSXNPcGVuaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcImludmFsaWQgc3ludGF4IGZvciB0ZW1wbGF0ZSB7MH1cIixWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wTGVmdCA9IFByZXYuQ29tcGlsZShjb250ZXh0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgPSBzLlJlcGxhY2UoXCIkYVwiLCBsZWZ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MVwiLFByZXYpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxUb2tlbj4oXCJrZXkxXCIpLlByZXY6KFRva2VuKW51bGwpICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldiA9IFByZXYuUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2Lk5leHQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUm9vdFRva2VuID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5lZWRzUmlnaHQgJiYgTmV4dCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBSaWdodCA9IE5leHQuQ29tcGlsZShjb250ZXh0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzID0gcy5SZXBsYWNlKFwiJGJcIiwgcmlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZFN0YXRlbWVudCA9IE5leHQuRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChnbG9iYWw6OkJyaWRnZS5TY3JpcHQuVG9UZW1wKFwia2V5MlwiLE5leHQpIT1udWxsP2dsb2JhbDo6QnJpZGdlLlNjcmlwdC5Gcm9tVGVtcDxUb2tlbj4oXCJrZXkyXCIpLk5leHQ6KFRva2VuKW51bGwpICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dCA9IE5leHQuTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LlByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTGFzdFRva2VuID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlPT1cIj0+XCIgJiYgdG1wTGVmdC5QcmV2ICE9IG51bGwgJiYgdG1wTGVmdC5QcmV2LlZhbHVlICE9IFwiPVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgbmFtZSA9IGNvbnRleHQubmFtZVByb3ZpZGVyLkdldEZyZWUoY29udGV4dC5vcHRpbWl6ZUVuYWJsZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBcIkBcIiArIG5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LkNvZGVQcmVmaXguQXBwZW5kKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Db2RlUHJlZml4LkFwcGVuZChcIj1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LkNvZGVQcmVmaXguQXBwZW5kTGluZShzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZFN0YXRlbWVudCA9IHRtcFJpZ2h0LkVuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCxmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IHM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiT3BlcmF0b3I6IHswfVwiLGJhc2UuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGV4dC5SZWd1bGFyRXhwcmVzc2lvbnM7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgcGFydGlhbCBjbGFzcyBUb2tlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIFRlbXBsYXRlIDogVmFyaWFibGVcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBWYWx1ZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKF92YWx1ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc3RyaW5nIF92YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgRVRlbXBsYXRlIFRlbXBsYXRlVHlwZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgc3RyaW5nIFJlZ2V4U3RyaW5nIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBNYXRjaENvbGxlY3Rpb24gTWF0Y2hlcyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gT3B0aW1pemUoQ29udGV4dCBjb250ZXh0LCBib29sIHJlcGxhY2UgPSB0cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoVGVtcGxhdGVUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuRVRlbXBsYXRlLkl0ZXJhdGlvbkluZGV4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcGxhY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHZhcl9uYW1lID0gTWF0Y2hlc1swXS5Hcm91cHNbMl0uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPcldoaXRlU3BhY2UodmFyX25hbWUpIHx8IGNvbnRleHQuSWdub3JlT3B0aW1pemUodmFyX25hbWUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdmFsdWUgPSBSZWdleC5SZXBsYWNlKFZhbHVlLCBSZWdleFN0cmluZyxcclxuc3RyaW5nLkZvcm1hdChcIiQxezB9JDNcIixjb250ZXh0Lm5hbWVQcm92aWRlci5HZXRSZXBsYWNlKHZhcl9uYW1lKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuSWdub3JlT3B0aW1pemF0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoVGVtcGxhdGVUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuRVRlbXBsYXRlLkNvbW1lbnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvbnRleHQuU2V0dGluZ3MgJiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuU2V0dGluZ3MuUmVtb3ZlQ29tbWVudHMpICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYuTmV4dCA9IE5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghUHJldi5FbmRTdGF0ZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYuRW5kU3RhdGVtZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoX3NlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Sb290VG9rZW4gPSBOZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5leHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQuUHJldiA9IFByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTGFzdFRva2VuID0gUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoUHJldiE9bnVsbCAmJiBOZXh0IT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgUHJldi5OZXh0ID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgTmV4dC5QcmV2ID0gUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZExpbmUoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBib29sIElzVmFsdWVTdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZS5MZW5ndGggPCAyKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbHVlWzBdID09ICdcIicgJiYgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5MYXN0T3JEZWZhdWx0PGNoYXI+KFZhbHVlKSA9PSAnXCInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBUZW1wbGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIFRlbXBsYXRlKEVUZW1wbGF0ZSB0ZW1wbGF0ZSwgTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXMsIHN0cmluZyByZWdleCwgQ29udGV4dCBjb250ZXh0KSA6IGJhc2UoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRlbXBsYXRlVHlwZSA9IHRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIE1hdGNoZXMgPSBtYXRjaGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlZ2V4U3RyaW5nID0gcmVnZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGVtcGxhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuSWdub3JlT3B0aW1pemF0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbHVlID0gTWF0Y2hlc1swXS5Hcm91cHNbMl0uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNWYWx1ZVN0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9IF92YWx1ZS5TdWJzdHJpbmcoMSwgX3ZhbHVlLkxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZShfdmFsdWUpKSBjb250ZXh0LmN1c3RvbUlnbm9yZU9wdGltaXplLkFkZChfdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9ICdcIicgKyBfdmFsdWUgKyAnXCInO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZShNYXRjaGVzWzBdLkdyb3Vwc1syXS5WYWx1ZSkpIGNvbnRleHQuY3VzdG9tSWdub3JlT3B0aW1pemUuQWRkKE1hdGNoZXNbMF0uR3JvdXBzWzJdLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K

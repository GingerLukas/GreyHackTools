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
                            return !(context.PlainInput.Peek() === 10 || (context.PlainInput.Count > 1 && context.PlainInput.Peek() === 13 && System.Linq.Enumerable.from(context.PlainInput, System.Char).skip(1).first() === 10));
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
            Compile: function (optimize) {
                if (optimize === void 0) { optimize = false; }
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
                    case "for": 
                    case "while": 
                    case "if": 
                        this.CompileNext(context);
                        break;
                    case "function": 
                        this.CompileNext(context, false);
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
            Optimize: function (context, replace) {
                if (replace === void 0) { replace = true; }
                switch (this.TemplateType) {
                    case GreyHackTools.GreyHackCompiler.ETemplate.IterationIndex: 
                        if (this.Prev != null && Bridge.referenceEquals(this.Prev.Value, ".")) {
                            return GreyHackTools.GreyHackCompiler.Token.prototype.Optimize.call(this, context, replace);
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

                if (this.Prev != null && this.Next != null) {
                    this.Prev.Next = this.Next;
                    this.Next.Prev = this.Prev;
                    context.StringBuilder.appendLine(this.Value);
                }
                return this;
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

                if (last.Next != null && last.Next.CompareBeginningOfValue$1("else")) {
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
                var elseFlag = false;
                var lambdaFlag = false;
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

                    if (this.Prev != null && Bridge.referenceEquals(this.Value, "{") && ((Bridge.is(this.Prev, GreyHackTools.GreyHackCompiler.Token.Keyword) || ((lambdaFlag = Bridge.referenceEquals(this.Prev.Value, "=>")))) || ((elseFlag = this.Prev.CompareBeginningOfValue$1("else"))))) {
                        var prefix = "";
                        var postfix = "";
                        if (elseFlag || this.Prev.CompareBeginningOfValue$1("else")) {
                            postfix = "end if";
                        } else if (this.Prev.CompareBeginningOfValue$1("if")) {
                            prefix = "then";
                            postfix = "end if";
                        } else if (lambdaFlag) {
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
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJKc01TcHBDb21waWxlci5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiRGVidWdnZXIvR3JleUhhY2tFbXVsYXRpb24vTUQ1LmNzIiwiQ29tcGlsZXIvR3JleUhhY2tDb21waWxlci5jcyIsIkNvbXBpbGVyL0NvbnRleHQuY3MiLCJDb21waWxlci9Ub2tlbnMvVG9rZW4uY3MiLCJDb21waWxlci9WYXJpYWJsZU5hbWVQcm92aWRlci5jcyIsIkNvbXBpbGVyL1Rva2Vucy9WYXJpYWJsZS5jcyIsIkNvbXBpbGVyL1Rva2Vucy9JbmNsdWRlLmNzIiwiQ29tcGlsZXIvVG9rZW5zL0tleXdvcmQuY3MiLCJDb21waWxlci9Ub2tlbnMvU2VwYXJhdG9yLmNzIiwiQ29tcGlsZXIvVG9rZW5zL1N0cmluZy5jcyIsIkNvbXBpbGVyL1Rva2Vucy9UZW1wbGF0ZS5jcyIsIkNvbXBpbGVyL1Rva2Vucy9CcmFja2V0LmNzIiwiQ29tcGlsZXIvVG9rZW5zL09wZXJhdG9yLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OzZCQVV5QkE7NkJBVUNBOzs7O3NDQWtCWUEsR0FBUUE7b0JBRWxDQSxPQUFPQSxHQUFDQSxPQUFLQSxhQUFLQSxDQUFDQSxNQUFLQSxDQUFDQSxPQUFLQTs7cUNBSUhBO29CQUUzQkE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7O29CQUVBQSxnQkFBZ0JBLENBQUNBLE9BQUtBLENBQUNBLENBQUNBO29CQUN4QkEscUJBQXFCQSxrQkFBU0EsK0JBQW1CQTtvQkFDakRBLGtCQUFXQSxVQUFPQSxtQkFBZ0JBO29CQUNsQ0Esa0NBQWVBLGNBQWZBOztvQkFFQUEsYUFBZ0JBLCtCQUFzQkE7b0JBQ3RDQSxrQkFBV0EsV0FBV0EsZ0JBQWdCQTs7b0JBRXRDQSxLQUFLQSxXQUFXQSxJQUFJQSxtREFBOEJBO3dCQUc5Q0EsUUFBV0E7d0JBQ1hBLEtBQUtBLFdBQVdBLFFBQVVBOzRCQUN0QkEs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NEJBQXdCQTs0QkFBd0JBOzRCQUFvQkE7NEJBQWtCQTs0QkFBd0JBOzRCQUF1QkE7NEJBQXdCQTs0QkFBMEJBOzRCQUFvQkE7NEJBQXNCQTs0QkFBZ0JBOzRCQUFpQkE7NEJBQTBCQTs0QkFBcUJBOzRCQUF1QkE7NEJBQXNCQTs0QkFBcUJBOzRCQUFzQkE7NEJBQXFCQTs0QkFBbUJBOzRCQUFpQkE7NEJBQWtCQTs0QkFBb0JBOzRCQUEwQkE7NEJBQXlCQTs0QkFBdUJBOzRCQUFtQkE7NEJBQW1CQTs0QkFBcUJBOzRCQUFxQkE7NEJBQXFCQTs0QkFBcUJBOzRCQUE2QkE7NEJBQXVCQTs0QkFBZ0JBOzRCQUF1QkE7NEJBQWtCQTs0QkFBZUE7NEJBQW9CQTs0QkFBZ0JBOzRCQUFvQkE7NEJBQWtCQTs0QkFBaUJBOzRCQUFlQTs0QkFBZ0JBOzRCQUFnQkE7NEJBQW1CQTs0QkFBMkJBOzRCQUEyQkE7NEJBQW9CQTs0QkFBb0JBOzRCQUFpQkE7NEJBQWtCQTs0QkFBdUJBOzRCQUFnQkE7NEJBQXVCQTs0QkFBY0E7NEJBQWdCQTs0QkFBcUJBOzRCQUFlQTs0QkFBcUJBOzRCQUF1QkE7NEJBQWlCQTs0QkFBd0JBOzRCQUFxQkE7NEJBQWdCQTs0QkFBZ0JBOzRCQUFlQTs0QkFBaUJBOzRCQUFrQkE7NEJBQWtCQTs0QkFBbUJBOzRCQUFtQkE7NEJBQWVBOzRCQUFpQkE7NEJBQWdCQTs0QkFBd0JBOzRCQUFlQTs0QkFBdUJBOzRCQUFxQkE7NEJBQXNCQTs0QkFBbUJBOzRCQUFnQkE7NEJBQWVBOzRCQUFnQkE7NEJBQWlCQTs0QkFBMEJBOzRCQUFnQkE7NEJBQWlCQTs0QkFBZ0JBOzRCQUEwQkE7NEJBQWVBOzRCQUFlQTs0QkFBZUE7NEJBQWtCQTs0QkFBaUJBOzRCQUFnQkE7NEJBQWtCQTs0QkFBaUJBOzRCQUFzQkE7NEJBQTRCQTs0QkFBc0JBOzRCQUE2QkE7NEJBQWVBOzRCQUFrQkE7NEJBQW1CQTs0QkFBaUJBOzRCQUF5QkE7NEJBQWtCQTs0QkFBd0JBOzRCQUFnQkE7NEJBQWdCQTs0QkFBZ0JBOzRCQUFvQkE7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O3dCQUNoQ0EsVUFBVUEsa0JBQWFBO3dCQUN2QkEsT0FBT0E7d0JBQ1BBLElBQUlBLGtDQUFnQkE7d0JBQ3BCQTs7d0JBRUFBLElBQUlBLENBQUNBLE1BQW9DQSxjQUFPQSxPQUFLQSxVQUFtREEsQUFBT0EsU0FBU0E7NEJBRXBIQSxZQUFPQTs0QkFDUEEsaUJBQVlBOzs0QkFJWkEsb0JBQW9CQTs7OztvQkFJNUJBLElBQUlBLG1CQUFjQSxhQUFRQTt3QkFFdEJBLDRCQUE0QkEsSUFBSUE7d0JBQ2hDQSxXQUFXQSxrQkFBYUE7d0JBQ3hCQSxRQUFRQTt3QkFDUkEsSUFBSUEsa0NBQWdCQTt3QkFDcEJBO3dCQUNBQSxvQkFBZUE7d0JBQ2ZBLElBQUlBLENBQUNBLE9BQW9DQSxjQUFPQSxPQUFLQSxXQUFtREEsQUFBT0EsU0FBU0E7NEJBRXBIQSxZQUFPQTs0QkFDUEEsaUJBQVlBOzs0QkFJWkEsWUFBT0E7NEJBQ1BBLG9CQUFvQkE7Ozs7b0JBSTVCQSxJQUFJQSw0Q0FBZUEsZ0JBQWdCQSxRQUFRQTt3QkFFdkNBLFdBQWNBLDZCQUE2QkE7d0JBQzNDQSxhQUFRQSxPQUFNQTt3QkFDZEEsMEJBQTBCQTt3QkFDMUJBO3dCQUNBQSw4QkFBOEJBO3dCQUM5QkEsb0JBQWVBO3dCQUNmQSxPQUFPQSwyRUFBYUEsU0FBUUE7O3dCQUk1QkEsYUFBUUE7O3dCQUVSQSxPQUFPQSwyRUFBYUEsU0FBU0E7OztvQkFLakNBLE9BQU9BLDJFQUFhQSxTQUFTQTs7OztnQkFNakNBLE9BQU9BLHVDQUE4QkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzLkRlYnVnZ2VyXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNRDVcclxuICAgIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIFJvdW5kIHNoaWZ0IHZhbHVlc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXRpYyBpbnRbXSBzID0gbmV3IGludFs2NF0ge1xyXG4gICAgICAgICAgICA3LCAxMiwgMTcsIDIyLCAgNywgMTIsIDE3LCAyMiwgIDcsIDEyLCAxNywgMjIsICA3LCAxMiwgMTcsIDIyLFxyXG4gICAgICAgICAgICA1LCAgOSwgMTQsIDIwLCAgNSwgIDksIDE0LCAyMCwgIDUsICA5LCAxNCwgMjAsICA1LCAgOSwgMTQsIDIwLFxyXG4gICAgICAgICAgICA0LCAxMSwgMTYsIDIzLCAgNCwgMTEsIDE2LCAyMywgIDQsIDExLCAxNiwgMjMsICA0LCAxMSwgMTYsIDIzLFxyXG4gICAgICAgICAgICA2LCAxMCwgMTUsIDIxLCAgNiwgMTAsIDE1LCAyMSwgIDYsIDEwLCAxNSwgMjEsICA2LCAxMCwgMTUsIDIxXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBDb25zdGFudCBLIFZhbHVlc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXRpYyB1aW50W10gSyA9IG5ldyB1aW50WzY0XSB7XHJcbiAgICAgICAgICAgIDB4ZDc2YWE0NzgsIDM5MDU0MDI3MTBVLCA2MDYxMDU4MTksIDMyNTA0NDE5NjZVLFxyXG4gICAgICAgICAgICAweGY1N2MwZmFmLCAweDQ3ODdjNjJhLCAweGE4MzA0NjEzLCAweGZkNDY5NTAxLFxyXG4gICAgICAgICAgICAweDY5ODA5OGQ4LCAyMzM2NTUyODc5VSwgNDI5NDkyNTIzM1UsIDIzMDQ1NjMxMzRVLFxyXG4xODA0NjAzNjgyLCAweGZkOTg3MTkzLCAweGE2Nzk0MzhlLCAxMjM2NTM1MzI5LFxyXG4gICAgICAgICAgICAweGY2MWUyNTYyLCAzMjI1NDY1NjY0VSwgMHgyNjVlNWE1MSwgMzkyMTA2OTk5NFUsXHJcbiAgICAgICAgICAgIDB4ZDYyZjEwNWQsIDB4MDI0NDE0NTMsIDB4ZDhhMWU2ODEsIDM4ODk0Mjk0NDhVLFxyXG4gICAgICAgICAgICAweDIxZTFjZGU2LCAweGMzMzcwN2Q2LCAweGY0ZDUwZDg3LCAweDQ1NWExNGVkLFxyXG4gICAgICAgICAgICAweGE5ZTNlOTA1LCAweGZjZWZhM2Y4LCAweDY3NmYwMmQ5LCAweDhkMmE0YzhhLFxyXG4gICAgICAgICAgICAweGZmZmEzOTQyLCAweDg3NzFmNjgxLCAweDZkOWQ2MTIyLCAweGZkZTUzODBjLFxyXG4yNzYzOTc1MjM2VSwgMTI3Mjg5MzM1MywgNDEzOTQ2OTY2NFUsIDMyMDAyMzY2NTZVLFxyXG42ODEyNzkxNzQsIDB4ZWFhMTI3ZmEsIDB4ZDRlZjMwODUsIDB4MDQ4ODFkMDUsXHJcbiAgICAgICAgICAgIDB4ZDlkNGQwMzksIDM4NzMxNTE0NjFVLCAweDFmYTI3Y2Y4LCAweGM0YWM1NjY1LFxyXG4gICAgICAgICAgICAweGY0MjkyMjQ0LCAweDQzMmFmZjk3LCAyODc4NjEyMzkxVSwgMHhmYzkzYTAzOSxcclxuMTcwMDQ4NTU3MSwgMHg4ZjBjY2M5MiwgMHhmZmVmZjQ3ZCwgMHg4NTg0NWRkMSxcclxuICAgICAgICAgICAgMHg2ZmE4N2U0ZiwgMHhmZTJjZTZlMCwgMHhhMzAxNDMxNCwgMHg0ZTA4MTFhMSxcclxuICAgICAgICAgICAgMHhmNzUzN2U4MiwgMzE3NDc1NjkxN1UsIDcxODc4NzI1OSwgMzk1MTQ4MTc0NVUgICAgICAgIH07XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdWludCBsZWZ0Um90YXRlKHVpbnQgeCwgaW50IGMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHggPDwgYykgfCAoeCA+PiAoMzIgLSBjKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhc3N1bWVzIHdob2xlIGJ5dGVzIGFzIGlucHV0XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgQ2FsY3VsYXRlKGJ5dGVbXSBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHVpbnQgYTAgPSAweDY3NDUyMzAxOyAgIC8vIEFcclxuICAgICAgICAgICAgdWludCBiMCA9IDQwMjMyMzM0MTdVOyAgIC8vIEJcclxuICAgICAgICAgICAgdWludCBjMCA9IDI1NjIzODMxMDJVOyAgIC8vIENcclxuICAgICAgICAgICAgdWludCBkMCA9IDB4MTAzMjU0NzY7ICAgLy8gRFxyXG5cclxuICAgICAgICAgICAgdmFyIGFkZExlbmd0aCA9ICg1NiAtICgoaW5wdXQuTGVuZ3RoICsgMSkgJSA2NCkpICUgNjQ7IC8vIGNhbGN1bGF0ZSB0aGUgbmV3IGxlbmd0aCB3aXRoIHBhZGRpbmdcclxuICAgICAgICAgICAgdmFyIHByb2Nlc3NlZElucHV0ID0gbmV3IGJ5dGVbaW5wdXQuTGVuZ3RoICsgMSArIGFkZExlbmd0aCArIDhdO1xyXG4gICAgICAgICAgICBBcnJheS5Db3B5KGlucHV0LCBwcm9jZXNzZWRJbnB1dCwgaW5wdXQuTGVuZ3RoKTtcclxuICAgICAgICAgICAgcHJvY2Vzc2VkSW5wdXRbaW5wdXQuTGVuZ3RoXSA9IDB4ODA7IC8vIGFkZCAxXHJcblxyXG4gICAgICAgICAgICBieXRlW10gbGVuZ3RoID0gQml0Q29udmVydGVyLkdldEJ5dGVzKGlucHV0Lkxlbmd0aCAqIDgpOyAvLyBiaXQgY29udmVydGVyIHJldHVybnMgbGl0dGxlLWVuZGlhblxyXG4gICAgICAgICAgICBBcnJheS5Db3B5KGxlbmd0aCwgMCwgcHJvY2Vzc2VkSW5wdXQsIHByb2Nlc3NlZElucHV0Lkxlbmd0aCAtIDgsIDQpOyAvLyBhZGQgbGVuZ3RoIGluIGJpdHNcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcHJvY2Vzc2VkSW5wdXQuTGVuZ3RoIC8gNjQ7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gY29weSB0aGUgaW5wdXQgdG8gTVxyXG4gICAgICAgICAgICAgICAgdWludFtdIE0gPSBuZXcgdWludFsxNl07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IDE2OyArK2opXHJcbiAgICAgICAgICAgICAgICAgICAgTVtqXSA9IEJpdENvbnZlcnRlci5Ub1VJbnQzMihwcm9jZXNzZWRJbnB1dCwgKGkgKiA2NCkgKyAoaiAqIDQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpbml0aWFsaXplIHJvdW5kIHZhcmlhYmxlc1xyXG4gICAgICAgICAgICAgICAgdWludCBBID0gYTAsIEIgPSBiMCwgQyA9IGMwLCBEID0gZDAsIEYgPSAwLCBnID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwcmltYXJ5IGxvb3BcclxuICAgICAgICAgICAgICAgIGZvciAodWludCBrID0gMDsgayA8IDY0OyArK2spXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPD0gMTUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGID0gKEIgJiBDKSB8ICh+QiAmIEQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnID0gaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoayA+PSAxNiAmJiBrIDw9IDMxKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRiA9IChEICYgQikgfCAofkQgJiBDKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZyA9ICgoNSAqIGspICsgMSkgJSAxNjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoayA+PSAzMiAmJiBrIDw9IDQ3KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRiA9IEIgXiBDIF4gRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZyA9ICgoMyAqIGspICsgNSkgJSAxNjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoayA+PSA0OClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEYgPSBDIF4gKEIgfCB+RCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcgPSAoNyAqIGspICUgMTY7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZHRlbXAgPSBEO1xyXG4gICAgICAgICAgICAgICAgICAgIEQgPSBDO1xyXG4gICAgICAgICAgICAgICAgICAgIEMgPSBCO1xyXG4gICAgICAgICAgICAgICAgICAgIEIgPSBCICsgbGVmdFJvdGF0ZSgoQSArIEYgKyBLW2tdICsgTVtnXSksIHNba10pO1xyXG4gICAgICAgICAgICAgICAgICAgIEEgPSBkdGVtcDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBhMCArPSBBO1xyXG4gICAgICAgICAgICAgICAgYjAgKz0gQjtcclxuICAgICAgICAgICAgICAgIGMwICs9IEM7XHJcbiAgICAgICAgICAgICAgICBkMCArPSBEO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gR2V0Qnl0ZVN0cmluZyhhMCkgKyBHZXRCeXRlU3RyaW5nKGIwKSArIEdldEJ5dGVTdHJpbmcoYzApICsgR2V0Qnl0ZVN0cmluZyhkMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmcgR2V0Qnl0ZVN0cmluZyh1aW50IHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nLkpvaW4oXCJcIiwgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3Q8Ynl0ZSxzdHJpbmc+KEJpdENvbnZlcnRlci5HZXRCeXRlcyh4KSwoRnVuYzxieXRlLHN0cmluZz4pKHkgPT4geS5Ub1N0cmluZyhcIngyXCIpKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UZXh0LlJlZ3VsYXJFeHByZXNzaW9ucztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFNldHRpbmdzXHJcblxyXG4gICAgICAgIFtGbGFnc11cclxuICAgICAgICBwdWJsaWMgZW51bSBTZXR0aW5nc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTm9uZSA9IDAsXHJcbiAgICAgICAgICAgIElnbm9yZU1hcFZhcmlhYmxlcyA9IDEsXHJcbiAgICAgICAgICAgIFJlbW92ZUNvbW1lbnRzID0gMixcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBJbnRlcm5hbFxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmcgX3NlcGFyYXRvciA9IEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgLy9wcml2YXRlIHN0YXRpYyBzdHJpbmcgX3NlcGFyYXRvciA9IFwiO1wiO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuU2VwYXJhdG9ycyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vMSk9PntfbzEuQWRkKCcgJyk7X28xLkFkZCgnLicpO19vMS5BZGQoJywnKTtfbzEuQWRkKCc6Jyk7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlbkJyYWNrZXRzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8Y2hhcj4oKSwoX28yKT0+e19vMi5BZGQoJygnKTtfbzIuQWRkKCcpJyk7X28yLkFkZCgnWycpO19vMi5BZGQoJ10nKTtfbzIuQWRkKCd7Jyk7X28yLkFkZCgnfScpO3JldHVybiBfbzI7fSk7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxjaGFyPiBfdG9rZW5PcGVyYXRvcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzMpPT57X28zLkFkZCgnKycpO19vMy5BZGQoJy0nKTtfbzMuQWRkKCcqJyk7X28zLkFkZCgnLycpO19vMy5BZGQoJyUnKTtfbzMuQWRkKCc8Jyk7X28zLkFkZCgnPicpO19vMy5BZGQoJz0nKTtfbzMuQWRkKCchJyk7X28zLkFkZCgnXicpO19vMy5BZGQoJyYnKTtfbzMuQWRkKCd8Jyk7X28zLkFkZCgnQCcpO19vMy5BZGQoJ34nKTtyZXR1cm4gX28zO30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PHN0cmluZz4gX3Rva2VuRW5kU3RhdGVtZW50cyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PHN0cmluZz4oKSwoX280KT0+e19vNC5BZGQoXCJcXG5cIik7X280LkFkZChcIlxcclxcblwiKTtfbzQuQWRkKFwiO1wiKTtfbzQuQWRkKFwifVwiKTtyZXR1cm4gX280O30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PHN0cmluZz4gX3Rva2VuSW5jbHVkZSA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PHN0cmluZz4oKSwoX281KT0+e19vNS5BZGQoXCIjIVwiKTtyZXR1cm4gX281O30pO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuRW5kSW5jbHVkZSA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vNik9PntfbzYuQWRkKCchJyk7cmV0dXJuIF9vNjt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxjaGFyPiBfdG9rZW5TdHJpbmdzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8Y2hhcj4oKSwoX283KT0+e19vNy5BZGQoJ1wiJyk7X283LkFkZCgnJCcpO3JldHVybiBfbzc7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8c3RyaW5nPiBfa2V5d29yZHMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vOCk9PntfbzguQWRkKFwiaWZcIik7X284LkFkZChcInRoZW5cIik7X284LkFkZChcImVsc2VcIik7X284LkFkZChcImVuZFwiKTtfbzguQWRkKFwid2hpbGVcIik7X284LkFkZChcImZvclwiKTtfbzguQWRkKFwiaW5cIik7X284LkFkZChcImFuZFwiKTtfbzguQWRkKFwib3JcIik7X284LkFkZChcIm5vdFwiKTtfbzguQWRkKFwidHJ1ZVwiKTtfbzguQWRkKFwiZmFsc2VcIik7X284LkFkZChcInJldHVyblwiKTtfbzguQWRkKFwiY29udGludWVcIik7X284LkFkZChcImJyZWFrXCIpO19vOC5BZGQoXCJuZXdcIik7X284LkFkZChcImZ1bmN0aW9uXCIpO3JldHVybiBfbzg7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8c3RyaW5nPiBfaWdub3JlT3B0aW1pemUgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vOSk9PntfbzkuQWRkKFwiRmlsZVwiKTtfbzkuQWRkKFwiYWJzXCIpO19vOS5BZGQoXCJhY29zXCIpO19vOS5BZGQoXCJhY3RpdmVfbmV0X2NhcmRcIik7X285LkFkZChcImFjdGl2ZV91c2VyXCIpO19vOS5BZGQoXCJhaXJjcmFja1wiKTtfbzkuQWRkKFwiYWlybW9uXCIpO19vOS5BZGQoXCJhc2luXCIpO19vOS5BZGQoXCJhdGFuXCIpO19vOS5BZGQoXCJiaXR3aXNlXCIpO19vOS5BZGQoXCJic3NpZF9uYW1lXCIpO19vOS5BZGQoXCJidWlsZFwiKTtfbzkuQWRkKFwiY2VpbFwiKTtfbzkuQWRkKFwiY2hhbmdlX3Bhc3N3b3JkXCIpO19vOS5BZGQoXCJjaGFyXCIpO19vOS5BZGQoXCJjaG1vZFwiKTtfbzkuQWRkKFwiY2xvc2VfcHJvZ3JhbVwiKTtfbzkuQWRkKFwiY29kZVwiKTtfbzkuQWRkKFwiY29tbWFuZF9pbmZvXCIpO19vOS5BZGQoXCJjb25uZWN0X2V0aGVybmV0XCIpO19vOS5BZGQoXCJjb25uZWN0X3NlcnZpY2VcIik7X285LkFkZChcImNvbm5lY3Rfd2lmaVwiKTtfbzkuQWRkKFwiY29weVwiKTtfbzkuQWRkKFwiY29zXCIpO19vOS5BZGQoXCJjcmVhdGVfZm9sZGVyXCIpO19vOS5BZGQoXCJjcmVhdGVfZ3JvdXBcIik7X285LkFkZChcImNyZWF0ZV91c2VyXCIpO19vOS5BZGQoXCJjdXJyZW50X2RhdGVcIik7X285LkFkZChcImN1cnJlbnRfcGF0aFwiKTtfbzkuQWRkKFwiZGVjaXBoZXJcIik7X285LkFkZChcImRlbGV0ZVwiKTtfbzkuQWRkKFwiZGVsZXRlX2dyb3VwXCIpO19vOS5BZGQoXCJkZWxldGVfdXNlclwiKTtfbzkuQWRkKFwiZGV2aWNlX3BvcnRzXCIpO19vOS5BZGQoXCJkZXZpY2VzX2xhbl9pcFwiKTtfbzkuQWRkKFwiZHVtcF9saWJcIik7X285LkFkZChcImVzc2lkX25hbWVcIik7X285LkFkZChcImV4aXRcIik7X285LkFkZChcImZsb29yXCIpO19vOS5BZGQoXCJmb3JtYXRfY29sdW1uc1wiKTtfbzkuQWRkKFwiZ2V0X2ZpbGVzXCIpO19vOS5BZGQoXCJnZXRfZm9sZGVyc1wiKTtfbzkuQWRkKFwiZ2V0X2xhbl9pcFwiKTtfbzkuQWRkKFwiZ2V0X3BvcnRzXCIpO19vOS5BZGQoXCJnZXRfcm91dGVyXCIpO19vOS5BZGQoXCJnZXRfc2hlbGxcIik7X285LkFkZChcImdsb2JhbHNcIik7X285LkFkZChcImdyb3VwXCIpO19vOS5BZGQoXCJncm91cHNcIik7X285LkFkZChcImhhc0luZGV4XCIpO19vOS5BZGQoXCJoYXNfcGVybWlzc2lvblwiKTtfbzkuQWRkKFwiaG9zdF9jb21wdXRlclwiKTtfbzkuQWRkKFwiaW5jbHVkZV9saWJcIik7X285LkFkZChcImluZGV4T2ZcIik7X285LkFkZChcImluZGV4ZXNcIik7X285LkFkZChcImlzX2JpbmFyeVwiKTtfbzkuQWRkKFwiaXNfY2xvc2VkXCIpO19vOS5BZGQoXCJpc19mb2xkZXJcIik7X285LkFkZChcImlzX2xhbl9pcFwiKTtfbzkuQWRkKFwiaXNfbmV0d29ya19hY3RpdmVcIik7X285LkFkZChcImlzX3ZhbGlkX2lwXCIpO19vOS5BZGQoXCJqb2luXCIpO19vOS5BZGQoXCJsYXN0SW5kZXhPZlwiKTtfbzkuQWRkKFwibGF1bmNoXCIpO19vOS5BZGQoXCJsZW5cIik7X285LkFkZChcImxpYl9uYW1lXCIpO19vOS5BZGQoXCJsb2FkXCIpO19vOS5BZGQoXCJsb2NhbF9pcFwiKTtfbzkuQWRkKFwibG9jYWxzXCIpO19vOS5BZGQoXCJsb3dlclwiKTtfbzkuQWRkKFwibWQ1XCIpO19vOS5BZGQoXCJtb3ZlXCIpO19vOS5BZGQoXCJuYW1lXCIpO19vOS5BZGQoXCJuZXRfdXNlXCIpO19vOS5BZGQoXCJuZXR3b3JrX2RldmljZXNcIik7X285LkFkZChcIm5ldHdvcmtfZ2F0ZXdheVwiKTtfbzkuQWRkKFwibnNsb29rdXBcIik7X285LkFkZChcIm92ZXJmbG93XCIpO19vOS5BZGQoXCJvd25lclwiKTtfbzkuQWRkKFwicGFyZW50XCIpO19vOS5BZGQoXCJwYXJlbnRfcGF0aFwiKTtfbzkuQWRkKFwicGF0aFwiKTtfbzkuQWRkKFwicGVybWlzc2lvbnNcIik7X285LkFkZChcInBpXCIpO19vOS5BZGQoXCJwaW5nXCIpO19vOS5BZGQoXCJwaW5nX3BvcnRcIik7X285LkFkZChcInBvcFwiKTtfbzkuQWRkKFwicG9ydF9pbmZvXCIpO19vOS5BZGQoXCJwb3J0X251bWJlclwiKTtfbzkuQWRkKFwicHJpbnRcIik7X285LkFkZChcInByb2dyYW1fcGF0aFwiKTtfbzkuQWRkKFwicHVibGljX2lwXCIpO19vOS5BZGQoXCJwdWxsXCIpO19vOS5BZGQoXCJwdXNoXCIpO19vOS5BZGQoXCJwdXRcIik7X285LkFkZChcInJhbmdlXCIpO19vOS5BZGQoXCJyZW1vdmVcIik7X285LkFkZChcInJlbmFtZVwiKTtfbzkuQWRkKFwicmVwbGFjZVwiKTtfbzkuQWRkKFwicmV2ZXJzZVwiKTtfbzkuQWRkKFwicm5kXCIpO19vOS5BZGQoXCJyb3VuZFwiKTtfbzkuQWRkKFwic2NhblwiKTtfbzkuQWRkKFwic2Nhbl9hZGRyZXNzXCIpO19vOS5BZGQoXCJzY3BcIik7X285LkFkZChcInNldF9jb250ZW50XCIpO19vOS5BZGQoXCJzZXRfZ3JvdXBcIik7X285LkFkZChcInNob3dfcHJvY3NcIik7X285LkFkZChcInNodWZmbGVcIik7X285LkFkZChcInNpZ25cIik7X285LkFkZChcInNpblwiKTtfbzkuQWRkKFwic2l6ZVwiKTtfbzkuQWRkKFwic2xpY2VcIik7X285LkFkZChcInNtdHBfdXNlcl9saXN0XCIpO19vOS5BZGQoXCJzb3J0XCIpO19vOS5BZGQoXCJzcGxpdFwiKTtfbzkuQWRkKFwic3FydFwiKTtfbzkuQWRkKFwic3RhcnRfdGVybWluYWxcIik7X285LkFkZChcInN0clwiKTtfbzkuQWRkKFwic3VtXCIpO19vOS5BZGQoXCJ0YW5cIik7X285LkFkZChcInRvX2ludFwiKTtfbzkuQWRkKFwidG91Y2hcIik7X285LkFkZChcInRyaW1cIik7X285LkFkZChcInR5cGVvZlwiKTtfbzkuQWRkKFwidXBwZXJcIik7X285LkFkZChcInVzZWRfcG9ydHNcIik7X285LkFkZChcInVzZXJfYmFua19udW1iZXJcIik7X285LkFkZChcInVzZXJfaW5wdXRcIik7X285LkFkZChcInVzZXJfbWFpbF9hZGRyZXNzXCIpO19vOS5BZGQoXCJ2YWxcIik7X285LkFkZChcInZhbHVlc1wiKTtfbzkuQWRkKFwidmVyc2lvblwiKTtfbzkuQWRkKFwid2hvaXNcIik7X285LkFkZChcIndpZmlfbmV0d29ya3NcIik7X285LkFkZChcInBhcmFtc1wiKTtfbzkuQWRkKFwiY2xlYXJfc2NyZWVuXCIpO19vOS5BZGQoXCJ3YWl0XCIpO19vOS5BZGQoXCJzZWxmXCIpO19vOS5BZGQoXCJudWxsXCIpO19vOS5BZGQoXCJmdW5jdGlvblwiKTtfbzkuQWRkKFwiY29udGVudFwiKTtfbzkuQWRkKFwibGFuX2lwXCIpO19vOS5BZGQoXCJnZXRfY29udGVudFwiKTtfbzkuQWRkKFwiYWlyZXBsYXlcIik7X285LkFkZChcImZpcmV3YWxsX3J1bGVzXCIpO19vOS5BZGQoXCJrZXJuZWxfdmVyc2lvblwiKTtfbzkuQWRkKFwia2VybmVsX3ZlcnNpb25cIik7X285LkFkZChcInJzaGVsbF9zZXJ2ZXJcIik7X285LkFkZChcInJzaGVsbF9zZXJ2ZXJcIik7X285LkFkZChcIl9faXNhXCIpO19vOS5BZGQoXCJpZlwiKTtfbzkuQWRkKFwidGhlblwiKTtfbzkuQWRkKFwiZWxzZVwiKTtfbzkuQWRkKFwiZW5kXCIpO19vOS5BZGQoXCJ3aGlsZVwiKTtfbzkuQWRkKFwiZm9yXCIpO19vOS5BZGQoXCJpblwiKTtfbzkuQWRkKFwiYW5kXCIpO19vOS5BZGQoXCJvclwiKTtfbzkuQWRkKFwibm90XCIpO19vOS5BZGQoXCJ0cnVlXCIpO19vOS5BZGQoXCJmYWxzZVwiKTtfbzkuQWRkKFwibnVsbFwiKTtfbzkuQWRkKFwicmV0dXJuXCIpO19vOS5BZGQoXCJjb250aW51ZVwiKTtfbzkuQWRkKFwiYnJlYWtcIik7X285LkFkZChcImZ1bmN0aW9uXCIpO19vOS5BZGQoXCJuZXdcIik7X285LkFkZChcInNlbGZcIik7cmV0dXJuIF9vOTt9KTtcclxuXHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBEaWN0aW9uYXJ5PHN0cmluZywgc3RyaW5nPiBfb3BlcmF0b3JzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBzdHJpbmc+KCksKF9vMTApPT57X28xMC5BZGQoXCImJlwiLEBcIiBhbmQgXCIpO19vMTAuQWRkKFwifHxcIixAXCIgb3IgXCIpO19vMTAuQWRkKFwiPDxcIixAXCJiaXR3aXNlKFwiXCI8PFwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwiPj5cIixAXCJiaXR3aXNlKFwiXCI+PlwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwiPj4+XCIsQFwiYml0d2lzZShcIlwiPj4+XCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCJeXlwiLEBcImJpdHdpc2UoXCJcIl5cIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcIiZcIixAXCJiaXR3aXNlKFwiXCImXCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCJ8XCIsQFwiYml0d2lzZShcIlwifFwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwiflwiLEBcImJpdHdpc2UoXCJcIn5cIlwiLCRiKVwiKTtfbzEwLkFkZChcIisrXCIsQFwiJGE9JGErMVwiKTtfbzEwLkFkZChcIi0tXCIsQFwiJGE9JGEtMVwiKTtfbzEwLkFkZChcIis9XCIsQFwiJGE9JGErJGJcIik7X28xMC5BZGQoXCItPVwiLEBcIiRhPSRhLSRiXCIpO19vMTAuQWRkKFwiKj1cIixAXCIkYT0kYSokYlwiKTtfbzEwLkFkZChcIi89XCIsQFwiJGE9JGEvJGJcIik7X28xMC5BZGQoXCIlPVwiLEBcIiRhPSRhJSRiXCIpO19vMTAuQWRkKFwiPT5cIixAXCJmdW5jdGlvbiRhJGJcIik7cmV0dXJuIF9vMTA7fSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEVUZW1wbGF0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTm9uZSxcclxuICAgICAgICAgICAgSXRlcmF0aW9uSW5kZXgsXHJcbiAgICAgICAgICAgIElnbm9yZU9wdGltaXphdGlvbixcclxuICAgICAgICAgICAgVGVybmFyeU9wZXJhdG9yLFxyXG4gICAgICAgICAgICBDb21tZW50LFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRGljdGlvbmFyeTxzdHJpbmcsIEVUZW1wbGF0ZT4gX3RlbXBsYXRlcyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgRVRlbXBsYXRlPigpLChfbzExKT0+e19vMTEuQWRkKEBcIihfXykoLiopKF9pZHgpXCIsRVRlbXBsYXRlLkl0ZXJhdGlvbkluZGV4KTtfbzExLkFkZChAXCIoXFxcXCkoXFxTKilcIixFVGVtcGxhdGUuSWdub3JlT3B0aW1pemF0aW9uKTtfbzExLkFkZChAXCIoXFwvXFwvKSguKikkXCIsRVRlbXBsYXRlLkNvbW1lbnQpO3JldHVybiBfbzExO30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIElzVGVtcGxhdGUoc3RyaW5nIGlucHV0LCBvdXQgc3RyaW5nIHJlZ2V4LCBvdXQgTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXMsIG91dCBFVGVtcGxhdGUgdGVtcGxhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoIChLZXlWYWx1ZVBhaXI8c3RyaW5nLCBFVGVtcGxhdGU+IHBhaXIgaW4gX3RlbXBsYXRlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWF0Y2hlcyA9IFJlZ2V4Lk1hdGNoZXMoaW5wdXQsIHBhaXIuS2V5KTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzLkNvdW50ICE9IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggPSBwYWlyLktleTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHBhaXIuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1hdGNoZXMgPSBudWxsO1xyXG4gICAgICAgICAgICByZWdleCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gRVRlbXBsYXRlLk5vbmU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgQ29tcGlsZShzdHJpbmcgY29kZSwgYm9vbCBvcHRpbWl6ZSA9IGZhbHNlLCBTZXR0aW5ncyBzZXR0aW5ncyA9IFNldHRpbmdzLk5vbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVG9rZW5pemUoY29kZSwgc2V0dGluZ3MpLkNvbXBpbGUob3B0aW1pemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIFRyeUNvbXBpbGUoc3RyaW5nIGNvZGUsIG91dCBzdHJpbmcgY29tcGlsZWRDb2RlLCBib29sIG9wdGltaXplID0gZmFsc2UsIFNldHRpbmdzIHNldHRpbmdzID0gU2V0dGluZ3MuTm9uZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb21waWxlZENvZGUgPSBDb21waWxlKGNvZGUsIG9wdGltaXplLCBzZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbXBpbGVkQ29kZSA9IGUuTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgQ29udGV4dCBUb2tlbml6ZShzdHJpbmcgcGxhaW5Db2RlLCBTZXR0aW5ncyBzZXR0aW5ncyA9IFNldHRpbmdzLk5vbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb250ZXh0IGNvbnRleHQgPSBuZXcgQ29udGV4dChzZXR0aW5ncykgeyBQbGFpbklucHV0ID0gbmV3IFF1ZXVlPGNoYXI+KHBsYWluQ29kZSkgfTtcclxuXHJcbiAgICAgICAgICAgIFRva2VuIHRva2VuID0gbnVsbDtcclxuICAgICAgICAgICAgd2hpbGUgKCh0b2tlbiA9IEdldE5leHRUb2tlbihjb250ZXh0KSkgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5BZGRUb2tlbih0b2tlbik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoY29udGV4dC5TZXR0aW5ncyAmIFNldHRpbmdzLklnbm9yZU1hcFZhcmlhYmxlcykgIT0gMCAmJiB0b2tlbi5QcmV2ICE9IG51bGwgJiYgdG9rZW4uUHJldi5WYWx1ZSA9PSBcIi5cIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRleHQuSWdub3JlT3B0aW1pemUodG9rZW4uVmFsdWUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jdXN0b21JZ25vcmVPcHRpbWl6ZS5BZGQodG9rZW4uVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlbW92ZVNwYWNlcyhRdWV1ZTxjaGFyPiBxdWV1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdoaWxlIChxdWV1ZS5Db3VudCAhPSAwICYmIGNoYXIuSXNXaGl0ZVNwYWNlKHF1ZXVlLlBlZWsoKSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHF1ZXVlLkRlcXVldWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgRnVuYzxDb250ZXh0LCBib29sPiBHZXRTZXBhcmF0aW9uU2VsZWN0b3IoQ29udGV4dCBjb250ZXh0LCBvdXQgVG9rZW4gdG9rZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnLycgJiYgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KGNvbnRleHQuUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpID09ICcvJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uVGVtcGxhdGUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+ICEoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnXFxuJyB8fCAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnXFxyJyAmJlxyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dCwxKS5GaXJzdCgpID09ICdcXG4nKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0Lk1hcEFjdGl2ZS5QZWVrKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlNlcGFyYXRvcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICcsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKCFjb250ZXh0LlNldHRpbmdzLkhhc0ZsYWcoU2V0dGluZ3MuSWdub3JlTWFwVmFyaWFibGVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJzonOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geCA9PiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICdcXFxcJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uVGVtcGxhdGUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+ICFfdG9rZW5CcmFja2V0cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuU2VwYXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICFfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpICsgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KHguUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoX3Rva2VuSW5jbHVkZS5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpICtcclxuU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpLlRvU3RyaW5nKCkpKSAvL2luY2x1ZGVcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uSW5jbHVkZSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdG9rZW5FbmRJbmNsdWRlLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL29wZXJhdG9yXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLk9wZXJhdG9yKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PiBfdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF90b2tlbkJyYWNrZXRzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL2JyYWNrZXRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLkJyYWNrZXQoKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICcoJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnKSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1snOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goKCEoY29udGV4dC5MYXN0VG9rZW4gPT0gbnVsbCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gaXMgVG9rZW4uT3BlcmF0b3IpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbnRleHQuU2V0dGluZ3MgJiBTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICddJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAneyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0Lkxhc3RUb2tlbiA9PSBudWxsIHx8ICghY29udGV4dC5MYXN0VG9rZW4uVmFsdWUuRW5kc1dpdGgoXCIpXCIpICYmIGNvbnRleHQuTGFzdFRva2VuLlZhbHVlICE9IFwiPT5cIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTWFwQWN0aXZlLlB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goKGNvbnRleHQuU2V0dGluZ3MgJiBTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5NYXBBY3RpdmUuUHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd9JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5NYXBBY3RpdmUuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5TZXBhcmF0b3JzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL3NlcGFyYXRvcnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uU2VwYXJhdG9yKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKF90b2tlblN0cmluZ3MuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSkpIC8vc3RyaW5nc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHRva2VuLk9wdGltaXphYmxlID0gY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QZWVrKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnJCcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4uQ3VzdG9tID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5PcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHggPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHZXRTdHJpbmcoeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4geCA9PiAhX3Rva2VuQnJhY2tldHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlblNlcGFyYXRvcnMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlblN0cmluZ3MuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlbk9wZXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSArIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPih4LlBsYWluSW5wdXQsMSkuRmlyc3RPckRlZmF1bHQoKS5Ub1N0cmluZygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgR2V0U3RyaW5nKENvbnRleHQgY29udGV4dClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMCAmJiBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpICE9ICdcIicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgIT0gMClcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKSk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJ1wiJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpKTtcclxuICAgICAgICAgICAgICAgIEdldFN0cmluZyhjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLlJlbW92ZSgwLCAxKTtcclxuICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLlJlbW92ZShjb250ZXh0LlN0cmluZ0J1aWxkZXIuTGVuZ3RoIC0gMSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFRva2VuIEdldE5leHRUb2tlbihDb250ZXh0IGNvbnRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQ2xlYXIoKTtcclxuICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IGNvbnRleHQuU3RyaW5nQnVpbGRlcjtcclxuICAgICAgICAgICAgUmVtb3ZlU3BhY2VzKGNvbnRleHQuUGxhaW5JbnB1dCk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPT0gMCkgcmV0dXJuIG51bGw7XHJcbkdyZXlIYWNrQ29tcGlsZXIuVG9rZW4gdDtcbiAgICAgICAgICAgIEZ1bmM8Q29udGV4dCwgYm9vbD4gc2VwYXJhdG9yID0gR2V0U2VwYXJhdGlvblNlbGVjdG9yKGNvbnRleHQsIG91dCB0KTtcclxuICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2IuQXBwZW5kKGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCkpO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIHNlcGFyYXRvcihjb250ZXh0KSk7XHJcblxyXG4gICAgICAgICAgICBzdHJpbmcgdG1wX3ZhbHVlID0gc2IuVG9TdHJpbmcoKTtcclxuc3RyaW5nIHJlZ2V4O1xuTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXM7XG5HcmV5SGFja0NvbXBpbGVyLkVUZW1wbGF0ZSB0ZW1wbGF0ZTtcbiAgICAgICAgICAgIGlmICghKHQgaXMgVG9rZW4uU3RyaW5nKSAmJiBJc1RlbXBsYXRlKHRtcF92YWx1ZSwgb3V0IHJlZ2V4LCBvdXQgbWF0Y2hlcywgb3V0IHRlbXBsYXRlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdCA9IG5ldyBUb2tlbi5UZW1wbGF0ZSh0ZW1wbGF0ZSwgbWF0Y2hlcywgcmVnZXgsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF9rZXl3b3Jkcy5Db250YWlucyh0bXBfdmFsdWUpICYmICEodCBpcyBUb2tlbi5TdHJpbmcpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ID0gbmV3IFRva2VuLktleXdvcmQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHQuT3B0aW1pemFibGUgJiYgY29udGV4dC5JZ25vcmVPcHRpbWl6ZSh0LlZhbHVlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdC5PcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0LlZhbHVlID0gdG1wX3ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA+IDAgJiYgY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnICcpXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG5cclxuICAgICAgICAgICAgdC5FbmRTdGF0ZW1lbnQgPSBJc0VuZE9mTGluZShjb250ZXh0KTtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA+IDAgJiYgY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnOycpIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9XHJcbnByaXZhdGUgc3RhdGljIGJvb2wgSXNFbmRPZkxpbmUoQ29udGV4dCBjb250ZXh0KVxyXG57XHJcbiAgICByZXR1cm4gY29udGV4dC5QbGFpbklucHV0LkNvdW50ID09IDAgfHwgX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkgKyBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oY29udGV4dC5QbGFpbklucHV0LDEpLkZpcnN0T3JEZWZhdWx0KCkuVG9TdHJpbmcoKSkgfHwgX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkpO1xyXG59ICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbiNpZiBqc1xyXG4jZWxzZVxyXG51c2luZyBTeXN0ZW0uTmV0Lkh0dHA7XHJcbiNlbmRpZlxyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBjbGFzcyBDb250ZXh0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgUXVldWU8Y2hhcj4gUGxhaW5JbnB1dCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUb2tlbiBSb290VG9rZW4geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgVG9rZW4gTGFzdFRva2VuIHsgZ2V0OyBzZXQ7IH1cclxucHVibGljIFN0cmluZ0J1aWxkZXIgU3RyaW5nQnVpbGRlclxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nQnVpbGRlcnMuUGVlaygpO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgICAgIGludGVybmFsIFN0cmluZ0J1aWxkZXIgQ29kZVByZWZpeCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpbnRlcm5hbCBsb25nIGJyYWNrZXREZXB0aCA9IDA7XHJcbiAgICAgICAgICAgIGludGVybmFsIFN0YWNrPFN0cmluZ0J1aWxkZXI+IHN0cmluZ0J1aWxkZXJzID0gbmV3IFN0YWNrPFN0cmluZ0J1aWxkZXI+KCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIFN0YWNrPGJvb2w+IFNob3VsZE9wdGltaXplU3RyaW5nID0gbmV3IFN0YWNrPGJvb2w+KCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIFN0YWNrPGJvb2w+IE1hcEFjdGl2ZSA9IG5ldyBTdGFjazxib29sPigpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBWYXJpYWJsZU5hbWVQcm92aWRlciBuYW1lUHJvdmlkZXIgPSBuZXcgVmFyaWFibGVOYW1lUHJvdmlkZXIoKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgYm9vbCBvcHRpbWl6ZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgU2V0dGluZ3MgU2V0dGluZ3MgPSBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuU2V0dGluZ3MuTm9uZTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgSGFzaFNldDxzdHJpbmc+IGN1c3RvbUlnbm9yZU9wdGltaXplID0gbmV3IEhhc2hTZXQ8c3RyaW5nPigpO1xyXG4jaWYganNcclxuI2Vsc2VcclxuICAgICAgICAgICAgaW50ZXJuYWwgSHR0cENsaWVudCBodHRwQ2xpZW50ID0gbmV3IEh0dHBDbGllbnQoKTtcclxuI2VuZGlmXHJcbnB1YmxpYyBib29sIElnbm9yZU9wdGltaXplKHN0cmluZyB2YWx1ZSlcclxue1xyXG4gICAgcmV0dXJuIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5faWdub3JlT3B0aW1pemUuQ29udGFpbnModmFsdWUpIHx8IGN1c3RvbUlnbm9yZU9wdGltaXplLkNvbnRhaW5zKHZhbHVlKTtcclxufVxyXG4gICAgICAgICAgICBwdWJsaWMgdm9pZCBBZGRUb2tlbihUb2tlbiB0b2tlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKFJvb3RUb2tlbiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJvb3RUb2tlbiA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIExhc3RUb2tlbiA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIExhc3RUb2tlbi5OZXh0ID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4uUHJldiA9IExhc3RUb2tlbjtcclxuICAgICAgICAgICAgICAgICAgICBMYXN0VG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwdWJsaWMgQ29udGV4dChTZXR0aW5ncyBzZXR0aW5ncylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICAgICAgICAgIFBsYWluSW5wdXQgPSBuZXcgUXVldWU8Y2hhcj4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgQ29kZVByZWZpeCA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBNYXBBY3RpdmUuUHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdHJpbmcgQ29tcGlsZShib29sIG9wdGltaXplID0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9wdGltaXplRW5hYmxlZCA9IG9wdGltaXplO1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nQnVpbGRlci5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBUb2tlbiBub2RlO1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IFJvb3RUb2tlbjtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChub2RlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUuT3B0aW1pemUodGhpcyxvcHRpbWl6ZSkuTmV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBub2RlID0gUm9vdFRva2VuO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5Db21waWxlKHRoaXMpLk5leHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgb3B0aW1pemVFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBDb2RlUHJlZml4LkFwcGVuZChTdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENvZGVQcmVmaXguVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgc2IgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgICAgICAgICAgVG9rZW4gbm9kZSA9IFJvb3RUb2tlbjtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChub2RlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSBpcyBUb2tlbi5TdHJpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLkFwcGVuZCgnXCInK25vZGUuVmFsdWUrICdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kKG5vZGUuVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLkVuZFN0YXRlbWVudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLkFwcGVuZCgnXFxuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0qL1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKG5vZGUuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUuTmV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2IuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UZXh0LlJlZ3VsYXJFeHByZXNzaW9ucztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgVG9rZW4gUHJldiB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUb2tlbiBOZXh0IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIHZpcnR1YWwgc3RyaW5nIFZhbHVlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIHZpcnR1YWwgYm9vbCBDdXN0b20geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBPcHRpbWl6YWJsZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHByaXZhdGUgYm9vbCBfZW5kU3RhdGVtZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIEVuZFN0YXRlbWVudCB7IGdldHtcclxuICAgICAgICAgICAgICAgIGlmIChGb3JjZUVuZFN0YXRlbWVudClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRm9yY2VFbmRTdGF0ZW1lbnRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2VuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2V0IHsgX2VuZFN0YXRlbWVudCA9IHZhbHVlOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHVibGljIGJvb2wgRm9yY2VFbmRTdGF0ZW1lbnQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBGb3JjZUVuZFN0YXRlbWVudFZhbHVlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyB2aXJ0dWFsIFRva2VuIE9wdGltaXplKENvbnRleHQgY29udGV4dCxib29sIHJlcGxhY2UgPSB0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT3B0aW1pemFibGUgJiYgLy9mbGFnIGZyb20gdG9rZW5pemF0aW9uICBcclxuICAgICAgICAgICAgICAgICAgICBWYWx1ZS5MZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIWNoYXIuSXNEaWdpdChWYWx1ZVswXSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAhY29udGV4dC5JZ25vcmVPcHRpbWl6ZShWYWx1ZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcGxhY2UpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IGNvbnRleHQubmFtZVByb3ZpZGVyLkdldFJlcGxhY2UoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lm5hbWVQcm92aWRlci5EZWZpbmUoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgdmlydHVhbCBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yV2hpdGVTcGFjZShWYWx1ZSkpIHJldHVybiB0aGlzO1xyXG5CcmFja2V0IGI7ICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LlN0cmluZ0J1aWxkZXIuTGVuZ3RoICE9IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAoKFJlZ2V4LklzTWF0Y2goY29udGV4dC5TdHJpbmdCdWlsZGVyW2NvbnRleHQuU3RyaW5nQnVpbGRlci5MZW5ndGggLSAxXS5Ub1N0cmluZygpLCBcIlxcXFx3XCIpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICBWYWx1ZS5MZW5ndGggPiAwICYmIFJlZ2V4LklzTWF0Y2goVmFsdWVbMF0uVG9TdHJpbmcoKSwgXCJcXFxcd1wiKSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgKFByZXYgIT0gbnVsbCAmJiBQcmV2IGlzIEtleXdvcmQgJiYgKGIgPSB0aGlzIGFzIEJyYWNrZXQpICE9IG51bGwmJiAoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxjaGFyPihiLlZhbHVlKSA9PSAnKCcgfHwgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdE9yRGVmYXVsdDxjaGFyPihiLlZhbHVlKSA9PSAnWycpKSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKEVuZFN0YXRlbWVudCAmJiBOZXh0ICE9IG51bGwgJiYgIWZvcmNlKSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKF9zZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHByaXZhdGUgYm9vbCBDb21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShzdHJpbmcgcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHMuTGVuZ3RoID4gVmFsdWUuTGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlW2ldICE9IHNbaV0pIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJpdmF0ZSBib29sIENvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKGNoYXIgYylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKFZhbHVlLkxlbmd0aDwxKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVmFsdWVbMF0gPT0gYztcclxuICAgICAgICAgICAgfVxyXG5cbiAgICAgICAgXG5wcml2YXRlIGJvb2wgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX09wdGltaXphYmxlPXRydWU7fVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBjbGFzcyBWYXJpYWJsZU5hbWVQcm92aWRlclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgRGljdGlvbmFyeTxzdHJpbmcsc3RyaW5nPiBfcmVwbGFjZSA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgc3RyaW5nPigpO1xyXG4gICAgICAgIHByaXZhdGUgSGFzaFNldDxzdHJpbmc+IF9uYW1lcyA9IG5ldyBIYXNoU2V0PHN0cmluZz4oKTtcclxuICAgICAgICBwcml2YXRlIGludCBfc3RhdGU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX2NoYXJzID0gXCJhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgTmV4dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTdHJpbmdCdWlsZGVyIHNiID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICAgICAgaW50IGluZGV4ID0gX3N0YXRlO1xyXG5cclxuICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IGkgPSBpbmRleCAlIF9jaGFycy5MZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBjaGFyIGMgPSBfY2hhcnNbaV07XHJcbiAgICAgICAgICAgICAgICBzYi5BcHBlbmQoYyk7XHJcbiAgICAgICAgICAgICAgICBpbmRleCAvPSBfY2hhcnMuTGVuZ3RoO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChpbmRleCA+IDApO1xyXG5cclxuICAgICAgICAgICAgX3N0YXRlKys7XHJcbiAgICAgICAgICAgIHJldHVybiBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRGcmVlKGJvb2wgb3B0aW1pemUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHJpbmcgbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGJvb2wgYztcclxuICAgICAgICAgICAgaWYgKG9wdGltaXplKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgcyA9IE5leHQoKTtcclxuICAgICAgICAgICAgICAgIF9uYW1lcy5BZGQocyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gTmV4dCgpO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChfbmFtZXMuQ29udGFpbnMobmFtZSkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRGVmaW5lZChzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfcmVwbGFjZS5Db250YWluc0tleShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRSZXBsYWNlKHN0cmluZyBvcmlnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFfcmVwbGFjZS5Db250YWluc0tleShvcmlnKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nIHMgPSBOZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBfcmVwbGFjZVtvcmlnXSA9IHM7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIF9yZXBsYWNlW29yaWddO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRGVmaW5lKHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFfbmFtZXMuQ29udGFpbnMobmFtZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9uYW1lcy5BZGQobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBWYXJpYWJsZSA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG5CcmFja2V0IGJyOyAgICAgICAgICAgICAgICAgICAgaWYgKChiciA9IHRoaXMgYXMgQnJhY2tldCkgIT0gbnVsbCYmICFici5DdXN0b20gJiYgKGJyLlZhbHVlLkxlbmd0aCA9PSAwIHx8IGJyLlZhbHVlWzBdICE9ICd7JykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoTmV4dCAhPSBudWxsICYmICFHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Y2hhcj4oVmFsdWUpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKE5leHQuVmFsdWUgPT0gXCIuXCIgfHwgTmV4dC5WYWx1ZSA9PSBcIihcIiB8fCBOZXh0LlZhbHVlID09IFwiW1wiKSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIoVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5leHQuVmFsdWUgPT0gXCIuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBOZXh0Lk5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCcuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZXh0IT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LkNvbXBpbGUoY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSBOZXh0LkVuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcmNlRW5kU3RhdGVtZW50ID0gTmV4dC5Gb3JjZUVuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvcmNlRW5kU3RhdGVtZW50VmFsdWUgPSBOZXh0LkZvcmNlRW5kU3RhdGVtZW50VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gTmV4dC5OZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LlByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuT3BlcmF0b3IgbztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dCAhPSBudWxsICYmIChvID0gTmV4dCBhcyBPcGVyYXRvcikgIT0gbnVsbCYmIG8uTmVlZHNMZWZ0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IGJhc2UuQ29tcGlsZShjb250ZXh0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbk9wZXJhdG9yIG9vO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChQcmV2ICE9IG51bGwgJiYgKG9vID0gUHJldiBhcyBPcGVyYXRvcikgIT0gbnVsbCYmIG9vLk5lZWRzUmlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gYmFzZS5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJWYXJpYWJsZTogezB9XCIsYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBJbmNsdWRlIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIEluY2x1ZGUoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiNpZiBqc1xyXG5cclxuI2Vsc2VcclxuICAgICAgICAgICAgICAgICAgICBpZiAoRW52aXJvbm1lbnQuT1NWZXJzaW9uLlBsYXRmb3JtID09IFBsYXRmb3JtSUQuT3RoZXIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IFwiLy9pbmNsdWRlIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQgaW4gd2ViXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlID0gY29udGV4dC5odHRwQ2xpZW50LkdldFN0cmluZ0FzeW5jKFZhbHVlKS5HZXRBd2FpdGVyKCkuR2V0UmVzdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4jZW5kaWZcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiSW5jbHVkZTogezB9XCIsYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgcGFydGlhbCBjbGFzcyBUb2tlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIEtleXdvcmQgOiBUb2tlblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgS2V5d29yZCgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgR3JleUhhY2tDb21waWxlci5Ub2tlbiBPcHRpbWl6ZShHcmV5SGFja0NvbXBpbGVyLkNvbnRleHQgY29udGV4dCwgYm9vbCByZXBsYWNlID0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWUgPT0gXCJ0cnVlXCIpIFZhbHVlID0gXCIxXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlID09IFwiZmFsc2VcIikgVmFsdWUgPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5PcHRpbWl6ZShjb250ZXh0LHJlcGxhY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoVmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZm9yXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3aGlsZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWZcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbXBpbGVOZXh0KGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGlsZU5leHQoY29udGV4dCxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB2b2lkIENvbXBpbGVOZXh0KENvbnRleHQgY29udGV4dCxib29sIHJlbW92ZUJyYWNldHMgPSB0cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKE5leHQgaXMgQnJhY2tldCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBOZXh0LkNvbXBpbGUoY29udGV4dCx0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVtb3ZlQnJhY2V0cylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlclswXSA9ICcgJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgKz0gY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKDAsIGNvbnRleHQuU3RyaW5nQnVpbGRlci5MZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgKz0gY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE5leHQuTmV4dCE9bnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5leHQuTmV4dC5QcmV2ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgTmV4dCA9IE5leHQuTmV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgU2VwYXJhdG9yIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIFNlcGFyYXRvcigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiU2VwYXJhdG9yOiB7MH1cIixWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgcGFydGlhbCBjbGFzcyBUb2tlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIFN0cmluZyA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChDdXN0b20pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiKFxcXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBkZXB0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBsYXN0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBWYWx1ZS5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgKyAxIDwgVmFsdWUuTGVuZ3RoICYmIFZhbHVlW2ldID09ICdcXFxcJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChWYWx1ZVtpICsgMV0gPT0gJ3snIHx8IFZhbHVlW2kgKyAxXSA9PSAnfScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZVtpXSA9PSAneycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoID09IDApIGxhc3QgPSBpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXB0aCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFZhbHVlW2ldID09ICd9JyAmJiAoaSA9PSAwIHx8IFZhbHVlW2kgLSAxXSAhPSAnXFxcXCcpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoIDwgMCkgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwic3RyaW5nIGZvcm1hdCAoezB9KSBpcyBub3QgdmFsaWRcIixWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChcIlxcXCIrKFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29udGV4dCBpbm5lckNvZGVDb250ZXh0ID0gVG9rZW5pemUoVmFsdWUuU3Vic3RyaW5nKGxhc3QsIGkgLSBsYXN0KS5SZXBsYWNlKEBcIlwiXCJcIlwiXCIsIEBcIlwiXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckNvZGVDb250ZXh0Lm5hbWVQcm92aWRlciA9IGNvbnRleHQubmFtZVByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckNvZGVDb250ZXh0LkNvZGVQcmVmaXggPSBjb250ZXh0LkNvZGVQcmVmaXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBjb21waWxlZCA9IGlubmVyQ29kZUNvbnRleHQuQ29tcGlsZShjb250ZXh0Lm9wdGltaXplRW5hYmxlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29tcGlsZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiKStcXFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRlcHRoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChWYWx1ZVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChcIlxcXCIpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZCgnXCInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChFbmRTdGF0ZW1lbnQpIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoX3NlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJTdHJpbmc6IHswfXsxfVwiLChDdXN0b20gPyBcIiRcIiA6IFwiXCIpLGJhc2UuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRleHQuUmVndWxhckV4cHJlc3Npb25zO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBUZW1wbGF0ZSA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVmFsdWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIGlmIChfdmFsdWUgIT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIF92YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHN0cmluZyBfdmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgcHVibGljIEVUZW1wbGF0ZSBUZW1wbGF0ZVR5cGUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIHN0cmluZyBSZWdleFN0cmluZyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgTWF0Y2hDb2xsZWN0aW9uIE1hdGNoZXMgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIE9wdGltaXplKENvbnRleHQgY29udGV4dCwgYm9vbCByZXBsYWNlID0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKFRlbXBsYXRlVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLkVUZW1wbGF0ZS5JdGVyYXRpb25JbmRleDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChQcmV2ICE9IG51bGwgJiYgUHJldi5WYWx1ZSA9PSBcIi5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5PcHRpbWl6ZShjb250ZXh0LCByZXBsYWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgdmFyX25hbWUgPSBNYXRjaGVzWzBdLkdyb3Vwc1syXS5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmcuSXNOdWxsT3JXaGl0ZVNwYWNlKHZhcl9uYW1lKSB8fCBjb250ZXh0Lklnbm9yZU9wdGltaXplKHZhcl9uYW1lKSkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdmFsdWUgPSBSZWdleC5SZXBsYWNlKFZhbHVlLCBSZWdleFN0cmluZywgc3RyaW5nLkZvcm1hdChcIiQxezB9JDNcIixjb250ZXh0Lm5hbWVQcm92aWRlci5HZXRSZXBsYWNlKHZhcl9uYW1lKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLkVUZW1wbGF0ZS5JZ25vcmVPcHRpbWl6YXRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChUZW1wbGF0ZVR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuQ29tbWVudDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY29udGV4dC5TZXR0aW5ncyAmIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5TZXR0aW5ncy5SZW1vdmVDb21tZW50cykgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUHJldiAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5OZXh0ID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFQcmV2LkVuZFN0YXRlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5FbmRTdGF0ZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChfc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlJvb3RUb2tlbiA9IE5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5QcmV2ID0gUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gPSBQcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYhPW51bGwgJiYgTmV4dCE9bnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByZXYuTmV4dCA9IE5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5leHQuUHJldiA9IFByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmRMaW5lKFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBib29sIElzVmFsdWVTdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZS5MZW5ndGggPCAyKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbHVlWzBdID09ICdcIicgJiYgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5MYXN0T3JEZWZhdWx0PGNoYXI+KFZhbHVlKSA9PSAnXCInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBUZW1wbGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIFRlbXBsYXRlKEVUZW1wbGF0ZSB0ZW1wbGF0ZSwgTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXMsIHN0cmluZyByZWdleCwgQ29udGV4dCBjb250ZXh0KSA6IGJhc2UoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRlbXBsYXRlVHlwZSA9IHRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIE1hdGNoZXMgPSBtYXRjaGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlZ2V4U3RyaW5nID0gcmVnZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGVtcGxhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuSWdub3JlT3B0aW1pemF0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbHVlID0gTWF0Y2hlc1swXS5Hcm91cHNbMl0uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNWYWx1ZVN0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9IF92YWx1ZS5TdWJzdHJpbmcoMSwgX3ZhbHVlLkxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZShfdmFsdWUpKSBjb250ZXh0LmN1c3RvbUlnbm9yZU9wdGltaXplLkFkZChfdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9ICdcIicgKyBfdmFsdWUgKyAnXCInO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZShNYXRjaGVzWzBdLkdyb3Vwc1syXS5WYWx1ZSkpIGNvbnRleHQuY3VzdG9tSWdub3JlT3B0aW1pemUuQWRkKE1hdGNoZXNbMF0uR3JvdXBzWzJdLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgQnJhY2tldCA6IFZhcmlhYmxlXHJcbiAgICAgICAgICAgIHtcclxucHVibGljIGJvb2wgSXNPcGVuaW5nXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBWYWx1ZSA9PSBcIihcIiB8fCBWYWx1ZSA9PSBcIltcIiB8fCBWYWx1ZSA9PSBcIntcIjtcclxuICAgIH1cclxufXB1YmxpYyBib29sIElzQ2xvc2luZ1xyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVmFsdWUgPT0gXCIpXCIgfHwgVmFsdWUgPT0gXCJdXCIgfHwgVmFsdWUgPT0gXCJ9XCI7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAgICAgICAgIHByaXZhdGUgRGljdGlvbmFyeTxjaGFyLCBjaGFyPiBfb3BlbmluZ1RvQ2xvc2luZyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PGNoYXIsIGNoYXI+KCksKF9vMSk9PntfbzEuQWRkKCcoJywnKScpO19vMS5BZGQoJ1snLCddJyk7X28xLkFkZCgneycsJ30nKTtyZXR1cm4gX28xO30pO1xyXG4gICAgICAgICAgICAgICAgcHVibGljIEJyYWNrZXQoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBUb2tlbiBDb21waWxlSW5zaWRlKENvbnRleHQgY29udGV4dCwgYm9vbCBtdWx0aUxpbmUgPSBmYWxzZSwgc3RyaW5nIHByZWZpeCA9IFwiXCIsIHN0cmluZyBwb3N0Zml4ID0gXCJcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUb2tlbiBsYXN0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICBUb2tlbiBjdXJyZW50ID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIocHJlZml4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhciBjbG9zZSA9IF9vcGVuaW5nVG9DbG9zaW5nW1N5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Y2hhcj4oVmFsdWUpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnQhPW51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW11bHRpTGluZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudC5Gb3JjZUVuZFN0YXRlbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50LkZvcmNlRW5kU3RhdGVtZW50VmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuRW5kU3RhdGVtZW50ID0gY3VycmVudC5FbmRTdGF0ZW1lbnQgfHwgY3VycmVudC5OZXh0LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKGNsb3NlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdCA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKGNsb3NlKSkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuQ29tcGlsZShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQuTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Lk5leHQgIT0gbnVsbCAmJiBsYXN0Lk5leHQuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoXCJlbHNlXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdC5WYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3QuRm9yY2VFbmRTdGF0ZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0LkZvcmNlRW5kU3RhdGVtZW50VmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXN0cmluZy5Jc051bGxPcldoaXRlU3BhY2UocG9zdGZpeCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0LlZhbHVlID0gcG9zdGZpeDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKCFsYXN0LlByZXYuRW5kU3RhdGVtZW50ICYmIG11bHRpTGluZSlcclxuICAgICAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kTGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QuRm9yY2VFbmRTdGF0ZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QuRm9yY2VFbmRTdGF0ZW1lbnRWYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QuQ29tcGlsZShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0LkZvcmNlRW5kU3RhdGVtZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gbGFzdC5FbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsYXN0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBib29sIGVsc2VGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBsYW1iZGFGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKElzT3BlbmluZylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2tldERlcHRoKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoSXNDbG9zaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5icmFja2V0RGVwdGgtLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEN1c3RvbSkgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKElzT3BlbmluZylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRva2VuIG5vZGUgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYgIT0gbnVsbCAmJiBWYWx1ZSA9PSBcIntcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKChQcmV2IGlzIEtleXdvcmQgfHwgKGxhbWJkYUZsYWcgPSBQcmV2LlZhbHVlID09IFwiPT5cIikpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVsc2VGbGFnID0gUHJldi5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcImVsc2VcIikpKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHByZWZpeCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgcG9zdGZpeCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxzZUZsYWcgfHwgUHJldi5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcImVsc2VcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGlmXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChQcmV2LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiaWZcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZml4ID0gXCJ0aGVuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGlmXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGxhbWJkYUZsYWcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGZ1bmN0aW9uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChQcmV2LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiZnVuY3Rpb25cIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGZ1bmN0aW9uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKFByZXYuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoXCJmb3JcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGZvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoUHJldi5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcIndoaWxlXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RmaXggPSBcImVuZCB3aGlsZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBDb21waWxlSW5zaWRlKGNvbnRleHQsIHRydWUsIHByZWZpeCtcIlxcblwiLCBwb3N0Zml4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBDb21waWxlSW5zaWRlKGNvbnRleHQsZmFsc2UsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gbm9kZSE9bnVsbD9ub2RlLk5leHQ6KFRva2VuKW51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoUHJldiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlJvb3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2Lk5leHQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG5vZGUhPW51bGw/bm9kZS5OZXh0OihUb2tlbiludWxsKSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLk5leHQuUHJldiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN1c3RvbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBDb21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiQnJhY2tldDogezB9XCIsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgR3JleUhhY2tUb29scy5EZWJ1Z2dlcjtcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgT3BlcmF0b3IgOiBWYXJpYWJsZVxyXG4gICAgICAgICAgICB7XHJcbnB1YmxpYyBib29sIE5lZWRzTGVmdFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl9vcGVyYXRvcnMuQ29udGFpbnNLZXkoVmFsdWUpICYmIF9vcGVyYXRvcnNbVmFsdWVdLkNvbnRhaW5zKFwiJGFcIik7XHJcbiAgICB9XHJcbn1wdWJsaWMgYm9vbCBOZWVkc1JpZ2h0XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX29wZXJhdG9ycy5Db250YWluc0tleShWYWx1ZSkgJiYgX29wZXJhdG9yc1tWYWx1ZV0uQ29udGFpbnMoXCIkYlwiKTtcclxuICAgIH1cclxufSAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBDdXN0b21cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXQgeyByZXR1cm4gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl9vcGVyYXRvcnMuQ29udGFpbnNLZXkoVmFsdWUpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0IHsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgT3BlcmF0b3IoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ3VzdG9tKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZyBkZXB0aCA9IGNvbnRleHQuYnJhY2tldERlcHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgbGVmdCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyByaWdodCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRva2VuIHRtcFJpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG9rZW4gdG1wTGVmdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBzID0gX29wZXJhdG9yc1tWYWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZWVkc0xlZnQgJiYgUHJldiAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbkJyYWNrZXQgYjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChiID0gUHJldiBhcyBCcmFja2V0KSAhPSBudWxsJiYgYi5Jc09wZW5pbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiaW52YWxpZCBzeW50YXggZm9yIHRlbXBsYXRlIHswfVwiLFZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBMZWZ0ID0gUHJldi5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyA9IHMuUmVwbGFjZShcIiRhXCIsIGxlZnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5Qb3AoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsUHJldikhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFRva2VuPihcImtleTFcIikuUHJldjooVG9rZW4pbnVsbCkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2ID0gUHJldi5QcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYuTmV4dCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Sb290VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmVlZHNSaWdodCAmJiBOZXh0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcFJpZ2h0ID0gTmV4dC5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgPSBzLlJlcGxhY2UoXCIkYlwiLCByaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gTmV4dC5FbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkyXCIsTmV4dCkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFRva2VuPihcImtleTJcIikuTmV4dDooVG9rZW4pbnVsbCkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gTmV4dC5OZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQuUHJldiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWU9PVwiPT5cIiAmJiB0bXBMZWZ0LlByZXYgIT0gbnVsbCAmJiB0bXBMZWZ0LlByZXYuVmFsdWUgIT0gXCI9XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBuYW1lID0gY29udGV4dC5uYW1lUHJvdmlkZXIuR2V0RnJlZShjb250ZXh0Lm9wdGltaXplRW5hYmxlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IFwiQFwiICsgbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuQ29kZVByZWZpeC5BcHBlbmQobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LkNvZGVQcmVmaXguQXBwZW5kKFwiPVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuQ29kZVByZWZpeC5BcHBlbmRMaW5lKHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gdG1wUmlnaHQuRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlID0gcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJPcGVyYXRvcjogezB9XCIsYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==

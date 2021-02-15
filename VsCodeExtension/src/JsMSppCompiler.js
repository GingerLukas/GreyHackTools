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

                if (last.Next != null && last.Next.CompareBeginningOfValue$1("else") && multiLine) {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJKc01TcHBDb21waWxlci5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiRGVidWdnZXIvR3JleUhhY2tFbXVsYXRpb24vTUQ1LmNzIiwiQ29tcGlsZXIvR3JleUhhY2tDb21waWxlci5jcyIsIkNvbXBpbGVyL0NvbnRleHQuY3MiLCJDb21waWxlci9Ub2tlbnMvVG9rZW4uY3MiLCJDb21waWxlci9WYXJpYWJsZU5hbWVQcm92aWRlci5jcyIsIkNvbXBpbGVyL1Rva2Vucy9WYXJpYWJsZS5jcyIsIkNvbXBpbGVyL1Rva2Vucy9JbmNsdWRlLmNzIiwiQ29tcGlsZXIvVG9rZW5zL0tleXdvcmQuY3MiLCJDb21waWxlci9Ub2tlbnMvU2VwYXJhdG9yLmNzIiwiQ29tcGlsZXIvVG9rZW5zL1N0cmluZy5jcyIsIkNvbXBpbGVyL1Rva2Vucy9CcmFja2V0LmNzIiwiQ29tcGlsZXIvVG9rZW5zL09wZXJhdG9yLmNzIiwiQ29tcGlsZXIvVG9rZW5zL1RlbXBsYXRlLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OzZCQVV5QkE7NkJBVUNBOzs7O3NDQWtCWUEsR0FBUUE7b0JBRWxDQSxPQUFPQSxHQUFDQSxPQUFLQSxhQUFLQSxDQUFDQSxNQUFLQSxDQUFDQSxPQUFLQTs7cUNBSUhBO29CQUUzQkE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7O29CQUVBQSxnQkFBZ0JBLENBQUNBLE9BQUtBLENBQUNBLENBQUNBO29CQUN4QkEscUJBQXFCQSxrQkFBU0EsK0JBQW1CQTtvQkFDakRBLGtCQUFXQSxVQUFPQSxtQkFBZ0JBO29CQUNsQ0Esa0NBQWVBLGNBQWZBOztvQkFFQUEsYUFBZ0JBLCtCQUFzQkE7b0JBQ3RDQSxrQkFBV0EsV0FBV0EsZ0JBQWdCQTs7b0JBRXRDQSxLQUFLQSxXQUFXQSxJQUFJQSxtREFBOEJBO3dCQUc5Q0EsUUFBV0E7d0JBQ1hBLEtBQUtBLFdBQVdBLFFBQVVBOzRCQUN0QkEs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NEJBQXdCQTs0QkFBd0JBOzRCQUFvQkE7NEJBQWtCQTs0QkFBd0JBOzRCQUF1QkE7NEJBQXdCQTs0QkFBMEJBOzRCQUFvQkE7NEJBQXNCQTs0QkFBZ0JBOzRCQUFpQkE7NEJBQTBCQTs0QkFBcUJBOzRCQUF1QkE7NEJBQXNCQTs0QkFBcUJBOzRCQUFzQkE7NEJBQXFCQTs0QkFBbUJBOzRCQUFpQkE7NEJBQWtCQTs0QkFBb0JBOzRCQUEwQkE7NEJBQXlCQTs0QkFBdUJBOzRCQUFtQkE7NEJBQW1CQTs0QkFBcUJBOzRCQUFxQkE7NEJBQXFCQTs0QkFBcUJBOzRCQUE2QkE7NEJBQXVCQTs0QkFBZ0JBOzRCQUF1QkE7NEJBQWtCQTs0QkFBZUE7NEJBQW9CQTs0QkFBZ0JBOzRCQUFvQkE7NEJBQWtCQTs0QkFBaUJBOzRCQUFlQTs0QkFBZ0JBOzRCQUFnQkE7NEJBQW1CQTs0QkFBMkJBOzRCQUEyQkE7NEJBQW9CQTs0QkFBb0JBOzRCQUFpQkE7NEJBQWtCQTs0QkFBdUJBOzRCQUFnQkE7NEJBQXVCQTs0QkFBY0E7NEJBQWdCQTs0QkFBcUJBOzRCQUFlQTs0QkFBcUJBOzRCQUF1QkE7NEJBQWlCQTs0QkFBd0JBOzRCQUFxQkE7NEJBQWdCQTs0QkFBZ0JBOzRCQUFlQTs0QkFBaUJBOzRCQUFrQkE7NEJBQWtCQTs0QkFBbUJBOzRCQUFtQkE7NEJBQWVBOzRCQUFpQkE7NEJBQWdCQTs0QkFBd0JBOzRCQUFlQTs0QkFBdUJBOzRCQUFxQkE7NEJBQXNCQTs0QkFBbUJBOzRCQUFnQkE7NEJBQWVBOzRCQUFnQkE7NEJBQWlCQTs0QkFBMEJBOzRCQUFnQkE7NEJBQWlCQTs0QkFBZ0JBOzRCQUEwQkE7NEJBQWVBOzRCQUFlQTs0QkFBZUE7NEJBQWtCQTs0QkFBaUJBOzRCQUFnQkE7NEJBQWtCQTs0QkFBaUJBOzRCQUFzQkE7NEJBQTRCQTs0QkFBc0JBOzRCQUE2QkE7NEJBQWVBOzRCQUFrQkE7NEJBQW1CQTs0QkFBaUJBOzRCQUF5QkE7NEJBQWtCQTs0QkFBd0JBOzRCQUFnQkE7NEJBQWdCQTs0QkFBZ0JBOzRCQUFvQkE7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NEJBQ3RFQSxjQUFTQSwyQkFBTUE7OzRCQUlmQSxJQUFJQSxDQUFDQSx1QkFBdUJBO2dDQUE2QkEsaUNBQWlDQTs7O3dCQUU5RkE7Ozs7O2dDQS9GbUJBLFNBQWlCQTs7Z0JBRTVDQSxRQUFRQTtvQkFFSkEsS0FBS0E7d0JBQ0RBLElBQUlBOzRCQUVBQSxlQUFrQkE7NEJBQ2xCQSxJQUFJQSxpQ0FBMEJBLGFBQWFBLHVCQUF1QkE7Z0NBQzlEQSxPQUFPQTs7NEJBQ1hBLGNBQVNBLDZDQUFjQSxZQUFPQSxrQkFDOURBLGlDQUF3QkEsZ0NBQWdDQTs7d0JBRzVCQTtvQkFDSkEsS0FBS0E7d0JBQ0RBOztnQkFFUkEsT0FBT0E7OytCQUdtQkEsU0FBaUJBOztnQkFFM0NBLFFBQVFBO29CQUVKQSxLQUFLQTt3QkFDREEsSUFBSUEsQ0FBQ0EsbUJBQW1CQTs0QkFFcEJBLElBQUlBLGFBQVFBO2dDQUVSQSxpQkFBWUE7Z0NBQ1pBLElBQUlBLENBQUNBO29DQUVEQTtvQ0FDQUEsNkJBQTZCQTs7O2dDQUtqQ0Esb0JBQW9CQTs7OzRCQUd4QkEsSUFBSUEsYUFBUUE7Z0NBRVJBLGlCQUFZQTs7Z0NBSVpBLG9CQUFvQkE7OzRCQUV4QkEsT0FBT0E7O3dCQUVYQTs7OztnQkFVUkEsT0FBT0EsMkVBQWFBLFNBQVNBOzs7Z0JBSzdCQSxJQUFJQTtvQkFBa0JBOztnQkFDdEJBLE9BQU9BLG1DQUFtQkEsNEJBQTJDQSxZQUFOQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHMuRGVidWdnZXJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1ENVxyXG4gICAge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogUm91bmQgc2hpZnQgdmFsdWVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3RhdGljIGludFtdIHMgPSBuZXcgaW50WzY0XSB7XHJcbiAgICAgICAgICAgIDcsIDEyLCAxNywgMjIsICA3LCAxMiwgMTcsIDIyLCAgNywgMTIsIDE3LCAyMiwgIDcsIDEyLCAxNywgMjIsXHJcbiAgICAgICAgICAgIDUsICA5LCAxNCwgMjAsICA1LCAgOSwgMTQsIDIwLCAgNSwgIDksIDE0LCAyMCwgIDUsICA5LCAxNCwgMjAsXHJcbiAgICAgICAgICAgIDQsIDExLCAxNiwgMjMsICA0LCAxMSwgMTYsIDIzLCAgNCwgMTEsIDE2LCAyMywgIDQsIDExLCAxNiwgMjMsXHJcbiAgICAgICAgICAgIDYsIDEwLCAxNSwgMjEsICA2LCAxMCwgMTUsIDIxLCAgNiwgMTAsIDE1LCAyMSwgIDYsIDEwLCAxNSwgMjFcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIENvbnN0YW50IEsgVmFsdWVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3RhdGljIHVpbnRbXSBLID0gbmV3IHVpbnRbNjRdIHtcclxuICAgICAgICAgICAgMHhkNzZhYTQ3OCwgMzkwNTQwMjcxMFUsIDYwNjEwNTgxOSwgMzI1MDQ0MTk2NlUsXHJcbiAgICAgICAgICAgIDB4ZjU3YzBmYWYsIDB4NDc4N2M2MmEsIDB4YTgzMDQ2MTMsIDB4ZmQ0Njk1MDEsXHJcbiAgICAgICAgICAgIDB4Njk4MDk4ZDgsIDIzMzY1NTI4NzlVLCA0Mjk0OTI1MjMzVSwgMjMwNDU2MzEzNFUsXHJcbjE4MDQ2MDM2ODIsIDB4ZmQ5ODcxOTMsIDB4YTY3OTQzOGUsIDEyMzY1MzUzMjksXHJcbiAgICAgICAgICAgIDB4ZjYxZTI1NjIsIDMyMjU0NjU2NjRVLCAweDI2NWU1YTUxLCAzOTIxMDY5OTk0VSxcclxuICAgICAgICAgICAgMHhkNjJmMTA1ZCwgMHgwMjQ0MTQ1MywgMHhkOGExZTY4MSwgMzg4OTQyOTQ0OFUsXHJcbiAgICAgICAgICAgIDB4MjFlMWNkZTYsIDB4YzMzNzA3ZDYsIDB4ZjRkNTBkODcsIDB4NDU1YTE0ZWQsXHJcbiAgICAgICAgICAgIDB4YTllM2U5MDUsIDB4ZmNlZmEzZjgsIDB4Njc2ZjAyZDksIDB4OGQyYTRjOGEsXHJcbiAgICAgICAgICAgIDB4ZmZmYTM5NDIsIDB4ODc3MWY2ODEsIDB4NmQ5ZDYxMjIsIDB4ZmRlNTM4MGMsXHJcbjI3NjM5NzUyMzZVLCAxMjcyODkzMzUzLCA0MTM5NDY5NjY0VSwgMzIwMDIzNjY1NlUsXHJcbjY4MTI3OTE3NCwgMHhlYWExMjdmYSwgMHhkNGVmMzA4NSwgMHgwNDg4MWQwNSxcclxuICAgICAgICAgICAgMHhkOWQ0ZDAzOSwgMzg3MzE1MTQ2MVUsIDB4MWZhMjdjZjgsIDB4YzRhYzU2NjUsXHJcbiAgICAgICAgICAgIDB4ZjQyOTIyNDQsIDB4NDMyYWZmOTcsIDI4Nzg2MTIzOTFVLCAweGZjOTNhMDM5LFxyXG4xNzAwNDg1NTcxLCAweDhmMGNjYzkyLCAweGZmZWZmNDdkLCAweDg1ODQ1ZGQxLFxyXG4gICAgICAgICAgICAweDZmYTg3ZTRmLCAweGZlMmNlNmUwLCAweGEzMDE0MzE0LCAweDRlMDgxMWExLFxyXG4gICAgICAgICAgICAweGY3NTM3ZTgyLCAzMTc0NzU2OTE3VSwgNzE4Nzg3MjU5LCAzOTUxNDgxNzQ1VSAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB1aW50IGxlZnRSb3RhdGUodWludCB4LCBpbnQgYylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoeCA8PCBjKSB8ICh4ID4+ICgzMiAtIGMpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFzc3VtZXMgd2hvbGUgYnl0ZXMgYXMgaW5wdXRcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBDYWxjdWxhdGUoYnl0ZVtdIGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdWludCBhMCA9IDB4Njc0NTIzMDE7ICAgLy8gQVxyXG4gICAgICAgICAgICB1aW50IGIwID0gNDAyMzIzMzQxN1U7ICAgLy8gQlxyXG4gICAgICAgICAgICB1aW50IGMwID0gMjU2MjM4MzEwMlU7ICAgLy8gQ1xyXG4gICAgICAgICAgICB1aW50IGQwID0gMHgxMDMyNTQ3NjsgICAvLyBEXHJcblxyXG4gICAgICAgICAgICB2YXIgYWRkTGVuZ3RoID0gKDU2IC0gKChpbnB1dC5MZW5ndGggKyAxKSAlIDY0KSkgJSA2NDsgLy8gY2FsY3VsYXRlIHRoZSBuZXcgbGVuZ3RoIHdpdGggcGFkZGluZ1xyXG4gICAgICAgICAgICB2YXIgcHJvY2Vzc2VkSW5wdXQgPSBuZXcgYnl0ZVtpbnB1dC5MZW5ndGggKyAxICsgYWRkTGVuZ3RoICsgOF07XHJcbiAgICAgICAgICAgIEFycmF5LkNvcHkoaW5wdXQsIHByb2Nlc3NlZElucHV0LCBpbnB1dC5MZW5ndGgpO1xyXG4gICAgICAgICAgICBwcm9jZXNzZWRJbnB1dFtpbnB1dC5MZW5ndGhdID0gMHg4MDsgLy8gYWRkIDFcclxuXHJcbiAgICAgICAgICAgIGJ5dGVbXSBsZW5ndGggPSBCaXRDb252ZXJ0ZXIuR2V0Qnl0ZXMoaW5wdXQuTGVuZ3RoICogOCk7IC8vIGJpdCBjb252ZXJ0ZXIgcmV0dXJucyBsaXR0bGUtZW5kaWFuXHJcbiAgICAgICAgICAgIEFycmF5LkNvcHkobGVuZ3RoLCAwLCBwcm9jZXNzZWRJbnB1dCwgcHJvY2Vzc2VkSW5wdXQuTGVuZ3RoIC0gOCwgNCk7IC8vIGFkZCBsZW5ndGggaW4gYml0c1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwcm9jZXNzZWRJbnB1dC5MZW5ndGggLyA2NDsgKytpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb3B5IHRoZSBpbnB1dCB0byBNXHJcbiAgICAgICAgICAgICAgICB1aW50W10gTSA9IG5ldyB1aW50WzE2XTtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgMTY7ICsrailcclxuICAgICAgICAgICAgICAgICAgICBNW2pdID0gQml0Q29udmVydGVyLlRvVUludDMyKHByb2Nlc3NlZElucHV0LCAoaSAqIDY0KSArIChqICogNCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGluaXRpYWxpemUgcm91bmQgdmFyaWFibGVzXHJcbiAgICAgICAgICAgICAgICB1aW50IEEgPSBhMCwgQiA9IGIwLCBDID0gYzAsIEQgPSBkMCwgRiA9IDAsIGcgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHByaW1hcnkgbG9vcFxyXG4gICAgICAgICAgICAgICAgZm9yICh1aW50IGsgPSAwOyBrIDwgNjQ7ICsraylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoayA8PSAxNSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEYgPSAoQiAmIEMpIHwgKH5CICYgRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcgPSBrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChrID49IDE2ICYmIGsgPD0gMzEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGID0gKEQgJiBCKSB8ICh+RCAmIEMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnID0gKCg1ICogaykgKyAxKSAlIDE2O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChrID49IDMyICYmIGsgPD0gNDcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGID0gQiBeIEMgXiBEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnID0gKCgzICogaykgKyA1KSAlIDE2O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChrID49IDQ4KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRiA9IEMgXiAoQiB8IH5EKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZyA9ICg3ICogaykgJSAxNjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkdGVtcCA9IEQ7XHJcbiAgICAgICAgICAgICAgICAgICAgRCA9IEM7XHJcbiAgICAgICAgICAgICAgICAgICAgQyA9IEI7XHJcbiAgICAgICAgICAgICAgICAgICAgQiA9IEIgKyBsZWZ0Um90YXRlKChBICsgRiArIEtba10gKyBNW2ddKSwgc1trXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgQSA9IGR0ZW1wO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGEwICs9IEE7XHJcbiAgICAgICAgICAgICAgICBiMCArPSBCO1xyXG4gICAgICAgICAgICAgICAgYzAgKz0gQztcclxuICAgICAgICAgICAgICAgIGQwICs9IEQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHZXRCeXRlU3RyaW5nKGEwKSArIEdldEJ5dGVTdHJpbmcoYjApICsgR2V0Qnl0ZVN0cmluZyhjMCkgKyBHZXRCeXRlU3RyaW5nKGQwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHN0cmluZyBHZXRCeXRlU3RyaW5nKHVpbnQgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuSm9pbihcIlwiLCBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdDxieXRlLHN0cmluZz4oQml0Q29udmVydGVyLkdldEJ5dGVzKHgpLChGdW5jPGJ5dGUsc3RyaW5nPikoeSA9PiB5LlRvU3RyaW5nKFwieDJcIikpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRleHQuUmVndWxhckV4cHJlc3Npb25zO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgICNyZWdpb24gU2V0dGluZ3NcclxuXHJcbiAgICAgICAgW0ZsYWdzXVxyXG4gICAgICAgIHB1YmxpYyBlbnVtIFNldHRpbmdzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOb25lID0gMCxcclxuICAgICAgICAgICAgSWdub3JlTWFwVmFyaWFibGVzID0gMSxcclxuICAgICAgICAgICAgUmVtb3ZlQ29tbWVudHMgPSAyLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAjcmVnaW9uIEludGVybmFsXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHN0cmluZyBfc2VwYXJhdG9yID0gRW52aXJvbm1lbnQuTmV3TGluZTtcclxuICAgICAgICAvL3ByaXZhdGUgc3RhdGljIHN0cmluZyBfc2VwYXJhdG9yID0gXCI7XCI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxjaGFyPiBfdG9rZW5TZXBhcmF0b3JzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8Y2hhcj4oKSwoX28xKT0+e19vMS5BZGQoJyAnKTtfbzEuQWRkKCcuJyk7X28xLkFkZCgnLCcpO19vMS5BZGQoJzonKTtyZXR1cm4gX28xO30pO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuQnJhY2tldHMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzIpPT57X28yLkFkZCgnKCcpO19vMi5BZGQoJyknKTtfbzIuQWRkKCdbJyk7X28yLkFkZCgnXScpO19vMi5BZGQoJ3snKTtfbzIuQWRkKCd9Jyk7cmV0dXJuIF9vMjt9KTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlbk9wZXJhdG9ycyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vMyk9PntfbzMuQWRkKCcrJyk7X28zLkFkZCgnLScpO19vMy5BZGQoJyonKTtfbzMuQWRkKCcvJyk7X28zLkFkZCgnJScpO19vMy5BZGQoJzwnKTtfbzMuQWRkKCc+Jyk7X28zLkFkZCgnPScpO19vMy5BZGQoJyEnKTtfbzMuQWRkKCdeJyk7X28zLkFkZCgnJicpO19vMy5BZGQoJ3wnKTtfbzMuQWRkKCdAJyk7X28zLkFkZCgnficpO3JldHVybiBfbzM7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8c3RyaW5nPiBfdG9rZW5FbmRTdGF0ZW1lbnRzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8c3RyaW5nPigpLChfbzQpPT57X280LkFkZChcIlxcblwiKTtfbzQuQWRkKFwiXFxyXFxuXCIpO19vNC5BZGQoXCI7XCIpO19vNC5BZGQoXCJ9XCIpO3JldHVybiBfbzQ7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8c3RyaW5nPiBfdG9rZW5JbmNsdWRlID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8c3RyaW5nPigpLChfbzUpPT57X281LkFkZChcIiMhXCIpO3JldHVybiBfbzU7fSk7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxjaGFyPiBfdG9rZW5FbmRJbmNsdWRlID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8Y2hhcj4oKSwoX282KT0+e19vNi5BZGQoJyEnKTtyZXR1cm4gX282O30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlblN0cmluZ3MgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzcpPT57X283LkFkZCgnXCInKTtfbzcuQWRkKCckJyk7cmV0dXJuIF9vNzt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxzdHJpbmc+IF9rZXl3b3JkcyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PHN0cmluZz4oKSwoX284KT0+e19vOC5BZGQoXCJpZlwiKTtfbzguQWRkKFwidGhlblwiKTtfbzguQWRkKFwiZWxzZVwiKTtfbzguQWRkKFwiZW5kXCIpO19vOC5BZGQoXCJ3aGlsZVwiKTtfbzguQWRkKFwiZm9yXCIpO19vOC5BZGQoXCJpblwiKTtfbzguQWRkKFwiYW5kXCIpO19vOC5BZGQoXCJvclwiKTtfbzguQWRkKFwibm90XCIpO19vOC5BZGQoXCJ0cnVlXCIpO19vOC5BZGQoXCJmYWxzZVwiKTtfbzguQWRkKFwicmV0dXJuXCIpO19vOC5BZGQoXCJjb250aW51ZVwiKTtfbzguQWRkKFwiYnJlYWtcIik7X284LkFkZChcIm5ld1wiKTtfbzguQWRkKFwiZnVuY3Rpb25cIik7cmV0dXJuIF9vODt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxzdHJpbmc+IF9pZ25vcmVPcHRpbWl6ZSA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PHN0cmluZz4oKSwoX285KT0+e19vOS5BZGQoXCJGaWxlXCIpO19vOS5BZGQoXCJhYnNcIik7X285LkFkZChcImFjb3NcIik7X285LkFkZChcImFjdGl2ZV9uZXRfY2FyZFwiKTtfbzkuQWRkKFwiYWN0aXZlX3VzZXJcIik7X285LkFkZChcImFpcmNyYWNrXCIpO19vOS5BZGQoXCJhaXJtb25cIik7X285LkFkZChcImFzaW5cIik7X285LkFkZChcImF0YW5cIik7X285LkFkZChcImJpdHdpc2VcIik7X285LkFkZChcImJzc2lkX25hbWVcIik7X285LkFkZChcImJ1aWxkXCIpO19vOS5BZGQoXCJjZWlsXCIpO19vOS5BZGQoXCJjaGFuZ2VfcGFzc3dvcmRcIik7X285LkFkZChcImNoYXJcIik7X285LkFkZChcImNobW9kXCIpO19vOS5BZGQoXCJjbG9zZV9wcm9ncmFtXCIpO19vOS5BZGQoXCJjb2RlXCIpO19vOS5BZGQoXCJjb21tYW5kX2luZm9cIik7X285LkFkZChcImNvbm5lY3RfZXRoZXJuZXRcIik7X285LkFkZChcImNvbm5lY3Rfc2VydmljZVwiKTtfbzkuQWRkKFwiY29ubmVjdF93aWZpXCIpO19vOS5BZGQoXCJjb3B5XCIpO19vOS5BZGQoXCJjb3NcIik7X285LkFkZChcImNyZWF0ZV9mb2xkZXJcIik7X285LkFkZChcImNyZWF0ZV9ncm91cFwiKTtfbzkuQWRkKFwiY3JlYXRlX3VzZXJcIik7X285LkFkZChcImN1cnJlbnRfZGF0ZVwiKTtfbzkuQWRkKFwiY3VycmVudF9wYXRoXCIpO19vOS5BZGQoXCJkZWNpcGhlclwiKTtfbzkuQWRkKFwiZGVsZXRlXCIpO19vOS5BZGQoXCJkZWxldGVfZ3JvdXBcIik7X285LkFkZChcImRlbGV0ZV91c2VyXCIpO19vOS5BZGQoXCJkZXZpY2VfcG9ydHNcIik7X285LkFkZChcImRldmljZXNfbGFuX2lwXCIpO19vOS5BZGQoXCJkdW1wX2xpYlwiKTtfbzkuQWRkKFwiZXNzaWRfbmFtZVwiKTtfbzkuQWRkKFwiZXhpdFwiKTtfbzkuQWRkKFwiZmxvb3JcIik7X285LkFkZChcImZvcm1hdF9jb2x1bW5zXCIpO19vOS5BZGQoXCJnZXRfZmlsZXNcIik7X285LkFkZChcImdldF9mb2xkZXJzXCIpO19vOS5BZGQoXCJnZXRfbGFuX2lwXCIpO19vOS5BZGQoXCJnZXRfcG9ydHNcIik7X285LkFkZChcImdldF9yb3V0ZXJcIik7X285LkFkZChcImdldF9zaGVsbFwiKTtfbzkuQWRkKFwiZ2xvYmFsc1wiKTtfbzkuQWRkKFwiZ3JvdXBcIik7X285LkFkZChcImdyb3Vwc1wiKTtfbzkuQWRkKFwiaGFzSW5kZXhcIik7X285LkFkZChcImhhc19wZXJtaXNzaW9uXCIpO19vOS5BZGQoXCJob3N0X2NvbXB1dGVyXCIpO19vOS5BZGQoXCJpbmNsdWRlX2xpYlwiKTtfbzkuQWRkKFwiaW5kZXhPZlwiKTtfbzkuQWRkKFwiaW5kZXhlc1wiKTtfbzkuQWRkKFwiaXNfYmluYXJ5XCIpO19vOS5BZGQoXCJpc19jbG9zZWRcIik7X285LkFkZChcImlzX2ZvbGRlclwiKTtfbzkuQWRkKFwiaXNfbGFuX2lwXCIpO19vOS5BZGQoXCJpc19uZXR3b3JrX2FjdGl2ZVwiKTtfbzkuQWRkKFwiaXNfdmFsaWRfaXBcIik7X285LkFkZChcImpvaW5cIik7X285LkFkZChcImxhc3RJbmRleE9mXCIpO19vOS5BZGQoXCJsYXVuY2hcIik7X285LkFkZChcImxlblwiKTtfbzkuQWRkKFwibGliX25hbWVcIik7X285LkFkZChcImxvYWRcIik7X285LkFkZChcImxvY2FsX2lwXCIpO19vOS5BZGQoXCJsb2NhbHNcIik7X285LkFkZChcImxvd2VyXCIpO19vOS5BZGQoXCJtZDVcIik7X285LkFkZChcIm1vdmVcIik7X285LkFkZChcIm5hbWVcIik7X285LkFkZChcIm5ldF91c2VcIik7X285LkFkZChcIm5ldHdvcmtfZGV2aWNlc1wiKTtfbzkuQWRkKFwibmV0d29ya19nYXRld2F5XCIpO19vOS5BZGQoXCJuc2xvb2t1cFwiKTtfbzkuQWRkKFwib3ZlcmZsb3dcIik7X285LkFkZChcIm93bmVyXCIpO19vOS5BZGQoXCJwYXJlbnRcIik7X285LkFkZChcInBhcmVudF9wYXRoXCIpO19vOS5BZGQoXCJwYXRoXCIpO19vOS5BZGQoXCJwZXJtaXNzaW9uc1wiKTtfbzkuQWRkKFwicGlcIik7X285LkFkZChcInBpbmdcIik7X285LkFkZChcInBpbmdfcG9ydFwiKTtfbzkuQWRkKFwicG9wXCIpO19vOS5BZGQoXCJwb3J0X2luZm9cIik7X285LkFkZChcInBvcnRfbnVtYmVyXCIpO19vOS5BZGQoXCJwcmludFwiKTtfbzkuQWRkKFwicHJvZ3JhbV9wYXRoXCIpO19vOS5BZGQoXCJwdWJsaWNfaXBcIik7X285LkFkZChcInB1bGxcIik7X285LkFkZChcInB1c2hcIik7X285LkFkZChcInB1dFwiKTtfbzkuQWRkKFwicmFuZ2VcIik7X285LkFkZChcInJlbW92ZVwiKTtfbzkuQWRkKFwicmVuYW1lXCIpO19vOS5BZGQoXCJyZXBsYWNlXCIpO19vOS5BZGQoXCJyZXZlcnNlXCIpO19vOS5BZGQoXCJybmRcIik7X285LkFkZChcInJvdW5kXCIpO19vOS5BZGQoXCJzY2FuXCIpO19vOS5BZGQoXCJzY2FuX2FkZHJlc3NcIik7X285LkFkZChcInNjcFwiKTtfbzkuQWRkKFwic2V0X2NvbnRlbnRcIik7X285LkFkZChcInNldF9ncm91cFwiKTtfbzkuQWRkKFwic2hvd19wcm9jc1wiKTtfbzkuQWRkKFwic2h1ZmZsZVwiKTtfbzkuQWRkKFwic2lnblwiKTtfbzkuQWRkKFwic2luXCIpO19vOS5BZGQoXCJzaXplXCIpO19vOS5BZGQoXCJzbGljZVwiKTtfbzkuQWRkKFwic210cF91c2VyX2xpc3RcIik7X285LkFkZChcInNvcnRcIik7X285LkFkZChcInNwbGl0XCIpO19vOS5BZGQoXCJzcXJ0XCIpO19vOS5BZGQoXCJzdGFydF90ZXJtaW5hbFwiKTtfbzkuQWRkKFwic3RyXCIpO19vOS5BZGQoXCJzdW1cIik7X285LkFkZChcInRhblwiKTtfbzkuQWRkKFwidG9faW50XCIpO19vOS5BZGQoXCJ0b3VjaFwiKTtfbzkuQWRkKFwidHJpbVwiKTtfbzkuQWRkKFwidHlwZW9mXCIpO19vOS5BZGQoXCJ1cHBlclwiKTtfbzkuQWRkKFwidXNlZF9wb3J0c1wiKTtfbzkuQWRkKFwidXNlcl9iYW5rX251bWJlclwiKTtfbzkuQWRkKFwidXNlcl9pbnB1dFwiKTtfbzkuQWRkKFwidXNlcl9tYWlsX2FkZHJlc3NcIik7X285LkFkZChcInZhbFwiKTtfbzkuQWRkKFwidmFsdWVzXCIpO19vOS5BZGQoXCJ2ZXJzaW9uXCIpO19vOS5BZGQoXCJ3aG9pc1wiKTtfbzkuQWRkKFwid2lmaV9uZXR3b3Jrc1wiKTtfbzkuQWRkKFwicGFyYW1zXCIpO19vOS5BZGQoXCJjbGVhcl9zY3JlZW5cIik7X285LkFkZChcIndhaXRcIik7X285LkFkZChcInNlbGZcIik7X285LkFkZChcIm51bGxcIik7X285LkFkZChcImZ1bmN0aW9uXCIpO19vOS5BZGQoXCJjb250ZW50XCIpO19vOS5BZGQoXCJsYW5faXBcIik7X285LkFkZChcImdldF9jb250ZW50XCIpO19vOS5BZGQoXCJhaXJlcGxheVwiKTtfbzkuQWRkKFwiZmlyZXdhbGxfcnVsZXNcIik7X285LkFkZChcImtlcm5lbF92ZXJzaW9uXCIpO19vOS5BZGQoXCJrZXJuZWxfdmVyc2lvblwiKTtfbzkuQWRkKFwicnNoZWxsX3NlcnZlclwiKTtfbzkuQWRkKFwicnNoZWxsX3NlcnZlclwiKTtfbzkuQWRkKFwiX19pc2FcIik7X285LkFkZChcImlmXCIpO19vOS5BZGQoXCJ0aGVuXCIpO19vOS5BZGQoXCJlbHNlXCIpO19vOS5BZGQoXCJlbmRcIik7X285LkFkZChcIndoaWxlXCIpO19vOS5BZGQoXCJmb3JcIik7X285LkFkZChcImluXCIpO19vOS5BZGQoXCJhbmRcIik7X285LkFkZChcIm9yXCIpO19vOS5BZGQoXCJub3RcIik7X285LkFkZChcInRydWVcIik7X285LkFkZChcImZhbHNlXCIpO19vOS5BZGQoXCJudWxsXCIpO19vOS5BZGQoXCJyZXR1cm5cIik7X285LkFkZChcImNvbnRpbnVlXCIpO19vOS5BZGQoXCJicmVha1wiKTtfbzkuQWRkKFwiZnVuY3Rpb25cIik7X285LkFkZChcIm5ld1wiKTtfbzkuQWRkKFwic2VsZlwiKTtyZXR1cm4gX285O30pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IERpY3Rpb25hcnk8c3RyaW5nLCBzdHJpbmc+IF9vcGVyYXRvcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIHN0cmluZz4oKSwoX28xMCk9PntfbzEwLkFkZChcIiYmXCIsQFwiIGFuZCBcIik7X28xMC5BZGQoXCJ8fFwiLEBcIiBvciBcIik7X28xMC5BZGQoXCI8PFwiLEBcImJpdHdpc2UoXCJcIjw8XCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCI+PlwiLEBcImJpdHdpc2UoXCJcIj4+XCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCI+Pj5cIixAXCJiaXR3aXNlKFwiXCI+Pj5cIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcIl5eXCIsQFwiYml0d2lzZShcIlwiXlwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwiJlwiLEBcImJpdHdpc2UoXCJcIiZcIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcInxcIixAXCJiaXR3aXNlKFwiXCJ8XCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCJ+XCIsQFwiYml0d2lzZShcIlwiflwiXCIsJGIpXCIpO19vMTAuQWRkKFwiKytcIixAXCIkYT0kYSsxXCIpO19vMTAuQWRkKFwiLS1cIixAXCIkYT0kYS0xXCIpO19vMTAuQWRkKFwiKz1cIixAXCIkYT0kYSskYlwiKTtfbzEwLkFkZChcIi09XCIsQFwiJGE9JGEtJGJcIik7X28xMC5BZGQoXCIqPVwiLEBcIiRhPSRhKiRiXCIpO19vMTAuQWRkKFwiLz1cIixAXCIkYT0kYS8kYlwiKTtfbzEwLkFkZChcIiU9XCIsQFwiJGE9JGElJGJcIik7X28xMC5BZGQoXCI9PlwiLEBcImZ1bmN0aW9uJGEkYlwiKTtyZXR1cm4gX28xMDt9KTtcclxuXHJcbiAgICAgICAgcHVibGljIGVudW0gRVRlbXBsYXRlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOb25lLFxyXG4gICAgICAgICAgICBJdGVyYXRpb25JbmRleCxcclxuICAgICAgICAgICAgSWdub3JlT3B0aW1pemF0aW9uLFxyXG4gICAgICAgICAgICBUZXJuYXJ5T3BlcmF0b3IsXHJcbiAgICAgICAgICAgIENvbW1lbnQsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBEaWN0aW9uYXJ5PHN0cmluZywgRVRlbXBsYXRlPiBfdGVtcGxhdGVzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBFVGVtcGxhdGU+KCksKF9vMTEpPT57X28xMS5BZGQoQFwiKF9fKSguKikoX2lkeClcIixFVGVtcGxhdGUuSXRlcmF0aW9uSW5kZXgpO19vMTEuQWRkKEBcIihcXFxcKShcXFMqKVwiLEVUZW1wbGF0ZS5JZ25vcmVPcHRpbWl6YXRpb24pO19vMTEuQWRkKEBcIihcXC9cXC8pKC4qKSRcIixFVGVtcGxhdGUuQ29tbWVudCk7cmV0dXJuIF9vMTE7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGJvb2wgSXNUZW1wbGF0ZShzdHJpbmcgaW5wdXQsIG91dCBzdHJpbmcgcmVnZXgsIG91dCBNYXRjaENvbGxlY3Rpb24gbWF0Y2hlcywgb3V0IEVUZW1wbGF0ZSB0ZW1wbGF0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKEtleVZhbHVlUGFpcjxzdHJpbmcsIEVUZW1wbGF0ZT4gcGFpciBpbiBfdGVtcGxhdGVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtYXRjaGVzID0gUmVnZXguTWF0Y2hlcyhpbnB1dCwgcGFpci5LZXkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMuQ291bnQgIT0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZWdleCA9IHBhaXIuS2V5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gcGFpci5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWF0Y2hlcyA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlZ2V4ID0gbnVsbDtcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSBFVGVtcGxhdGUuTm9uZTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBDb21waWxlKHN0cmluZyBjb2RlLCBib29sIG9wdGltaXplID0gZmFsc2UsIFNldHRpbmdzIHNldHRpbmdzID0gU2V0dGluZ3MuTm9uZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBUb2tlbml6ZShjb2RlLCBzZXR0aW5ncykuQ29tcGlsZShvcHRpbWl6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgVHJ5Q29tcGlsZShzdHJpbmcgY29kZSwgb3V0IHN0cmluZyBjb21waWxlZENvZGUsIGJvb2wgb3B0aW1pemUgPSBmYWxzZSwgU2V0dGluZ3Mgc2V0dGluZ3MgPSBTZXR0aW5ncy5Ob25lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHJ5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbXBpbGVkQ29kZSA9IENvbXBpbGUoY29kZSwgb3B0aW1pemUsIHNldHRpbmdzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChFeGNlcHRpb24gZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29tcGlsZWRDb2RlID0gZS5NZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBDb250ZXh0IFRva2VuaXplKHN0cmluZyBwbGFpbkNvZGUsIFNldHRpbmdzIHNldHRpbmdzID0gU2V0dGluZ3MuTm9uZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnRleHQgY29udGV4dCA9IG5ldyBDb250ZXh0KHNldHRpbmdzKSB7IFBsYWluSW5wdXQgPSBuZXcgUXVldWU8Y2hhcj4ocGxhaW5Db2RlKSB9O1xyXG5cclxuICAgICAgICAgICAgVG9rZW4gdG9rZW4gPSBudWxsO1xyXG4gICAgICAgICAgICB3aGlsZSAoKHRva2VuID0gR2V0TmV4dFRva2VuKGNvbnRleHQpKSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LkFkZFRva2VuKHRva2VuKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChjb250ZXh0LlNldHRpbmdzICYgU2V0dGluZ3MuSWdub3JlTWFwVmFyaWFibGVzKSAhPSAwICYmIHRva2VuLlByZXYgIT0gbnVsbCAmJiB0b2tlbi5QcmV2LlZhbHVlID09IFwiLlwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZSh0b2tlbi5WYWx1ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmN1c3RvbUlnbm9yZU9wdGltaXplLkFkZCh0b2tlbi5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgUmVtb3ZlU3BhY2VzKFF1ZXVlPGNoYXI+IHF1ZXVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2hpbGUgKHF1ZXVlLkNvdW50ICE9IDAgJiYgY2hhci5Jc1doaXRlU3BhY2UocXVldWUuUGVlaygpKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcXVldWUuRGVxdWV1ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBGdW5jPENvbnRleHQsIGJvb2w+IEdldFNlcGFyYXRpb25TZWxlY3RvcihDb250ZXh0IGNvbnRleHQsIG91dCBUb2tlbiB0b2tlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICcvJyAmJiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oY29udGV4dC5QbGFpbklucHV0LDEpLkZpcnN0T3JEZWZhdWx0KCkgPT0gJy8nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5UZW1wbGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gIShjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICdcXG4nIHx8IChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICdcXHInICYmXHJcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPiggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LDEpLkZpcnN0KCkgPT0gJ1xcbicpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuTWFwQWN0aXZlLlBlZWsoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uU2VwYXJhdG9yKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJywnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goIWNvbnRleHQuU2V0dGluZ3MuSGFzRmxhZyhTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnOic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJ1xcXFwnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5UZW1wbGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gIV90b2tlbkJyYWNrZXRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICFfdG9rZW5TZXBhcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICFfdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkgKyBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oeC5QbGFpbklucHV0LDEpLkZpcnN0T3JEZWZhdWx0KCkuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5JbmNsdWRlLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgK1xyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LDEpLkZpcnN0T3JEZWZhdWx0KCkuVG9TdHJpbmcoKSkpIC8vaW5jbHVkZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5JbmNsdWRlKCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90b2tlbkVuZEluY2x1ZGUuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSkpIC8vb3BlcmF0b3JcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uT3BlcmF0b3IoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IF90b2tlbk9wZXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX3Rva2VuQnJhY2tldHMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSkpIC8vYnJhY2tldHNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uQnJhY2tldCgpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJygnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICcpJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnWyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaCgoIShjb250ZXh0Lkxhc3RUb2tlbiA9PSBudWxsIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiBpcyBUb2tlbi5PcGVyYXRvcikpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY29udGV4dC5TZXR0aW5ncyAmIFNldHRpbmdzLklnbm9yZU1hcFZhcmlhYmxlcykgPT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ10nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd7JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuTGFzdFRva2VuID09IG51bGwgfHwgKCFjb250ZXh0Lkxhc3RUb2tlbi5WYWx1ZS5FbmRzV2l0aChcIilcIikgJiYgY29udGV4dC5MYXN0VG9rZW4uVmFsdWUgIT0gXCI9PlwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5NYXBBY3RpdmUuUHVzaCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaCgoY29udGV4dC5TZXR0aW5ncyAmIFNldHRpbmdzLklnbm9yZU1hcFZhcmlhYmxlcykgPT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lk1hcEFjdGl2ZS5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ30nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lk1hcEFjdGl2ZS5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF90b2tlblNlcGFyYXRvcnMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSkpIC8vc2VwYXJhdG9yc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5TZXBhcmF0b3IoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoX3Rva2VuU3RyaW5ncy5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpKSkgLy9zdHJpbmdzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdG9rZW4uT3B0aW1pemFibGUgPSBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBlZWsoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICckJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5DdXN0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuLk9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdldFN0cmluZyh4KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlZhcmlhYmxlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB4ID0+ICFfdG9rZW5CcmFja2V0cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuU2VwYXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuU3RyaW5ncy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpICsgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KHguUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBHZXRTdHJpbmcoQ29udGV4dCBjb250ZXh0KVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgIT0gJ1wiJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCAhPSAwKVxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpKTtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA+IDAgJiYgY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnXCInKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCkpO1xyXG4gICAgICAgICAgICAgICAgR2V0U3RyaW5nKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuUmVtb3ZlKDAsIDEpO1xyXG4gICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuUmVtb3ZlKGNvbnRleHQuU3RyaW5nQnVpbGRlci5MZW5ndGggLSAxLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVG9rZW4gR2V0TmV4dFRva2VuKENvbnRleHQgY29udGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5DbGVhcigpO1xyXG4gICAgICAgICAgICBTdHJpbmdCdWlsZGVyIHNiID0gY29udGV4dC5TdHJpbmdCdWlsZGVyO1xyXG4gICAgICAgICAgICBSZW1vdmVTcGFjZXMoY29udGV4dC5QbGFpbklucHV0KTtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA9PSAwKSByZXR1cm4gbnVsbDtcclxuR3JleUhhY2tDb21waWxlci5Ub2tlbiB0O1xuICAgICAgICAgICAgRnVuYzxDb250ZXh0LCBib29sPiBzZXBhcmF0b3IgPSBHZXRTZXBhcmF0aW9uU2VsZWN0b3IoY29udGV4dCwgb3V0IHQpO1xyXG4gICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzYi5BcHBlbmQoY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKSk7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA+IDAgJiYgc2VwYXJhdG9yKGNvbnRleHQpKTtcclxuXHJcbiAgICAgICAgICAgIHN0cmluZyB0bXBfdmFsdWUgPSBzYi5Ub1N0cmluZygpO1xyXG5zdHJpbmcgcmVnZXg7XG5NYXRjaENvbGxlY3Rpb24gbWF0Y2hlcztcbkdyZXlIYWNrQ29tcGlsZXIuRVRlbXBsYXRlIHRlbXBsYXRlO1xuICAgICAgICAgICAgaWYgKCEodCBpcyBUb2tlbi5TdHJpbmcpICYmIElzVGVtcGxhdGUodG1wX3ZhbHVlLCBvdXQgcmVnZXgsIG91dCBtYXRjaGVzLCBvdXQgdGVtcGxhdGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ID0gbmV3IFRva2VuLlRlbXBsYXRlKHRlbXBsYXRlLCBtYXRjaGVzLCByZWdleCwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoX2tleXdvcmRzLkNvbnRhaW5zKHRtcF92YWx1ZSkgJiYgISh0IGlzIFRva2VuLlN0cmluZykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHQgPSBuZXcgVG9rZW4uS2V5d29yZCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodC5PcHRpbWl6YWJsZSAmJiBjb250ZXh0Lklnbm9yZU9wdGltaXplKHQuVmFsdWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0Lk9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHQuVmFsdWUgPSB0bXBfdmFsdWU7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMCAmJiBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICcgJylcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcblxyXG4gICAgICAgICAgICB0LkVuZFN0YXRlbWVudCA9IElzRW5kT2ZMaW5lKGNvbnRleHQpO1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMCAmJiBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICc7JykgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgIH1cclxucHJpdmF0ZSBzdGF0aWMgYm9vbCBJc0VuZE9mTGluZShDb250ZXh0IGNvbnRleHQpXHJcbntcclxuICAgIHJldHVybiBjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPT0gMCB8fCBfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSArIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPihjb250ZXh0LlBsYWluSW5wdXQsMSkuRmlyc3RPckRlZmF1bHQoKS5Ub1N0cmluZygpKSB8fCBfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSk7XHJcbn0gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuI2lmIGpzXHJcbiNlbHNlXHJcbnVzaW5nIFN5c3RlbS5OZXQuSHR0cDtcclxuI2VuZGlmXHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIGNsYXNzIENvbnRleHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBRdWV1ZTxjaGFyPiBQbGFpbklucHV0IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIFRva2VuIFJvb3RUb2tlbiB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUb2tlbiBMYXN0VG9rZW4geyBnZXQ7IHNldDsgfVxyXG5wdWJsaWMgU3RyaW5nQnVpbGRlciBTdHJpbmdCdWlsZGVyXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmdCdWlsZGVycy5QZWVrKCk7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAgICAgaW50ZXJuYWwgU3RyaW5nQnVpbGRlciBDb2RlUHJlZml4IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGludGVybmFsIGxvbmcgYnJhY2tldERlcHRoID0gMDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgU3RhY2s8U3RyaW5nQnVpbGRlcj4gc3RyaW5nQnVpbGRlcnMgPSBuZXcgU3RhY2s8U3RyaW5nQnVpbGRlcj4oKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgU3RhY2s8Ym9vbD4gU2hvdWxkT3B0aW1pemVTdHJpbmcgPSBuZXcgU3RhY2s8Ym9vbD4oKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgU3RhY2s8Ym9vbD4gTWFwQWN0aXZlID0gbmV3IFN0YWNrPGJvb2w+KCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIFZhcmlhYmxlTmFtZVByb3ZpZGVyIG5hbWVQcm92aWRlciA9IG5ldyBWYXJpYWJsZU5hbWVQcm92aWRlcigpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBib29sIG9wdGltaXplRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBTZXR0aW5ncyBTZXR0aW5ncyA9IEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5TZXR0aW5ncy5Ob25lO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBIYXNoU2V0PHN0cmluZz4gY3VzdG9tSWdub3JlT3B0aW1pemUgPSBuZXcgSGFzaFNldDxzdHJpbmc+KCk7XHJcbiNpZiBqc1xyXG4jZWxzZVxyXG4gICAgICAgICAgICBpbnRlcm5hbCBIdHRwQ2xpZW50IGh0dHBDbGllbnQgPSBuZXcgSHR0cENsaWVudCgpO1xyXG4jZW5kaWZcclxucHVibGljIGJvb2wgSWdub3JlT3B0aW1pemUoc3RyaW5nIHZhbHVlKVxyXG57XHJcbiAgICByZXR1cm4gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl9pZ25vcmVPcHRpbWl6ZS5Db250YWlucyh2YWx1ZSkgfHwgY3VzdG9tSWdub3JlT3B0aW1pemUuQ29udGFpbnModmFsdWUpO1xyXG59XHJcbiAgICAgICAgICAgIHB1YmxpYyB2b2lkIEFkZFRva2VuKFRva2VuIHRva2VuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoUm9vdFRva2VuID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUm9vdFRva2VuID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgTGFzdFRva2VuID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTGFzdFRva2VuLk5leHQgPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5QcmV2ID0gTGFzdFRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIExhc3RUb2tlbiA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBDb250ZXh0KFNldHRpbmdzIHNldHRpbmdzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgICAgICAgICAgUGxhaW5JbnB1dCA9IG5ldyBRdWV1ZTxjaGFyPigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIoKSk7XHJcbiAgICAgICAgICAgICAgICBDb2RlUHJlZml4ID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBTaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIE1hcEFjdGl2ZS5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHN0cmluZyBDb21waWxlKGJvb2wgb3B0aW1pemUgPSBmYWxzZSxib29sIGlzU3RyaW5nRm9ybWF0ID0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9wdGltaXplRW5hYmxlZCA9IG9wdGltaXplO1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nQnVpbGRlci5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBUb2tlbiBub2RlO1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IFJvb3RUb2tlbjtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChub2RlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUuT3B0aW1pemUodGhpcyxvcHRpbWl6ZSkuTmV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBub2RlID0gUm9vdFRva2VuO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5Db21waWxlKHRoaXMpLk5leHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgb3B0aW1pemVFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTdHJpbmdGb3JtYXQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIENvZGVQcmVmaXguQXBwZW5kKFN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVByZWZpeC5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgICAgICAgICBUb2tlbiBub2RlID0gUm9vdFRva2VuO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlIGlzIFRva2VuLlN0cmluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kKCdcIicrbm9kZS5WYWx1ZSsgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQobm9kZS5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuRW5kU3RhdGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kKCdcXG4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSovXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNiLkFwcGVuZExpbmUobm9kZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5OZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRleHQuUmVndWxhckV4cHJlc3Npb25zO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBUb2tlbiBQcmV2IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIFRva2VuIE5leHQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgdmlydHVhbCBzdHJpbmcgVmFsdWUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgdmlydHVhbCBib29sIEN1c3RvbSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIE9wdGltaXphYmxlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHJpdmF0ZSBib29sIF9lbmRTdGF0ZW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgcHVibGljIGJvb2wgRW5kU3RhdGVtZW50IHsgZ2V0e1xyXG4gICAgICAgICAgICAgICAgaWYgKEZvcmNlRW5kU3RhdGVtZW50KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBGb3JjZUVuZFN0YXRlbWVudFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBfZW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXQgeyBfZW5kU3RhdGVtZW50ID0gdmFsdWU7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBGb3JjZUVuZFN0YXRlbWVudCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIEZvcmNlRW5kU3RhdGVtZW50VmFsdWUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHZpcnR1YWwgVG9rZW4gT3B0aW1pemUoQ29udGV4dCBjb250ZXh0LGJvb2wgcmVwbGFjZSA9IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChPcHRpbWl6YWJsZSAmJiAvL2ZsYWcgZnJvbSB0b2tlbml6YXRpb24gIFxyXG4gICAgICAgICAgICAgICAgICAgIFZhbHVlLkxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAhY2hhci5Jc0RpZ2l0KFZhbHVlWzBdKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFjb250ZXh0Lklnbm9yZU9wdGltaXplKFZhbHVlKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVwbGFjZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlID0gY29udGV4dC5uYW1lUHJvdmlkZXIuR2V0UmVwbGFjZShWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQubmFtZVByb3ZpZGVyLkRlZmluZShWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyB2aXJ0dWFsIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdHJpbmcuSXNOdWxsT3JXaGl0ZVNwYWNlKFZhbHVlKSkgcmV0dXJuIHRoaXM7XHJcbkJyYWNrZXQgYjsgICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuU3RyaW5nQnVpbGRlci5MZW5ndGggIT0gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICgoUmVnZXguSXNNYXRjaChjb250ZXh0LlN0cmluZ0J1aWxkZXJbY29udGV4dC5TdHJpbmdCdWlsZGVyLkxlbmd0aCAtIDFdLlRvU3RyaW5nKCksIFwiXFxcXHdcIikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgIFZhbHVlLkxlbmd0aCA+IDAgJiYgUmVnZXguSXNNYXRjaChWYWx1ZVswXS5Ub1N0cmluZygpLCBcIlxcXFx3XCIpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAoUHJldiAhPSBudWxsICYmIFByZXYgaXMgS2V5d29yZCAmJiAoYiA9IHRoaXMgYXMgQnJhY2tldCkgIT0gbnVsbCYmIChTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PGNoYXI+KGIuVmFsdWUpID09ICcoJyB8fCBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0T3JEZWZhdWx0PGNoYXI+KGIuVmFsdWUpID09ICdbJykpKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoRW5kU3RhdGVtZW50ICYmIE5leHQgIT0gbnVsbCAmJiAhZm9yY2UpIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoX3NlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJpdmF0ZSBib29sIENvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKHN0cmluZyBzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocy5MZW5ndGggPiBWYWx1ZS5MZW5ndGgpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWVbaV0gIT0gc1tpXSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcml2YXRlIGJvb2wgQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoY2hhciBjKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoVmFsdWUuTGVuZ3RoPDEpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBWYWx1ZVswXSA9PSBjO1xyXG4gICAgICAgICAgICB9XHJcblxuICAgICAgICBcbnByaXZhdGUgYm9vbCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fT3B0aW1pemFibGU9dHJ1ZTt9XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIGNsYXNzIFZhcmlhYmxlTmFtZVByb3ZpZGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBEaWN0aW9uYXJ5PHN0cmluZyxzdHJpbmc+IF9yZXBsYWNlID0gbmV3IERpY3Rpb25hcnk8c3RyaW5nLCBzdHJpbmc+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBIYXNoU2V0PHN0cmluZz4gX25hbWVzID0gbmV3IEhhc2hTZXQ8c3RyaW5nPigpO1xyXG4gICAgICAgIHByaXZhdGUgaW50IF9zdGF0ZTtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBfY2hhcnMgPSBcImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIjtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBOZXh0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgc2IgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgICAgICBpbnQgaW5kZXggPSBfc3RhdGU7XHJcblxyXG4gICAgICAgICAgICBkb1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgaSA9IGluZGV4ICUgX2NoYXJzLkxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGNoYXIgYyA9IF9jaGFyc1tpXTtcclxuICAgICAgICAgICAgICAgIHNiLkFwcGVuZChjKTtcclxuICAgICAgICAgICAgICAgIGluZGV4IC89IF9jaGFycy5MZW5ndGg7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKGluZGV4ID4gMCk7XHJcblxyXG4gICAgICAgICAgICBfc3RhdGUrKztcclxuICAgICAgICAgICAgcmV0dXJuIHNiLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldEZyZWUoYm9vbCBvcHRpbWl6ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0cmluZyBuYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgYm9vbCBjO1xyXG4gICAgICAgICAgICBpZiAob3B0aW1pemUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZyBzID0gTmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgX25hbWVzLkFkZChzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBOZXh0KCk7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKF9uYW1lcy5Db250YWlucyhuYW1lKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNEZWZpbmVkKHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9yZXBsYWNlLkNvbnRhaW5zS2V5KG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldFJlcGxhY2Uoc3RyaW5nIG9yaWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIV9yZXBsYWNlLkNvbnRhaW5zS2V5KG9yaWcpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgcyA9IE5leHQoKTtcclxuICAgICAgICAgICAgICAgIF9yZXBsYWNlW29yaWddID0gcztcclxuICAgICAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gX3JlcGxhY2Vbb3JpZ107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEZWZpbmUoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIV9uYW1lcy5Db250YWlucyhuYW1lKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX25hbWVzLkFkZChuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgcGFydGlhbCBjbGFzcyBUb2tlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIFZhcmlhYmxlIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbkJyYWNrZXQgYnI7ICAgICAgICAgICAgICAgICAgICBpZiAoKGJyID0gdGhpcyBhcyBCcmFja2V0KSAhPSBudWxsJiYgIWJyLkN1c3RvbSAmJiAoYnIuVmFsdWUuTGVuZ3RoID09IDAgfHwgYnIuVmFsdWVbMF0gIT0gJ3snKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChOZXh0ICE9IG51bGwgJiYgIUdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5fdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxjaGFyPihWYWx1ZSkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAoTmV4dC5WYWx1ZSA9PSBcIi5cIiB8fCBOZXh0LlZhbHVlID09IFwiKFwiIHx8IE5leHQuVmFsdWUgPT0gXCJbXCIpKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcihWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dC5WYWx1ZSA9PSBcIi5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dCA9IE5leHQuTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoJy4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5leHQhPW51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQuQ29tcGlsZShjb250ZXh0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZFN0YXRlbWVudCA9IE5leHQuRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9yY2VFbmRTdGF0ZW1lbnQgPSBOZXh0LkZvcmNlRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9yY2VFbmRTdGF0ZW1lbnRWYWx1ZSA9IE5leHQuRm9yY2VFbmRTdGF0ZW1lbnRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBOZXh0Lk5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZXh0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQuUHJldiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlID0gY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5PcGVyYXRvciBvO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChOZXh0ICE9IG51bGwgJiYgKG8gPSBOZXh0IGFzIE9wZXJhdG9yKSAhPSBudWxsJiYgby5OZWVkc0xlZnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gYmFzZS5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuT3BlcmF0b3Igb287XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYgIT0gbnVsbCAmJiAob28gPSBQcmV2IGFzIE9wZXJhdG9yKSAhPSBudWxsJiYgb28uTmVlZHNSaWdodClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBiYXNlLkNvbXBpbGUoY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIlZhcmlhYmxlOiB7MH1cIixiYXNlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgcGFydGlhbCBjbGFzcyBUb2tlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIEluY2x1ZGUgOiBUb2tlblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgSW5jbHVkZSgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuI2lmIGpzXHJcblxyXG4jZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChFbnZpcm9ubWVudC5PU1ZlcnNpb24uUGxhdGZvcm0gPT0gUGxhdGZvcm1JRC5PdGhlcilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlID0gXCIvL2luY2x1ZGUgaXMgbm90IHlldCBpbXBsZW1lbnRlZCBpbiB3ZWJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBjb250ZXh0Lmh0dHBDbGllbnQuR2V0U3RyaW5nQXN5bmMoVmFsdWUpLkdldEF3YWl0ZXIoKS5HZXRSZXN1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiNlbmRpZlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJJbmNsdWRlOiB7MH1cIixiYXNlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgS2V5d29yZCA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBLZXl3b3JkKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBPcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBHcmV5SGFja0NvbXBpbGVyLlRva2VuIE9wdGltaXplKEdyZXlIYWNrQ29tcGlsZXIuQ29udGV4dCBjb250ZXh0LCBib29sIHJlcGxhY2UgPSB0cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZSA9PSBcInRydWVcIikgVmFsdWUgPSBcIjFcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWUgPT0gXCJmYWxzZVwiKSBWYWx1ZSA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLk9wdGltaXplKGNvbnRleHQscmVwbGFjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChWYWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJmb3JcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndoaWxlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpZlwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGlsZU5leHQoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21waWxlTmV4dChjb250ZXh0LGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHZvaWQgQ29tcGlsZU5leHQoQ29udGV4dCBjb250ZXh0LGJvb2wgcmVtb3ZlQnJhY2V0cyA9IHRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoTmV4dCBpcyBCcmFja2V0KSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIE5leHQuQ29tcGlsZShjb250ZXh0LHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW1vdmVCcmFjZXRzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyWzBdID0gJyAnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSArPSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoMCwgY29udGV4dC5TdHJpbmdCdWlsZGVyLkxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSArPSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dC5OZXh0IT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5OZXh0LlByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gTmV4dC5FbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgTmV4dCA9IE5leHQuTmV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgU2VwYXJhdG9yIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIFNlcGFyYXRvcigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiU2VwYXJhdG9yOiB7MH1cIixWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgcGFydGlhbCBjbGFzcyBUb2tlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIFN0cmluZyA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChDdXN0b20pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiKFxcXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBkZXB0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCBsYXN0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBWYWx1ZS5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgKyAxIDwgVmFsdWUuTGVuZ3RoICYmIFZhbHVlW2ldID09ICdcXFxcJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChWYWx1ZVtpICsgMV0gPT0gJ3snIHx8IFZhbHVlW2kgKyAxXSA9PSAnfScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZVtpXSA9PSAneycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoID09IDApIGxhc3QgPSBpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXB0aCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFZhbHVlW2ldID09ICd9JyAmJiAoaSA9PSAwIHx8IFZhbHVlW2kgLSAxXSAhPSAnXFxcXCcpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoIDwgMCkgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwic3RyaW5nIGZvcm1hdCAoezB9KSBpcyBub3QgdmFsaWRcIixWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChcIlxcXCIrKFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29udGV4dCBpbm5lckNvZGVDb250ZXh0ID0gVG9rZW5pemUoVmFsdWUuU3Vic3RyaW5nKGxhc3QsIGkgLSBsYXN0KS5SZXBsYWNlKEBcIlwiXCJcIlwiXCIsIEBcIlwiXCJcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckNvZGVDb250ZXh0Lm5hbWVQcm92aWRlciA9IGNvbnRleHQubmFtZVByb3ZpZGVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckNvZGVDb250ZXh0LkNvZGVQcmVmaXggPSBjb250ZXh0LkNvZGVQcmVmaXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBjb21waWxlZCA9IGlubmVyQ29kZUNvbnRleHQuQ29tcGlsZShjb250ZXh0Lm9wdGltaXplRW5hYmxlZCx0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb21waWxlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoXCIpK1xcXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGVwdGggPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiXFxcIilcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEVuZFN0YXRlbWVudCkgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChfc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIlN0cmluZzogezB9ezF9XCIsKEN1c3RvbSA/IFwiJFwiIDogXCJcIiksYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBCcmFja2V0IDogVmFyaWFibGVcclxuICAgICAgICAgICAge1xyXG5wdWJsaWMgYm9vbCBJc09wZW5pbmdcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFZhbHVlID09IFwiKFwiIHx8IFZhbHVlID09IFwiW1wiIHx8IFZhbHVlID09IFwie1wiO1xyXG4gICAgfVxyXG59cHVibGljIGJvb2wgSXNDbG9zaW5nXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBWYWx1ZSA9PSBcIilcIiB8fCBWYWx1ZSA9PSBcIl1cIiB8fCBWYWx1ZSA9PSBcIn1cIjtcclxuICAgIH1cclxufVxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBEaWN0aW9uYXJ5PGNoYXIsIGNoYXI+IF9vcGVuaW5nVG9DbG9zaW5nID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8Y2hhciwgY2hhcj4oKSwoX28xKT0+e19vMS5BZGQoJygnLCcpJyk7X28xLkFkZCgnWycsJ10nKTtfbzEuQWRkKCd7JywnfScpO3JldHVybiBfbzE7fSk7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgQnJhY2tldCgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIFRva2VuIENvbXBpbGVJbnNpZGUoQ29udGV4dCBjb250ZXh0LCBib29sIG11bHRpTGluZSA9IGZhbHNlLCBzdHJpbmcgcHJlZml4ID0gXCJcIiwgc3RyaW5nIHBvc3RmaXggPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRva2VuIGxhc3QgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIFRva2VuIGN1cnJlbnQgPSBOZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcihwcmVmaXgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGFyIGNsb3NlID0gX29wZW5pbmdUb0Nsb3NpbmdbU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5GaXJzdDxjaGFyPihWYWx1ZSldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoY3VycmVudCE9bnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbXVsdGlMaW5lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50LkZvcmNlRW5kU3RhdGVtZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuRm9yY2VFbmRTdGF0ZW1lbnRWYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudC5FbmRTdGF0ZW1lbnQgPSBjdXJyZW50LkVuZFN0YXRlbWVudCB8fCBjdXJyZW50Lk5leHQuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoY2xvc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0ID0gY3VycmVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoY2xvc2UpKSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudC5Db21waWxlKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5OZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3QuTmV4dCAhPSBudWxsICYmIGxhc3QuTmV4dC5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcImVsc2VcIikgJiYgbXVsdGlMaW5lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdC5WYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3QuRm9yY2VFbmRTdGF0ZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0LkZvcmNlRW5kU3RhdGVtZW50VmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXN0cmluZy5Jc051bGxPcldoaXRlU3BhY2UocG9zdGZpeCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0LlZhbHVlID0gcG9zdGZpeDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKCFsYXN0LlByZXYuRW5kU3RhdGVtZW50ICYmIG11bHRpTGluZSlcclxuICAgICAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kTGluZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QuRm9yY2VFbmRTdGF0ZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QuRm9yY2VFbmRTdGF0ZW1lbnRWYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QuQ29tcGlsZShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0LkZvcmNlRW5kU3RhdGVtZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gbGFzdC5FbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsYXN0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBib29sIGVsc2VGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCBsYW1iZGFGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKElzT3BlbmluZylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2tldERlcHRoKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoSXNDbG9zaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5icmFja2V0RGVwdGgtLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEN1c3RvbSkgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKElzT3BlbmluZylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRva2VuIG5vZGUgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYgIT0gbnVsbCAmJiBWYWx1ZSA9PSBcIntcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKChQcmV2IGlzIEtleXdvcmQgfHwgKGxhbWJkYUZsYWcgPSBQcmV2LlZhbHVlID09IFwiPT5cIikpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVsc2VGbGFnID0gUHJldi5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcImVsc2VcIikpKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHByZWZpeCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgcG9zdGZpeCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxzZUZsYWcgfHwgUHJldi5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcImVsc2VcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGlmXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChQcmV2LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiaWZcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZml4ID0gXCJ0aGVuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGlmXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGxhbWJkYUZsYWcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGZ1bmN0aW9uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChQcmV2LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiZnVuY3Rpb25cIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGZ1bmN0aW9uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKFByZXYuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoXCJmb3JcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGZvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoUHJldi5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcIndoaWxlXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RmaXggPSBcImVuZCB3aGlsZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBDb21waWxlSW5zaWRlKGNvbnRleHQsIHRydWUsIHByZWZpeCtcIlxcblwiLCBwb3N0Zml4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBDb21waWxlSW5zaWRlKGNvbnRleHQsZmFsc2UsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gbm9kZSE9bnVsbD9ub2RlLk5leHQ6KFRva2VuKW51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoUHJldiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlJvb3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2Lk5leHQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG5vZGUhPW51bGw/bm9kZS5OZXh0OihUb2tlbiludWxsKSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLk5leHQuUHJldiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN1c3RvbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBDb21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiQnJhY2tldDogezB9XCIsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgR3JleUhhY2tUb29scy5EZWJ1Z2dlcjtcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgT3BlcmF0b3IgOiBWYXJpYWJsZVxyXG4gICAgICAgICAgICB7XHJcbnB1YmxpYyBib29sIE5lZWRzTGVmdFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl9vcGVyYXRvcnMuQ29udGFpbnNLZXkoVmFsdWUpICYmIF9vcGVyYXRvcnNbVmFsdWVdLkNvbnRhaW5zKFwiJGFcIik7XHJcbiAgICB9XHJcbn1wdWJsaWMgYm9vbCBOZWVkc1JpZ2h0XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX29wZXJhdG9ycy5Db250YWluc0tleShWYWx1ZSkgJiYgX29wZXJhdG9yc1tWYWx1ZV0uQ29udGFpbnMoXCIkYlwiKTtcclxuICAgIH1cclxufSAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBDdXN0b21cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXQgeyByZXR1cm4gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl9vcGVyYXRvcnMuQ29udGFpbnNLZXkoVmFsdWUpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0IHsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgT3BlcmF0b3IoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ3VzdG9tKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZyBkZXB0aCA9IGNvbnRleHQuYnJhY2tldERlcHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgbGVmdCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyByaWdodCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRva2VuIHRtcFJpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG9rZW4gdG1wTGVmdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBzID0gX29wZXJhdG9yc1tWYWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZWVkc0xlZnQgJiYgUHJldiAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbkJyYWNrZXQgYjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChiID0gUHJldiBhcyBCcmFja2V0KSAhPSBudWxsJiYgYi5Jc09wZW5pbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihzdHJpbmcuRm9ybWF0KFwiaW52YWxpZCBzeW50YXggZm9yIHRlbXBsYXRlIHswfVwiLFZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBMZWZ0ID0gUHJldi5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyA9IHMuUmVwbGFjZShcIiRhXCIsIGxlZnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5Qb3AoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkxXCIsUHJldikhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFRva2VuPihcImtleTFcIikuUHJldjooVG9rZW4pbnVsbCkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2ID0gUHJldi5QcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYuTmV4dCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Sb290VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmVlZHNSaWdodCAmJiBOZXh0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcFJpZ2h0ID0gTmV4dC5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgPSBzLlJlcGxhY2UoXCIkYlwiLCByaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gTmV4dC5FbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5Ub1RlbXAoXCJrZXkyXCIsTmV4dCkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPFRva2VuPihcImtleTJcIikuTmV4dDooVG9rZW4pbnVsbCkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gTmV4dC5OZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQuUHJldiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWU9PVwiPT5cIiAmJiB0bXBMZWZ0LlByZXYgIT0gbnVsbCAmJiB0bXBMZWZ0LlByZXYuVmFsdWUgIT0gXCI9XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBuYW1lID0gY29udGV4dC5uYW1lUHJvdmlkZXIuR2V0RnJlZShjb250ZXh0Lm9wdGltaXplRW5hYmxlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IFwiQFwiICsgbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuQ29kZVByZWZpeC5BcHBlbmQobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LkNvZGVQcmVmaXguQXBwZW5kKFwiPVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuQ29kZVByZWZpeC5BcHBlbmRMaW5lKHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gdG1wUmlnaHQuRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlID0gcztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJPcGVyYXRvcjogezB9XCIsYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UZXh0LlJlZ3VsYXJFeHByZXNzaW9ucztcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgVGVtcGxhdGUgOiBWYXJpYWJsZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFZhbHVlXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBfdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZXRcclxuICAgIHtcclxuICAgICAgICBpZiAoX3ZhbHVlICE9IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBfdmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxufVxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3ZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBFVGVtcGxhdGUgVGVtcGxhdGVUeXBlIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBzdHJpbmcgUmVnZXhTdHJpbmcgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIE1hdGNoQ29sbGVjdGlvbiBNYXRjaGVzIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBPcHRpbWl6ZShDb250ZXh0IGNvbnRleHQsIGJvb2wgcmVwbGFjZSA9IHRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChUZW1wbGF0ZVR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuSXRlcmF0aW9uSW5kZXg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVwbGFjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgdmFyX25hbWUgPSBNYXRjaGVzWzBdLkdyb3Vwc1syXS5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yV2hpdGVTcGFjZSh2YXJfbmFtZSkgfHwgY29udGV4dC5JZ25vcmVPcHRpbWl6ZSh2YXJfbmFtZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9IFJlZ2V4LlJlcGxhY2UoVmFsdWUsIFJlZ2V4U3RyaW5nLFxyXG5zdHJpbmcuRm9ybWF0KFwiJDF7MH0kM1wiLGNvbnRleHQubmFtZVByb3ZpZGVyLkdldFJlcGxhY2UodmFyX25hbWUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLkVUZW1wbGF0ZS5JZ25vcmVPcHRpbWl6YXRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChUZW1wbGF0ZVR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuQ29tbWVudDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY29udGV4dC5TZXR0aW5ncyAmIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5TZXR0aW5ncy5SZW1vdmVDb21tZW50cykgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUHJldiAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5OZXh0ID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFQcmV2LkVuZFN0YXRlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5FbmRTdGF0ZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChfc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlJvb3RUb2tlbiA9IE5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5QcmV2ID0gUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gPSBQcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoUHJldiE9bnVsbCAmJiBOZXh0IT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgUHJldi5OZXh0ID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgTmV4dC5QcmV2ID0gUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZExpbmUoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBib29sIElzVmFsdWVTdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZS5MZW5ndGggPCAyKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbHVlWzBdID09ICdcIicgJiYgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5MYXN0T3JEZWZhdWx0PGNoYXI+KFZhbHVlKSA9PSAnXCInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBUZW1wbGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIFRlbXBsYXRlKEVUZW1wbGF0ZSB0ZW1wbGF0ZSwgTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXMsIHN0cmluZyByZWdleCwgQ29udGV4dCBjb250ZXh0KSA6IGJhc2UoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRlbXBsYXRlVHlwZSA9IHRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIE1hdGNoZXMgPSBtYXRjaGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlZ2V4U3RyaW5nID0gcmVnZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGVtcGxhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuSWdub3JlT3B0aW1pemF0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbHVlID0gTWF0Y2hlc1swXS5Hcm91cHNbMl0uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNWYWx1ZVN0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9IF92YWx1ZS5TdWJzdHJpbmcoMSwgX3ZhbHVlLkxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZShfdmFsdWUpKSBjb250ZXh0LmN1c3RvbUlnbm9yZU9wdGltaXplLkFkZChfdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9ICdcIicgKyBfdmFsdWUgKyAnXCInO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZShNYXRjaGVzWzBdLkdyb3Vwc1syXS5WYWx1ZSkpIGNvbnRleHQuY3VzdG9tSWdub3JlT3B0aW1pemUuQWRkKE1hdGNoZXNbMF0uR3JvdXBzWzJdLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K

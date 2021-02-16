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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJKc01TcHBDb21waWxlci5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiRGVidWdnZXIvR3JleUhhY2tFbXVsYXRpb24vTUQ1LmNzIiwiQ29tcGlsZXIvR3JleUhhY2tDb21waWxlci5jcyIsIkNvbXBpbGVyL0NvbnRleHQuY3MiLCJDb21waWxlci9Ub2tlbnMvVG9rZW4uY3MiLCJDb21waWxlci9WYXJpYWJsZU5hbWVQcm92aWRlci5jcyIsIkNvbXBpbGVyL1Rva2Vucy9WYXJpYWJsZS5jcyIsIkNvbXBpbGVyL1Rva2Vucy9JbmNsdWRlLmNzIiwiQ29tcGlsZXIvVG9rZW5zL0tleXdvcmQuY3MiLCJDb21waWxlci9Ub2tlbnMvU2VwYXJhdG9yLmNzIiwiQ29tcGlsZXIvVG9rZW5zL1N0cmluZy5jcyIsIkNvbXBpbGVyL1Rva2Vucy9CcmFja2V0LmNzIiwiQ29tcGlsZXIvVG9rZW5zL09wZXJhdG9yLmNzIiwiQ29tcGlsZXIvVG9rZW5zL1RlbXBsYXRlLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OzZCQVV5QkE7NkJBVUNBOzs7O3NDQWtCWUEsR0FBUUE7b0JBRWxDQSxPQUFPQSxHQUFDQSxPQUFLQSxhQUFLQSxDQUFDQSxNQUFLQSxDQUFDQSxPQUFLQTs7cUNBSUhBO29CQUUzQkE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7O29CQUVBQSxnQkFBZ0JBLENBQUNBLE9BQUtBLENBQUNBLENBQUNBO29CQUN4QkEscUJBQXFCQSxrQkFBU0EsK0JBQW1CQTtvQkFDakRBLGtCQUFXQSxVQUFPQSxtQkFBZ0JBO29CQUNsQ0Esa0NBQWVBLGNBQWZBOztvQkFFQUEsYUFBZ0JBLCtCQUFzQkE7b0JBQ3RDQSxrQkFBV0EsV0FBV0EsZ0JBQWdCQTs7b0JBRXRDQSxLQUFLQSxXQUFXQSxJQUFJQSxtREFBOEJBO3dCQUc5Q0EsUUFBV0E7d0JBQ1hBLEtBQUtBLFdBQVdBLFFBQVVBOzRCQUN0QkEs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QkFBdUJBOzRCQUF3QkE7NEJBQXdCQTs0QkFBb0JBOzRCQUFrQkE7NEJBQXdCQTs0QkFBdUJBOzRCQUF3QkE7NEJBQTBCQTs0QkFBb0JBOzRCQUFzQkE7NEJBQWdCQTs0QkFBaUJBOzRCQUEwQkE7NEJBQXFCQTs0QkFBdUJBOzRCQUFzQkE7NEJBQXFCQTs0QkFBc0JBOzRCQUFxQkE7NEJBQW1CQTs0QkFBaUJBOzRCQUFrQkE7NEJBQW9CQTs0QkFBMEJBOzRCQUF5QkE7NEJBQXVCQTs0QkFBbUJBOzRCQUFtQkE7NEJBQXFCQTs0QkFBcUJBOzRCQUFxQkE7NEJBQXFCQTs0QkFBNkJBOzRCQUF1QkE7NEJBQWdCQTs0QkFBdUJBOzRCQUFrQkE7NEJBQWVBOzRCQUFvQkE7NEJBQWdCQTs0QkFBb0JBOzRCQUFrQkE7NEJBQWlCQTs0QkFBZUE7NEJBQWdCQTs0QkFBZ0JBOzRCQUFtQkE7NEJBQTJCQTs0QkFBMkJBOzRCQUFvQkE7NEJBQW9CQTs0QkFBaUJBOzRCQUFrQkE7NEJBQXVCQTs0QkFBZ0JBOzRCQUF1QkE7NEJBQWNBOzRCQUFnQkE7NEJBQXFCQTs0QkFBZUE7NEJBQXFCQTs0QkFBdUJBOzRCQUFpQkE7NEJBQXdCQTs0QkFBcUJBOzRCQUFnQkE7NEJBQWdCQTs0QkFBZUE7NEJBQWlCQTs0QkFBa0JBOzRCQUFrQkE7NEJBQW1CQTs0QkFBbUJBOzRCQUFlQTs0QkFBaUJBOzRCQUFnQkE7NEJBQXdCQTs0QkFBZUE7NEJBQXVCQTs0QkFBcUJBOzRCQUFzQkE7NEJBQW1CQTs0QkFBZ0JBOzRCQUFlQTs0QkFBZ0JBOzRCQUFpQkE7NEJBQTBCQTs0QkFBZ0JBOzRCQUFpQkE7NEJBQWdCQTs0QkFBMEJBOzRCQUFlQTs0QkFBZUE7NEJBQWVBOzRCQUFrQkE7NEJBQWlCQTs0QkFBZ0JBOzRCQUFrQkE7NEJBQWlCQTs0QkFBc0JBOzRCQUE0QkE7NEJBQXNCQTs0QkFBNkJBOzRCQUFlQTs0QkFBa0JBOzRCQUFtQkE7NEJBQWlCQTs0QkFBeUJBOzRCQUFrQkE7NEJBQXdCQTs0QkFBZ0JBOzRCQUFnQkE7NEJBQWdCQTs0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NkJBLGlDQUFpQ0E7Ozt3QkFFOUZBOzs7OztnQ0EvRm1CQSxTQUFpQkE7O2dCQUU1Q0EsUUFBUUE7b0JBRUpBLEtBQUtBO3dCQUNEQSxJQUFJQTs0QkFFQUEsZUFBa0JBOzRCQUNsQkEsSUFBSUEsaUNBQTBCQSxhQUFhQSx1QkFBdUJBO2dDQUM5REEsT0FBT0E7OzRCQUNYQSxjQUFTQSw2Q0FBY0EsWUFBT0Esa0JBQzlEQSxpQ0FBd0JBLGdDQUFnQ0E7O3dCQUc1QkE7b0JBQ0pBLEtBQUtBO3dCQUNEQTs7Z0JBRVJBLE9BQU9BOzsrQkFHbUJBLFNBQWlCQTs7Z0JBRTNDQSxRQUFRQTtvQkFFSkEsS0FBS0E7d0JBQ0RBLElBQUlBLENBQUNBLG1CQUFtQkE7NEJBRXBCQSxJQUFJQSxhQUFRQTtnQ0FFUkEsaUJBQVlBO2dDQUNaQSxJQUFJQSxDQUFDQTtvQ0FFREE7b0NBQ0FBLDZCQUE2QkE7OztnQ0FLakNBLG9CQUFvQkE7Ozs0QkFHeEJBLElBQUlBLGFBQVFBO2dDQUVSQSxpQkFBWUE7O2dDQUlaQSxvQkFBb0JBOzs0QkFFeEJBLE9BQU9BOzt3QkFFWEE7Ozs7Z0JBVVJBLE9BQU9BLDJFQUFhQSxTQUFTQTs7O2dCQUs3QkEsSUFBSUE7b0JBQWtCQTs7Z0JBQ3RCQSxPQUFPQSxtQ0FBbUJBLDRCQUEyQ0EsWUFBTkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzLkRlYnVnZ2VyXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNRDVcclxuICAgIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIFJvdW5kIHNoaWZ0IHZhbHVlc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXRpYyBpbnRbXSBzID0gbmV3IGludFs2NF0ge1xyXG4gICAgICAgICAgICA3LCAxMiwgMTcsIDIyLCAgNywgMTIsIDE3LCAyMiwgIDcsIDEyLCAxNywgMjIsICA3LCAxMiwgMTcsIDIyLFxyXG4gICAgICAgICAgICA1LCAgOSwgMTQsIDIwLCAgNSwgIDksIDE0LCAyMCwgIDUsICA5LCAxNCwgMjAsICA1LCAgOSwgMTQsIDIwLFxyXG4gICAgICAgICAgICA0LCAxMSwgMTYsIDIzLCAgNCwgMTEsIDE2LCAyMywgIDQsIDExLCAxNiwgMjMsICA0LCAxMSwgMTYsIDIzLFxyXG4gICAgICAgICAgICA2LCAxMCwgMTUsIDIxLCAgNiwgMTAsIDE1LCAyMSwgIDYsIDEwLCAxNSwgMjEsICA2LCAxMCwgMTUsIDIxXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBDb25zdGFudCBLIFZhbHVlc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXRpYyB1aW50W10gSyA9IG5ldyB1aW50WzY0XSB7XHJcbiAgICAgICAgICAgIDB4ZDc2YWE0NzgsIDM5MDU0MDI3MTBVLCA2MDYxMDU4MTksIDMyNTA0NDE5NjZVLFxyXG4gICAgICAgICAgICAweGY1N2MwZmFmLCAweDQ3ODdjNjJhLCAweGE4MzA0NjEzLCAweGZkNDY5NTAxLFxyXG4gICAgICAgICAgICAweDY5ODA5OGQ4LCAyMzM2NTUyODc5VSwgNDI5NDkyNTIzM1UsIDIzMDQ1NjMxMzRVLFxyXG4xODA0NjAzNjgyLCAweGZkOTg3MTkzLCAweGE2Nzk0MzhlLCAxMjM2NTM1MzI5LFxyXG4gICAgICAgICAgICAweGY2MWUyNTYyLCAzMjI1NDY1NjY0VSwgMHgyNjVlNWE1MSwgMzkyMTA2OTk5NFUsXHJcbiAgICAgICAgICAgIDB4ZDYyZjEwNWQsIDB4MDI0NDE0NTMsIDB4ZDhhMWU2ODEsIDM4ODk0Mjk0NDhVLFxyXG4gICAgICAgICAgICAweDIxZTFjZGU2LCAweGMzMzcwN2Q2LCAweGY0ZDUwZDg3LCAweDQ1NWExNGVkLFxyXG4gICAgICAgICAgICAweGE5ZTNlOTA1LCAweGZjZWZhM2Y4LCAweDY3NmYwMmQ5LCAweDhkMmE0YzhhLFxyXG4gICAgICAgICAgICAweGZmZmEzOTQyLCAweDg3NzFmNjgxLCAweDZkOWQ2MTIyLCAweGZkZTUzODBjLFxyXG4yNzYzOTc1MjM2VSwgMTI3Mjg5MzM1MywgNDEzOTQ2OTY2NFUsIDMyMDAyMzY2NTZVLFxyXG42ODEyNzkxNzQsIDB4ZWFhMTI3ZmEsIDB4ZDRlZjMwODUsIDB4MDQ4ODFkMDUsXHJcbiAgICAgICAgICAgIDB4ZDlkNGQwMzksIDM4NzMxNTE0NjFVLCAweDFmYTI3Y2Y4LCAweGM0YWM1NjY1LFxyXG4gICAgICAgICAgICAweGY0MjkyMjQ0LCAweDQzMmFmZjk3LCAyODc4NjEyMzkxVSwgMHhmYzkzYTAzOSxcclxuMTcwMDQ4NTU3MSwgMHg4ZjBjY2M5MiwgMHhmZmVmZjQ3ZCwgMHg4NTg0NWRkMSxcclxuICAgICAgICAgICAgMHg2ZmE4N2U0ZiwgMHhmZTJjZTZlMCwgMHhhMzAxNDMxNCwgMHg0ZTA4MTFhMSxcclxuICAgICAgICAgICAgMHhmNzUzN2U4MiwgMzE3NDc1NjkxN1UsIDcxODc4NzI1OSwgMzk1MTQ4MTc0NVUgICAgICAgIH07XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdWludCBsZWZ0Um90YXRlKHVpbnQgeCwgaW50IGMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHggPDwgYykgfCAoeCA+PiAoMzIgLSBjKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhc3N1bWVzIHdob2xlIGJ5dGVzIGFzIGlucHV0XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgQ2FsY3VsYXRlKGJ5dGVbXSBpbnB1dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHVpbnQgYTAgPSAweDY3NDUyMzAxOyAgIC8vIEFcclxuICAgICAgICAgICAgdWludCBiMCA9IDQwMjMyMzM0MTdVOyAgIC8vIEJcclxuICAgICAgICAgICAgdWludCBjMCA9IDI1NjIzODMxMDJVOyAgIC8vIENcclxuICAgICAgICAgICAgdWludCBkMCA9IDB4MTAzMjU0NzY7ICAgLy8gRFxyXG5cclxuICAgICAgICAgICAgdmFyIGFkZExlbmd0aCA9ICg1NiAtICgoaW5wdXQuTGVuZ3RoICsgMSkgJSA2NCkpICUgNjQ7IC8vIGNhbGN1bGF0ZSB0aGUgbmV3IGxlbmd0aCB3aXRoIHBhZGRpbmdcclxuICAgICAgICAgICAgdmFyIHByb2Nlc3NlZElucHV0ID0gbmV3IGJ5dGVbaW5wdXQuTGVuZ3RoICsgMSArIGFkZExlbmd0aCArIDhdO1xyXG4gICAgICAgICAgICBBcnJheS5Db3B5KGlucHV0LCBwcm9jZXNzZWRJbnB1dCwgaW5wdXQuTGVuZ3RoKTtcclxuICAgICAgICAgICAgcHJvY2Vzc2VkSW5wdXRbaW5wdXQuTGVuZ3RoXSA9IDB4ODA7IC8vIGFkZCAxXHJcblxyXG4gICAgICAgICAgICBieXRlW10gbGVuZ3RoID0gQml0Q29udmVydGVyLkdldEJ5dGVzKGlucHV0Lkxlbmd0aCAqIDgpOyAvLyBiaXQgY29udmVydGVyIHJldHVybnMgbGl0dGxlLWVuZGlhblxyXG4gICAgICAgICAgICBBcnJheS5Db3B5KGxlbmd0aCwgMCwgcHJvY2Vzc2VkSW5wdXQsIHByb2Nlc3NlZElucHV0Lkxlbmd0aCAtIDgsIDQpOyAvLyBhZGQgbGVuZ3RoIGluIGJpdHNcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgcHJvY2Vzc2VkSW5wdXQuTGVuZ3RoIC8gNjQ7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gY29weSB0aGUgaW5wdXQgdG8gTVxyXG4gICAgICAgICAgICAgICAgdWludFtdIE0gPSBuZXcgdWludFsxNl07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IDE2OyArK2opXHJcbiAgICAgICAgICAgICAgICAgICAgTVtqXSA9IEJpdENvbnZlcnRlci5Ub1VJbnQzMihwcm9jZXNzZWRJbnB1dCwgKGkgKiA2NCkgKyAoaiAqIDQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpbml0aWFsaXplIHJvdW5kIHZhcmlhYmxlc1xyXG4gICAgICAgICAgICAgICAgdWludCBBID0gYTAsIEIgPSBiMCwgQyA9IGMwLCBEID0gZDAsIEYgPSAwLCBnID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwcmltYXJ5IGxvb3BcclxuICAgICAgICAgICAgICAgIGZvciAodWludCBrID0gMDsgayA8IDY0OyArK2spXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPD0gMTUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGID0gKEIgJiBDKSB8ICh+QiAmIEQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnID0gaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoayA+PSAxNiAmJiBrIDw9IDMxKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRiA9IChEICYgQikgfCAofkQgJiBDKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZyA9ICgoNSAqIGspICsgMSkgJSAxNjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoayA+PSAzMiAmJiBrIDw9IDQ3KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRiA9IEIgXiBDIF4gRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZyA9ICgoMyAqIGspICsgNSkgJSAxNjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoayA+PSA0OClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEYgPSBDIF4gKEIgfCB+RCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcgPSAoNyAqIGspICUgMTY7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZHRlbXAgPSBEO1xyXG4gICAgICAgICAgICAgICAgICAgIEQgPSBDO1xyXG4gICAgICAgICAgICAgICAgICAgIEMgPSBCO1xyXG4gICAgICAgICAgICAgICAgICAgIEIgPSBCICsgbGVmdFJvdGF0ZSgoQSArIEYgKyBLW2tdICsgTVtnXSksIHNba10pO1xyXG4gICAgICAgICAgICAgICAgICAgIEEgPSBkdGVtcDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBhMCArPSBBO1xyXG4gICAgICAgICAgICAgICAgYjAgKz0gQjtcclxuICAgICAgICAgICAgICAgIGMwICs9IEM7XHJcbiAgICAgICAgICAgICAgICBkMCArPSBEO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gR2V0Qnl0ZVN0cmluZyhhMCkgKyBHZXRCeXRlU3RyaW5nKGIwKSArIEdldEJ5dGVTdHJpbmcoYzApICsgR2V0Qnl0ZVN0cmluZyhkMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmcgR2V0Qnl0ZVN0cmluZyh1aW50IHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nLkpvaW4oXCJcIiwgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3Q8Ynl0ZSxzdHJpbmc+KEJpdENvbnZlcnRlci5HZXRCeXRlcyh4KSwoRnVuYzxieXRlLHN0cmluZz4pKHkgPT4geS5Ub1N0cmluZyhcIngyXCIpKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UZXh0LlJlZ3VsYXJFeHByZXNzaW9ucztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICAjcmVnaW9uIFNldHRpbmdzXHJcblxyXG4gICAgICAgIFtGbGFnc11cclxuICAgICAgICBwdWJsaWMgZW51bSBTZXR0aW5nc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTm9uZSA9IDAsXHJcbiAgICAgICAgICAgIElnbm9yZU1hcFZhcmlhYmxlcyA9IDEsXHJcbiAgICAgICAgICAgIFJlbW92ZUNvbW1lbnRzID0gMixcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiBJbnRlcm5hbFxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzdHJpbmcgX3NlcGFyYXRvciA9IEVudmlyb25tZW50Lk5ld0xpbmU7XHJcbiAgICAgICAgLy9wcml2YXRlIHN0YXRpYyBzdHJpbmcgX3NlcGFyYXRvciA9IFwiO1wiO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuU2VwYXJhdG9ycyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vMSk9PntfbzEuQWRkKCcgJyk7X28xLkFkZCgnLicpO19vMS5BZGQoJywnKTtfbzEuQWRkKCc6Jyk7X28xLkFkZCgnXFx0Jyk7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlbkJyYWNrZXRzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8Y2hhcj4oKSwoX28yKT0+e19vMi5BZGQoJygnKTtfbzIuQWRkKCcpJyk7X28yLkFkZCgnWycpO19vMi5BZGQoJ10nKTtfbzIuQWRkKCd7Jyk7X28yLkFkZCgnfScpO3JldHVybiBfbzI7fSk7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxjaGFyPiBfdG9rZW5PcGVyYXRvcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzMpPT57X28zLkFkZCgnKycpO19vMy5BZGQoJy0nKTtfbzMuQWRkKCcqJyk7X28zLkFkZCgnLycpO19vMy5BZGQoJyUnKTtfbzMuQWRkKCc8Jyk7X28zLkFkZCgnPicpO19vMy5BZGQoJz0nKTtfbzMuQWRkKCchJyk7X28zLkFkZCgnXicpO19vMy5BZGQoJyYnKTtfbzMuQWRkKCd8Jyk7X28zLkFkZCgnQCcpO19vMy5BZGQoJ34nKTtyZXR1cm4gX28zO30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PHN0cmluZz4gX3Rva2VuRW5kU3RhdGVtZW50cyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PHN0cmluZz4oKSwoX280KT0+e19vNC5BZGQoXCJcXG5cIik7X280LkFkZChcIlxcclxcblwiKTtfbzQuQWRkKFwiO1wiKTtfbzQuQWRkKFwifVwiKTtyZXR1cm4gX280O30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PHN0cmluZz4gX3Rva2VuSW5jbHVkZSA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PHN0cmluZz4oKSwoX281KT0+e19vNS5BZGQoXCIjIVwiKTtyZXR1cm4gX281O30pO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuRW5kSW5jbHVkZSA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vNik9PntfbzYuQWRkKCchJyk7cmV0dXJuIF9vNjt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxjaGFyPiBfdG9rZW5TdHJpbmdzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8Y2hhcj4oKSwoX283KT0+e19vNy5BZGQoJ1wiJyk7X283LkFkZCgnJCcpO3JldHVybiBfbzc7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8c3RyaW5nPiBfa2V5d29yZHMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vOCk9PntfbzguQWRkKFwiaWZcIik7X284LkFkZChcInRoZW5cIik7X284LkFkZChcImVsc2VcIik7X284LkFkZChcImVuZFwiKTtfbzguQWRkKFwid2hpbGVcIik7X284LkFkZChcImZvclwiKTtfbzguQWRkKFwiaW5cIik7X284LkFkZChcImFuZFwiKTtfbzguQWRkKFwib3JcIik7X284LkFkZChcIm5vdFwiKTtfbzguQWRkKFwidHJ1ZVwiKTtfbzguQWRkKFwiZmFsc2VcIik7X284LkFkZChcInJldHVyblwiKTtfbzguQWRkKFwiY29udGludWVcIik7X284LkFkZChcImJyZWFrXCIpO19vOC5BZGQoXCJuZXdcIik7X284LkFkZChcImZ1bmN0aW9uXCIpO3JldHVybiBfbzg7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8c3RyaW5nPiBfaWdub3JlT3B0aW1pemUgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vOSk9PntfbzkuQWRkKFwiRmlsZVwiKTtfbzkuQWRkKFwiYWJzXCIpO19vOS5BZGQoXCJhY29zXCIpO19vOS5BZGQoXCJhY3RpdmVfbmV0X2NhcmRcIik7X285LkFkZChcImFjdGl2ZV91c2VyXCIpO19vOS5BZGQoXCJhaXJjcmFja1wiKTtfbzkuQWRkKFwiYWlybW9uXCIpO19vOS5BZGQoXCJhc2luXCIpO19vOS5BZGQoXCJhdGFuXCIpO19vOS5BZGQoXCJiaXR3aXNlXCIpO19vOS5BZGQoXCJic3NpZF9uYW1lXCIpO19vOS5BZGQoXCJidWlsZFwiKTtfbzkuQWRkKFwiY2VpbFwiKTtfbzkuQWRkKFwiY2hhbmdlX3Bhc3N3b3JkXCIpO19vOS5BZGQoXCJjaGFyXCIpO19vOS5BZGQoXCJjaG1vZFwiKTtfbzkuQWRkKFwiY2xvc2VfcHJvZ3JhbVwiKTtfbzkuQWRkKFwiY29kZVwiKTtfbzkuQWRkKFwiY29tbWFuZF9pbmZvXCIpO19vOS5BZGQoXCJjb25uZWN0X2V0aGVybmV0XCIpO19vOS5BZGQoXCJjb25uZWN0X3NlcnZpY2VcIik7X285LkFkZChcImNvbm5lY3Rfd2lmaVwiKTtfbzkuQWRkKFwiY29weVwiKTtfbzkuQWRkKFwiY29zXCIpO19vOS5BZGQoXCJjcmVhdGVfZm9sZGVyXCIpO19vOS5BZGQoXCJjcmVhdGVfZ3JvdXBcIik7X285LkFkZChcImNyZWF0ZV91c2VyXCIpO19vOS5BZGQoXCJjdXJyZW50X2RhdGVcIik7X285LkFkZChcImN1cnJlbnRfcGF0aFwiKTtfbzkuQWRkKFwiZGVjaXBoZXJcIik7X285LkFkZChcImRlbGV0ZVwiKTtfbzkuQWRkKFwiZGVsZXRlX2dyb3VwXCIpO19vOS5BZGQoXCJkZWxldGVfdXNlclwiKTtfbzkuQWRkKFwiZGV2aWNlX3BvcnRzXCIpO19vOS5BZGQoXCJkZXZpY2VzX2xhbl9pcFwiKTtfbzkuQWRkKFwiZHVtcF9saWJcIik7X285LkFkZChcImVzc2lkX25hbWVcIik7X285LkFkZChcImV4aXRcIik7X285LkFkZChcImZsb29yXCIpO19vOS5BZGQoXCJmb3JtYXRfY29sdW1uc1wiKTtfbzkuQWRkKFwiZ2V0X2ZpbGVzXCIpO19vOS5BZGQoXCJnZXRfZm9sZGVyc1wiKTtfbzkuQWRkKFwiZ2V0X2xhbl9pcFwiKTtfbzkuQWRkKFwiZ2V0X3BvcnRzXCIpO19vOS5BZGQoXCJnZXRfcm91dGVyXCIpO19vOS5BZGQoXCJnZXRfc2hlbGxcIik7X285LkFkZChcImdsb2JhbHNcIik7X285LkFkZChcImdyb3VwXCIpO19vOS5BZGQoXCJncm91cHNcIik7X285LkFkZChcImhhc0luZGV4XCIpO19vOS5BZGQoXCJoYXNfcGVybWlzc2lvblwiKTtfbzkuQWRkKFwiaG9zdF9jb21wdXRlclwiKTtfbzkuQWRkKFwiaW5jbHVkZV9saWJcIik7X285LkFkZChcImluZGV4T2ZcIik7X285LkFkZChcImluZGV4ZXNcIik7X285LkFkZChcImlzX2JpbmFyeVwiKTtfbzkuQWRkKFwiaXNfY2xvc2VkXCIpO19vOS5BZGQoXCJpc19mb2xkZXJcIik7X285LkFkZChcImlzX2xhbl9pcFwiKTtfbzkuQWRkKFwiaXNfbmV0d29ya19hY3RpdmVcIik7X285LkFkZChcImlzX3ZhbGlkX2lwXCIpO19vOS5BZGQoXCJqb2luXCIpO19vOS5BZGQoXCJsYXN0SW5kZXhPZlwiKTtfbzkuQWRkKFwibGF1bmNoXCIpO19vOS5BZGQoXCJsZW5cIik7X285LkFkZChcImxpYl9uYW1lXCIpO19vOS5BZGQoXCJsb2FkXCIpO19vOS5BZGQoXCJsb2NhbF9pcFwiKTtfbzkuQWRkKFwibG9jYWxzXCIpO19vOS5BZGQoXCJsb3dlclwiKTtfbzkuQWRkKFwibWQ1XCIpO19vOS5BZGQoXCJtb3ZlXCIpO19vOS5BZGQoXCJuYW1lXCIpO19vOS5BZGQoXCJuZXRfdXNlXCIpO19vOS5BZGQoXCJuZXR3b3JrX2RldmljZXNcIik7X285LkFkZChcIm5ldHdvcmtfZ2F0ZXdheVwiKTtfbzkuQWRkKFwibnNsb29rdXBcIik7X285LkFkZChcIm92ZXJmbG93XCIpO19vOS5BZGQoXCJvd25lclwiKTtfbzkuQWRkKFwicGFyZW50XCIpO19vOS5BZGQoXCJwYXJlbnRfcGF0aFwiKTtfbzkuQWRkKFwicGF0aFwiKTtfbzkuQWRkKFwicGVybWlzc2lvbnNcIik7X285LkFkZChcInBpXCIpO19vOS5BZGQoXCJwaW5nXCIpO19vOS5BZGQoXCJwaW5nX3BvcnRcIik7X285LkFkZChcInBvcFwiKTtfbzkuQWRkKFwicG9ydF9pbmZvXCIpO19vOS5BZGQoXCJwb3J0X251bWJlclwiKTtfbzkuQWRkKFwicHJpbnRcIik7X285LkFkZChcInByb2dyYW1fcGF0aFwiKTtfbzkuQWRkKFwicHVibGljX2lwXCIpO19vOS5BZGQoXCJwdWxsXCIpO19vOS5BZGQoXCJwdXNoXCIpO19vOS5BZGQoXCJwdXRcIik7X285LkFkZChcInJhbmdlXCIpO19vOS5BZGQoXCJyZW1vdmVcIik7X285LkFkZChcInJlbmFtZVwiKTtfbzkuQWRkKFwicmVwbGFjZVwiKTtfbzkuQWRkKFwicmV2ZXJzZVwiKTtfbzkuQWRkKFwicm5kXCIpO19vOS5BZGQoXCJyb3VuZFwiKTtfbzkuQWRkKFwic2NhblwiKTtfbzkuQWRkKFwic2Nhbl9hZGRyZXNzXCIpO19vOS5BZGQoXCJzY3BcIik7X285LkFkZChcInNldF9jb250ZW50XCIpO19vOS5BZGQoXCJzZXRfZ3JvdXBcIik7X285LkFkZChcInNob3dfcHJvY3NcIik7X285LkFkZChcInNodWZmbGVcIik7X285LkFkZChcInNpZ25cIik7X285LkFkZChcInNpblwiKTtfbzkuQWRkKFwic2l6ZVwiKTtfbzkuQWRkKFwic2xpY2VcIik7X285LkFkZChcInNtdHBfdXNlcl9saXN0XCIpO19vOS5BZGQoXCJzb3J0XCIpO19vOS5BZGQoXCJzcGxpdFwiKTtfbzkuQWRkKFwic3FydFwiKTtfbzkuQWRkKFwic3RhcnRfdGVybWluYWxcIik7X285LkFkZChcInN0clwiKTtfbzkuQWRkKFwic3VtXCIpO19vOS5BZGQoXCJ0YW5cIik7X285LkFkZChcInRvX2ludFwiKTtfbzkuQWRkKFwidG91Y2hcIik7X285LkFkZChcInRyaW1cIik7X285LkFkZChcInR5cGVvZlwiKTtfbzkuQWRkKFwidXBwZXJcIik7X285LkFkZChcInVzZWRfcG9ydHNcIik7X285LkFkZChcInVzZXJfYmFua19udW1iZXJcIik7X285LkFkZChcInVzZXJfaW5wdXRcIik7X285LkFkZChcInVzZXJfbWFpbF9hZGRyZXNzXCIpO19vOS5BZGQoXCJ2YWxcIik7X285LkFkZChcInZhbHVlc1wiKTtfbzkuQWRkKFwidmVyc2lvblwiKTtfbzkuQWRkKFwid2hvaXNcIik7X285LkFkZChcIndpZmlfbmV0d29ya3NcIik7X285LkFkZChcInBhcmFtc1wiKTtfbzkuQWRkKFwiY2xlYXJfc2NyZWVuXCIpO19vOS5BZGQoXCJ3YWl0XCIpO19vOS5BZGQoXCJzZWxmXCIpO19vOS5BZGQoXCJudWxsXCIpO19vOS5BZGQoXCJmdW5jdGlvblwiKTtfbzkuQWRkKFwiY29udGVudFwiKTtfbzkuQWRkKFwibGFuX2lwXCIpO19vOS5BZGQoXCJnZXRfY29udGVudFwiKTtfbzkuQWRkKFwiYWlyZXBsYXlcIik7X285LkFkZChcImZpcmV3YWxsX3J1bGVzXCIpO19vOS5BZGQoXCJrZXJuZWxfdmVyc2lvblwiKTtfbzkuQWRkKFwia2VybmVsX3ZlcnNpb25cIik7X285LkFkZChcInJzaGVsbF9zZXJ2ZXJcIik7X285LkFkZChcInJzaGVsbF9zZXJ2ZXJcIik7X285LkFkZChcIl9faXNhXCIpO19vOS5BZGQoXCJpZlwiKTtfbzkuQWRkKFwidGhlblwiKTtfbzkuQWRkKFwiZWxzZVwiKTtfbzkuQWRkKFwiZW5kXCIpO19vOS5BZGQoXCJ3aGlsZVwiKTtfbzkuQWRkKFwiZm9yXCIpO19vOS5BZGQoXCJpblwiKTtfbzkuQWRkKFwiYW5kXCIpO19vOS5BZGQoXCJvclwiKTtfbzkuQWRkKFwibm90XCIpO19vOS5BZGQoXCJ0cnVlXCIpO19vOS5BZGQoXCJmYWxzZVwiKTtfbzkuQWRkKFwibnVsbFwiKTtfbzkuQWRkKFwicmV0dXJuXCIpO19vOS5BZGQoXCJjb250aW51ZVwiKTtfbzkuQWRkKFwiYnJlYWtcIik7X285LkFkZChcImZ1bmN0aW9uXCIpO19vOS5BZGQoXCJuZXdcIik7X285LkFkZChcInNlbGZcIik7cmV0dXJuIF9vOTt9KTtcclxuXHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBEaWN0aW9uYXJ5PHN0cmluZywgc3RyaW5nPiBfb3BlcmF0b3JzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8c3RyaW5nLCBzdHJpbmc+KCksKF9vMTApPT57X28xMC5BZGQoXCImJlwiLEBcIiBhbmQgXCIpO19vMTAuQWRkKFwifHxcIixAXCIgb3IgXCIpO19vMTAuQWRkKFwiPDxcIixAXCJiaXR3aXNlKFwiXCI8PFwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwiPj5cIixAXCJiaXR3aXNlKFwiXCI+PlwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwiPj4+XCIsQFwiYml0d2lzZShcIlwiPj4+XCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCJeXlwiLEBcImJpdHdpc2UoXCJcIl5cIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcIiZcIixAXCJiaXR3aXNlKFwiXCImXCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCJ8XCIsQFwiYml0d2lzZShcIlwifFwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwiflwiLEBcImJpdHdpc2UoXCJcIn5cIlwiLCRiKVwiKTtfbzEwLkFkZChcIisrXCIsQFwiJGE9JGErMVwiKTtfbzEwLkFkZChcIi0tXCIsQFwiJGE9JGEtMVwiKTtfbzEwLkFkZChcIis9XCIsQFwiJGE9JGErJGJcIik7X28xMC5BZGQoXCItPVwiLEBcIiRhPSRhLSRiXCIpO19vMTAuQWRkKFwiKj1cIixAXCIkYT0kYSokYlwiKTtfbzEwLkFkZChcIi89XCIsQFwiJGE9JGEvJGJcIik7X28xMC5BZGQoXCIlPVwiLEBcIiRhPSRhJSRiXCIpO19vMTAuQWRkKFwiPT5cIixAXCJmdW5jdGlvbiRhJGJcIik7cmV0dXJuIF9vMTA7fSk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBlbnVtIEVUZW1wbGF0ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTm9uZSxcclxuICAgICAgICAgICAgSXRlcmF0aW9uSW5kZXgsXHJcbiAgICAgICAgICAgIElnbm9yZU9wdGltaXphdGlvbixcclxuICAgICAgICAgICAgVGVybmFyeU9wZXJhdG9yLFxyXG4gICAgICAgICAgICBDb21tZW50LFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRGljdGlvbmFyeTxzdHJpbmcsIEVUZW1wbGF0ZT4gX3RlbXBsYXRlcyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgRVRlbXBsYXRlPigpLChfbzExKT0+e19vMTEuQWRkKEBcIihfXykoLiopKF9pZHgpXCIsRVRlbXBsYXRlLkl0ZXJhdGlvbkluZGV4KTtfbzExLkFkZChAXCIoXFxcXCkoXFxTKilcIixFVGVtcGxhdGUuSWdub3JlT3B0aW1pemF0aW9uKTtfbzExLkFkZChAXCIoXFwvXFwvKSguKikkXCIsRVRlbXBsYXRlLkNvbW1lbnQpO3JldHVybiBfbzExO30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIElzVGVtcGxhdGUoc3RyaW5nIGlucHV0LCBvdXQgc3RyaW5nIHJlZ2V4LCBvdXQgTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXMsIG91dCBFVGVtcGxhdGUgdGVtcGxhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoIChLZXlWYWx1ZVBhaXI8c3RyaW5nLCBFVGVtcGxhdGU+IHBhaXIgaW4gX3RlbXBsYXRlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWF0Y2hlcyA9IFJlZ2V4Lk1hdGNoZXMoaW5wdXQsIHBhaXIuS2V5KTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzLkNvdW50ICE9IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggPSBwYWlyLktleTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHBhaXIuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1hdGNoZXMgPSBudWxsO1xyXG4gICAgICAgICAgICByZWdleCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gRVRlbXBsYXRlLk5vbmU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgQ29tcGlsZShzdHJpbmcgY29kZSwgYm9vbCBvcHRpbWl6ZSA9IGZhbHNlLCBTZXR0aW5ncyBzZXR0aW5ncyA9IFNldHRpbmdzLk5vbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVG9rZW5pemUoY29kZSwgc2V0dGluZ3MpLkNvbXBpbGUob3B0aW1pemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIFRyeUNvbXBpbGUoc3RyaW5nIGNvZGUsIG91dCBzdHJpbmcgY29tcGlsZWRDb2RlLCBib29sIG9wdGltaXplID0gZmFsc2UsIFNldHRpbmdzIHNldHRpbmdzID0gU2V0dGluZ3MuTm9uZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb21waWxlZENvZGUgPSBDb21waWxlKGNvZGUsIG9wdGltaXplLCBzZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbXBpbGVkQ29kZSA9IGUuTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgQ29udGV4dCBUb2tlbml6ZShzdHJpbmcgcGxhaW5Db2RlLCBTZXR0aW5ncyBzZXR0aW5ncyA9IFNldHRpbmdzLk5vbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb250ZXh0IGNvbnRleHQgPSBuZXcgQ29udGV4dChzZXR0aW5ncykgeyBQbGFpbklucHV0ID0gbmV3IFF1ZXVlPGNoYXI+KHBsYWluQ29kZSkgfTtcclxuXHJcbiAgICAgICAgICAgIFRva2VuIHRva2VuID0gbnVsbDtcclxuICAgICAgICAgICAgd2hpbGUgKCh0b2tlbiA9IEdldE5leHRUb2tlbihjb250ZXh0KSkgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5BZGRUb2tlbih0b2tlbik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoY29udGV4dC5TZXR0aW5ncyAmIFNldHRpbmdzLklnbm9yZU1hcFZhcmlhYmxlcykgIT0gMCAmJiB0b2tlbi5QcmV2ICE9IG51bGwgJiYgdG9rZW4uUHJldi5WYWx1ZSA9PSBcIi5cIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRleHQuSWdub3JlT3B0aW1pemUodG9rZW4uVmFsdWUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jdXN0b21JZ25vcmVPcHRpbWl6ZS5BZGQodG9rZW4uVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlbW92ZVNwYWNlcyhRdWV1ZTxjaGFyPiBxdWV1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdoaWxlIChxdWV1ZS5Db3VudCAhPSAwICYmIGNoYXIuSXNXaGl0ZVNwYWNlKHF1ZXVlLlBlZWsoKSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHF1ZXVlLkRlcXVldWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgRnVuYzxDb250ZXh0LCBib29sPiBHZXRTZXBhcmF0aW9uU2VsZWN0b3IoQ29udGV4dCBjb250ZXh0LCBvdXQgVG9rZW4gdG9rZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnLycgJiYgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KGNvbnRleHQuUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpID09ICcvJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uVGVtcGxhdGUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICdcXG4nIHx8IChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICdcXHInICYmXHJcblN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPiggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LDEpLkZpcnN0KCkgPT0gJ1xcbicpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuTWFwQWN0aXZlLlBlZWsoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uU2VwYXJhdG9yKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJywnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goIWNvbnRleHQuU2V0dGluZ3MuSGFzRmxhZyhTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICc6JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHggPT4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICdcXFxcJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uVGVtcGxhdGUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IF90b2tlbkJyYWNrZXRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdG9rZW5TZXBhcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkgKyBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oeC5QbGFpbklucHV0LDEpLkZpcnN0T3JEZWZhdWx0KCkuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5JbmNsdWRlLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgK1xyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LDEpLkZpcnN0T3JEZWZhdWx0KCkuVG9TdHJpbmcoKSkpIC8vaW5jbHVkZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5JbmNsdWRlKCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90b2tlbkVuZEluY2x1ZGUuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSkpIC8vb3BlcmF0b3JcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uT3BlcmF0b3IoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+ICFfdG9rZW5PcGVyYXRvcnMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF90b2tlbkJyYWNrZXRzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL2JyYWNrZXRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLkJyYWNrZXQoKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICcoJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnKSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1snOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goKCEoY29udGV4dC5MYXN0VG9rZW4gPT0gbnVsbCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gaXMgVG9rZW4uT3BlcmF0b3IpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbnRleHQuU2V0dGluZ3MgJiBTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICddJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAneyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0Lkxhc3RUb2tlbiA9PSBudWxsIHx8ICghY29udGV4dC5MYXN0VG9rZW4uVmFsdWUuRW5kc1dpdGgoXCIpXCIpICYmIGNvbnRleHQuTGFzdFRva2VuLlZhbHVlICE9IFwiPT5cIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTWFwQWN0aXZlLlB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goKGNvbnRleHQuU2V0dGluZ3MgJiBTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5NYXBBY3RpdmUuUHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd9JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5NYXBBY3RpdmUuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF90b2tlblNlcGFyYXRvcnMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSkpIC8vc2VwYXJhdG9yc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5TZXBhcmF0b3IoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5TdHJpbmdzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL3N0cmluZ3NcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB0b2tlbi5PcHRpbWl6YWJsZSA9IGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUGVlaygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJyQnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuLkN1c3RvbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4uT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB4ID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2V0U3RyaW5nKHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5WYXJpYWJsZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4geCA9PiBfdG9rZW5CcmFja2V0cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdG9rZW5TZXBhcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90b2tlblN0cmluZ3MuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSArIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPih4LlBsYWluSW5wdXQsMSkuRmlyc3RPckRlZmF1bHQoKS5Ub1N0cmluZygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgR2V0U3RyaW5nKENvbnRleHQgY29udGV4dClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMCAmJiBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpICE9ICdcIicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgIT0gMClcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKSk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJ1wiJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpKTtcclxuICAgICAgICAgICAgICAgIEdldFN0cmluZyhjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLlJlbW92ZSgwLCAxKTtcclxuICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLlJlbW92ZShjb250ZXh0LlN0cmluZ0J1aWxkZXIuTGVuZ3RoIC0gMSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIFRva2VuIEdldE5leHRUb2tlbihDb250ZXh0IGNvbnRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQ2xlYXIoKTtcclxuICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IGNvbnRleHQuU3RyaW5nQnVpbGRlcjtcclxuICAgICAgICAgICAgUmVtb3ZlU3BhY2VzKGNvbnRleHQuUGxhaW5JbnB1dCk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPT0gMCkgcmV0dXJuIG51bGw7XHJcbkdyZXlIYWNrQ29tcGlsZXIuVG9rZW4gdDtcbiAgICAgICAgICAgIEZ1bmM8Q29udGV4dCwgYm9vbD4gc2VwYXJhdG9yID0gR2V0U2VwYXJhdGlvblNlbGVjdG9yKGNvbnRleHQsIG91dCB0KTtcclxuICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2IuQXBwZW5kKGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCkpO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmICFzZXBhcmF0b3IoY29udGV4dCkpO1xyXG5cclxuICAgICAgICAgICAgc3RyaW5nIHRtcF92YWx1ZSA9IHNiLlRvU3RyaW5nKCk7XHJcbnN0cmluZyByZWdleDtcbk1hdGNoQ29sbGVjdGlvbiBtYXRjaGVzO1xuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUgdGVtcGxhdGU7XG4gICAgICAgICAgICBpZiAoISh0IGlzIFRva2VuLlN0cmluZykgJiYgSXNUZW1wbGF0ZSh0bXBfdmFsdWUsIG91dCByZWdleCwgb3V0IG1hdGNoZXMsIG91dCB0ZW1wbGF0ZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHQgPSBuZXcgVG9rZW4uVGVtcGxhdGUodGVtcGxhdGUsIG1hdGNoZXMsIHJlZ2V4LCBjb250ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfa2V5d29yZHMuQ29udGFpbnModG1wX3ZhbHVlKSAmJiAhKHQgaXMgVG9rZW4uU3RyaW5nKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdCA9IG5ldyBUb2tlbi5LZXl3b3JkKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0Lk9wdGltaXphYmxlICYmIGNvbnRleHQuSWdub3JlT3B0aW1pemUodC5WYWx1ZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHQuT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdC5WYWx1ZSA9IHRtcF92YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJyAnKVxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuXHJcbiAgICAgICAgICAgIHQuRW5kU3RhdGVtZW50ID0gSXNFbmRPZkxpbmUoY29udGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPiAwICYmIGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJzsnKSBjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgfVxyXG5wcml2YXRlIHN0YXRpYyBib29sIElzRW5kT2ZMaW5lKENvbnRleHQgY29udGV4dClcclxue1xyXG4gICAgcmV0dXJuIGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA9PSAwIHx8IF90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpICsgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KGNvbnRleHQuUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpLlRvU3RyaW5nKCkpIHx8IF90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpKTtcclxufSAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG4jaWYganNcclxuI2Vsc2VcclxudXNpbmcgU3lzdGVtLk5ldC5IdHRwO1xyXG4jZW5kaWZcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgY2xhc3MgQ29udGV4dFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFF1ZXVlPGNoYXI+IFBsYWluSW5wdXQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgVG9rZW4gUm9vdFRva2VuIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIFRva2VuIExhc3RUb2tlbiB7IGdldDsgc2V0OyB9XHJcbnB1YmxpYyBTdHJpbmdCdWlsZGVyIFN0cmluZ0J1aWxkZXJcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZ0J1aWxkZXJzLlBlZWsoKTtcclxuICAgIH1cclxufVxyXG4gICAgICAgICAgICBpbnRlcm5hbCBTdHJpbmdCdWlsZGVyIENvZGVQcmVmaXggeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaW50ZXJuYWwgbG9uZyBicmFja2V0RGVwdGggPSAwO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBTdGFjazxTdHJpbmdCdWlsZGVyPiBzdHJpbmdCdWlsZGVycyA9IG5ldyBTdGFjazxTdHJpbmdCdWlsZGVyPigpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBTdGFjazxib29sPiBTaG91bGRPcHRpbWl6ZVN0cmluZyA9IG5ldyBTdGFjazxib29sPigpO1xyXG4gICAgICAgICAgICBpbnRlcm5hbCBTdGFjazxib29sPiBNYXBBY3RpdmUgPSBuZXcgU3RhY2s8Ym9vbD4oKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgVmFyaWFibGVOYW1lUHJvdmlkZXIgbmFtZVByb3ZpZGVyID0gbmV3IFZhcmlhYmxlTmFtZVByb3ZpZGVyKCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIGJvb2wgb3B0aW1pemVFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGludGVybmFsIFNldHRpbmdzIFNldHRpbmdzID0gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLlNldHRpbmdzLk5vbmU7XHJcbiAgICAgICAgICAgIGludGVybmFsIEhhc2hTZXQ8c3RyaW5nPiBjdXN0b21JZ25vcmVPcHRpbWl6ZSA9IG5ldyBIYXNoU2V0PHN0cmluZz4oKTtcclxuI2lmIGpzXHJcbiNlbHNlXHJcbiAgICAgICAgICAgIGludGVybmFsIEh0dHBDbGllbnQgaHR0cENsaWVudCA9IG5ldyBIdHRwQ2xpZW50KCk7XHJcbiNlbmRpZlxyXG5wdWJsaWMgYm9vbCBJZ25vcmVPcHRpbWl6ZShzdHJpbmcgdmFsdWUpXHJcbntcclxuICAgIHJldHVybiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX2lnbm9yZU9wdGltaXplLkNvbnRhaW5zKHZhbHVlKSB8fCBjdXN0b21JZ25vcmVPcHRpbWl6ZS5Db250YWlucyh2YWx1ZSk7XHJcbn1cclxuICAgICAgICAgICAgcHVibGljIHZvaWQgQWRkVG9rZW4oVG9rZW4gdG9rZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChSb290VG9rZW4gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBSb290VG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICBMYXN0VG9rZW4gPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBMYXN0VG9rZW4uTmV4dCA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuLlByZXYgPSBMYXN0VG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgTGFzdFRva2VuID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHVibGljIENvbnRleHQoU2V0dGluZ3Mgc2V0dGluZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICBQbGFpbklucHV0ID0gbmV3IFF1ZXVlPGNoYXI+KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcigpKTtcclxuICAgICAgICAgICAgICAgIENvZGVQcmVmaXggPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIFNob3VsZE9wdGltaXplU3RyaW5nLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgTWFwQWN0aXZlLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RyaW5nIENvbXBpbGUoYm9vbCBvcHRpbWl6ZSA9IGZhbHNlLGJvb2wgaXNTdHJpbmdGb3JtYXQgPSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3B0aW1pemVFbmFibGVkID0gb3B0aW1pemU7XHJcbiAgICAgICAgICAgICAgICBTdHJpbmdCdWlsZGVyLkNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIFRva2VuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gUm9vdFRva2VuO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5PcHRpbWl6ZSh0aGlzLG9wdGltaXplKS5OZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUgPSBSb290VG9rZW47XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLkNvbXBpbGUodGhpcykuTmV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZ0Zvcm1hdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgQ29kZVByZWZpeC5BcHBlbmQoU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBDb2RlUHJlZml4LlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBTdHJpbmdCdWlsZGVyIHNiID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICAgICAgICAgIFRva2VuIG5vZGUgPSBSb290VG9rZW47XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgaXMgVG9rZW4uU3RyaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQoJ1wiJytub2RlLlZhbHVlKyAnXCInKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLkFwcGVuZChub2RlLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5FbmRTdGF0ZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQoJ1xcbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQoJyAnKTtcclxuICAgICAgICAgICAgICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kTGluZShub2RlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLk5leHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNiLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGV4dC5SZWd1bGFyRXhwcmVzc2lvbnM7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgcGFydGlhbCBjbGFzcyBUb2tlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFRva2VuIFByZXYgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgVG9rZW4gTmV4dCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyB2aXJ0dWFsIHN0cmluZyBWYWx1ZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgQ3VzdG9tIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGJvb2wgT3B0aW1pemFibGUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwcml2YXRlIGJvb2wgX2VuZFN0YXRlbWVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBFbmRTdGF0ZW1lbnQgeyBnZXR7XHJcbiAgICAgICAgICAgICAgICBpZiAoRm9yY2VFbmRTdGF0ZW1lbnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZvcmNlRW5kU3RhdGVtZW50VmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9lbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNldCB7IF9lbmRTdGF0ZW1lbnQgPSB2YWx1ZTsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIEZvcmNlRW5kU3RhdGVtZW50IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGJvb2wgRm9yY2VFbmRTdGF0ZW1lbnRWYWx1ZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgdmlydHVhbCBUb2tlbiBPcHRpbWl6ZShDb250ZXh0IGNvbnRleHQsYm9vbCByZXBsYWNlID0gdHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKE9wdGltaXphYmxlICYmIC8vZmxhZyBmcm9tIHRva2VuaXphdGlvbiAgXHJcbiAgICAgICAgICAgICAgICAgICAgVmFsdWUuTGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFjaGFyLklzRGlnaXQoVmFsdWVbMF0pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIWNvbnRleHQuSWdub3JlT3B0aW1pemUoVmFsdWUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXBsYWNlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBjb250ZXh0Lm5hbWVQcm92aWRlci5HZXRSZXBsYWNlKFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5uYW1lUHJvdmlkZXIuRGVmaW5lKFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHZpcnR1YWwgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPcldoaXRlU3BhY2UoVmFsdWUpKSByZXR1cm4gdGhpcztcclxuQnJhY2tldCBiOyAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5TdHJpbmdCdWlsZGVyLkxlbmd0aCAhPSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKChSZWdleC5Jc01hdGNoKGNvbnRleHQuU3RyaW5nQnVpbGRlcltjb250ZXh0LlN0cmluZ0J1aWxkZXIuTGVuZ3RoIC0gMV0uVG9TdHJpbmcoKSwgXCJcXFxcd1wiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgVmFsdWUuTGVuZ3RoID4gMCAmJiBSZWdleC5Jc01hdGNoKFZhbHVlWzBdLlRvU3RyaW5nKCksIFwiXFxcXHdcIikpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgIChQcmV2ICE9IG51bGwgJiYgUHJldiBpcyBLZXl3b3JkICYmIChiID0gdGhpcyBhcyBCcmFja2V0KSAhPSBudWxsJiYgKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8Y2hhcj4oYi5WYWx1ZSkgPT0gJygnIHx8IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8Y2hhcj4oYi5WYWx1ZSkgPT0gJ1snKSkpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoJyAnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChFbmRTdGF0ZW1lbnQgJiYgTmV4dCAhPSBudWxsICYmICFmb3JjZSkgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChfc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcml2YXRlIGJvb2wgQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoc3RyaW5nIHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChzLkxlbmd0aCA+IFZhbHVlLkxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZVtpXSAhPSBzW2ldKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHByaXZhdGUgYm9vbCBDb21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShjaGFyIGMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChWYWx1ZS5MZW5ndGg8MSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFZhbHVlWzBdID09IGM7XHJcbiAgICAgICAgICAgIH1cclxuXG4gICAgICAgIFxucHJpdmF0ZSBib29sIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19PcHRpbWl6YWJsZT10cnVlO31cclxuICAgIH1cclxufVxyXG5cclxuIiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgY2xhc3MgVmFyaWFibGVOYW1lUHJvdmlkZXJcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIERpY3Rpb25hcnk8c3RyaW5nLHN0cmluZz4gX3JlcGxhY2UgPSBuZXcgRGljdGlvbmFyeTxzdHJpbmcsIHN0cmluZz4oKTtcclxuICAgICAgICBwcml2YXRlIEhhc2hTZXQ8c3RyaW5nPiBfbmFtZXMgPSBuZXcgSGFzaFNldDxzdHJpbmc+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgX3N0YXRlO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9jaGFycyA9IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIE5leHQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgICAgIGludCBpbmRleCA9IF9zdGF0ZTtcclxuXHJcbiAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBpID0gaW5kZXggJSBfY2hhcnMuTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgY2hhciBjID0gX2NoYXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgc2IuQXBwZW5kKGMpO1xyXG4gICAgICAgICAgICAgICAgaW5kZXggLz0gX2NoYXJzLkxlbmd0aDtcclxuICAgICAgICAgICAgfSB3aGlsZSAoaW5kZXggPiAwKTtcclxuXHJcbiAgICAgICAgICAgIF9zdGF0ZSsrO1xyXG4gICAgICAgICAgICByZXR1cm4gc2IuVG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0RnJlZShib29sIG9wdGltaXplKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nIG5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBib29sIGM7XHJcbiAgICAgICAgICAgIGlmIChvcHRpbWl6ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nIHMgPSBOZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBfbmFtZXMuQWRkKHMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IE5leHQoKTtcclxuICAgICAgICAgICAgfSB3aGlsZSAoX25hbWVzLkNvbnRhaW5zKG5hbWUpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0RlZmluZWQoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX3JlcGxhY2UuQ29udGFpbnNLZXkobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0UmVwbGFjZShzdHJpbmcgb3JpZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghX3JlcGxhY2UuQ29udGFpbnNLZXkob3JpZykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZyBzID0gTmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgX3JlcGxhY2Vbb3JpZ10gPSBzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBfcmVwbGFjZVtvcmlnXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERlZmluZShzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghX25hbWVzLkNvbnRhaW5zKG5hbWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbmFtZXMuQWRkKG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgVmFyaWFibGUgOiBUb2tlblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuQnJhY2tldCBicjsgICAgICAgICAgICAgICAgICAgIGlmICgoYnIgPSB0aGlzIGFzIEJyYWNrZXQpICE9IG51bGwmJiAhYnIuQ3VzdG9tICYmIChici5WYWx1ZS5MZW5ndGggPT0gMCB8fCBici5WYWx1ZVswXSAhPSAneycpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKE5leHQgIT0gbnVsbCAmJiAhR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl90b2tlbk9wZXJhdG9ycy5Db250YWlucyhTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PGNoYXI+KFZhbHVlKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIChOZXh0LlZhbHVlID09IFwiLlwiIHx8IE5leHQuVmFsdWUgPT0gXCIoXCIgfHwgTmV4dC5WYWx1ZSA9PSBcIltcIikpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKFZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZXh0LlZhbHVlID09IFwiLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gTmV4dC5OZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZCgnLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dCE9bnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gTmV4dC5FbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JjZUVuZFN0YXRlbWVudCA9IE5leHQuRm9yY2VFbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb3JjZUVuZFN0YXRlbWVudFZhbHVlID0gTmV4dC5Gb3JjZUVuZFN0YXRlbWVudFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dCA9IE5leHQuTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5leHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5QcmV2ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTGFzdFRva2VuID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbk9wZXJhdG9yIG87XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE5leHQgIT0gbnVsbCAmJiAobyA9IE5leHQgYXMgT3BlcmF0b3IpICE9IG51bGwmJiBvLk5lZWRzTGVmdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBiYXNlLkNvbXBpbGUoY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5PcGVyYXRvciBvbztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoUHJldiAhPSBudWxsICYmIChvbyA9IFByZXYgYXMgT3BlcmF0b3IpICE9IG51bGwmJiBvby5OZWVkc1JpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgciA9IGJhc2UuQ29tcGlsZShjb250ZXh0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiVmFyaWFibGU6IHswfVwiLGJhc2UuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgSW5jbHVkZSA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBJbmNsdWRlKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBPcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4jaWYganNcclxuXHJcbiNlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEVudmlyb25tZW50Lk9TVmVyc2lvbi5QbGF0Zm9ybSA9PSBQbGF0Zm9ybUlELk90aGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBcIi8vaW5jbHVkZSBpcyBub3QgeWV0IGltcGxlbWVudGVkIGluIHdlYlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IGNvbnRleHQuaHR0cENsaWVudC5HZXRTdHJpbmdBc3luYyhWYWx1ZSkuR2V0QXdhaXRlcigpLkdldFJlc3VsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuI2VuZGlmXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIkluY2x1ZGU6IHswfVwiLGJhc2UuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBLZXl3b3JkIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIEtleXdvcmQoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIEdyZXlIYWNrQ29tcGlsZXIuVG9rZW4gT3B0aW1pemUoR3JleUhhY2tDb21waWxlci5Db250ZXh0IGNvbnRleHQsIGJvb2wgcmVwbGFjZSA9IHRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlID09IFwidHJ1ZVwiKSBWYWx1ZSA9IFwiMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZSA9PSBcImZhbHNlXCIpIFZhbHVlID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuT3B0aW1pemUoY29udGV4dCxyZXBsYWNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKFZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZvclwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2hpbGVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlmXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21waWxlTmV4dChjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbXBpbGVOZXh0KGNvbnRleHQsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdm9pZCBDb21waWxlTmV4dChDb250ZXh0IGNvbnRleHQsYm9vbCByZW1vdmVCcmFjZXRzID0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShOZXh0IGlzIEJyYWNrZXQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgTmV4dC5Db21waWxlKGNvbnRleHQsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbW92ZUJyYWNldHMpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXJbMF0gPSAnICc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlICs9IGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygwLCBjb250ZXh0LlN0cmluZ0J1aWxkZXIuTGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlICs9IGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChOZXh0Lk5leHQhPW51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBOZXh0Lk5leHQuUHJldiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSBOZXh0LkVuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBOZXh0ID0gTmV4dC5OZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBTZXBhcmF0b3IgOiBUb2tlblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgU2VwYXJhdG9yKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBPcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJTZXBhcmF0b3I6IHswfVwiLFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgU3RyaW5nIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIENvbXBpbGUoQ29udGV4dCBjb250ZXh0LCBib29sIGZvcmNlID0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEN1c3RvbSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoXCIoXFxcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGRlcHRoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50IGxhc3QgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFZhbHVlLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSArIDEgPCBWYWx1ZS5MZW5ndGggJiYgVmFsdWVbaV0gPT0gJ1xcXFwnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFZhbHVlW2kgKyAxXSA9PSAneycgfHwgVmFsdWVbaSArIDFdID09ICd9JykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWVbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlW2ldID09ICd7JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVwdGggPT0gMCkgbGFzdCA9IGkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoVmFsdWVbaV0gPT0gJ30nICYmIChpID09IDAgfHwgVmFsdWVbaSAtIDFdICE9ICdcXFxcJykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGgtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVwdGggPCAwKSB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJzdHJpbmcgZm9ybWF0ICh7MH0pIGlzIG5vdCB2YWxpZFwiLFZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlcHRoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiXFxcIisoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250ZXh0IGlubmVyQ29kZUNvbnRleHQgPSBUb2tlbml6ZShWYWx1ZS5TdWJzdHJpbmcobGFzdCwgaSAtIGxhc3QpLlJlcGxhY2UoQFwiXCJcIlwiXCJcIiwgQFwiXCJcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyQ29kZUNvbnRleHQubmFtZVByb3ZpZGVyID0gY29udGV4dC5uYW1lUHJvdmlkZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyQ29kZUNvbnRleHQuQ29kZVByZWZpeCA9IGNvbnRleHQuQ29kZVByZWZpeDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIGNvbXBpbGVkID0gaW5uZXJDb2RlQ29udGV4dC5Db21waWxlKGNvbnRleHQub3B0aW1pemVFbmFibGVkLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKGNvbXBpbGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChcIikrXFxcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkZXB0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoVmFsdWVbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoXCJcXFwiKVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZCgnXCInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoRW5kU3RhdGVtZW50KSBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKF9zZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmcuRm9ybWF0KFwiU3RyaW5nOiB7MH17MX1cIiwoQ3VzdG9tID8gXCIkXCIgOiBcIlwiKSxiYXNlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgcGFydGlhbCBjbGFzcyBUb2tlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIEJyYWNrZXQgOiBWYXJpYWJsZVxyXG4gICAgICAgICAgICB7XHJcbnB1YmxpYyBib29sIElzT3BlbmluZ1xyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVmFsdWUgPT0gXCIoXCIgfHwgVmFsdWUgPT0gXCJbXCIgfHwgVmFsdWUgPT0gXCJ7XCI7XHJcbiAgICB9XHJcbn1wdWJsaWMgYm9vbCBJc0Nsb3Npbmdcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFZhbHVlID09IFwiKVwiIHx8IFZhbHVlID09IFwiXVwiIHx8IFZhbHVlID09IFwifVwiO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIERpY3Rpb25hcnk8Y2hhciwgY2hhcj4gX29wZW5pbmdUb0Nsb3NpbmcgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxjaGFyLCBjaGFyPigpLChfbzEpPT57X28xLkFkZCgnKCcsJyknKTtfbzEuQWRkKCdbJywnXScpO19vMS5BZGQoJ3snLCd9Jyk7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBCcmFja2V0KClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBPcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHByaXZhdGUgVG9rZW4gQ29tcGlsZUluc2lkZShDb250ZXh0IGNvbnRleHQsIGJvb2wgbXVsdGlMaW5lID0gZmFsc2UsIHN0cmluZyBwcmVmaXggPSBcIlwiLCBzdHJpbmcgcG9zdGZpeCA9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9rZW4gbGFzdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9rZW4gY3VycmVudCA9IE5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKHByZWZpeCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYXIgY2xvc2UgPSBfb3BlbmluZ1RvQ2xvc2luZ1tTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PGNoYXI+KFZhbHVlKV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChjdXJyZW50IT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtdWx0aUxpbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuRm9yY2VFbmRTdGF0ZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudC5Gb3JjZUVuZFN0YXRlbWVudFZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50LkVuZFN0YXRlbWVudCA9IGN1cnJlbnQuRW5kU3RhdGVtZW50IHx8IGN1cnJlbnQuTmV4dC5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShjbG9zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3QgPSBjdXJyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShjbG9zZSkpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50LkNvbXBpbGUoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lk5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdC5OZXh0ICE9IG51bGwgJiYgbGFzdC5OZXh0LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiZWxzZVwiKSAmJiBtdWx0aUxpbmUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0LlZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdC5Gb3JjZUVuZFN0YXRlbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3QuRm9yY2VFbmRTdGF0ZW1lbnRWYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghc3RyaW5nLklzTnVsbE9yV2hpdGVTcGFjZShwb3N0Zml4KSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3QuVmFsdWUgPSBwb3N0Zml4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoIWxhc3QuUHJldi5FbmRTdGF0ZW1lbnQgJiYgbXVsdGlMaW5lKVxyXG4gICAgICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmRMaW5lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdC5Gb3JjZUVuZFN0YXRlbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdC5Gb3JjZUVuZFN0YXRlbWVudFZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdC5Db21waWxlKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QuRm9yY2VFbmRTdGF0ZW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSBsYXN0LkVuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhc3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgZWxzZUZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBib29sIGxhbWJkYUZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSXNPcGVuaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5icmFja2V0RGVwdGgrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihJc0Nsb3NpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNrZXREZXB0aC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ3VzdG9tKSByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSXNPcGVuaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG9rZW4gbm9kZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoUHJldiAhPSBudWxsICYmIFZhbHVlID09IFwie1wiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKFByZXYgaXMgS2V5d29yZCB8fCAobGFtYmRhRmxhZyA9IFByZXYuVmFsdWUgPT0gXCI9PlwiKSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZWxzZUZsYWcgPSBQcmV2LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiZWxzZVwiKSkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgcHJlZml4ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBwb3N0Zml4ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbHNlRmxhZyB8fCBQcmV2LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiZWxzZVwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0Zml4ID0gXCJlbmQgaWZcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFByZXYuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoXCJpZlwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXggPSBcInRoZW5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0Zml4ID0gXCJlbmQgaWZcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYobGFtYmRhRmxhZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0Zml4ID0gXCJlbmQgZnVuY3Rpb25cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFByZXYuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoXCJmdW5jdGlvblwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0Zml4ID0gXCJlbmQgZnVuY3Rpb25cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoUHJldi5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcImZvclwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0Zml4ID0gXCJlbmQgZm9yXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChQcmV2LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwid2hpbGVcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIHdoaWxlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IENvbXBpbGVJbnNpZGUoY29udGV4dCwgdHJ1ZSwgcHJlZml4K1wiXFxuXCIsIHBvc3RmaXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IENvbXBpbGVJbnNpZGUoY29udGV4dCxmYWxzZSxWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBub2RlIT1udWxsP25vZGUuTmV4dDooVG9rZW4pbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChQcmV2ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUm9vdFRva2VuID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYuTmV4dCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobm9kZSE9bnVsbD9ub2RlLk5leHQ6KFRva2VuKW51bGwpID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTGFzdFRva2VuID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuTmV4dC5QcmV2ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3VzdG9tID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJCcmFja2V0OiB7MH1cIixWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBHcmV5SGFja1Rvb2xzLkRlYnVnZ2VyO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBPcGVyYXRvciA6IFZhcmlhYmxlXHJcbiAgICAgICAgICAgIHtcclxucHVibGljIGJvb2wgTmVlZHNMZWZ0XHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX29wZXJhdG9ycy5Db250YWluc0tleShWYWx1ZSkgJiYgX29wZXJhdG9yc1tWYWx1ZV0uQ29udGFpbnMoXCIkYVwiKTtcclxuICAgIH1cclxufXB1YmxpYyBib29sIE5lZWRzUmlnaHRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5fb3BlcmF0b3JzLkNvbnRhaW5zS2V5KFZhbHVlKSAmJiBfb3BlcmF0b3JzW1ZhbHVlXS5Db250YWlucyhcIiRiXCIpO1xyXG4gICAgfVxyXG59ICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIEN1c3RvbVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldCB7IHJldHVybiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuX29wZXJhdG9ycy5Db250YWluc0tleShWYWx1ZSk7IH1cclxuICAgICAgICAgICAgICAgICAgICBzZXQgeyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBPcGVyYXRvcigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW1pemFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUb2tlbiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChDdXN0b20pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nIGRlcHRoID0gY29udGV4dC5icmFja2V0RGVwdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBsZWZ0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHJpZ2h0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG9rZW4gdG1wUmlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb2tlbiB0bXBMZWZ0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHMgPSBfb3BlcmF0b3JzW1ZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5lZWRzTGVmdCAmJiBQcmV2ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuQnJhY2tldCBiOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGIgPSBQcmV2IGFzIEJyYWNrZXQpICE9IG51bGwmJiBiLklzT3BlbmluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJpbnZhbGlkIHN5bnRheCBmb3IgdGVtcGxhdGUgezB9XCIsVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcExlZnQgPSBQcmV2LkNvbXBpbGUoY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzID0gcy5SZXBsYWNlKFwiJGFcIiwgbGVmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlBvcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIixQcmV2KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8VG9rZW4+KFwia2V5MVwiKS5QcmV2OihUb2tlbiludWxsKSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYgPSBQcmV2LlByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5OZXh0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlJvb3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZWVkc1JpZ2h0ICYmIE5leHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wUmlnaHQgPSBOZXh0LkNvbXBpbGUoY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodCA9IGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyA9IHMuUmVwbGFjZShcIiRiXCIsIHJpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSBOZXh0LkVuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTJcIixOZXh0KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8VG9rZW4+KFwia2V5MlwiKS5OZXh0OihUb2tlbiludWxsKSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBOZXh0Lk5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5QcmV2ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZT09XCI9PlwiICYmIHRtcExlZnQuUHJldiAhPSBudWxsICYmIHRtcExlZnQuUHJldi5WYWx1ZSAhPSBcIj1cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIG5hbWUgPSBjb250ZXh0Lm5hbWVQcm92aWRlci5HZXRGcmVlKGNvbnRleHQub3B0aW1pemVFbmFibGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlID0gXCJAXCIgKyBuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Db2RlUHJlZml4LkFwcGVuZChuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuQ29kZVByZWZpeC5BcHBlbmQoXCI9XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Db2RlUHJlZml4LkFwcGVuZExpbmUocyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSB0bXBSaWdodC5FbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIk9wZXJhdG9yOiB7MH1cIixiYXNlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRleHQuUmVndWxhckV4cHJlc3Npb25zO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBUZW1wbGF0ZSA6IFZhcmlhYmxlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVmFsdWVcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIGlmIChfdmFsdWUgIT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIF92YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHN0cmluZyBfdmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgcHVibGljIEVUZW1wbGF0ZSBUZW1wbGF0ZVR5cGUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIHN0cmluZyBSZWdleFN0cmluZyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgTWF0Y2hDb2xsZWN0aW9uIE1hdGNoZXMgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIFRva2VuIE9wdGltaXplKENvbnRleHQgY29udGV4dCwgYm9vbCByZXBsYWNlID0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKFRlbXBsYXRlVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLkVUZW1wbGF0ZS5JdGVyYXRpb25JbmRleDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXBsYWNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyB2YXJfbmFtZSA9IE1hdGNoZXNbMF0uR3JvdXBzWzJdLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmcuSXNOdWxsT3JXaGl0ZVNwYWNlKHZhcl9uYW1lKSB8fCBjb250ZXh0Lklnbm9yZU9wdGltaXplKHZhcl9uYW1lKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbHVlID0gUmVnZXguUmVwbGFjZShWYWx1ZSwgUmVnZXhTdHJpbmcsXHJcbnN0cmluZy5Gb3JtYXQoXCIkMXswfSQzXCIsY29udGV4dC5uYW1lUHJvdmlkZXIuR2V0UmVwbGFjZSh2YXJfbmFtZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuRVRlbXBsYXRlLklnbm9yZU9wdGltaXphdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKFRlbXBsYXRlVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLkVUZW1wbGF0ZS5Db21tZW50OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjb250ZXh0LlNldHRpbmdzICYgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLlNldHRpbmdzLlJlbW92ZUNvbW1lbnRzKSAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChQcmV2ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2Lk5leHQgPSBOZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIVByZXYuRW5kU3RhdGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmV2LkVuZFN0YXRlbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKF9zZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUm9vdFRva2VuID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZXh0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LlByZXYgPSBQcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IFByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChQcmV2IT1udWxsICYmIE5leHQhPW51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBQcmV2Lk5leHQgPSBOZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBOZXh0LlByZXYgPSBQcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kTGluZShWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGJvb2wgSXNWYWx1ZVN0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlLkxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVmFsdWVbMF0gPT0gJ1wiJyAmJiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkxhc3RPckRlZmF1bHQ8Y2hhcj4oVmFsdWUpID09ICdcIic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIFRlbXBsYXRlKClcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgVGVtcGxhdGUoRVRlbXBsYXRlIHRlbXBsYXRlLCBNYXRjaENvbGxlY3Rpb24gbWF0Y2hlcywgc3RyaW5nIHJlZ2V4LCBDb250ZXh0IGNvbnRleHQpIDogYmFzZSgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVGVtcGxhdGVUeXBlID0gdGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgTWF0Y2hlcyA9IG1hdGNoZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVnZXhTdHJpbmcgPSByZWdleDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0ZW1wbGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLkVUZW1wbGF0ZS5JZ25vcmVPcHRpbWl6YXRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdmFsdWUgPSBNYXRjaGVzWzBdLkdyb3Vwc1syXS5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJc1ZhbHVlU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbHVlID0gX3ZhbHVlLlN1YnN0cmluZygxLCBfdmFsdWUuTGVuZ3RoIC0gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0Lklnbm9yZU9wdGltaXplKF92YWx1ZSkpIGNvbnRleHQuY3VzdG9tSWdub3JlT3B0aW1pemUuQWRkKF92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbHVlID0gJ1wiJyArIF92YWx1ZSArICdcIic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0Lklnbm9yZU9wdGltaXplKE1hdGNoZXNbMF0uR3JvdXBzWzJdLlZhbHVlKSkgY29udGV4dC5jdXN0b21JZ25vcmVPcHRpbWl6ZS5BZGQoTWF0Y2hlc1swXS5Hcm91cHNbMl0uVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0KfQo=

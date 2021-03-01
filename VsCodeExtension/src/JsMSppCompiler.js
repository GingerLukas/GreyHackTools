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
                _templates: null,
                IncludeToCode: null
            },
            events: {
                OnInclude: null
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
                    this.IncludeToCode = new (System.Collections.Generic.Dictionary$2(System.String,System.String)).ctor();
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
                GetIncludes: function (code) {
                    return GreyHackTools.GreyHackCompiler.Tokenize$1(code).GetIncludes();
                },
                Compile: function (code, optimize, settings) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                        $returnValue, 
                        $async_e, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    $step = System.Array.min([0,1], $step);
                                    switch ($step) {
                                        case 0: {
                                            if (optimize === void 0) { optimize = false; }
                                            if (settings === void 0) { settings = 0; }
                                            $task1 = GreyHackTools.GreyHackCompiler.Tokenize$1(code, settings).Compile(optimize);
                                            $step = 1;
                                            if ($task1.isCompleted()) {
                                                continue;
                                            }
                                            $task1.continue($asyncBody);
                                            return;
                                        }
                                        case 1: {
                                            $taskResult1 = $task1.getAwaitedResult();
                                            $tcs.setResult($taskResult1);
                                            return;
                                        }
                                        default: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                $tcs.setException($async_e);
                            }
                        }, arguments);

                    $asyncBody();
                    return $tcs.task;
                },
                TryCompile: function (code, compiledCode, optimize, settings) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                        $returnValue, 
                        e, 
                        $async_e, 
                        $async_e1, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    $step = System.Array.min([0,1,2,3,4], $step);
                                    switch ($step) {
                                        case 0: {
                                            if (optimize === void 0) { optimize = false; }
                                            if (settings === void 0) { settings = 0; }
                                            
                                            $step = 1;
                                            continue;
                                        }
                                        case 1: {
                                            $task1 = GreyHackTools.GreyHackCompiler.Compile(code, optimize, settings);
                                            $step = 2;
                                            if ($task1.isCompleted()) {
                                                continue;
                                            }
                                            $task1.continue($asyncBody);
                                            return;
                                        }
                                        case 2: {
                                            $taskResult1 = $task1.getAwaitedResult();
                                            compiledCode.Value = $taskResult1;
                                            $tcs.setResult(true);
                                            return;
                                        }
                                        case 3: {
                                            compiledCode.Value = e.Message;
                                            $tcs.setResult(false);
                                            return;
                                            $async_e = null;
                                            $step = 4;
                                            continue;
                                        }
                                        case 4: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                        default: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                if ( $step >= 1 && $step <= 2 ) {
                                    e = $async_e;
                                    $step = 3;
                                    $asyncBody();
                                    return;
                                }
                                $tcs.setException($async_e);
                            }
                        }, arguments);

                    $asyncBody();
                    return $tcs.task;
                },
                Tokenize$1: function (plainCode, settings) {
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
                Tokenize: function (plainCode, context, settings) {
                    if (settings === void 0) { settings = 0; }
                    context.PlainInput = new (System.Collections.Generic.Queue$1(System.Char)).$ctor1(plainCode);

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
            includes: null,
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
                this.includes = new (System.Collections.Generic.HashSet$1(System.String)).ctor();
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
                if (Bridge.is(token, GreyHackTools.GreyHackCompiler.Token.Include) && !this.includes.contains(token.Value)) {
                    this.includes.add(token.Value);
                }
                if (this.RootToken == null) {
                    this.RootToken = token;
                    this.LastToken = token;
                } else {
                    this.LastToken.Next = token;
                    token.Prev = this.LastToken;
                    this.LastToken = token;
                }
            },
            Clone: function () {
                var $t;
                return ($t = new GreyHackTools.GreyHackCompiler.Context(this.Settings), $t.nameProvider = this.nameProvider, $t.CodePrefix = this.CodePrefix, $t.includes = this.includes, $t.customIgnoreOptimize = this.customIgnoreOptimize, $t);
            },
            Compile: function (optimize, ignorePrefix) {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    counter, 
                    $t, 
                    include, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4], $step);
                                switch ($step) {
                                    case 0: {
                                        if (optimize === void 0) { optimize = false; }
                                        if (ignorePrefix === void 0) { ignorePrefix = false; }
                                        this.optimizeEnabled = optimize;
                                        this.StringBuilder.clear();

                                        counter = new (GreyHackTools.Ref$1(System.Int32))(0);
                                        $t = Bridge.getEnumerator(this.includes);
                                        try {
                                            while ($t.moveNext()) {
                                                include = $t.Current;
                                                if (!GreyHackTools.GreyHackCompiler.IncludeToCode.containsKey(include)) {
                                                    if (!Bridge.staticEquals(GreyHackTools.GreyHackCompiler.OnInclude, null)) {
                                                        counter.Value = (counter.Value + 1) | 0;
                                                        GreyHackTools.GreyHackCompiler.OnInclude(include, GreyHackTools.GreyHackCompiler.IncludeToCode, counter);
                                                    }


                                                }
                                            }
                                        } finally {
                                            if (Bridge.is($t, System.IDisposable)) {
                                                $t.System$IDisposable$Dispose();
                                            }
                                        }

                                        
                                        $step = 1;
                                        continue;
                                    }
                                    case 1: {
                                        if ( counter.Value !== 0 ) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                    }
                                    case 2: {
                                        $task1 = System.Threading.Tasks.Task.delay(200);
                                        $step = 3;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 3: {
                                        $task1.getAwaitedResult();
                                        
                                        $step = 1;
                                        continue;
                                    }
                                    case 4: {
                                        this.CompileTokens(optimize);

                                        $tcs.setResult(this.GetResultCode(ignorePrefix));
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            GetIncludes: function () {
                var $t;
                return ($t = System.String, System.Linq.Enumerable.from(this.includes, $t).ToArray($t));
            },
            GetResultCode: function (ignorePrefix) {
                this.optimizeEnabled = false;
                if (ignorePrefix) {
                    return this.StringBuilder.toString();
                }
                this.CodePrefix.append(this.StringBuilder.toString());
                return this.CodePrefix.toString();
            },
            CompileTokens: function (optimize) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    node, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        for (;;) {
                            $step = System.Array.min([0,1,2,3,4], $step);
                            switch ($step) {
                                case 0: {
                                    node = this.RootToken;
                                    while (node != null) {
                                        node = node.Optimize(this, optimize).Next;
                                    }

                                    node = this.RootToken;
                                    
                                    $step = 1;
                                    continue;
                                }
                                case 1: {
                                    if ( node != null ) {
                                        $step = 2;
                                        continue;
                                    } 
                                    $step = 4;
                                    continue;
                                }
                                case 2: {
                                    $task1 = node.Compile(this);
                                    $step = 3;
                                    if ($task1.isCompleted()) {
                                        continue;
                                    }
                                    $task1.continue($asyncBody);
                                    return;
                                }
                                case 3: {
                                    $taskResult1 = $task1.getAwaitedResult();
                                    node = ($taskResult1).Next;

                                    $step = 1;
                                    continue;
                                }
                                case 4: {
                                    return;
                                }
                                default: {
                                    return;
                                }
                            }
                        }
                    }, arguments);

                $asyncBody();
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
                var $step = 0,
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    b, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0], $step);
                                switch ($step) {
                                    case 0: {
                                        if (force === void 0) { force = false; }
                                        if (System.String.isNullOrWhiteSpace(this.Value)) {
                                            $tcs.setResult(this);
                                            return;
                                        }
                                        if (context.StringBuilder.getLength() !== 0 && ((System.Text.RegularExpressions.Regex.isMatch(String.fromCharCode(context.StringBuilder.getChar(((context.StringBuilder.getLength() - 1) | 0))), "\\w") && this.Value.length > 0 && System.Text.RegularExpressions.Regex.isMatch(String.fromCharCode(this.Value.charCodeAt(0)), "\\w")) || (this.Prev != null && Bridge.is(this.Prev, GreyHackTools.GreyHackCompiler.Token.Keyword) && ((b = Bridge.as(this, GreyHackTools.GreyHackCompiler.Token.Bracket))) != null && (System.Linq.Enumerable.from(b.Value, System.Char).firstOrDefault(null, 0) === 40 || System.Linq.Enumerable.from(b.Value, System.Char).firstOrDefault(null, 0) === 91)))) {
                                            context.StringBuilder.append(String.fromCharCode(32));
                                        }

                                        context.StringBuilder.append(this.Value);
                                        if (this.EndStatement && this.Next != null && !force) {
                                            context.StringBuilder.append(GreyHackTools.GreyHackCompiler._separator);
                                        }
                                        $tcs.setResult(this);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
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

    Bridge.define("GreyHackTools.Ref$1", function (T) { return {
        fields: {
            Value: Bridge.getDefaultValue(T)
        },
        ctors: {
            ctor: function (value) {
                this.$initialize();
                this.Value = value;
            }
        }
    }; });

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
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $task2, 
                    $taskResult2, 
                    $task3, 
                    $taskResult3, 
                    $task4, 
                    $taskResult4, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    br, 
                    o, 
                    oo, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5,6,7,9,10,11,12,13,15,16], $step);
                                switch ($step) {
                                    case 0: {
                                        if (force === void 0) { force = false; }
                                        if (((br = Bridge.as(this, GreyHackTools.GreyHackCompiler.Token.Bracket))) != null && !br.Custom && (br.Value.length === 0 || br.Value.charCodeAt(0) !== 123)) {
                                            $step = 1;
                                            continue;
                                        } 
                                        $step = 3;
                                        continue;
                                    }
                                    case 1: {
                                        $task1 = GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context);
                                        $step = 2;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        $tcs.setResult($taskResult1);
                                        return;
                                    }
                                    case 3: {
                                        if ((this.Next != null && !GreyHackTools.GreyHackCompiler._tokenOperators.contains(System.Linq.Enumerable.from(this.Value, System.Char).first()) && (Bridge.referenceEquals(this.Next.Value, ".") || Bridge.referenceEquals(this.Next.Value, "(") || Bridge.referenceEquals(this.Next.Value, "[")))) {
                                            context.stringBuilders.Push(new System.Text.StringBuilder(this.Value));
                                            if (Bridge.referenceEquals(this.Next.Value, ".")) {
                                                this.Next = this.Next.Next;
                                                context.StringBuilder.append(String.fromCharCode(46));
                                            }

                                            if (this.Next != null) {
                                                this.Next.Compile(context, true);
                                                this.EndStatement = this.Next.EndStatement;
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
                                        if (this.Next != null && ((o = Bridge.as(this.Next, GreyHackTools.GreyHackCompiler.Token.Operator))) != null && o.NeedsLeft) {
                                            $step = 4;
                                            continue;
                                        } 
                                        $step = 9;
                                        continue;
                                    }
                                    case 4: {
                                        if (force) {
                                            $step = 5;
                                            continue;
                                        } else  {
                                            $step = 7;
                                            continue;
                                        }
                                    }
                                    case 5: {
                                        $task2 = GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context, true);
                                        $step = 6;
                                        if ($task2.isCompleted()) {
                                            continue;
                                        }
                                        $task2.continue($asyncBody);
                                        return;
                                    }
                                    case 6: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        $tcs.setResult($taskResult2);
                                        return;
                                    }
                                    case 7: {
                                        $tcs.setResult(this);
                                        return;
                                    }

                                    case 9: {
                                        if (this.Prev != null && ((oo = Bridge.as(this.Prev, GreyHackTools.GreyHackCompiler.Token.Operator))) != null && oo.NeedsRight) {
                                            $step = 10;
                                            continue;
                                        } 
                                        $step = 15;
                                        continue;
                                    }
                                    case 10: {
                                        if (force) {
                                            $step = 11;
                                            continue;
                                        } else  {
                                            $step = 13;
                                            continue;
                                        }
                                    }
                                    case 11: {
                                        $task3 = GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context, true);
                                        $step = 12;
                                        if ($task3.isCompleted()) {
                                            continue;
                                        }
                                        $task3.continue($asyncBody);
                                        return;
                                    }
                                    case 12: {
                                        $taskResult3 = $task3.getAwaitedResult();
                                        $tcs.setResult($taskResult3);
                                        return;
                                    }
                                    case 13: {
                                        $tcs.setResult(this);
                                        return;
                                    }

                                    case 15: {
                                        $task4 = GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context, force);
                                        $step = 16;
                                        if ($task4.isCompleted()) {
                                            continue;
                                        }
                                        $task4.continue($asyncBody);
                                        return;
                                    }
                                    case 16: {
                                        $taskResult4 = $task4.getAwaitedResult();
                                        $tcs.setResult($taskResult4);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
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
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $task2, 
                    $taskResult2, 
                    $task3, 
                    $taskResult3, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5], $step);
                                switch ($step) {
                                    case 0: {
                                        if (force === void 0) { force = false; }
                                        if (GreyHackTools.GreyHackCompiler.IncludeToCode.containsKey(this.Value)) {
                                            $step = 1;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                    }
                                    case 1: {
                                        $task1 = GreyHackTools.GreyHackCompiler.Tokenize(GreyHackTools.GreyHackCompiler.IncludeToCode.getItem(this.Value), context.Clone()).Compile(context.optimizeEnabled, true);
                                        $step = 2;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        this.Value = $taskResult1;
                                        $task2 = GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context, force);
                                        $step = 3;
                                        if ($task2.isCompleted()) {
                                            continue;
                                        }
                                        $task2.continue($asyncBody);
                                        return;
                                    }
                                    case 3: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        $tcs.setResult($taskResult2);
                                        return;
                                    }
                                    case 4: {
                                        this.Value = System.String.format("//include of \"{0}\" failed", [this.Value]);

                                        $task3 = GreyHackTools.GreyHackCompiler.Token.prototype.Compile.call(this, context, force);
                                        $step = 5;
                                        if ($task3.isCompleted()) {
                                            continue;
                                        }
                                        $task3.continue($asyncBody);
                                        return;
                                    }
                                    case 5: {
                                        $taskResult3 = $task3.getAwaitedResult();
                                        $tcs.setResult($taskResult3);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
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
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    depth, 
                    last, 
                    i, 
                    innerCodeContext, 
                    compiled, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5,6,7,8,9,10,13,14,15,16], $step);
                                switch ($step) {
                                    case 0: {
                                        if (force === void 0) { force = false; }
                                        if (this.Custom) {
                                            $step = 1;
                                            continue;
                                        } else  {
                                            $step = 15;
                                            continue;
                                        }
                                    }
                                    case 1: {
                                        context.StringBuilder.append("(\"");
                                        depth = 0;
                                        last = 0;
                                        i = 0;
                                        $step = 2;
                                        continue;
                                    }
                                    case 2: {
                                        if ( i < this.Value.length ) {
                                            $step = 3;
                                            continue;
                                        }
                                        $step = 14;
                                        continue;
                                    }
                                    case 3: {
                                        if (((i + 1) | 0) < this.Value.length && this.Value.charCodeAt(i) === 92 && (this.Value.charCodeAt(((i + 1) | 0)) === 123 || this.Value.charCodeAt(((i + 1) | 0)) === 125)) {
                                            i = (i + 1) | 0;
                                            context.StringBuilder.append(String.fromCharCode(this.Value.charCodeAt(i)));
                                            $step = 13;
                                            continue;
                                        }
                                        if (this.Value.charCodeAt(i) === 123) {
                                            $step = 4;
                                            continue;
                                        } else  {
                                            $step = 5;
                                            continue;
                                        }
                                    }
                                    case 4: {
                                        if (depth === 0) {
                                            last = (i + 1) | 0;
                                        }
                                        depth = (depth + 1) | 0;
                                        $step = 12;
                                        continue;
                                    }
                                    case 5: {
                                        if (this.Value.charCodeAt(i) === 125 && (i === 0 || this.Value.charCodeAt(((i - 1) | 0)) !== 92)) {
                                            $step = 6;
                                            continue;
                                        } else  {
                                            $step = 10;
                                            continue;
                                        }
                                    }
                                    case 6: {
                                        depth = (depth - 1) | 0;
                                        if (depth < 0) {
                                            throw new System.Exception(System.String.format("string format ({0}) is not valid", [this.Value]));
                                        }
                                        if (depth === 0) {
                                            $step = 7;
                                            continue;
                                        } 
                                        $step = 9;
                                        continue;
                                    }
                                    case 7: {
                                        context.StringBuilder.append("\"+(");
                                        innerCodeContext = GreyHackTools.GreyHackCompiler.Tokenize(System.String.replaceAll(this.Value.substr(last, ((i - last) | 0)), "\"\"", "\""), context.Clone());
                                        $task1 = innerCodeContext.Compile(context.optimizeEnabled, true);
                                        $step = 8;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 8: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        compiled = $taskResult1;
                                        context.StringBuilder.append(compiled);
                                        context.StringBuilder.append(")+\"");
                                        $step = 9;
                                        continue;
                                    }
                                    case 9: {
                                        $step = 11;
                                        continue;
                                    }
                                    case 10: {
                                        if (depth === 0) {
                                            context.StringBuilder.append(String.fromCharCode(this.Value.charCodeAt(i)));
                                        }
                                        $step = 11;
                                        continue;
                                    }


                                    case 13: {
                                        i = (i + 1) | 0;
                                        $step = 2;
                                        continue;
                                    }
                                    case 14: {
                                        context.StringBuilder.append("\")");
                                        $step = 16;
                                        continue;
                                    }
                                    case 15: {
                                        context.StringBuilder.append(String.fromCharCode(34));
                                        context.StringBuilder.append(this.Value);
                                        context.StringBuilder.append(String.fromCharCode(34));
                                        $step = 16;
                                        continue;
                                    }
                                    case 16: {
                                        if (this.EndStatement) {
                                            context.StringBuilder.append(GreyHackTools.GreyHackCompiler._separator);
                                        }
                                        $tcs.setResult(this);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
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
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $task2, 
                    $taskResult2, 
                    $task3, 
                    $taskResult3, 
                    $task4, 
                    $taskResult4, 
                    $task5, 
                    $taskResult5, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    depth, 
                    left, 
                    right, 
                    tmpRight, 
                    tmpLeft, 
                    s, 
                    b, 
                    $t, 
                    $t1, 
                    name, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], $step);
                                switch ($step) {
                                    case 0: {
                                        if (force === void 0) { force = false; }
                                        if (this.Custom) {
                                            $step = 1;
                                            continue;
                                        } else  {
                                            $step = 13;
                                            continue;
                                        }
                                    }
                                    case 1: {
                                        if (Bridge.referenceEquals(this.Value, "=>")) {
                                            this.SupportsMultiLineBracket = true;
                                        }
                                        depth = context.bracketDepth;
                                        left = "";
                                        right = "";
                                        tmpRight = null;
                                        tmpLeft = null;
                                        s = GreyHackTools.GreyHackCompiler._operators.getItem(this.Value);
                                        if (this.NeedsLeft && this.Prev != null) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                    }
                                    case 2: {
                                        if (((b = Bridge.as(this.Prev, GreyHackTools.GreyHackCompiler.Token.Bracket))) != null && b.IsOpening) {
                                            throw new System.Exception(System.String.format("invalid syntax for template {0}", [this.Value]));
                                        }
                                        context.stringBuilders.Push(new System.Text.StringBuilder());
                                        $task1 = this.Prev.Compile(context, true);
                                        $step = 3;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 3: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        tmpLeft = $taskResult1;
                                        left = context.StringBuilder.toString();
                                        s = System.String.replaceAll(s, "$a", left);
                                        context.stringBuilders.Pop();

                                        if ((($t = this.Prev) != null ? $t.Prev : null) != null) {
                                            this.Prev = this.Prev.Prev;
                                            this.Prev.Next = this;
                                        } else {
                                            context.RootToken = this;
                                        }
                                        $step = 4;
                                        continue;
                                    }
                                    case 4: {
                                        if (this.NeedsRight && this.Next != null) {
                                            $step = 5;
                                            continue;
                                        } 
                                        $step = 7;
                                        continue;
                                    }
                                    case 5: {
                                        context.stringBuilders.Push(new System.Text.StringBuilder());
                                        $task2 = this.Next.Compile(context, true);
                                        $step = 6;
                                        if ($task2.isCompleted()) {
                                            continue;
                                        }
                                        $task2.continue($asyncBody);
                                        return;
                                    }
                                    case 6: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        tmpRight = $taskResult2;
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
                                        $step = 7;
                                        continue;
                                    }
                                    case 7: {
                                        if (Bridge.referenceEquals(this.Value, "=>") && tmpLeft.Prev != null && !Bridge.referenceEquals(tmpLeft.Prev.Value, "=")) {
                                            $step = 8;
                                            continue;
                                        } else  {
                                            $step = 10;
                                            continue;
                                        }
                                    }
                                    case 8: {
                                        name = context.nameProvider.GetFree(context.optimizeEnabled);
                                        this.Value = "@" + (name || "");
                                        context.CodePrefix.append(name);
                                        context.CodePrefix.append("=");
                                        context.CodePrefix.appendLine(s);
                                        this.EndStatement = tmpRight.EndStatement;
                                        $task3 = GreyHackTools.GreyHackCompiler.Token.Variable.prototype.Compile.call(this, context, force);
                                        $step = 9;
                                        if ($task3.isCompleted()) {
                                            continue;
                                        }
                                        $task3.continue($asyncBody);
                                        return;
                                    }
                                    case 9: {
                                        $taskResult3 = $task3.getAwaitedResult();
                                        $tcs.setResult($taskResult3);
                                        return;
                                    }
                                    case 10: {
                                        this.Value = s;

                                        $task4 = GreyHackTools.GreyHackCompiler.Token.Variable.prototype.Compile.call(this, context, force);
                                        $step = 11;
                                        if ($task4.isCompleted()) {
                                            continue;
                                        }
                                        $task4.continue($asyncBody);
                                        return;
                                    }
                                    case 11: {
                                        $taskResult4 = $task4.getAwaitedResult();
                                        $tcs.setResult($taskResult4);
                                        return;
                                    }
                                    case 12: {
                                        $step = 15;
                                        continue;
                                    }
                                    case 13: {
                                        $task5 = GreyHackTools.GreyHackCompiler.Token.Variable.prototype.Compile.call(this, context, force);
                                        $step = 14;
                                        if ($task5.isCompleted()) {
                                            continue;
                                        }
                                        $task5.continue($asyncBody);
                                        return;
                                    }
                                    case 14: {
                                        $taskResult5 = $task5.getAwaitedResult();
                                        $tcs.setResult($taskResult5);
                                        return;
                                    }
                                    case 15: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
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
            _ignoreNext: false,
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
                    if (this._ignoreNext && this._value != null) {
                        this._ignoreNext = false;
                        return;
                    }

                    this._value = value;
                }
            }
        },
        ctors: {
            init: function () {
                this._ignoreNext = false;
            },
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
                        this._ignoreNext = true;
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
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
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
                                                    $tcs.setResult(this);
                                                    return;
                                                }
                                                break;
                                        }


                                        $task1 = GreyHackTools.GreyHackCompiler.Token.Variable.prototype.Compile.call(this, context, force);
                                        $step = 1;
                                        if ($task1.isCompleted()) {
                                            continue;
                                        }
                                        $task1.continue($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        $tcs.setResult($taskResult1);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJKc01TcHBDb21waWxlci5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiRGVidWdnZXIvR3JleUhhY2tFbXVsYXRpb24vTUQ1LmNzIiwiQ29tcGlsZXIvR3JleUhhY2tDb21waWxlci5jcyIsIkNvbXBpbGVyL0NvbnRleHQuY3MiLCJDb21waWxlci9Ub2tlbnMvVG9rZW4uY3MiLCJDb21waWxlci9WYXJpYWJsZU5hbWVQcm92aWRlci5jcyIsIkNvbXBpbGVyL1Rva2Vucy9WYXJpYWJsZS5jcyIsIkNvbXBpbGVyL1Rva2Vucy9JbmNsdWRlLmNzIiwiQ29tcGlsZXIvVG9rZW5zL0tleXdvcmQuY3MiLCJDb21waWxlci9Ub2tlbnMvU2VwYXJhdG9yLmNzIiwiQ29tcGlsZXIvVG9rZW5zL1N0cmluZy5jcyIsIkNvbXBpbGVyL1Rva2Vucy9CcmFja2V0LmNzIiwiQ29tcGlsZXIvVG9rZW5zL09wZXJhdG9yLmNzIiwiQ29tcGlsZXIvVG9rZW5zL1RlbXBsYXRlLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OzZCQVV5QkE7NkJBVUNBOzs7O3NDQWtCWUEsR0FBUUE7b0JBRWxDQSxPQUFPQSxHQUFDQSxPQUFLQSxhQUFLQSxDQUFDQSxNQUFLQSxDQUFDQSxPQUFLQTs7cUNBSUhBO29CQUUzQkE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7O29CQUVBQSxnQkFBZ0JBLENBQUNBLE9BQUtBLENBQUNBLENBQUNBO29CQUN4QkEscUJBQXFCQSxrQkFBU0EsK0JBQW1CQTtvQkFDakRBLGtCQUFXQSxVQUFPQSxtQkFBZ0JBO29CQUNsQ0Esa0NBQWVBLGNBQWZBOztvQkFFQUEsYUFBZ0JBLCtCQUFzQkE7b0JBQ3RDQSxrQkFBV0EsV0FBV0EsZ0JBQWdCQTs7b0JBRXRDQSxLQUFLQSxXQUFXQSxJQUFJQSxtREFBOEJBO3dCQUc5Q0EsUUFBV0E7d0JBQ1hBLEtBQUtBLFdBQVdBLFFBQVVBOzRCQUN0QkEs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QkE7NEJBQXVCQTs0QkFBd0JBOzRCQUF3QkE7NEJBQW9CQTs0QkFBa0JBOzRCQUF3QkE7NEJBQXVCQTs0QkFBd0JBOzRCQUEwQkE7NEJBQW9CQTs0QkFBc0JBOzRCQUFnQkE7NEJBQWlCQTs0QkFBMEJBOzRCQUFxQkE7NEJBQXVCQTs0QkFBc0JBOzRCQUFxQkE7NEJBQXNCQTs0QkFBcUJBOzRCQUFtQkE7NEJBQWlCQTs0QkFBa0JBOzRCQUFvQkE7NEJBQTBCQTs0QkFBeUJBOzRCQUF1QkE7NEJBQW1CQTs0QkFBbUJBOzRCQUFxQkE7NEJBQXFCQTs0QkFBcUJBOzRCQUFxQkE7NEJBQTZCQTs0QkFBdUJBOzRCQUFnQkE7NEJBQXVCQTs0QkFBa0JBOzRCQUFlQTs0QkFBb0JBOzRCQUFnQkE7NEJBQW9CQTs0QkFBa0JBOzRCQUFpQkE7NEJBQWVBOzRCQUFnQkE7NEJBQWdCQTs0QkFBbUJBOzRCQUEyQkE7NEJBQTJCQTs0QkFBb0JBOzRCQUFvQkE7NEJBQWlCQTs0QkFBa0JBOzRCQUF1QkE7NEJBQWdCQTs0QkFBdUJBOzRCQUFjQTs0QkFBZ0JBOzRCQUFxQkE7NEJBQWVBOzRCQUFxQkE7NEJBQXVCQTs0QkFBaUJBOzRCQUF3QkE7NEJBQXFCQTs0QkFBZ0JBOzRCQUFnQkE7NEJBQWVBOzRCQUFpQkE7NEJBQWtCQTs0QkFBa0JBOzRCQUFtQkE7NEJBQW1CQTs0QkFBZUE7NEJBQWlCQTs0QkFBZ0JBOzRCQUF3QkE7NEJBQWVBOzRCQUF1QkE7NEJBQXFCQTs0QkFBc0JBOzRCQUFtQkE7NEJBQWdCQTs0QkFBZUE7NEJBQWdCQTs0QkFBaUJBOzRCQUEwQkE7NEJBQWdCQTs0QkFBaUJBOzRCQUFnQkE7NEJBQTBCQTs0QkFBZUE7NEJBQWVBOzRCQUFlQTs0QkFBa0JBOzRCQUFpQkE7NEJBQWdCQTs0QkFBa0JBOzRCQUFpQkE7NEJBQXNCQTs0QkFBNEJBOzRCQUFzQkE7NEJBQTZCQTs0QkFBZUE7NEJBQWtCQTs0QkFBbUJBOzRCQUFpQkE7NEJBQXlCQTs0QkFBa0JBOzRCQUF3QkE7NEJBQWdCQTs0QkFBZ0JBOzRCQUFn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QSxJQUFJQSxDQUFDQSxtQkFBbUJBO29EQUVwQkEsSUFBSUEsYUFBUUE7d0RBRVJBLGlCQUFZQTt3REFDWkEsSUFBSUEsQ0FBQ0E7NERBRURBOzREQUNBQSw2QkFBNkJBOzs7d0RBS2pDQSxvQkFBb0JBOzs7b0RBR3hCQSxJQUFJQSxhQUFRQTt3REFFUkEsaUJBQVlBOzt3REFJWkEsb0JBQW9CQTs7b0RBRXhCQSxlQUFPQTs7O2dEQUdYQTs7Ozt3Q0FVUkEsU0FBYUEsMkVBQWFBLFNBQVNBOzs7Ozs7Ozs7O3VEQUE1QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBS1BBLElBQUlBO29CQUFrQkE7O2dCQUN0QkEsT0FBT0EsbUNBQW1CQSw0QkFBMkNBLFlBQU5BIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29scy5EZWJ1Z2dlclxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTUQ1XHJcbiAgICB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBSb3VuZCBzaGlmdCB2YWx1ZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBzdGF0aWMgaW50W10gcyA9IG5ldyBpbnRbNjRdIHtcclxuICAgICAgICAgICAgNywgMTIsIDE3LCAyMiwgIDcsIDEyLCAxNywgMjIsICA3LCAxMiwgMTcsIDIyLCAgNywgMTIsIDE3LCAyMixcclxuICAgICAgICAgICAgNSwgIDksIDE0LCAyMCwgIDUsICA5LCAxNCwgMjAsICA1LCAgOSwgMTQsIDIwLCAgNSwgIDksIDE0LCAyMCxcclxuICAgICAgICAgICAgNCwgMTEsIDE2LCAyMywgIDQsIDExLCAxNiwgMjMsICA0LCAxMSwgMTYsIDIzLCAgNCwgMTEsIDE2LCAyMyxcclxuICAgICAgICAgICAgNiwgMTAsIDE1LCAyMSwgIDYsIDEwLCAxNSwgMjEsICA2LCAxMCwgMTUsIDIxLCAgNiwgMTAsIDE1LCAyMVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogQ29uc3RhbnQgSyBWYWx1ZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBzdGF0aWMgdWludFtdIEsgPSBuZXcgdWludFs2NF0ge1xyXG4gICAgICAgICAgICAweGQ3NmFhNDc4LCAzOTA1NDAyNzEwVSwgNjA2MTA1ODE5LCAzMjUwNDQxOTY2VSxcclxuICAgICAgICAgICAgMHhmNTdjMGZhZiwgMHg0Nzg3YzYyYSwgMHhhODMwNDYxMywgMHhmZDQ2OTUwMSxcclxuICAgICAgICAgICAgMHg2OTgwOThkOCwgMjMzNjU1Mjg3OVUsIDQyOTQ5MjUyMzNVLCAyMzA0NTYzMTM0VSxcclxuMTgwNDYwMzY4MiwgMHhmZDk4NzE5MywgMHhhNjc5NDM4ZSwgMTIzNjUzNTMyOSxcclxuICAgICAgICAgICAgMHhmNjFlMjU2MiwgMzIyNTQ2NTY2NFUsIDB4MjY1ZTVhNTEsIDM5MjEwNjk5OTRVLFxyXG4gICAgICAgICAgICAweGQ2MmYxMDVkLCAweDAyNDQxNDUzLCAweGQ4YTFlNjgxLCAzODg5NDI5NDQ4VSxcclxuICAgICAgICAgICAgMHgyMWUxY2RlNiwgMHhjMzM3MDdkNiwgMHhmNGQ1MGQ4NywgMHg0NTVhMTRlZCxcclxuICAgICAgICAgICAgMHhhOWUzZTkwNSwgMHhmY2VmYTNmOCwgMHg2NzZmMDJkOSwgMHg4ZDJhNGM4YSxcclxuICAgICAgICAgICAgMHhmZmZhMzk0MiwgMHg4NzcxZjY4MSwgMHg2ZDlkNjEyMiwgMHhmZGU1MzgwYyxcclxuMjc2Mzk3NTIzNlUsIDEyNzI4OTMzNTMsIDQxMzk0Njk2NjRVLCAzMjAwMjM2NjU2VSxcclxuNjgxMjc5MTc0LCAweGVhYTEyN2ZhLCAweGQ0ZWYzMDg1LCAweDA0ODgxZDA1LFxyXG4gICAgICAgICAgICAweGQ5ZDRkMDM5LCAzODczMTUxNDYxVSwgMHgxZmEyN2NmOCwgMHhjNGFjNTY2NSxcclxuICAgICAgICAgICAgMHhmNDI5MjI0NCwgMHg0MzJhZmY5NywgMjg3ODYxMjM5MVUsIDB4ZmM5M2EwMzksXHJcbjE3MDA0ODU1NzEsIDB4OGYwY2NjOTIsIDB4ZmZlZmY0N2QsIDB4ODU4NDVkZDEsXHJcbiAgICAgICAgICAgIDB4NmZhODdlNGYsIDB4ZmUyY2U2ZTAsIDB4YTMwMTQzMTQsIDB4NGUwODExYTEsXHJcbiAgICAgICAgICAgIDB4Zjc1MzdlODIsIDMxNzQ3NTY5MTdVLCA3MTg3ODcyNTksIDM5NTE0ODE3NDVVICAgICAgICB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHVpbnQgbGVmdFJvdGF0ZSh1aW50IHgsIGludCBjKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICh4IDw8IGMpIHwgKHggPj4gKDMyIC0gYykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYXNzdW1lcyB3aG9sZSBieXRlcyBhcyBpbnB1dFxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIENhbGN1bGF0ZShieXRlW10gaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1aW50IGEwID0gMHg2NzQ1MjMwMTsgICAvLyBBXHJcbiAgICAgICAgICAgIHVpbnQgYjAgPSA0MDIzMjMzNDE3VTsgICAvLyBCXHJcbiAgICAgICAgICAgIHVpbnQgYzAgPSAyNTYyMzgzMTAyVTsgICAvLyBDXHJcbiAgICAgICAgICAgIHVpbnQgZDAgPSAweDEwMzI1NDc2OyAgIC8vIERcclxuXHJcbiAgICAgICAgICAgIHZhciBhZGRMZW5ndGggPSAoNTYgLSAoKGlucHV0Lkxlbmd0aCArIDEpICUgNjQpKSAlIDY0OyAvLyBjYWxjdWxhdGUgdGhlIG5ldyBsZW5ndGggd2l0aCBwYWRkaW5nXHJcbiAgICAgICAgICAgIHZhciBwcm9jZXNzZWRJbnB1dCA9IG5ldyBieXRlW2lucHV0Lkxlbmd0aCArIDEgKyBhZGRMZW5ndGggKyA4XTtcclxuICAgICAgICAgICAgQXJyYXkuQ29weShpbnB1dCwgcHJvY2Vzc2VkSW5wdXQsIGlucHV0Lkxlbmd0aCk7XHJcbiAgICAgICAgICAgIHByb2Nlc3NlZElucHV0W2lucHV0Lkxlbmd0aF0gPSAweDgwOyAvLyBhZGQgMVxyXG5cclxuICAgICAgICAgICAgYnl0ZVtdIGxlbmd0aCA9IEJpdENvbnZlcnRlci5HZXRCeXRlcyhpbnB1dC5MZW5ndGggKiA4KTsgLy8gYml0IGNvbnZlcnRlciByZXR1cm5zIGxpdHRsZS1lbmRpYW5cclxuICAgICAgICAgICAgQXJyYXkuQ29weShsZW5ndGgsIDAsIHByb2Nlc3NlZElucHV0LCBwcm9jZXNzZWRJbnB1dC5MZW5ndGggLSA4LCA0KTsgLy8gYWRkIGxlbmd0aCBpbiBiaXRzXHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHByb2Nlc3NlZElucHV0Lkxlbmd0aCAvIDY0OyArK2kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvcHkgdGhlIGlucHV0IHRvIE1cclxuICAgICAgICAgICAgICAgIHVpbnRbXSBNID0gbmV3IHVpbnRbMTZdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCAxNjsgKytqKVxyXG4gICAgICAgICAgICAgICAgICAgIE1bal0gPSBCaXRDb252ZXJ0ZXIuVG9VSW50MzIocHJvY2Vzc2VkSW5wdXQsIChpICogNjQpICsgKGogKiA0KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSByb3VuZCB2YXJpYWJsZXNcclxuICAgICAgICAgICAgICAgIHVpbnQgQSA9IGEwLCBCID0gYjAsIEMgPSBjMCwgRCA9IGQwLCBGID0gMCwgZyA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcHJpbWFyeSBsb29wXHJcbiAgICAgICAgICAgICAgICBmb3IgKHVpbnQgayA9IDA7IGsgPCA2NDsgKytrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrIDw9IDE1KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRiA9IChCICYgQykgfCAofkIgJiBEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZyA9IGs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPj0gMTYgJiYgayA8PSAzMSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEYgPSAoRCAmIEIpIHwgKH5EICYgQyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcgPSAoKDUgKiBrKSArIDEpICUgMTY7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPj0gMzIgJiYgayA8PSA0NylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEYgPSBCIF4gQyBeIEQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcgPSAoKDMgKiBrKSArIDUpICUgMTY7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPj0gNDgpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGID0gQyBeIChCIHwgfkQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnID0gKDcgKiBrKSAlIDE2O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGR0ZW1wID0gRDtcclxuICAgICAgICAgICAgICAgICAgICBEID0gQztcclxuICAgICAgICAgICAgICAgICAgICBDID0gQjtcclxuICAgICAgICAgICAgICAgICAgICBCID0gQiArIGxlZnRSb3RhdGUoKEEgKyBGICsgS1trXSArIE1bZ10pLCBzW2tdKTtcclxuICAgICAgICAgICAgICAgICAgICBBID0gZHRlbXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYTAgKz0gQTtcclxuICAgICAgICAgICAgICAgIGIwICs9IEI7XHJcbiAgICAgICAgICAgICAgICBjMCArPSBDO1xyXG4gICAgICAgICAgICAgICAgZDAgKz0gRDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdldEJ5dGVTdHJpbmcoYTApICsgR2V0Qnl0ZVN0cmluZyhiMCkgKyBHZXRCeXRlU3RyaW5nKGMwKSArIEdldEJ5dGVTdHJpbmcoZDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nIEdldEJ5dGVTdHJpbmcodWludCB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5Kb2luKFwiXCIsIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0PGJ5dGUsc3RyaW5nPihCaXRDb252ZXJ0ZXIuR2V0Qnl0ZXMoeCksKEZ1bmM8Ynl0ZSxzdHJpbmc+KSh5ID0+IHkuVG9TdHJpbmcoXCJ4MlwiKSkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGV4dC5SZWd1bGFyRXhwcmVzc2lvbnM7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgI3JlZ2lvbiBTZXR0aW5nc1xyXG5cclxuICAgICAgICBbRmxhZ3NdXHJcbiAgICAgICAgcHVibGljIGVudW0gU2V0dGluZ3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5vbmUgPSAwLFxyXG4gICAgICAgICAgICBJZ25vcmVNYXBWYXJpYWJsZXMgPSAxLFxyXG4gICAgICAgICAgICBSZW1vdmVDb21tZW50cyA9IDIsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICNyZWdpb24gSW50ZXJuYWxcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgc3RyaW5nIF9zZXBhcmF0b3IgPSBFbnZpcm9ubWVudC5OZXdMaW5lO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgc3RyaW5nIF9zZXBhcmF0b3IgPSBcIjtcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlblNlcGFyYXRvcnMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzEpPT57X28xLkFkZCgnICcpO19vMS5BZGQoJy4nKTtfbzEuQWRkKCcsJyk7X28xLkFkZCgnOicpO19vMS5BZGQoJ1xcdCcpO3JldHVybiBfbzE7fSk7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxjaGFyPiBfdG9rZW5CcmFja2V0cyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vMik9PntfbzIuQWRkKCcoJyk7X28yLkFkZCgnKScpO19vMi5BZGQoJ1snKTtfbzIuQWRkKCddJyk7X28yLkFkZCgneycpO19vMi5BZGQoJ30nKTtyZXR1cm4gX28yO30pO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuT3BlcmF0b3JzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8Y2hhcj4oKSwoX28zKT0+e19vMy5BZGQoJysnKTtfbzMuQWRkKCctJyk7X28zLkFkZCgnKicpO19vMy5BZGQoJy8nKTtfbzMuQWRkKCclJyk7X28zLkFkZCgnPCcpO19vMy5BZGQoJz4nKTtfbzMuQWRkKCc9Jyk7X28zLkFkZCgnIScpO19vMy5BZGQoJ14nKTtfbzMuQWRkKCcmJyk7X28zLkFkZCgnfCcpO19vMy5BZGQoJ0AnKTtfbzMuQWRkKCd+Jyk7cmV0dXJuIF9vMzt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxzdHJpbmc+IF90b2tlbkVuZFN0YXRlbWVudHMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vNCk9PntfbzQuQWRkKFwiXFxuXCIpO19vNC5BZGQoXCJcXHJcXG5cIik7X280LkFkZChcIjtcIik7X280LkFkZChcIn1cIik7cmV0dXJuIF9vNDt9KTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSGFzaFNldDxzdHJpbmc+IF90b2tlbkluY2x1ZGUgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxzdHJpbmc+KCksKF9vNSk9PntfbzUuQWRkKFwiIyFcIik7cmV0dXJuIF9vNTt9KTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PGNoYXI+IF90b2tlbkVuZEluY2x1ZGUgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgSGFzaFNldDxjaGFyPigpLChfbzYpPT57X282LkFkZCgnIScpO3JldHVybiBfbzY7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEhhc2hTZXQ8Y2hhcj4gX3Rva2VuU3RyaW5ncyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBIYXNoU2V0PGNoYXI+KCksKF9vNyk9PntfbzcuQWRkKCdcIicpO19vNy5BZGQoJyQnKTtyZXR1cm4gX283O30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PHN0cmluZz4gX2tleXdvcmRzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8c3RyaW5nPigpLChfbzgpPT57X284LkFkZChcImlmXCIpO19vOC5BZGQoXCJ0aGVuXCIpO19vOC5BZGQoXCJlbHNlXCIpO19vOC5BZGQoXCJlbmRcIik7X284LkFkZChcIndoaWxlXCIpO19vOC5BZGQoXCJmb3JcIik7X284LkFkZChcImluXCIpO19vOC5BZGQoXCJhbmRcIik7X284LkFkZChcIm9yXCIpO19vOC5BZGQoXCJub3RcIik7X284LkFkZChcInRydWVcIik7X284LkFkZChcImZhbHNlXCIpO19vOC5BZGQoXCJyZXR1cm5cIik7X284LkFkZChcImNvbnRpbnVlXCIpO19vOC5BZGQoXCJicmVha1wiKTtfbzguQWRkKFwibmV3XCIpO19vOC5BZGQoXCJmdW5jdGlvblwiKTtyZXR1cm4gX284O30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBIYXNoU2V0PHN0cmluZz4gX2lnbm9yZU9wdGltaXplID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IEhhc2hTZXQ8c3RyaW5nPigpLChfbzkpPT57X285LkFkZChcIkZpbGVcIik7X285LkFkZChcImFic1wiKTtfbzkuQWRkKFwiYWNvc1wiKTtfbzkuQWRkKFwiYWN0aXZlX25ldF9jYXJkXCIpO19vOS5BZGQoXCJhY3RpdmVfdXNlclwiKTtfbzkuQWRkKFwiYWlyY3JhY2tcIik7X285LkFkZChcImFpcm1vblwiKTtfbzkuQWRkKFwiYXNpblwiKTtfbzkuQWRkKFwiYXRhblwiKTtfbzkuQWRkKFwiYml0d2lzZVwiKTtfbzkuQWRkKFwiYnNzaWRfbmFtZVwiKTtfbzkuQWRkKFwiYnVpbGRcIik7X285LkFkZChcImNlaWxcIik7X285LkFkZChcImNoYW5nZV9wYXNzd29yZFwiKTtfbzkuQWRkKFwiY2hhclwiKTtfbzkuQWRkKFwiY2htb2RcIik7X285LkFkZChcImNsb3NlX3Byb2dyYW1cIik7X285LkFkZChcImNvZGVcIik7X285LkFkZChcImNvbW1hbmRfaW5mb1wiKTtfbzkuQWRkKFwiY29ubmVjdF9ldGhlcm5ldFwiKTtfbzkuQWRkKFwiY29ubmVjdF9zZXJ2aWNlXCIpO19vOS5BZGQoXCJjb25uZWN0X3dpZmlcIik7X285LkFkZChcImNvcHlcIik7X285LkFkZChcImNvc1wiKTtfbzkuQWRkKFwiY3JlYXRlX2ZvbGRlclwiKTtfbzkuQWRkKFwiY3JlYXRlX2dyb3VwXCIpO19vOS5BZGQoXCJjcmVhdGVfdXNlclwiKTtfbzkuQWRkKFwiY3VycmVudF9kYXRlXCIpO19vOS5BZGQoXCJjdXJyZW50X3BhdGhcIik7X285LkFkZChcImRlY2lwaGVyXCIpO19vOS5BZGQoXCJkZWxldGVcIik7X285LkFkZChcImRlbGV0ZV9ncm91cFwiKTtfbzkuQWRkKFwiZGVsZXRlX3VzZXJcIik7X285LkFkZChcImRldmljZV9wb3J0c1wiKTtfbzkuQWRkKFwiZGV2aWNlc19sYW5faXBcIik7X285LkFkZChcImR1bXBfbGliXCIpO19vOS5BZGQoXCJlc3NpZF9uYW1lXCIpO19vOS5BZGQoXCJleGl0XCIpO19vOS5BZGQoXCJmbG9vclwiKTtfbzkuQWRkKFwiZm9ybWF0X2NvbHVtbnNcIik7X285LkFkZChcImdldF9maWxlc1wiKTtfbzkuQWRkKFwiZ2V0X2ZvbGRlcnNcIik7X285LkFkZChcImdldF9sYW5faXBcIik7X285LkFkZChcImdldF9wb3J0c1wiKTtfbzkuQWRkKFwiZ2V0X3JvdXRlclwiKTtfbzkuQWRkKFwiZ2V0X3NoZWxsXCIpO19vOS5BZGQoXCJnbG9iYWxzXCIpO19vOS5BZGQoXCJncm91cFwiKTtfbzkuQWRkKFwiZ3JvdXBzXCIpO19vOS5BZGQoXCJoYXNJbmRleFwiKTtfbzkuQWRkKFwiaGFzX3Blcm1pc3Npb25cIik7X285LkFkZChcImhvc3RfY29tcHV0ZXJcIik7X285LkFkZChcImluY2x1ZGVfbGliXCIpO19vOS5BZGQoXCJpbmRleE9mXCIpO19vOS5BZGQoXCJpbmRleGVzXCIpO19vOS5BZGQoXCJpc19iaW5hcnlcIik7X285LkFkZChcImlzX2Nsb3NlZFwiKTtfbzkuQWRkKFwiaXNfZm9sZGVyXCIpO19vOS5BZGQoXCJpc19sYW5faXBcIik7X285LkFkZChcImlzX25ldHdvcmtfYWN0aXZlXCIpO19vOS5BZGQoXCJpc192YWxpZF9pcFwiKTtfbzkuQWRkKFwiam9pblwiKTtfbzkuQWRkKFwibGFzdEluZGV4T2ZcIik7X285LkFkZChcImxhdW5jaFwiKTtfbzkuQWRkKFwibGVuXCIpO19vOS5BZGQoXCJsaWJfbmFtZVwiKTtfbzkuQWRkKFwibG9hZFwiKTtfbzkuQWRkKFwibG9jYWxfaXBcIik7X285LkFkZChcImxvY2Fsc1wiKTtfbzkuQWRkKFwibG93ZXJcIik7X285LkFkZChcIm1kNVwiKTtfbzkuQWRkKFwibW92ZVwiKTtfbzkuQWRkKFwibmFtZVwiKTtfbzkuQWRkKFwibmV0X3VzZVwiKTtfbzkuQWRkKFwibmV0d29ya19kZXZpY2VzXCIpO19vOS5BZGQoXCJuZXR3b3JrX2dhdGV3YXlcIik7X285LkFkZChcIm5zbG9va3VwXCIpO19vOS5BZGQoXCJvdmVyZmxvd1wiKTtfbzkuQWRkKFwib3duZXJcIik7X285LkFkZChcInBhcmVudFwiKTtfbzkuQWRkKFwicGFyZW50X3BhdGhcIik7X285LkFkZChcInBhdGhcIik7X285LkFkZChcInBlcm1pc3Npb25zXCIpO19vOS5BZGQoXCJwaVwiKTtfbzkuQWRkKFwicGluZ1wiKTtfbzkuQWRkKFwicGluZ19wb3J0XCIpO19vOS5BZGQoXCJwb3BcIik7X285LkFkZChcInBvcnRfaW5mb1wiKTtfbzkuQWRkKFwicG9ydF9udW1iZXJcIik7X285LkFkZChcInByaW50XCIpO19vOS5BZGQoXCJwcm9ncmFtX3BhdGhcIik7X285LkFkZChcInB1YmxpY19pcFwiKTtfbzkuQWRkKFwicHVsbFwiKTtfbzkuQWRkKFwicHVzaFwiKTtfbzkuQWRkKFwicHV0XCIpO19vOS5BZGQoXCJyYW5nZVwiKTtfbzkuQWRkKFwicmVtb3ZlXCIpO19vOS5BZGQoXCJyZW5hbWVcIik7X285LkFkZChcInJlcGxhY2VcIik7X285LkFkZChcInJldmVyc2VcIik7X285LkFkZChcInJuZFwiKTtfbzkuQWRkKFwicm91bmRcIik7X285LkFkZChcInNjYW5cIik7X285LkFkZChcInNjYW5fYWRkcmVzc1wiKTtfbzkuQWRkKFwic2NwXCIpO19vOS5BZGQoXCJzZXRfY29udGVudFwiKTtfbzkuQWRkKFwic2V0X2dyb3VwXCIpO19vOS5BZGQoXCJzaG93X3Byb2NzXCIpO19vOS5BZGQoXCJzaHVmZmxlXCIpO19vOS5BZGQoXCJzaWduXCIpO19vOS5BZGQoXCJzaW5cIik7X285LkFkZChcInNpemVcIik7X285LkFkZChcInNsaWNlXCIpO19vOS5BZGQoXCJzbXRwX3VzZXJfbGlzdFwiKTtfbzkuQWRkKFwic29ydFwiKTtfbzkuQWRkKFwic3BsaXRcIik7X285LkFkZChcInNxcnRcIik7X285LkFkZChcInN0YXJ0X3Rlcm1pbmFsXCIpO19vOS5BZGQoXCJzdHJcIik7X285LkFkZChcInN1bVwiKTtfbzkuQWRkKFwidGFuXCIpO19vOS5BZGQoXCJ0b19pbnRcIik7X285LkFkZChcInRvdWNoXCIpO19vOS5BZGQoXCJ0cmltXCIpO19vOS5BZGQoXCJ0eXBlb2ZcIik7X285LkFkZChcInVwcGVyXCIpO19vOS5BZGQoXCJ1c2VkX3BvcnRzXCIpO19vOS5BZGQoXCJ1c2VyX2JhbmtfbnVtYmVyXCIpO19vOS5BZGQoXCJ1c2VyX2lucHV0XCIpO19vOS5BZGQoXCJ1c2VyX21haWxfYWRkcmVzc1wiKTtfbzkuQWRkKFwidmFsXCIpO19vOS5BZGQoXCJ2YWx1ZXNcIik7X285LkFkZChcInZlcnNpb25cIik7X285LkFkZChcIndob2lzXCIpO19vOS5BZGQoXCJ3aWZpX25ldHdvcmtzXCIpO19vOS5BZGQoXCJwYXJhbXNcIik7X285LkFkZChcImNsZWFyX3NjcmVlblwiKTtfbzkuQWRkKFwid2FpdFwiKTtfbzkuQWRkKFwic2VsZlwiKTtfbzkuQWRkKFwibnVsbFwiKTtfbzkuQWRkKFwiZnVuY3Rpb25cIik7X285LkFkZChcImNvbnRlbnRcIik7X285LkFkZChcImxhbl9pcFwiKTtfbzkuQWRkKFwiZ2V0X2NvbnRlbnRcIik7X285LkFkZChcImFpcmVwbGF5XCIpO19vOS5BZGQoXCJmaXJld2FsbF9ydWxlc1wiKTtfbzkuQWRkKFwia2VybmVsX3ZlcnNpb25cIik7X285LkFkZChcImtlcm5lbF92ZXJzaW9uXCIpO19vOS5BZGQoXCJyc2hlbGxfc2VydmVyXCIpO19vOS5BZGQoXCJyc2hlbGxfc2VydmVyXCIpO19vOS5BZGQoXCJfX2lzYVwiKTtfbzkuQWRkKFwiaWZcIik7X285LkFkZChcInRoZW5cIik7X285LkFkZChcImVsc2VcIik7X285LkFkZChcImVuZFwiKTtfbzkuQWRkKFwid2hpbGVcIik7X285LkFkZChcImZvclwiKTtfbzkuQWRkKFwiaW5cIik7X285LkFkZChcImFuZFwiKTtfbzkuQWRkKFwib3JcIik7X285LkFkZChcIm5vdFwiKTtfbzkuQWRkKFwidHJ1ZVwiKTtfbzkuQWRkKFwiZmFsc2VcIik7X285LkFkZChcIm51bGxcIik7X285LkFkZChcInJldHVyblwiKTtfbzkuQWRkKFwiY29udGludWVcIik7X285LkFkZChcImJyZWFrXCIpO19vOS5BZGQoXCJmdW5jdGlvblwiKTtfbzkuQWRkKFwibmV3XCIpO19vOS5BZGQoXCJzZWxmXCIpO3JldHVybiBfbzk7fSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRGljdGlvbmFyeTxzdHJpbmcsIHN0cmluZz4gX29wZXJhdG9ycyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgc3RyaW5nPigpLChfbzEwKT0+e19vMTAuQWRkKFwiJiZcIixAXCIgYW5kIFwiKTtfbzEwLkFkZChcInx8XCIsQFwiIG9yIFwiKTtfbzEwLkFkZChcIjw8XCIsQFwiYml0d2lzZShcIlwiPDxcIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcIj4+XCIsQFwiYml0d2lzZShcIlwiPj5cIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcIj4+PlwiLEBcImJpdHdpc2UoXCJcIj4+PlwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwiXl5cIixAXCJiaXR3aXNlKFwiXCJeXCJcIiwkYSwkYilcIik7X28xMC5BZGQoXCImXCIsQFwiYml0d2lzZShcIlwiJlwiXCIsJGEsJGIpXCIpO19vMTAuQWRkKFwifFwiLEBcImJpdHdpc2UoXCJcInxcIlwiLCRhLCRiKVwiKTtfbzEwLkFkZChcIn5cIixAXCJiaXR3aXNlKFwiXCJ+XCJcIiwkYilcIik7X28xMC5BZGQoXCIrK1wiLEBcIiRhPSRhKzFcIik7X28xMC5BZGQoXCItLVwiLEBcIiRhPSRhLTFcIik7X28xMC5BZGQoXCIrPVwiLEBcIiRhPSRhKyRiXCIpO19vMTAuQWRkKFwiLT1cIixAXCIkYT0kYS0kYlwiKTtfbzEwLkFkZChcIio9XCIsQFwiJGE9JGEqJGJcIik7X28xMC5BZGQoXCIvPVwiLEBcIiRhPSRhLyRiXCIpO19vMTAuQWRkKFwiJT1cIixAXCIkYT0kYSUkYlwiKTtfbzEwLkFkZChcIj0+XCIsQFwiZnVuY3Rpb24kYSRiXCIpO3JldHVybiBfbzEwO30pO1xyXG5cclxuICAgICAgICBwdWJsaWMgZW51bSBFVGVtcGxhdGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5vbmUsXHJcbiAgICAgICAgICAgIEl0ZXJhdGlvbkluZGV4LFxyXG4gICAgICAgICAgICBJZ25vcmVPcHRpbWl6YXRpb24sXHJcbiAgICAgICAgICAgIFRlcm5hcnlPcGVyYXRvcixcclxuICAgICAgICAgICAgQ29tbWVudCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IERpY3Rpb25hcnk8c3RyaW5nLCBFVGVtcGxhdGU+IF90ZW1wbGF0ZXMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxzdHJpbmcsIEVUZW1wbGF0ZT4oKSwoX28xMSk9PntfbzExLkFkZChAXCJeKF9fKSguKikoX2lkeCkkXCIsRVRlbXBsYXRlLkl0ZXJhdGlvbkluZGV4KTtfbzExLkFkZChAXCJeKFxcXFwpKFxcUyopJFwiLEVUZW1wbGF0ZS5JZ25vcmVPcHRpbWl6YXRpb24pO19vMTEuQWRkKEBcIl4oXFwvXFwvKSguKikkXCIsRVRlbXBsYXRlLkNvbW1lbnQpO3JldHVybiBfbzExO30pO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIElzVGVtcGxhdGUoc3RyaW5nIGlucHV0LCBvdXQgc3RyaW5nIHJlZ2V4LCBvdXQgTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXMsIG91dCBFVGVtcGxhdGUgdGVtcGxhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoIChLZXlWYWx1ZVBhaXI8c3RyaW5nLCBFVGVtcGxhdGU+IHBhaXIgaW4gX3RlbXBsYXRlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWF0Y2hlcyA9IFJlZ2V4Lk1hdGNoZXMoaW5wdXQsIHBhaXIuS2V5KTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzLkNvdW50ICE9IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggPSBwYWlyLktleTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHBhaXIuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1hdGNoZXMgPSBudWxsO1xyXG4gICAgICAgICAgICByZWdleCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gRVRlbXBsYXRlLk5vbmU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBEaWN0aW9uYXJ5PHN0cmluZywgc3RyaW5nPiBJbmNsdWRlVG9Db2RlID0gbmV3IERpY3Rpb25hcnk8c3RyaW5nLCBzdHJpbmc+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBkZWxlZ2F0ZSB2b2lkIEluY2x1ZGVIYW5kbGVyKHN0cmluZyBpbmNsdWRlLERpY3Rpb25hcnk8c3RyaW5nLHN0cmluZz4gaW5jbHVkZVRvQ29kZSwgUmVmPGludD4gY291bnRlcik7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZXZlbnQgSW5jbHVkZUhhbmRsZXIgT25JbmNsdWRlO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nW10gR2V0SW5jbHVkZXMoc3RyaW5nIGNvZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVG9rZW5pemUoY29kZSkuR2V0SW5jbHVkZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhc3luYyBUYXNrPHN0cmluZz4gQ29tcGlsZShzdHJpbmcgY29kZSwgYm9vbCBvcHRpbWl6ZSA9IGZhbHNlLCBTZXR0aW5ncyBzZXR0aW5ncyA9IFNldHRpbmdzLk5vbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgVG9rZW5pemUoY29kZSwgc2V0dGluZ3MpLkNvbXBpbGUob3B0aW1pemUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhc3luYyBUYXNrPGJvb2w+IFRyeUNvbXBpbGUoc3RyaW5nIGNvZGUsIFJlZjxzdHJpbmc+IGNvbXBpbGVkQ29kZSwgYm9vbCBvcHRpbWl6ZSA9IGZhbHNlLCBTZXR0aW5ncyBzZXR0aW5ncyA9IFNldHRpbmdzLk5vbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29tcGlsZWRDb2RlLlZhbHVlID0gYXdhaXQgQ29tcGlsZShjb2RlLCBvcHRpbWl6ZSwgc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb21waWxlZENvZGUuVmFsdWUgPSBlLk1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIENvbnRleHQgVG9rZW5pemUoc3RyaW5nIHBsYWluQ29kZSwgU2V0dGluZ3Mgc2V0dGluZ3MgPSBTZXR0aW5ncy5Ob25lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udGV4dCBjb250ZXh0ID0gbmV3IENvbnRleHQoc2V0dGluZ3MpIHsgUGxhaW5JbnB1dCA9IG5ldyBRdWV1ZTxjaGFyPihwbGFpbkNvZGUpIH07XHJcblxyXG4gICAgICAgICAgICBUb2tlbiB0b2tlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHdoaWxlICgodG9rZW4gPSBHZXROZXh0VG9rZW4oY29udGV4dCkpICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuQWRkVG9rZW4odG9rZW4pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoKGNvbnRleHQuU2V0dGluZ3MgJiBTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpICE9IDAgJiYgdG9rZW4uUHJldiAhPSBudWxsICYmIHRva2VuLlByZXYuVmFsdWUgPT0gXCIuXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0Lklnbm9yZU9wdGltaXplKHRva2VuLlZhbHVlKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY3VzdG9tSWdub3JlT3B0aW1pemUuQWRkKHRva2VuLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgQ29udGV4dCBUb2tlbml6ZShzdHJpbmcgcGxhaW5Db2RlLENvbnRleHQgY29udGV4dCwgU2V0dGluZ3Mgc2V0dGluZ3MgPSBTZXR0aW5ncy5Ob25lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0ID0gbmV3IFF1ZXVlPGNoYXI+KHBsYWluQ29kZSk7XHJcblxyXG4gICAgICAgICAgICBUb2tlbiB0b2tlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHdoaWxlICgodG9rZW4gPSBHZXROZXh0VG9rZW4oY29udGV4dCkpICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuQWRkVG9rZW4odG9rZW4pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoKGNvbnRleHQuU2V0dGluZ3MgJiBTZXR0aW5ncy5JZ25vcmVNYXBWYXJpYWJsZXMpICE9IDAgJiYgdG9rZW4uUHJldiAhPSBudWxsICYmIHRva2VuLlByZXYuVmFsdWUgPT0gXCIuXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0Lklnbm9yZU9wdGltaXplKHRva2VuLlZhbHVlKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY3VzdG9tSWdub3JlT3B0aW1pemUuQWRkKHRva2VuLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZW1vdmVTcGFjZXMoUXVldWU8Y2hhcj4gcXVldWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3aGlsZSAocXVldWUuQ291bnQgIT0gMCAmJiBjaGFyLklzV2hpdGVTcGFjZShxdWV1ZS5QZWVrKCkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBxdWV1ZS5EZXF1ZXVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEZ1bmM8Q29udGV4dCwgYm9vbD4gR2V0U2VwYXJhdGlvblNlbGVjdG9yKENvbnRleHQgY29udGV4dCwgb3V0IFRva2VuIHRva2VuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkgPT0gJy8nICYmIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPihjb250ZXh0LlBsYWluSW5wdXQsMSkuRmlyc3RPckRlZmF1bHQoKSA9PSAnLycpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlRlbXBsYXRlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PiAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnXFxuJyB8fCAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnXFxyJyAmJlxyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dCwxKS5GaXJzdCgpID09ICdcXG4nKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0Lk1hcEFjdGl2ZS5QZWVrKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlNlcGFyYXRvcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICcsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5Qb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKCFjb250ZXh0LlNldHRpbmdzLkhhc0ZsYWcoU2V0dGluZ3MuSWdub3JlTWFwVmFyaWFibGVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnOic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4ID0+IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSA9PSAnXFxcXCcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlRlbXBsYXRlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PiBfdG9rZW5CcmFja2V0cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Rva2VuU2VwYXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90b2tlbkVuZFN0YXRlbWVudHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKS5Ub1N0cmluZygpICsgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KHguUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoX3Rva2VuSW5jbHVkZS5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpICtcclxuU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ta2lwPGNoYXI+KCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dCwxKS5GaXJzdE9yRGVmYXVsdCgpLlRvU3RyaW5nKCkpKSAvL2luY2x1ZGVcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uSW5jbHVkZSgpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdG9rZW5FbmRJbmNsdWRlLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL29wZXJhdG9yXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLk9wZXJhdG9yKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PiAhX3Rva2VuT3BlcmF0b3JzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5CcmFja2V0cy5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpKSkgLy9icmFja2V0c1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBUb2tlbi5CcmFja2V0KCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnKCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJyknOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdbJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKCghKGNvbnRleHQuTGFzdFRva2VuID09IG51bGwgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTGFzdFRva2VuIGlzIFRva2VuLk9wZXJhdG9yKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjb250ZXh0LlNldHRpbmdzICYgU2V0dGluZ3MuSWdub3JlTWFwVmFyaWFibGVzKSA9PSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnXSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU2hvdWxkT3B0aW1pemVTdHJpbmcuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3snOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5MYXN0VG9rZW4gPT0gbnVsbCB8fCAoIWNvbnRleHQuTGFzdFRva2VuLlZhbHVlLkVuZHNXaXRoKFwiKVwiKSAmJiBjb250ZXh0Lkxhc3RUb2tlbi5WYWx1ZSAhPSBcIj0+XCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lk1hcEFjdGl2ZS5QdXNoKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKChjb250ZXh0LlNldHRpbmdzICYgU2V0dGluZ3MuSWdub3JlTWFwVmFyaWFibGVzKSA9PSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTWFwQWN0aXZlLlB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnfSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTWFwQWN0aXZlLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfdG9rZW5TZXBhcmF0b3JzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkpKSAvL3NlcGFyYXRvcnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uU2VwYXJhdG9yKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoX3Rva2VuU3RyaW5ncy5Db250YWlucyhjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpKSkgLy9zdHJpbmdzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IFRva2VuLlN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdG9rZW4uT3B0aW1pemFibGUgPSBjb250ZXh0LlNob3VsZE9wdGltaXplU3RyaW5nLlBlZWsoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICckJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5DdXN0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuLk9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geCA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdldFN0cmluZyh4KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG9rZW4gPSBuZXcgVG9rZW4uVmFyaWFibGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHggPT4gX3Rva2VuQnJhY2tldHMuQ29udGFpbnMoeC5QbGFpbklucHV0LlBlZWsoKSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3Rva2VuU2VwYXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdG9rZW5TdHJpbmdzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90b2tlbk9wZXJhdG9ycy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKHguUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3Rva2VuRW5kU3RhdGVtZW50cy5Db250YWlucyh4LlBsYWluSW5wdXQuUGVlaygpLlRvU3RyaW5nKCkgKyBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNraXA8Y2hhcj4oeC5QbGFpbklucHV0LDEpLkZpcnN0T3JEZWZhdWx0KCkuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIEdldFN0cmluZyhDb250ZXh0IGNvbnRleHQpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGNvbnRleHQuUGxhaW5JbnB1dC5Db3VudCA+IDAgJiYgY29udGV4dC5QbGFpbklucHV0LlBlZWsoKSAhPSAnXCInKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ICE9IDApXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCkpO1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMCAmJiBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICdcIicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKSk7XHJcbiAgICAgICAgICAgICAgICBHZXRTdHJpbmcoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5SZW1vdmUoMCwgMSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5SZW1vdmUoY29udGV4dC5TdHJpbmdCdWlsZGVyLkxlbmd0aCAtIDEsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBUb2tlbiBHZXROZXh0VG9rZW4oQ29udGV4dCBjb250ZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgc2IgPSBjb250ZXh0LlN0cmluZ0J1aWxkZXI7XHJcbiAgICAgICAgICAgIFJlbW92ZVNwYWNlcyhjb250ZXh0LlBsYWluSW5wdXQpO1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID09IDApIHJldHVybiBudWxsO1xyXG5HcmV5SGFja0NvbXBpbGVyLlRva2VuIHQ7XG4gICAgICAgICAgICBGdW5jPENvbnRleHQsIGJvb2w+IHNlcGFyYXRvciA9IEdldFNlcGFyYXRpb25TZWxlY3Rvcihjb250ZXh0LCBvdXQgdCk7XHJcbiAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNiLkFwcGVuZChjb250ZXh0LlBsYWluSW5wdXQuRGVxdWV1ZSgpKTtcclxuICAgICAgICAgICAgfSB3aGlsZSAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMCAmJiAhc2VwYXJhdG9yKGNvbnRleHQpKTtcclxuXHJcbiAgICAgICAgICAgIHN0cmluZyB0bXBfdmFsdWUgPSBzYi5Ub1N0cmluZygpO1xyXG5zdHJpbmcgcmVnZXg7XG5NYXRjaENvbGxlY3Rpb24gbWF0Y2hlcztcbkdyZXlIYWNrQ29tcGlsZXIuRVRlbXBsYXRlIHRlbXBsYXRlO1xuICAgICAgICAgICAgaWYgKCEodCBpcyBUb2tlbi5TdHJpbmcpICYmIElzVGVtcGxhdGUodG1wX3ZhbHVlLCBvdXQgcmVnZXgsIG91dCBtYXRjaGVzLCBvdXQgdGVtcGxhdGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ID0gbmV3IFRva2VuLlRlbXBsYXRlKHRlbXBsYXRlLCBtYXRjaGVzLCByZWdleCwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoX2tleXdvcmRzLkNvbnRhaW5zKHRtcF92YWx1ZSkgJiYgISh0IGlzIFRva2VuLlN0cmluZykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHQgPSBuZXcgVG9rZW4uS2V5d29yZCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodC5PcHRpbWl6YWJsZSAmJiBjb250ZXh0Lklnbm9yZU9wdGltaXplKHQuVmFsdWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0Lk9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHQuVmFsdWUgPSB0bXBfdmFsdWU7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMCAmJiBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICcgJylcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuUGxhaW5JbnB1dC5EZXF1ZXVlKCk7XHJcblxyXG4gICAgICAgICAgICB0LkVuZFN0YXRlbWVudCA9IElzRW5kT2ZMaW5lKGNvbnRleHQpO1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5QbGFpbklucHV0LkNvdW50ID4gMCAmJiBjb250ZXh0LlBsYWluSW5wdXQuUGVlaygpID09ICc7JykgY29udGV4dC5QbGFpbklucHV0LkRlcXVldWUoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgIH1cclxucHJpdmF0ZSBzdGF0aWMgYm9vbCBJc0VuZE9mTGluZShDb250ZXh0IGNvbnRleHQpXHJcbntcclxuICAgIHJldHVybiBjb250ZXh0LlBsYWluSW5wdXQuQ291bnQgPT0gMCB8fCBfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSArIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2tpcDxjaGFyPihjb250ZXh0LlBsYWluSW5wdXQsMSkuRmlyc3RPckRlZmF1bHQoKS5Ub1N0cmluZygpKSB8fCBfdG9rZW5FbmRTdGF0ZW1lbnRzLkNvbnRhaW5zKGNvbnRleHQuUGxhaW5JbnB1dC5QZWVrKCkuVG9TdHJpbmcoKSk7XHJcbn0gICAgfVxyXG5cclxuICAgIFxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIGNsYXNzIENvbnRleHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBRdWV1ZTxjaGFyPiBQbGFpbklucHV0IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIFRva2VuIFJvb3RUb2tlbiB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBUb2tlbiBMYXN0VG9rZW4geyBnZXQ7IHNldDsgfVxyXG5wdWJsaWMgU3RyaW5nQnVpbGRlciBTdHJpbmdCdWlsZGVyXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmdCdWlsZGVycy5QZWVrKCk7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAgICAgaW50ZXJuYWwgU3RyaW5nQnVpbGRlciBDb2RlUHJlZml4IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGludGVybmFsIGxvbmcgYnJhY2tldERlcHRoID0gMDtcclxuICAgICAgICAgICAgaW50ZXJuYWwgU3RhY2s8U3RyaW5nQnVpbGRlcj4gc3RyaW5nQnVpbGRlcnMgPSBuZXcgU3RhY2s8U3RyaW5nQnVpbGRlcj4oKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgU3RhY2s8Ym9vbD4gU2hvdWxkT3B0aW1pemVTdHJpbmcgPSBuZXcgU3RhY2s8Ym9vbD4oKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgU3RhY2s8Ym9vbD4gTWFwQWN0aXZlID0gbmV3IFN0YWNrPGJvb2w+KCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIEhhc2hTZXQ8c3RyaW5nPiBpbmNsdWRlcyA9IG5ldyBIYXNoU2V0PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgaW50ZXJuYWwgVmFyaWFibGVOYW1lUHJvdmlkZXIgbmFtZVByb3ZpZGVyID0gbmV3IFZhcmlhYmxlTmFtZVByb3ZpZGVyKCk7XHJcbiAgICAgICAgICAgIGludGVybmFsIGJvb2wgb3B0aW1pemVFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGludGVybmFsIFNldHRpbmdzIFNldHRpbmdzID0gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLlNldHRpbmdzLk5vbmU7XHJcbiAgICAgICAgICAgIGludGVybmFsIEhhc2hTZXQ8c3RyaW5nPiBjdXN0b21JZ25vcmVPcHRpbWl6ZSA9IG5ldyBIYXNoU2V0PHN0cmluZz4oKTtcclxucHVibGljIGJvb2wgSWdub3JlT3B0aW1pemUoc3RyaW5nIHZhbHVlKVxyXG57XHJcbiAgICByZXR1cm4gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl9pZ25vcmVPcHRpbWl6ZS5Db250YWlucyh2YWx1ZSkgfHwgY3VzdG9tSWdub3JlT3B0aW1pemUuQ29udGFpbnModmFsdWUpO1xyXG59XHJcbiAgICAgICAgICAgIHB1YmxpYyB2b2lkIEFkZFRva2VuKFRva2VuIHRva2VuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4gaXMgVG9rZW4uSW5jbHVkZSAmJiAhaW5jbHVkZXMuQ29udGFpbnModG9rZW4uVmFsdWUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGVzLkFkZCh0b2tlbi5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoUm9vdFRva2VuID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUm9vdFRva2VuID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgTGFzdFRva2VuID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTGFzdFRva2VuLk5leHQgPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5QcmV2ID0gTGFzdFRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIExhc3RUb2tlbiA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBDb250ZXh0KFNldHRpbmdzIHNldHRpbmdzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTZXR0aW5ncyA9IHNldHRpbmdzO1xyXG4gICAgICAgICAgICAgICAgUGxhaW5JbnB1dCA9IG5ldyBRdWV1ZTxjaGFyPigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIoKSk7XHJcbiAgICAgICAgICAgICAgICBDb2RlUHJlZml4ID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBTaG91bGRPcHRpbWl6ZVN0cmluZy5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIE1hcEFjdGl2ZS5QdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIENvbnRleHQgQ2xvbmUoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENvbnRleHQoU2V0dGluZ3MpIHtuYW1lUHJvdmlkZXIgPSBuYW1lUHJvdmlkZXIsIENvZGVQcmVmaXggPSBDb2RlUHJlZml4LGluY2x1ZGVzID0gaW5jbHVkZXMsY3VzdG9tSWdub3JlT3B0aW1pemUgPSBjdXN0b21JZ25vcmVPcHRpbWl6ZX07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHB1YmxpYyBhc3luYyBUYXNrPHN0cmluZz4gQ29tcGlsZShib29sIG9wdGltaXplID0gZmFsc2UsYm9vbCBpZ25vcmVQcmVmaXggPSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3B0aW1pemVFbmFibGVkID0gb3B0aW1pemU7XHJcbiAgICAgICAgICAgICAgICBTdHJpbmdCdWlsZGVyLkNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFJlZjxpbnQ+IGNvdW50ZXIgPSBuZXcgUmVmPGludD4oMCk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoIChzdHJpbmcgaW5jbHVkZSBpbiBpbmNsdWRlcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5JbmNsdWRlVG9Db2RlLkNvbnRhaW5zS2V5KGluY2x1ZGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9uSW5jbHVkZSE9bnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlci5WYWx1ZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLk9uSW5jbHVkZS5JbnZva2UoaW5jbHVkZSwgSW5jbHVkZVRvQ29kZSwgY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoY291bnRlci5WYWx1ZSE9MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBUYXNrLkRlbGF5KDIwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIENvbXBpbGVUb2tlbnMob3B0aW1pemUpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR2V0UmVzdWx0Q29kZShpZ25vcmVQcmVmaXgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RyaW5nW10gR2V0SW5jbHVkZXMoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4oaW5jbHVkZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcml2YXRlIHN0cmluZyBHZXRSZXN1bHRDb2RlKGJvb2wgaWdub3JlUHJlZml4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChpZ25vcmVQcmVmaXgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIENvZGVQcmVmaXguQXBwZW5kKFN0cmluZ0J1aWxkZXIuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29kZVByZWZpeC5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwcml2YXRlIGFzeW5jIHZvaWQgQ29tcGlsZVRva2Vucyhib29sIG9wdGltaXplKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUb2tlbiBub2RlO1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IFJvb3RUb2tlbjtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChub2RlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUuT3B0aW1pemUodGhpcywgb3B0aW1pemUpLk5leHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IFJvb3RUb2tlbjtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChub2RlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IChhd2FpdCBub2RlLkNvbXBpbGUodGhpcykpLk5leHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgICAgICAgICBUb2tlbiBub2RlID0gUm9vdFRva2VuO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlIGlzIFRva2VuLlN0cmluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kKCdcIicrbm9kZS5WYWx1ZSsgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5BcHBlbmQobm9kZS5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuRW5kU3RhdGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kKCdcXG4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2IuQXBwZW5kKCcgJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSovXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNiLkFwcGVuZExpbmUobm9kZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5OZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBSZWY8VD5cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVCBWYWx1ZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWYoVCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRleHQuUmVndWxhckV4cHJlc3Npb25zO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBUb2tlbiBQcmV2IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIFRva2VuIE5leHQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgdmlydHVhbCBzdHJpbmcgVmFsdWUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgdmlydHVhbCBib29sIEN1c3RvbSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgU3VwcG9ydHNNdWx0aUxpbmVCcmFja2V0IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGJvb2wgT3B0aW1pemFibGUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwcml2YXRlIGJvb2wgX2VuZFN0YXRlbWVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBFbmRTdGF0ZW1lbnQgeyBnZXR7XHJcbiAgICAgICAgICAgICAgICBpZiAoRm9yY2VFbmRTdGF0ZW1lbnQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZvcmNlRW5kU3RhdGVtZW50VmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9lbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNldCB7IF9lbmRTdGF0ZW1lbnQgPSB2YWx1ZTsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBib29sIEZvcmNlRW5kU3RhdGVtZW50IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGJvb2wgRm9yY2VFbmRTdGF0ZW1lbnRWYWx1ZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgdmlydHVhbCBUb2tlbiBPcHRpbWl6ZShDb250ZXh0IGNvbnRleHQsYm9vbCByZXBsYWNlID0gdHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKE9wdGltaXphYmxlICYmIC8vZmxhZyBmcm9tIHRva2VuaXphdGlvbiAgXHJcbiAgICAgICAgICAgICAgICAgICAgVmFsdWUuTGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFjaGFyLklzRGlnaXQoVmFsdWVbMF0pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIWNvbnRleHQuSWdub3JlT3B0aW1pemUoVmFsdWUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXBsYWNlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBjb250ZXh0Lm5hbWVQcm92aWRlci5HZXRSZXBsYWNlKFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5uYW1lUHJvdmlkZXIuRGVmaW5lKFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIHZpcnR1YWwgYXN5bmMgVGFzazxUb2tlbj4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPcldoaXRlU3BhY2UoVmFsdWUpKSByZXR1cm4gdGhpcztcclxuQnJhY2tldCBiOyAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5TdHJpbmdCdWlsZGVyLkxlbmd0aCAhPSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKChSZWdleC5Jc01hdGNoKGNvbnRleHQuU3RyaW5nQnVpbGRlcltjb250ZXh0LlN0cmluZ0J1aWxkZXIuTGVuZ3RoIC0gMV0uVG9TdHJpbmcoKSwgXCJcXFxcd1wiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgVmFsdWUuTGVuZ3RoID4gMCAmJiBSZWdleC5Jc01hdGNoKFZhbHVlWzBdLlRvU3RyaW5nKCksIFwiXFxcXHdcIikpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgIChQcmV2ICE9IG51bGwgJiYgUHJldiBpcyBLZXl3b3JkICYmIChiID0gdGhpcyBhcyBCcmFja2V0KSAhPSBudWxsJiYgKFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8Y2hhcj4oYi5WYWx1ZSkgPT0gJygnIHx8IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8Y2hhcj4oYi5WYWx1ZSkgPT0gJ1snKSkpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoJyAnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChFbmRTdGF0ZW1lbnQgJiYgTmV4dCAhPSBudWxsICYmICFmb3JjZSkgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChfc2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcml2YXRlIGJvb2wgQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoc3RyaW5nIHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChzLkxlbmd0aCA+IFZhbHVlLkxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZVtpXSAhPSBzW2ldKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHByaXZhdGUgYm9vbCBDb21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShjaGFyIGMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChWYWx1ZS5MZW5ndGg8MSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFZhbHVlWzBdID09IGM7XHJcbiAgICAgICAgICAgIH1cclxuXG4gICAgICAgIFxucHJpdmF0ZSBib29sIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19TdXBwb3J0c011bHRpTGluZUJyYWNrZXQ9ZmFsc2U7cHJpdmF0ZSBib29sIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19PcHRpbWl6YWJsZT10cnVlO31cclxuICAgIH1cclxufVxyXG5cclxuIiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgY2xhc3MgVmFyaWFibGVOYW1lUHJvdmlkZXJcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIERpY3Rpb25hcnk8c3RyaW5nLHN0cmluZz4gX3JlcGxhY2UgPSBuZXcgRGljdGlvbmFyeTxzdHJpbmcsIHN0cmluZz4oKTtcclxuICAgICAgICBwcml2YXRlIEhhc2hTZXQ8c3RyaW5nPiBfbmFtZXMgPSBuZXcgSGFzaFNldDxzdHJpbmc+KCk7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgX3N0YXRlO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9jaGFycyA9IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIE5leHQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgICAgIGludCBpbmRleCA9IF9zdGF0ZTtcclxuXHJcbiAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBpID0gaW5kZXggJSBfY2hhcnMuTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgY2hhciBjID0gX2NoYXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgc2IuQXBwZW5kKGMpO1xyXG4gICAgICAgICAgICAgICAgaW5kZXggLz0gX2NoYXJzLkxlbmd0aDtcclxuICAgICAgICAgICAgfSB3aGlsZSAoaW5kZXggPiAwKTtcclxuXHJcbiAgICAgICAgICAgIF9zdGF0ZSsrO1xyXG4gICAgICAgICAgICByZXR1cm4gc2IuVG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0RnJlZShib29sIG9wdGltaXplKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nIG5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBib29sIGM7XHJcbiAgICAgICAgICAgIGlmIChvcHRpbWl6ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nIHMgPSBOZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBfbmFtZXMuQWRkKHMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IE5leHQoKTtcclxuICAgICAgICAgICAgfSB3aGlsZSAoX25hbWVzLkNvbnRhaW5zKG5hbWUpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0RlZmluZWQoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX3JlcGxhY2UuQ29udGFpbnNLZXkobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgR2V0UmVwbGFjZShzdHJpbmcgb3JpZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghX3JlcGxhY2UuQ29udGFpbnNLZXkob3JpZykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZyBzID0gTmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgX3JlcGxhY2Vbb3JpZ10gPSBzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBfcmVwbGFjZVtvcmlnXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERlZmluZShzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghX25hbWVzLkNvbnRhaW5zKG5hbWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbmFtZXMuQWRkKG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgVmFyaWFibGUgOiBUb2tlblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzazxUb2tlbj4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuQnJhY2tldCBicjsgICAgICAgICAgICAgICAgICAgIGlmICgoYnIgPSB0aGlzIGFzIEJyYWNrZXQpICE9IG51bGwmJiAhYnIuQ3VzdG9tICYmIChici5WYWx1ZS5MZW5ndGggPT0gMCB8fCBici5WYWx1ZVswXSAhPSAneycpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgYmFzZS5Db21waWxlKGNvbnRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKE5leHQgIT0gbnVsbCAmJiAhR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl90b2tlbk9wZXJhdG9ycy5Db250YWlucyhTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkZpcnN0PGNoYXI+KFZhbHVlKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIChOZXh0LlZhbHVlID09IFwiLlwiIHx8IE5leHQuVmFsdWUgPT0gXCIoXCIgfHwgTmV4dC5WYWx1ZSA9PSBcIltcIikpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKFZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZXh0LlZhbHVlID09IFwiLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gTmV4dC5OZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZCgnLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dCE9bnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kU3RhdGVtZW50ID0gTmV4dC5FbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gTmV4dC5OZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0LlByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuT3BlcmF0b3IgbztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTmV4dCAhPSBudWxsICYmIChvID0gTmV4dCBhcyBPcGVyYXRvcikgIT0gbnVsbCYmIG8uTmVlZHNMZWZ0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcmNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgYmFzZS5Db21waWxlKGNvbnRleHQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbk9wZXJhdG9yIG9vO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChQcmV2ICE9IG51bGwgJiYgKG9vID0gUHJldiBhcyBPcGVyYXRvcikgIT0gbnVsbCYmIG9vLk5lZWRzUmlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9yY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBiYXNlLkNvbXBpbGUoY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJWYXJpYWJsZTogezB9XCIsYmFzZS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgSW5jbHVkZSA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBJbmNsdWRlKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBPcHRpbWl6YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrPFRva2VuPiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuSW5jbHVkZVRvQ29kZS5Db250YWluc0tleShWYWx1ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IGF3YWl0IFRva2VuaXplKEluY2x1ZGVUb0NvZGVbVmFsdWVdLCBjb250ZXh0LkNsb25lKCkpLkNvbXBpbGUoY29udGV4dC5vcHRpbWl6ZUVuYWJsZWQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IHN0cmluZy5Gb3JtYXQoXCIvL2luY2x1ZGUgb2YgXFxcInswfVxcXCIgZmFpbGVkXCIsVmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgYmFzZS5Db21waWxlKGNvbnRleHQsIGZvcmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIkluY2x1ZGU6IHswfVwiLGJhc2UuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBLZXl3b3JkIDogVG9rZW5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHVibGljIEtleXdvcmQoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIEdyZXlIYWNrQ29tcGlsZXIuVG9rZW4gT3B0aW1pemUoR3JleUhhY2tDb21waWxlci5Db250ZXh0IGNvbnRleHQsIGJvb2wgcmVwbGFjZSA9IHRydWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlID09IFwidHJ1ZVwiKSBWYWx1ZSA9IFwiMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZSA9PSBcImZhbHNlXCIpIFZhbHVlID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuT3B0aW1pemUoY29udGV4dCxyZXBsYWNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVGFzazxUb2tlbj4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKFZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVsc2VcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN1cHBvcnRzTXVsdGlMaW5lQnJhY2tldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZvclwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2hpbGVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlmXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21waWxlTmV4dChjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN1cHBvcnRzTXVsdGlMaW5lQnJhY2tldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21waWxlTmV4dChjb250ZXh0LGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN1cHBvcnRzTXVsdGlMaW5lQnJhY2tldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB2b2lkIENvbXBpbGVOZXh0KENvbnRleHQgY29udGV4dCxib29sIHJlbW92ZUJyYWNldHMgPSB0cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKE5leHQgaXMgQnJhY2tldCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBOZXh0LkNvbXBpbGUoY29udGV4dCx0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVtb3ZlQnJhY2V0cylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlclswXSA9ICcgJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgKz0gY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKDAsIGNvbnRleHQuU3RyaW5nQnVpbGRlci5MZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgKz0gY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE5leHQuTmV4dCE9bnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5leHQuTmV4dC5QcmV2ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEVuZFN0YXRlbWVudCA9IE5leHQuRW5kU3RhdGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIE5leHQgPSBOZXh0Lk5leHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgcGFydGlhbCBjbGFzcyBUb2tlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIFNlcGFyYXRvciA6IFRva2VuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBTZXBhcmF0b3IoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIlNlcGFyYXRvcjogezB9XCIsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBTdHJpbmcgOiBUb2tlblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzazxUb2tlbj4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ3VzdG9tKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChcIihcXFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgZGVwdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgbGFzdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgVmFsdWUuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICsgMSA8IFZhbHVlLkxlbmd0aCAmJiBWYWx1ZVtpXSA9PSAnXFxcXCcgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoVmFsdWVbaSArIDFdID09ICd7JyB8fCBWYWx1ZVtpICsgMV0gPT0gJ30nKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChWYWx1ZVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVmFsdWVbaV0gPT0gJ3snKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCA9PSAwKSBsYXN0ID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGgrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChWYWx1ZVtpXSA9PSAnfScgJiYgKGkgPT0gMCB8fCBWYWx1ZVtpIC0gMV0gIT0gJ1xcXFwnKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXB0aC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXB0aCA8IDApIHRocm93IG5ldyBFeGNlcHRpb24oc3RyaW5nLkZvcm1hdChcInN0cmluZyBmb3JtYXQgKHswfSkgaXMgbm90IHZhbGlkXCIsVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVwdGggPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoXCJcXFwiKyhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRleHQgaW5uZXJDb2RlQ29udGV4dCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUb2tlbml6ZShWYWx1ZS5TdWJzdHJpbmcobGFzdCwgaSAtIGxhc3QpLlJlcGxhY2UoQFwiXCJcIlwiXCJcIiwgQFwiXCJcIlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LkNsb25lKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgY29tcGlsZWQgPSBhd2FpdCBpbm5lckNvZGVDb250ZXh0LkNvbXBpbGUoY29udGV4dC5vcHRpbWl6ZUVuYWJsZWQsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoY29tcGlsZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFwiKStcXFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRlcHRoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChWYWx1ZVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZChcIlxcXCIpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKCdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlN0cmluZ0J1aWxkZXIuQXBwZW5kKFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZCgnXCInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChFbmRTdGF0ZW1lbnQpIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoX3NlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJTdHJpbmc6IHswfXsxfVwiLChDdXN0b20gPyBcIiRcIiA6IFwiXCIpLGJhc2UuVG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBHcmV5SGFja1Rvb2xzXHJcbntcclxuICAgIHB1YmxpYyBwYXJ0aWFsIGNsYXNzIEdyZXlIYWNrQ29tcGlsZXJcclxuICAgIHtcclxuICAgICAgICBpbnRlcm5hbCBwYXJ0aWFsIGNsYXNzIFRva2VuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgY2xhc3MgQnJhY2tldCA6IFZhcmlhYmxlXHJcbiAgICAgICAgICAgIHtcclxucHVibGljIGJvb2wgSXNPcGVuaW5nXHJcbntcclxuICAgIGdldFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBWYWx1ZSA9PSBcIihcIiB8fCBWYWx1ZSA9PSBcIltcIiB8fCBWYWx1ZSA9PSBcIntcIjtcclxuICAgIH1cclxufXB1YmxpYyBib29sIElzQ2xvc2luZ1xyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVmFsdWUgPT0gXCIpXCIgfHwgVmFsdWUgPT0gXCJdXCIgfHwgVmFsdWUgPT0gXCJ9XCI7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAgICAgICAgIHByaXZhdGUgRGljdGlvbmFyeTxjaGFyLCBjaGFyPiBfb3BlbmluZ1RvQ2xvc2luZyA9IGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PGNoYXIsIGNoYXI+KCksKF9vMSk9PntfbzEuQWRkKCcoJywnKScpO19vMS5BZGQoJ1snLCddJyk7X28xLkFkZCgneycsJ30nKTtyZXR1cm4gX28xO30pO1xyXG4gICAgICAgICAgICAgICAgcHVibGljIEJyYWNrZXQoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBUb2tlbiBDb21waWxlSW5zaWRlKENvbnRleHQgY29udGV4dCwgYm9vbCBtdWx0aUxpbmUgPSBmYWxzZSwgc3RyaW5nIHByZWZpeCA9IFwiXCIsIHN0cmluZyBwb3N0Zml4ID0gXCJcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUb2tlbiBsYXN0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICBUb2tlbiBjdXJyZW50ID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlB1c2gobmV3IFN0cmluZ0J1aWxkZXIocHJlZml4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhciBjbG9zZSA9IF9vcGVuaW5nVG9DbG9zaW5nW1N5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3Q8Y2hhcj4oVmFsdWUpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnQhPW51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW11bHRpTGluZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudC5Gb3JjZUVuZFN0YXRlbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50LkZvcmNlRW5kU3RhdGVtZW50VmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuRW5kU3RhdGVtZW50ID0gY3VycmVudC5FbmRTdGF0ZW1lbnQgfHwgY3VycmVudC5OZXh0LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKGNsb3NlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdCA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKGNsb3NlKSkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuQ29tcGlsZShjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQuTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0Lk5leHQgIT0gbnVsbCAmJiBsYXN0Lk5leHQuVmFsdWUgPT0gXCJlbHNlXCIgJiYgbXVsdGlMaW5lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdC5WYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3QuRm9yY2VFbmRTdGF0ZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0LkZvcmNlRW5kU3RhdGVtZW50VmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXN0cmluZy5Jc051bGxPcldoaXRlU3BhY2UocG9zdGZpeCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0LlZhbHVlID0gcG9zdGZpeDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdC5Gb3JjZUVuZFN0YXRlbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdC5Gb3JjZUVuZFN0YXRlbWVudFZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdC5Db21waWxlKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QuRm9yY2VFbmRTdGF0ZW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSBsYXN0LkVuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBWYWx1ZSA9IGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhc3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBUYXNrPFRva2VuPiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChJc09wZW5pbmcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNrZXREZXB0aCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKElzQ2xvc2luZylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2tldERlcHRoLS07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChDdXN0b20pIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChJc09wZW5pbmcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb2tlbiBub2RlID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChQcmV2ICE9IG51bGwgJiYgVmFsdWUgPT0gXCJ7XCIgJiYgUHJldi5TdXBwb3J0c011bHRpTGluZUJyYWNrZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBwcmVmaXggPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHBvc3RmaXggPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYuVmFsdWUgPT0gXCJlbHNlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGlmXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChQcmV2LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiaWZcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZml4ID0gXCJ0aGVuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGZpeCA9IFwiZW5kIGlmXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKFByZXYuVmFsdWUgPT0gXCI9PlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RmaXggPSBcImVuZCBmdW5jdGlvblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoUHJldi5Db21wYXJlQmVnaW5uaW5nT2ZWYWx1ZShcImZ1bmN0aW9uXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RmaXggPSBcImVuZCBmdW5jdGlvblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihQcmV2LkNvbXBhcmVCZWdpbm5pbmdPZlZhbHVlKFwiZm9yXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RmaXggPSBcImVuZCBmb3JcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFByZXYuQ29tcGFyZUJlZ2lubmluZ09mVmFsdWUoXCJ3aGlsZVwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0Zml4ID0gXCJlbmQgd2hpbGVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gQ29tcGlsZUluc2lkZShjb250ZXh0LCB0cnVlLCBwcmVmaXgrXCJcXG5cIiwgcG9zdGZpeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gQ29tcGlsZUluc2lkZShjb250ZXh0LGZhbHNlLFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgTmV4dCA9IG5vZGUhPW51bGw/bm9kZS5OZXh0OihUb2tlbiludWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Sb290VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5OZXh0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChub2RlIT1udWxsP25vZGUuTmV4dDooVG9rZW4pbnVsbCkgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5MYXN0VG9rZW4gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5OZXh0LlByZXYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdXN0b20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIkJyYWNrZXQ6IHswfVwiLFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEdyZXlIYWNrVG9vbHMuRGVidWdnZXI7XHJcblxyXG5uYW1lc3BhY2UgR3JleUhhY2tUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgcGFydGlhbCBjbGFzcyBHcmV5SGFja0NvbXBpbGVyXHJcbiAgICB7XHJcbiAgICAgICAgaW50ZXJuYWwgcGFydGlhbCBjbGFzcyBUb2tlblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGNsYXNzIE9wZXJhdG9yIDogVmFyaWFibGVcclxuICAgICAgICAgICAge1xyXG5wdWJsaWMgYm9vbCBOZWVkc0xlZnRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5fb3BlcmF0b3JzLkNvbnRhaW5zS2V5KFZhbHVlKSAmJiBfb3BlcmF0b3JzW1ZhbHVlXS5Db250YWlucyhcIiRhXCIpO1xyXG4gICAgfVxyXG59cHVibGljIGJvb2wgTmVlZHNSaWdodFxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gR3JleUhhY2tUb29scy5HcmV5SGFja0NvbXBpbGVyLl9vcGVyYXRvcnMuQ29udGFpbnNLZXkoVmFsdWUpICYmIF9vcGVyYXRvcnNbVmFsdWVdLkNvbnRhaW5zKFwiJGJcIik7XHJcbiAgICB9XHJcbn0gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgQ3VzdG9tXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5fb3BlcmF0b3JzLkNvbnRhaW5zS2V5KFZhbHVlKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNldCB7IH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgT3BlcmF0b3IoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE9wdGltaXphYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYXN5bmMgVGFzazxUb2tlbj4gQ29tcGlsZShDb250ZXh0IGNvbnRleHQsIGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ3VzdG9tKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFZhbHVlID09IFwiPT5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3VwcG9ydHNNdWx0aUxpbmVCcmFja2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nIGRlcHRoID0gY29udGV4dC5icmFja2V0RGVwdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZyBsZWZ0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHJpZ2h0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG9rZW4gdG1wUmlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb2tlbiB0bXBMZWZ0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHMgPSBfb3BlcmF0b3JzW1ZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5lZWRzTGVmdCAmJiBQcmV2ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuQnJhY2tldCBiOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGIgPSBQcmV2IGFzIEJyYWNrZXQpICE9IG51bGwmJiBiLklzT3BlbmluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKHN0cmluZy5Gb3JtYXQoXCJpbnZhbGlkIHN5bnRheCBmb3IgdGVtcGxhdGUgezB9XCIsVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUHVzaChuZXcgU3RyaW5nQnVpbGRlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcExlZnQgPSBhd2FpdCBQcmV2LkNvbXBpbGUoY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gY29udGV4dC5TdHJpbmdCdWlsZGVyLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzID0gcy5SZXBsYWNlKFwiJGFcIiwgbGVmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN0cmluZ0J1aWxkZXJzLlBvcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIixQcmV2KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8VG9rZW4+KFwia2V5MVwiKS5QcmV2OihUb2tlbiludWxsKSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYgPSBQcmV2LlByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJldi5OZXh0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LlJvb3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZWVkc1JpZ2h0ICYmIE5leHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdHJpbmdCdWlsZGVycy5QdXNoKG5ldyBTdHJpbmdCdWlsZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wUmlnaHQgPSBhd2FpdCBOZXh0LkNvbXBpbGUoY29udGV4dCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodCA9IGNvbnRleHQuU3RyaW5nQnVpbGRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyA9IHMuUmVwbGFjZShcIiRiXCIsIHJpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3RyaW5nQnVpbGRlcnMuUG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSBOZXh0LkVuZFN0YXRlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTJcIixOZXh0KSE9bnVsbD9nbG9iYWw6OkJyaWRnZS5TY3JpcHQuRnJvbVRlbXA8VG9rZW4+KFwia2V5MlwiKS5OZXh0OihUb2tlbiludWxsKSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPSBOZXh0Lk5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmV4dC5QcmV2ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lkxhc3RUb2tlbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZT09XCI9PlwiICYmIHRtcExlZnQuUHJldiAhPSBudWxsICYmIHRtcExlZnQuUHJldi5WYWx1ZSAhPSBcIj1cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIG5hbWUgPSBjb250ZXh0Lm5hbWVQcm92aWRlci5HZXRGcmVlKGNvbnRleHQub3B0aW1pemVFbmFibGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZhbHVlID0gXCJAXCIgKyBuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Db2RlUHJlZml4LkFwcGVuZChuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuQ29kZVByZWZpeC5BcHBlbmQoXCI9XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Db2RlUHJlZml4LkFwcGVuZExpbmUocyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRTdGF0ZW1lbnQgPSB0bXBSaWdodC5FbmRTdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgYmFzZS5Db21waWxlKGNvbnRleHQsZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVmFsdWUgPSBzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBiYXNlLkNvbXBpbGUoY29udGV4dCwgZm9yY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcIk9wZXJhdG9yOiB7MH1cIixiYXNlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRleHQuUmVndWxhckV4cHJlc3Npb25zO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEdyZXlIYWNrVG9vbHNcclxue1xyXG4gICAgcHVibGljIHBhcnRpYWwgY2xhc3MgR3JleUhhY2tDb21waWxlclxyXG4gICAge1xyXG4gICAgICAgIGludGVybmFsIHBhcnRpYWwgY2xhc3MgVG9rZW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBjbGFzcyBUZW1wbGF0ZSA6IFZhcmlhYmxlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYm9vbCBfaWdub3JlTmV4dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBWYWx1ZVxyXG57XHJcbiAgICBnZXRcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKF9pZ25vcmVOZXh0ICYmIF92YWx1ZSAhPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2lnbm9yZU5leHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc3RyaW5nIF92YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgRVRlbXBsYXRlIFRlbXBsYXRlVHlwZSB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgc3RyaW5nIFJlZ2V4U3RyaW5nIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBNYXRjaENvbGxlY3Rpb24gTWF0Y2hlcyB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgVG9rZW4gT3B0aW1pemUoQ29udGV4dCBjb250ZXh0LCBib29sIHJlcGxhY2UgPSB0cnVlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoVGVtcGxhdGVUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuRVRlbXBsYXRlLkl0ZXJhdGlvbkluZGV4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcGxhY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHZhcl9uYW1lID0gTWF0Y2hlc1swXS5Hcm91cHNbMl0uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPcldoaXRlU3BhY2UodmFyX25hbWUpIHx8IGNvbnRleHQuSWdub3JlT3B0aW1pemUodmFyX25hbWUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdmFsdWUgPSBSZWdleC5SZXBsYWNlKFZhbHVlLCBSZWdleFN0cmluZyxcclxuc3RyaW5nLkZvcm1hdChcIiQxezB9JDNcIixjb250ZXh0Lm5hbWVQcm92aWRlci5HZXRSZXBsYWNlKHZhcl9uYW1lKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuSWdub3JlT3B0aW1pemF0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvdmVycmlkZSBhc3luYyBUYXNrPFRva2VuPiBDb21waWxlKENvbnRleHQgY29udGV4dCwgYm9vbCBmb3JjZSA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoVGVtcGxhdGVUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuRVRlbXBsYXRlLkNvbW1lbnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvbnRleHQuU2V0dGluZ3MgJiBHcmV5SGFja1Rvb2xzLkdyZXlIYWNrQ29tcGlsZXIuU2V0dGluZ3MuUmVtb3ZlQ29tbWVudHMpICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFByZXYgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYuTmV4dCA9IE5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghUHJldi5FbmRTdGF0ZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZXYuRW5kU3RhdGVtZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuU3RyaW5nQnVpbGRlci5BcHBlbmQoX3NlcGFyYXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5Sb290VG9rZW4gPSBOZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5leHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQuUHJldiA9IFByZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuTGFzdFRva2VuID0gUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoUHJldiE9bnVsbCAmJiBOZXh0IT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgUHJldi5OZXh0ID0gTmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgTmV4dC5QcmV2ID0gUHJldjtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29udGV4dC5TdHJpbmdCdWlsZGVyLkFwcGVuZExpbmUoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGJhc2UuQ29tcGlsZShjb250ZXh0LCBmb3JjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBib29sIElzVmFsdWVTdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChWYWx1ZS5MZW5ndGggPCAyKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFZhbHVlWzBdID09ICdcIicgJiYgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5MYXN0T3JEZWZhdWx0PGNoYXI+KFZhbHVlKSA9PSAnXCInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHB1YmxpYyBUZW1wbGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHVibGljIFRlbXBsYXRlKEVUZW1wbGF0ZSB0ZW1wbGF0ZSwgTWF0Y2hDb2xsZWN0aW9uIG1hdGNoZXMsIHN0cmluZyByZWdleCwgQ29udGV4dCBjb250ZXh0KSA6IGJhc2UoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFRlbXBsYXRlVHlwZSA9IHRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIE1hdGNoZXMgPSBtYXRjaGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlZ2V4U3RyaW5nID0gcmVnZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGVtcGxhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdyZXlIYWNrVG9vbHMuR3JleUhhY2tDb21waWxlci5FVGVtcGxhdGUuSWdub3JlT3B0aW1pemF0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbHVlID0gTWF0Y2hlc1swXS5Hcm91cHNbMl0uVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSXNWYWx1ZVN0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9IF92YWx1ZS5TdWJzdHJpbmcoMSwgX3ZhbHVlLkxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZShfdmFsdWUpKSBjb250ZXh0LmN1c3RvbUlnbm9yZU9wdGltaXplLkFkZChfdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWx1ZSA9ICdcIicgKyBfdmFsdWUgKyAnXCInO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dC5JZ25vcmVPcHRpbWl6ZShNYXRjaGVzWzBdLkdyb3Vwc1syXS5WYWx1ZSkpIGNvbnRleHQuY3VzdG9tSWdub3JlT3B0aW1pemUuQWRkKE1hdGNoZXNbMF0uR3JvdXBzWzJdLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaWdub3JlTmV4dCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==

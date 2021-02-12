/// <reference path="../wwwroot/node_modules/monaco-editor/monaco.d.ts"/>
var CompletionItemKind = monaco.languages.CompletionItemKind;
var CompletionItem = /** @class */ (function () {
    function CompletionItem(label, kind) {
        this.label = label;
        this.kind = kind;
        this.insertText = label.toString();
        this.insertTextRules = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
    }
    return CompletionItem;
}());
var DecorationItem = /** @class */ (function () {
    function DecorationItem(range, className) {
        this.range = range;
        this.options = { inlineClassName: className };
    }
    return DecorationItem;
}());
var vRange = /** @class */ (function () {
    function vRange(start, end) {
        this.startColumn = start.column;
        this.startLineNumber = start.lineNumber;
        this.endColumn = end.column;
        this.endLineNumber = end.lineNumber;
        this.start = start;
        this.end = end;
    }
    return vRange;
}());
function getCompletionItems(text, regEx, output, words) {
    if (regEx == undefined)
        regEx = /([_a-zA-Z][_a-zA-Z0-9]*)\s*=\s*((function\s*\((.*)\))|(\((.*)\)\s*=>)|(\(.*\))|(\[.*\])|(\{.*\})|(".*")|([0-9]+)|([_a-zA-Z][_a-zA-Z0-9]*))|(([_a-zA-Z][_a-zA-Z0-9]*)\s+in)/g;
    if (output == undefined)
        output = [];
    if (words == undefined)
        words = {};
    var match;
    var tempItem;
    while ((match = regEx.exec(text))) {
        //standard function || lambda
        if (match[3] || match[5]) {
            tempItem = new CompletionItem(match[1], monaco.languages.CompletionItemKind.Function);
            var params = match[4] || match[6];
            var fParams = [];
            if (params) {
                for (var _i = 0, _a = params.split(","); _i < _a.length; _i++) {
                    var param = _a[_i];
                    param = param.trim();
                    fParams.push(param);
                    tryAddItem(new CompletionItem(param, monaco.languages.CompletionItemKind.Variable), output, words);
                }
            }
            tempItem.insertText = match[1] + "(" + getParamsSnippet(fParams) + ")";
        }
        //bracket || array || variable
        else if (match[7] || match[8] || match[12]) {
            tempItem = new CompletionItem(match[1], CompletionItemKind.Variable);
        }
        //map
        else if (match[9]) {
            tempItem = new CompletionItem(match[1], CompletionItemKind.Module);
        }
        //string || number
        else if (match[10] || match[11]) {
            tempItem = new CompletionItem(match[1], CompletionItemKind.Value);
        }
        //iterator
        else if (match[13]) {
            tempItem = new CompletionItem(match[14], CompletionItemKind.Variable);
        }
        if (tempItem) {
            tryAddItem(tempItem, output, words, match[2]);
        }
    }
    return output;
}
function getCompletionItemsInMap(text, regEx, output, words) {
    if (regEx == undefined)
        regEx = /(("?([_a-zA-Z][_a-zA-Z0-9]*)"?)|({[^}]*})|\d*)\s*:\s*(("?([_a-zA-Z][_a-zA-Z0-9]*)"?)|({[^}]*})|(\d*))/g;
    if (output == undefined)
        output = [];
    if (words == undefined)
        words = {};
    var match;
    var tempItem;
    while ((match = regEx.exec(text))) {
        if (match[3] != undefined) {
            //string || number
            if (match[6] || match[9]) {
                tempItem = new CompletionItem(match[3], CompletionItemKind.Value);
            }
            //map
            else if (match[8]) {
                tempItem = new CompletionItem(match[3], CompletionItemKind.Module);
            }
        }
        if (tempItem) {
            tryAddItem(tempItem, output, words, match[5]);
        }
        tempItem = undefined;
    }
    return output;
}
function tryAddItem(item, output, words, opt) {
    if (item && item.kind) {
        if (words[item.label.toString()] == undefined)
            words[item.label.toString()] = {};
        if (words[item.label.toString()][item.kind] == undefined) {
            words[item.label.toString()][item.kind] = true;
            output.push(item);
            if (item.kind == CompletionItemKind.Module && opt)
                getCompletionItemsInMap(opt, undefined, output, words);
        }
    }
}
function getParamsSnippet(params) {
    if (!params)
        return "";
    var out = [];
    for (var index = 0; index < params.length; index++) {
        var param = params[index];
        out.push("${" + (index + 1) + ":" + param + "}");
    }
    return out.join(", ");
}
function getStaticItems(gspp) {
    //#region gspp snippets
    var gsppItems;
    if (gspp) {
        var gsppForCompletion = new CompletionItem("for", CompletionItemKind.Snippet);
        gsppForCompletion.insertText = "for(${1:var} in ${2:array}){\n\t${3:body}\n}\n${0}";
        var gsppIfCompletion = new CompletionItem("if", CompletionItemKind.Snippet);
        gsppIfCompletion.insertText = "if(${1:condition}){\n\t${2:body}\n}\n${0}";
        var gsppElseIfCompletion = new CompletionItem('else if', CompletionItemKind.Snippet);
        gsppElseIfCompletion.insertText = 'else if(${1:condition}){\n\t${2:body}\n}\n${0}';
        var gsppElseCompletion = new CompletionItem('else', CompletionItemKind.Snippet);
        gsppElseCompletion.insertText = 'else{\n\t${1:body}\n}\n${0}';
        var gsppWhileCompletion = new CompletionItem("while", CompletionItemKind.Snippet);
        gsppWhileCompletion.insertText = "while(${1:condition}){\n\t${2:body}\n}\n${0}";
        var gsppFuncCompletion = new CompletionItem("func", CompletionItemKind.Snippet);
        gsppFuncCompletion.insertText = "(${1:params}) => {\n\t${2:body}\n}\n${0}";
        gsppItems = [gsppForCompletion, gsppIfCompletion, gsppElseIfCompletion, gsppElseCompletion, gsppWhileCompletion, gsppFuncCompletion];
    }
    //#endregion
    //#region gs snippets
    var gsItems;
    if (!gspp) {
        var gsForCompletion = new CompletionItem("for", CompletionItemKind.Snippet);
        gsForCompletion.insertText = "for ${1:var} in ${2:array}\n\t${3:body}\nend for\n${0}";
        var gsIfCompletion = new CompletionItem("if", CompletionItemKind.Snippet);
        gsIfCompletion.insertText = "if ${1:condition} then\n\t${2:body}\nend if\n${0}";
        var gsElseIfCompletion = new CompletionItem('else if', CompletionItemKind.Snippet);
        gsElseIfCompletion.insertText = 'else if ${1:condition} then\n\t${2:body}\nend if\n${0}';
        var gsElseCompletion = new CompletionItem('else', CompletionItemKind.Snippet);
        gsElseCompletion.insertText = 'else\n\t${1:body}\nend if\n${0}';
        var gsWhileCompletion = new CompletionItem("while", CompletionItemKind.Snippet);
        gsWhileCompletion.insertText = "while ${1:condition}\n\t${2:body}\nend while\n${0}";
        var gsFuncCompletion = new CompletionItem("func", CompletionItemKind.Snippet);
        gsFuncCompletion.insertText = "function(${1:params})\n\t${2:body}\nend function\n${0}";
        gsItems = [gsForCompletion, gsIfCompletion, gsElseIfCompletion, gsElseCompletion, gsWhileCompletion, gsFuncCompletion];
    }
    //#endregion
    //#region constants & keywords
    var trueCompletion = new CompletionItem("true", CompletionItemKind.Constant);
    var falseCompletion = new CompletionItem("false", CompletionItemKind.Constant);
    var nullCompletion = new CompletionItem("null", CompletionItemKind.Constant);
    var continueCompletion = new CompletionItem("continue", CompletionItemKind.Keyword);
    var breakCompletion = new CompletionItem("break", CompletionItemKind.Keyword);
    var selfCompletion = new CompletionItem("self", CompletionItemKind.Keyword);
    var returnCompletion = new CompletionItem('return', CompletionItemKind.Keyword);
    var globalsCompletion = new CompletionItem('globals', CompletionItemKind.Module);
    var localsCompletion = new CompletionItem('locals', CompletionItemKind.Module);
    //#endregion
    //#region operators
    var orCompletion = new CompletionItem("or", CompletionItemKind.Operator);
    var andCompletion = new CompletionItem("and", CompletionItemKind.Operator);
    var notCompletion = new CompletionItem("not", CompletionItemKind.Operator);
    var inCompletion = new CompletionItem("in", CompletionItemKind.Operator);
    //#endregion
    //#region data functions
    var removeCompletion = new CompletionItem("remove", CompletionItemKind.Function);
    removeCompletion.insertText = "remove(${1:item})";
    var hasIndexCompletion = new CompletionItem("hasIndex", CompletionItemKind.Function);
    hasIndexCompletion.insertText = "hasIndex(${1:index})";
    var indexOfCompletion = new CompletionItem("indexOf", CompletionItemKind.Function);
    indexOfCompletion.insertText = "indexOf(${1:item,${2:null}})";
    var lastIndexOfCompletion = new CompletionItem("lastIndexOf", CompletionItemKind.Function);
    lastIndexOfCompletion.insertText = "lastIndexOf(${1:item})";
    var sliceCompletion = new CompletionItem("slice", CompletionItemKind.Function);
    sliceCompletion.insertText = "slice(${1:string},${2:start},${3:null})";
    var splitCompletion = new CompletionItem("split", CompletionItemKind.Function);
    splitCompletion.insertText = "split(${1:separator})";
    var replaceCompletion = new CompletionItem("replace", CompletionItemKind.Function);
    replaceCompletion.insertText = "replace(${1:old},${2:new})";
    var trimCompletion = new CompletionItem("trim", CompletionItemKind.Function);
    trimCompletion.insertText = "trim()";
    var absCompletion = new CompletionItem("abs", CompletionItemKind.Function);
    absCompletion.insertText = "abs(${1:number})";
    var acosCompletion = new CompletionItem("acos", CompletionItemKind.Function);
    acosCompletion.insertText = "acos(${1:number})";
    var asinCompletion = new CompletionItem("asin", CompletionItemKind.Function);
    asinCompletion.insertText = "asin(${1:number})";
    var atanCompletion = new CompletionItem("atan", CompletionItemKind.Function);
    atanCompletion.insertText = "atan(${1:number})";
    var tanCompletion = new CompletionItem("tan", CompletionItemKind.Function);
    tanCompletion.insertText = "tan(${1:radian})";
    var cosCompletion = new CompletionItem("cos", CompletionItemKind.Function);
    cosCompletion.insertText = "cos(${1:radian})";
    var sinCompletion = new CompletionItem("sin", CompletionItemKind.Function);
    sinCompletion.insertText = "sin(${1:radian})";
    var charCompletion = new CompletionItem("char", CompletionItemKind.Function);
    charCompletion.insertText = "char(${1:int})";
    var floorCompletion = new CompletionItem("floor", CompletionItemKind.Function);
    floorCompletion.insertText = "floor(${1:number})";
    var rangeCompletion = new CompletionItem("range", CompletionItemKind.Function);
    rangeCompletion.insertText = "range(${1:start},${2:0},${3:1})";
    var roundCompletion = new CompletionItem("round", CompletionItemKind.Function);
    roundCompletion.insertText = "round(${1:number,${2:0}})";
    var rndCompletion = new CompletionItem("rnd", CompletionItemKind.Function);
    rndCompletion.insertText = "rnd(${1:null})";
    var signCompletion = new CompletionItem("sign", CompletionItemKind.Function);
    signCompletion.insertText = "sign(${1:number})";
    var sqrtCompletion = new CompletionItem("sqrt", CompletionItemKind.Function);
    sqrtCompletion.insertText = "sqrt(${1:number})";
    var strCompletion = new CompletionItem("str", CompletionItemKind.Function);
    strCompletion.insertText = "str(${1:var})";
    var ceilCompletion = new CompletionItem("ceil", CompletionItemKind.Function);
    ceilCompletion.insertText = "ceil(${1:number})";
    var joinCompletion = new CompletionItem("join", CompletionItemKind.Function);
    joinCompletion.insertText = "join(${1:separator})";
    var pushCompletion = new CompletionItem("push", CompletionItemKind.Function);
    pushCompletion.insertText = "push(${1:value})";
    var popCompletion = new CompletionItem("pop", CompletionItemKind.Function);
    popCompletion.insertText = "pop()";
    var pullCompletion = new CompletionItem("pull", CompletionItemKind.Function);
    pullCompletion.insertText = "pull()";
    var shuffleCompletion = new CompletionItem("shuffle", CompletionItemKind.Function);
    shuffleCompletion.insertText = "shuffle()";
    var reverseCompletion = new CompletionItem("reverse", CompletionItemKind.Function);
    reverseCompletion.insertText = "reverse()";
    var sortCompletion = new CompletionItem("sort", CompletionItemKind.Function);
    sortCompletion.insertText = "sort(${1:nul})";
    var sumCompletion = new CompletionItem("sum", CompletionItemKind.Function);
    sumCompletion.insertText = "sum()";
    //#endregion 
    //#region data properties
    var indexesCompletion = new CompletionItem("indexes", CompletionItemKind.Property);
    var codeCompletion = new CompletionItem("code", CompletionItemKind.Property);
    var lenCompletion = new CompletionItem("len", CompletionItemKind.Property);
    var lowerCompletion = new CompletionItem("lower", CompletionItemKind.Property);
    var upperCompletion = new CompletionItem("upper", CompletionItemKind.Property);
    var valCompletion = new CompletionItem("val", CompletionItemKind.Property);
    var valuesCompletion = new CompletionItem("values", CompletionItemKind.Property);
    var toIntCompletion = new CompletionItem("to_int", CompletionItemKind.Property);
    var piCompletion = new CompletionItem("pi", CompletionItemKind.Property);
    //#endregion
    var items = [
        //#region constants & keywords
        trueCompletion,
        falseCompletion,
        nullCompletion,
        continueCompletion,
        breakCompletion,
        selfCompletion,
        returnCompletion,
        globalsCompletion,
        localsCompletion,
        //#endregion
        //#region oprators
        orCompletion,
        andCompletion,
        notCompletion,
        inCompletion,
        //#endregion
        //#region data functions
        absCompletion,
        acosCompletion,
        asinCompletion,
        atanCompletion,
        ceilCompletion,
        charCompletion,
        floorCompletion,
        hasIndexCompletion,
        indexOfCompletion,
        joinCompletion,
        lastIndexOfCompletion,
        popCompletion,
        pullCompletion,
        pushCompletion,
        rangeCompletion,
        removeCompletion,
        replaceCompletion,
        reverseCompletion,
        rndCompletion,
        roundCompletion,
        shuffleCompletion,
        signCompletion,
        sinCompletion,
        sliceCompletion,
        sortCompletion,
        splitCompletion,
        sqrtCompletion,
        strCompletion,
        sumCompletion,
        tanCompletion,
        trimCompletion,
        //#endregion
        //#region data properties
        indexesCompletion,
        codeCompletion,
        lenCompletion,
        lowerCompletion,
        upperCompletion,
        valCompletion,
        valuesCompletion,
        toIntCompletion,
        piCompletion,
    ];
    var kind;
    var label;
    var snippet;
    var item;
    var members = apiMembers.split("\n");
    for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
        var member = members_1[_i];
        var splited = member.split(";");
        if (splited[0] == "Method") {
            kind = CompletionItemKind.Function;
        }
        else {
            kind = CompletionItemKind.Property;
        }
        label = splited[1];
        snippet = splited[2];
        item = new CompletionItem(label, kind);
        item.insertText = snippet;
        items.push(item);
    }
    if (gspp) {
        return items.concat(gsppItems);
    }
    else {
        return items.concat(gsItems);
    }
}
var apiMembers = "Property;params;params\nMethod;print;print(${1:data})\nMethod;wait;wait(${1:duration})\nProperty;time;time\nMethod;typeof;typeof(${1:var})\nMethod;md5;md5(${1:str})\nMethod;get_router;get_router(${1:IP})\nMethod;get_shell;get_shell(${1:user}, ${2:password})\nMethod;nslookup;nslookup(${1:domain})\nMethod;whois;whois(${1:IP})\nMethod;is_valid_ip;is_valid_ip(${1:string})\nMethod;is_lan_ip;is_lan_ip(${1:string})\nMethod;command_info;command_info(${1:ref})\nProperty;current_date;current_date\nProperty;current_path;current_path\nProperty;parent_path;parent_path\nProperty;home_dir;home_dir\nProperty;program_path;program_path\nProperty;active_user;active_user\nProperty;user_mail_address;user_mail_address\nProperty;user_bank_number;user_bank_number\nMethod;format_columns;format_columns(${1:str})\nMethod;user_input;user_input(${1:msg}, ${2:isPassword})\nMethod;include_lib;include_lib(${1:libpath})\nMethod;bitwise;bitwise(${1|\"&\",\"\\|\",\"^\",\"<<\",\">>\",\">>>\"|}, ${2:number}, ${3:number})\nProperty;clear_screen;clear_screen\nMethod;exit;exit(${1:null})\nProperty;public_ip;public_ip\nProperty;local_ip;local_ip\nMethod;device_ports;device_ports(${1:IP})\nProperty;computers_lan_ip;computers_lan_ip\nMethod;ping_port;ping_port(${1:port})\nMethod;port_info;port_info(${1:Port})\nProperty;used_ports;used_ports\nProperty;bssid_name;bssid_name\nProperty;essid_name;essid_name\nMethod;change_password;change_password(${1:user}, ${2:password})\nMethod;create_user;create_user(${1:user}, ${2:password})\nMethod;create_group;create_group(${1:username}, ${2:groupname})\nMethod;create_folder;create_folder(${1:path}, ${2:name})\nMethod;close_program;close_program(${1:pid})\nMethod;connect_wifi;connect_wifi(${1:interface}, ${2:bssid}, ${3:essid}, ${4:password})\nMethod;delete_user;delete_user(${1:user}, ${2:removeHome})\nMethod;delete_group;delete_group(${1:username}, ${2:groupname})\nMethod;groups;groups(${1:username})\nProperty;network_devices;network_devices\nProperty;get_ports;get_ports\nProperty;is_network_active;is_network_active\nProperty;lan_ip;lan_ip\nProperty;show_procs;show_procs\nMethod;touch;touch(${1:path}, ${2:filename})\nMethod;wifi_networks;wifi_networks(${1:interface})\nMethod;File;File(${1:path})\nMethod;copy;copy(${1:path}, ${2:newname})\nMethod;move;move(${1:path}, ${2:newname})\nMethod;rename;rename(${1:newname})\nMethod;chmod;chmod(${1:perms}, ${2:recursive})\nMethod;set_content;set_content(${1:content})\nMethod;set_group;set_group(${1:group}, ${2:recursive})\nProperty;group;group\nProperty;path;path\nProperty;content;content\nProperty;is_binary;is_binary\nProperty;is_folder;is_folder\nMethod;has_permission;has_permission(${1|\"r\",\"w\",\"x\"|})\nMethod;set_owner;set_owner(${1:owner}, ${2:recursive})\nProperty;owner;owner\nProperty;permissions;permissions\nProperty;parent;parent\nProperty;name;name\nProperty;size;size\nProperty;delete;delete\nProperty;get_folders;get_folders\nProperty;get_files;get_files\nProperty;get_lan_ip;get_lan_ip\nProperty;is_closed;is_closed\nProperty;port_number;port_number\nProperty;host_computer;host_computer\nProperty;start_terminal;start_terminal\nMethod;connect_service;connect_service(${1:IP}, ${2:port}, ${3:user}, ${4:pass}, ${5:service})\nMethod;scp;scp(${1:file}, ${2:folder}, ${3:shell})\nMethod;launch;launch(${1:program}, ${2:params})\nMethod;build;build(${1:srcpath}, ${2:buildpath})\nMethod;put;put(${1:file}, ${2:folder}, ${3:shell})\nMethod;aircrack;aircrack(${1:filepath})\nMethod;aireplay;aireplay(${1:bssid}, ${2:essid}, ${3:maxAcks})\nMethod;airmon;airmon(${1:option}, ${2:interface})\nMethod;decipher;decipher(${1:user}, ${2:encryptedPass})\nMethod;smtp_user_list;smtp_user_list(${1:IP}, ${2:port})\nMethod;overflow;overflow(${1:memoryAddress}, ${2:value}, ${3:extra})\nProperty;lib_name;lib_name\nProperty;version;version\nMethod;load;load(${1:library})\nMethod;net_use;net_use(${1:IP}, ${2:port})\nMethod;rshell_client;rshell_client(${1:IP}, ${2:port}, ${3:procName})\nProperty;rshell_server;rshell_server\nMethod;scan;scan(${1:MetaLib})\nMethod;scan_address;scan_address(${1:metalib}, ${2:memoryAddress})\nMethod;sniffer;sniffer(${1:saveEncSource})\nProperty;dump_lib;dump_lib";
function updateDecorations() {
    if (!editor)
        return;
    var text = editor.getValue();
    oldDecoration = editor.deltaDecorations(oldDecoration, getDecorationItems(text, editor));
}
function getDecorationItems(text, activeEditor) {
    var regEx = /(\$?".*?")|(\bif\b|\belse\b|\bfor\b|\bwhile\b|\bend if\b|\bend for\b|\bend while\b|\bin\b|\bthen\b|\breturn\b|\bbreak\b|\bcontinue\b|\band\b|\bor\b|\bnot\b)|(\bfunction\b|\bend function\b|\bself\b|\bnew\b|\btrue\b|\bfalse\b|\bnull\b)|(\b(?!function\b)([@_a-zA-Z][_a-zA-Z0-9]*)\s*\()|(\d+)|([@_a-zA-Z][_a-zA-Z0-9]*)|(\/\/.*$)/gm;
    var match;
    var matchIndex = 0;
    var output = [];
    var name = "";
    while ((match = regEx.exec(text))) {
        if (match[1]) {
            matchIndex = 1;
            var ranges = getStringFormatDecorations(match[1], activeEditor, match.index);
            var start_1 = activeEditor.getModel().getPositionAt(match.index);
            var end_1 = activeEditor.getModel().getPositionAt(match.index + match[matchIndex].length);
            var stringRange = new vRange(start_1, end_1);
            if (ranges.length > 0) {
                for (var i = 0; i < ranges.length; i++) {
                    var element = ranges[i];
                    output.push(new DecorationItem(new vRange(stringRange.start, element.end), "gspp-strings"));
                    if (i + 1 < ranges.length) {
                        stringRange = new vRange(element.end, ranges[i + 1].start);
                    }
                    else {
                        stringRange = new vRange(element.end, end_1);
                    }
                    output.push(new DecorationItem(element, "gspp-variables"));
                }
            }
            output.push(new DecorationItem(stringRange, "gspp-strings"));
            continue;
        }
        else if (match[2]) {
            matchIndex = 2;
            name = "gspp-keywords2";
        }
        else if (match[3]) {
            matchIndex = 3;
            name = "gspp-keywords";
        }
        else if (match[5]) {
            matchIndex = 5;
            name = "gspp-functions";
        }
        else if (match[6]) {
            matchIndex = 6;
            name = "gspp-numbers";
        }
        else if (match[7]) {
            matchIndex = 7;
            name = "gspp-variables";
        }
        else if (match[8]) {
            matchIndex = 8;
            name = "gspp-comments";
        }
        else {
            continue;
        }
        var start = activeEditor.getModel().getPositionAt(match.index);
        var end = activeEditor.getModel().getPositionAt(match.index + match[matchIndex].length);
        output.push(new DecorationItem(new vRange(start, end), name));
    }
    return output;
}
function getStringFormatDecorations(text, activeEditor, startIndex) {
    var regex = /{.*?}/g;
    var output = [];
    var match;
    while ((match = regex.exec(text))) {
        if (match) {
            var start = activeEditor.getModel().getPositionAt(match.index + startIndex);
            var end = activeEditor.getModel().getPositionAt(match.index + match[0].length + startIndex);
            output.push(new vRange(start, end));
        }
    }
    return output;
}
var editor;
var gsppCompletion;
var gsCompletion;
var oldDecoration = [];
var timeout = undefined;
monaco.languages.register({ id: "gspp" });
monaco.languages.register({ id: "gs" });
monaco.languages.registerCompletionItemProvider("gspp", {
    provideCompletionItems: function (model, position) {
        var out = getStaticItems(true);
        getCompletionItems(model.getValue(), undefined, out);
        return {
            suggestions: out
        };
    },
    triggerCharacters: [".", "_", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "(", "[", "{"]
});
function activateEditor(id) {
    var node = document.getElementById(id);
    if (node) {
        return monaco.editor.create(node, {
            theme: "vs-dark",
            language: "gspp",
            formatOnPaste: true,
            formatOnType: true
        });
    }
}
function setupEditor(id) {
    editor = activateEditor(id);
    editor.onDidChangeModelContent(function (x) { return triggerUpdateDecorations(); });
    var config = {
        comments: {
            lineComment: "//"
        },
        brackets: [
            ["{", "}"],
            ["[", "]"],
            ["(", ")"]
        ],
        autoClosingPairs: [
            { open: "{", close: "}" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: "'", close: "'", notIn: ["string", "comment"] },
            { open: "\"", close: "\"" },
            { open: "`", close: "`", notIn: ["string", "comment"] }
        ],
        autoCloseBefore: ";:.,=}])>` \n\t",
        surroundingPairs: [
            { open: "{", close: "}" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: "'", close: "'", notIn: ["string", "comment"] },
            { open: "\"", close: "\"" },
            { open: "`", close: "`", notIn: ["string", "comment"] }
        ],
        folding: {
            markers: {
                start: /^\\s*\/\/\\s*#?region\\b/,
                end: /^\\s*\/\/\\s*#?endregion\\b/
            }
        }
        //wordPattern: /(-?\\d*\\.\\d\\w*)|([^\\`\\~\\!\\@\\#\\%\\^\\&\\*\\(\\)\\-\\=\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\'\\\"\\,\\.\\<\\>\\\/\\?\\s]+)/
    };
    monaco.languages.setLanguageConfiguration("gspp", config);
    monaco.languages.setLanguageConfiguration("gs", config);
    gsppCompletion = getStaticItems(true);
    gsCompletion = getStaticItems(false);
}
function triggerUpdateDecorations() {
    updateDecorations();
}
//# sourceMappingURL=main.js.map
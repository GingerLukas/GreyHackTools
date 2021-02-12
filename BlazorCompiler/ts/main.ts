/// <reference path="../wwwroot/node_modules/monaco-editor/monaco.d.ts"/>

import CompletionItemKind = monaco.languages.CompletionItemKind;

class CompletionItem implements monaco.languages.CompletionItem {
    label: string | monaco.languages.CompletionItemLabel;
    kind: monaco.languages.CompletionItemKind;
    tags?: readonly monaco.languages.CompletionItemTag[];
    detail?: string;
    documentation?: string | monaco.IMarkdownString;
    sortText?: string;
    filterText?: string;
    preselect?: boolean;
    insertText: string;
    insertTextRules?: monaco.languages.CompletionItemInsertTextRule;
    range: monaco.IRange | { insert: monaco.IRange; replace: monaco.IRange; };
    commitCharacters?: string[];
    additionalTextEdits?: monaco.editor.ISingleEditOperation[];
    command?: monaco.languages.Command;

    constructor(label: string | monaco.languages.CompletionItemLabel,kind:monaco.languages.CompletionItemKind) {
        this.label = label;
        this.kind = kind;
        this.insertText = label.toString();
        this.insertTextRules = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
    }
}

class DecorationItem  implements monaco.editor.IModelDeltaDecoration{
    range: monaco.IRange;
    options: monaco.editor.IModelDecorationOptions;
    constructor(range: monaco.IRange, className: string) {
        this.range = range;
        this.options = { inlineClassName: className };
    }
}


class vRange implements monaco.IRange {
    constructor(start: monaco.Position, end: monaco.Position) {
        this.startColumn = start.column;
        this.startLineNumber = start.lineNumber;
        this.endColumn = end.column;
        this.endLineNumber = end.lineNumber;
        this.start = start;
        this.end = end;
    }
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    start: monaco.Position;
    end: monaco.Position;
}


function getCompletionItems(text: string, regEx?: RegExp, output?: CompletionItem[], words?: { [id: string]: { [id: number]: boolean } }) {
    if (regEx == undefined) regEx = /([_a-zA-Z][_a-zA-Z0-9]*)\s*=\s*((function\s*\((.*)\))|(\((.*)\)\s*=>)|(\(.*\))|(\[.*\])|(\{.*\})|(".*")|([0-9]+)|([_a-zA-Z][_a-zA-Z0-9]*))|(([_a-zA-Z][_a-zA-Z0-9]*)\s+in)/g;
    if (output == undefined) output = [];
    if (words == undefined) words = {};

    let match;
    let tempItem;
    while ((match = regEx.exec(text))) {
        //standard function || lambda
        if (match[3] || match[5]) {
            tempItem = new CompletionItem(match[1], monaco.languages.CompletionItemKind.Function);
            const params = match[4] || match[6];
            const fParams = [];
            if (params) {
                for (let param of params.split(",")) {
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

function getCompletionItemsInMap(text: string, regEx?: RegExp, output?: CompletionItem[], words?: { [id: string]: { [id: number]: boolean } }) {
    if (regEx == undefined) regEx = /(("?([_a-zA-Z][_a-zA-Z0-9]*)"?)|({[^}]*})|\d*)\s*:\s*(("?([_a-zA-Z][_a-zA-Z0-9]*)"?)|({[^}]*})|(\d*))/g;
    if (output == undefined) output = [];
    if (words == undefined) words = {};

    let match;
    let tempItem;
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

function tryAddItem(item: CompletionItem, output: CompletionItem[], words: { [id: string]: { [id: number]: boolean } }, opt?: string) {
    if (item && item.kind) {
        if (words[item.label.toString()] == undefined) words[item.label.toString()] = {};
        if (words[item.label.toString()][item.kind] == undefined) {
            words[item.label.toString()][item.kind] = true;
            output.push(item);
            if (item.kind == CompletionItemKind.Module && opt) getCompletionItemsInMap(opt, undefined, output, words);
        }
    }
}

function getParamsSnippet(params?: string[]) {
    if (!params)
        return "";

    const out = [];
    for (let index = 0; index < params.length; index++) {
        const param = params[index];
        out.push("${" + (index + 1) + ":" + param + "}");
    }

    return out.join(", ");
}

function getStaticItems(gspp: boolean) {

    //#region gspp snippets
    let gsppItems;
    if (gspp) {
        const gsppForCompletion = new CompletionItem("for", CompletionItemKind.Snippet);
        gsppForCompletion.insertText = "for(${1:var} in ${2:array}){\n\t${3:body}\n}\n${0}";

        const gsppIfCompletion = new CompletionItem("if", CompletionItemKind.Snippet);
        gsppIfCompletion.insertText = "if(${1:condition}){\n\t${2:body}\n}\n${0}";

        const gsppElseIfCompletion = new CompletionItem('else if', CompletionItemKind.Snippet);
        gsppElseIfCompletion.insertText = 'else if(${1:condition}){\n\t${2:body}\n}\n${0}';

        const gsppElseCompletion = new CompletionItem('else', CompletionItemKind.Snippet);
        gsppElseCompletion.insertText = 'else{\n\t${1:body}\n}\n${0}';

        const gsppWhileCompletion = new CompletionItem("while", CompletionItemKind.Snippet);
        gsppWhileCompletion.insertText = "while(${1:condition}){\n\t${2:body}\n}\n${0}";

        const gsppFuncCompletion = new CompletionItem("func", CompletionItemKind.Snippet);
        gsppFuncCompletion.insertText = "(${1:params}) => {\n\t${2:body}\n}\n${0}";

        gsppItems = [gsppForCompletion, gsppIfCompletion, gsppElseIfCompletion, gsppElseCompletion, gsppWhileCompletion, gsppFuncCompletion];
    }
    //#endregion

    //#region gs snippets
    let gsItems;
    if (!gspp) {
        const gsForCompletion = new CompletionItem("for", CompletionItemKind.Snippet);
        gsForCompletion.insertText = "for ${1:var} in ${2:array}\n\t${3:body}\nend for\n${0}";

        const gsIfCompletion = new CompletionItem("if", CompletionItemKind.Snippet);
        gsIfCompletion.insertText = "if ${1:condition} then\n\t${2:body}\nend if\n${0}";

        const gsElseIfCompletion = new CompletionItem('else if', CompletionItemKind.Snippet);
        gsElseIfCompletion.insertText = 'else if ${1:condition} then\n\t${2:body}\nend if\n${0}';

        const gsElseCompletion = new CompletionItem('else', CompletionItemKind.Snippet);
        gsElseCompletion.insertText = 'else\n\t${1:body}\nend if\n${0}';

        const gsWhileCompletion = new CompletionItem("while", CompletionItemKind.Snippet);
        gsWhileCompletion.insertText = "while ${1:condition}\n\t${2:body}\nend while\n${0}";

        const gsFuncCompletion = new CompletionItem("func", CompletionItemKind.Snippet);
        gsFuncCompletion.insertText = "function(${1:params})\n\t${2:body}\nend function\n${0}";

        gsItems = [gsForCompletion, gsIfCompletion, gsElseIfCompletion, gsElseCompletion, gsWhileCompletion, gsFuncCompletion];
    }
    //#endregion

    //#region constants & keywords
    const trueCompletion = new CompletionItem("true", CompletionItemKind.Constant);

    const falseCompletion = new CompletionItem("false", CompletionItemKind.Constant);

    const nullCompletion = new CompletionItem("null", CompletionItemKind.Constant);

    const continueCompletion = new CompletionItem("continue", CompletionItemKind.Keyword);

    const breakCompletion = new CompletionItem("break", CompletionItemKind.Keyword);

    const selfCompletion = new CompletionItem("self", CompletionItemKind.Keyword);

    const returnCompletion = new CompletionItem('return', CompletionItemKind.Keyword);

    const globalsCompletion = new CompletionItem('globals', CompletionItemKind.Module);

    const localsCompletion = new CompletionItem('locals', CompletionItemKind.Module);
    //#endregion

    //#region operators
    const orCompletion = new CompletionItem("or", CompletionItemKind.Operator);

    const andCompletion = new CompletionItem("and", CompletionItemKind.Operator);

    const notCompletion = new CompletionItem("not", CompletionItemKind.Operator);

    const inCompletion = new CompletionItem("in", CompletionItemKind.Operator);
    //#endregion

    //#region data functions
    const removeCompletion = new CompletionItem("remove", CompletionItemKind.Function);
    removeCompletion.insertText = "remove(${1:item})";

    const hasIndexCompletion = new CompletionItem("hasIndex", CompletionItemKind.Function);
    hasIndexCompletion.insertText = "hasIndex(${1:index})";

    const indexOfCompletion = new CompletionItem("indexOf", CompletionItemKind.Function);
    indexOfCompletion.insertText = "indexOf(${1:item,${2:null}})";

    const lastIndexOfCompletion = new CompletionItem("lastIndexOf", CompletionItemKind.Function);
    lastIndexOfCompletion.insertText = "lastIndexOf(${1:item})";

    const sliceCompletion = new CompletionItem("slice", CompletionItemKind.Function);
    sliceCompletion.insertText = "slice(${1:string},${2:start},${3:null})";

    const splitCompletion = new CompletionItem("split", CompletionItemKind.Function);
    splitCompletion.insertText = "split(${1:separator})";

    const replaceCompletion = new CompletionItem("replace", CompletionItemKind.Function);
    replaceCompletion.insertText = "replace(${1:old},${2:new})";

    const trimCompletion = new CompletionItem("trim", CompletionItemKind.Function);
    trimCompletion.insertText = "trim()";

    const absCompletion = new CompletionItem("abs", CompletionItemKind.Function);
    absCompletion.insertText = "abs(${1:number})";

    const acosCompletion = new CompletionItem("acos", CompletionItemKind.Function);
    acosCompletion.insertText = "acos(${1:number})";

    const asinCompletion = new CompletionItem("asin", CompletionItemKind.Function);
    asinCompletion.insertText = "asin(${1:number})";

    const atanCompletion = new CompletionItem("atan", CompletionItemKind.Function);
    atanCompletion.insertText = "atan(${1:number})";

    const tanCompletion = new CompletionItem("tan", CompletionItemKind.Function);
    tanCompletion.insertText = "tan(${1:radian})";

    const cosCompletion = new CompletionItem("cos", CompletionItemKind.Function);
    cosCompletion.insertText = "cos(${1:radian})";

    const sinCompletion = new CompletionItem("sin", CompletionItemKind.Function);
    sinCompletion.insertText = "sin(${1:radian})";

    const charCompletion = new CompletionItem("char", CompletionItemKind.Function);
    charCompletion.insertText = "char(${1:int})";

    const floorCompletion = new CompletionItem("floor", CompletionItemKind.Function);
    floorCompletion.insertText = "floor(${1:number})";

    const rangeCompletion = new CompletionItem("range", CompletionItemKind.Function);
    rangeCompletion.insertText = "range(${1:start},${2:0},${3:1})";

    const roundCompletion = new CompletionItem("round", CompletionItemKind.Function);
    roundCompletion.insertText = "round(${1:number,${2:0}})";

    const rndCompletion = new CompletionItem("rnd", CompletionItemKind.Function);
    rndCompletion.insertText = "rnd(${1:null})";

    const signCompletion = new CompletionItem("sign", CompletionItemKind.Function);
    signCompletion.insertText = "sign(${1:number})";

    const sqrtCompletion = new CompletionItem("sqrt", CompletionItemKind.Function);
    sqrtCompletion.insertText = "sqrt(${1:number})";

    const strCompletion = new CompletionItem("str", CompletionItemKind.Function);
    strCompletion.insertText = "str(${1:var})";

    const ceilCompletion = new CompletionItem("ceil", CompletionItemKind.Function);
    ceilCompletion.insertText = "ceil(${1:number})";

    const joinCompletion = new CompletionItem("join", CompletionItemKind.Function);
    joinCompletion.insertText = "join(${1:separator})";

    const pushCompletion = new CompletionItem("push", CompletionItemKind.Function);
    pushCompletion.insertText = "push(${1:value})";

    const popCompletion = new CompletionItem("pop", CompletionItemKind.Function);
    popCompletion.insertText = "pop()";

    const pullCompletion = new CompletionItem("pull", CompletionItemKind.Function);
    pullCompletion.insertText = "pull()";

    const shuffleCompletion = new CompletionItem("shuffle", CompletionItemKind.Function);
    shuffleCompletion.insertText = "shuffle()";

    const reverseCompletion = new CompletionItem("reverse", CompletionItemKind.Function);
    reverseCompletion.insertText = "reverse()";

    const sortCompletion = new CompletionItem("sort", CompletionItemKind.Function);
    sortCompletion.insertText = "sort(${1:nul})";

    const sumCompletion = new CompletionItem("sum", CompletionItemKind.Function);
    sumCompletion.insertText = "sum()";
    //#endregion 

    //#region data properties
    const indexesCompletion = new CompletionItem("indexes", CompletionItemKind.Property);

    const codeCompletion = new CompletionItem("code", CompletionItemKind.Property);

    const lenCompletion = new CompletionItem("len", CompletionItemKind.Property);

    const lowerCompletion = new CompletionItem("lower", CompletionItemKind.Property);

    const upperCompletion = new CompletionItem("upper", CompletionItemKind.Property);

    const valCompletion = new CompletionItem("val", CompletionItemKind.Property);

    const valuesCompletion = new CompletionItem("values", CompletionItemKind.Property);

    const toIntCompletion = new CompletionItem("to_int", CompletionItemKind.Property);

    const piCompletion = new CompletionItem("pi", CompletionItemKind.Property);
    //#endregion

    
    const items = [
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
        //#endregion
    ];


    let kind;
    let label;
    let snippet;
    let item;
    const members = apiMembers.split("\n");
    for (const member of members) {
        const splited = member.split(";");
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
    } else {
        return items.concat(gsItems);
    }
}

const apiMembers = `Property;params;params
Method;print;print(\${1:data})
Method;wait;wait(\${1:duration})
Property;time;time
Method;typeof;typeof(\${1:var})
Method;md5;md5(\${1:str})
Method;get_router;get_router(\${1:IP})
Method;get_shell;get_shell(\${1:user}, \${2:password})
Method;nslookup;nslookup(\${1:domain})
Method;whois;whois(\${1:IP})
Method;is_valid_ip;is_valid_ip(\${1:string})
Method;is_lan_ip;is_lan_ip(\${1:string})
Method;command_info;command_info(\${1:ref})
Property;current_date;current_date
Property;current_path;current_path
Property;parent_path;parent_path
Property;home_dir;home_dir
Property;program_path;program_path
Property;active_user;active_user
Property;user_mail_address;user_mail_address
Property;user_bank_number;user_bank_number
Method;format_columns;format_columns(\${1:str})
Method;user_input;user_input(\${1:msg}, \${2:isPassword})
Method;include_lib;include_lib(\${1:libpath})
Method;bitwise;bitwise(\${1|"&","\\|","^","<<",">>",">>>"|}, \${2:number}, \${3:number})
Property;clear_screen;clear_screen
Method;exit;exit(\${1:null})
Property;public_ip;public_ip
Property;local_ip;local_ip
Method;device_ports;device_ports(\${1:IP})
Property;computers_lan_ip;computers_lan_ip
Method;ping_port;ping_port(\${1:port})
Method;port_info;port_info(\${1:Port})
Property;used_ports;used_ports
Property;bssid_name;bssid_name
Property;essid_name;essid_name
Method;change_password;change_password(\${1:user}, \${2:password})
Method;create_user;create_user(\${1:user}, \${2:password})
Method;create_group;create_group(\${1:username}, \${2:groupname})
Method;create_folder;create_folder(\${1:path}, \${2:name})
Method;close_program;close_program(\${1:pid})
Method;connect_wifi;connect_wifi(\${1:interface}, \${2:bssid}, \${3:essid}, \${4:password})
Method;delete_user;delete_user(\${1:user}, \${2:removeHome})
Method;delete_group;delete_group(\${1:username}, \${2:groupname})
Method;groups;groups(\${1:username})
Property;network_devices;network_devices
Property;get_ports;get_ports
Property;is_network_active;is_network_active
Property;lan_ip;lan_ip
Property;show_procs;show_procs
Method;touch;touch(\${1:path}, \${2:filename})
Method;wifi_networks;wifi_networks(\${1:interface})
Method;File;File(\${1:path})
Method;copy;copy(\${1:path}, \${2:newname})
Method;move;move(\${1:path}, \${2:newname})
Method;rename;rename(\${1:newname})
Method;chmod;chmod(\${1:perms}, \${2:recursive})
Method;set_content;set_content(\${1:content})
Method;set_group;set_group(\${1:group}, \${2:recursive})
Property;group;group
Property;path;path
Property;content;content
Property;is_binary;is_binary
Property;is_folder;is_folder
Method;has_permission;has_permission(\${1|"r","w","x"|})
Method;set_owner;set_owner(\${1:owner}, \${2:recursive})
Property;owner;owner
Property;permissions;permissions
Property;parent;parent
Property;name;name
Property;size;size
Property;delete;delete
Property;get_folders;get_folders
Property;get_files;get_files
Property;get_lan_ip;get_lan_ip
Property;is_closed;is_closed
Property;port_number;port_number
Property;host_computer;host_computer
Property;start_terminal;start_terminal
Method;connect_service;connect_service(\${1:IP}, \${2:port}, \${3:user}, \${4:pass}, \${5:service})
Method;scp;scp(\${1:file}, \${2:folder}, \${3:shell})
Method;launch;launch(\${1:program}, \${2:params})
Method;build;build(\${1:srcpath}, \${2:buildpath})
Method;put;put(\${1:file}, \${2:folder}, \${3:shell})
Method;aircrack;aircrack(\${1:filepath})
Method;aireplay;aireplay(\${1:bssid}, \${2:essid}, \${3:maxAcks})
Method;airmon;airmon(\${1:option}, \${2:interface})
Method;decipher;decipher(\${1:user}, \${2:encryptedPass})
Method;smtp_user_list;smtp_user_list(\${1:IP}, \${2:port})
Method;overflow;overflow(\${1:memoryAddress}, \${2:value}, \${3:extra})
Property;lib_name;lib_name
Property;version;version
Method;load;load(\${1:library})
Method;net_use;net_use(\${1:IP}, \${2:port})
Method;rshell_client;rshell_client(\${1:IP}, \${2:port}, \${3:procName})
Property;rshell_server;rshell_server
Method;scan;scan(\${1:MetaLib})
Method;scan_address;scan_address(\${1:metalib}, \${2:memoryAddress})
Method;sniffer;sniffer(\${1:saveEncSource})
Property;dump_lib;dump_lib`;

function updateDecorations() {
    if (!editor) return;

    const text = editor.getValue();
    oldDecoration = editor.deltaDecorations(oldDecoration, getDecorationItems(text, editor));
}

function getDecorationItems(text: string, activeEditor: monaco.editor.IStandaloneCodeEditor) {
    const regEx = /(\$?".*?")|(\bif\b|\belse\b|\bfor\b|\bwhile\b|\bend if\b|\bend for\b|\bend while\b|\bin\b|\bthen\b|\breturn\b|\bbreak\b|\bcontinue\b|\band\b|\bor\b|\bnot\b)|(\bfunction\b|\bend function\b|\bself\b|\bnew\b|\btrue\b|\bfalse\b|\bnull\b)|(\b(?!function\b)([@_a-zA-Z][_a-zA-Z0-9]*)\s*\()|(\d+)|([@_a-zA-Z][_a-zA-Z0-9]*)|(\/\/.*$)/gm;
    let match;
    let matchIndex = 0;
    let output: DecorationItem[] = [];
    let name:string = "";
    while ((match = regEx.exec(text))) {
        if (match[1]) {
            matchIndex = 1;
            const ranges = getStringFormatDecorations(match[1], activeEditor, match.index);

            const start = activeEditor.getModel().getPositionAt(match.index);
            const end = activeEditor.getModel().getPositionAt(match.index + match[matchIndex].length);
            let stringRange = new vRange(start, end);

            if (ranges.length > 0) {
                for (let i = 0; i < ranges.length; i++) {
                    const element = ranges[i];
                    output.push(new DecorationItem(new vRange(stringRange.start, element.end), "gspp-strings"));
                    if (i + 1 < ranges.length) {
                        stringRange = new vRange(element.end, ranges[i + 1].start);
                    }
                    else {
                        stringRange = new vRange(element.end, end);
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

        const start = activeEditor.getModel().getPositionAt(match.index);
        const end = activeEditor.getModel().getPositionAt(match.index + match[matchIndex].length);
        output.push(new DecorationItem(new vRange(start,end), name));
    }

    return output;
}

function getStringFormatDecorations(text: string, activeEditor: monaco.editor.IStandaloneCodeEditor, startIndex: number) {
    const regex = /{.*?}/g;

    const output: vRange[] = [];

    let match;
    while ((match = regex.exec(text))) {
        if (match) {
            const start = activeEditor.getModel().getPositionAt(match.index + startIndex);
            const end = activeEditor.getModel().getPositionAt(match.index + match[0].length + startIndex);
            output.push(new vRange(start, end));
        }
    }

    return output;
}

var editor:monaco.editor.IStandaloneCodeEditor;
var gsppCompletion;
var gsCompletion;
let oldDecoration = [];
let timeout = undefined;


monaco.languages.register({ id: "gspp" });
monaco.languages.register({ id: "gs" });

monaco.languages.registerCompletionItemProvider("gspp", {
    provideCompletionItems: function (model, position) {
        const out = getStaticItems(true);
        getCompletionItems(model.getValue(), undefined, out);
        return {
            suggestions: out
        };
    }, triggerCharacters: [".", "_", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "(", "[", "{"]
});

function activateEditor(id: string) {
    const node = document.getElementById(id);
    if (node) {
        return monaco.editor.create(node, {
            theme: "vs-dark",
            language: "gspp",
            formatOnPaste: true,
            formatOnType: true
        });
    }
}

function setupEditor(id: string) {
    editor = activateEditor(id);
    editor.onDidChangeModelContent(x => triggerUpdateDecorations());
    const config: monaco.languages.LanguageConfiguration = {
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
            <monaco.languages.IAutoClosingPairConditional>{ open: "'", close: "'", notIn: ["string", "comment"] },
            { open: "\"", close: "\"" },
            <monaco.languages.IAutoClosingPairConditional>{ open: "`", close: "`", notIn: ["string", "comment"] }
        ],
        folding: {
            markers: {
                start: /^\\s*\/\/\\s*#?region\\b/,
                end: /^\\s*\/\/\\s*#?endregion\\b/
            }
        }
        //wordPattern: /(-?\\d*\\.\\d\\w*)|([^\\`\\~\\!\\@\\#\\%\\^\\&\\*\\(\\)\\-\\=\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\'\\\"\\,\\.\\<\\>\\\/\\?\\s]+)/
    }
    monaco.languages.setLanguageConfiguration("gspp", config);
    monaco.languages.setLanguageConfiguration("gs", config);
    gsppCompletion = getStaticItems(true);
    gsCompletion = getStaticItems(false);
}

function triggerUpdateDecorations() {
    updateDecorations();
}



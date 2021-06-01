import * as vscode from 'vscode';
import { CompletionItem } from "./types"

let loaded = false;
let gsppStaticItems: CompletionItem[] = [];
let gsStaticItems: CompletionItem[] = [];

export function getStaticItems(gspp: boolean) {

    const includeCompletion = new CompletionItem("include", vscode.CompletionItemKind.Snippet);
    includeCompletion.insertText = new vscode.SnippetString('#include "${1}"${0}');

    const defineCompletion = new CompletionItem("define", vscode.CompletionItemKind.Snippet);
    defineCompletion.insertText = new vscode.SnippetString('#define ${1} ${2}');

    const undefCompletion = new CompletionItem("undef", vscode.CompletionItemKind.Snippet);
    undefCompletion.insertText = new vscode.SnippetString('#undef ${1}');

    const cifCompletion = new CompletionItem("if", vscode.CompletionItemKind.Snippet);
    cifCompletion.insertText = new vscode.SnippetString('#if ${1}\n\t${2}\n#endif${0}');

    const celifCompletion = new CompletionItem("elif", vscode.CompletionItemKind.Snippet);
    celifCompletion.insertText = new vscode.SnippetString('#elif ${1}');

    const ifndefCompletion = new CompletionItem("ifndef", vscode.CompletionItemKind.Snippet);
    ifndefCompletion.insertText = new vscode.SnippetString('#ifndef ${1}\n\t${2}\n#endif');

    const pragmaCompletion = new CompletionItem("once", vscode.CompletionItemKind.Snippet);
    pragmaCompletion.insertText = new vscode.SnippetString('#ifndef ${1}\n#define ${1}\n\n#endif');

    const timeCompletion = new CompletionItem("__TIME__", vscode.CompletionItemKind.Snippet);
    timeCompletion.insertText = new vscode.SnippetString('__TIME__');

    const dateCompletion = new CompletionItem("__DATE__", vscode.CompletionItemKind.Snippet);
    dateCompletion.insertText = new vscode.SnippetString('__DATE__');

    const lineCompletion = new CompletionItem("__LINE__", vscode.CompletionItemKind.Snippet);
    lineCompletion.insertText = new vscode.SnippetString('__LINE__');

    const fileCompletion = new CompletionItem("__FILE__", vscode.CompletionItemKind.Snippet);
    fileCompletion.insertText = new vscode.SnippetString('__FILE__');

    const enumCompletion = new CompletionItem("enum", vscode.CompletionItemKind.Snippet);
    enumCompletion.insertText = new vscode.SnippetString('#enum\n\t${1}\n#endenum');



    //#region gspp snippets
    const gsppForCompletion = new CompletionItem('for', vscode.CompletionItemKind.Snippet);
    gsppForCompletion.insertText = new vscode.SnippetString('for(${1:var} in ${2:array}){\n\t${3:body}\n}${0}');

    const gsppIfCompletion = new CompletionItem('if', vscode.CompletionItemKind.Snippet);
    gsppIfCompletion.insertText = new vscode.SnippetString('if(${1:condition}){\n\t${2:body}\n}${0}');

    const gsppElseIfCompletion = new CompletionItem('else if', vscode.CompletionItemKind.Snippet);
    gsppElseIfCompletion.insertText = new vscode.SnippetString('else if(${1:condition}){\n\t${2:body}\n}${0}');

    const gsppElseCompletion = new CompletionItem('else', vscode.CompletionItemKind.Snippet);
    gsppElseCompletion.insertText = new vscode.SnippetString('else{\n\t${1:body}\n}${0}');

    const gsppWhileCompletion = new CompletionItem('while', vscode.CompletionItemKind.Snippet);
    gsppWhileCompletion.insertText = new vscode.SnippetString('while(${1:condition}){\n\t${2:body}\n}${0}');

    const gsppFuncCompletion = new CompletionItem('func', vscode.CompletionItemKind.Snippet);
    gsppFuncCompletion.insertText = new vscode.SnippetString('(${1:params}) => {\n\t${2:body}\n}${0}');

    const gsppItems = [gsppForCompletion, gsppIfCompletion, gsppElseIfCompletion, gsppElseCompletion, gsppWhileCompletion, gsppFuncCompletion,
        //#region preprocessor
        includeCompletion,
        defineCompletion,
        undefCompletion,
        cifCompletion,
        celifCompletion,
        ifndefCompletion,
        pragmaCompletion,
        timeCompletion,
        dateCompletion,
        lineCompletion,
        fileCompletion,
        enumCompletion,
        //#endregion
    ];
    //#endregion

    //#region gs snippets
    const gsForCompletion = new CompletionItem('for', vscode.CompletionItemKind.Snippet);
    gsForCompletion.insertText = new vscode.SnippetString('for ${1:var} in ${2:array}\n\t${3:body}\nend for${0}');

    const gsIfCompletion = new CompletionItem('if', vscode.CompletionItemKind.Snippet);
    gsIfCompletion.insertText = new vscode.SnippetString('if ${1:condition} then\n\t${2:body}\nend if${0}');

    const gsElseIfCompletion = new CompletionItem('else if', vscode.CompletionItemKind.Snippet);
    gsElseIfCompletion.insertText = new vscode.SnippetString('else if ${1:condition} then\n\t${2:body}\nend if${0}');

    const gsElseCompletion = new CompletionItem('else', vscode.CompletionItemKind.Snippet);
    gsElseCompletion.insertText = new vscode.SnippetString('else\n\t${1:body}\nend if${0}');

    const gsWhileCompletion = new CompletionItem('while', vscode.CompletionItemKind.Snippet);
    gsWhileCompletion.insertText = new vscode.SnippetString('while ${1:condition}\n\t${2:body}\nend while${0}');

    const gsFuncCompletion = new CompletionItem('func', vscode.CompletionItemKind.Snippet);
    gsFuncCompletion.insertText = new vscode.SnippetString('function(${1:params})\n\t${2:body}\nend function${0}');

    const gsItems = [gsForCompletion, gsIfCompletion, gsElseIfCompletion, gsElseCompletion, gsWhileCompletion, gsFuncCompletion];
    //#endregion

    const inlineFuncCompletion = new CompletionItem("ifunc", vscode.CompletionItemKind.Snippet);
    inlineFuncCompletion.insertText = new vscode.SnippetString("(${1:params}) => {${2:body}}${0}");

    //#region constants & keywords
    const trueCompletion = new CompletionItem('true', vscode.CompletionItemKind.Constant);

    const falseCompletion = new CompletionItem('false', vscode.CompletionItemKind.Constant);

    const nullCompletion = new CompletionItem('null', vscode.CompletionItemKind.Constant);

    const continueCompletion = new CompletionItem('continue', vscode.CompletionItemKind.Keyword);

    const breakCompletion = new CompletionItem('break', vscode.CompletionItemKind.Keyword);

    const selfCompletion = new CompletionItem('self', vscode.CompletionItemKind.Keyword);

    const returnCompletion = new CompletionItem('return', vscode.CompletionItemKind.Keyword);

    const globalsCompletion = new CompletionItem('globals', vscode.CompletionItemKind.Module);

    const localsCompletion = new CompletionItem('locals', vscode.CompletionItemKind.Module);
    //#endregion

    //#region operators
    const orCompletion = new CompletionItem('or', vscode.CompletionItemKind.Operator);

    const andCompletion = new CompletionItem('and', vscode.CompletionItemKind.Operator);

    const notCompletion = new CompletionItem('not', vscode.CompletionItemKind.Operator);

    const inCompletion = new CompletionItem('in', vscode.CompletionItemKind.Operator);
    //#endregion

    //#region data functions
    const removeCompletion = new CompletionItem('remove', vscode.CompletionItemKind.Function);
    removeCompletion.insertText = new vscode.SnippetString('remove(${1:item})');

    const hasIndexCompletion = new CompletionItem('hasIndex', vscode.CompletionItemKind.Function);
    hasIndexCompletion.insertText = new vscode.SnippetString('hasIndex(${1:index})');

    const indexOfCompletion = new CompletionItem('indexOf', vscode.CompletionItemKind.Function);
    indexOfCompletion.insertText = new vscode.SnippetString('indexOf(${1:item},${2:null})');

    const lastIndexOfCompletion = new CompletionItem('lastIndexOf', vscode.CompletionItemKind.Function);
    lastIndexOfCompletion.insertText = new vscode.SnippetString('lastIndexOf(${1:item})');

    const sliceCompletion = new CompletionItem('slice', vscode.CompletionItemKind.Function);
    sliceCompletion.insertText = new vscode.SnippetString('slice(${1:string},${2:start},${3:null})');

    const splitCompletion = new CompletionItem('split', vscode.CompletionItemKind.Function);
    splitCompletion.insertText = new vscode.SnippetString('split(${1:separator})');

    const replaceCompletion = new CompletionItem('replace', vscode.CompletionItemKind.Function);
    replaceCompletion.insertText = new vscode.SnippetString('replace(${1:old},${2:new})');

    const trimCompletion = new CompletionItem('trim', vscode.CompletionItemKind.Function);
    trimCompletion.insertText = new vscode.SnippetString('trim()');

    const absCompletion = new CompletionItem('abs', vscode.CompletionItemKind.Function);
    absCompletion.insertText = new vscode.SnippetString('abs(${1:number})');

    const acosCompletion = new CompletionItem('acos', vscode.CompletionItemKind.Function);
    acosCompletion.insertText = new vscode.SnippetString('acos(${1:number})');

    const asinCompletion = new CompletionItem('asin', vscode.CompletionItemKind.Function);
    asinCompletion.insertText = new vscode.SnippetString('asin(${1:number})');

    const atanCompletion = new CompletionItem('atan', vscode.CompletionItemKind.Function);
    atanCompletion.insertText = new vscode.SnippetString('atan(${1:number})');

    const tanCompletion = new CompletionItem('tan', vscode.CompletionItemKind.Function);
    tanCompletion.insertText = new vscode.SnippetString('tan(${1:radian})');

    const cosCompletion = new CompletionItem('cos', vscode.CompletionItemKind.Function);
    cosCompletion.insertText = new vscode.SnippetString('cos(${1:radian})');

    const sinCompletion = new CompletionItem('sin', vscode.CompletionItemKind.Function);
    sinCompletion.insertText = new vscode.SnippetString('sin(${1:radian})');

    const charCompletion = new CompletionItem('char', vscode.CompletionItemKind.Function);
    charCompletion.insertText = new vscode.SnippetString('char(${1:int})');

    const floorCompletion = new CompletionItem('floor', vscode.CompletionItemKind.Function);
    floorCompletion.insertText = new vscode.SnippetString('floor(${1:number})');

    const rangeCompletion = new CompletionItem('range', vscode.CompletionItemKind.Function);
    rangeCompletion.insertText = new vscode.SnippetString('range(${1:start},${2:0},${3:1})');

    const roundCompletion = new CompletionItem('round', vscode.CompletionItemKind.Function);
    roundCompletion.insertText = new vscode.SnippetString('round(${1:number,${2:0}})');

    const rndCompletion = new CompletionItem('rnd', vscode.CompletionItemKind.Function);
    rndCompletion.insertText = new vscode.SnippetString('rnd(${1:null})');

    const signCompletion = new CompletionItem('sign', vscode.CompletionItemKind.Function);
    signCompletion.insertText = new vscode.SnippetString('sign(${1:number})');

    const sqrtCompletion = new CompletionItem('sqrt', vscode.CompletionItemKind.Function);
    sqrtCompletion.insertText = new vscode.SnippetString('sqrt(${1:number})');

    const strCompletion = new CompletionItem('str', vscode.CompletionItemKind.Function);
    strCompletion.insertText = new vscode.SnippetString('str(${1:var})');

    const ceilCompletion = new CompletionItem('ceil', vscode.CompletionItemKind.Function);
    ceilCompletion.insertText = new vscode.SnippetString('ceil(${1:number})');

    const joinCompletion = new CompletionItem('join', vscode.CompletionItemKind.Function);
    joinCompletion.insertText = new vscode.SnippetString('join(${1:separator})');

    const pushCompletion = new CompletionItem('push', vscode.CompletionItemKind.Function);
    pushCompletion.insertText = new vscode.SnippetString('push(${1:value})');

    const popCompletion = new CompletionItem('pop', vscode.CompletionItemKind.Function);
    popCompletion.insertText = new vscode.SnippetString('pop()');

    const pullCompletion = new CompletionItem('pull', vscode.CompletionItemKind.Function);
    pullCompletion.insertText = new vscode.SnippetString('pull()');

    const shuffleCompletion = new CompletionItem('shuffle', vscode.CompletionItemKind.Function);
    shuffleCompletion.insertText = new vscode.SnippetString('shuffle()');

    const reverseCompletion = new CompletionItem('reverse', vscode.CompletionItemKind.Function);
    reverseCompletion.insertText = new vscode.SnippetString('reverse()');

    const sortCompletion = new CompletionItem('sort', vscode.CompletionItemKind.Function);
    sortCompletion.insertText = new vscode.SnippetString('sort(${1:null})');

    const sumCompletion = new CompletionItem('sum', vscode.CompletionItemKind.Function);
    sumCompletion.insertText = new vscode.SnippetString('sum()');
    //#endregion 

    //#region data properties
    const indexesCompletion = new CompletionItem('indexes', vscode.CompletionItemKind.Property);

    const codeCompletion = new CompletionItem('code', vscode.CompletionItemKind.Property);

    const lenCompletion = new CompletionItem('len', vscode.CompletionItemKind.Property);

    const lowerCompletion = new CompletionItem('lower', vscode.CompletionItemKind.Property);

    const upperCompletion = new CompletionItem('upper', vscode.CompletionItemKind.Property);

    const valCompletion = new CompletionItem('val', vscode.CompletionItemKind.Property);

    const valuesCompletion = new CompletionItem('values', vscode.CompletionItemKind.Property);

    const toIntCompletion = new CompletionItem('to_int', vscode.CompletionItemKind.Property);

    const piCompletion = new CompletionItem('pi', vscode.CompletionItemKind.Property);
    //#endregion



    loaded = true;
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
        inlineFuncCompletion,
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
    const members = apiMembers.split('\n');
    for (const member of members) {
        const splited = member.split(';');
        if (splited[0] == "Method") {
            kind = vscode.CompletionItemKind.Function;
        }
        else {
            kind = vscode.CompletionItemKind.Property;
        }
        label = splited[1];
        snippet = splited[2];
        item = new CompletionItem(label, kind);
        item.insertText = new vscode.SnippetString(snippet);
        items.push(item);
    }

    gsppStaticItems = items.concat(gsppItems);
    gsStaticItems = items.concat(gsItems);

    if (gspp) {
        return gsppStaticItems;
    }
    return gsStaticItems;
}



const apiMembers = `Property;params;params
Method;print;print(\${1:data})
Method;wait;wait(\${1:duration})
Property;time;time
Method;typeof;typeof(\${1:var})
Method;md5;md5(\${1:str})
Method;get_router;get_router(\${1:IP})
Method;get_switch;get_switch(\${1:IP})
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
Property;devices_lan_ip;devices_lan_ip
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
Property;get_content;get_content
Property;is_binary;is_binary
Property;is_folder;is_folder
Method;has_permission;has_permission(\${1|"r","w","x"|})
Method;set_owner;set_owner(\${1:owner}, \${2:recursive})
Property;owner;owner
Property;permissions;permissions
Property;parent;parent
Property;name;name
Property;size;size
Method;delete;delete()
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
Property;launch_path;launch_path
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
'use strict';

import * as vscode from 'vscode';
import { posix } from 'path';
import { CompilerMenuProvider, CompilerMenuItem, CompilerSettings } from './treeViewMenu';
import { getStaticItems } from './staticCompletionItems';
import * as decorations from './decorations';

import "./bridge";
import "./bridge.meta";
import "./newtonsoft.json";
import "./JsMSppCompiler";
import "./JsMSppCompiler.meta";



export function activate(context: vscode.ExtensionContext) {

    //#region init
    console.log('GS++ extension loaded');
    let timeout: NodeJS.Timer | undefined = undefined;
    
    let initialized = false;
    const compilerSettings = new CompilerSettings();

    const compilerMenu = new CompilerMenuProvider([
        new CompilerMenuItem("Optimize", vscode.TreeItemCollapsibleState.None, (node) => {
            node.setState(compilerSettings.toggleOptimize());
            compilerMenu.refresh();
        }, compilerSettings.Optimize),

        new CompilerMenuItem("Ignore Map Indexes", vscode.TreeItemCollapsibleState.None, (node) => {
            node.setState(compilerSettings.toggleIgnoreMapIndexes());
            compilerMenu.refresh();
        }, compilerSettings.IgnoreMapIndexes),

        new CompilerMenuItem("Remove Comments", vscode.TreeItemCollapsibleState.None, (node) => {
            node.setState(compilerSettings.toggleRemoveComments());
            compilerMenu.refresh();
        }, compilerSettings.RemoveComments),
    ]);

    vscode.commands.registerCommand('gspp.settings.toggle', (node: CompilerMenuItem) => {
        node.callback(node);
    });

    context.subscriptions.push(vscode.commands.registerCommand('gspp.compile', _ => {
        if (!vscode.workspace.workspaceFolders) {
			return vscode.window.showInformationMessage('No folder or workspace opened');
		}

        const document = vscode.window.activeTextEditor?.document;
        if (document == undefined) return;
        document.save();
        const folder = vscode.workspace.getWorkspaceFolder(document.uri);
        if (folder == undefined) return;
        const compiledCode = compile(document.getText(), compilerSettings.Optimize, compilerSettings.getSettings());


        const folderUri = vscode.workspace.getWorkspaceFolder(document.uri)?.uri;
        if (folderUri == undefined) {
            return;
        }
        const name = posix.basename(vscode.Uri.file(document.fileName).path);
        const fileUri = folderUri.with({path: posix.join(folderUri.path, "out", name)});

        vscode.workspace.fs.writeFile(fileUri, Buffer.from(compiledCode)).then(x => {
            vscode.workspace.openTextDocument(fileUri.fsPath).then(doc => {
                vscode.window.showTextDocument(doc, 1, false);
            });
        });
    }));

    context.subscriptions.push(vscode.commands.registerCommand('gspp.init', _ => {
        if (initialized) {
            return;
        }
        initialized = true;
    }));

    vscode.window.registerTreeDataProvider('gsppCompilerSettings', compilerMenu);
    vscode.window.createTreeView('gsppCompilerSettings', { treeDataProvider: compilerMenu });

    //#endregion
    
    //#region snippets
    const staticGSppCompletionItems = getStaticItems(true);
    const staticGSCompletionItems = getStaticItems(false);

    const gsppProvider = vscode.languages.registerCompletionItemProvider('gspp', {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
            
            const out = [
                ...staticGSppCompletionItems
            ];
            if (vscode.window.activeTextEditor != undefined) {
                const text = vscode.window.activeTextEditor?.document.getText();
                getCompletionItems(text, undefined, out);
            }
            return out;
        }
    }, ..."._abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ([{");
    
    const gsProvider = vscode.languages.registerCompletionItemProvider('gs', {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
            
            const out = [
                ...staticGSCompletionItems
            ];
            if (vscode.window.activeTextEditor != undefined) {
                const text = vscode.window.activeTextEditor?.document.getText();
                getCompletionItems(text, undefined, out);
            }
            return out;
        }
    }, ..."._abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ([{");

    context.subscriptions.push(gsppProvider, gsProvider);

    //#endregion

    let activeEditor = vscode.window.activeTextEditor;
    function updateDecorations() {
        if (!activeEditor) return;
        
        const text = activeEditor.document.getText();

        const decor = getDecorationItems(text, activeEditor);

        activeEditor.setDecorations(decorations.functions, decor.functions);
        activeEditor.setDecorations(decorations.keywords, decor.keywords);
        activeEditor.setDecorations(decorations.keywords2, decor.keywords2);
        activeEditor.setDecorations(decorations.strings, decor.strings);
        activeEditor.setDecorations(decorations.numbers, decor.numbers);
        activeEditor.setDecorations(decorations.variables, decor.variables);
        activeEditor.setDecorations(decorations.comments, decor.comments);
    }

    function triggerUpdateDecorations() {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}
		timeout = setTimeout(updateDecorations, 500);
	}

	if (activeEditor) {
		triggerUpdateDecorations();
	}

	vscode.window.onDidChangeActiveTextEditor(editor => {
		activeEditor = editor;
		if (editor) {
			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(event => {
		if (activeEditor && event.document === activeEditor.document) {
			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);


}

function compile(code: string, optimize: boolean, settings: number):string {
    //@ts-ignore
    return GreyHackTools.GreyHackCompiler.Compile(code, optimize, settings);
}

function getCompletionItems(text: string,regEx?:RegExp, output?:vscode.CompletionItem[], words?:{ [id: string]: { [id: number]: boolean } }) {
    if (regEx == undefined) regEx = /([_a-zA-Z][_a-zA-Z0-9]*)\s*=\s*((function\s*\((.*)\))|(\((.*)\)\s*=>)|(\(.*\))|(\[.*\])|(\{.*\})|(".*")|([0-9]+)|([_a-zA-Z][_a-zA-Z0-9]*))|(([_a-zA-Z][_a-zA-Z0-9]*)\s+in)/g;
    if (output == undefined) output = [];
    if (words == undefined) words = {};

    let match;
    let tempItem;
    while ((match = regEx.exec(text))) {
        //standard function || lambda
        if (match[3] || match[5]) {
            tempItem = new vscode.CompletionItem(match[1], vscode.CompletionItemKind.Function);
            const params = match[4] || match[6];
            const fParams = [];
            if (params) {
                for (let param of params.split(",")) {
                    param = param.trim();
                    fParams.push(param);
                    tryAddItem(new vscode.CompletionItem(param, vscode.CompletionItemKind.Variable), output, words);
                }
            }
            tempItem.insertText = new vscode.SnippetString(match[1] + '('+getParamsSnippet(fParams)+')');
        }
        //bracket || array || variable
        else if (match[7] || match[8] || match[12]) {
            tempItem = new vscode.CompletionItem(match[1], vscode.CompletionItemKind.Variable);
        }
        //map
        else if (match[9]) {
            tempItem = new vscode.CompletionItem(match[1], vscode.CompletionItemKind.Module);
        }
        //string || number
        else if (match[10] || match[11]) {
            tempItem = new vscode.CompletionItem(match[1], vscode.CompletionItemKind.Value);
        }
        //iterator
        else if (match[13]) {
            tempItem = new vscode.CompletionItem(match[14], vscode.CompletionItemKind.Variable);
        }
        if (tempItem) tryAddItem(tempItem, output, words, match[2]);
    }
    return output;
}

function getCompletionItemsInMap(text: string, regEx?: RegExp, output?: vscode.CompletionItem[], words?:{ [id: string]: { [id: number]: boolean } }){
    if (regEx == undefined) regEx = /(("?([_a-zA-Z][_a-zA-Z0-9]*)"?)|({[^}]*})|\d*)\s*:\s*(("?([_a-zA-Z][_a-zA-Z0-9]*)"?)|({[^}]*})|\d*)/g;
    if (output == undefined) output = [];
    if (words == undefined) words = {};

    let match;
    let tempItem;
    while ((match = regEx.exec(text))) {
        if (match[3] != undefined) {
            //string
            if(match[6] || match[9]){
                tempItem = new vscode.CompletionItem(match[3], vscode.CompletionItemKind.Value);
            }
            //map
            else if (match[8]) {
                tempItem = new vscode.CompletionItem(match[3], vscode.CompletionItemKind.Module);
            }
            
        }
        if (tempItem) tryAddItem(tempItem, output, words, match[5]);
    }

    return output;
}

function tryAddItem(item: vscode.CompletionItem, output: vscode.CompletionItem[], words: { [id: string]: { [id: number]: boolean } }, opt?: string) {
    if (item && item.kind) {
        if (words[item.label] == undefined) words[item.label] = {};
        if (words[item.label][item.kind] == undefined) {
            words[item.label][item.kind] = true;
            output.push(item);
            if (item.kind == vscode.CompletionItemKind.Module && opt) getCompletionItemsInMap(opt, undefined, output, words);
        }
    }
}

function getParamsSnippet(params?:string[]) {
    if (!params)
        return "";
    
    const out = [];
    for (let index = 0; index < params.length; index++) {
        const param = params[index];
        out.push('${' + (index + 1) + ':' + param + '}');
    }
    
    return out.join(', ');
}

function getDecorationItems(text: string, activeEditor: vscode.TextEditor) {
    const regEx = /(".*?")|(if|for|while|end if|end for|end while|\bin\b|then|return|break|continue|and|or|not)|(function|end function|self|new|true|false|null)|(\b(?!function\b)([_a-zA-Z][_a-zA-Z0-9]*)\s*\()|(\d+)|([_a-zA-Z][_a-zA-Z0-9]*)|(\/\/.*$)/gm;
    let match;

    const strings: vscode.Range[] = [];
    const keywords: vscode.Range[] = [];
    const keywords2: vscode.Range[] = [];
    const functions: vscode.Range[] = [];
    const numbers: vscode.Range[] = [];
    const variables: vscode.Range[] = [];
    const comments: vscode.Range[] = [];
    let matchIndex = 0;
    let output: vscode.Range[] = [];
    while ((match = regEx.exec(text))) {
        if (match[1]) {
            matchIndex = 1;
            output = strings;
        }
        else if (match[2]) {
            matchIndex = 2;
            output = keywords2;
        }
        else if (match[3]) {
            matchIndex = 3;
            output = keywords;
        }
        else if (match[5]) {
            matchIndex = 5;
            output = functions;
        }
        else if (match[6]) {
            matchIndex = 6;
            output = numbers;
        }
        else if (match[7]) {
            matchIndex = 7;
            output = variables;
        }
        else if (match[8]) {
            matchIndex = 8;
            output = comments;
        }
        else {
            continue;
        }
        const start = activeEditor.document.positionAt(match.index);
        const end = activeEditor.document.positionAt(match.index + match[matchIndex].length);
        output.push(new vscode.Range(start, end));
    }

    return { functions: functions, keywords: keywords, keywords2: keywords2, strings: strings, numbers: numbers, variables: variables, comments: comments };
}

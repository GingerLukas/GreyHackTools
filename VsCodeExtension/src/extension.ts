'use strict';

import * as vscode from 'vscode';
import { posix } from 'path';
import { CompilerMenuProvider, CompilerMenuItem, CompilerSettings } from './treeViewMenu';

import "./bridge";
import "./bridge.meta";
import "./newtonsoft.json";
import "./JsMSppCompiler";
import "./JsMSppCompiler.meta";
import { strict } from 'assert';



export function activate(context: vscode.ExtensionContext) {

    console.log('G++ Compiler loaded');
    
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

    vscode.commands.registerCommand('gpp.settings.toggle', (node: CompilerMenuItem) => {
        node.callback(node);
    });

    context.subscriptions.push(vscode.commands.registerCommand('gpp.compile', _ => {
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

    context.subscriptions.push(vscode.commands.registerCommand('gpp.init', _ => {
        if (initialized) {
            return;
        }
        initialized = true;
    }));

    vscode.window.registerTreeDataProvider('gppCompilerSettings', compilerMenu);
    vscode.window.createTreeView('gppCompilerSettings', { treeDataProvider: compilerMenu });
}

function compile(code: string, optimize: boolean, settings: number):string {
    //@ts-ignore
    return GreyHackTools.GreyHackCompiler.Compile(code, optimize, settings);
}

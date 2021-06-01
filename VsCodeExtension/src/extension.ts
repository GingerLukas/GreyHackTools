"use strict";

import * as vscode from "vscode";
import { posix } from "path";
import {
  CompilerMenuProvider,
  CompilerMenuItem,
  CompilerSettings,
} from "./treeViewMenu";
import { CompletionItem, GRange, ExternalCompletionCollection, ExternalSrc } from "./types"
import { getStaticItems } from "./staticCompletionItems";
import * as preprocessor from "c-preprocessor";

enum CompileSettings {
  NONE = 0,
}


var CompileGSpp = function (code: string, optimize: Boolean, flags: CompileSettings): string {
  return "NOT BINDED";
}

global["Module"] = undefined;
var Module: IMonoModule;
global["MONO"] = undefined;
global["App"] = {
  init() {
    Module = global["Module"];
    CompileGSpp = Module.mono_bind_static_method(
      "[GreyHackTools] GreyHackTools.GreyHackCompiler:Compile"
    );

    global["CompileGSpp"] = CompileGSpp; //debug only

    console.log("test from wasm: i+=10 => " + CompileGSpp("i+=10", false, CompileSettings.NONE));
  },
};
var print = console.log;

import "./mono-config";
import "./runtime.js";
import "./dotnet.js";

import { StringDecoder } from "string_decoder";
import { IMonoModule } from "./ModuleInterface";
import { Console } from "console";

const CompletionItemKind = vscode.CompletionItemKind;



const remoteCompletions: { [id: string]: ExternalCompletionCollection } = {};
const externalSrcs: { [id: string]: ExternalSrc } = {};

const staticGSppCompletionItems = getStaticItems(true);
const staticGSCompletionItems = getStaticItems(false);

export async function activate(context: vscode.ExtensionContext) {
  //#region init
  console.log("GS++ extension loaded");
  let timeout: NodeJS.Timer | undefined = undefined;

  let initialized = false;
  const compilerSettings = new CompilerSettings();

  const compilerMenu = new CompilerMenuProvider([
    new CompilerMenuItem(
      "Optimize",
      vscode.TreeItemCollapsibleState.None,
      (node) => {
        node.setState(compilerSettings.toggleOptimize());
        compilerMenu.refresh();
      },
      compilerSettings.Optimize
    ),

    new CompilerMenuItem(
      "Ignore Map Indexes",
      vscode.TreeItemCollapsibleState.None,
      (node) => {
        node.setState(compilerSettings.toggleIgnoreMapIndexes());
        compilerMenu.refresh();
      },
      compilerSettings.IgnoreMapIndexes
    ),

    new CompilerMenuItem(
      "Remove Comments",
      vscode.TreeItemCollapsibleState.None,
      (node) => {
        node.setState(compilerSettings.toggleRemoveComments());
        compilerMenu.refresh();
      },
      compilerSettings.RemoveComments
    ),
  ]);

  vscode.commands.registerCommand(
    "gspp.settings.toggle",
    (node: CompilerMenuItem) => {
      node.callback(node);
    }
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("gspp.compile", (_) => {
      if (!vscode.workspace.workspaceFolders) {
        return vscode.window.showInformationMessage(
          "No folder or workspace opened"
        );
      }

      const document = vscode.window.activeTextEditor?.document;
      if (document == undefined) return;
      document.save();

      const folder = vscode.workspace.getWorkspaceFolder(document.uri);
      if (folder == undefined) return;

      var options = {

        // Predefined constants (ex: { "MY_CONST": "42" })
        constants: {},

        // Predefined macros (ex: { "MACRO": "(a,b) a+b" })
        macros: {},

        // End of line character
        newLine: '\n',

        // Escape '//#' & '/*#' comments (see extra/comments)
        commentEscape: true,

        // Empty lines to add between code and included files
        includeSpaces: 0,

        // Limit of empty following lines (0 = no limit)
        emptyLinesLimit: 0,

        // Base path for including files
        basePath: '',

        // Stop the compiler when an error ocurred ?
        stopOnError: true,

        // Must constants in #enum directive be in hexadecimal ?
        enumInHex: true
      };

      preprocessor.compileFile(document.fileName, options, (error, result) => {
        if (error) {
          console.error(error);
          return;
        }

        const compiledCode = CompileGSpp(result, compilerSettings.Optimize, compilerSettings.getSettings());
        if (compiledCode == null) {
          return;
        }

        const folderUri = vscode.workspace.getWorkspaceFolder(document.uri)
          ?.uri;
        if (folderUri == undefined) {
          return;
        }
        const name = posix.basename(vscode.Uri.file(document.fileName).path);
        const fileUri = folderUri.with({
          path: posix.join(folderUri.path, "out", name),
        });

        vscode.workspace.fs
          .writeFile(fileUri, Buffer.from(compiledCode))
          .then((x) => {
            vscode.workspace.openTextDocument(fileUri.fsPath).then((doc) => {
              vscode.window.showTextDocument(doc, 1, false);
            });
          });

      });

    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("gspp.init", (_) => {
      if (initialized) {
        return;
      }
      initialized = true;
    })
  );

  vscode.window.registerTreeDataProvider("gsppCompilerSettings", compilerMenu);
  vscode.window.createTreeView("gsppCompilerSettings", {
    treeDataProvider: compilerMenu,
  });

  //#endregion

  //#region snippets

  const gsppProvider = vscode.languages.registerCompletionItemProvider(
    "gspp",
    {
      async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
      ) {
        return await provideCompletionItems(
          document,
          position,
          token,
          context,
          true
        );
      },
    },
    ..."._abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ([{!/"
  );

  const gsProvider = vscode.languages.registerCompletionItemProvider(
    "gs",
    {
      async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
      ) {
        return await provideCompletionItems(
          document,
          position,
          token,
          context,
          false
        );
      },
    },
    ..."._abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ([{!/"
  );

  context.subscriptions.push(gsppProvider, gsProvider);

  //#endregion

  let activeEditor = vscode.window.activeTextEditor;

  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      activeEditor = editor;
    },
    null,
    context.subscriptions
  );

  const tokenTypes = ["variable", "function", "comment", "number", "keyword", "macro", "string"];
  const tokenModifiers = [];
  const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers);
  const provider: vscode.DocumentSemanticTokensProvider = {
    provideDocumentSemanticTokens(
      document: vscode.TextDocument
    ): vscode.ProviderResult<vscode.SemanticTokens> {

      const tokensBuilder = new vscode.SemanticTokensBuilder(legend);

      const ranges = getDecorationItems(document.getText(), <vscode.TextEditor>activeEditor)

      ranges.functions.forEach(element => {
        tokensBuilder.push(element, "function");
      });
      ranges.comments.forEach(element => {
        tokensBuilder.push(element, "comment")
      });
      ranges.keywords.forEach(element => {
        tokensBuilder.push(element, "macro")
      });
      ranges.keywords2.forEach(element => {
        tokensBuilder.push(element, "keyword")
      });
      ranges.numbers.forEach(element => {
        tokensBuilder.push(element, "number")
      })
      ranges.variables.forEach(element => {
        tokensBuilder.push(element, "variable")
      })
      ranges.strings.forEach(element => {
        tokensBuilder.push(element, "string")
      })

      return tokensBuilder.build();
    }
  };
  const selectorGspp = { language: 'gspp', scheme: 'file' };
  const selectorGs = { language: 'gs', scheme: 'file' };

  vscode.languages.registerDocumentSemanticTokensProvider(selectorGspp, provider, legend);
  vscode.languages.registerDocumentSemanticTokensProvider(selectorGs, provider, legend);
}

async function provideCompletionItems(
  document: vscode.TextDocument,
  position: vscode.Position,
  token: vscode.CancellationToken,
  context: vscode.CompletionContext,
  gspp: boolean
) {
  const line = document.lineAt(position.line).text;
  const uri = vscode.Uri.joinPath(document.uri, "../");
  let out: CompletionItem[] = [];
  if (line.startsWith("#include ")) {
    out = await getCompletionFs(line, uri);
  } else if (
    context.triggerCharacter != "/" &&
    context.triggerCharacter != "!"
  ) {
    if (gspp) {
      out = [...staticGSppCompletionItems];
    } else {
      out = [...staticGSCompletionItems];
    }
    await getCompletionItems(document.getText(), uri, undefined, out);
  }

  return out;
}



async function getCompletionItems(
  text: string,
  uri: vscode.Uri,
  regEx?: RegExp,
  output?: CompletionItem[],
  words?: { [id: string]: { [id: number]: boolean } }
) {
  if (regEx == undefined)
    regEx = /((([_a-zA-Z][_a-zA-Z0-9]*)|("([_a-zA-Z][_a-zA-Z0-9]*)"))\s*(=|:)\s*((function\s*\(([^(]*)\))|(\(([^(]*)\)\s*=>)|(\()|(\[)|(\{)|(".*?")|(-?\d+)|([_a-zA-Z][_a-zA-Z0-9]*))|(([_a-zA-Z][_a-zA-Z0-9]*)\s+in)|(\(([^(]*)\)\s*=>))|(#include "(.*?)")|(#define (\w*)\((.*?)\))|(#define (\w*))/g;
  if (output == undefined) output = [];
  if (words == undefined) words = {};

  let match;
  let tempItem;
  while ((match = regEx.exec(text))) {
    //standard function || lambda
    const name: string = match[3] || match[5];
    if (match[8] || match[10]) {
      tempItem = new CompletionItem(name, CompletionItemKind.Function);
      const params = match[9] || match[11];
      const fParams: string[] = [];
      if (params) {
        let param;

        const paramsRegex = /(^|,)\s*(\w+?)\b/g;
        while ((param = paramsRegex.exec(params))) {
          fParams.push(param[2]);
          tryAddItem(
            new CompletionItem(param[2], CompletionItemKind.Variable),
            output,
            words
          );
        }
      }
      tempItem.setInsertText(name + "(" + getParamsSnippet(fParams) + ")");
    }
    //bracket || array || variable
    else if (match[12] || match[13] || match[17]) {
      tempItem = new CompletionItem(name, CompletionItemKind.Variable);
    }
    //map
    else if (match[14]) {
      tempItem = new CompletionItem(name, CompletionItemKind.Module);
    }
    //string || number
    else if (match[15] || match[16]) {
      tempItem = new CompletionItem(name, CompletionItemKind.Value);
    }
    //iterator
    else if (match[18]) {
      tempItem = new CompletionItem(match[19], CompletionItemKind.Variable);
      tryAddItem(
        new CompletionItem(
          "__" + match[19] + "_idx",
          CompletionItemKind.Constant
        ),
        output,
        words
      );
    } else if (match[20]) {
      const fParams: string[] = [];
      for (let param of match[21].split(",")) {
        param = param.trim();
        fParams.push(param);
        tryAddItem(
          new CompletionItem(param, CompletionItemKind.Variable),
          output,
          words
        );
      }
    }
    //external
    else if (match[22]) {
      await parseExternalSrc(match[23], uri, output, words);
    }
    else if (match[24]) {
      tempItem = new CompletionItem(match[25], CompletionItemKind.Function);
      const params = match[26]
      const fParams: string[] = [];
      if (params) {
        let param;

        const paramsRegex = /(^|,)\s*(\w+?)\b/g;
        while ((param = paramsRegex.exec(params))) {
          fParams.push(param[2]);
        }
      }
      tempItem.setInsertText(match[25] + "(" + getParamsSnippet(fParams) + ")");
    }
    else if (match[27]) {
      tempItem = new CompletionItem(match[28], CompletionItemKind.Constant);
    }
    if (tempItem) {
      tryAddItem(tempItem, output, words);
      tempItem = undefined;
    }
  }
  return output;
}

function tryAddItem(
  item: CompletionItem,
  output: CompletionItem[],
  words: { [id: string]: { [id: number]: boolean } }
) {
  if (item && item.kind) {
    if (words[item.label] == undefined) words[item.label] = {};
    if (words[item.label][item.kind] == undefined) {
      words[item.label][item.kind] = true;
      output.push(item);
    }
  }
}

function getParamsSnippet(params?: string[]) {
  if (!params) return "";

  const out: string[] = [];
  for (let index = 0; index < params.length; index++) {
    const param = params[index];
    out.push("${" + (index + 1) + ":" + param + "}");
  }

  return out.join(", ");
}

function getDecorationItems(text: string, activeEditor: vscode.TextEditor) {
  const decorationsRegex = /(\$?".*?")|(\bif\b|\belse\b|\bfor\b|\bwhile\b|\bend if\b|\bend for\b|\bend while\b|\bin\b|\bthen\b|\breturn\b|\bbreak\b|\bcontinue\b|\band\b|\bor\b|\bnot\b|#include|#define|#undef|#elif|#ifndef|#if|#endif|#pragma once|__TIME__|__DATE__|__LINE__|__FILE__|#enum|#endenum)|(\bfunction\b|\bend function\b|\bself\b|\bnew\b|\btrue\b|\bfalse\b|\bnull\b)|(\b(?!function\b)([@_a-zA-Z][_a-zA-Z0-9]*)\s*\()|(-?\d+)|([@_a-zA-Z][_a-zA-Z0-9]*)|(\/\/.*$)/gm;
  let match;

  const strings: GRange[] = [];
  const keywords: GRange[] = [];
  const keywords2: GRange[] = [];
  const functions: GRange[] = [];
  const numbers: GRange[] = [];
  const variables: GRange[] = [];
  const comments: GRange[] = [];
  let matchIndex = 0;
  let output: GRange[] = [];

  while ((match = decorationsRegex.exec(text))) {
    if (match[1]) {
      matchIndex = 1;

      const ranges = getStringFormatDecorations(
        match[1],
        activeEditor,
        match.index
      );

      const start = activeEditor.document.positionAt(match.index);
      const end = activeEditor.document.positionAt(
        match.index + match[matchIndex].length
      );
      let stringRange = new GRange(start, end);

      if (ranges.length > 0) {
        for (let i = 0; i < ranges.length; i++) {
          const element = ranges[i];
          strings.push(new GRange(stringRange.start, element.start));
          if (i + 1 < ranges.length) {
            stringRange = new GRange(element.end, ranges[i + 1].start);
          } else {
            stringRange = new GRange(element.end, end);
          }

          variables.push(element);
        }
      }

      strings.push(stringRange);
      continue;
    } else if (match[2]) {
      matchIndex = 2;
      output = keywords2;
    } else if (match[3]) {
      matchIndex = 3;
      output = keywords;
    } else if (match[5]) {
      matchIndex = 5;
      output = functions;
    } else if (match[6]) {
      matchIndex = 6;
      output = numbers;
    } else if (match[7]) {
      matchIndex = 7;
      output = variables;
    } else if (match[8]) {
      matchIndex = 8;
      output = comments;
    } else if (match[9]) {
      matchIndex = 9;
      output = keywords2;
    } else {
      continue;
    }

    const start = activeEditor.document.positionAt(match.index);
    const end = activeEditor.document.positionAt(
      match.index + match[matchIndex].length
    );
    output.push(new GRange(start, end));
  }

  return {
    functions: functions,
    keywords: keywords,
    keywords2: keywords2,
    strings: strings,
    numbers: numbers,
    variables: variables,
    comments: comments,
  };
}

function getStringFormatDecorations(
  text: string,
  activeEditor: vscode.TextEditor,
  startIndex: number
) {
  const regex = /{.*?}/g;

  const output: GRange[] = [];

  let match;
  while ((match = regex.exec(text))) {
    if (match) {
      const start = activeEditor.document.positionAt(match.index + startIndex);
      const end = activeEditor.document.positionAt(
        match.index + match[0].length + startIndex
      );
      output.push(new GRange(start, end));
    }
  }

  return output;
}

async function parseExternalSrc(
  name: string,
  uri: vscode.Uri,
  output: CompletionItem[],
  words: { [id: string]: { [id: number]: boolean } }
) {
  uri = vscode.Uri.joinPath(uri, name);
  name = uri.path;

  //check for duplicate entry
  const tmp = words[name];
  if (tmp && tmp[-1]) {
    return;
  }
  words[name] = {};
  words[name][-1] = true;

  //check for exiting result
  let collection = remoteCompletions[uri.toString()];
  if (collection == undefined) {
    collection = new ExternalCompletionCollection([], 0);
    remoteCompletions[uri.toString()] = collection;
  }

  let stat: vscode.FileStat;
  try {
    stat = await vscode.workspace.fs.stat(uri);
  }
  catch {
    return;
  }

  if (collection.date == stat.mtime) {
    for (const item of collection.items) {
      tryAddItem(item, output, words);
    }
    return;
  }

  collection.date = stat.mtime;
  const data = await vscode.workspace.fs.readFile(uri);
  const text = new StringDecoder().write(Buffer.from(data));
  const items = getCompletionItems(text, uri);
  collection.items = await items;
  for (const item of collection.items) {
    tryAddItem(item, output, words);
  }
}

const parentCompletion = new CompletionItem(
  "../",
  vscode.CompletionItemKind.Folder
);
parentCompletion.command = {
  command: "editor.action.triggerSuggest",
  title: "InteliSense",
};

async function getCompletionFs(line: string, baseUri: vscode.Uri) {
  const out: CompletionItem[] = [parentCompletion];

  const regex = /#include "(.*?)"/;
  const match = regex.exec(line);
  if (match == undefined || match[1] == undefined) {
    return out;
  }
  line = match[1];
  const uri = vscode.Uri.joinPath(baseUri, line);
  const r = await vscode.workspace.fs.readDirectory(uri);
  for (const item of r) {
    if (item[1] == vscode.FileType.File) {
      const completion = new CompletionItem(
        item[0],
        vscode.CompletionItemKind.File
      );
      completion.insertText = item[0];
      out.push(completion);
    } else if (item[1] == vscode.FileType.Directory) {
      const completion = new CompletionItem(
        item[0] + "/",
        vscode.CompletionItemKind.Folder
      );
      completion.command = {
        command: "editor.action.triggerSuggest",
        title: "InteliSense",
      };
      out.push(completion);
    }
  }
  return out;
}

async function getFileContent(uri: vscode.Uri) {
  return new StringDecoder().write(
    Buffer.from(await vscode.workspace.fs.readFile(uri))
  );
}

import * as vscode from "vscode";

export class CompletionItem extends vscode.CompletionItem {
    constructor(label: string, kind: vscode.CompletionItemKind) {
        super(label, kind);
        this.insertText = new vscode.SnippetString(label);
    }
    setInsertText(text: string) {
        this.insertText = new vscode.SnippetString(text);
    }
}

export class GRange extends vscode.Range {
    constructor(start: vscode.Position, end: vscode.Position) {
        super(start, end);
    }
}

export class ExternalCompletionCollection {
    constructor(public items: CompletionItem[], public date: number) { }
}
export class ExternalSrc {
    constructor(public src: string, public date: number) { }
}
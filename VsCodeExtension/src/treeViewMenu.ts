import * as vscode from 'vscode';

export class CompilerSettings{
    public Optimize: boolean;
    public IgnoreMapIndexes: boolean;
    public RemoveComments: boolean;
    constructor() {
        this.Optimize = false;
        this.IgnoreMapIndexes = false;
        this.RemoveComments = false;
    }

    getSettings(): number{
        let settings = 0;
        if (this.IgnoreMapIndexes) settings |= 1;
        if (this.RemoveComments) settings |= 2;
        return settings;
    }

    toggleOptimize():boolean {
        return this.Optimize = !this.Optimize;
    }
    toggleIgnoreMapIndexes():boolean {
        return this.IgnoreMapIndexes = !this.IgnoreMapIndexes;
    }
    toggleRemoveComments(): boolean {
        return this.RemoveComments = !this.RemoveComments;
    }
}

export class CompilerMenuItem extends vscode.TreeItem{
    public Items: CompilerMenuItem[];
    public Name: string;
    constructor(
        label: string,
        state: vscode.TreeItemCollapsibleState,
        public readonly callback: (niode: CompilerMenuItem) => any,
        value:boolean,
        public readonly command?: vscode.Command) {
        
        super(label, state);
        this.Name = label;
        this.setState(value);
        this.Items = [];
        this.contextValue = "compilerMenuItem";
    }

    setState(value: boolean): string{
        return this.label = this.Name + ": " + value;
    }
}

export class CompilerMenuProvider implements vscode.TreeDataProvider<CompilerMenuItem>{
    private _onDidChangeTreeData: vscode.EventEmitter<CompilerMenuItem | undefined | void> = new vscode.EventEmitter<CompilerMenuItem | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<CompilerMenuItem | undefined | void> = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
    private _items: CompilerMenuItem[];

    constructor(items: CompilerMenuItem[]) {
        this._items = items;
    }

    getTreeItem(element: CompilerMenuItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: CompilerMenuItem): vscode.ProviderResult<CompilerMenuItem[]> {
        if (element == undefined) {
            return this._items;
        }
        else {
            return element.Items;
        }
    }

}
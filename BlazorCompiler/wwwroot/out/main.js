/// <reference path="../wwwroot/node_modules/monaco-editor/monaco.d.ts"/>
function activateEditor(id) {
    var node = document.getElementById(id);
    if (node) {
        return monaco.editor.create(node, {
            theme: "vs-dark",
            language: "gs"
        });
    }
}
var editor;
function setupEditor(id) {
    editor = activateEditor(id);
}
//# sourceMappingURL=main.js.map
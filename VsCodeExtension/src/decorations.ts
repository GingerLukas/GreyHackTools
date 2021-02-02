import * as vscode from "vscode";

export const functions = vscode.window.createTextEditorDecorationType({
    color: 'rgb(220,220,170)'
});

export const keywords = vscode.window.createTextEditorDecorationType({
    color: 'rgb(86,156,214)'
});

export const keywords2 = vscode.window.createTextEditorDecorationType({
    color: 'rgb(197,134,192)'
});

export const strings = vscode.window.createTextEditorDecorationType({
    color: 'rgb(206,145,120)'
});

export const numbers = vscode.window.createTextEditorDecorationType({
    color: 'rgb(181,206,168)'
});

export const variables = vscode.window.createTextEditorDecorationType({
    color: 'rgb(156,220,254)'
});

export const comments = vscode.window.createTextEditorDecorationType({
    color: 'rgb(106,153,85)'
});
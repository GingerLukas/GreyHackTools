function getRanges(text) {
    const strings = [];
    const keywords = [];
    const keywords2 = [];
    const functions = [];
    const numbers = [];
    const variables = [];
    const comments = [];

    let matchIndex = 0;
    let output = [];
    let match;

    const regEx =
        /(".*?")|(if|for|while|end if|end for|end while|\bin\b|then|return|break|continue|and|or|not)|(function|end function|self|new|true|false|null)|(\b(?!function\b)([_a-zA-Z][_a-zA-Z0-9]*)\s*\()|(\d+)|([_a-zA-Z][_a-zA-Z0-9]*)|(\/\/.*$)/gm;
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
        output.push({ start: match.index, end: match.index + match[matchIndex].length });
    }
}

function highlightTextarea(id) {
    const textarea = document.getElementById(id);
    if (textarea) {
        const ranges = getRanges(textarea.value);
        for (const range of ranges) {
            textarea.selectionStart = range.start;
            textarea.selectionEnd = range.end;
            
        }
    }
}

function startEditor(id) {
    monaco.editor.create(document.getElementById(id), {
        value: "function hello() {\n\talert('Hello world!');\n}",
        language: "javascript"
    });
}
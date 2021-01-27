





document.addEventListener('keydown',(x)=>
{
    if (x.ctrlKey && x.key == "Enter") {
        document.getElementById('debugger-start').click();
    }
});




function enableTabAccept(id) {
    document.getElementById(id).addEventListener('keydown', (x) => onKeyDownHandler(x, this));
}

function getSelectionStart(id) {
    return document.getElementById(id).selectionStart;
}

function getSelectionEnd(id) {
    return document.getElementById(id).selectionEnd;
}

var brackets = { "(": ")", "[": "]", "{": "}", '"': '"', "'": "'" };

function enableBracketCompletion(id) {

    document.getElementById(id).addEventListener('keydown', (x) => onKeyDownHandler(x, this));
}

function onKeyDownHandler(e,t) {
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = t.selectionStart;
        var end = t.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        t.value = t.value.substring(0, start) +
            "\t" +
            t.value.substring(end);

        // put caret at right position again
        t.selectionStart =
            t.selectionEnd = start + 1;
    }
    else if (brackets.hasOwnProperty(e.key)) {
        e.preventDefault();
        var start = t.selectionStart;
        var end = t.selectionEnd;

        // set textarea value to: text before caret + bracket + text after caret
        t.value = t.value.substring(0, start) +
            e.key +
            t.value.substring(start, end) +
            brackets[e.key] +
            t.value.substring(end);

        // put caret at right position again
        t.selectionStart =
            t.selectionEnd = start + 1;
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

function appendTextarea(id, text) {
    document.getElementById(id).value += text;
}

function setTextarea(id,text) {
    document.getElementById(id).value = text;
}

function scrollToEnd(id) {
    let tmp = document.getElementById(id);
    tmp.scrollTop = tmp.scrollHeight;
}
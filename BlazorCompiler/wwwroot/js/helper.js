function enableTabAccept(id) {
    document.getElementById(id).addEventListener('keydown',
        function(e) {
            if (e.key == 'Tab') {
                e.preventDefault();
                var start = this.selectionStart;
                var end = this.selectionEnd;

                // set textarea value to: text before caret + tab + text after caret
                this.value = this.value.substring(0, start) +
                    "\t" +
                    this.value.substring(end);

                // put caret at right position again
                this.selectionStart =
                    this.selectionEnd = start + 1;
            }
        });
}

var brackets = { "(": ")", "[": "]", "{": "}", '"': '"', "'": "'" };

function enableBracketCompletion(id) {
    
    document.getElementById(id).addEventListener('keydown', function (e) {
        if (brackets.hasOwnProperty(e.key)) {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;

            // set textarea value to: text before caret + bracket + text after caret
            this.value = this.value.substring(0, start) +
                e.key +
                brackets[e.key] +
                this.value.substring(end);

            // put caret at right position again
            this.selectionStart =
                this.selectionEnd = start + 1;
        }
    });
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
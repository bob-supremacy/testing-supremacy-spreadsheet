var ui = SpreadsheetApp.getUi();
var Dialog = {};
Dialog.TYPE = ui.ButtonSet.OK_CANCEL;
Dialog.prompt = function(header, info) {
    var uiElement = ui.prompt(header, info, Dialog.TYPE );
    var choice = uiElement.getSelectedButton();
    if (choice == ui.Button.OK) {
        var response = uiElement.getResponseText()
        if (response === null) return null;
        return uiElement.getResponseText();
    }
    return null;
}

Dialog.group = function(header, dialogs) {
        var result = [];
        for (i = 0; i < dialogs.length; i++) {
            var response = Dialog.prompt(header, dialogs[i][0], Dialog.TYPE);
            if (response == null) return null;
            exOp = dialogs[i][1] 
            if (typeof exOp ==  "function") {
               result.push(exOp(response))
            } else if(typeof exOp ==  "object") { 
                if (exOp[response] == null) return null;
                result.push(exOp[response]);
                continue;
            }
            result.push(response);
        }   
        return result;
}

Dialog.response = function(DIALOG) {
    var response = Dialog.group(DIALOG.HEADER, DIALOG.INFO)
    if (response == null) return;
    DIALOG.RETURN(response)
}
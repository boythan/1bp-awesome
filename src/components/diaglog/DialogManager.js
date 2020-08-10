export default {
    currentDialog: null,

    initialDialog (refDialog) {
        this.currentDialog = refDialog;
    },

    openDialog(title, message, buttons) {
        this.currentDialog.openDialog(title, message, buttons)
    }
}

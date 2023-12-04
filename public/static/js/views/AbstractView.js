
export default class{

    constructor(params) {
        this.params = params;
        this.host = location.origin;
    }

    setTitle(title) {
        document.title = 'TECHAV-tp1 | ' + title;
    }

    async getHTML() {
        return;
    }
}
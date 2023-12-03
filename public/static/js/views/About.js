import AbstractView from './AbstractView.js';

export default class extends AbstractView{

    constructor(params) {
        super();
        this.init();
    }

    init() {
        this.setTitle('About');
    }

    async getHTML() {
        const res = await fetch('/static/layouts/about.html');
        const aboutTemplate = await (res).text();
        return aboutTemplate;
    }
}
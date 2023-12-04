import AbstractView from './AbstractView.js';

export default class extends AbstractView{

    constructor(params) {
        super();
        this.init();
    }

    init() {
        this.setTitle('About');
    }

    /**
     * process and returns HTML template
     * 
     * @returns [string] HTML template for about page
     */
    async getHTML() {
        const res = await fetch('/static/layouts/about.html');
        let aboutTemplate = await (res).text();
        aboutTemplate = aboutTemplate.replaceAll('{{ path }}', this.host);
        return aboutTemplate;
    }
}
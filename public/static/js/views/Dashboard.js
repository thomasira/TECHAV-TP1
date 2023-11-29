
export default class{
    async getHTML() {
        const res = await fetch('/static/views/dashboard.html');
        return res.text();
    }
} 
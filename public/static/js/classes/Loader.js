/**
 * manage the loading of page
 */
export default class{
    constructor() {
        this.modal = document.querySelector('[data-cover]');
    }

    start() {
        this.modal.classList.remove('hidden');
        document.body.classList.add('no-scroll');
    }

    end() {
        this.modal.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }
}
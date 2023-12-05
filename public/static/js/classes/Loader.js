/**
 * manage the loading of page
 */
export default class{
    constructor() {
        this.modal = document.querySelector('[data-cover]');
        this.message = this.modal.querySelector('h2');
    }

    start() {
        this.modal.classList.remove('hidden');
        document.body.classList.add('no-scroll');
    }

    end(detail) {
        if(detail.error) {
            this.message.textContent = detail.error;
            setTimeout(() => {
                this.modal.classList.add('hidden');
                document.body.classList.remove('no-scroll');
                this.message.textContent = 'Loading';
            }, 1500);
        }
        else {
            this.modal.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        }

    }
}
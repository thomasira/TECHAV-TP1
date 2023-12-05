/**
 * manage the animation and element states for loading
 */
export default class{
    #loader;
    #timeline;
    #modal;
    #app;
    constructor() {
        this.#modal = document.querySelector('[data-cover]');
        this.#app = document.querySelector('[data-app]');
        this.#timeline = anime.timeline({
                duration: 800,
                loop: true,
                easing: 'easeInOutSine',
                autoplay: false
            });
        
        /* loader paths data and colors */
        this.#loader = {
            path1: 'M188.5 123C209.804 160.351 118.762 243.51 91.7957 239.132C38.1143 230.417 11.4001 153.745 4.49992 130C-12.5 71.4998 24.315 8.35032 90.8605 1.42801C198.851 -9.27067 150 55.5 188.5 123Z',
            path2: 'M241.5 106C241.5 126.616 144.5 222.132 71.9237 222.132C41.4641 222.132 0 129 0 106C0 87.5 81.5 3.32822 105 1.00007C212.991 -9.69861 241.5 95 241.5 106Z',
            path3: 'M183.5 104C163.005 141.802 218 240 98.4239 227.132C85 227.132 0.499878 150 0.499878 33.5002C0.499878 15 43.5 8.4413 98.4239 2.99997C206.415 -7.69871 228.5 21.0002 183.5 104Z',
            path4: 'M195.5 118C195.5 161 181.5 249.141 61.924 236.273C-18 227.672 46.8161 193.3 6.49995 83.9982C-16 22.9982 33.5761 6.43972 88.5 0.998174C119.5 -2.07313 195.5 67.5001 195.5 118Z',
            path5: 'M175.554 119C175.554 162 161.554 250.141 41.9779 237.273C-37.9461 228.672 21.5 181 28.5001 79C32.9516 14.1353 80.0762 6.44155 135 1.00001C166 -2.07129 175.554 68.5001 175.554 119Z',
            path6: 'M198 124C198 167 170.545 207.536 51.2967 244.37C18.5 254.5 0.50016 201.74 0.500122 99.5002C0.500085 -0.499901 23.4396 -13.2419 73.5001 10.0002C101.5 23.0001 198 73.5003 198 124Z',
            color1: '#3e5141',
            color2: '#3e4f51',
            color3: '#513e3e',
            color4: '#51463e',
            color5: '#4f513e',
            color6: '#3e5141',
        }
        this.#init();
    }

    async #init() {

        /* get html template */
        const loaderTemplate = await this.#getLoaderHTML();

        /* inject it */
        this.#modal.innerHTML = loaderTemplate;

        /* get the loader elements */
        this.#getHTMLelements();
    }

    /**
     * animate chosen path
     */
    #animateLoader() {
        const path = this.#loader.element.querySelector('path');

        this.#timeline.add({
            targets: path,
            d: [{ value: this.#loader.path2 }],
            fill: this.#loader.color2
        })
        .add({
            targets: path,
            d: [{ value: this.#loader.path3 }],
            fill: this.#loader.color3
        })
        .add({
            targets: path,
            d: [{ value: this.#loader.path4 }],
            fill: this.#loader.color4
        })
        .add({
            targets: path,
            d: [{ value: this.#loader.path5 }],
            fill: this.#loader.color5
        })
        .add({
            targets: path,
            d: [{ value: this.#loader.path6 }],
            fill: this.#loader.color6
        })
        .add({
            targets: path,
            d: [{ value: this.#loader.path1 }],
            fill: this.#loader.color1
        })
    }

    /**
     * fetch and return loader template
     * @returns [string] template
     */
    async #getLoaderHTML() {
        const resLoader = await fetch('/static/layouts/templates/loader.html');
        return await resLoader.text();
    }

    #getHTMLelements() {
        this.#loader.element = this.#modal.querySelector('[data-loader]');
        this.#loader.element.message = this.#loader.element.querySelector('h2');
    }
    
    /**
     * start the loader animation
     */
    start() {
        this.#animateLoader();
        this.#timeline.play();
        this.#modal.classList.remove('hidden');
        document.body.classList.add('no-scroll');
    }

    /**
     * end loader animation
     * 
     * @param {*} detail [string] detail from custom event
     */
    end(detail) {
        this.#app.classList.add('hidden');

        if(detail.error) {
            this.#loader.element.message.textContent = detail.error;

            /* timer to allow time to read text and smooth transition*/
            setTimeout(() => {
                this.#toggle();
            }, 1500);
        } else {

            /* timer to allow smooth transition*/
            setTimeout(() => {
                this.#toggle();
            }, 1000);
        }
    }

    /**
     * toggles the required classes back to normal after transition end
     */
    #toggle() {
        document.body.classList.remove('no-scroll');
        this.#modal.classList.add('hidden');
        this.#app.classList.remove('hidden');

        /* timer to allow smooth transition */
        setTimeout(() => {
            this.#timeline.pause();
            this.#loader.element.message.textContent = 'Loading';
        }, 800)
    }
}
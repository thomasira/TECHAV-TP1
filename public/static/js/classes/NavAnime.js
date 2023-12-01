
export default class{
    constructor() {
        this.startPath = 'M94.403 36.6086C77.5003 47.5348 57.3296 51.6821 34.1427 44.5187C10.9559 37.3552 -14.3029 -11.1406 11.5223 2.83344C37.3474 16.8074 52.8302 19.5208 93.3243 5.68532C115.946 -2.04363 115.017 23.2834 94.403 36.6086Z';
        this.endPath = 'M82.3503 41.8752C62.6225 31.5754 43.2656 14.6487 27.226 30.7579C11.1864 46.867 -17.0612 7.95693 14.5641 11.2524C46.1895 14.5478 60.5632 -11.335 94.6803 7.14082C128.797 25.6167 102.078 52.1751 82.3503 41.8752Z'
        this.SVG = document.querySelector('[data-morph]');
        this.link = document.querySelector('[data-nav-link]');
        this.path = document.querySelector('[data-start-svg]');
        this.toggle = false;
        this.init();
    }

    init() {
        this.link.addEventListener('click', () => {
            const timeline = anime.timeline({
                duration: 700,
                easing: 'easeOutExpo'
            });
            timeline.add({
                targets: this.SVG,
                scale: .2
            })            
            .add({
                targets: this.SVG,
                opacity: .5
            }, '-=700')
            .add({
                targets: this.SVG,
                rotate: this.toggle ? 0 : 360
            }, '-= 600')
            .add({
                targets: this.path,
                d: [
                    { value: this.toggle ? this.startPath : this.endPath }
                ]
            }, '-= 200')
            .add({
                targets: this.SVG,
                scale: 1
            }, '-= 700')
            .add({
                targets: this.SVG,
                opacity: 1
            }, '-= 600')
            .add({
                targets: this.SVG,
                fill: this.toggle ? '#ed9420' : '#94e283'
            }, '-=600');

            if(!this.toggle) this.toggle = true;
            else this.toggle = false;
        });

    }

}
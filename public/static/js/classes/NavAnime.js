
export default class{
    constructor() {
        this.navItems = {
            home: {
                element: document.querySelector('[data-nav="home"]'),
                startPath: 'M94.403 36.6086C77.5003 47.5348 57.3296 51.6821 34.1427 44.5187C10.9559 37.3552 -14.3029 -11.1406 11.5223 2.83344C37.3474 16.8074 52.8302 19.5208 93.3243 5.68532C115.946 -2.04363 115.017 23.2834 94.403 36.6086Z',
                endPath: 'M86.3502 41.8752C49.5 38.5 49.5 27.9999 26 33.4999C2.50002 38.9999 -13.0613 7.95689 18.564 11.2523C50.1894 14.5478 64.5631 -11.3351 98.6802 7.14079C132.797 25.6166 108.512 43.9051 86.3502 41.8752Z',
                toggle: false
            },
            about: {
                element: document.querySelector('[data-nav="about"]'),
                startPath: 'M94.403 36.6086C77.5003 47.5348 57.3296 51.6821 34.1427 44.5187C10.9559 37.3552 -14.3029 -11.1406 11.5223 2.83344C37.3474 16.8074 52.8302 19.5208 93.3243 5.68532C115.946 -2.04363 115.017 23.2834 94.403 36.6086Z',
                endPath: 'M86.3502 41.8752C49.5 38.5 49.5 27.9999 26 33.4999C2.50002 38.9999 -13.0613 7.95689 18.564 11.2523C50.1894 14.5478 64.5631 -11.3351 98.6802 7.14079C132.797 25.6166 108.512 43.9051 86.3502 41.8752Z',
                toggle: false
            }
        }
        this.navItems.home.element.link = this.navItems.home.element.querySelector('a');
        this.navItems.about.element.link = this.navItems.about.element.querySelector('a');

        this.init();
    }
    
    init() {
        this.navItems.home.element.link.addEventListener('click', (e) => this.animateLink(e, this.navItems.home));
        this.navItems.about.element.link.addEventListener('click', (e) => this.animateLink(e, this.navItems.about));
    }

    animateLink(e, navItem) {
        e.preventDefault();
        const SVG = navItem.element.querySelector('svg');
        const path = navItem.element.querySelector('path');

        const timeline = anime.timeline({
            duration: 700,
            easing: 'easeOutExpo'
        });
        timeline.add({
            targets: SVG,
            scale: .2
        })
        .add({
            targets: SVG,
            opacity: .5
        }, '-=700')
        .add({
            targets: SVG,
            rotate: navItem.toggle ? 0 : 360
        }, '-= 600')
        .add({
            targets: path,
            d: [
                { value: navItem.toggle ? navItem.startPath : navItem.endPath }
            ]
        }, '-= 200')
        .add({
            targets: SVG,
            scale: 1
        }, '-= 700')
        .add({
            targets: SVG,
            opacity: 1
        }, '-= 600')
        .add({
            targets: SVG,
            fill: navItem.toggle ? '#ed9420' : '#94e283'
        }, '-=600');

        if(!navItem.toggle) navItem.toggle = true;
        else navItem.toggle = false;
    }


}
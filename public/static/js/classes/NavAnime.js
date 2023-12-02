
export default class{
    constructor() {
        this.navItems = {
            home: {
                element: document.querySelector('[data-nav="home"]'),
                startPath: 'M93.8301 42.853C74.6403 51.5716 53.9882 51.7869 30.3156 41.5002C6.64305 31.2136 -15.4152 -10.2562 14.3995 2.36832C44.2142 14.9928 53.5707 18.364 97.5963 10.3709C122.19 5.90579 117.233 32.2203 93.8301 42.853Z',
                endPath: 'M89.8222 33.6087C79.966 31.6065 54.9655 24.5 27.9657 36.5C0.965959 48.5 -9.17869 20.1907 9.62087 9.0182C28.4204 -2.15432 61.9755 -4.7166 92.5 17C124.948 40.085 116.272 38.9815 89.8222 33.6087Z',
                mainColor: '#f6bb5d',
                secondColor: '#e17553',
                toggle: false
            },
            about: {
                element: document.querySelector('[data-nav="about"]'),
                startPath: 'M80.1215 40.1538C44.2092 30.2071 46.6782 29.6967 22.621 31.807C-1.43618 33.9173 -11.6387 -2.8725 19.1216 6.10449C49.8818 15.0815 66.614 -8.98182 97.5523 3.86371C133.917 18.9622 101.719 46.1359 80.1215 40.1538Z',
                endPath: 'M94 39.5C73 28.5 48.649 32.5938 22.6007 36.4141C-3.44752 40.2345 -4.99999 11 11.5001 2.50002C28.0001 -5.99998 46.0963 17.3687 89 4.50011C131.196 -8.15615 122.739 54.5539 94 39.5Z',
                toggle: false,
                mainColor: '#7dca89',
                secondColor: '#6ec3c5'
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
            fill: navItem.toggle ? navItem.mainColor : navItem.secondColor 
        }, '-=600');

        if(!navItem.toggle) navItem.toggle = true;
        else navItem.toggle = false;
    }


}
import Home from './views/Home.js';
import Recipe from './views/Recipe.js';
import About from './views/About.js';
import NavAnime from './classes/NavAnime.js';
import Loader from './classes/Loader.js';

/* instanciate navAnime class in the side-bar */
const sideBar = document.querySelector('[data-side-bar]');
new NavAnime(sideBar);

const router = async () => {

    /* decompose urlArray into path[1] and id[2] */
    let path;
    let id;
    if(location.pathname.split('/')[1] == "") path = '/';
    else path = location.pathname.split('/')[1];
    if(location.pathname.split('/')[2]) id = location.pathname.split('/')[2];

    /* create routes */
    const routes = [
        { path: '/', view: Home },
        { path: '/about', view: About },
        { path: '/recipe/:id', view: Recipe }
    ];

    /* match function */
    const potentialMatches = routes.map(route => {

        /* bind route in case of id */
        let url = location.pathname;
        if(id) url = location.pathname.replace(id, ':id');

        /* return route info */
        return {
            route: route,
            isMatch: url === route.path
        }
    });
    
    /* matching and other non-match */
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if(!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    /* create params object->  id in this case */
    let params;
    if(id) params = { id };
    
    /* inject view into DOM */
    const view = new match.route.view(params);
    document.querySelector('[data-app]').innerHTML = await view.getHTML();
}

/* push url into browser  */
const navigateTo = url => {

    /* scroll window back to top of screen */
    window.scrollTo(0, 0);

    /* sets the history, enabling back and forward navigation */
    history.pushState(null, null, url);

    router();
}

/* manage url history for back and forward navigation */
window.addEventListener('popstate', router)

/* run the router in interactions */
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    const loader = new Loader();
    document.addEventListener('start-load', () => loader.start());
    document.addEventListener('end-load', (e) => {
        loader.end(e.detail);
        navigateTo('/');
    });
    
    router();
});
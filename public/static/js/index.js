import Home from './views/Home.js';
import Recipe from './views/Recipe.js';
import About from './views/About.js';
import NavAnime from './classes/NavAnime.js';

const sideBar = document.querySelector('[data-side-bar]');
new NavAnime(sideBar);

const router = async () => {

    /* decompose urlArray into path[1] and id[2] */
    let path;
    let id;
    if(location.pathname.split('/')[1] == "") path = '/';
    else path = location.pathname.split('/')[1];
    if(location.pathname.split('/')[2]) id = location.pathname.split('/')[2];

    const routes = [
        { path: '/', view: Home },
        { path: '/about', view: About },
        { path: '/recipe/:id', view: Recipe }
    ];

    // 1.2 match function
    const potentialMatches = routes.map(route => {

        /* bind route in case of id */
        let url = location.pathname;
        if(id) url = location.pathname.replace(id, ':id');
        return {
            route: route,
            isMatch: url === route.path
        }
    });
    
    // 1.3 matching and other non-match
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if(!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    /* create params object-> only id here */
    let params;
    if(id) params = { id };
    
    // 1.4 inject view into DOM
    const view = new match.route.view(params);
    document.querySelector('[data-app]').innerHTML = await view.getHTML();
}

//2 push url into browser 
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}
window.addEventListener('popstate', router)

//3 run the router in interactions
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();

});
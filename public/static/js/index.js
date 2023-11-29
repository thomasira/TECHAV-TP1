import Dashboard from "./views/Dashboard.js";

const router = async () => {

    const routes = [
        { path: "/", view: Dashboard },
/*         { path: "/posts", view: Post },
        { path: "/settings", view: Settings }, */
    ];

    // 1.2 match function
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
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

    // 1.4 inject view into DOM
    const view = new match.route.view;
    document.querySelector("#app").innerHTML = await view.getHTML();
}

//2 push url into browser 
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

//3 run the router in interactions
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});
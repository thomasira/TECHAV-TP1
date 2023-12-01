import AbstractView from './AbstractView.js';

export default class extends AbstractView{

    constructor() {
        super();
        this.id = location.search.replace('?id=', '');
        this.init();
    }

    init() {
        this.setTitle('Recipe');
    }

    async getHTML() {
        const recipe = await this.getData();
        console.log(recipe);
    }

    async getData() {
        const res = await fetch('/static/recipes/random-recipes.json');
        const data = await res.json();
        const recipes = data.recipes.d;
        const recipe = recipes.find(recipe => recipe.id == this.id);
        return recipe;
    }
} 
import AbstractView from './AbstractView.js';

export default class extends AbstractView{

    constructor(params) {
        super();
        this.init();
    }

    init() {
        this.setTitle('Home');
    }

    async getHTML() {
        const recipesData = await this.getData();
        let elRecipes = '';

        const resHome = await fetch('/static/layouts/home.html');
        let homeTemplate = await resHome.text();
        const resRecipe = await fetch('/static/layouts/templates/recipe-card.html')
        let recipeTemplate = await resRecipe.text();

        const recipes = recipesData.recipes.d;
        recipes.forEach(recipe => {
            const randomBLob = Math.floor(Math.random() * (7 - 1) + 1);
            const randomHue = Math.random() * 1;
            
            let elRecipe = recipeTemplate;
            elRecipe = elRecipe.replaceAll('{{ random-blob }}', randomBLob);
            elRecipe = elRecipe.replaceAll('{{ title }}', recipe.Title);
            elRecipe = elRecipe.replaceAll('{{ Image }}', recipe.Image);
            elRecipe = elRecipe.replaceAll('{{ id }}', recipe.id);
            elRecipes += elRecipe;
        });

        homeTemplate = homeTemplate.replace('{{ recipes }}', elRecipes);
        homeTemplate = homeTemplate.replace('{{ ingredient }}', recipesData.ingredient);
        return homeTemplate;
    }

    async getData() {
        const res = await fetch('/static/recipes/random-recipes.json');
        const data = await res.json();
        return data;
    }
} 
import AbstractView from "./AbstractView.js";

export default class extends AbstractView{

    constructor() {
        super();
        this.init();
    }

    init() {
        this.setTitle('Home');
    }

    async getHTML() {
        const recipesData = await this.getData();
        let elRecipes = "";

        const resHome = await fetch('/static/layouts/home.html');
        let homeTemplate = await resHome.text();
        const resRecipe = await fetch('/static/layouts/templates/recipe-thumb.html')
        let recipeTemplate = await resRecipe.text();

        const recipes = recipesData.recipes.d;
        console.log(recipes);
        recipes.forEach(recipe => {
            let elRecipe = recipeTemplate;
            elRecipe = elRecipe.replaceAll("{{ title }}", recipe.Title);
            elRecipe = elRecipe.replaceAll("{{ Image }}", recipe.Image);
            elRecipes += elRecipe;
        })

        homeTemplate = homeTemplate.replace('{{ recipes }}', elRecipes);
        homeTemplate = homeTemplate.replace('{{ ingredient }}', recipesData.ingredient);
        return homeTemplate;
    }

    async getData() {
        const res = await fetch(`/static/recipes/random-recipes.json`);
        const data = await res.json();
        return data;
    }
} 
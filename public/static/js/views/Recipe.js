import AbstractView from './AbstractView.js';

export default class extends AbstractView{

    constructor(params) {
        super();
        this.id = params.id;
        this.randomIngredient;
        this.init();
    }

    init() {
        this.setTitle('Recipe');
    }

    async getHTML() {
        const recipe = await this.getData();
        if(!recipe) {
            const resError = await fetch('/static/layouts/templates/error.html');
            const elError = await resError.text();
            return elError;
        }
        let elIngredients = '';
    
        const resRecipe = await fetch('/static/layouts/recipe.html');
        let recipeTemplate = await resRecipe.text();
        const resIngredient = await fetch('/static/layouts/templates/ingredient.html');
        let ingredientTemplate = await resIngredient.text();

        for(const i in recipe.Ingredients) {
            let elIngredient = ingredientTemplate.replace('{{ ingredient }}', recipe.Ingredients[i]);
            elIngredients += elIngredient;
        }
        let elRecipe = recipeTemplate;
        elRecipe = elRecipe.replaceAll('{{ path }}', this.host);
        elRecipe = elRecipe.replaceAll('{{ random-ingredient }}', recipe.random);
        elRecipe = elRecipe.replaceAll('{{ Title }}', recipe.Title);
        elRecipe = elRecipe.replaceAll('{{ Image }}', recipe.Image);
        elRecipe = elRecipe.replaceAll('{{ Ingredients }}', elIngredients);
        elRecipe = elRecipe.replaceAll('{{ Instructions }}', recipe.Instructions);
        
        return elRecipe;
    }

    async getData() {
        const res = await fetch('/static/recipes/random-recipes.json');
        const data = await res.json();
        const recipes = data.recipes.d;
        const recipe = recipes.find(recipe => recipe.id == this.id);
        if(recipe) recipe.random = data.ingredient;
        return recipe;
    }
}
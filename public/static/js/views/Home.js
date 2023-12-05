import AbstractView from './AbstractView.js';

export default class extends AbstractView{

    constructor(params) {
        super();
        this.init();
    }

    init() {
        this.setTitle('Home');
    }

    /**
     * process and returns HTML template
     * 
     * @returns [string] HTML template for home page
     */
    async getHTML() {
        let elRecipes = '';

        /* get the recipes data */
        const recipesData = await this.#getData();

        /* get templates */
        const resHome = await fetch('/static/layouts/home.html');
        let homeTemplate = await resHome.text();
        const resRecipe = await fetch('/static/layouts/templates/recipe-card.html')
        let recipeTemplate = await resRecipe.text();

        /* recipes in recipesData */
        const recipes = recipesData.recipes.d;

        /* randomize some values before processing template */
        recipes.forEach(recipe => {
            let elRecipe = recipeTemplate;

            const randomBLob = Math.floor(Math.random() * (7 - 1) + 1);
            const randomFrame = Math.floor(Math.random() * (4 - 1) + 1);
            const randomColor = Math.floor(Math.random() * (350 - 250) + 250);
            const randomButton = Math.floor(Math.random() * (5 - 1) + 1);

            /* prevents faulty images back from request, only seen this so far but could have a better fix */
            if(recipe.Image == '//20fix.com/xfood/img/#NAME?.jpg') {
                recipe.Image = '{{ path }}/static/assets/svg/logo.svg';
            }

            elRecipe = elRecipe.replaceAll('{{ random-color }}', randomColor);
            elRecipe = elRecipe.replaceAll('{{ random-color-alt }}', 250 - randomColor);
            elRecipe = elRecipe.replaceAll('{{ random-button }}', randomButton);
            elRecipe = elRecipe.replaceAll('{{ random-frame }}', randomFrame);
            elRecipe = elRecipe.replaceAll('{{ random-blob }}', randomBLob);
            elRecipe = elRecipe.replaceAll('{{ title }}', recipe.Title);
            elRecipe = elRecipe.replaceAll('{{ Image }}', recipe.Image);
            elRecipe = elRecipe.replaceAll('{{ id }}', recipe.id);

            /* add elRecipe template to elRecipes [string] */
            elRecipes += elRecipe;
        });

        /* process home template before returning it */
        homeTemplate = homeTemplate.replace('{{ recipes }}', elRecipes);
        homeTemplate = homeTemplate.replace('{{ ingredient }}', recipesData.ingredient);
        homeTemplate = homeTemplate.replaceAll('{{ path }}', this.host);
        return homeTemplate;
    }

    /**
     * fetch recipes data from local file
     * 
     * @returns [json] recipes data
     */
    async #getData() {
        const res = await fetch('/get-recipes', { method: 'post' });
        return await res.json();
    }
} 
import fs from "fs";

/**
 * manages the fetching and writing of recipes file.
 */
export default class {
    #ingredients;
    #apiKey;

    constructor(apiKey) {
        /* list of ingredients from local file in JSON */
        this.#ingredients = JSON.parse(fs.readFileSync('data/food.json', 'utf8'));

        /* API key from rapidAPI */
        this.#apiKey = apiKey;
    }

    /**
     * pick a random ingredient from te list of ingredients
     * 
     * @returns [string] a random ingredient
     */
    #randomIngredient() {
        const random = Math.floor(Math.random() * this.#ingredients.length);
        const randomIngredient = this.#ingredients[random]['FOOD NAME'];
        return randomIngredient;
    }

    /**
     * fetch and write the recipes file
     */
    async writeRecipe() {
        const randomIngredient = this.#randomIngredient();
        const res = await fetch(`https://food-recipes-with-images.p.rapidapi.com/?q=[${randomIngredient}]&rapidapi-key=${this.#apiKey}`);
        const data = await res.json();

        /* only write file if the list returns 8 recipes or more */
        
        if(data.t <= 5) this.writeRecipe();
        else if(data.message) console.log('api request failed!', data.message);
        else {
            const stringData = JSON.stringify(data);
            const file = `{"ingredient":"${randomIngredient}","recipes":${stringData}}`;
            fs.writeFile(`data/random-recipes.json`, file, (err) => {
                if(err) console.log('File write error', err);
                else console.log('File write success');
            });
        }
    }
}




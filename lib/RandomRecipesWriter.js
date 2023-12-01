import fs from "fs";

export default class {
    #ingredients;
    #apiKey;
    constructor(apiKey) {
        this.#ingredients = JSON.parse(fs.readFileSync('data/food.json', 'utf8'));
        this.#apiKey = apiKey;
    }

    #randomIngredient() {
        const random = Math.floor(Math.random() * this.#ingredients.length);
        const randomIngredient = this.#ingredients[random]['FOOD NAME'];
        return randomIngredient;
    }

    async writeRecipe() {
        const randomIngredient = this.#randomIngredient();
        const res = await fetch(`https://food-recipes-with-images.p.rapidapi.com/?q=[${randomIngredient}]&rapidapi-key=${this.#apiKey}`);
        const data = await res.json();

        if(data.t <= 3) this.writeRecipe();
        else if(data.message) console.log('api request failed!');
        else {
            const stringData = JSON.stringify(data);
            const file = `{"ingredient":"${randomIngredient}","recipes":${stringData}}`
            fs.writeFileSync(`public/static/recipes/random-recipes.json`, file, (err) => {
                if(err) console.log('File write error', err);
                else console.log('File write success');
            });
        }
    }
}




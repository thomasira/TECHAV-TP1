import express  from 'express';
import path from 'path';
import config from './config/config.js';
import fs from "fs";
import { fileURLToPath } from 'url';
import RandomRecipesGetter from './lib/RandomRecipesGetter.js';

/* for __dirname because not supported in ES6 module */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* instanciate express and define static repo(for all front-end assets) */
const app = express();
app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')));

/* config variables */
const port = config.PORT;
const apiKey = config.API_KEY;


const randomRecipesGetter = new RandomRecipesGetter(apiKey);

async function writeRecipes() {
    const data = await randomRecipesGetter.getRecipes();
    const file = `{"ingredient":"${randomIngredient}","recipes":${data}}`;
    fs.writeFile(`public/static/recipes/random-recipes.json`, file, (err) => {
        if(err) console.log('File write error', err);
        else console.log('File write success');
    });
}

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.post('/get-recipe', (req, res) => {
    randomRecipesWriter.writeRecipe();
    fs.watch(__dirname + '/public/static/recipes/random-recipes.json', (eventType, filename) => { 
        res.end('end');
    });
});

app.listen(config.PORT || 8081, () => console.log('server running...'));
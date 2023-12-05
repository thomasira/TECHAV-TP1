import express  from 'express';
import path from 'path';
import config from './config/config.js';
import fs from "fs";
import { fileURLToPath } from 'url';
import RandomRecipesWriter from './lib/RandomRecipesWriter.js';

/* for __dirname because not supported in ES6 module */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* instanciate express and define static repo(for all front-end assets) */
const app = express();
app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')));

/* config variables */
const port = config.PORT;
const apiKey = config.API_KEY;

const randomRecipesWriter = new RandomRecipesWriter(apiKey);
/* randomRecipesWriter.writeRecipe(); */

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.post('/get-recipes', (req, res) => {
    fs.readFile(path.resolve(__dirname, 'data', 'random-recipes.json'), 'utf8', (err, data) => {
        res.end(data);
    });
});

app.post('/get-new-recipes', (req, res) => {
    randomRecipesWriter.writeRecipe();
    fs.watch(__dirname + '/data/random-recipes.json', (eventType, filename) => {
        res.end(); 
    });
});

app.listen(port || 8081, () => console.log('server running...'));
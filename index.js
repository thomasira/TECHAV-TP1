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

/* instanciate the writer class */
const randomRecipesWriter = new RandomRecipesWriter(apiKey);

/* time 8h before calling a file writing */
function writeTimer() {
    setInterval(() => {
        randomRecipesWriter.writeRecipe();
    }, 28800000)
}

/* call file writing and timer */
randomRecipesWriter.writeRecipe();
writeTimer();

/* all get routes (SPA) */
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

/**
 * when fetched, returns the data from recipes file
 */
app.post('/get-recipes', (req, res) => {
    fs.readFile(path.resolve(__dirname, 'data', 'random-recipes.json'), 'utf8', (err, data) => {
        res.end(data);
    });
});

/**
 * when fetched, write new file, watch for it and return confirmation.
 * need to fix error handling because very superficial as of now(after 10 sec).
 */
app.post('/get-new-recipes', (req, res) => {
    randomRecipesWriter.writeRecipe();
    fs.watch(__dirname + '/data/random-recipes.json', (eventType, filename) => {
        res.end('file written'); 
    });
    setTimeout(() => {
        return res.end('a problem occured');
      }, "4000");
});

app.listen(port || 8081, () => console.log('server running...'));
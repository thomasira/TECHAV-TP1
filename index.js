import express  from "express";
import request from 'request';
import path from "path";
import fs from "fs";
import config from './config/config.js';
import { fileURLToPath } from 'url';

/* for __dirname because not supported in ES6 module */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')));

/* config variables */
const port = config.PORT;
const apiKey = config.API_KEY;

app.get('/*', (req, res) => {
    const countries = ["america", "canada", "france"];
    countries.forEach(country => {
        let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${country}`;
        request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request'}
        }, (err, response, data) => {
            if(err) console.log('Error:', err);
            else if(response.statusCode !== 200) console.log('Status:', response.statusCode);
            else {
                const newData = JSON.stringify(data);
                fs.writeFile(`public/static/results/${country}.json`, newData, (err) => {
                    if(err) {
                        console.log('File write error', err);
                        res.status(500).send('Internal server error');
                    } else {
                        console.log('File write success');
                        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
                    }
                });
            }
        });
    }); 
});

app.listen(config.PORT || 8081, () => console.log('server running...'));
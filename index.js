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

const port = config.PORT;
const apiKey = config.API_KEY;

const objDate = new Date();
const date = objDate.toISOString().slice(0, 10);

objDate.setDate(objDate.getDate() - 21);
const from = objDate.toISOString().slice(0, 10);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.get('/strike-news', (req, res) => {
    const ticker = req.params.ticker;
    let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=gr%C3%A8ve%20quebec`;
    
    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
    }, (err, response, data) => {
        if(err) console.log('Error:', err);
        else if(response.statusCode !== 200) console.log('Status:', response.statusCode);
        else {
            const newData = JSON.stringify(data);
            fs.writeFile(`results/${date}.json`, newData, (err) => {
                if(err) {
                    console.log('File write error', err);
                    res.status(500).send('Internal server error');
                } else {
                    console.log('File write success');
                    res.send('success');
                } 
            });
        }
    });
});

app.listen(config.PORT || 8081, () => console.log('server running...'));
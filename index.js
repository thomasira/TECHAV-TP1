import express  from "express";
import path from "path";
import { fileURLToPath } from 'url';

/* for __dirname because not supported in ES6 module */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')));


app.listen(8080, () => console.log('server running...'));
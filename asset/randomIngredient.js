import fs from "fs";

let ingredients = fs.readFileSync('asset/food.json', 'utf8');
ingredients = JSON.parse(ingredients);
const random = Math.floor(Math.random() * ingredients.length);
const randomIngredient = ingredients[random]['FOOD NAME'];
export default randomIngredient;




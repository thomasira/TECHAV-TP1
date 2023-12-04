# Yum ?
TechAv-TP 1

### The project
Yum ? is a single page web app that generates a list of recipes fetched from a distant API. A random ingredient is fetched from a local file every 8 hours and a request is sent to a recipe API returning a list of recipes containing this ingredient. It is built using JavaScript technologies, with node.js on the server side.

### Demo


Uploading demo-recipe (1).mp4…



### The looks
Linking food with natural shapes and tones felt right from the start, but there was more. Using static shapes for styling randomly generated recipes was not going to work and there was no certainty in the amount of recipes returning from the request to the API. To achieve a more natural look, the shapes and tones had to be randomly generated for each recipe to render. To do this, a shape from a local bank is randomly picked for each type of shape and its tone is randomly altered if necessary.

### The techs
On the server side, node is used with express for request and file management. On the front side, vanilla JS using external AnimeJs library for the animations

### References
Some help was needed for the realisation of this project

- most blob shapes: https://www.blobmaker.app/
- recipe API: https://rapidapi.com/zilinskivan/api/food-recipes-with-images/
- list of ingredients: https://foodb.ca/downloads
- AnimeJs: https://animejs.com/documentation/

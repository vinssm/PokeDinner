
var getPokeInfo = function (pokemonName) {
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // Pass city info to corresponding functions
                    pokemonInfo(data);
                });
            } else {
                alert("Error: Pokemon not found");
            }
        });
};
var pokemonInfo = function(data) {
    console.log(data);
    var weight = data.weight;
    var height = data.height;
    console.log(data.species.name + " is " + Math.floor(weight/4.536) + "lbs");
    console.log(data.species.name + " is " + Math.round(10*(height/3.048))/10 + "feet");
};

var getRecipe = function (minCal, maxCal) {
    var apiUrl = "https://api.spoonacular.com/recipes/findByNutrients?apiKey=40e808b51d7a4c93a511c37332820d56&minCalories=" + minCal + "&maxCalories=" + maxCal + "&number=2&random=true";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // Pass city info to corresponding functions
                    recipeInfo(data);
                });
            } else {
                alert("Error: Recipes not found");
            }
        });
};

var recipeInfo = function(recipes) {
    console.log(recipes);
}
var pokemonName = "pikachu";
var minCal = "300";
var maxCal = "350";
getPokeInfo(pokemonName);
getRecipe(minCal, maxCal);



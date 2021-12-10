// global variables
var pokemonName = "pikachu";
var minCal = "300";
var maxCal = "350";

// retrieve pokemon info based on user input
var getPokeInfo = function (pokemonName) {
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    pokemonInfo(data);
                });
            } else {
                alert("Error: Pokemon not found");
            }
        });
};

// retrieve and convert pokemon info into standard units
var pokemonInfo = function (data) {
    console.log(data);
    var weight = data.weight;
    var height = data.height;
    console.log(data.species.name + " is " + Math.floor(weight / 4.536) + "lbs");
    console.log(data.species.name + " is " + Math.round(10 * (height / 3.048)) / 10 + "feet");
};
//NEED TO CONVERT WEIGHT INTO CALORIE RANGE AND PASS UNTO FUNCTION BELOW

// get recipe based on calorie range
var getRecipe = function (minCal, maxCal) {
    var apiUrl = "https://api.spoonacular.com/recipes/findByNutrients?apiKey=40e808b51d7a4c93a511c37332820d56&minCalories=" + minCal + "&maxCalories=" + maxCal + "&number=2&random=true";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    recipeInfo(data);
                });
            } else {
                alert("Error: Recipes not found");
            }
        });
};

// retrieve recipe info and pass unto displayRecipes(), retrieve recipe ID and pass unto retrieveUrl()
var recipeInfo = function (recipes) {
    for (var i = 0; i < recipes.length; i++) {
        var recipeName = recipes[i].title;
        var recipeCal = recipes[i].calories;
        var recipeImgSrc = recipes[i].image;
        var recipeID = recipes[i].id;
        displayRecipes(recipeName, recipeCal, recipeImgSrc);
        retrieveRecipeUrl(recipeID);
    }
};

// retrieve recipe url based on recipe ID
var retrieveRecipeUrl = function(recipeID) {
    var apiUrl = "https://api.spoonacular.com/recipes/" + recipeID + "/information?apiKey=40e808b51d7a4c93a511c37332820d56";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    linkToRecipe(data);
                });
            } else {
                alert("Error: Recipe URL not found");
            }
        });
};

// add recipe urls as href to recipe cards
var linkToRecipe = function(data) {
    var recipeUrl = data.spoonacularSourceUrl;
    console.log(recipeUrl);
};

// display recipes in a cards
var displayRecipes = function(recipeName, recipeCal, recipeImgSrc){
    console.log(recipeName, recipeCal, recipeImgSrc);
};

getPokeInfo(pokemonName);
getRecipe(minCal, maxCal);



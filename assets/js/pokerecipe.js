// retrieve pokemon name from url
var getPokemonName = function () {
    var queryString = document.location.search;
    var pokemonName = queryString.split("=")[1];
    if (pokemonName) {
        getPokeInfo(pokemonName);
    } else {
        document.location.replace("./index.html");
    }
}

// retrieve pokemon info 
var getPokeInfo = function (pokemonName) {
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    pokemonInfo(data);
                });
            } else {
                var modal = document.querySelector("#pokemon-error");
                modal.showModal();
            }
        });
};

// retrieve and convert pokemon info into standard units, pass it unto getCalorieRange() and displayPokemonCard()
var pokemonInfo = function (data) {
    console.log(data);
    var name = data.name;
    var type = data.types[0].type.name;
    var weight = Math.ceil(data.weight / 4.536);
    var height = Math.round(10 * (data.height / 3.048)) / 10;
    var imgSrc = data.sprites.front_default;

    getCalorieRange(weight);
    displayPokemonCard(name, type, weight, height, imgSrc);
};

// get calorie range based on pokemon weight, using customized WHO formula from https://www.thejakartapost.com/life/2016/09/27/how-to-calculate-your-ideal-calorie-intake.html
var getCalorieRange = function (weight) {
    var minCal = Math.ceil((weight * 2.2 * 15.3 + 679) / 3) - 50;
    var maxCal = Math.ceil((weight * 2.2 * 15.3 + 679) / 3) + 50;
    console.log(minCal, maxCal);
    getRecipe(minCal, maxCal);
};

// display pokemon card based on retrieved pokemon info
var displayPokemonCard = function (name, type, weight, height, imgSrc) {
    console.log(name + '\n' + type + '\n' + weight + "lbs" + '\n' + height + "feet" + '\n' + imgSrc);
};

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
                // var modal = document.querySelector("#recipe-error");
                // modal.showModal();
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
        displayRecipes(recipeName + '\n' + recipeCal + " calories" + '\n' + recipeImgSrc);
        retrieveRecipeUrl(recipeID);
    }
};

// retrieve recipe url based on recipe ID
var retrieveRecipeUrl = function (recipeID) {
    var apiUrl = "https://api.spoonacular.com/recipes/" + recipeID + "/information?apiKey=40e808b51d7a4c93a511c37332820d56";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    linkToRecipe(data);
                });
            } else {
                // var modal = document.querySelector("#recipe-error");
                // modal.showModal();
            }
        });
};

// add recipe urls as href to recipe cards
var linkToRecipe = function (data) {
    var recipeUrl = data.spoonacularSourceUrl;
    console.log(recipeUrl);
};

// display recipes in a cards
var displayRecipes = function (recipeName, recipeCal, recipeImgSrc) {
    console.log(recipeName, recipeCal, recipeImgSrc);
};

getPokemonName();


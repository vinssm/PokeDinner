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
    var minCal = Math.ceil((weight / 2.2 * 15.3 + 679) / 3) - 50;
    var maxCal = Math.ceil((weight / 2.2 * 15.3 + 679) / 3) + 50;
    getRecipe(minCal, maxCal);
    // display cal range on page
    document.querySelector("#min-cal").textContent = minCal + " cal";
    document.querySelector("#max-cal").textContent = maxCal + " cal";
};

// display pokemon card based on retrieved pokemon info
var displayPokemonCard = function (name, type, weight, height, imgSrc) {
    document.querySelector("#pokemon-name").textContent = name.toUpperCase() + "!";
    document.querySelector("#card-title-pName").textContent = name.toUpperCase();
    document.querySelector("#card-sprite").setAttribute("src", imgSrc);
    document.querySelector("#card-type").textContent = "TYPE: " + type.toUpperCase();
    document.querySelector("#card-weight").textContent = "WEIGHT: " + weight + "LBS";
    document.querySelector("#card-height").textContent = "HEIGHT: " + height + "FT";
    // display pokemon name again on recipe section <p>
    document.querySelector("#recipe-pName").textContent = name.toUpperCase();
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
                var modal = document.querySelector("#recipe-error");
                modal.showModal();
            }
        });
};

// retrieve recipe info and pass unto displayRecipes(), retrieve recipe ID and pass unto retrieveUrl()
var recipeInfo = function (recipes) {
        var recipeName1 = recipes[0].title;
        var recipeCal1 = recipes[0].calories;
        var recipeImgSrc1 = recipes[0].image;
        var recipeID1 = recipes[0].id;
        var recipeName2 = recipes[1].title;
        var recipeCal2 = recipes[1].calories;
        var recipeImgSrc2 = recipes[1].image;
        var recipeID2 = recipes[1].id;
        displayRecipes(recipeName1, recipeCal1, recipeImgSrc1, recipeName2, recipeCal2, recipeImgSrc2);
        retrieveRecipeUrl1(recipeID1);
        retrieveRecipeUrl2(recipeID2);
};

// retrieve recipe url based on recipe ID 1
var retrieveRecipeUrl1 = function (recipeID1) {
    var apiUrl1 = "https://api.spoonacular.com/recipes/" + recipeID1 + "/information?apiKey=40e808b51d7a4c93a511c37332820d56";

    fetch(apiUrl1)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    linkToRecipe1(data);
                });
            } else {
                var modal = document.querySelector("#recipe-error");
                modal.showModal();
            }
        });
};

// retrieve recipe url based on recipe ID 1
var retrieveRecipeUrl2 = function (recipeID2) {
    var apiUrl2 = "https://api.spoonacular.com/recipes/" + recipeID2 + "/information?apiKey=40e808b51d7a4c93a511c37332820d56";

    fetch(apiUrl2)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    linkToRecipe2(data);
                });
            } else {
                var modal = document.querySelector("#recipe-error");
                modal.showModal();
            }
        });
};

// display recipes in a cards
var displayRecipes = function (recipeName1, recipeCal1, recipeImgSrc1, recipeName2, recipeCal2, recipeImgSrc2) {
    console.log(recipeName1, recipeCal1, recipeImgSrc1, recipeName2, recipeCal2, recipeImgSrc2)
    document.querySelector("#recipe-name-1").textContent = recipeName1;
    document.querySelector("#recipe-cal-1").textContent = "Calories: " + recipeCal1;
    document.querySelector("#recipe-img-1").setAttribute("src", recipeImgSrc1);
    document.querySelector("#recipe-name-2").textContent = recipeName2;
    document.querySelector("#recipe-cal-2").textContent = "Calories: " + recipeCal2;
    document.querySelector("#recipe-img-2").setAttribute("src", recipeImgSrc2);
};

// add recipe urls as href to recipe cards, retrieve addtl info
var linkToRecipe1 = function (data) {
    var recipeUrl = data.spoonacularSourceUrl;
    var recipeTime = data.readyInMinutes;
    var recipeScore = data.healthScore;
    document.querySelector("#recipe-url-1").setAttribute("href", recipeUrl);
    document.querySelector("#recipe-time-1").textContent = "Time to make: " + recipeTime + " min";
    document.querySelector("#recipe-hScore-1").textContent = "Health rating: " + recipeScore + " pts";
};
var linkToRecipe2 = function (data) {
    var recipeUrl = data.spoonacularSourceUrl;
    var recipeTime = data.readyInMinutes;
    var recipeScore = data.healthScore;
    document.querySelector("#recipe-url-2").setAttribute("href", recipeUrl);
    document.querySelector("#recipe-time-2").textContent = "Time to make: " + recipeTime + " min";
    document.querySelector("#recipe-hScore-2").textContent = "Health rating: " + recipeScore + " pts";
};

getPokemonName();


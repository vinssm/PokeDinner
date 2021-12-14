// retrieve search term from input form, pass it unto URL for secondary page
function pokePage() {
    var pokemonSearch = document.querySelector("#pokeSearch").value.trim();
    location.href = "pokerecipe.html?pokemon=" + pokemonSearch;
};
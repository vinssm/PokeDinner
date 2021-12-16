// retrieve search term from input form, pass it unto URL for secondary page
function pokePage(pokemonSearch) {
  location.href = "pokerecipe.html?pokemon=" + pokemonSearch;
};

function saveSearch() {
  // if nothing in search-history then set searchHist to empty array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
  const searchHist = JSON.parse(localStorage.getItem('search-history')) ?? []
  var searchTerm = document.querySelector("#pokeSearch").value
  .trim()
  // remove spaces and "." eg "Mr. Mime"
  .replaceAll('.','')
  .replaceAll(' ', '-')
  .toLowerCase();
  
  if(!searchHist.includes(searchTerm)){
    searchHist.push(searchTerm)
    localStorage.setItem('search-history', JSON.stringify(searchHist));
  }
  
  console.log(searchHist);
  pokePage(searchTerm);
};

// Load last search term to balloon from localStorage if it exists
function loadSearch() {
  const searchHist = JSON.parse(localStorage.getItem('search-history'));
  if (searchHist) {
    console.log(searchHist)
  } else {
    console.log("nothing in searchHist");
  }
}

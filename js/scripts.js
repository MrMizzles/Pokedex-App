// IIFE starts.
let pokemonRepository = (function () {
  // Array for storing Pokémon.  
  let pokemonList = [];
  // API website with Pokémon list
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let searchInput = document.querySelector("#search-input");
  let loading = document.getElementById("loading");
  let countdown = 2000;
  
  // Checks validity and adds valid Pokémon to Pokémon array. 
  function add(pokemon) {
      if (typeof pokemon === "object")
    {
      pokemonList.push(pokemon);
    } else {
        console.log("invalid Pokémon");
    }
  }

    // Retrieves Pokémon array.
    function getAll() {
      return pokemonList;
    }
   
    // Creates a button for each Pokémon in the array.
    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('button-class');
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);

      // When clicked logs Pokémon details in console.
      button.addEventListener('click', function () {
        showDetails(pokemon)
      });
    }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    })
  };

  //Fetches Pokémon data from the API then add to PokemonList
  function loadList() {
    
    // Shows loading image.
    document.getElementById("loading");
    
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  setTimeout(function() {
    
    // Hides loading image after "countdown" milliseconds.
    document.getElementById("loading").setAttribute("style","display:none");
}, countdown);
  
//Loads specified Pokémon details and an image.
  function loadDetails(item) {    
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }) .then(function (details) {
          
      // Adds details to the item.
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    })
      .catch(function (e) {
        console.error(e);
    });
  } 

    // Filtered search for Pokémon.
    searchInput.addEventListener("input", function () {
      pokemonRepository.filterSearch(searchInput);
    });
  
    function filterSearch(searchInput) {
      let filterValue = searchInput.value.toLowerCase();
    
      // Filter the PokemonList array based on the filter value.
      let filteredPokemon = pokemonList.filter(function (pokemon) {
        return pokemon.name.toLowerCase().indexOf(filterValue) > -1;
      });
    
      // Updates the displayed list of Pokémon based on the filtered search results.
      let pokemonListElement = document.querySelector(".pokemon-list");
      pokemonListElement.innerHTML = "";
      filteredPokemon.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
    }
  
  //Keywords to make functions accessible outside IIFE.
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    filterSearch: filterSearch,
  };
})();  // IIFE ENDS.

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
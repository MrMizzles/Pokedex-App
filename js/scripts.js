// IIFE starts.
let pokemonRepository = (function () {
 
  // Array for storing Pokémon.  
  let pokemonList = [];
 
  // API website with Pokémon list
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
 
  // Checks validity and adds valid Pokémon to Pokémon array. 
  return {
    add: function (pokemon) {
      if (typeof pokemon === "object" && "name" in pokemon && "height" in pokemon && "weight" in pokemon && "type" in pokemon)
    {
      pokemonList.push(pokemon);
    } else {
        console.log("invalid Pokémon")
    }},
    
    // Retrieves Pokémon array.
    getAll: function () {
      return pokemonList;
    },
   
    // Creates a button for each Pokémon in the array.
    addListItem: function (pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('button-class');
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);

      // When clicked logs Pokémon details in console.
      button.addEventListener('click', function () {
        showDetails(pokemon);
      });
    },
  };

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    })
  };

  //Fetches Pokémon data from the API then add to PokemonList
  function loadList() {
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
  //Loads specified Pokémon details and an image.
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }),then(function (details ) {
      // Adds details to the item.
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  } 
  //Keywords to make functions accessible outside IIFE.
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();  // IIFE ENDS.

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


// console.log(pokemonRepository.getAll());


// //adds Pokémon to PokémonList array
// pokemonRepository.add(
//   { 
//     name: 'Pikachu', 
//     height: 1.04, 
//     weight: 13.2, 
//     type: ['Electric'], 
//   });

// console.log(pokemonRepository.getAll());

// //calls addListItem function
// pokemonRepository.getAll().forEach(function (pokemon) {
//   pokemonRepository.addListItem(pokemon);
// });

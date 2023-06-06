// IIFE starts.
let pokemonRepository = (function () {
  // Array for storing Pokémon.
  let pokemonList = [];

  // API website with Pokémon list
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  let countdown = 500;

  let searchInput = document.querySelector("#search-input");

  // Hides loading image after "countdown" milliseconds.
  setTimeout(function () {
    document.getElementById("loading").setAttribute("style", "display:none");
  }, countdown);

  // Checks validity and adds valid Pokémon to Pokémon array.
  function add(pokemon) {
    if (typeof pokemon === "object") {
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
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    // When clicked logs Pokémon details in console.
    button.addEventListener("click", function () {
      pokemonRepository.showDetails(pokemon);
    });
  }

  //Fetches Pokémon data from the API then add to PokemonList
  function loadList() {
    // Shows loading image.
    document.getElementById("loading");

    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
            height: item.height,
            types: item.types,
            weight: item.weight,
            detailsUrl: item.url,
            image: item.imageUrl,
          };
          pokemonRepository.add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Loads specified Pokémon details and an image.
  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Adds details to the item.
        pokemon.height = details.height;
        pokemon.type = details.types;
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.imageUrlBack = details.sprites.back_default;
        pokemon.weight = details.weight;
        pokemon.abilities = details.abilities;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(pokemon) {
    // Add modal content
    let modalTitle = document.querySelector(".modal-title");
    modalTitle.innerText = pokemon.name;

    let pokemonImage = document.querySelector(".pokemon-image");
    pokemonImage.src = pokemon.imageUrl;

    let pokemonBackImage = document.querySelector(".pokemon-image-back");
    pokemonBackImage.src = pokemon.imageUrlBack;

    let pokemonHeight = document.querySelector(".pokemon-height");
    pokemonHeight.innerText = "Height: " + pokemon.height / 10 + "m";

    let pokemonWeight = document.querySelector(".pokemon-weight");
    pokemonWeight.innerText = "Weight: " + pokemon.weight + " lbs.";
  }

  // Pops up modal with Pokémon details and a picture + logs to the console.
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      pokemonRepository.showModal(pokemon);
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

  // Keywords to make functions accessible outside IIFE.
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    showDetails: showDetails,
    filterSearch: filterSearch,
  };
})(); // IIFE ENDS.

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

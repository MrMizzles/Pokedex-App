// IIFE starts.
let pokemonRepository = (function () {
  
  // Array for storing Pokémon.  
  let pokemonList = [];
  
  // API website with Pokémon list
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  let searchInput = document.querySelector("#search-input");
  
  // let loading = document.getElementById("loading");
  let countdown = 500;
 
  let modalContainer = document.querySelector('#modal-container');
 
  // Hides loading image after "countdown" milliseconds.
  setTimeout(function() {
    document.getElementById("loading").setAttribute
    ("style","display:none"); }, countdown);

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
      let listPokemon = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('button-class');
      listPokemon.appendChild(button);
      pokemonList.appendChild(listPokemon);

      // When clicked logs Pokémon details in console.
      button.addEventListener('click', function () {
        showDetails(pokemon)
      });
    }

//Fetches Pokémon data from the API then add to PokemonList
  function loadList() {
    
// Shows loading image.
    document.getElementById("loading");
    
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
          height: item.height,
          types: item.types,
          weight: item.weight,
          detailsUrl: item.url,
          image: item.imageUrl
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  
//Loads specified Pokémon details and an image.
  function loadDetails(pokemon) {    
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }) .then(function (details) { 

// Adds details to the item.
      pokemon.height = details.height;
      pokemon.types = details.types;
      pokemon.sprite = details.sprites.front_default;
      pokemon.sprite2 = details.sprites.back_default;
      pokemon.weight = details.weight;
    })
      .catch(function (e) {
        console.error(e);
    });
  } 

  function showModal(title, text, imageUrl) {
    let modalContainer = document.querySelector('#modal-container');
    // Clear all existing modal content
    modalContainer.innerHTML = '';
  
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
  
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
  
    let contentElement = document.createElement('p');
    contentElement.innerText = text;
    
    let container = document.querySelector('#image-container');

    let myImage = document.createElement('img');
    myImage.src = imageUrl

    // let imageElement = document.createElement('img');
    // imageElement.setAttribute('src', img);
    // imageElement.setAttribute('width', '304');
    // imageElement.setAttribute('height', '228');
  
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    // modalContainer.appendChild(imageElement);
    modalContainer.appendChild(modal);
    modalContainer.appendChild(myImage);
  
    modalContainer.classList.add('is-visible');
  }
  
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal();
  });

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, + pokemon.weight + ' lbs.', + '<img src=' +
      pokemon.sprite);
      console.log(pokemon);
    })
  };

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
    showModal: showModal,
    hideModal: hideModal,
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
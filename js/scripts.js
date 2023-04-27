/* Use comments often as it helps everyone, including yourself! */
// IIFE starts.
var pokemonRepository = (function () {
 
  // Array for storing Pokémon.  
  let pokemonList = [
    {name:  "Bulbasaur", height: 2, weight: 15.2, type: ['Grass ', ' Poison']},
    {name: "Charzard", height: 5, weight: 199.5, type: ['Fire ', ' Flying']},
    {name: "Mewtwo", height: 6, weight: 269, type: ['Physhic']}];
  
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
    console.log(pokemon)
  };


    // Keywords to make functions accessible outside IIFE.
    // return {
    //   add: add,
    //   getAll: getAll,
      // filterItems: filterItems,
    //   addListItem: addListItem
    // };

})();  // IIFE ENDS.

console.log(pokemonRepository.getAll());

//adds Pokémon to PokémonList array
pokemonRepository.add(
  { 
    name: 'Pikachu', 
    height: 1.04, 
    weight: 13.2, 
    type: ['Electric'], 
  });

console.log(pokemonRepository.getAll());

//calls addListItem function
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

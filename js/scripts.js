/* Use comments often as it helps everyone, including yourself! */
// IIFE starts
let pokemonRepository = (function () {
  
  // Array for storing Pokémon.  
  let pokemonList = [
    {name:  "Bulbasaur", height: 2, weight: 15.2, type: ['Grass ', ' Poison']},
    {name: "Charzard", height: 5, weight: 199.5, type: ['Fire ', ' Flying']},
    {name: "Mewtwo", height: 6, weight: 269, type: ['Physhic']}];
    
  // Functions to add Pokémon to and retrieve from Pokémon list. 
  // keywords to make functions accessible outside IIFE.
  return {
    add: function (pokemon) {
      if (typeof pokemon === "object" && "name" in pokemon)
    {
      pokemonList.push(pokemon);
    } else {
        console.log("invalid Pokémon")
    }},
    getAll: function () {
      return pokemonList;
    },
  };

    // Makes functions accessible outside IIFE.
    // return {
    //   add: add,
    //   getAll: getAll,
    //   filterItems: filterItems,
    // };

})();  // IIFE ENDS.

pokemonRepository.add(
  { 
    name: 'Pikachu', 
    height: 1.04, 
    weight: 13.2, 
    type: ['Electric'],
    category: ' Licking' 
  });

console.log(pokemonRepository.getAll());

document.write("" + "Pokédex" + "<br>");
pokemonRepository.getAll().forEach(function (pokemon) {
  document.write( 
      " " +
      pokemon.name +
      " -" +
      " " +
      "(Height" +
      ": " +
      pokemon.height +
      ")," +
      " " +
      "(Weight" +
      ": " +
      pokemon.weight +
      ")," +
      " " +
      "(Type" +
      ": " +
      pokemon.type +
      ")," +
      " " +
      "(Category" +
      ": " +
      pokemon.category +
      ") <br>"
  );
});
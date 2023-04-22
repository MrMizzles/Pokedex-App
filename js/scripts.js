/* Use comments often as it helps everyone, including yourself! */

// an array of Pokémon with physical and type details.
let pokemonList = [
    {name:  "Bulbasaur", height: 2, weight: 15.2, type: ['grass ', ' poison']},
    {name: "Charzard", height: 5, weight: 199.5, type: ['fire ', ' flying']},
    {name: "Mewtwo", height: 6, weight: 269, type: ['physhic']}
];

// for (let i = 0; i < pokemonList.length; i++) {
//   // check if the height is greater than or equal to 6 then prints details
//   if (pokemonList[i].height >= 6) {
//     document.write(pokemonList[i].name + " (Type: " + pokemonList[i].type + ")" + " (Weight: " + pokemonList[i].weight + ")" + " (Height: " + pokemonList[i].height + ") - Wow, that's tall!<br>");
//   } else {
//       document.write(pokemonList[i].name + " (Type: " + pokemonList[i].type + ")" + " (Weight: " + pokemonList[i].weight + ")" + " (Height: " + pokemonList[i].height + ")<br>");
//   }
// }

// function that checks if the height is greater than or equal to 6 then prints details
function myLoopFunction(pokemon) {
  if (pokemon.height >= 6) {
    document.write(pokemon.name + " (Type: " + pokemon.type + ")" + " (Weight: " + pokemon.weight + ")" + " (Height: " + pokemon.height + ") - Wow, that's tall!<br>");
  } else {
      document.write(pokemon.name + " (Type: " + pokemon.type + ")" + " (Weight: " + pokemon.weight + ")" + " (Height: " + pokemon.height + ")<br>");
  }
}

pokemonList.forEach(myLoopFunction);


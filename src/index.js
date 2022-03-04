//Calculate Tip
function searchPokemon() {
  var pokemon = document.getElementById("pokemon").value;

  //validate input
  if (pokemon === "") {
    alert("Please enter values");
    return;
  }

  fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then(function (response) {
      // The API call was successful!
      console.log("success!", response.body);
    })
    .catch(function (err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });

  document.getElementById("pokemonInfo").style.display = "block";
  document.getElementById("info").style.display = "block";
  document.getElementById("info").innerHTML = pokemon;
}

//Hide the tip amount on load
document.getElementById("pokemonInfo").style.display = "none";
document.getElementById("info").style.display = "none";
//click to call function
document.getElementById("search").onclick = function () {
  searchPokemon();
};

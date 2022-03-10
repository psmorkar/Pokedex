var toggle = false;
var currentPoke = {};
$("#pokemonImage").attr("src", "" );

$( document ).ready(function() {
  console.log( "ready!" );
  for (var i = 0; i < localStorage.length; i++){
    var poke = JSON.parse(localStorage.getItem(localStorage.key(i)));
    addToPokeContainer(poke);
  }
});

async function getPokemonInfo(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  console.log("Inside getPokemonInfo()");
  const pokemon = await res.json();
  currentPoke = pokemon;
  getPokemonGeneralInfo(pokemon);
}

function getPokemonGeneralInfo(pokemon) {
  $("#pokeInfo").text("Pokemon Name " + pokemon.name);
  $("#pokemonImage").attr("src", pokemon.sprites.front_default || "" );
  $("#weight").text("Pokemon Weight  " + pokemon.weight);
  $("#height").text("Pokemon Heigh " + pokemon.height);
  $("#type1").text("Pokemon Type1 : " + pokemon.types[0].type.name);
}

$("#pokeButton").on("click", function () {
  console.log("Button Clicked pokeButton");
  value = $("#pokemonNumber").val();
  getPokemonInfo(value);
});

$("#pokeSaveButton").on("click", function () {
  var id = currentPoke["id"];
  console.log("Inside pokeSaveButton " + id);
  if (localStorage.getItem(id) == null) {
    localStorage.setItem(id, JSON.stringify(currentPoke));
    addToPokeContainer(currentPoke);
  }
});

function addToPokeContainer(poke) {
    console.log("Inside addToPokeContainer id: " + poke);
    const pokemonContainer = document.querySelector(".pokemon-container");
    console.log("Inside addToPokeContainer: " + pokemonContainer);
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");
    pokemonEl.innerHTML = `
    <div class="block">
      <img onclick="showPoke(${poke["id"]})" id="poke${poke["id"]}"src=${poke["sprites"]["front_default"]}>${poke.name}
    </div>
    `;
    pokemonContainer.appendChild(pokemonEl);
  }

function toggleImage() {
  if (toggle === true) {
    $("#pokemonImage").attr("src", currentPoke["sprites"]["front_default"] || "");
  } else {
    $("#pokemonImage").attr("src", currentPoke["sprites"]["back_default"] || "");
  }
  toggle = !toggle;
}

function showPoke(id) {
  console.log("Show poke" + id);
  currentPoke = JSON.parse(localStorage.getItem(id));
  getPokemonGeneralInfo(currentPoke);
}

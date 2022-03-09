var flag = true;
const cachedPokemon = {};
var currentPoke = {};

async function getPokemonInfo(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await res.json();
  currentPoke = pokemon;
  console.log('Poke Data' + cachedPokemon[25]);
  getPokemonGeneralInfo(pokemon);
}

function getPokemonGeneralInfo(pokemon) {
  $("#pokeInfo").text("Pokemon Name " + pokemon.name);
  $("#pokemonImage").attr("src", pokemon.sprites.front_default);
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
  if (cachedPokemon[id] == null) {
    console.log('Poke Data' + id);
    cachedPokemon[id] = currentPoke;

    console.log("Button Clicked pokeSaveButton");
    const pokemonContainer = document.querySelector(".pokemon-container");
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");
    pokemonEl.innerHTML = `
    <div class="block">
      <img onclick="showPoke(${currentPoke["id"]})" id="poke${currentPoke["id"]}"src=${currentPoke["sprites"]["front_default"]}>${currentPoke.name}
    </div>
    `;
    pokemonContainer.appendChild(pokemonEl);
  }
});


function toggleImage() {
  if (flag == false) {
    console.log("pokeCardImage image matched");
    $("#pokemonImage").attr("src", currentPoke["sprites"]["front_default"] || "");
    flag = true;
  } else {
    console.log("pokeCardImage image not matched");
    $("#pokemonImage").attr("src", currentPoke["sprites"]["back_default"] || "");
    flag = false;
  }
}


function showPoke(id) {
  console.log("Show poke" + id);
  currentPoke = cachedPokemon[id];
  getPokemonGeneralInfo(cachedPokemon[id]);
}

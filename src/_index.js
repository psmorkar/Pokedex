function searchPokemon() {
  document.query;
  var pokeName = document.getElementById("poke-name").value;
  const pokeId = document.querySelector(".poke-id");
  const pokeTypeOne = document.querySelector(".poke-type-one");
  const pokeTypeTwo = document.querySelector(".poke-type-two");
  const pokeWeight = document.querySelector(".poke-weight");
  const pokeHeight = document.querySelector(".poke-height");
  const pokeCardImage = document.querySelector(".card");
  const pokemonContainer = document.querySelector(".button-wrapper");

  console.log(pokeName);

  //validate input
  if (pokeName === "") {
    alert("Please enter values");
    return;
  }
  pokeName = "pikachu";
  fetch("https://pokeapi.co/api/v2/pokemon/" + pokeName)
    .then((res) => res.json())
    .then((data) => {
      console.log("success!", data);
      pokeId.textContent = data["id"];
      pokeName = data["name"];
      const dataTypes = data["types"];
      const dataFirstType = dataTypes[0];
      const dataSecondType = dataTypes[1];
      pokeTypeOne.textContent = dataFirstType["type"]["name"];
      if (dataSecondType) {
        pokeTypeTwo.classList.remove("hide");
        pokeTypeTwo.textContent = dataFirstType["type"]["name"];
      } else {
        pokeTypeTwo.classList.remove("hide");
        pokeTypeTwo.textContent = "";
      }
      pokeWeight.textContent = data["weight"];
      pokeHeight.textContent = data["height"];

      pokeFrontImageSrc = data["sprites"]["front_default"] || "";
      pokeBackImageSrc = data["sprites"]["back_default"] || "";
      pokeCardImage.src = data["sprites"]["front_default"] || "";

      const pokemonEl = document.createElement("div");
      pokemonEl.classList.add("pokemon");


      pokemonEl.innerHTML = `
        <button data-action="slideLeft">${pokeName}</button>

        `;
        pokemonContainer.appendChild(pokemonEl);
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });
}

var pokeFrontImageSrc;
var pokeBackImageSrc;
const pokeCardImage = document.querySelector(".card");
var front = false;

document.querySelector(".toggleCard").addEventListener("click", (e) => {
  console.log("button clicked");
  if (front == false) {
    console.log("pokeCardImage image matched");
    pokeCardImage.src = pokeBackImageSrc;
    front = true;
  } else {
    console.log("pokeCardImage image not matched");
    pokeCardImage.src = pokeFrontImageSrc;
    front = false;
  }
});

document.getElementById("search").onclick = function () {
  searchPokemon();
};

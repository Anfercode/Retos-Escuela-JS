const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://rickandmortyapi.com/api/character/";
var no_characters = false;

if (localStorage.getItem("next_fetch")) {
  localStorage.clear();
}

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;

      let output = characters
        .map(character => {
          return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `;
        })
        .join("");
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      localStorage.setItem("next_fetch", `${response.info.next}`);
    })
    .catch(error => console.log(error));
};

async function loadData() {
  if (!localStorage.getItem("next_fetch")) {
    no_characters ? disableObserver() : getData(API);
    no_characters = true;
  } else {
    await getData(localStorage.getItem("next_fetch"));
  }
}

function disableObserver() {
  intersectionObserver.unobserve($observe);
  let app = `<h1>No hay mas personajes!!!</h1>`;
  let newItem = document.createElement("section");
  newItem.classList.add("app");
  newItem.innerHTML = app;
  $app.appendChild(newItem);
}

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      loadData();
      console.log("========>" + localStorage.getItem("next_fetch"));
    }
  },
  {
    rootMargin: "0px 0px 100% 0px"
  }
);

intersectionObserver.observe($observe);

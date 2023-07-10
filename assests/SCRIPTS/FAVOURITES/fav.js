// Marvel API credentials
const publicKey = "3ea73adff2cad3b3d5d1419aa4e88218";
const privateKey = "8a79129e7cc0b54c239743dc0117ef6f3a5698a5";
const hash = "05df130a5162d748ed5ff65556f3565a";
const ts = 1;

// Select the DOM element with the ID "superHeroList"
const superHeroList = document.getElementById("superHeroList");

// Retrieve the favoritesCharacterIDs from local storage
let favouritesCharacterIDs = JSON.parse(localStorage.getItem("favouritesCharacterIDs"));

// Check if the favoritesCharacterIDs is empty or null
if (favouritesCharacterIDs === null || favouritesCharacterIDs.length == 0) {
  emptyFavList();
} else {
  fillFavDetails();
}

// Function to fetch and fill details of the favorite superheroes
function fillFavDetails() {
  for (let i = 0; i < favouritesCharacterIDs.length; i++) {
    fetchSuperheroData(favouritesCharacterIDs[i]);
  }
}

// Function to display a message when the favorites list is empty
function emptyFavList() {
  const li = document.createElement("li");
  li.innerHTML = `<h1>No Super Hero added to favorites</h1>`;
  superHeroList.append(li);
}

// Function to fetch superhero data based on the provided 'id'
async function fetchSuperheroData(id) {
  try {
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
    const data = await response.json();
    const superhero = data.data.results[0];
    console.log(superhero);
    addSuperHeroToDom(superhero);
  } catch (error) {
    console.log(error);
  }
}

// Function to add a superhero to the DOM
function addSuperHeroToDom(allSuperHeroList) {
  const li = document.createElement("li");
  li.className = "listItemTag";
  if (!allSuperHeroList.description) {
    allSuperHeroList.description = "No Description found!!";
  }
  li.innerHTML = `
    <li>
      <div id="listItemRightDiv">
        <img src="${allSuperHeroList.thumbnail.path}.jpg" class="superhero" data-id=${allSuperHeroList.id}></img>
        <strong><label>${allSuperHeroList.description}</label>
      </div>
      <br/> 
      <div id="listItemLeftDiv">
        <h1><label for="${allSuperHeroList.id}">${allSuperHeroList.name}</label></h1>
        <button id="disLike">Remove from Favorites</button>
      </div>
      <br/>
    </li>
  `;

  // Event listener for the superhero image click
  const imgElement = li.querySelector(".superhero");
  imgElement.addEventListener("click", function () {
    console.log(`Clicked on superhero with ID: ${allSuperHeroList.id}`);
    window.open("superhero.html?id=" + allSuperHeroList.id, "_blank");
  });

  // Event listener for the "Remove from Favorites" button click
  const disLikeBtn = li.querySelector("#disLike");
  disLikeBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    removeFromFavorites(allSuperHeroList.id);
    li.remove();
  });

  superHeroList.append(li);
}

// Function to remove a superhero from the favorites list
function removeFromFavorites(id) {
  favouritesCharacterIDs = favouritesCharacterIDs.filter((item) => item.toString() !== id.toString());
  localStorage.setItem("favouritesCharacterIDs", JSON.stringify(favouritesCharacterIDs));
  if (favouritesCharacterIDs.length == 0) {
    emptyFavList();
  }
}

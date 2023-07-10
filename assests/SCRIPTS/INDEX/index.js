// Initialize an empty array to store the list of superheroes
let superHeroList = [];

// Select the DOM element with the class "result-box"
const resultsBox = document.querySelector(".result-box");

// Select the DOM element with the ID "input-box"
const inputBox = document.getElementById("input-box");

// Marvel API credentials
const publicKey = "3ea73adff2cad3b3d5d1419aa4e88218";
const privateKey = "8a79129e7cc0b54c239743dc0117ef6f3a5698a5";
const hash = "05df130a5162d748ed5ff65556f3565a";
const ts = 1;

// Array to store all superheroes fetched from the Marvel API
let allSuperHeroList = [];

// Fetch and populate the list of all superheroes from the Marvel API
fillListOfAllHeroes();

// Function to search for superheroes based on the entered text
async function searchHeroes(searhedText) {
  try {
    // Make a request to the Marvel API characters endpoint with the search text
    const res = await fetch(
      `https://gateway.marvel.com/v1/public/characters?ts=1&nameStartsWith=${searhedText}&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f`
    );
    // Parse the response data as JSON
    const data = await res.json();
    // Store the retrieved superheroes in the superHeroList array
    superHeroList = data.data.results;
    // Return a filtered list of superhero names
    return filterNameFromList(superHeroList);
  } catch (error) {
    console.log(error);
  }
}

// Event listener for keyup event on the input box
inputBox.onkeyup = async function () {
  let result = [];
  let input = inputBox.value;
  if (input.length) {
    // Perform a search for superheroes based on the entered text
    let ans = await searchHeroes(input);

    // Filter the search results based on the entered text
    result = ans.filter((keywords) => {
      return keywords.toLowerCase().includes(input.toLowerCase());
    });

    // Clear the results box
    resultsBox.innerHTML = "";

    if (ans.length > 0) {
      // If there are search results, create a list and display them
      const ul = document.createElement("ul");
      ans.forEach((name) => {
        const li = document.createElement("li");
        li.textContent = name;

        // Create a favorites button
        const favoritesBtn = document.createElement("button");
        favoritesBtn.className = "likeBtn";
        const icon = document.createElement('i');
        icon.classList.add('fa-solid','fa-heart');
        favoritesBtn.appendChild(icon);
        li.appendChild(favoritesBtn);

        // Add event listener to the favorites button
        favoritesBtn.addEventListener("click", function (event) {
          event.stopPropagation();
          addToFavorites(name);
        });

        // Add event listener to the list item
        li.addEventListener("click", function () {
          let id = searchId(name);
          if (id) {
            console.log("Clicked on " + name + ", ID: " + id);
            // Open a new window or tab with the superhero details
            window.open("superhero.html?id=" + id, "_blank");
            inputBox.value = "";
          } else {
            console.log("ID not found for " + name);
          }
          console.log("Clicked on " + name);
        });

        ul.appendChild(li);
      });

      resultsBox.appendChild(ul);
    } else {
      // If no search results found, display a message
      const ul = document.createElement("ul");
      const li = document.createElement("li");
      li.textContent = "No results found";
      ul.appendChild(li);
      resultsBox.appendChild(ul);
    }
  } else {
    // If no input, clear the results box
    resultsBox.innerHTML = "";
  }
};

// Function to filter superhero names from the given superhero list
function filterNameFromList(superList) {
  return superList.map((superhero) => superhero.name);
}

// Function to display the search results in the results box
function displaySearchList(result) {
  const content = result.map((list) => {
    return "<li onclick=seletcInput(this)>" + list + "</li>";
  });
  resultsBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

// Function to search and retrieve the ID of a superhero based on their name
function searchId(name) {
  const superhero = superHeroList.find((superhero) => superhero.name === name);
  if (superhero) {
    return superhero.id;
  } else {
    return null; // or any other value to indicate that the ID was not found
  }
}

// Function to add a superhero to favorites
function addToFavorites(name) {
  console.log("Added to favorites:", name);
  let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
  let id = searchId(name);
  if (favouritesCharacterIDs == null) {
    favouritesCharacterIDs = [];
  } else {
    favouritesCharacterIDs = JSON.parse(
      localStorage.getItem("favouritesCharacterIDs")
    );
  }
  if (favouritesCharacterIDs.includes(id)) {
    alert("This superhero is already added to favourites.");
  } else {
    favouritesCharacterIDs.push(id);
    localStorage.setItem(
      "favouritesCharacterIDs",
      JSON.stringify(favouritesCharacterIDs)
    );
    alert("Superhero added to favourites!");
    resultsBox.innerHTML = "";
    inputBox.value = "";
  }
}

// Select the DOM element with the ID "listOfAllHeroes"
const listOfAllHeroes = document.getElementById("listOfAllHeroes");

// Fetch and render the list of all superheroes
async function fillListOfAllHeroes() {
  try {
    const response = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    const data = await response.json();
    allSuperHeroList = data.data.results;
    renderList(allSuperHeroList);
  } catch (error) {
    console.log(error);
  }
}

// Render the list of all superheroes on the webpage
function renderList(allSuperHeroList) {
  for (let i = 0; i < allSuperHeroList.length; i++) {
    addSuperHeroToDom(allSuperHeroList[i]);
  }
}

// Function to add a superhero to the DOM
function addSuperHeroToDom(element) {
  const li = document.createElement("li");
  li.className = "listofAllSuperHero";
  li.innerHTML = `
    <li>
      <h3>${element.name}</h3>
      <img src="${element.thumbnail.path}.jpg" class="superhero" data-id=${element.id}></img>
    </li>
  `;
  const imgElement = li.querySelector(".superhero");

  // Add event listener to the superhero image
  imgElement.addEventListener("click", function () {
    console.log(`Clicked on superhero with ID: ${element.id}`);
    // Open a new window or tab with the superhero details
    window.open("superhero.html?id=" + element.id, "_blank");
  });
  listOfAllHeroes.append(li);
}

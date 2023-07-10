// Parse the URL parameters to retrieve the 'id' parameter
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Marvel API credentials
const publicKey = "3ea73adff2cad3b3d5d1419aa4e88218";
const privateKey = "8a79129e7cc0b54c239743dc0117ef6f3a5698a5";
const hash = "05df130a5162d748ed5ff65556f3565a";
const ts = 1;

// Redirect to index.html if 'id' is not provided
if (!id) {
  window.location.href = 'index.html';
}
else{
  fetchSuperheroData(id);
}

// Fetch superhero data based on the provided 'id'
async function fetchSuperheroData(id) {
  try {
    // Make a request to the Marvel API to fetch details of the superhero with the given 'id'
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
    const data = await response.json();
    const superhero = data.data.results[0];

    // Update the DOM elements with superhero details
    const img = document.getElementById("potraitImage");
    img.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
    const name = document.getElementById("nameTag");
    const desc = document.getElementById("descTag");
    const comicTag = document.getElementById("comicTag");
    const seriesTag = document.getElementById("seriesTag");
    const storiesTag = document.getElementById("storiesTag");

    // Set the superhero name and description
    name.textContent = superhero.name;
    desc.textContent = superhero.description || "No Description found!!";

    // Set the counts of comics, series, and stories
    comicTag.textContent = "Comics " + superhero.comics.available;
    seriesTag.textContent = "Series " + superhero.series.available;
    storiesTag.textContent = "Stories " + superhero.stories.available;
  } catch (error) {
    console.log(error);
  }
}

// Function to add the superhero to the favorites
function addToFavourites() {
  let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
  if (favouritesCharacterIDs == null) {
    favouritesCharacterIDs = [];
  } else {
    favouritesCharacterIDs = JSON.parse(localStorage.getItem("favouritesCharacterIDs"));
  }
  if (favouritesCharacterIDs.includes(id)) {
    alert("This superhero is already added to favourites.");
  } else {
    favouritesCharacterIDs.push(id);
    localStorage.setItem("favouritesCharacterIDs", JSON.stringify(favouritesCharacterIDs));
    alert("Superhero added to favourites!");
  }
}

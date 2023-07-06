const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const publicKey = "3ea73adff2cad3b3d5d1419aa4e88218";
const privateKey = "8a79129e7cc0b54c239743dc0117ef6f3a5698a5";
const hash = "05df130a5162d748ed5ff65556f3565a";
const ts = 1;
//const favList=[];
fetchSuperheroData(id);



async function fetchSuperheroData(id) {
    try {
      
      const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
      const data = await response.json();
      const superhero = data.data.results[0];
      console.log(superhero);
      const img = document.getElementById("potraitImage");
      img.src=`${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
      const name = document.getElementById("nameTag");
      const desc = document.getElementById("descTag");
      const comicTag = document.getElementById("comicTag");
      const seriesTag= document.getElementById("seriesTag");
      const storiesTag = document.getElementById("storiesTag")
      //const eventsTag = document.getElementById("storiesTag");
  
  
      name.textContent=superhero.name;
      desc.textContent=superhero.description;
      comicTag.textContent= "Comics "+ superhero.comics.available;
      seriesTag.textContent = "Series "+superhero.series.available;
      storiesTag.textContent = "Stories " +superhero.stories.available;
    } catch (error) {
      console.log(error);
    }
  }

  function addToFavourites(){
    let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
    if (favouritesCharacterIDs == null) {
        // If we did't got the favouritesCharacterIDs then we iniitalize it with empty map
             favouritesCharacterIDs = [];
        }
    else{
        favouritesCharacterIDs=JSON.parse(localStorage.getItem("favouritesCharacterIDs"));
        } 
        if (favouritesCharacterIDs.includes(id)) {
            // ID already exists in the favourites, display alert
            alert("This superhero is already added to favourites.");
          } else {
            // Add the ID to the favouritesCharacterIDs array
            favouritesCharacterIDs.push(id);
            // Update the favouritesCharacterIDs in local storage
            localStorage.setItem("favouritesCharacterIDs", JSON.stringify(favouritesCharacterIDs));
            // Display success message or perform other actions if desired
            alert("Superhero added to favourites!");
          }
  }
function returnToHome(){
    window.location.href = 'index.html';
}
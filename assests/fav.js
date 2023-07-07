const publicKey = "3ea73adff2cad3b3d5d1419aa4e88218";
const privateKey = "8a79129e7cc0b54c239743dc0117ef6f3a5698a5";
const hash = "05df130a5162d748ed5ff65556f3565a";
const ts = 1;
const superHeroList = document.getElementById("superHeroList");
let favouritesCharacterIDs = JSON.parse(localStorage.getItem("favouritesCharacterIDs"));
fillFavDetails();
function fillFavDetails(){
    for(let i=0;i<favouritesCharacterIDs.length;i++){
        fetchSuperheroData(favouritesCharacterIDs[i]);
    }
}


async function fetchSuperheroData(id) {
    try {
      
      const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
      const data = await response.json();
      const superhero = data.data.results[0];
      console.log(superhero);
      addSuperHeroToDom(superhero);
    }catch (error) {
        console.log(error);
      }
    }


  function addSuperHeroToDom(allSuperHeroList) {
    const li = document.createElement("li");
    li.className = "listItemTag";
    li.innerHTML = `
          <li>
          <div id="listItemRightDiv">
          <img src="${allSuperHeroList.thumbnail.path}.jpg" class="superhero" data-id=${allSuperHeroList.id}></img>
          <strong><label>${allSuperHeroList.description}</label>
          </div>
          <br/> 
          <div id="listItemLeftDiv">
          <button id="disLikeBtn><i class="fa-solid fa-heart-crack"></i></button>
          <h1><label for="${allSuperHeroList.id}">${allSuperHeroList.name}</label>
          </h1>
          </div>
          <br/>
          
          </li>
          `;
    li.addEventListener("click", function () {
      // Handle the click event here
      console.log(`Clicked on superhero with ID: ${allSuperHeroList.id}`);
      //window.location.href = `superhero.html?id=${allSuperHeroList.id}`;
      window.open("superhero.html?id=" + allSuperHeroList.id, "_blank");
    });
    let disLikeBtn=li.querySelector(".disLikeBtn");
    superHeroList.append(li);
    disLikeBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      removeFromFavorites(superhero.id);
      li.remove();
    });
  
    superHeroList.append(li);
  }
  
  function removeFromFavorites(id) {
    favouritesCharacterIDs = favouritesCharacterIDs.filter((item) => item !== id);
    localStorage.setItem("favouritesCharacterIDs", JSON.stringify(favouritesCharacterIDs));
  }


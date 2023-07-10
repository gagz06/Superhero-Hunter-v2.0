let superHeroList = [];
const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

const publicKey = "3ea73adff2cad3b3d5d1419aa4e88218";
const privateKey = "8a79129e7cc0b54c239743dc0117ef6f3a5698a5";
const hash = "05df130a5162d748ed5ff65556f3565a";
const ts = 1;
let allSuperHeroList = [];
fillListOfAllHeroes();

async function searchHeroes(searhedText) {
  try {
    const res = await fetch(
      `https://gateway.marvel.com/v1/public/characters?ts=1&nameStartsWith=${searhedText}&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f`
    );
    const data = await res.json();
    superHeroList = data.data.results;
    return filterNameFromList(superHeroList);
  } catch (error) {
    console.log(error);
  }
}

inputBox.onkeyup = async function () {
  let result = [];
  let input = inputBox.value;
  if (input.length) {
    let ans = await searchHeroes(input);

    result = ans.filter((keywords) => {
      return keywords.toLowerCase().includes(input.toLowerCase());
    });
    //displaySearchList(result);

    resultsBox.innerHTML = "";

    if (ans.length > 0) {
      const ul = document.createElement("ul");
      ans.forEach((name) => {
        const li = document.createElement("li");
        li.textContent = name;
        const favoritesBtn = document.createElement("button");
        favoritesBtn.className="likeBtn";
        //favoritesBtn.textContent = "Add to Favoritess";
        const icon = document.createElement('i');
        icon.classList.add('fa-solid','fa-heart');
        favoritesBtn.appendChild(icon);
        li.appendChild(favoritesBtn);
        ul.appendChild(li);
        favoritesBtn.addEventListener("click", function (event) {
          event.stopPropagation();
          addToFavorites(name);
        });
        li.addEventListener("click", function () {
          // Get the ID from the hidden field
          //const selectedId = this.querySelector('input').value;
          // Perform your action with the selected ID
          let id = searchId(name);
          if (id) {
            console.log("Clicked on " + name + ", ID: " + id);
            window.open("superhero.html?id=" + id, "_blank");
            inputBox.value="";
          } else {
            console.log("ID not found for " + name);
          }
          console.log("Clicked on " + name);
        });
      });
      resultsBox.appendChild(ul);
    } else {
      const ul = document.createElement("ul");
      const li = document.createElement("li");
      li.textContent = "No results found";
      ul.appendChild(li);
      resultsBox.appendChild(ul);
    }
  } else {
    resultsBox.innerHTML = "";
  }
};
function filterNameFromList(superList) {
  return superList.map((superhero) => superhero.name);
}
function displaySearchList(result) {
  const content = result.map((list) => {
    return "<li onclick=seletcInput(this)>" + list + "</li>";
  });
  resultsBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

function searchId(name) {
  const superhero = superHeroList.find((superhero) => superhero.name === name);
  if (superhero) {
    return superhero.id;
  } else {
    return null; // or any other value to indicate that the ID was not found
  }
}

function addToFavorites(name) {
  // Add your logic to handle adding the superhero to favorites
  console.log("Added to favorites:", name);
  let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
  let id = searchId(name);
  if (favouritesCharacterIDs == null) {
    // If we did't got the favouritesCharacterIDs then we iniitalize it with empty map
    favouritesCharacterIDs = [];
  } else {
    favouritesCharacterIDs = JSON.parse(
      localStorage.getItem("favouritesCharacterIDs")
    );
  }
  if (favouritesCharacterIDs.includes(id)) {
    // ID already exists in the favourites, display alert
    alert("This superhero is already added to favourites.");
  } else {
    // Add the ID to the favouritesCharacterIDs array
    favouritesCharacterIDs.push(id);
    // Update the favouritesCharacterIDs in local storage
    localStorage.setItem(
      "favouritesCharacterIDs",
      JSON.stringify(favouritesCharacterIDs)
    );
    // Display success message or perform other actions if desired
    alert("Superhero added to favourites!");
    resultsBox.innerHTML = "";
    inputBox.value = "";
  }
}
const listOfAllHeroes =document.getElementById("listOfAllHeroes");
async function fillListOfAllHeroes(){
  try{
    const response = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    const data = await response.json();
    allSuperHeroList = data.data.results;
    renderList(allSuperHeroList);
  }
  catch(error){
    console.log(error);
  }
}
function renderList(allSuperHeroList){
  for(let i=0;i<allSuperHeroList.length;i++){
    addSuperHeroToDom(allSuperHeroList[i]);
  }
}
function addSuperHeroToDom(element){
  const li = document.createElement("li");
  li.className = "listofAllSuperHero";
  li.innerHTML=`
  <li>
  <h3>${element.name}</h3>
  <img src="${element.thumbnail.path}.jpg" class="superhero" data-id=${element.id}></img>
  </li>
  `;
  const imgElement = li.querySelector(".superhero");
  imgElement.addEventListener("click", function () {
    // Handle the click event here
    console.log(`Clicked on superhero with ID: ${element.id}`);
    //window.location.href = `superhero.html?id=${allSuperHeroList.id}`;
    window.open("superhero.html?id=" + element.id, "_blank");
  });
  listOfAllHeroes.append(li);
}
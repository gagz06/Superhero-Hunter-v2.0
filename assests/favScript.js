const publicKey = "3ea73adff2cad3b3d5d1419aa4e88218";
const privateKey = "8a79129e7cc0b54c239743dc0117ef6f3a5698a5";
const hash = "05df130a5162d748ed5ff65556f3565a";
const ts = 1;
const superHeroList = document.getElementById("superHeroList");
let favouritesCharacterIDs = JSON.parse(localStorage.getItem("favouritesCharacterIDs"));
fetchAllSuperHeroList();
async function fetchAllSuperHeroList() {
    try {
      const response = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
      );
      const data = await response.json();
      //console.log(data);
      allSuperHeroList = data.data.results;
      console.log(allSuperHeroList);
      renderList();
    } catch (error) {
      console.log(error);
    }
  }

  function renderList() {
    

    superHeroList.innerHTML = "";
    for (let i = 0; i < allSuperHeroList.length; i++) {
        const superhero = allSuperHeroList[i];
        if (favouritesCharacterIDs.includes(superhero.id)) {
            addSuperHeroToDom(superhero);
        }
    }
  }

//   function addSuperHeroToDom(allSuperHeroList) {
//     const li = document.createElement("li");
//     li.className = "listItemTag";
//     li.innerHTML = `
//           <li>
//           <div id="listItemLeftDiv">
//           <strong><label for="${allSuperHeroList.id}">${allSuperHeroList.name}</label>
//           </strong>
//           <br/>    
//           </div>
//           <br/>
//           <div id="listItemRightDiv">
//           <img src="${allSuperHeroList.thumbnail.path}.jpg" class="superhero" data-id=${allSuperHeroList.id}></img>
//           </div>
//           </li>
//           `;
//     li.addEventListener("click", function () {
//       // Handle the click event here
//       console.log(`Clicked on superhero with ID: ${allSuperHeroList.id}`);
//       window.location.href = `superhero.html?id=${allSuperHeroList.id}`;
//     });
//     superHeroList.append(li);
// }

function addSuperHeroToDom(superhero) {
  const card = document.createElement("div");
  card.className = "superheroCard";

  const image = document.createElement("img");
  image.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
  image.alt = superhero.name;
  image.className = "superheroImage";
  card.appendChild(image);

  const name = document.createElement("div");
  name.textContent = superhero.name;
  name.className = "superheroName";
  card.appendChild(name);

  card.addEventListener("click", function () {
    console.log(`Clicked on superhero with ID: ${superhero.id}`);
    window.location.href = `superhero.html?id=${superhero.id}`;
  });

  superHeroList.appendChild(card);
}



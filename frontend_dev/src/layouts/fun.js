var petsData = [{
  name: "Purrsloud",
  species: "Cat",
  favFoods: ["wet food", "dry food", "<strong>any</strong> food"],
  birthYear: 2016,
  photo: "https://learnwebcode.github.io/json-example/images/cat-2.jpg"
},
{
  name: "Barksalot",
  species: "Dog",
  birthYear: 2008,
  photo: "https://learnwebcode.github.io/json-example/images/dog-1.jpg"
},
{
  name: "Meowsalot",
  species: "Cat",
  favFoods: ["tuna", "catnip", "celery"],
  birthYear: 2012,
  photo: "https://learnwebcode.github.io/json-example/images/cat-1.jpg"
}
];

var tableStart = `
<table>
  <tr>
    <th>Name</th>
    <th>Species</th>
    <th>Birth Year</th>
    <th>Favorite Foods</th>
  </tr>`;
var tableEnd = `
</table>`;

function foods(foods) {
return `
<h4>Favorite Foods</h4>
<ul class="foods-list">
${foods.map(food => `<li>${food}</li>`).join("")}
</ul>
`;
}

function petTemplate(pet) {
return `
    <tr>
      <td>${pet.name}</td>
      <td>${pet.species }</td>
      <td>${pet.birthYear}</td>
      <td>${pet.favFoods ? foods(pet.favFoods) : ""}</td>
    </tr>
`;
}

document.getElementById("table").innerHTML = `
${tableStart}
${petsData.map(petTemplate).join("")}
${tableEnd}
`;
<div id="table"></div>
















var but= document.createElement("BUTTON");
                but.innerHTML="but";
              
                
                but.addEventListener("click",my);
                cardfooter.appendChild(but);

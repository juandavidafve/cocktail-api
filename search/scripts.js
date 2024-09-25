async function fillAlcoholOptions() {
  const alcoholElem = document.querySelector("#alcohol");

  const alcoholReq = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list"
  );
  const alcohol = await alcoholReq.json();

  for (const drink of alcohol.drinks) {
    const elem = document.createElement("option");
    elem.value = drink.strAlcoholic;
    elem.innerText = drink.strAlcoholic;

    if (getUrlParams().alcohol === elem.value) {
      elem.selected = true;
    }

    alcoholElem.appendChild(elem);
  }
}

async function fillIngredientOptions() {
  const ingredientsElem = document.querySelector("#ingredient");

  const ingredientsReq = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
  );
  const ingredients = await ingredientsReq.json();

  for (const ingredient of ingredients.drinks) {
    const elem = document.createElement("option");
    elem.value = ingredient.strIngredient1;
    elem.innerText = ingredient.strIngredient1;

    ingredientsElem.appendChild(elem);
  }
}

function getUrlParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let name = urlParams.get("name");

  if (name.length === 0) {
    name = null;
  }

  let ingredient = urlParams.get("ingredient");

  if (ingredient === "null") {
    ingredient = null;
  }

  let alcohol = urlParams.get("alcohol");

  if (alcohol === "null") {
    alcohol = null;
  }

  return {
    name,
    ingredient,
    alcohol,
  };
}

function fillInputs() {
  const { name, ingredient, alcohol } = getUrlParams();

  if (name) {
    document.querySelector("#name").value = name;
  }
  if (ingredient) {
    document.querySelector("#ingredient").value = ingredient;
  }
  if (alcohol) {
    document.querySelector("#alcohol").value = alcohol;
  }
}

async function getResults() {
  const { name, ingredient, alcohol } = getUrlParams();

  let url = "";
  if (name) {
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  } else if (ingredient) {
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  } else if (alcohol) {
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcohol}`;
  }

  const resultsElem = document.querySelector("#results");
  const req = await fetch(url);
  const data = await req.json();

  resultsElem.innerHTML = data.drinks
    .map((drink) => {
      return `
        <div>
            <a href="/drink?id=${drink.idDrink}">${drink.strDrink}</a>
            <img src="${drink.strDrinkThumb}" />
        </div>
      `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  fillInputs();
  fillAlcoholOptions();
  fillIngredientOptions();
  getResults();
});

// Obtener el parámetro del nombre del ingrediente desde la URL
const urlParams = new URLSearchParams(window.location.search);
const ingredientName = urlParams.get('ingrediente');

// Elementos del DOM
const ingredientImg = document.getElementById('ingredient-img');
const ingredientNameElement = document.getElementById('ingredient-name');
const ingredientIdElement = document.getElementById('ingredient-id');
const ingredientDescriptionElement = document.getElementById('ingredient-description');
const ingredientTypeElement = document.getElementById('ingredient-type');
const ingredientAlcoholicElement = document.getElementById('ingredient-alcoholic');
const ingredientAbvElement = document.getElementById('ingredient-abv');

// Función para obtener los detalles del ingrediente
function fetchIngredientDetails(ingredientName) {
    // Reemplazar espacios por guiones bajos para la API
    const formattedIngredientName = ingredientName.replace(/ /g, "_");
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${formattedIngredientName}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const ingredient = data.ingredients[0];
            ingredientNameElement.textContent = ingredient.strIngredient;
            ingredientIdElement.textContent = ingredient.idIngredient;
            ingredientDescriptionElement.textContent = ingredient.strDescription || "No hay descripción disponible.";
            ingredientTypeElement.textContent = ingredient.strType || "No especificado.";
            ingredientAlcoholicElement.textContent = ingredient.strAlcohol === "Yes" ? "Sí" : "No";
            ingredientAbvElement.textContent = ingredient.strABV || "N/A";
            
            // Imagen del ingrediente
            const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient}.png`;
            ingredientImg.src = imageUrl.replace(/ /g, "%20");
        })
        .catch(error => {
            console.error("Error al obtener los detalles del ingrediente:", error);
        });
}

// Llamar a la función con el nombre del ingrediente desde la URL
if (ingredientName) {
    fetchIngredientDetails(ingredientName);
}
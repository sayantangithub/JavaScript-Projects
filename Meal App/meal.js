document.addEventListener("DOMContentLoaded", async function () {
  const mealDetailsDiv = document.getElementById("meal-details");

  const urlParams = new URLSearchParams(window.location.search);
  const mealId = urlParams.get("id");

  if (mealId) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const meal = data.meals[0];

      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        } else {
          break;
        }
      }

      mealDetailsDiv.innerHTML = `
          <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${
        meal.strMeal
      }">
            <div class="card-body">
              <h2 class="card-title">${meal.strMeal}</h2>
              <p class="card-text"><strong>Category:</strong> ${
                meal.strCategory
              }</p>
              <p class="card-text"><strong>Area:</strong> ${meal.strArea}</p>
              <p class="card-text"><strong>Instructions:</strong> ${
                meal.strInstructions
              }</p>
              <h4>Ingredients:</h4>
              <ul>
                ${ingredients
                  .map((ingredient) => `<li>${ingredient}</li>`)
                  .join("")}
              </ul>
              <a href="${
                meal.strYoutube
              }" target="_blank" class="btn btn-primary">Watch on YouTube</a>
            </div>
          </div>
        `;
    } catch (error) {
      console.error("Error fetching meal details:", error);
      mealDetailsDiv.innerHTML =
        "<p>Failed to fetch meal details. Please try again later.</p>";
    }
  } else {
    mealDetailsDiv.innerHTML = "<p>No meal ID provided.</p>";
  }
});

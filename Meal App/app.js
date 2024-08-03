document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const searchButton = document.getElementById("search-btn");
  const showCategoriesButton = document.getElementById("show-categories-btn");
  const showCategoriesDiv = document.getElementById("show-categories-div");
  const resultsDiv = document.getElementById("results");
  const categoriesDiv = document.getElementById("categories");
  const categoriesMenuDiv = document.getElementById("categories-menu");
  const favoritesDiv = document.getElementById("favorites");
  const menuBtn = document.getElementById("menu-btn");
  const sectionsDiv = document.getElementById("sections");
  const searchTitle = document.getElementById("search-title");

  const menuCollapse = new bootstrap.Collapse(document.getElementById("menu"), {
    toggle: false,
  });
  const favoritesCollapse = new bootstrap.Collapse(
    document.getElementById("favorites-menu"),
    { toggle: false }
  );

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const updateFavorites = () => {
    favoritesDiv.innerHTML = "";
    favorites.forEach((meal) => {
      const mealDiv = document.createElement("div");
      mealDiv.className = "meal";
      mealDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <p>${meal.strMeal}</p>
                    <button class="btn btn-danger remove-fav-btn" data-id="${meal.idMeal}">Remove from Favorites</button>
                `;
      favoritesDiv.appendChild(mealDiv);
    });
    document.querySelectorAll(".remove-fav-btn").forEach((button) => {
      button.addEventListener("click", removeFavorite);
    });
  };

  const removeFavorite = (event) => {
    const mealId = event.target.dataset.id;
    favorites = favorites.filter((meal) => meal.idMeal !== mealId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavorites();
  };

  const addFavorite = (meal) => {
    if (!favorites.some((favMeal) => favMeal.idMeal === meal.idMeal)) {
      favorites.push(meal);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavorites();
    }
  };

  const searchMeals = async (query, isCategory = false) => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const apiUrl = isCategory
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodedQuery}`
        : `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodedQuery}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data); // Log the data to see the API response

      // Clear previous search results
      resultsDiv.innerHTML = "";
      searchTitle.classList.remove("d-none");
      resultsDiv.classList.remove("d-none");

      if (data.meals && data.meals.length > 0) {
        data.meals.forEach((meal) => {
          const mealDiv = document.createElement("div");
          mealDiv.className = "meal";
          mealDiv.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <p>${meal.strMeal}</p>
                        <button class="btn btn-primary fav-btn" data-id="${meal.idMeal}">Add to Favorites</button>
                    `;
          mealDiv.addEventListener("click", () => {
            window.location.href = `meal.html?id=${meal.idMeal}`;
          });
          resultsDiv.appendChild(mealDiv);
          mealDiv
            .querySelector(".fav-btn")
            .addEventListener("click", (event) => {
              event.stopPropagation();
              addFavorite(meal);
            });
        });
      } else {
        resultsDiv.innerHTML =
          "<p>No meals found. Please try another search query.</p>";
      }

      // Hide the sections and show the hamburger menu
      sectionsDiv.style.display = "none";
      menuBtn.classList.remove("d-none");
      showCategoriesDiv.classList.remove("d-none"); // Show the Show Categories button
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const displayCategories = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data); // Log the data to see the API response

      categoriesDiv.innerHTML = ""; // Clear previous categories
      categoriesMenuDiv.innerHTML = ""; // Clear previous categories in the menu

      data.categories.forEach((category) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category";
        categoryDiv.innerHTML = `
                    <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="category-img">
                    <p>${category.strCategory}</p>
                    `;
        const handleCategoryClick = () => {
          resultsDiv.innerHTML = ""; // Clear previous results
          searchMeals(category.strCategory, true); // Search by selected category

          // Hide the sections and show the hamburger menu
          sectionsDiv.style.display = "none";
          menuBtn.classList.remove("d-none"); // Show menu button
          showCategoriesDiv.classList.remove("d-none"); // Show the Show Categories button
        };
        categoryDiv.addEventListener("click", handleCategoryClick);
        categoriesDiv.appendChild(categoryDiv);

        // Clone for the menu
        const categoryMenuDiv = categoryDiv.cloneNode(true);
        categoryMenuDiv.addEventListener("click", handleCategoryClick);
        categoriesMenuDiv.appendChild(categoryMenuDiv);
      });
    } catch (error) {
      console.error("Error fetching categories:", error); // Log error
      categoriesDiv.innerHTML =
        "<p>Failed to fetch categories. Please try again later.</p>";
    }
  };

  const handleDocumentClick = (event) => {
    const menuElement = document.getElementById("menu");
    const favoritesMenuElement = document.getElementById("favorites-menu");

    if (
      !menuElement.contains(event.target) &&
      !menuBtn.contains(event.target)
    ) {
      menuCollapse.hide();
    }

    if (
      !favoritesMenuElement.contains(event.target) &&
      !document.getElementById("favorites-btn").contains(event.target)
    ) {
      favoritesCollapse.hide();
    }
  };

  document.addEventListener("click", handleDocumentClick);

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      searchMeals(query);
    }
  });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query) {
      searchMeals(query);
    } else {
      resultsDiv.innerHTML = "";
      searchTitle.classList.add("d-none");
      resultsDiv.classList.add("d-none");
      sectionsDiv.style.display = "block";
      menuBtn.classList.add("d-none");
      showCategoriesDiv.classList.add("d-none"); // Hide the Show Categories button
    }
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchButton.click();
    }
  });

  // Show Categories Button Click Event
  showCategoriesButton.addEventListener("click", () => {
    sectionsDiv.style.display = "block";
    resultsDiv.innerHTML = "";
    searchTitle.classList.add("d-none");
    resultsDiv.classList.add("d-none");
    showCategoriesDiv.classList.add("d-none");
    menuBtn.classList.add("d-none");
  });

  // Call this function on page load
  displayCategories();
  updateFavorites();
});

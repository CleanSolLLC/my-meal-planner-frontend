document.addEventListener("DOMContentLoaded", init);

const foodQueryEndpoint = "http://localhost:3000/api/v1/food_queries";
const recipeEndpoint = "http://localhost:3000/api/v1/recipes";
const categoryEndpoint = "http://localhost:3000/api/v1/categories";
const imagesPath = "https://spoonacular.com/recipeImages/";
const categoryDesc = new Set();
let initialListLoad = false;
let dropdownList = [];


const btnArry = document.getElementsByClassName("delete-button");

function init() {
  getFoodInformation();
  getRecipeInformation();
  attachListeners();
}

function attachListeners() {
  document
    .getElementById("button-search")
    .addEventListener("click", function (e) {
      let x = document.querySelector(".form-control");
      if (x.value === "") {
        alert("Search Field Cannot Be Blank");
      } else initiateFoodQuery(e);
      x.value = "";
    });

  document
    .querySelector("#button-recipe-search")
    .addEventListener("click", function (e) {
      let x = document.querySelector("#typeText");
      if (x.value === "") {
        alert("Recipe Search Field Cannot Be Blank");
      } else initiateRecipeSearch(e);
      clearRecipeListValues();
    });
  
    document
     .querySelector(".dropdown")
     .addEventListener("click", function (e) {
      buildCategoryList(e);
      initialListLoad = true;
    });

   document
     .querySelector(".dropdown-menu")
     .addEventListener("click", function (e) {
      filterRecipeResults(e);
    });     
}

function getFoodInformation() {
  fetchApi = new FetchApi(foodQueryEndpoint);
  fetchApi
    .getFetch()
    .then((result) => {
      if (result.data.length === 0) {
        document.querySelector(".card-subtitle").nextElementSibling.innerText =
          "No Food Related Questions Asked Enter Search Term";
      } else {
        printFoodQueryCard(result);
      }
    })
    .catch((errors) => {
      alert(errors);
    });
}

function printFoodQueryCard(obj) {
  if (Array.isArray(obj.data)) {
    obj.data.forEach((foodQuery) => {
      let newFoodQuery = new FoodQuery(foodQuery, foodQuery.attributes);
      document.querySelector("#food-questions").innerHTML +=
        newFoodQuery.renderFoodQueryCard();
    });
  } else {
    let newFoodQuery = new FoodQuery(obj);
    document.querySelector("#food-questions").innerHTML +=
      newFoodQuery.renderFoodQueryCard();
    document.querySelector(".card-subtitle").nextElementSibling.innerText = "";
  }

  const btnArry = document.getElementsByClassName("delete-button");
  for (var i = 0; i < btnArry.length; i++) {
    var self = btnArry[i];
    self.addEventListener("click", function (e) {
      if (e.type === "click") {
        deleteFoodQuery(e);
      }
    });
  }
}

function initiateFoodQuery(e) {
  e.preventDefault();
  const search = document.querySelector(".form-control").value;
  const data = { search: search };

  fetchApi = new FetchApi(foodQueryEndpoint);
  fetchApi
    .postFetch(data)
    .then((data) => {
      if (!!data.error) {
        alert(data.error);
      } else {
        printFoodQueryCard(data);
      }
    })
    .catch((errors) => {
      alert(errors);
    });
}

function deleteFoodQuery(e) {
  e.preventDefault();
  let data = e.target.attributes[3].value;
  let url = foodQueryEndpoint + "/" + data;
  e.currentTarget.parentElement.remove();
  fetchApi = new FetchApi(url);
  fetchApi
    .deleteFetch()
    .then((json) => {})
    .catch((errors) => {
      alert(errors);
    });

  if (document.querySelector("#food-questions").childElementCount === 0) {
    document.querySelector(".card-subtitle").nextElementSibling.innerText =
      "No Food Related Questions Asked Enter Search Term";
  }
}

function getRecipeInformation() {
  //preventDefault();
  fetchApi = new FetchApi(recipeEndpoint);
  fetchApi
    .getFetch()
    .then((result) => {
      if (result.data.length === 0) {
        document.querySelector(
          ".recipe-container"
        ).nextElementSibling.innerText = "No Recipes Selected";
      } else {
        printRecipeCards(result.data);
      }
    })
    .catch((errors) => {
      alert(errors);
    });
}

function printRecipeCards(obj) {

  // COL-LG-8
  //   ROW
  //     COL-LG-6
  //         CARD MB-4
  //         CARD MB-4
  //create a card; 2 columns of cards will append to <div class="col-lg-6"></div> il maxColCnt is < 2 or create a new div and class for col-lg-6 and append to that

  let arry = obj.data || obj;
  let container = document.querySelector("#recipe-cards");
  let recipeMarkup = "";

  arry.forEach(function (recipe, i) {
    if (i === 0) {
      recipeMarkup += `<div class="row">`;
    }
    let rec = new Recipe(recipe, imagesPath);
    recipeMarkup += rec.renderRecipeCard();

    document.querySelector(".recipe-container").nextElementSibling.innerText =
      "";

    if (i % 2 !== 0) {
      // add end of row ,and start new row on every 2 elements
      recipeMarkup += `</div><div class="row">`;
    }
  });

  recipeMarkup += `</div>`;
  container.innerHTML += recipeMarkup;

  //logic to suppress null values passed in if user does not enter an optional search criteria for recipe
  var a = container.querySelectorAll(".row > div > div > div > div");
  a.forEach(function (element) {
    if (element.textContent.endsWith(null)) {
      element.style.display = "none";
    }
  });

  const btnArry = document.getElementsByClassName("delete-recipe-button");
  for (var i = 0; i < btnArry.length; i++) {
    var self = btnArry[i];
    self.addEventListener("click", function (e) {
      if (e.type === "click") {
        deleteRecipe(e);
      }
    });
  //recipes = Recipe.all
  }

// sort routine
// Recipe.all.sort(function(a, b) {
//   var nameA = a.recipeCategoryName.toUpperCase(); // ignore upper and lowercase
//   var nameB = b.recipeCategoryName.toUpperCase(); // ignore upper and lowercase
//   if (nameA < nameB) {
//     return -1;
//   }
//   if (nameA > nameB) {
//     return 1;
//   }

//   // names must be equal
//   return 0;
// });

  //buildCategoryList();
  //initialListLoad = true;

}

function deleteRecipe(e) {
  e.preventDefault();
  let data = e.target.attributes[3].value;
  let url = recipeEndpoint + "/" + data;
  e.currentTarget.parentElement.remove();
  fetchApi = new FetchApi(url);
  fetchApi
    .deleteFetch(url)
    .then((json) => {})
    .catch((errors) => {
      alert(errors);
    });

  if (
    document.querySelector("#recipe-cards").firstElementChild.innerText === ""
  ) {
    document.querySelector(".recipe-container").nextElementSibling.innerText =
      "No Recipes Selected";
  }
}

function getRecipeListValues() {
  //We have to dynamically build a hash based on the field values if field values is 0 for numeric fields or blank do not populate object with key/value pair. If text field is balnk do not populate obj with key/value pair. Required field cannot be blank.

  let newObj = {};
  let q = document.querySelector("#typeText").value;
  const obj = {
    query: q.charAt(0).toUpperCase() + q.slice(1),
    number: document.querySelector("#typeNumber").value,
    recipe_type: document.querySelector("#foodTypeList").value,
    cuisine: document.querySelector("#cuisineList").value,
    diet: document.querySelector("#dietList").value,
    intolerances: document.querySelector("#intoleranceList").value,
    exclude: document.querySelector("#typeTextExclusions").value,
  };

  for (const property in obj) {
    if (obj[property] !== "") {
      newObj[property] = obj[property];
    }
  }

  return newObj;
}

function clearRecipeListValues() {

    query: document.querySelector("#typeText").value = ""
    number: document.querySelector("#typeNumber").value = ""
    recipe_type: document.querySelector("#foodTypeList").value = ""
    cuisine: document.querySelector("#cuisineList").value = ""
    diet: document.querySelector("#dietList").value = ""
    intolerances: document.querySelector("#intoleranceList").value = ""
    exclude: document.querySelector("#typeTextExclusions").value = ""
}

function buildCategoryList(e) {
  e.preventDefault();
  let categoryList = [];
  let recipeCategories = [];


function loadCategories() {
  for (const {recipeCategoryName, recipeCategoryType, recipeCategoryCuisine, recipeCategoryDiet, recipeCategoryIntolerance, recipeCategoryExclude} of Recipe.all) {
        recipeCategories.push(recipeCategoryName, recipeCategoryType, recipeCategoryCuisine, recipeCategoryDiet, recipeCategoryIntolerance, recipeCategoryExclude);
  }
      categoryList = [...new Set(recipeCategories)]
      return categoryList;
} 

function loadLastCategory() {
  for (const {recipeCategoryName, recipeCategoryType, recipeCategoryCuisine, recipeCategoryDiet, recipeCategoryIntolerance, recipeCategoryExclude} of Recipe.all.slice(-1)) {
        recipeCategories.push(recipeCategoryName, recipeCategoryType, recipeCategoryCuisine, recipeCategoryDiet, recipeCategoryIntolerance, recipeCategoryExclude);
  }
      categoryList = [...new Set(recipeCategories)]
      return categoryList;
} 


  if (initialListLoad === false) {
     categoryList = loadCategories();
     dropdownList = categoryList;
  }else {
      //debugger
      if (categoryList.length === 0 && JSON.stringify(loadLastCategory()) === JSON.stringify(dropdownList)) {
         return
      } else {
          categoryList = loadLastCategory();
      }
  }

  //debugger;
  let buttonList = document.querySelector(".dropdown-menu");
  let catArry = categoryList.filter(x => x)
    catArry.forEach((list) => {
    let bttn = document.createElement("button");
    bttn.className="dropdown-item";
    bttn.setAttribute("type", "button")
    bttn.innerText = list.charAt(0).toUpperCase() + list.slice(1);
    buttonList.append(bttn);
  })
    dropdownList = categoryList;
}

function initiateRecipeSearch(e) {
  let recipeCriteria = getRecipeListValues();
  let url = "https://webknox-recipes.p.rapidapi.com/recipes/search";
  url += "?" + new URLSearchParams(recipeCriteria).toString();

  let headers = {
    "Content-Type": "application/json",
    "x-rapidapi-host": config["RAPID-API-HOST"],
    "x-rapidapi-key": config["RAPID-API-KEY"],
  };

  fetchApi = new FetchApi(url, headers);
  fetchApi
    .getFetch()
    .then((result) => {
      if (result.results.length === 0) {
        return alert("No Recipes Found Please Try Again");
      } else {
        //create category(post) and assign category_id to recipe
        //also create new instance of category
        newCategory = new Category(recipeCriteria);
        fetchCategoryApi = new FetchCategoryApi(categoryEndpoint);
        fetchCategoryApi.postCategoryFetch(recipeCriteria).then((category) => {
          result.results.forEach((key) => (key["category_id"] = category.id));
          postRecipeData(result);
          //buildCategoryList();
        });
      }
    })

    .catch((errors) => {
      alert(errors);
    });
}

function postRecipeData(data) {
  let headers = {
    "Content-Type": "application/json",
  };
  fetchApi = new FetchApi(recipeEndpoint, headers);
  fetchApi.postFetch(data).then((data) => {
    printRecipeCards(data);
  });
}

function filterRecipeResults(e) {
  //debugger
  var input, filter, cards, cardContainer, i;
  input = e.srcElement.innerText.toUpperCase();

  cards = document.querySelectorAll("#recipe-cards .card-body .category-name");



  cards.forEach(card => {
    if (card.innerText.toUpperCase().includes(input)) {
            card.parentNode.style.display = ""
      } else if (input === "ALL") {
        card.style.display === "none" ? card.parentNode.style.display === "none" : card.parentNode.style.display = ""
      } else {
            card.parentNode.style.display = "none"
      }

  })
}

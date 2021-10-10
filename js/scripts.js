document.addEventListener("DOMContentLoaded", init);

const foodQueryEndpoint = "http://localhost:3000/api/v1/food_queries";
const recipeEndpoint = "http://localhost:3000/api/v1/recipes";
const categoryEndpoint = "http://localhost:3000/api/v1/categories";
const imagesPath = "https://spoonacular.com/recipeImages/";

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
      //resetRecipeFieldValues();
      //x.value = "";
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
  //document.querySelector(".medium").innerText = "";
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

function resetRecipeFieldValues() {}

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

    //var a = document.querySelector("#recipe-cards").lastElementChild
    //a.document.querySelector(".card-body").getElementsByTagName("div")[4]
    //debugger

    document.querySelector(".recipe-container").nextElementSibling.innerText =
      "";

    if (i !== 0 && i % 2 !== 0) {
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
  }
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
    //document.querySelector("#recipe-cards").remove();
  }
}

function getRecipeListValues() {
  //We have to dynamically build a hash based on the field values if field values is 0 for numeric fields or blank do not populate object with key/value pair. If text field is balnk do not populate obj with key/value pair. Required field cannot be blank.

  let newObj = {};
  const obj = {
    query: document.querySelector("#typeText").value,
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

function initiateRecipeSearch(e) {
  //debugger
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
        fetchCategoryApi = new FetchCategoryApi(categoryEndpoint);
        fetchCategoryApi.postCategoryFetch(recipeCriteria).then((category) => {
          console.log(`${category}`);
          result.results.forEach((key) => (key["category_id"] = category.id));
          postRecipeData(result);
        });
      }
    })

    .catch((errors) => {
      alert(errors);
    });
  //getRecipeInformation(e)
}

function postRecipeData(data) {
  // debugger
  let headers = {
    "Content-Type": "application/json",
  };
  fetchApi = new FetchApi(recipeEndpoint, headers);
  //debugger
  fetchApi.postFetch(data).then((data) => {
    printRecipeCards(data);
  });
}

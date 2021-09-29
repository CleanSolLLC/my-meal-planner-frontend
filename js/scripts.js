const foodQueryEndpoint = "http://localhost:3000/api/v1/food_queries";
const recipeEndpoint = "http://localhost:3000/api/v1/recipes";
const imagesPath = "https://spoonacular.com/recipeImages/";

const btnArry = document.getElementsByClassName("delete-button");

document.addEventListener("DOMContentLoaded", () => {
  getFoodInformation();
  getRecipeInformation();
});

document
  .getElementById("button-search")
  .addEventListener("click", function (e) {
    let x = document.querySelector(".form-control").value
    if (x === "") {
      alert("Serach Field Cannot Be Blank")
    } else
    initiateFoodQuery(e);
  });

document
  .querySelector("#button-recipe-search")
  .addEventListener("click", function (e) {
    let x = document.querySelector("#typeText").value
    if(x === "") {
      alert("Recipe Serach Field Cannot Be Blank")
    }else
      recipeCriteria = getRecipeListValues(e);
      initiateRecipeSearch(recipeCriteria);
  });



function getFoodInformation() {
  fetchFoodApi = new FetchFoodApi(foodQueryEndpoint);
  fetchFoodApi
    .getFoodFetch()
    .then((result) => {
      if (result.data.length === 0) {
        div = document.createElement("div");
        div.className = "data-status"; 
        div.innerText ="No Food Related Questions Asked";
        document.querySelector(".card-body").append(div);
      } else {
        printFoodQueryCard(result);
      }
    })
    .catch((errors) => {
      alert(errors);
    });
}

function printFoodQueryCard(obj) {
  obj.data.forEach((foodQuery) => {
    let newFoodQuery = new FoodQuery(foodQuery, foodQuery.attributes);

    document.querySelector("#food-questions").innerHTML +=
      newFoodQuery.renderFoodQueryCard();
  });

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

  fetchFoodApi = new FetchFoodApi(foodQueryEndpoint);
  fetchFoodApi
    .postFoodFetch(data)
    .then((data) => {
      if (!!data.error) {
        alert(data.error);
      } else {
        let newFoodQuery = new FoodQuery(data, data);

        document.querySelector("#food-questions").innerHTML +=
          newFoodQuery.renderFoodQueryCard();
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

  fetchFoodApi = new FetchFoodApi(url);
  fetchFoodApi
    .deleteFoodFetch()
    .then((json) => {
      window.location.reload();
    })
    .catch((errors) => {
      alert(errors);
    });
}

function getRecipeInformation() {
  fetchFoodApi = new FetchFoodApi(recipeEndpoint);
  fetchFoodApi
    .getFoodFetch()
    .then((result) => {
      if (result.data.length === 0) {
        return (document.querySelector("#recipe-cards").innerText =
          "No Recipes Selected");
      } else {
        printRecipeCards(result);
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

  let arry = obj.data || obj.results;

  let container = document.querySelector("#recipe-cards");
  let recipeMarkup = "";

  arry.forEach(function (recipe, i) {
    if (i === 0) {
      recipeMarkup += `<div class="row">`;
    }
    let newRecipe = new Recipe(recipe, recipe.attributes, imagesPath);
    recipeMarkup += newRecipe.renderRecipeCard();

    if (i !== 0 && i % 2 !== 0) {
      // add end of row ,and start new row on every 2 elements
      recipeMarkup += `</div><div class="row">`;
    }
  });

  recipeMarkup += `</div>`;
  container.innerHTML += recipeMarkup;

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

  fetchFoodApi = new FetchFoodApi(url);
  fetchFoodApi
    .deleteFoodFetch(url)
    .then((json) => {
      window.location.reload();
    })
    .catch((errors) => {
      alert(errors);
    });
}


function getRecipeListValues(e) {
  e.preventDefault();

  //We have to dynamically build a hash based on the field values if field values is 0 for numeric fields or blank do not populate object with key/value pair. If text field is balnk do not populate obj with key/value pair. Required field cannot be blank.

  let newObj = {};
  const obj = {
    query: document.querySelector("#typeText").value,
    number: document.querySelector("#typeNumber").value,
    type: document.querySelector("#foodTypeList").value,
    cuisine: document.querySelector("#cuisineList").value,
    diet: document.querySelector("#dietList").value,
    intolerances: document.querySelector("#intoleranceList").value,
    excludeIngredients: document.querySelector("#button-recipe-search").value,
  };

  for (const property in obj) {
    if (obj[property] !== "") {
      newObj[property] = obj[property];
    }
  }

  return newObj;
}

function initiateRecipeSearch(recipeCriteria) {
  let url = "https://webknox-recipes.p.rapidapi.com/recipes/search";
  url += "?" + new URLSearchParams(recipeCriteria).toString();

  let headers = {
    "Content-Type": "application/json",
    "x-rapidapi-host": config["RAPID-API-HOST"],
    "x-rapidapi-key": config["RAPID-API-KEY"],
  };

  fetchFoodApi = new FetchFoodApi(url, headers);
  fetchFoodApi
    .getFoodFetch()
    .then((result) => {
      if (result.results.length === 0) {
        return alert("No Recipes Found Please Try Again")
      }else {
        postRecipeData(result);
        printRecipeCards(result);
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
  fetchFoodApi = new FetchFoodApi(recipeEndpoint, headers);
  fetchFoodApi.postFoodFetch(data);
  window.location.reload();
}

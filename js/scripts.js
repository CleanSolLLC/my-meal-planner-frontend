
const endpoint = "http://localhost:3000/api/v1/food_queries";
const recipeEndpoint = "http://localhost:3000/api/v1/recipes";
const imagesPath = "https://spoonacular.com/recipeImages/";

const btnArry = document.getElementsByClassName("delete-button");

document.addEventListener("DOMContentLoaded", () => {
  getFoodInformation();
  getRecipeInformation();

});

function getFoodInformation() {
  fetch(endpoint) 
    .then(response => response.json())
    .then(food_queries => { 
 
      if (food_queries.data.length === 0) {
        return document.querySelector(".card-title-questions").innerText = "No Food Related Questions Asked"
      } else {
        loadFoodInformation(food_queries)  
      }
  })
    .catch((errors) => {
     alert(errors)
   });
};

function loadFoodInformation(obj) {
  obj.data.forEach(foodQuery => {

    let newFoodQuery = new FoodQuery(foodQuery, foodQuery.attributes)

    debugger;
    const foodQueryMarkup = 
    `<div data-id=${foodQuery.id}>
      <b>Q. ${foodQuery.attributes.search}</b>
      <p><b>A.</b> ${foodQuery.attributes.response}</p>
      <button class="delete-button" type="button" value="Delete" data-id=${foodQuery.id}>Delete</button>
    <div>
    <br></br>`;
    document.querySelector('#food-questions').innerHTML += foodQueryMarkup
  });

    // let questions = document.getElementById("food-questions")
    // questions.querySelector(".delete-button").addEventListener("click", function(e) {
    
    const btnArry = document.getElementsByClassName("delete-button")
    for (var i = 0; i < btnArry.length; i++) {
        var self = btnArry[i];
        self.addEventListener('click', function (e) {  
        if (e.type === "click") {
          deleteFoodQuery(e)
        }else { 
          initiateFoodQuery(e);
        }
    });
  }
}


function initiateFoodQuery(e) {
  e.preventDefault()
  document.querySelector('.medium').innerText = ""
  const search = document.querySelector(".form-control").value;
  const data = {search: search};

  fetch("http://localhost:3000/api/v1/food_queries", {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
     if (!!data.error) {
       alert(data.error)
     } else {

            const foodQueryMarkup = 
            `<b>Q. ${data.search}</b>
            <p><b>A.</b> ${data.response}</p>
            <button type="submit" value="Submit" data-id=${foodQuery.id}>Delete</button>
            <div>
            <br></br>`;
            document.querySelector('#food-questions').innerHTML += foodQueryMarkup 
            //console.log('Success:', data);
            }

  })
   .catch((errors) => {
     alert(errors);
   });

}

function deleteFoodQuery(e) {
  e.preventDefault()
  let data = e.target.attributes[3].value
  let url = endpoint + '/' + data

  fetch(url, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: null
  })
  .then(response => response.json())
  .then(json => {
    //return json
    window.location.reload()

  })

   .catch((errors) => {
     alert(errors);
   });

}
  

function getRecipeInformation() {
  fetch(recipeEndpoint, {
     headers: {
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*'
     },  

    })
    .then(response => response.json())
    .then(recipeData => { 

      if (recipeData.data.length === 0) {
        return document.querySelector(".recipe-container").innerText = "No Recipes Selected"
      } else {
        printRecipeCards(recipeData)  
      }
  })
    .catch((errors) => {
     alert(errors)
   });
};

function printRecipeCards(obj) {
  // COL-LG-8
  //   ROW
  //     COL-LG-6
  //         CARD MB-4
  //         CARD MB-4
  //create a card; 2 columns of cards will append to <div class="col-lg-6"></div> il maxColCnt is < 2 or create a new div and class for col-lg-6 and append to that 


  let arry = obj.data

  let container = document.querySelector("#recipe-cards")
  let recipeMarkup = ''


  arry.forEach(function(recipe, i) {
    if(i===0) {
      recipeMarkup += `<div class="row">`
    }
    let recipeImage = imagesPath + recipe.attributes.image;
    
     recipeMarkup += 
    `<div class="col-lg-6">
        <div class="card mb-4">
            <div class="card-body">
                <img class="card-img-top" src=${recipeImage} style="width:285px;height:285px;"/>
                <b>Title: ${recipe.attributes.title}</b>
                <p><b>Ready In:</b> ${recipe.attributes.readyInMinutes}</p>
                <p><b>Servings:</b> ${recipe.attributes.servings}</p>
                <p><a href="${recipe.attributes.sourceUrl}"target="_blank">${recipe.attributes.sourceUrl}</a></p>
                <button class="delete-recipe-button" type="button" value="Delete" data-id=${recipe.id}>Delete</button>
            </div>
        </div>
      </div>`;

    if(i!==0 && i%2 !== 0){
    // add end of row ,and start new row on every 5 elements
    recipeMarkup += `</div><div class="row">`
    } 

  });

  recipeMarkup += `</div>`;
  container.innerHTML += recipeMarkup;

    const btnArry = document.getElementsByClassName("delete-recipe-button")
    for (var i = 0; i < btnArry.length; i++) {
        var self = btnArry[i];
        self.addEventListener('click', function (e) {  
        if (e.type === "click") {
          deleteRecipe(e)
        }
    });
  }  

}


function deleteRecipe(e) {
  e.preventDefault()
  let data = e.target.attributes[3].value
  let url = recipeEndpoint + '/' + data

  fetch(url, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: null
  })
  .then(response => response.json())
  .then(json => {
    //return json
    window.location.reload()

  })

   .catch((errors) => {
     alert(errors);
   });

}

document.querySelector("#button-recipe-search").addEventListener("click", function(e) {
  recipeCriteria = getRecipeListValues(e);
  initiateRecipeSearch(recipeCriteria) ;
});  


function getRecipeListValues(e) {
  e.preventDefault()


  //We have to dynamically build a hash based on the field values if field values is 0 for numeric fields or blank do not populate object with key/value pair. If text field is balnk do not populate obj with key/value pair. Required field cannot be blank.


    let newObj = {};
    const obj = {

      query: document.querySelector("#typeText").value, 
      number: document.querySelector("#typeNumber").value,
      type: document.querySelector("#foodTypeList").value,
      cuisine: document.querySelector("#cuisineList").value,
      diet: document.querySelector("#dietList").value,
      intolerances: document.querySelector("#intoleranceList").value,
      excludeIngredients: document.querySelector("#button-recipe-search").value

    }

    for (const property in obj) {
      if (obj[property] !== '') {
        newObj[property] = obj[property]
      }
    }

    return newObj;
  }

  //document.querySelector(".form-control").value;


function initiateRecipeSearch(recipeCriteria) {

  let url = "https://webknox-recipes.p.rapidapi.com/recipes/search"

  url += '?' + ( new URLSearchParams( recipeCriteria ) ).toString();

  fetch(url, {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": config["RAPID-API-HOST"],
    "x-rapidapi-key":  config["RAPID-API-KEY"]
  }
})
  .then(response => response.json())
  .then(data => {
    postRecipeData(data)
  })
  .catch(err => {
  console.error(err);
});

}



function postRecipeData(data) {
  // document.querySelector('.medium').innerText = ""
  // const search = document.querySelector(".form-control").value;
  // const data = {search: search};

  fetch("http://localhost:3000/api/v1/recipes", {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
      window.location.reload()
  // .then(res => res.text())          // convert to plain text
  // .then(text => console.log(text))  // then log it out

   .catch((errors) => {
     alert(errors);
   });

}





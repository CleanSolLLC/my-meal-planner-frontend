
const endpoint = "http://localhost:3000/api/v1/food_queries";
const imagesPath = "https://spoonacular.com/recipeImages/";

document.addEventListener("DOMContentLoaded", () => {
  getdashboardData()
});

function getdashboardData() {
  fetch(endpoint) 
    .then(response => response.json())
    .then(food_queries => { 

      if (food_queries.data.length === 0) {
        return document.querySelector('.medium').innerText = "No Data Available"
      } else {
        loaddashboardData(food_queries)  
      }
  })
    .catch((errors) => {
     alert(errors)
   });
};

function loaddashboardData(obj) {
  obj.data.forEach(foodQuery => {
    const foodQueryMarkup = 
    `<div data-id=${foodQuery.id}>
      <b>Q. ${foodQuery.attributes.search}</b>
      <p><b>A.</b> ${foodQuery.attributes.response}</p>
      <button class="delete-button" type="button" value="Delete" data-id=${foodQuery.id}>Delete</button>
    <div>
    <br></br>`;
    document.querySelector('#food-questions').innerHTML += foodQueryMarkup
  });

    let questions = document.getElementById("food-questions")
    questions.querySelector(".delete-button").addEventListener("click", function(e) {
    
    if (e.type === "click") {
      deleteFoodQuery(e)
    }else { 
      initiateFoodQuery(e);
    }
  });

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

document.querySelector("button").addEventListener("click", function(e) {
  deleteFoodQuery(e);
  });

}

function deleteFoodQuery(e) {
  e.preventDefault()
  data = e.target.attributes[3].value
  url = endpoint + '/' + data

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
  recipeCriteria = getFoodListValues(e);
  initiateRecipeSearch(recipeCriteria);

});  


function getFoodListValues(e) {
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
        newObj[property] = obj[property]}
      }

    return newObj;
  
  //document.querySelector(".form-control").value;
}

function initiateRecipeSearch(recipeCriteria) {

  let url = "https://webknox-recipes.p.rapidapi.com/recipes/search"

  url += '?' + ( new URLSearchParams( recipeCriteria ) ).toString();

  fetch(url, {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "webknox-recipes.p.rapidapi.com",
    "x-rapidapi-key": "aea69f05cemsh468b16ddc14e2b6p1d9bc7jsned15aa5946e3"
  }
})
  .then(response => response.json())
  .then(data => {
    debugger
    let arry = data["results"]
    arry.forEach(recipe => {
      let recipeImage = imagesPath + recipe.image 
      document.querySelector(".row .col-lg-6 img").attributes.src.value = recipeImage; 
      const recipeMarkup = 
    `<div data-id=${recipe.id}>
      <b>Title: ${recipe.title}</b>
      <p><b>Ready In:</b> ${recipe.readyInMinutes}</p>
      <p><b>Servings:</b> ${recipe.servings}</p>
      <p><b>Servings:</b> ${recipe.sourceUrl}</p>
      <button class="save-button" type="button" value="Save" data-id=${recipe.id}>Save</button>
      <button class="delete-button" type="button" value="Delete" data-id=${recipe.id}>Delete</button>
    <div>
    <br></br>`;
    document.querySelector(".row .col-lg-6 .card-body").innerHTML += recipeMarkup
  });
  })

  .catch(err => {
  console.error(err);
});
//   let url = "http://localhost:3000/api/v1/foods";
//   //const data = recipeCriteria;

//    
//    debugger;

//   fetch(url, {
//     //method: 'POST', 
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     //body: JSON.stringify(data),
//   })
//   .then(response => response.json())
//   .then(data => {
//      // if (!!data.error) {
//      //   alert(data.error)
//      // } else {

//      //        const foodQueryMarkup = 
//      //        `<b>Q. ${data.search}</b>
//      //        <p><b>A.</b> ${data.response}</p>
//      //        <button type="submit" value="Submit" data-id=${foodQuery.id}>Delete</button>
//      //        <div>
//      //        <br></br>`;
//      //        document.querySelector('#food-questions').innerHTML += foodQueryMarkup 
//      //        //console.log('Success:', data);
//      //        }

//   })
//    .catch((errors) => {
//      alert(errors);
//    });

// document.querySelector("button").addEventListener("click", function(e) {
//   deleteFoodQuery(e);
//   });

}

// "https://webknox-recipes.p.rapidapi.com/recipes/search?query=burger&offset=0&number=10&type=main%20course&cuisine=italian&diet=vegetarian&intolerances=egg%2C%20gluten&excludeIngredients=coconut"

//"https://webknox-recipes.p.rapidapi.com/recipes/search?query=burger&offset=0&number=10&type=main%20course&cuisine=italian"

'https://webknox-recipes.p.rapidapi.com/recipes/search?query=burger&number=10&type=main+course&cuisine=italian'
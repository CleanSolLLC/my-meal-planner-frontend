
const endpoint = "http://localhost:3000/api/v1/food_queries";
const imagesPath = "https://spoonacular.com/recipeImages/";

const arry = [{"id": 93877,
   "title":"Beef Enchiladas",
   "readyInMinutes":45,
   "servings":6,
   "sourceUrl":"http://www.marthastewart.com/344471/beef-enchiladas",
   "openLicense":0,
   "image":"beef-enchiladas-2-93877.png"
   },
   
   {"id": 278914,
   "title":"Basil Beef",
   "readyInMinutes":52,
   "servings":6,
   "sourceUrl":"http://www.kraftrecipes.com/recipes/basil-beef-56551.aspx",
   "openLicense":0,
   "image":"basil-beef-278914.jpg"
   }
]

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
    "x-rapidapi-host": config["RAPID-API-HOST"],
    "x-rapidapi-key":  config["RAPID-API-KEY"]
  }
})
  .then(response => response.json())
  .then(data => {

    createRecipeCards(data)

  })

  .catch(err => {
  console.error(err);
});

}

// Insert an element with a class name before the passed element
function createAndAddSibling(tag, className, placeAfter) {
  let element = createElement(tag, className);
  let referenceNode = document.querySelector(`${placeAfter}`)
  referenceNode.parentNode.insertBefore(element, referenceNode.nextSibling);
  //document.body.insertBefore(element, placeBefore);
}


// Insert an element with a class name as a child of the third parameter
function createAndAddChild(tag, className, node) {
  let element = createElement(tag, className);
  let parentNode = document.querySelector(`${node}`)
  parentNode.appendChild(element);
  //document.body.insertBefore(element, placeBefore);
}



// Return a new element with a certain class
function createElement(tag, className) {
   let element = document.createElement(tag);
   element.className = className;
   return element;
}


function createRecipeCards(data) {
  // COL-LG-8
  //   ROW
  //     COL-LG-6
  //         CARD MB-4
  //         CARD MB-4
  //create a card; 2 columns of cards will append to <div class="col-lg-6"></div> il maxColCnt is < 2 or create a new div and class for col-lg-6 and append to that 

   //let maxColCnt = 0;
   //createAndAddSibling("div", "row", ".col-lg-8 .card");
   //createAndAddChild("div", "col-lg-6", ".col-lg-8 .row");
   //createAndAddChild("div", "card mb-4", ".col-lg-6");


  //let arry = data["results"]

  let container = document.querySelector(".col-lg-8")
  let recipeMarkup = ''


  arry.forEach(function(recipe, i) {
   
    if(i===0) {
      recipeMarkup += '<div class="row">'
    }
    let recipeImage = imagesPath + recipe.image;
    
     recipeMarkup += 
    `<div class="col-lg-6">
        <div class="card mb-4">
            <div class="card-body">
                <img class="card-img-top" src=${recipeImage} />
                <b>Title: ${recipe.title}</b>
                <p><b>Ready In:</b> ${recipe.readyInMinutes}</p>
                <p><b>Servings:</b> ${recipe.servings}</p>
                <p><a href="${recipe.sourceUrl}">${recipe.sourceUrl}</a></p>
                <button class="save-button" type="button" value="Save" data-id=${recipe.id}>Save</button>
                <button class="delete-button" type="button" value="Delete" data-id=${recipe.id}>Delete</button>
            </div>
        </div>
      </div>`;

    if(i!==0 && i%2 === 0){
    // add end of row ,and start new row on every 5 elements
    content += '</div><div class="row">'
    } 

  });

  recipeMarkup += '</div>';
  container.innerHTML += recipeMarkup;

}

createRecipeCards(arry);





      








function initiateFoodQuery(string) {
let q = "q:";
q += string;
let newString = q.replace(/\s/g, "%20")
debugger;
}

const endpoint = "http://localhost:3000/api/v1/food_queries"
const foodQuestions = document.querySelector('#food-questions')

document.addEventListener("DOMContentLoaded", () => {
getdashboardData()

});

function getdashboardData() {
fetch(endpoint)
.then(response => response.json())
.then(food_queries => {

      if (food_queries.data.length === 0) {
        foodQuestions.innerText = "No Data Available"
      }else {
        loaddashboardData(food_queries)
      }

})
.catch((errors) => {
alert(errors);
});
};

function loaddashboardData(obj) {

obj.data.forEach(foodQuery => {
const foodQueryMarkup =
`<div data-id=${foodQuery.id}> <b>Q. ${foodQuery.attributes.search}</b> <p><b>A.</b> ${foodQuery.attributes.response}</p> <button data-id=${foodQuery.id}>delete</button> <div> <br></br>`;
foodQuestions.innerHTML += foodQueryMarkup  
 });

// if (foodQuestions.innerText === "No Data Available") {
// foodQuestions.innerText = ""
// };

}

document.getElementById("button-search").addEventListener("click", function(e) {
initiateFoodQuery(e);
});

function initiateFoodQuery(e) {

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
if (!data.error.nil) {
return alert(data.error)
}else {
const foodQueryMarkup =
`<b>Q. ${data.search}</b> <p><b>A.</b> ${data.response}</p> <button data-id=${data.id}>delete</button> <div> <br></br>`;
e.preventDefault();

    document.querySelector('#food-questions').innerHTML += foodQueryMarkup
    //console.log('Success:', data);

    // if (document.querySelector('#food-questions').innerText === "No Data Available") {
    //   document.querySelector('#food-questions').innerText = ""
    // };

};

})
.catch((errors) => {
//alert(errors);
});

}

//Test Data
// const arry = [{"id": 93877,
// "title":"Beef Enchiladas",
// "readyInMinutes":45,
// "servings":6,
// "sourceUrl":"http://www.marthastewart.com/344471/beef-enchiladas",
// "openLicense":0,
// "image":"beef-enchiladas-2-93877.png"
// },

// {"id": 278914,
// "title":"Basil Beef",
// "readyInMinutes":52,
// "servings":6,
// "sourceUrl":"http://www.kraftrecipes.com/recipes/basil-beef-56551.aspx",
// "openLicense":0,
// "image":"basil-beef-278914.jpg"
// },

// {"id": 278914,
// "title":"Basil Beef",
// "readyInMinutes":52,
// "servings":6,
// "sourceUrl":"http://www.kraftrecipes.com/recipes/basil-beef-56551.aspx",
// "openLicense":0,
// "image":"basil-beef-278914.jpg"
// },

// {"id": 278914,
// "title":"Basil Beef",
// "readyInMinutes":52,
// "servings":6,
// "sourceUrl":"http://www.kraftrecipes.com/recipes/basil-beef-56551.aspx",
// "openLicense":0,
// "image":"basil-beef-278914.jpg"
// }
// ]

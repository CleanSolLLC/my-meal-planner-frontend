class FetchFoodApi {
  constructor(url) {
    this.url = url;
  }

  getFoodFetch() {
    return fetch(this.url)
   .then( response => response.json() )
  }
};
  



//   let url = "https://webknox-recipes.p.rapidapi.com/recipes/search";

//   url += "?" + new URLSearchParams(recipeCriteria).toString();

//   fetch(url, {
//     method: "GET",
//     headers: {
//       "x-rapidapi-host": config["RAPID-API-HOST"],
//       "x-rapidapi-key": config["RAPID-API-KEY"],
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       postRecipeData(data);
//     })
//     .catch((err) => {
//       console.error(err);
//     });










//   fetch(url, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: null,
//   })
//     .then((response) => response.json())
//     .then((json) => {
//       //return json
//       window.location.reload();
//     })

//     .catch((errors) => {
//       alert(errors);
//     });
// }



//   fetch("http://localhost:3000/api/v1/recipes", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   window.location
//     .reload()
//     // .then(res => res.text())          // convert to plain text
//     // .then(text => console.log(text))  // then log it out

//     .catch((errors) => {
//       alert(errors);
//     });









// }

//   fetch("http://localhost:3000/api/v1/food_queries", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (!!data.error) {
//         alert(data.error);
//       } else {
//         let newFoodQuery = new FoodQuery(data, data);

//         document.querySelector("#food-questions").innerHTML +=
//           newFoodQuery.renderFoodQueryCard();
//       }
//     })
//     .catch((errors) => {
//       alert(errors);
//     });

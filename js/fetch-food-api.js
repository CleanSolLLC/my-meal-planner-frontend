class FetchFoodApi {
  constructor(url) {
    this.url = url;
  }

  getFoodFetch() {
    return fetch(this.url)
   .then( response => response.json() )
  };

  postFoodFetch(data) {
    return fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }) 

    .then( response => response.json() )
  };

  deleteFoodFetch(data) {
    return fetch(this.url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    }) 

    .then( response => response.json() )
  };




}


  



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








/*!
* Start Bootstrap - Blog Home v5.0.3 (https://startbootstrap.com/template/blog-home)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-home/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


const endpoint = "http://localhost:3000/api/v1/food_queries"

document.addEventListener("DOMContentLoaded", () => {
  getdashboardData()
});

function getdashboardData() {
  fetch(endpoint) 
    .then(response => response.json())
    .then(food_queries => { 
      loaddashboardData(food_queries)
  });
};

function loaddashboardData(obj) {
  obj.data.forEach(foodQuery => {
    const foodQueryMarkup = 
    `<div data-id=${foodQuery.id}>
      <b>Q. ${foodQuery.attributes.search}</b>
      <p><b>A.</b> ${foodQuery.attributes.response}</p>
      <button data-id=${foodQuery.id}>delete</button>
    <div>
    <br></br>`;
    document.querySelector('#food-questions').innerHTML += foodQueryMarkup  
  });

  if (document.querySelector('#food-questions').innerText === "") {
    document.querySelector('#food-questions').innerText = "No Data Available"
  };
}

document.getElementById("button-search").addEventListener("click", function(e) {
  const search = document.querySelector(".form-control").value;
  initiateFoodQuery(search);
});

function initiateFoodQuery(search) {
  const data = {search: search};

  fetch("http://localhost:3000/api/v1/food_queries", {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}




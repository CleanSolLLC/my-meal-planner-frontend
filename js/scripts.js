
const endpoint = "http://localhost:3000/api/v1/food_queries"

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
      <button data-id=${foodQuery.id}>delete</button>
    <div>
    <br></br>`;
    document.querySelector('#food-questions').innerHTML += foodQueryMarkup  
  });


}

document.getElementById("button-search").addEventListener("click", function(e) {
  initiateFoodQuery(e);
});

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
            <button data-id=${data.id}>delete</button>
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



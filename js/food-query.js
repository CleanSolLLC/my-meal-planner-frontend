class FoodQuery {
  constructor(foodQuery, foodQueryAtrributes) {
    this.id = foodQuery.id;
    this.search = foodQueryAtrributes["search"];
    this.response = foodQueryAtrributes["response"];
    FoodQuery.all.push(this);
  }

  renderFoodQueryCard() {
    let foodQueryMarkup = `<div data-id=${this.id}>
        <b>Q. ${this.search}</b>
        <p><b>A.</b> ${this.response}</p>
        <button class="delete-button" type="button" value="Delete" data-id=${this.id}>Delete</button>
        <div>
        <br></br>`;

    return foodQueryMarkup;
  }
}

FoodQuery.all = [];

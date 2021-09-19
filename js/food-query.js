class FoodQuery {
	constructor(foodQuery, foodQueryAtrributes) {
	  this.id = foodQuery.id
	  this.search = foodQueryAtrributes["search"]
	  this.response = foodQueryAtrributes["response"]
	  FoodQuery.all.push(this)
	  debugger
	}
}

FoodQuery.all = []
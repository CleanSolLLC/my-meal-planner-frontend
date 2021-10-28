class Recipe {
  constructor(recipe, imagePathUrl) {
    this.id = recipe.id;
    this.title = recipe.attributes.title;
    this.readyInMinutes = recipe.attributes.readyInMinutes;
    this.servings = recipe.attributes.servings;
    this.sourceUrl = recipe.attributes.sourceUrl;
    this.image = recipe.attributes.image;
    this.imagePathUrl = imagePathUrl;
    this.recipeImage = this.imagePathUrl + this.image;
    this.recipeCategoryName = recipe.attributes.category.query;
    this.recipeCategoryType = recipe.attributes.category.recipe_type;
    this.recipeCategoryCuisine = recipe.attributes.category.cuisine;
    this.recipeCategoryDiet = recipe.attributes.category.diet;
    this.recipeCategoryIntolerance = recipe.attributes.category.intolerances;
    this.recipeCategoryExclude = recipe.attributes.category.exclude;
    this.save();
  }

  save() {
    Recipe.all.push(this);
  }

  static all() {
    return Recipe.all;
  }

  renderRecipeCard() {
    let recipeMarkup = `<div class="col-lg-6">
        <div class="card mb-4">
            <div class="card-body">
                <img class="card-img-top" src=${this.recipeImage} style="width:285px;height:285px;"/>
                <div><b>Title: ${this.title}</b></div>
                <div><b>Ready In:</b> ${this.readyInMinutes} minutes</div>
                <div><b>Servings:</b> ${this.servings}</div>
                <br>
                <div><a href="${this.sourceUrl}"target="_blank">${this.sourceUrl}</a></div>
                <br>
                <div class = "category-name"><strong>Category:</strong>
                  ${this.recipeCategoryName}</div>
                <div><strong>Type:</strong>
                  ${this.recipeCategoryType}</div>
                <div><strong>Cuisine:</strong>
                  ${this.recipeCategoryCuisine}</div>
                <div><strong>Diet:</strong>
                  ${this.recipeCategoryDiet}</div>
                <div><strong>Food Intolerance:</strong>
                  ${this.recipeCategoryIntolerance}</div>
                <div><strong>Exclude:</strong>
                  ${this.recipeCategoryExclude}</div>
                <br>
                <button class="delete-recipe-button" type="button" value="Delete" data-id=${this.id}>Delete</button>
            </div>
        </div>
      </div>`;

    return recipeMarkup;
  }
}

Recipe.all = [];

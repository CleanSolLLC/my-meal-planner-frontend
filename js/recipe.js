class Recipe {
  constructor(recipe, recipeAttributes, imagePathUrl) {
    this.id = recipe.id;
    this.title = recipeAttributes["title"];
    this.readyInMinutes = recipeAttributes["readyInMinutes"];
    this.servings = recipeAttributes["servings"];
    this.sourceUrl = recipeAttributes["sourceUrl"];
    this.image = recipeAttributes["image"];
    this.imagePathUrl = imagePathUrl;
    this.recipeImage = this.imagePathUrl + this.image;
    Recipe.all.push(this);
  }

  renderRecipeCard() {
    let recipeMarkup = `<div class="col-lg-6">
        <div class="card mb-4">
            <div class="card-body">
                <img class="card-img-top" src=${this.recipeImage} style="width:285px;height:285px;"/>
                <b>Title: ${this.title}</b>
                <p><b>Ready In:</b> ${this.readyInMinutes} minutes</p>
                <p><b>Servings:</b> ${this.servings}</p>
                <p><a href="${this.sourceUrl}"target="_blank">${this.sourceUrl}</a></p>
                <button class="delete-recipe-button" type="button" value="Delete" data-id=${this.id}>Delete</button>
            </div>
        </div>
      </div>`;

    return recipeMarkup;
  }
}

Recipe.all = [];

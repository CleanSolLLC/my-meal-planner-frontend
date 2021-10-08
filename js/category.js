class Category {
  constructor(category) {
    this.id = category.id;
    this.recipeCategoryName = category.query;
    this.recipeCategoryType = category.recipe_type;
    this.recipeCategoryCuisine = category.cuisine;
    this.recipeCategoryDiet = category.diet;
    this.recipeCategoryIntolerance = category.intolerances;
    this.recipeCategoryExclude = category.exclude;

    Category.all.push(this);
  }
}

Category.all = [];

class Category {
  constructor(category) {
    this.recipeCategoryName = category.query;
    this.recipeCategoryType = category.recipe_type;
    this.recipeCategoryCuisine = category.cuisine;
    this.recipeCategoryDiet = category.diet;
    this.recipeCategoryIntolerance = category.intolerances;
    this.recipeCategoryExclude = category.exclude;
    this.save();
  }

  save() {
    Category.all.push(this);
  }

  static all() {
    return Category.all;
  }
}

Category.all = [];

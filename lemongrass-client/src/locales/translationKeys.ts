// src/locales/translationKeys.ts

export const TRANSLATION_KEYS = {
  auth: {
    login: "auth.login",
    register: "auth.register",
    logout: "auth.logout",
  },
  createRecipe: {
    name: "createRecipe.name",
    namePlaceholder: "createRecipe.name_placeholder",
    number: "createRecipe.number",
    duration: "createRecipe.duration",
    ingredient: "createRecipe.ingredient",
    instruction: "createRecipe.instruction",
    generalInfo: "createRecipe.recipe_general_info",
    detailInfo: "createRecipe.recipe_detail",
    noteIngredient: "createRecipe.note_ingredient",
    searchUnit: "createRecipe.search_unit",
    unit: "createRecipe.unit",
    cuisine: "createRecipe.cuisine",
    mealType: "createRecipe.meal_type",
    occasion: "createRecipe.occasion",
    difficulty: "createRecipe.difficulty",
    noIngredients: "createRecipe.no_ingredient",
  },
  recipe: {
    create: "recipe.create",
    main: "recipe.main",
    favorite: "recipe.favorite",
    latest: "recipe.latest",
    find: "recipe.find",
    minute: "recipe.minute",
    title: "recipe.recipe-title",
    categoryTitle: "recipe.category-title",
  },
  navigation: {
    community: "navigation.community",
    quickAndEasy: "navigation.quickAndEasy",
    cuisine: "navigation.cuisine",
    occasion: "navigation.occasion",
    meal_type: "navigation.meal_type",
    ingredient: "navigation.ingredient",
    searchPlaceholder: "navigation.searchPlaceholder",
    home: "navigation.home",
    recipe: "navigation.recipe",
  },
  profile: {
    title: "profile.title",
    myRecipe: "profile.myRecipe",
    myPost: "profile.myPost",
    adminPanel: "profile.adminPanel",
  },
  eg: "eg",
  or: "or",
  searchText: "search_text",
  selectIngredient: "select_ingredient",
} as const;

export type TranslationKey =
  (typeof TRANSLATION_KEYS)[keyof typeof TRANSLATION_KEYS];

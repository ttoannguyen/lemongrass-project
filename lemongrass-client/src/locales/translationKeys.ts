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
    generalInfo: "createRecipe.recipe_general_info",
    detailInfo: "createRecipe.recipe_detail",
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
} as const;

export type TranslationKey =
  (typeof TRANSLATION_KEYS)[keyof typeof TRANSLATION_KEYS];

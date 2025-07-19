// type/category.ts

export const CATEGORY_TYPES = ["CUISINE", "OCCASION", "MEAL_TIME"] as const;

export const CATEGORY_LABELS: Record<(typeof CATEGORY_TYPES)[number], string> =
  {
    CUISINE: "CUISINE",
    OCCASION: "OCCASION",
    MEAL_TIME: "MEAL_TIME",
  };

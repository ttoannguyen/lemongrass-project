// src/stores/recipeFormState.ts

import type { RecipeCreateRequest } from "@/types/Recipe/RecipeRequest";
import { create } from "zustand";

interface RecipeFormState {
  formData: Partial<RecipeCreateRequest>;
  updateForm: (data: Partial<RecipeCreateRequest>) => void;
  resetForm: () => void;
}

export const useRecipeFormState = create<RecipeFormState>((set) => ({
  formData: {},
  updateForm: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  resetForm: () => set({ formData: {} }),
}));

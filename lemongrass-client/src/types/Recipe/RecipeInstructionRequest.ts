import type { ImageUpload } from "../image/ImageUpload";

export type RecipeInstructionRequest = {
  stepNumber: number;
  description: string;
  images: ImageUpload[];
};

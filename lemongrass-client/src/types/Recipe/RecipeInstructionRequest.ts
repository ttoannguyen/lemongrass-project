import type { ImageDto } from "../image/ImageDto";

export type RecipeInstructionRequest = {
  stepNumber: number;
  description: string;
  images: ImageDto[];
};

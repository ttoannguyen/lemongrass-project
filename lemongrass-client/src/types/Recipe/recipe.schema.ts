import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string().min(3),
  cookingTime: z.number().min(1),
  description: z.string(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  servings: z.number().min(1),
  category: z.string().min(1, "Please select a category"),

  tags: z
    .array(
      z.object({
        name: z.string(),
        color: z.string(),
      })
    )
    .optional(),

  // ingredients: z.array(
  //   z.object({
  //     templateId: z.string(),
  //     unitId: z.string(),
  //     quantity: z.number().min(0),
  //     note: z.string().optional(),
  //     orderIndex: z.number(),
  //   })
  // ),
  ingredients: z
  .array(
    z.object({
      templateId: z.string().min(1, "Template ID is required"),
    })
  )
  .min(1, "At least one ingredient is required"),


  instructions: z.array(
    z.object({
      stepNumber: z.number(),
      description: z.string(),
      images: z
        .array(
          z.object({
            file: z.any(), // bạn có thể dùng refine() để validate File
            displayOrder: z.number(),
          })
        )
        .optional(),
    })
  ),

  images: z
    .array(
      z.object({
        file: z.any(),
        displayOrder: z.number(),
      })
    )
    .optional(),
});

export type RecipeFormValues = z.infer<typeof recipeSchema>;

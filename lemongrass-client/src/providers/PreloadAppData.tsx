// // providers/PreloadAppData.tsx

// import { useQuery } from "@tanstack/react-query";
// import { feedsService } from "@/services/feeds.service";
// import { categoryService } from "@/services/category/category.service";
// import { recipeService } from "@/services/recipe/recipe.service";
// import { useAuth } from "@/contexts/AuthContext";
// export const PreloadAppData = ({ children }: { children: React.ReactNode }) => {
//   const { isLoggedIn } = useAuth();

//   useQuery({
//     queryKey: ["feeds"],
//     queryFn: feedsService.getFeeds,
//     staleTime: 300_000,
//   });

//   useQuery({
//     queryKey: ["categories"],
//     queryFn: categoryService.getCategories,
//     staleTime: 300_000,
//   });

//   useQuery({
//     queryKey: ["my-recipe"],
//     queryFn: recipeService.getMyRecipes,
//     staleTime: 300_000,
//     enabled: isLoggedIn,
//   });

//   return <>{children}</>;
// };

// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import type { RecipeFeedItem } from "@/types/feed/RecipeFeedItem";
// import { ImageGrid } from "./ImageGrid";

// type Props = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   recipe: RecipeFeedItem;
// };

// export const RecipeModal = ({ open, onOpenChange, recipe }: Props) => {
//   const images = (recipe.imageResponses ?? []).filter(
//     (img): img is { url: string } => typeof img.url === "string"
//   );

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-3xl p-0 overflow-hidden">
//         <DialogTitle className="sr-only">{recipe.title}</DialogTitle>

//         <div className="bg-white dark:bg-neutral-900 rounded-lg overflow-hidden">
//           {/* Image Grid */}
//           {images.length > 0 && (
//             <div className="p-4">
//               <ImageGrid images={images} />
//             </div>
//           )}

//           {/* Recipe Info */}
//           <div className="px-6 pb-6">
//             <h2 className="text-xl font-bold text-green-800 dark:text-green-100 mt-2">
//               {recipe.title}
//             </h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               {recipe.category} • {recipe.difficulty} • {recipe.cookingTime}{" "}
//               phút
//             </p>

//             {/* Tags */}
//             {recipe.tags && recipe.tags.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {recipe.tags.map((tag) => (
//                   <span
//                     key={tag.name}
//                     className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs dark:bg-green-800 dark:text-green-100"
//                   >
//                     #{tag.name}
//                   </span>
//                 ))}
//               </div>
//             )}

//             {/* Ingredients */}
//             <div className="mt-3">
//               <h4 className="font-medium mb-1">Nguyên liệu:</h4>
//               <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
//                 {recipe.ingredients.map((ing, idx) => (
//                   <li key={idx}>
//                     {ing.name} ({ing.quantity})
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

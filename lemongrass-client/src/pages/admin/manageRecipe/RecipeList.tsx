// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { CircleCheck, Eye, Trash2 } from "lucide-react";

// type Recipe = {
//   id: string;
//   title: string;
//   cookingTime: number;
//   difficulty: string;
//   servings: number;
//   ratingAvg: number | null;
//   verified: boolean;
//   shareCount: number;
//   tags: { name: string; color: string }[];
//   images: { url: string; displayOrder: number }[];
//   accountShortResponse: {
//     id: string;
//     username: string;
//     firstName: string;
//     lastName: string;
//     profilePictureUrl: string | null;
//   };
// };

// const RecipeList = ({ recipes }: { recipes: Recipe[] }) => {
//   if (recipes.length === 0) {
//     return (
//       <p className="text-muted-foreground italic">Không có công thức nào.</p>
//     );
//   }

//   return (
//     <div className="grid gap-4">
//       {recipes.map((recipe) => {
//         const imageUrl = recipe.images[0]?.url;

//         return (
//           <Card key={recipe.id}>
//             <CardContent className="flex gap-4 p-4">
//               <img
//                 src={imageUrl}
//                 alt={recipe.title}
//                 className="w-32 h-20 object-cover rounded-md"
//               />

//               <div className="flex-1 space-y-1">
//                 <h2 className="font-semibold text-lg">{recipe.title}</h2>
//                 <p className="text-sm text-muted-foreground">
//                   Tác giả: {recipe.accountShortResponse.firstName}{" "}
//                   {recipe.accountShortResponse.lastName} (
//                   {recipe.accountShortResponse.username})
//                 </p>
//                 <p className="text-sm">
//                   Thời gian: {recipe.cookingTime} phút | Độ khó:{" "}
//                   {recipe.difficulty} | Khẩu phần: {recipe.servings}
//                 </p>

//                 <div className="flex flex-wrap gap-1">
//                   {recipe.tags.map((tag) => (
//                     <Badge
//                       key={tag.name}
//                       style={{ backgroundColor: tag.color }}
//                       className="text-white"
//                     >
//                       {tag.name}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex flex-col items-end justify-between">
//                 {!recipe.verified && (
//                   <Badge
//                     variant="outline"
//                     className="text-yellow-500 border-yellow-500"
//                   >
//                     Chưa duyệt
//                   </Badge>
//                 )}
//                 <div className="flex gap-2">
//                   <Button variant="ghost" size="icon">
//                     <Eye className="size-4" />
//                   </Button>
//                   {!recipe.verified && (
//                     <Button variant="ghost" size="icon">
//                       <CircleCheck className="size-4 text-green-600" />
//                     </Button>
//                   )}
//                   <Button variant="ghost" size="icon">
//                     <Trash2 className="size-4 text-red-500" />
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         );
//       })}
//     </div>
//   );
// };

// export default RecipeList;

import { Skeleton } from "@/components/ui/skeleton";
import RecipeCard from "./RecipeCard";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";

// type Recipe = {
//   id: string;
//   title: string;
//   cookingTime: number;
//   difficulty: string;
//   servings: number;
//   ratingAvg: number | null;
//   verified: boolean;
//   shareCount: number;
//   tags: { name: string; color: string }[];
//   images: { url: string; displayOrder: number }[];
//   accountShortResponse: {
//     id: string;
//     username: string;
//     firstName: string;
//     lastName: string;
//     profilePictureUrl: string | null;
//   };
// };

const RecipeList = ({
  recipes,
  loading,
}: {
  recipes: RecipeResponse[];
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 rounded-md" />
        <Skeleton className="h-24 rounded-md" />
      </div>
    );
  }

  if (recipes.length === 0) {
    return <p className="italic text-muted-foreground">Không có dữ liệu.</p>;
  }

  return (
    <div className="grid gap-4">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
};

export default RecipeList;

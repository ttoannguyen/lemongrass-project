// "use client";

// import { useState, useMemo } from "react";
// import { Input } from "@/components/ui/input";
// import { CircleX } from "lucide-react";
// import type { CategoryResponse } from "@/types/category/CategoryResponse";

// type AllowedCategoriesSelectorProps = {
//   selectedCategoryIds: string[];
//   onChange: (ids: string[]) => void;
//   categories: CategoryResponse[];
// };

// const AllowedCategoriesSelector = ({
//   selectedCategoryIds,
//   onChange,
//   categories,
// }: AllowedCategoriesSelectorProps) => {
//   const [search, setSearch] = useState("");

//   // Memoize selected categories
//   const selectedCategories = useMemo(
//     () => categories.filter((c) => selectedCategoryIds.includes(c.id)),
//     [categories, selectedCategoryIds]
//   );

//   // Memoize filtered categories (not selected and matching search)
//   const filteredCategories = useMemo(() => {
//     return categories
//       .filter((c) => !selectedCategoryIds.includes(c.id))
//       .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
//   }, [categories, selectedCategoryIds, search]);

//   // Check if search matches an already selected category
//   const matchedSelectedCategory = useMemo(() => {
//     if (!search.trim()) return null;
//     return selectedCategories.find((c) =>
//       c.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [selectedCategories, search]);

//   // Toggle category selection
//   const toggleCategory = (categoryId: string) => {
//     onChange([...selectedCategoryIds, categoryId]);
//     setSearch("");
//   };

//   // Remove a category
//   const removeCategory = (categoryId: string) => {
//     onChange(selectedCategoryIds.filter((id) => id !== categoryId));
//   };

//   if (categories.length === 0) return null;

//   return (
//     <div className="space-y-3">
//       {/* Display selected categories */}
//       {selectedCategories.length > 0 && (
//         <div className="flex flex-wrap gap-2">
//           {selectedCategories.map((category) => (
//             <div
//               key={category.id}
//               className="relative flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-sm"
//             >
//               {category.name}
//               <button
//                 type="button"
//                 onClick={() => removeCategory(category.id)}
//                 className="ml-1 hover:text-red-500 transition"
//               >
//                 <CircleX className="size-4" />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Search input */}
//       <Input
//         placeholder="Tìm danh mục..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Categories list */}
//       {(filteredCategories.length > 0 ||
//         matchedSelectedCategory ||
//         search.trim()) && (
//         <div className="max-h-48 overflow-y-auto border rounded-md p-2 flex flex-wrap gap-2">
//           {filteredCategories.length > 0 ? (
//             filteredCategories.map((category) => (
//               <button
//                 key={category.id}
//                 type="button"
//                 onClick={() => toggleCategory(category.id)}
//                 className="px-3 py-1 text-sm rounded-full border bg-muted text-muted-foreground hover:bg-primary/10 transition"
//               >
//                 {category.name}
//               </button>
//             ))
//           ) : matchedSelectedCategory ? (
//             <p className="text-sm text-green-600 italic w-full">
//               Danh mục "<strong>{matchedSelectedCategory.name}</strong>" đã được
//               thêm.
//             </p>
//           ) : (
//             <p className="text-sm text-gray-400 italic w-full">
//               Không tìm thấy danh mục
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllowedCategoriesSelector;
"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { CircleX } from "lucide-react";
import type { CategoryResponse } from "@/types/category/CategoryResponse";

type AllowedCategoriesSelectorProps = {
  selectedCategoryIds: string[];
  onChange: (ids: string[]) => void;
  categories: CategoryResponse[];
  type: "CUISINE" | "OCCASION" | "MEAL_TYPE"; // Restrict to specific types
};

const AllowedCategoriesSelector = ({
  selectedCategoryIds,
  onChange,
  categories,
  type,
}: AllowedCategoriesSelectorProps) => {
  const [search, setSearch] = useState("");

  // Filter categories by the specified type
  const typeCategories = useMemo(
    () => categories.filter((c) => c.type === type),
    [categories, type]
  );

  // Memoize selected categories for this type
  const selectedCategories = useMemo(
    () => typeCategories.filter((c) => selectedCategoryIds.includes(c.id)),
    [typeCategories, selectedCategoryIds]
  );

  // Memoize filtered categories (not selected and matching search)
  const filteredCategories = useMemo(() => {
    return typeCategories
      .filter((c) => !selectedCategoryIds.includes(c.id))
      .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [typeCategories, selectedCategoryIds, search]);

  // Check if search matches an already selected category
  const matchedSelectedCategory = useMemo(() => {
    if (!search.trim()) return null;
    return selectedCategories.find((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [selectedCategories, search]);

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    onChange([...selectedCategoryIds, categoryId]);
    setSearch("");
  };

  // Remove a category
  const removeCategory = (categoryId: string) => {
    onChange(selectedCategoryIds.filter((id) => id !== categoryId));
  };

  if (typeCategories.length === 0) return null;

  const typeLabels: Record<string, string> = {
    CUISINE: "Ẩm thực",
    OCCASION: "Dịp",
    MEAL_TYPE: "Bữa ăn",
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">{typeLabels[type]}</h3>
      {/* Display selected categories */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((category) => (
            <div
              key={category.id}
              className="relative flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-sm"
            >
              {category.name}
              <button
                type="button"
                onClick={() => removeCategory(category.id)}
                className="ml-1 hover:text-red-500 transition"
              >
                <CircleX className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search input */}
      <Input
        placeholder={`Tìm ${typeLabels[type].toLowerCase()}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Categories list */}
      {(filteredCategories.length > 0 ||
        matchedSelectedCategory ||
        search.trim()) && (
        <div className="max-h-48 overflow-y-auto border rounded-md p-2 flex flex-wrap gap-2">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => toggleCategory(category.id)}
                className="px-3 py-1 text-sm rounded-full border bg-muted text-muted-foreground hover:bg-primary/10 transition"
              >
                {category.name}
              </button>
            ))
          ) : matchedSelectedCategory ? (
            <p className="text-sm text-green-600 italic w-full">
              Danh mục "<strong>{matchedSelectedCategory.name}</strong>" đã được
              thêm.
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic w-full">
              Không tìm thấy danh mục {typeLabels[type].toLowerCase()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllowedCategoriesSelector;

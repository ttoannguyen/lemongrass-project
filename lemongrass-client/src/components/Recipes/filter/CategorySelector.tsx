// import { useState } from "react";
// import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Check, ChevronDown } from "lucide-react";

// type CategorySelectorProps = {
//   value: string[];
//   onChange: (categoryIds: string[]) => void;
// };

// const CategorySelector = ({ value, onChange }: CategorySelectorProps) => {
//   const { data: categories = [] } = useCategoryQuery();
//   const [open, setOpen] = useState(false);

//   const toggleCategory = (id: string) => {
//     if (value.includes(id)) {
//       onChange(value.filter((catId) => catId !== id));
//     } else {
//       onChange([...value, id]);
//     }
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button variant="outline" className="flex items-center gap-2">
//           Select Categories
//           <ChevronDown className="w-4 h-4" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-60 max-h-72 overflow-auto p-2 space-y-1">
//         {categories.map((cat) => (
//           <Button
//             key={cat.id}
//             variant={value.includes(cat.id) ? "secondary" : "ghost"}
//             className="w-full justify-between"
//             onClick={() => toggleCategory(cat.id)}
//           >
//             {cat.name}
//             {value.includes(cat.id) && <Check className="w-4 h-4" />}
//           </Button>
//         ))}
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default CategorySelector;


import { useState } from "react";
import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Check, ChevronDown, X } from "lucide-react";

type Category = {
  id: string;
  name: string;
};

type CategorySelectorProps = {
  value: string[];
  onChange: (categoryIds: string[]) => void;
};

const CategorySelector = ({ value, onChange }: CategorySelectorProps) => {
  const { data: categories = [] } = useCategoryQuery();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleCategory = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((catId) => catId !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const filteredCategories = categories.filter((cat: Category) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between rounded-md border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            {value.length === 0 ? "Chọn danh mục" : `${value.length} danh mục đã chọn`}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 max-h-72 overflow-y-auto p-3 space-y-2">
          <Input
            placeholder="Tìm kiếm danh mục..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md border-gray-300 focus:ring-primary focus:border-primary transition-colors duration-200"
          />
          {filteredCategories.length === 0 ? (
            <div className="text-sm text-gray-500 p-2">Không tìm thấy danh mục</div>
          ) : (
            filteredCategories.map((cat: Category) => (
              <Button
                key={cat.id}
                variant={value.includes(cat.id) ? "secondary" : "ghost"}
                className="w-full justify-between text-left"
                onClick={() => toggleCategory(cat.id)}
              >
                {cat.name}
                {value.includes(cat.id) && <Check className="w-4 h-4" />}
              </Button>
            ))
          )}
        </PopoverContent>
      </Popover>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((id) => {
            const category = categories.find((cat: Category) => cat.id === id);
            return (
              category && (
                <div
                  key={id}
                  className="flex items-center gap-1 bg-primary/10 text-primary text-sm px-2 py-1 rounded-md"
                >
                  {category.name}
                  <button
                    onClick={() => toggleCategory(id)}
                    className="hover:text-primary/80"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
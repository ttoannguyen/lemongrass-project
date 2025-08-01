// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import CategorySelector from "./CategorySelector";

// type RecipeFilterProps = {
//   initialKeyword?: string;
//   initialCategoryIds?: string[];
//   initialPageSize?: number;
//   onFilterChange: (filters: {
//     keyword?: string;
//     categoryIds?: string[];
//     size?: number;
//   }) => void;
// };

// const RecipeFilter = ({
//   onFilterChange,
//   initialKeyword = "",
//   initialCategoryIds = [],
//   initialPageSize = 8,
// }: RecipeFilterProps) => {
//   const [keyword, setKeyword] = useState(initialKeyword);
//   const [categoryIds, setCategoryIds] = useState<string[]>(initialCategoryIds);
//   const [pageSize, setPageSize] = useState(initialPageSize);
//   const [isAdvanced, setIsAdvanced] = useState(false);

//   const handleApply = () => {
//     onFilterChange({
//       keyword: keyword.trim(),
//       categoryIds: isAdvanced ? categoryIds : [],
//       size: pageSize,
//     });
//   };

//   const handleReset = () => {
//     setKeyword("");
//     setCategoryIds([]);
//     setPageSize(initialPageSize);
//     onFilterChange({
//       keyword: "",
//       categoryIds: [],
//       size: initialPageSize,
//     });
//   };

//   return (
//     <div className="w-full mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
//       {/* Từ khóa */}
//       <div className="flex-1">
//         <Input
//           placeholder="Tên công thức..."
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//         />
//       </div>

//       {/* Danh mục – chỉ hiện khi nâng cao */}
//       {isAdvanced && (
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-muted-foreground mb-1">
//             Danh mục
//           </label>
//           <CategorySelector selected={categoryIds} onChange={setCategoryIds} />
//         </div>
//       )}

//       {/* Số lượng/trang */}
//       <div className="flex items-end gap-2">
//         <label className="text-sm font-medium text-muted-foreground">
//           Hiển thị:
//         </label>
//         <select
//           value={pageSize}
//           onChange={(e) => setPageSize(parseInt(e.target.value))}
//           className="border border-gray-300 rounded px-2 py-1 text-sm"
//         >
//           {[4, 8, 12, 20].map((size) => (
//             <option key={size} value={size}>
//               {size}/trang
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Nút hành động */}
//       <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
//         <Button onClick={handleApply}>Lọc</Button>
//         <Button variant="outline" onClick={handleReset}>
//           Đặt lại
//         </Button>
//         <Button
//           variant="ghost"
//           className="text-sm underline text-muted-foreground"
//           onClick={() => setIsAdvanced((prev) => !prev)}
//         >
//           {isAdvanced ? "Ẩn tìm kiếm nâng cao" : "Tìm kiếm nâng cao"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default RecipeFilter;

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CategorySelector from "./CategorySelector";

type RecipeFilterProps = {
  initialKeyword?: string;
  initialCategoryIds?: string[];
  initialPageSize?: number;
  onFilterChange: (filters: {
    keyword?: string;
    categoryIds?: string[];
    size?: number;
  }) => void;
};

const RecipeFilter = ({
  onFilterChange,
  initialKeyword = "",
  initialCategoryIds = [],
  initialPageSize = 8,
}: RecipeFilterProps) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [categoryIds, setCategoryIds] = useState<string[]>(initialCategoryIds);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [isAdvanced, setIsAdvanced] = useState(false);

  const handleApply = () => {
    onFilterChange({
      keyword: keyword.trim(),
      categoryIds: isAdvanced ? categoryIds : [],
      size: pageSize,
    });
  };

  const handleReset = () => {
    setKeyword("");
    setCategoryIds([]);
    setPageSize(initialPageSize);
    onFilterChange({
      keyword: "",
      categoryIds: [],
      size: initialPageSize,
    });
  };

  return (
    <div className="w-full  mb-6">
      {/* Dòng đầu: keyword, page size và nút */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
        {/* Từ khóa */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Từ khóa
          </label>
          <Input
            placeholder="Tên công thức..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* Số lượng/trang */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Hiển thị
          </label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
          >
            {[4, 8, 12, 20].map((size) => (
              <option key={size} value={size}>
                {size}/trang
              </option>
            ))}
          </select>
        </div>

        {/* Nút hành động */}
        <div className="flex gap-2 items-end">
          <Button onClick={handleApply}>Lọc</Button>
          <Button variant="outline" onClick={handleReset}>
            Đặt lại
          </Button>
        </div>

        <div className="mt-3">
          <Button
            variant="ghost"
            className="text-sm underline text-muted-foreground px-0"
            onClick={() => setIsAdvanced((prev) => !prev)}
          >
            {isAdvanced ? "X" : "Nâng cao"}
          </Button>
        </div>
      </div>

      {isAdvanced && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Danh mục
          </label>
          <CategorySelector selected={categoryIds} onChange={setCategoryIds} />
        </div>
      )}
    </div>
  );
};

export default RecipeFilter;

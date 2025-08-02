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
//     <div className="w-full space-y-4">
//       <div className="flex flex-col gap-4 ">
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-muted-foreground mb-1">
//             Từ khóa
//           </label>
//           <Input
//             placeholder="Tên công thức..."
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             className="w-full"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-muted-foreground mb-1">
//             Hiển thị
//           </label>
//           <select
//             value={pageSize}
//             onChange={(e) => setPageSize(parseInt(e.target.value))}
//             className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
//           >
//             {[4, 8, 12, 20].map((size) => (
//               <option key={size} value={size}>
//                 {size}/trang
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex gap-2 items-end">
//           <Button onClick={handleApply}>Lọc</Button>
//           <Button variant="outline" onClick={handleReset}>
//             Đặt lại
//           </Button>
//         </div>

//         <div className="mt-3">
//           <Button
//             variant="ghost"
//             className="text-sm underline text-muted-foreground px-0"
//             onClick={() => setIsAdvanced((prev) => !prev)}
//           >
//             {isAdvanced ? "Ẩn nâng cao" : "Nâng cao"}
//           </Button>
//         </div>
//       </div>

//       {isAdvanced && (
//         <div>
//           <label className="block text-sm font-medium text-muted-foreground mb-1">
//             Danh mục
//           </label>
//           <CategorySelector selected={categoryIds} onChange={setCategoryIds} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeFilter;


// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import CategorySelector from "./CategorySelector";
// import TagSelector from "./TagSelector";
// import DifficultySelector from "./DifficultySelector";
// import RatingFilter from "./RatingFilter";
// import TimeSlider from "./TimeSlider";

// const RecipeFilter = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
//   const [keyword, setKeyword] = useState("");
//   const [pageSize, setPageSize] = useState("8");
//   const [categoryIds, setCategoryIds] = useState<string[]>([]);
//   const [tags, setTags] = useState<string[]>([]);
//   const [difficulty, setDifficulty] = useState<string | undefined>(undefined);
//   const [maxTime, setMaxTime] = useState<number | undefined>(undefined);
//   const [minRating, setMinRating] = useState<number | undefined>(undefined);

//   const handleFilter = () => {
//     onFilterChange({ keyword, pageSize, categoryIds, tags, difficulty, maxTime, minRating });
//   };

//   const handleReset = () => {
//     setKeyword("");
//     setPageSize("8");
//     setCategoryIds([]);
//     setTags([]);
//     setDifficulty(undefined);
//     setMaxTime(undefined);
//     setMinRating(undefined);
//     onFilterChange({});
//   };

//   return (
//     <div className="space-y-4 p-4 border rounded-xl bg-white">
//       <h2 className="text-xl font-semibold">Bộ lọc</h2>

//       <div className="space-y-2">
//         <label className="block font-medium">Từ khóa</label>
//         <Input
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//           placeholder="Tên công thức..."
//         />
//       </div>

//       <div className="space-y-2">
//         <label className="block font-medium">Hiển thị</label>
//         <Select value={pageSize} onValueChange={setPageSize}>
//           <SelectTrigger>
//             <SelectValue placeholder="Số lượng/trang" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="8">8/trang</SelectItem>
//             <SelectItem value="12">12/trang</SelectItem>
//             <SelectItem value="20">20/trang</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-2">
//         <label className="block font-medium">Danh mục</label>
//         <CategorySelector selected={categoryIds} onChange={setCategoryIds} />
//       </div>

//       <Accordion type="single" collapsible>
//         <AccordionItem value="advanced">
//           <AccordionTrigger>🔧 Lọc nâng cao</AccordionTrigger>
//           <AccordionContent className="space-y-4 pt-2">
//             <div>
//               <label className="block font-medium mb-1">Tags</label>
//               <TagSelector selected={tags} onChange={setTags} allowCreate />
//             </div>

//             <div>
//               <label className="block font-medium mb-1">Độ khó</label>
//               <DifficultySelector value={difficulty} onChange={setDifficulty} />
//             </div>

//             <div>
//               <label className="block font-medium mb-1">Thời gian nấu (tối đa)</label>
//               <TimeSlider value={maxTime} onChange={setMaxTime} max={180} />
//             </div>

//             <div>
//               <label className="block font-medium mb-1">Đánh giá tối thiểu</label>
//               <RatingFilter value={minRating} onChange={setMinRating} />
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>

//       <div className="flex gap-4 pt-2">
//         <Button onClick={handleFilter} className="bg-button text-white hover:bg-button/90">Lọc</Button>
//         <Button variant="outline" onClick={handleReset}>Đặt lại</Button>
//       </div>
//     </div>
//   );
// };

// export default RecipeFilter;

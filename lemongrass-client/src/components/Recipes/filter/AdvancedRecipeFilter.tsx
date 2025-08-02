import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CategorySelector from "./CategorySelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterParams {
  keyword?: string;
  size?: number;
  categoryIds?: string[];
  tags?: string[];
  difficulty?: string;
  maxTime?: number;
  minRating?: number;
}

interface AdvancedRecipeFilterProps {
  initialKeyword?: string;
  initialCategoryIds?: string[];
  initialPageSize?: number;
  onFilterChange: (filters: FilterParams) => void;
}

const AdvancedRecipeFilter = ({
  initialKeyword = "",
  initialCategoryIds = [],
  initialPageSize = 8,
  onFilterChange,
}: AdvancedRecipeFilterProps) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [size, setSize] = useState(initialPageSize);
  const [categoryIds, setCategoryIds] = useState<string[]>(initialCategoryIds);
  const [tags, setTags] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("");
  const [maxTime, setMaxTime] = useState<number>(Number.NaN);
  const [minRating, setMinRating] = useState<number>(Number.NaN);

  const handleReset = () => {
    setKeyword("");
    setSize(8);
    setCategoryIds([]);
    setTags([]);
    setDifficulty("");
    setMaxTime(Number.NaN);
    setMinRating(Number.NaN);
    onFilterChange({});
  };

  const handleFilter = () => {
    onFilterChange({
      keyword,
      size,
      categoryIds,
      tags,
      difficulty: difficulty || "",
      maxTime,
      minRating,
    });
  };

  return (
    <aside className="bg-white p-6 rounded-xl shadow-sm space-y-6 w-full max-w-sm lg:max-w-xs">
      <h2 className="text-xl font-semibold text-gray-800">Bộ lọc</h2>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label
            htmlFor="keyword"
            className="text-sm font-medium text-gray-700"
          >
            Từ khóa
          </Label>
          <Input
            id="keyword"
            placeholder="Nhập tên công thức..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="rounded-md border-gray-300 focus:ring-primary focus:border-primary transition-colors duration-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="size" className="text-sm font-medium text-gray-700">
            Hiển thị
          </Label>
          <Select
            value={size.toString()}
            onValueChange={(val) => setSize(Number(val))}
          >
            <SelectTrigger
              id="size"
              className="rounded-md border-gray-300 focus:ring-primary focus:border-primary transition-colors duration-200"
            >
              <SelectValue placeholder="Chọn số lượng hiển thị" />
            </SelectTrigger>
            <SelectContent>
              {[8, 12, 16, 20].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n}/trang
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="category"
            className="text-sm font-medium text-gray-700"
          >
            Danh mục
          </Label>
          <CategorySelector value={categoryIds} onChange={setCategoryIds} />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="maxTime"
            className="text-sm font-medium text-gray-700"
          >
            Thời gian nấu tối đa
          </Label>
          <Input
            id="maxTime"
            type="number"
            placeholder="Phút"
            value={maxTime}
            onChange={(e) => setMaxTime(Number(e.target.value) || 9999)}
            className="rounded-md border-gray-300 focus:ring-primary focus:border-primary transition-colors duration-200"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="minRating"
            className="text-sm font-medium text-gray-700"
          >
            Đánh giá tối thiểu
          </Label>
          <Input
            id="minRating"
            type="number"
            placeholder="Điểm (1-5)"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value) || 0)}
            className="rounded-md border-gray-300 focus:ring-primary focus:border-primary transition-colors duration-200"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleFilter}
            className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors duration-200"
          >
            Lọc
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 rounded-md border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            Đặt lại
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default AdvancedRecipeFilter;

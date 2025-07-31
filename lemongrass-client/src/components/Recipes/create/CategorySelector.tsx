import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import type { CategoryResponse } from "@/types/category/CategoryResponse";
// import { useTranslation } from "react-i18next";

function normalizeVietnamese(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .trim()
    .toLowerCase();
}

interface CategorySelectorProps {
  categories: CategoryResponse[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
}

export function CategorySelector({
  categories,
  selectedIds,
  onChange,
  placeholder = "Chọn danh mục",
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // const { t } = useTranslation();

  const filteredOptions = useMemo(() => {
    if (!searchValue) return categories;
    const normalizedSearch = normalizeVietnamese(searchValue);
    return categories.filter((cat) =>
      normalizeVietnamese(cat.name).includes(normalizedSearch)
    );
  }, [categories, searchValue]);

  const toggleCategory = (id: string) => {
    const isSelected = selectedIds.includes(id);
    const newIds = isSelected
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];
    onChange(newIds);
  };

  const selectedNames = categories
    .filter((cat) => selectedIds.includes(cat.id))
    .map((cat) => cat.name)
    .join(", ");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between bg-white text-paragraph border-stroke/10 hover:bg-main  text-left"
        >
          <span className="truncate text-left mr-2">
            {selectedNames || placeholder}
          </span>
          <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-60 p-0 bg-white border-stroke/20 rounded-sm"
      >
        <Command>
          <CommandInput
            placeholder={` ${placeholder.toLowerCase()}...`}
            value={searchValue}
            onInput={(e) => setSearchValue(e.currentTarget.value)}
            className="border-stroke/10"
          />
          <CommandEmpty className="text-xs text-wrap py-4 text-center">
            Không tìm thấy danh mục phù hợp
          </CommandEmpty>
          <CommandGroup>
            {filteredOptions.map((category) => {
              const isSelected = selectedIds.includes(category.id);
              return (
                <CommandItem
                  key={category.id}
                  onSelect={() => toggleCategory(category.id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      isSelected ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.name}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

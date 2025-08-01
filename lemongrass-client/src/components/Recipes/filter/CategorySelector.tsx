import { useState } from "react";
import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";

type CategorySelectorProps = {
  selected: string[];
  onChange: (categoryIds: string[]) => void;
};

const CategorySelector = ({ selected, onChange }: CategorySelectorProps) => {
  const { data: categories = [] } = useCategoryQuery();
  const [open, setOpen] = useState(false);

  const toggleCategory = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((catId) => catId !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          Select Categories
          <ChevronDown className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 max-h-72 overflow-auto p-2 space-y-1">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selected.includes(cat.id) ? "secondary" : "ghost"}
            className="w-full justify-between"
            onClick={() => toggleCategory(cat.id)}
          >
            {cat.name}
            {selected.includes(cat.id) && <Check className="w-4 h-4" />}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default CategorySelector;

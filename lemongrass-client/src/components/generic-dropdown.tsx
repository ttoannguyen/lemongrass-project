import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Option = {
  id: string;
  name: string;
};

export function GenericDropdown({
  value,
  options,
  onChange,
  placeholder = "Chọn mục",
  buttonClassName,
  contentClassName,
}: {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  buttonClassName?: string;
  contentClassName?: string;
}) {
  const selected = options.find((opt) => opt.id === value);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-60 justify-between bg-white text-paragraph border-stroke/10 hover:bg-main focus-visible:ring-0 focus-visible:border-stroke/10",
            buttonClassName
          )}
        >
          <p className="mr-auto">{selected ? selected.name : placeholder}</p>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn(
          "max-w-60 w-auto min-w-30 p-0 bg-white border-stroke/20 rounded-sm",
          contentClassName
        )}
      >
        <div className="max-h-[200px] overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              className={cn(
                "px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-gray-100",
                value === option.id ? "bg-gray-100 font-medium" : ""
              )}
              onClick={() => {
                onChange(option.id);
                setOpen(false);
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

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

type Option = {
  id: string;
  name: string;
};

function normalizeVietnamese(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .trim()
    .toLowerCase();
}

export function GenericCombobox({
  value,
  options,
  defaultValue,
  onChange,
  placeholder = "Chọn mục",
  buttonClassName,
  contentClassName,
}: {
  value: string;
  options: Option[];
  defaultValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  buttonClassName?: string;
  contentClassName?: string;
}) {
  const selected = options.find((opt) => opt.id === value);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // const { t } = useTranslation();

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    const normalizedSearch = normalizeVietnamese(searchValue);
    return options.filter((opt) =>
      normalizeVietnamese(opt.name).includes(normalizedSearch)
    );
  }, [options, searchValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-60 justify-between bg-white text-paragraph border-paragraph hover:bg-main",
            buttonClassName
          )}
        >
          <p className="mr-auto">{selected ? selected.name : defaultValue}</p>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className={cn(
          "w-60 p-0 bg-white border-stroke/20 rounded-sm",
          contentClassName
        )}
      >
        <Command
          filter={(value, search) =>
            normalizeVietnamese(value).includes(normalizeVietnamese(search))
              ? 1
              : 0
          }
        >
          <CommandInput
            placeholder={` ${placeholder.toLowerCase()}...`}
            value={searchValue}
            onInput={(e) => setSearchValue(e.currentTarget.value)}
            className="border-stroke/10! "
          />
          <CommandEmpty className="text-xs text-wrap py-4 text-center">
            Vui lòng chọn nguyên liệu
          </CommandEmpty>
          <CommandGroup className="">
            {filteredOptions.map((option) => (
              <CommandItem
                key={option.id}
                defaultValue={"ingredient"}
                value={normalizeVietnamese(option.name)}
                onSelect={() => {
                  onChange(option.id);
                  setOpen(false);
                  setSearchValue("");
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

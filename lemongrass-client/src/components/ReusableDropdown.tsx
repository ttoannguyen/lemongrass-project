import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { DropdownItem } from "@/types/DropDownItem";

type Props = {
  trigger: React.ReactNode;
  items: DropdownItem[];
};

const ReusableDropdown = ({ trigger, items }: Props) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent className="text-xl border border-stroke bg-background mr-2 ">
        {items.map((item, index) => {
          if (item.show === false) return null;

          return (
            <div key={index}>
              {item.separatorBefore && <DropdownMenuSeparator />}
              <DropdownMenuItem
                onSelect={item.onClick}
                className={
                  item.className ??
                  "focus:bg-highlight cursor-pointer focus:text-main text-headline"
                }
              >
                {item.label}
              </DropdownMenuItem>
              {item.separatorAfter && <DropdownMenuSeparator />}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReusableDropdown;

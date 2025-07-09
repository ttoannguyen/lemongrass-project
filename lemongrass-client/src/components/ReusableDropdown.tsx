import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { DropdownItem } from "@/types/DropDownItem";

type Props = {
  trigger: React.ReactNode;
  header?: string;
  items: DropdownItem[];
};

const ReusableDropdown = ({ trigger, header, items }: Props) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent className="border border-secondary bg-background mr-2">
        {header && (
          <>
            <DropdownMenuLabel>{header}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        {items.map((item, index) => {
          if (item.show === false) return null;

          return (
            <div key={index}>
              {item.separatorBefore && <DropdownMenuSeparator />}
              <DropdownMenuItem
                onSelect={item.onClick}
                className={
                  item.className ??
                  "focus:bg-primary cursor-pointer focus:text-white"
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

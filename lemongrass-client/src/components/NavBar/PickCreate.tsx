import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { TypographyP } from "../ui/TypographyP";
import { useNavigate } from "react-router-dom";

export function PickCreate() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex md:w-20 pl-1 flex-row items-center justify-center border rounded-sm cursor-pointer">
          <TypographyP className="text-xs">Create</TypographyP>
          <ChevronDown className="ml-1 h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-20 bg-white dark:bg-white">
        <DropdownMenuItem onClick={() => navigate("/create-recipe")}>
          Create Recipe
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Lựa chọn 2")}>
          Create Post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

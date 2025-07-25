import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { TypographyP } from "../ui/TypographyP";
import { useState } from "react";
import { CreatePostModal } from "../community/CreatePostModel";
import { useNavigate } from "react-router-dom";

export function PickCreate() {
  const [isPostModalOpen, setPostModalOpen] = useState(false);

  const navegate = useNavigate();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex text-headline hover:bg-highlight md:w-20 pl-1 flex-row items-center justify-center border border-stroke rounded-sm cursor-pointer">
            <TypographyP className="text-xs">Create</TypographyP>
            <ChevronDown className="ml-1 h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-32  text-headline bg-white dark:bg-white"
        >
          <DropdownMenuItem
            className="hover:bg-highlight"
            onClick={() => navegate("/account/new-recipe")}
          >
            Create Recipe
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-highlight p-0 m-0"
            onClick={() => setPostModalOpen(true)}
          >
            Create Post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isPostModalOpen && (
        <CreatePostModal onClose={() => setPostModalOpen(false)} />
      )}
    </>
  );
}

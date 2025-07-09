import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { TypographyP } from "../ui/TypographyP";
import { useState } from "react";
import { CreatePostModal } from "../Posts/CreatePostModel";

export function PickCreate() {
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [isRecipeModalOpen, setRecipeModalOpen] = useState(false);
  console.log(isRecipeModalOpen);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex md:w-20 pl-1 flex-row items-center justify-center border rounded-sm cursor-pointer">
            <TypographyP className="text-xs">Create</TypographyP>
            <ChevronDown className="ml-1 h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-32 bg-white dark:bg-white"
        >
          <DropdownMenuItem onClick={() => setRecipeModalOpen(true)}>
            Create Recipe
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setPostModalOpen(true)}>
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

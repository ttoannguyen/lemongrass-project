import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const RecipeItemSkeleton = () => {
  return (
    <div className="flex md:flex-col bg-white md:h-85 md:w-full rounded-lg overflow-hidden shadow">
      <AspectRatio ratio={16 / 9}>
        <Skeleton className="w-full h-full" />
      </AspectRatio>

      <div className="pt-4 px-4 pb-2 flex flex-col justify-between gap-2 md:h-54">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-3/4" /> {/* Title */}
          <div className="flex gap-2 flex-wrap">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>

        <div className="flex justify-between items-center mt-2">
          <Skeleton className="h-4 w-24" /> {/* Time */}
          <Skeleton className="h-4 w-16" /> {/* Stars */}
        </div>
      </div>
    </div>
  );
};

export default RecipeItemSkeleton;

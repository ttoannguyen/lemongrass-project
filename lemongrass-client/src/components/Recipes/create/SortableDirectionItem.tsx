import IngredientUploadImage from "@/components/imageTempale/IngredientUploadImage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

interface Direction {
  id: string;
  stepNumber: number;
  description: string;
  images: string[];
}

type SortableDirectionItemProps = {
  direction: Direction;
  onChangeDirection: (id: string, newData: Partial<Direction>) => void;
  onDeleteDirection: (id: string) => void;
  onUpload: (file: File) => void;
};

const SortableDirectionItem = ({
  direction,
  onChangeDirection,
  onDeleteDirection,
  onUpload,
}: SortableDirectionItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: direction.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center p-2 gap-2 bg-white border border-stroke/10 rounded-md shadow-sm"
    >
      <div className="flex">
        <div
          {...attributes}
          {...listeners}
          className="cursor-move p-2 my-auto text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="h-5 w-5" />
        </div>

        <div className="mr-2 w-4 my-auto text-center font-semibold text-paragraph">
          {direction.stepNumber.toString().padStart(2, "0")}
        </div>

        <IngredientUploadImage onUpload={onUpload} />
      </div>

      <Textarea
        value={direction.description}
        onChange={(e) =>
          onChangeDirection(direction.id, { description: e.target.value })
        }
        placeholder="eg: Preheat your oven to 375ºF (190ºC). Grease a baking dish with non-stick spray and set it aside."
        className="flex-1 p-0 text-sm min-h-20 border border-stroke/10  focus:outline-none focus:ring-0 focus:border-none text-paragraph leading-relaxed placeholder:text-main placeholder:text-base shadow-none! resize-y"
      />

      <Button
        variant={"none"}
        size="sm"
        className="bg-tertiary text-white"
        onClick={() => onDeleteDirection(direction.id)}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SortableDirectionItem;

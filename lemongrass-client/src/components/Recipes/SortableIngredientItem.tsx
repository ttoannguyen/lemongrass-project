import type { IngredientResponse } from "@/types/ingredient/IngredientResponse";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

type Props = {
  ingredient: IngredientResponse;
};
const SortableIngredientItem = ({ ingredient }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: ingredient.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center gap-2 py-2 px-3 border rounded bg-white shadow-sm"
    >
      <div {...listeners} className="cursor-grab select-none text-lg">
        <GripVertical />
      </div>
      <span className="text-sm">{ingredient.name}</span>
    </div>
  );
};

export default SortableIngredientItem;

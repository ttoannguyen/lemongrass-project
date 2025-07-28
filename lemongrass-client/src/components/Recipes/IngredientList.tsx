import type { IngredientResponse } from "@/types/ingredient/IngredientResponse";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import SortableIngredientItem from "./SortableIngredientItem";

type Props = {
  ingredients: IngredientResponse[];
  setIngredients: React.Dispatch<React.SetStateAction<IngredientResponse[]>>;
};

const IngredientList = ({ ingredients }: Props) => {
  const [items, setItems] = useState<IngredientResponse[]>(ingredients);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {items.map((ingredient) => (
            <SortableIngredientItem
              key={ingredient.id}
              ingredient={ingredient}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default IngredientList;

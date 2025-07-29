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
import SortableIngredientItem from "./SortableIngredientItem";
import { Plus } from "lucide-react";
import { Button } from "../../ui/button";

type Props = {
  ingredients: (IngredientResponse & {
    quantity?: number;
    unitId?: string;
    note?: string;
  })[];
  setIngredients: React.Dispatch<
    React.SetStateAction<
      (IngredientResponse & {
        quantity?: number;
        unitId?: string;
        note?: string;
      })[]
    >
  >;
};

const IngredientList = ({ ingredients, setIngredients }: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setIngredients((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === active.id);
      const newIndex = prev.findIndex((i) => i.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleAddIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      {
        id: `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: "",
        quantity: 0,
        unitId: "",
        note: "",
        aliases: [],
        allowedUnits: [],
      },
    ]);
  };

  const handleDeleteIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={ingredients.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {ingredients.length === 0 ? (
              <p className="text-gray-500 text-center">
                No ingredients added yet
              </p>
            ) : (
              ingredients.map((ingredient) => (
                <SortableIngredientItem
                  key={ingredient.id}
                  ingredient={ingredient}
                  allItems={ingredients}
                  onChangeIngredient={(id, newData) => {
                    setIngredients((prev) =>
                      prev.map((item) =>
                        item.id === id ? { ...item, ...newData } : item
                      )
                    );
                  }}
                  onDeleteIngredient={handleDeleteIngredient}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
      <Button
        variant="none"
        className="mt-2 w-full border border-highlight text-highlight cursor-pointer hover: "
        onClick={handleAddIngredient}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Ingredient
      </Button>
    </div>
  );
};

export default IngredientList;

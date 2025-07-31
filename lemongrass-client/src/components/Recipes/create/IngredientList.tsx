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
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { IngredientResponse } from "@/types/ingredient/IngredientResponse";
import type { RecipeIngredientRequest } from "@/types/Recipe/RecipeIngredientRequest";
import SortableIngredientItem from "./SortableIngredientItem";

type Props = {
  ingredients: RecipeIngredientRequest[];
  addIngredient: () => void;
  updateIngredient: (
    index: number,
    updated: Partial<RecipeIngredientRequest>
  ) => void;
  removeIngredient: (index: number) => void;
  templateIngredients: IngredientResponse[];
};

const IngredientList = ({
  ingredients,
  addIngredient,
  updateIngredient,
  removeIngredient,
  templateIngredients,
}: Props) => {
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

    const oldIndex = ingredients.findIndex((i) => i.templateId === active.id || `temp-${i.orderIndex}` === active.id);
    const newIndex = ingredients.findIndex((i) => i.templateId === over.id || `temp-${i.orderIndex}` === over.id);

    const updated = arrayMove(ingredients, oldIndex, newIndex);
    updated.forEach((_, index) => {
      updateIngredient(index, { orderIndex: index });
    });
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-52  overflow-hidden border border-stroke/10 rounded-sm">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={ingredients.map((i) => i.templateId || `temp-${i.orderIndex}`)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2 p-2">
              {ingredients.length === 0 ? (
                <p className="text-paragraph text-center">
                  No ingredients added yet
                </p>
              ) : (
                ingredients.map((ingredient, index) => (
                  <SortableIngredientItem
                    key={ingredient.templateId || `temp-${index}`}
                    ingredient={ingredient}
                    index={index}
                    allItems={ingredients}
                    templateIngredients={templateIngredients}
                    onChangeIngredient={(index, newData) => {
                      updateIngredient(index, newData);
                    }}
                    onDeleteIngredient={() => removeIngredient(index)}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
      </ScrollArea>
      <Button
        variant="none"
        className="w-full border border-highlight text-highlight"
        onClick={addIngredient}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add ingredient
      </Button>
    </div>
  );
};

export default IngredientList;
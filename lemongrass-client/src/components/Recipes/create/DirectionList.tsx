import React, { useState } from "react";
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
import SortableDirectionItem from "./SortableDirectionItem";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Direction {
  id: string;
  stepNumber: number;
  description: string;
  images: string[];
}

type Props = {
  directions?: Direction[];
  setDirections?: React.Dispatch<React.SetStateAction<Direction[]>>;
};

const DirectionList = ({
  directions: initialDirections = [],
  setDirections: setExternalDirections,
}: Props) => {
  const [localDirections, setLocalDirections] =
    useState<Direction[]>(initialDirections);
  const directions = setExternalDirections
    ? initialDirections
    : localDirections;
  const setDirections = setExternalDirections || setLocalDirections;

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

    setDirections((prev) => {
      const oldIndex = prev.findIndex((d) => d.id === active.id);
      const newIndex = prev.findIndex((d) => d.id === over.id);
      const reorderedDirections = arrayMove(prev, oldIndex, newIndex);
      return reorderedDirections.map((direction, index) => ({
        ...direction,
        stepNumber: index + 1,
      }));
    });
  };

  const handleAddDirection = () => {
    setDirections((prev) => [
      ...prev,
      {
        id: `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        stepNumber: prev.length + 1,
        description: "",
        images: [],
      },
    ]);
  };

  const handleDeleteDirection = (id: string) => {
    setDirections((prev) =>
      prev
        .filter((item) => item.id !== id)
        .map((direction, index) => ({
          ...direction,
          stepNumber: index + 1,
        }))
    );
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={directions.map((d) => d.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {directions.length === 0 ? (
              <p className="text-gray-500 text-center">
                No directions added yet
              </p>
            ) : (
              directions.map((direction) => (
                <SortableDirectionItem
                  key={direction.id}
                  direction={direction}
                  onUpload={() => console.log("Ingredient upload image")}
                  onChangeDirection={(id, newData) =>
                    setDirections((prev) =>
                      prev.map((item) =>
                        item.id === id ? { ...item, ...newData } : item
                      )
                    )
                  }
                  onDeleteDirection={handleDeleteDirection}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
      <Button
        variant="none"
        className="mt-2 w-full border border-highlight text-highlight cursor-pointer"
        onClick={handleAddDirection}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Direction
      </Button>
    </div>
  );
};

export default DirectionList;

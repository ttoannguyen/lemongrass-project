// import type { IngredientResponse } from "@/types/ingredient/IngredientResponse";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import {
//   closestCenter,
//   DndContext,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   type DragEndEvent,
// } from "@dnd-kit/core";
// import SortableIngredientItem from "./SortableIngredientItem";

// type Props = {
//   ingredients: (IngredientResponse & {
//     quantity?: number;
//     unitId?: string;
//     note?: string;
//   })[];
//   setIngredients: React.Dispatch<
//     React.SetStateAction<
//       (IngredientResponse & {
//         quantity?: number;
//         unitId?: string;
//         note?: string;
//       })[]
//     >
//   >;
// };

// const IngredientList = ({ ingredients, setIngredients }: Props) => {
//   const sensors = useSensors(useSensor(PointerSensor));

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (!over) return;
//     if (active.id !== over.id) {
//       const oldIndex = ingredients.findIndex((i) => i.id === active.id);
//       const newIndex = ingredients.findIndex((i) => i.id === over.id);
//       setIngredients(arrayMove(ingredients, oldIndex, newIndex));
//     }
//   };

//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//     >
//       <SortableContext
//         items={ingredients.map((i) => i.id)}
//         strategy={verticalListSortingStrategy}
//       >
//         <div className="space-y-2">
//           {ingredients.map((ingredient) => (
//             <SortableIngredientItem
//               key={ingredient.id}
//               ingredient={ingredient}
//               allItems={ingredients}
//               onChangeIngredient={(id, newData) => {
//                 const newList = ingredients.map((item) =>
//                   item.id === id ? { ...item, ...newData } : item
//                 );
//                 setIngredients(newList);
//               }}
//             />
//           ))}
//         </div>
//       </SortableContext>
//     </DndContext>
//   );
// };

// export default IngredientList;


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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type IngredientWithExtra = IngredientResponse & {
  quantity?: number;
  unitId?: string;
  note?: string;
};

type Props = {
  ingredients: IngredientWithExtra[];
  setIngredients: React.Dispatch<React.SetStateAction<IngredientWithExtra[]>>;
};

const IngredientList = ({ ingredients, setIngredients }: Props) => {
  const sensors = useSensors(useSensor(PointerSensor));

  // Đảm bảo ít nhất 2 mục ban đầu
  const ensuredIngredients = ingredients.length >= 2
    ? ingredients
    : [
        ...ingredients,
        ...Array(2 - ingredients.length).fill(null).map((_, index) => ({
          id: `temp-${Date.now()}-${index}`, // ID tạm thời
          name: "",
          quantity: 0,
          unitId: "",
          note: "",
        })),
      ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = ensuredIngredients.findIndex((i) => i.id === active.id);
      const newIndex = ensuredIngredients.findIndex((i) => i.id === over.id);
      setIngredients(arrayMove(ensuredIngredients, oldIndex, newIndex));
    }
  };

  const handleAddIngredient = () => {
    setIngredients([
      ...ensuredIngredients,
      {
        id: `temp-${Date.now()}`, // ID tạm thời
        name: "",
        quantity: 0,
        unitId: "",
        note: "",
      },
    ]);
  };

  return (
    <div className="space-y-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={ensuredIngredients.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {ensuredIngredients.map((ingredient) => (
            <SortableIngredientItem
              key={ingredient.id}
              ingredient={ingredient}
              allItems={ensuredIngredients}
              onChangeIngredient={(id, newData) => {
                const newList = ensuredIngredients.map((item) =>
                  item.id === id ? { ...item, ...newData } : item
                );
                setIngredients(newList);
              }}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Button
        variant="outline"
        className="mt-2"
        onClick={handleAddIngredient}
      >
        <Plus className="mr-2 h-4 w-4" />
        Thêm nguyên liệu
      </Button>
    </div>
  );
};

export default IngredientList;
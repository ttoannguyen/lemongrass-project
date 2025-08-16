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
// import { Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import type { IngredientResponse } from "@/types/ingredient/IngredientResponse";
// import type { RecipeIngredientRequest } from "@/types/Recipe/RecipeIngredientRequest";
// import SortableIngredientItem from "./SortableIngredientItem";

// // type Props = {
// //   ingredients: RecipeIngredientRequest[];
// //   addIngredient: () => void;
// //   updateIngredient: (
// //     index: number,
// //     updated: Partial<RecipeIngredientRequest>
// //   ) => void;
// //   removeIngredient: (index: number) => void;
// //   templateIngredients: IngredientResponse[];
// // };

// // T generic: RecipeIngredientRequest or RecipeIngredientUpdateRequest
// type Props<T extends { templateId: string; unitId: string }> = {
//   ingredients: T[];
//   addIngredient: () => void;
//   updateIngredient: (index: number, updated: Partial<T>) => void;
//   removeIngredient: (index: number) => void;
//   templateIngredients: IngredientResponse[];
// };

// // const IngredientList = ({
// //   ingredients,
// //   addIngredient,
// //   updateIngredient,
// //   removeIngredient,
// //   templateIngredients,
// // }: Props) => {

// function IngredientList<T extends { templateId: string; unitId: string }>({
//   ingredients,
//   addIngredient,
//   updateIngredient,
//   removeIngredient,
//   templateIngredients,
// }: Props<T>) {
//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 8,
//       },
//     })
//   );

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     // const oldIndex = ingredients.findIndex(
//     //   (i) => i.templateId === active.id || `temp-${i.orderIndex}` === active.id
//     // );
//     // const newIndex = ingredients.findIndex(
//     //   (i) => i.templateId === over.id || `temp-${i.orderIndex}` === over.id
//     // );

//      const oldIndex = ingredients.findIndex((_, i) => i.toString() === active.id);
//     const newIndex = ingredients.findIndex((_, i) => i.toString() === over.id);

//     // const updated = arrayMove(ingredients, oldIndex, newIndex);
//     // updated.forEach((_, index) => {
//     //   updateIngredient(index, { orderIndex: index });
//     // });
//      const reordered = arrayMove(ingredients, oldIndex, newIndex);
//     reordered.forEach((_, index) => {
//       updateIngredient(index, { orderIndex: index } as unknown as Partial<T>);
//     });
//   };

//   return (
//   //   <div className="space-y-4">
//   //     <ScrollArea className="h-52  overflow-hidden border border-stroke/10 rounded-sm">
//   //       <DndContext
//   //         sensors={sensors}
//   //         collisionDetection={closestCenter}
//   //         onDragEnd={handleDragEnd}
//   //       >
//   //         <SortableContext
//   //           items={ingredients.map(
//   //             (i) => i.templateId || `temp-${i.orderIndex}`
//   //           )}
//   //           strategy={verticalListSortingStrategy}
//   //         >
//   //           <div className="space-y-2 p-2">
//   //             {ingredients.length === 0 ? (
//   //               <p className="text-paragraph text-center">
//   //                 No ingredients added yet
//   //               </p>
//   //             ) : (
//   //               ingredients.map((ingredient, index) => (
//   //                 <SortableIngredientItem
//   //                   key={ingredient.templateId || `temp-${index}`}
//   //                   ingredient={ingredient}
//   //                   index={index}
//   //                   allItems={ingredients}
//   //                   templateIngredients={templateIngredients}
//   //                   onChangeIngredient={(index, newData) => {
//   //                     updateIngredient(index, newData);
//   //                   }}
//   //                   onDeleteIngredient={() => removeIngredient(index)}
//   //                 />
//   //               ))
//   //             )}
//   //           </div>
//   //         </SortableContext>
//   //       </DndContext>
//   //     </ScrollArea>
//   //     <Button
//   //       variant="none"
//   //       className="w-full border border-highlight text-highlight"
//   //       onClick={addIngredient}
//   //     >
//   //       <Plus className="mr-2 h-4 w-4" />
//   //       Add ingredient
//   //     </Button>
//   //   </div>
//   // );
//   <div className="space-y-4">
//       <ScrollArea className="h-52 border border-stroke/10 rounded-sm">
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//         >
//           <SortableContext
//             items={ingredients.map((_, i) => i.toString())}
//             strategy={verticalListSortingStrategy}
//           >
//             <div className="space-y-2">
//               {ingredients.length === 0 ? (
//                 <p className="text-paragraph text-center">No ingredients yet</p>
//               ) : (
//                 ingredients.map((ingredient, index) => (
//                   <SortableIngredientItem
//                     key={index}
//                     index={index}
//                     ingredient={ingredient}
//                     templateIngredients={templateIngredients}
//                     updateIngredient={updateIngredient}
//                     removeIngredient={removeIngredient}
//                   />
//                 ))
//               )}
//             </div>
//           </SortableContext>
//         </DndContext>
//       </ScrollArea>
//       <Button
//         variant="none"
//         className="w-full border border-highlight text-highlight"
//         onClick={addIngredient}
//       >
//         <Plus className="mr-2 h-4 w-4" /> Add Ingredient
//       </Button>
//     </div>
//   );
// }

// export default IngredientList;
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
import type { RecipeIngredientUpdateRequest } from "@/types/Recipe/RecipeUpdateRequest";
import SortableIngredientItem from "./SortableIngredientItem";

type Props = {
  ingredients: RecipeIngredientUpdateRequest[];
  setIngredients: (ingredients: RecipeIngredientUpdateRequest[]) => void;
  addIngredient: () => void;
  updateIngredient: (
    index: number,
    updated: Partial<RecipeIngredientUpdateRequest>
  ) => void;
  removeIngredient: (index: number) => void;
  templateIngredients: IngredientResponse[];
};

const IngredientList = ({
  ingredients,
  setIngredients,
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

  // Build stable item id used by dnd-kit for each ingredient:
  // Prefer backend id when available, otherwise use a temp id based on orderIndex or index.
  // const getItemId = (ing: RecipeIngredientUpdateRequest, index: number) =>
  //   ing.id ?? `temp-${ing.orderIndex ?? index}`;
  const getItemId = (ing: RecipeIngredientUpdateRequest) =>
    ing.id ?? ing.clientId;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // find old / new index by comparing the stable item ids
    const oldIndex = ingredients.findIndex(
      (ing, i) => String(getItemId(ing, i)) === String(active.id)
    );
    const newIndex = ingredients.findIndex(
      (ing, i) => String(getItemId(ing, i)) === String(over.id)
    );

    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

    const reordered = arrayMove(ingredients, oldIndex, newIndex);

    // update orderIndex for each item after reorder
    reordered.forEach((item, idx) => {
      updateIngredient(idx, { orderIndex: idx });
    });

    setIngredients(reordered);
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
            items={ingredients.map((ing, i) => getItemId(ing, i))}
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
                    key={getItemId(ingredient, index)}
                    sortableId={getItemId(ingredient, index)}
                    ingredient={{ ...ingredient, note: ingredient.note ?? "" }}
                    allItems={ingredients.map((i) => ({
                      ...i,
                      note: i.note ?? "",
                    }))}
                    // ingredient={ingredient}
                    index={index}
                    // allItems={ingredients}
                    templateIngredients={templateIngredients}
                    onChangeIngredient={(idx, newData) =>
                      updateIngredient(idx, newData)
                    }
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
        Thêm nguyên liệu
      </Button>
    </div>
  );
};

export default IngredientList;

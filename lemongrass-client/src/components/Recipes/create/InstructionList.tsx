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
// import type { UIInstruction } from "@/hooks/useCreateRecipe";
// import SortableInstructionItem from "./SortableInstructionItem";
// import type { ImageUpload } from "@/types/image/ImageUpload";

// // type Props = {
// //   instructions: UIInstruction[];
// //   addInstruction: () => void;
// //   updateInstruction: (id: string, updated: Partial<UIInstruction>) => void;
// //   removeInstruction: (id: string) => void;
// //   addInstructionImage: (instructionId: string, images: ImageUpload[]) => void;
// //   removeInstructionImage: (id: string, index: number) => void;
// // };

// // const InstructionList = ({
// //   instructions,
// //   addInstruction,
// //   updateInstruction,
// //   removeInstruction,
// //   addInstructionImage,
// //   removeInstructionImage,
// // }: Props) => {


// // T generic: có thể là UIInstruction hoặc RecipeInstructionUpdateRequest
// type Props<T extends { id?: string; stepNumber: number }> = {
//   instructions: T[];
//   addInstruction: () => void;
//   updateInstruction: (id: string, updated: Partial<T>) => void;
//   removeInstruction: (id: string) => void;
//   addInstructionImage: (instructionId: string, images: ImageUpload[]) => void;
//   removeInstructionImage: (id: string, index: number) => void;
// };

// function InstructionList<T extends { id?: string; stepNumber: number }>({
//   instructions,
//   addInstruction,
//   updateInstruction,
//   removeInstruction,
//   addInstructionImage,
//   removeInstructionImage,
// }: Props<T>) {
//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 8,
//       },
//     })
//   );

//   // const handleDragEnd = (event: DragEndEvent) => {
//   //   const { active, over } = event;

//   //   if (!over || active.id === over.id) return;

//   //   const oldIndex = instructions.findIndex((i) => i.id === active.id);
//   //   const newIndex = instructions.findIndex((i) => i.id === over.id);

//   //   const reordered = arrayMove(instructions, oldIndex, newIndex);
//   //   reordered.forEach((item, index) => {
//   //     updateInstruction(item.id, { stepNumber: index + 1 });
//   //   });
//   // };
  
//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     const oldIndex = instructions.findIndex((i) => i.id === active.id);
//     const newIndex = instructions.findIndex((i) => i.id === over.id);

//     const reordered = arrayMove(instructions, oldIndex, newIndex);
//     reordered.forEach((item, index) => {
//       updateInstruction(item.id!, { stepNumber: index + 1 } as Partial<T>);
//     });
//   };

//   return (
//     // <div className="space-y-4">
//     //   <ScrollArea className="h-52 border border-stroke/10 rounded-sm">
//     //     <DndContext
//     //       sensors={sensors}
//     //       collisionDetection={closestCenter}
//     //       onDragEnd={handleDragEnd}
//     //     >
//     //       <SortableContext
//     //         items={instructions.map((d) => d.id)}
//     //         strategy={verticalListSortingStrategy}
//     //       >
//     //         <div className="space-y-2">
//     //           {instructions.length === 0 ? (
//     //             <p className="text-paragraph text-center">
//     //               No directions added yet
//     //             </p>
//     //           ) : (
//     //             instructions.map((instruction) => (
//     //               <SortableInstructionItem
//     //                 key={instruction.id}
//     //                 instruction={instruction}
//     //                 onUpload={(images: ImageUpload[]) =>
//     //                   addInstructionImage(instruction.id, images)
//     //                 }
//     //                 onChangeInstruction={(id, newData) =>
//     //                   updateInstruction(id, newData)
//     //                 }
//     //                 onDeleteInstruction={() =>
//     //                   removeInstruction(instruction.id)
//     //                 }
//     //                 removeInstructionImage={removeInstructionImage}
//     //               />
//     //             ))
//     //           )}
//     //         </div>
//     //       </SortableContext>
//     //     </DndContext>
//     //   </ScrollArea>
//     //   <Button
//     //     variant="none"
//     //     className="w-full border border-highlight text-highlight cursor-pointer"
//     //     onClick={addInstruction}
//     //   >
//     //     <Plus className="mr-2 h-4 w-4" />
//     //     Add Direction
//     //   </Button>
//     // </div>
//      <div className="space-y-4">
//       <ScrollArea className="h-52 border border-stroke/10 rounded-sm">
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//         >
//           <SortableContext
//             items={instructions.map((d) => d.id!)}
//             strategy={verticalListSortingStrategy}
//           >
//             <div className="space-y-2">
//               {instructions.length === 0 ? (
//                 <p className="text-paragraph text-center">
//                   No directions added yet
//                 </p>
//               ) : (
//                 instructions.map((instruction) => (
//                   <SortableInstructionItem
//                     key={instruction.id}
//                     instruction={instruction}
//                     onUpload={(images: ImageUpload[]) =>
//                       addInstructionImage(instruction.id!, images)
//                     }
//                     onChangeInstruction={(id, newData) =>
//                       updateInstruction(id, newData)
//                     }
//                     onDeleteInstruction={() =>
//                       removeInstruction(instruction.id!)
//                     }
//                     removeInstructionImage={removeInstructionImage}
//                   />
//                 ))
//               )}
//             </div>
//           </SortableContext>
//         </DndContext>
//       </ScrollArea>
//       <Button
//         variant="none"
//         className="w-full border border-highlight text-highlight cursor-pointer"
//         onClick={addInstruction}
//       >
//         <Plus className="mr-2 h-4 w-4" /> Add Direction
//       </Button>
//     </div>
//   );
//   );
// };

// export default InstructionList;

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
import SortableInstructionItem from "./SortableInstructionItem";
import type { ImageUpload } from "@/types/image/ImageUpload";

// Dùng chung cho cả create & edit
export type CommonInstruction = {
  id?: string;
  stepNumber: number;
  description: string;
  images: ImageUpload[];
};

type Props = {
  instructions: CommonInstruction[];
  addInstruction: () => void;
  updateInstruction: (id: string, updated: Partial<CommonInstruction>) => void;
  removeInstruction: (id: string) => void;
  addInstructionImage: (instructionId: string, images: ImageUpload[]) => void;
  removeInstructionImage: (id: string, index: number) => void;
};

const InstructionList = ({
  instructions,
  addInstruction,
  updateInstruction,
  removeInstruction,
  addInstructionImage,
  removeInstructionImage,
}: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = instructions.findIndex((i) => i.id === active.id);
    const newIndex = instructions.findIndex((i) => i.id === over.id);

    const reordered = arrayMove(instructions, oldIndex, newIndex);
    reordered.forEach((item, index) => {
      updateInstruction(item.id!, { stepNumber: index + 1 });
    });
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-52 border border-stroke/10 rounded-sm">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={instructions.map((d) => d.id!)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {instructions.length === 0 ? (
                <p className="text-paragraph text-center">
                  No directions added yet
                </p>
              ) : (
                instructions.map((instruction) => (
                  <SortableInstructionItem
                    key={instruction.id}
                    instruction={instruction}
                    onUpload={(images: ImageUpload[]) =>
                      addInstructionImage(instruction.id!, images)
                    }
                    onChangeInstruction={(id, newData) =>
                      updateInstruction(id, newData)
                    }
                    onDeleteInstruction={() =>
                      removeInstruction(instruction.id!)
                    }
                    removeInstructionImage={removeInstructionImage}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
      </ScrollArea>
      <Button
        variant="none"
        className="w-full border border-highlight text-highlight cursor-pointer"
        onClick={addInstruction}
      >
        <Plus className="mr-2 h-4 w-4" /> Thêm hướng dẫn
      </Button>
    </div>
  );
};

export default InstructionList;

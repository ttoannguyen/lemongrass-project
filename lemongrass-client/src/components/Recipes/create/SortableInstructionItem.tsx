import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import type { ImageUpload } from "@/types/image/ImageUpload";
import InstructionUploadImage from "@/components/imageTempale/InstructionUploadImage";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import type { CommonInstruction } from "./InstructionList";
import { nanoid } from "nanoid";

type SortableInstructionItemProps = {
  instruction: CommonInstruction;
  onChangeInstruction: (id: string, newData: Partial<CommonInstruction>) => void;
  onDeleteInstruction: (id: string) => void;
  onUpload: (images: ImageUpload[]) => void;
  removeInstructionImage: (id: string, index: number) => void;
};

const SortableInstructionItem = ({
  instruction,
  onChangeInstruction,
  onDeleteInstruction,
  onUpload,
  removeInstructionImage,
}: SortableInstructionItemProps) => {
  const ensuredId = instruction.id ?? nanoid();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: ensuredId,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const images = instruction.images ?? [];

  const firstImage =
    images.length > 0
      ? images.reduce((prev, curr) =>
          (prev.displayOrder ?? 0) < (curr.displayOrder ?? 0) ? prev : curr
        )
      : null;

  const getFirstImageIndex = () => {
    if (!firstImage) return -1;
    return images.findIndex((img) => img.displayOrder === firstImage.displayOrder);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col p-3 gap-3 bg-white border border-stroke/10 rounded-md shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-move p-2 my-auto text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="h-5 w-5" />
        </div>

        <div className="mr-2 w-4 my-auto text-center font-semibold text-paragraph">
          {(instruction.stepNumber ?? 0).toString().padStart(2, "0")}
        </div>

        <div className="relative flex items-center gap-3">
          {firstImage ? (
            <HoverCard openDelay={0} closeDelay={100}>
              <HoverCardTrigger asChild>
                <div className="relative">
                  <img
                    src={firstImage.file ? URL.createObjectURL(firstImage.file) : firstImage.previewUrl ?? ""}
                    alt="Ảnh chính"
                    className="w-24 h-16 object-cover rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 p-1 rounded-full"
                    onClick={() =>
                      removeInstructionImage(ensuredId, getFirstImageIndex())
                    }
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                side="right"
                sideOffset={8}
                className="w-80 p-4 bg-main hover-card-content"
              >
                <div className="flex gap-4">
                  {images.map((image, index) => (
                    <div key={`${ensuredId}-${index}`} className="relative">
                      <img
                        src={image.file ? URL.createObjectURL(image.file) : image.previewUrl ?? ""}
                        alt={`Ảnh ${index + 1}`}
                        className="w-24 h-16 object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 p-1 rounded-full"
                        onClick={() => removeInstructionImage(ensuredId, index)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                  {images.length < 3 && (
                    <InstructionUploadImage
                      onUpload={onUpload}
                      className="w-24 h-16"
                    />
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <InstructionUploadImage onUpload={onUpload} className="w-24 h-16" />
          )}
        </div>

        <Textarea
          value={instruction.description}
          onChange={(e) =>
            onChangeInstruction(ensuredId, { description: e.target.value })
          }
          placeholder="Nhập bước hướng dẫn (ví dụ: Làm nóng lò ở 190ºC)"
          className="flex-1 p-2 text-sm min-h-12 border border-stroke/10 focus:outline-none focus:ring-0 focus:border-stroke/40 text-paragraph leading-relaxed placeholder:text-main placeholder:text-sm shadow-none resize-y"
        />

        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDeleteInstruction(ensuredId)}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SortableInstructionItem;

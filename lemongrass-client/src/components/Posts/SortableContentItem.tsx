import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


interface Content {
  id: string;
  text: string;
  contentTitle: string;
  displayOrder: number;
  file?: File;
}

interface Props {
  content: Content;
  index: number;
  sortableId: string;
  isPending: boolean;
  allContents: Content[]; // Added to match the reference's allItems
  onChangeContent: (index: number, data: Partial<Content>) => void;
  onDeleteContent: () => void;
}

const SortableContentItem = ({
  content,
  index,
  sortableId,
  isPending,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  allContents, // Not used in this case but included for consistency
  onChangeContent,
  onDeleteContent,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: sortableId, disabled: isPending });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
    opacity: isDragging ? 0.8 : 1,
    boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col p-4 bg-white border border-stroke/10 rounded-md shadow-sm gap-2"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">
          Nội dung {index + 1}
        </h3>
        <div className="flex items-center gap-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-move p-2 text-gray-400 hover:text-gray-600"
          >
            <GripVertical className="h-5 w-5" />
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDeleteContent}
            disabled={isPending}
            className="h-8 w-8 bg-tertiary text-white"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Input
          value={content.contentTitle}
          onChange={(e) =>
            onChangeContent(index, { contentTitle: e.target.value })
          }
          placeholder={`Tiêu đề nội dung ${index + 1}...`}
          className="rounded-md border-stroke/30 focus:ring-primary focus:border-primary transition-colors duration-200"
          disabled={isPending}
        />
        <Textarea
          value={content.text}
          onChange={(e) => onChangeContent(index, { text: e.target.value })}
          placeholder={`Nội dung ${index + 1}...`}
          className="min-h-[100px] max-h-[200px] rounded-md border-stroke/30 focus:ring-primary focus:border-primary transition-colors duration-200"
          disabled={isPending}
        />
        <div>
          <label className="text-sm font-medium text-gray-700">
            Tệp đính kèm
          </label>
          <Input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (file.size > 5 * 1024 * 1024) { 
                  toast("Tệp quá lớn! Vui lòng chọn tệp dưới 5MB.");
                  return;
                }
                onChangeContent(index, { file });
              }
            }}
            className="rounded-md border-stroke/30 focus:ring-primary focus:border-primary transition-colors duration-200"
            disabled={isPending}
          />
          {content.file && (
            <p className="text-sm text-gray-500 mt-1">
              Đã chọn: {content.file.name}
            </p>
          )}
          {content.file && content.file.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(content.file)}
              alt="Preview"
              className="h-20 w-20 object-cover mt-2 rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SortableContentItem;
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { BlogSection } from "./BlogSectionList";

type Props = {
  section: BlogSection;
  onChange: (updated: Partial<BlogSection>) => void;
  onDelete: () => void;
};

export default function SortableBlogSectionItem({
  section,
  onChange,
  onDelete,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-3 p-3 bg-white border rounded shadow-sm"
    >
      <div {...attributes} {...listeners} className="cursor-move text-gray-400">
        <GripVertical className="h-5 w-5" />
      </div>

      {section.type === "text" ? (
        <Textarea
          value={section.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="Nhập đoạn văn..."
          className="flex-1 text-sm"
        />
      ) : (
        <img
          src={URL.createObjectURL(section.file)}
          alt="Blog Image"
          className="w-48 max-h-48 object-cover rounded"
        />
      )}

      <Button variant="destructive" size="sm" onClick={onDelete}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

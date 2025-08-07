import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SortableBlogSectionItem from "./SortableBlogSectionItem";

export type BlogSection =
  | { id: string; type: "text"; content: string }
  | { id: string; type: "image"; file: File };

type Props = {
  sections: BlogSection[];
  updateSection: (id: string, updated: Partial<BlogSection>) => void;
  removeSection: (id: string) => void;
  addTextSection: () => void;
  addImageSection: (file: File) => void;
  onReorder: (reordered: BlogSection[]) => void;
};

export default function BlogSectionList({
  sections,
  updateSection,
  removeSection,
  addTextSection,
  addImageSection,
  onReorder,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    const reordered = arrayMove(sections, oldIndex, newIndex);
    onReorder(reordered);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) addImageSection(file);
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[70vh] border rounded-sm">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2 p-2">
              {sections.map((section) => (
                <SortableBlogSectionItem
                  key={section.id}
                  section={section}
                  onChange={(updated) => updateSection(section.id, updated)}
                  onDelete={() => removeSection(section.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </ScrollArea>

      <div className="flex gap-2">
        <Button variant="outline" onClick={addTextSection}>
          + Thêm đoạn văn
        </Button>
        <label>
          <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
          <Button variant="outline" className="cursor-pointer">
            + Thêm ảnh
          </Button>
        </label>
      </div>
    </div>
  );
}

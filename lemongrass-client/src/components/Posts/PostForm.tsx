import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubmitPost } from "@/hooks/queries/useSubmitPost";
import type { PostCreate } from "@/types/post/PostCreate";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import useCreatePost from "@/hooks/useCreatePost";
import SortableContentItem from "./SortableContentItem";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface PostFormProps {
  onSuccess?: () => void;
}

const PostForm = ({ onSuccess }: PostFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const {
    title,
    setTitle,
    contents,
    addContent,
    removeContent,
    updateContent,
    reorderContents,
    mainContents,
    setMainContents
  } = useCreatePost();

  const { mutateAsync: submitPostMutation, isPending } = useSubmitPost();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = contents.findIndex((content) => content.id === active.id);
      const newIndex = contents.findIndex((content) => content.id === over.id);
      reorderContents(oldIndex, newIndex);
    }
  }, [contents, reorderContents]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Vui lòng nhập tiêu đề bài viết");
      toast.error("Vui lòng nhập tiêu đề bài viết");
      return;
    }

    const hasValidContent = contents.some(
      (content) => content.text.trim() || content.contentTitle.trim() || content.file
    );
    if (!hasValidContent) {
      setError("Vui lòng nhập ít nhất một nội dung bài viết");
      toast.error("Vui lòng nhập ít nhất một nội dung bài viết");
      return;
    }

    const payload: PostCreate = {
      title,
      contents,
      mainContents,
      visibility: "PUBLIC",
    };

    try {
      console.log(payload)
      const post = await submitPostMutation(payload);
      console.log("Recipe created:", post);
      toast.success("Đăng bài viết thành công!");
      if (onSuccess) onSuccess();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Lỗi không xác định";
      setError(`Lỗi khi tạo bài viết: ${errorMessage}`);
      toast.error(`Lỗi khi tạo bài viết: ${errorMessage}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Tiêu đề bài viết
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tiêu đề bài viết..."
          className="rounded-md border-stroke/30 focus:ring-primary focus:border-primary transition-colors duration-200"
          required
        />
        <label htmlFor="mainContents" className="text-sm font-medium text-gray-700">
          Nội dung
        </label>
        <Input
          id="mainContents"
          value={mainContents}
          onChange={(e) => setMainContents(e.target.value)}
          placeholder="Nhập nội dung bài viết..."
          className="rounded-md border-stroke/30 focus:ring-primary focus:border-primary transition-colors duration-200"
          required
        />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
        items={contents.map((content) => content.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Nội dung</label>
            {contents.map((content, index) => (
              <SortableContentItem
                key={content.id}
                sortableId={content.id}
                content={content}
                index={index}
                isPending={isPending}
                allContents={contents} 
                onChangeContent={updateContent}
                onDeleteContent={() => {
                  if (contents.length === 1) {
                    toast.error("Phải có ít nhất một nội dung!");
                    return;
                  }
                  if (window.confirm("Bạn có chắc muốn xóa nội dung này?")) {
                    removeContent(index);
                  }
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          if (contents.length >= 5) {
            toast.error("Bạn chỉ có thể thêm tối đa 5 nội dung!");
            return;
          }
          addContent();
        }}
        className="mt-2 rounded-md border-stroke/30 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        disabled={isPending}
      >
        Thêm nội dung
      </Button>

      {/* <div className="space-y-2">
        <label htmlFor="images" className="text-sm font-medium text-gray-700">
          Tải lên ảnh (tối đa 5)
        </label>
        <ImageUploadPreview
          value={images}
          addImage={addPostImage}
          removeImage={removePostImage}
        />
      </div> */}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors duration-200"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Đang đăng...
            </>
          ) : (
            "Đăng bài"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
          className="flex-1 rounded-md border-stroke/30 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          disabled={isPending}
        >
          Hủy
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
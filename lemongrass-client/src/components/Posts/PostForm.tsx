import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUploadPreview from "@/components/imageTempale/ImageUploadPreview";
import { useSubmitPost } from "@/hooks/queries/useSubmitPost";
import type { PostCreate } from "@/types/post/PostCreate";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import useCreatePost from "@/hooks/useCreatePost";
import { EditorInstance } from 'novel';
import {
  EditorBubble,
  EditorBubbleItem,
  EditorCommand,
  EditorCommandItem,
  EditorContent,
  EditorRoot,
} from "novel";

interface PostFormProps {
  onSuccess?: () => void;
}

const PostForm = ({ onSuccess }: PostFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const {
    title,
    setTitle,
    content,
    setContent,
    images,
    addPostImage,
    removePostImage,
  } = useCreatePost();

  const { mutateAsync: submitPostMutation, isPending } = useSubmitPost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Vui lòng nhập tiêu đề bài viết");
      toast.error("Vui lòng nhập tiêu đề bài viết");
      return;
    }

    if (!content.trim()) {
      setError("Vui lòng nhập nội dung bài viết");
      toast.error("Vui lòng nhập nội dung bài viết");
      return;
    }

    const payload: PostCreate = {
      title,
      content,
      images,
      visibility: "PUBLIC",
    };

    try {
      const recipe = await submitPostMutation(payload);
      console.log("Recipe created:", recipe);
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
          Tiêu đề
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tiêu đề bài viết..."
          className="rounded-md border-gray-300 focus:ring-primary focus:border-primary transition-colors duration-200"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-gray-700">
          Nội dung
        </label>
        {/* <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Bạn đang nghĩ gì?"
          className="min-h-[150px] max-h-[300px] rounded-md border-gray-300 focus:ring-primary focus:border-primary transition-colors duration-200"
          required
        /> */}
       <Editor/>
      </div>

      <div className="space-y-2">
        <label htmlFor="images" className="text-sm font-medium text-gray-700">
          Tải lên ảnh (tối đa 5)
        </label>
        <ImageUploadPreview
          value={images}
          addImage={addPostImage}
          removeImage={removePostImage}
        />
      </div>

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
          className="flex-1 rounded-md border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          disabled={isPending}
        >
          Hủy
        </Button>
      </div>
    </form>
  );
};

export default PostForm;

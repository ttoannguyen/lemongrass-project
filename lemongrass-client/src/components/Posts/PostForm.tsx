import useCreatePost from "@/hooks/useCreatePost";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ImageUploadPreview from "@/components/imageTempale/ImageUploadPreview";
import { useSubmitPost } from "@/hooks/queries/useSubmitPost";
import type { PostCreate } from "@/types/post/PostCreate";
import { toast } from "sonner";

type Props = {
  onSuccess?: () => void;
};

const PostForm = ({ onSuccess }: Props) => {
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

    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề bài viết");
      return;
    }

    if (!content.trim()) {
      alert("Vui lòng nhập nội dung bài viết");
      return;
    }

    const payload: PostCreate = {
      title,
      content,
      images: images,
      visibility: "PUBLIC",
    };

    try {
      const recipe = await submitPostMutation(payload);
      console.log("Recipe created:", recipe);
      toast.success("Đăng bài viết thành công!");

      // Gọi hàm onSuccess để parent đóng modal
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(
        "Lỗi khi tạo bài viết: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tiêu đề bài viết"
      />
      <Textarea
        value={content}
        className="min-h-[30vh] max-h-[30vh]"
        onChange={(e) => setContent(e.target.value)}
        placeholder="Bạn đang nghĩ gì?"
      />
      <ImageUploadPreview
        value={images}
        addImage={addPostImage}
        removeImage={removePostImage}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Đang đăng..." : "Đăng bài"}
      </Button>
    </form>
  );
};

export default PostForm;

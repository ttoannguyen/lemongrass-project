"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ImageUploadPreview from "@/components/imageTempale/ImageUploadPreview";
import useCreatePost from "@/hooks/useCreatePost";

// type PostFormData = {
//   title: string;
//   content: string;
//   visibility: "PUBLIC" | "PRIVATE" | "GROUP";
//   groupId?: string;
//   recipeId?: string;
// };

type Props = {
  onSuccess: () => void;
};

const PostForm = ({ onSuccess }: Props) => {
  const { title, setTitle, content, setContent, images, setImages, submit } =
    useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔍 Submit Post:");
    console.log("Tiêu đề:", title);
    console.log("Nội dung:", content);
    console.log("Ảnh:", images);
    try {
      await submit();
      onSuccess();
    } catch (err) {
      console.error("Lỗi khi đăng bài:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tiêu đề bài viết"
      />
      <Textarea
        value={content}
        className="max-h-[40vh]"
        onChange={(e) => setContent(e.target.value)}
        placeholder="Bạn đang nghĩ gì?"
      />
      <ImageUploadPreview images={images} setImages={setImages} />
      <Button type="submit">Đăng bài</Button>
    </form>
  );
};

export default PostForm;

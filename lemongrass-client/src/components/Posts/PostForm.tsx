// import useCreatePost from "@/hooks/useCreatePost";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
// import ImageUploadPreview from "@/components/imageTempale/ImageUploadPreview";
// import { useSubmitPost } from "@/hooks/queries/useSubmitPost";
// import type { PostCreate } from "@/types/post/PostCreate";
// import { toast } from "sonner";

// type Props = {
//   onSuccess?: () => void;
// };

// const PostForm = ({ onSuccess }: Props) => {
//   const {
//     title,
//     setTitle,
//     content,
//     setContent,
//     images,
//     addPostImage,
//     removePostImage,
//   } = useCreatePost();

//   const { mutateAsync: submitPostMutation, isPending } = useSubmitPost();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!title.trim()) {
//       alert("Vui lòng nhập tiêu đề bài viết");
//       return;
//     }

//     if (!content.trim()) {
//       alert("Vui lòng nhập nội dung bài viết");
//       return;
//     }

//     const payload: PostCreate = {
//       title,
//       content,
//       images: images,
//       visibility: "PUBLIC",
//     };

//     try {
//       const recipe = await submitPostMutation(payload);
//       console.log("Recipe created:", recipe);
//       toast.success("Đăng bài viết thành công!");

//       // Gọi hàm onSuccess để parent đóng modal
//       if (onSuccess) onSuccess();
//     } catch (error) {
//       toast.error(
//         "Lỗi khi tạo bài viết: " +
//           (error instanceof Error ? error.message : "Unknown error")
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <Input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Tiêu đề bài viết"
//       />
//       <Textarea
//         value={content}
//         className="min-h-[30vh] max-h-[30vh]"
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Bạn đang nghĩ gì?"
//       />
//       <ImageUploadPreview
//         value={images}
//         addImage={addPostImage}
//         removeImage={removePostImage}
//       />

//       <Button type="submit" className="w-full" disabled={isPending}>
//         {isPending ? "Đang đăng..." : "Đăng bài"}
//       </Button>
//     </form>
//   );
// };

// export default PostForm;

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface PostFormProps {
  onSuccess: () => void;
}

interface ImageFile {
  file: File;
  preview: string;
}

const PostForm = ({ onSuccess }: PostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<ImageFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const MAX_IMAGES = 5;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > MAX_IMAGES) {
      setError(`Bạn chỉ có thể tải lên tối đa ${MAX_IMAGES} ảnh.`);
      return;
    }

    const validImages: ImageFile[] = [];

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Chỉ hỗ trợ định dạng JPEG, PNG hoặc GIF.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError("Kích thước ảnh tối đa là 5MB.");
        return;
      }
      validImages.push({
        file,
        preview: URL.createObjectURL(file),
      });
    }

    setImages([...images, ...validImages]);
    setError(null);
    e.target.value = ""; // Reset input
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    URL.revokeObjectURL(images[index].preview); // Clean up memory
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission (replace with actual API call)
    console.log({ title, content, images: images.map((img) => img.file) });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-gray-700">
          Tiêu đề
        </Label>
        <Input
          id="title"
          placeholder="Nhập tiêu đề bài viết..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border-gray-300 focus:ring-primary focus:border-primary transition-colors duration-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content" className="text-sm font-medium text-gray-700">
          Nội dung
        </Label>
        <textarea
          id="content"
          placeholder="Nhập nội dung bài viết..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-32 rounded-md border-gray-300 focus:ring-primary focus:border-primary transition-colors duration-200 p-3 text-sm"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="images" className="text-sm font-medium text-gray-700">
          Tải lên ảnh (tối đa {MAX_IMAGES})
        </Label>
        <Input
          id="images"
          type="file"
          accept="image/jpeg,image/png,image/gif"
          multiple
          onChange={handleImageChange}
          className="rounded-md border-gray-300 focus:ring-primary focus:border-primary transition-colors duration-200"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.preview}
                  alt={`Preview ${index}`}
                  className="w-full h-24 object-cover rounded-md shadow-sm"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors duration-200"
          disabled={images.length === 0 && !title && !content}
        >
          Đăng bài
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
          className="flex-1 rounded-md border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          Hủy
        </Button>
      </div>
    </form>
  );
};

export default PostForm;

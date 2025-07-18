import type { ImageUpload } from "@/types/image/ImageUpload";
import { useState } from "react";

const useCreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<ImageUpload[]>([]);

  const addPostImage = (file: File) => {
    setImages((prev) => [...prev, { file, displayOrder: prev.length }]);
  };

  const removePostImage = (index: number) => {
    setImages((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((img, i) => ({
          ...img,
          displayOrder: i,
        }))
    );
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    images,
    addPostImage,
    removePostImage,
  };
};

export default useCreatePost;

import { useState } from "react";
import api from "@/lib/axios";

const useCreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const submit = async () => {
    console.log("🔍 Dữ liệu submit", { title, content, images });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    images.forEach((file, i) => {
      if (file instanceof File) {
        formData.append(`images[${i}].file`, file);
        formData.append(`images[${i}].visibility`, "PUBLIC");

        formData.append(`images[${i}].displayOrder`, i.toString());
      }
    });

    const response = await api.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Kết quả tạo post:", response.data);
  };

  return { title, setTitle, content, setContent, images, setImages, submit };
};

export default useCreatePost;

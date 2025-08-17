import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Content {
  id: string;
  text: string;
  contentTitle: string;
  displayOrder: number;
  file?: File;
}

const useCreatePost = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState<Content[]>([
    {id: uuidv4(), text: "", contentTitle: "", displayOrder: 0 },
  ]);

  const [mainContents, setMainContents] = useState("");

  // Thêm một nội dung mới
  const addContent = () => {
    setContents((prev) => [
      ...prev,
      {id: uuidv4(), text: "", contentTitle: "", displayOrder: prev.length },
    ]);
  };

  // Xóa một nội dung
  const removeContent = (index: number) => {
    setContents((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((content, i) => ({ ...content, displayOrder: i }))
    );
  };

  // Cập nhật một nội dung
  const updateContent = (index: number, data: Partial<Content>) => {
    setContents((prev) =>
      prev.map((content, i) =>
        i === index ? { ...content, ...data } : content
      )
    );
  };

  // Sắp xếp lại nội dung sau khi kéo thả
  const reorderContents = (startIndex: number, endIndex: number) => {
    setContents((prev) => {
      const result = [...prev];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result.map((content, index) => ({
        ...content,
        displayOrder: index,
      }));
    });
  };

  // Thêm hình ảnh cho bài viết
  // const addPostImage = (file: File) => {
  //   setImages((prev) => [...prev, { file, displayOrder: prev.length }]);
  // };

  // // Xóa hình ảnh của bài viết
  // const removePostImage = (index: number) => {
  //   setImages((prev) =>
  //     prev
  //       .filter((_, i) => i !== index)
  //       .map((img, i) => ({
  //         ...img,
  //         displayOrder: i,
  //       }))
  //   );
  // };

  return {
    title,
    setTitle,
    contents,
    addContent,
    mainContents,
    setMainContents,
    removeContent,
    updateContent,
    reorderContents,
    // images,
    // addPostImage,
    // removePostImage,
  };
};

export default useCreatePost;
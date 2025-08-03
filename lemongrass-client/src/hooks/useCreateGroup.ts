import { useState } from "react";
import type { ImageUpload } from "@/types/image/ImageUpload";
import { Visibility } from "@/types/enums/visibility.enum";

const useCreateGroup = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [requirePostApproval, setRequirePostApproval] =
    useState<boolean>(false);

  const [rules, setRules] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.PUBLIC);
  const [images, setImages] = useState<ImageUpload[]>([]);

  const addGroupImage = (file: File) => {
    setImages((prev) => [...prev, { file, displayOrder: prev.length }]);
  };

  const removeGroupImage = (index: number) => {
    setImages((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((img, i) => ({
          ...img,
          displayOrder: i,
        }))
    );
  };

  const reset = () => {
    setName("");
    setDescription("");
    setCategory("");
    setVisibility(Visibility.PUBLIC);
    setImages([]);
  };

  return {
    name,
    setName,
    description,
    setDescription,
    category,
    setCategory,
    visibility,
    setVisibility,
    images,
    addGroupImage,
    removeGroupImage,
    requirePostApproval,
    setRequirePostApproval,
    rules,
    setRules,
    reset,
  };
};

export default useCreateGroup;

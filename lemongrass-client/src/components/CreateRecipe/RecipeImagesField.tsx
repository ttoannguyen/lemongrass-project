import { useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { ImageUpload } from "@/types/image/ImageUpload";

const RecipeImagesField = () => {
  const { setValue, watch } = useFormContext();
  const images = watch("images");

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentImages = watch("images") || [];

    const formatted = files.map((file, index) => ({
      file,
      displayOrder: currentImages.length + index,
    }));

    setValue("images", [...currentImages, ...formatted]);
  };

  const removeImage = (indexToRemove: number) => {
    const currentImages = watch("images") || [];
    const updated = currentImages.filter(
      (_: ImageUpload, i: number) => i !== indexToRemove
    );

    setValue("images", updated);
  };

  return (
    <div>
      <Label>Recipe Image</Label>
      <Input type="file" multiple accept="image/*" onChange={handleFiles} />
      {images?.map((img: ImageUpload, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <span>{img.file?.name}</span>
          <button type="button" onClick={() => removeImage(index)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeImagesField;

import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ImageUpload } from "@/types/image/ImageUpload";
import type { RecipeInstructionRequest } from "@/types/Recipe/RecipeInstructionRequest";

const InstructionsField = () => {
  const { register, control, setValue, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "instructions",
    control,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const instructions: RecipeInstructionRequest[] = watch("instructions") || [];

  const [previews, setPreviews] = useState<string[][]>([]);

  useEffect(() => {
    const newPreviews: string[][] = instructions.map(
      (step: RecipeInstructionRequest) =>
        step.images
          ? step.images
              .slice()
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((img: ImageUpload) =>
                img?.file ? URL.createObjectURL(img.file) : ""
              )
          : []
    );

    setPreviews(newPreviews);

    return () => {
      newPreviews.flat().forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [instructions]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = e.target.files;
    if (files) {
      const existingImages = instructions[index]?.images || [];
      const newImages: ImageUpload[] = Array.from(files).map((file, i) => ({
        file,
        displayOrder: existingImages.length + i + 1,
      }));
      const updatedImages = [...existingImages, ...newImages];
      setValue(`instructions.${index}.images`, updatedImages);
    }
  };

  const removeImage = (stepIndex: number, imgIndex: number) => {
    const current = instructions[stepIndex]?.images || [];
    const updated = [
      ...current.slice(0, imgIndex),
      ...current.slice(imgIndex + 1),
    ].map((img, i) => ({
      ...img,
      displayOrder: i + 1,
    })); // cập nhật lại displayOrder
    setValue(`instructions.${stepIndex}.images`, updated);
  };

  const handleAddStep = () => {
    append({
      stepNumber: fields.length + 1,
      description: "",
      images: [],
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Hướng dẫn</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-md space-y-3">
          <div className="flex gap-2 items-start">
            <Textarea
              {...register(`instructions.${index}.description`)}
              placeholder={`Bước ${index + 1}`}
              required
              className="w-full"
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
            >
              Xóa
            </Button>
          </div>

          <input
            type="hidden"
            {...register(`instructions.${index}.stepNumber`)}
            value={index + 1}
          />

          <div>
            <Label>Hình ảnh cho bước {index + 1}</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
            />
            <div className="flex gap-2 flex-wrap mt-2">
              {previews[index]?.map((url, imgIdx) => (
                <div key={imgIdx} className="relative">
                  <img
                    src={url}
                    className="w-24 h-24 object-cover rounded"
                    alt={`step-${index + 1}-img-${imgIdx}`}
                  />
                  <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded-t">
                    #
                    {instructions[index]?.images?.[imgIdx]?.displayOrder ?? "-"}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index, imgIdx)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <Button type="button" onClick={handleAddStep}>
        + Thêm bước
      </Button>
    </div>
  );
};

export default InstructionsField;

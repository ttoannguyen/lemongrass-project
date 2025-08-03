import { cn } from "@/lib/utils";
import type { ImageUpload } from "@/types/image/ImageUpload";
import { Camera, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
type UploadIngredientImageProps = {
  onUpload: (image: ImageUpload[]) => void;
  onRemove?: () => void;
  className?: string;
  imageUrl?: string;
  displayOrder?: number;
};
const InstructionUploadImage = ({
  onUpload,
  onRemove,
  className,
  imageUrl: initialImageUrl,
}: // displayOrder = 0,
UploadIngredientImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImageUrl || null
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validImages: ImageUpload[] = [];
    const validTypes = ["image/png", "image/jpeg", "image/webp"];
    const maxSize = 10 * 1024 * 1024;
    const maxFiles = 3;

    if (files.length > maxFiles) {
      toast.error(`Chỉ được chọn tối đa ${maxFiles} ảnh.`);
      return;
    }

    Array.from(files).forEach((file, index) => {
      const isValidType = validTypes.includes(file.type);
      const isValidSize = file.size <= maxSize;

      if (!isValidType) {
        toast.error(`File ${file.name}: Chỉ chấp nhận PNG hoặc JPEG.`);
        return;
      }
      if (!isValidSize) {
        toast.error(`File ${file.name}: Kích thước vượt quá 10MB.`);
        return;
      }

      validImages.push({ file, displayOrder: index });
    });

    if (validImages.length > 0) {
      onUpload(validImages);
      if (!previewUrl && validImages[0]?.file) {
        setPreviewUrl(URL.createObjectURL(validImages[0].file));
      }
    }
    e.target.value = "";
  };

  const handleClick = () => {
    if (!previewUrl) {
      inputRef.current?.click();
    }
  };
  return (
    <div onClick={handleClick} className={cn("", className)}>
      <div className="flex flex-col items-center justify-center gap-2">
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Xem trước"
              className="w-24 h-16 object-cover rounded-md"
            />
            {onRemove && (
              <Button
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 p-1 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                  setPreviewUrl(null);
                }}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            )}
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-sm border-stroke/10 w-24 h-16 flex justify-center">
            <Camera className="w-6 h-6 my-auto text-paragraph" />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
};

export default InstructionUploadImage;

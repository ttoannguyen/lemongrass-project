import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import React, { useRef, useState } from "react";
type UploadIngredientImageProps = {
  onUpload: (file: File) => void;
  className?: string;
  imageUrl?: string;
};
const IngredientUploadImage = ({
  onUpload,
  className,
  imageUrl: initialImageUrl,
}: UploadIngredientImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImageUrl || null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isValidType = ["image/png", "image/jpeg"].includes(file.type);
    const isValidSize = file.size < 10 * 1024 * 1024;
    if (!isValidType) {
      alert("Chỉ hỗ trợ PNG hoặc JPEG");
      return;
    }

    if (!isValidSize) {
      alert("Dung lượng tối đa là 10MB");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onUpload(file);
  };
  const handleClick = () => {
    inputRef.current?.click();
  };
  return (
    <div onClick={handleClick} className={cn("", className)}>
      <div className="flex flex-col items-center justify-center gap-2">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-20 object-cover rounded-sm"
          />
        ) : (
          <div className="border-2 border-dashed rounded-sm border-stroke/10 w-24 h-20 flex justify-center">
            <Camera className="w-6 h-6 my-auto text-paragraph" />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default IngredientUploadImage;

import { useRef } from "react";
import { UploadIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImageUpload } from "@/types/image/ImageUpload";
import { toast } from "sonner";

type UploadImageProps = {
  onUpload: (files: ImageUpload[]) => void;
  className?: string;
};

const UploadImage = ({ onUpload, className }: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validFiles: ImageUpload[] = [];

    Array.from(files).forEach((file, index) => {
      const isValidType = ["image/png", "image/jpeg", "image/webp"].includes(
        file.type
      );
      const isValidSize = file.size <= 10 * 1024 * 1024; // Giới hạn 10MB

      if (!isValidType) {
        toast.error(
          `File "${file.name}" không hợp lệ. Chỉ chấp nhận PNG hoặc JPEG.`
        );
        return;
      }

      if (!isValidSize) {
        toast.error(`File "${file.name}" vượt quá giới hạn 10MB.`);
        return;
      }

      validFiles.push({
        file,
        displayOrder: index,
      });
    });

    if (validFiles.length > 0) {
      onUpload(validFiles);
    }

    e.target.value = "";
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center  hover:border-primary/50 transition",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <UploadIcon className="w-6 h-6 text-paragraph" />
        <p className="text-sm font-semibold text-highlight underline">
          Tải ảnh công thức
        </p>
        <p className="text-xs text-gray-500">
          PNG hoặc JPEG (tối đa 10MB mỗi ảnh)
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadImage;

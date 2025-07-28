import { useRef } from "react";
import { UploadIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type UploadImageProps = {
  onUpload: (file: File) => void;
  className?: string;
};

const UploadImage = ({ onUpload, className }: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType = ["image/png", "image/jpeg"].includes(file.type);
    const isValidSize = file.size <= 10 * 1024 * 1024;

    if (!isValidType) {
      alert("Chỉ hỗ trợ PNG hoặc JPEG");
      return;
    }

    if (!isValidSize) {
      alert("Dung lượng tối đa là 10MB");
      return;
    }

    onUpload(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "border-2 border-dashed border-gray-300 rounded-md cursor-pointer p-6 text-center hover:border-primary/50 transition",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <UploadIcon className="w-6 h-6 text-gray-500" />
        <p className="text-sm font-semibold text-orange-500 underline">
          Upload Photo
        </p>
        <p className="text-xs text-gray-500">PNG or JPEG (max. 10MB)</p>
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

export default UploadImage;

"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

type Props = {
  images: File[];
  setImages: (images: File[]) => void;
};

const ImageUploadPreview = ({ images, setImages }: Props) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const addFiles = (newFiles: File[]) => {
    const existingNames = new Set(images.map((f) => f.name));
    const filteredFiles = newFiles.filter((f) => !existingNames.has(f.name));
    setImages([...images, ...filteredFiles]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  return (
    <div className="space-y-2 ">
      <Label htmlFor="image">Thêm ảnh</Label>

      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border border-dashed border-gray-400 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50"
        onClick={() => document.getElementById("image")?.click()}
      >
        <p className="text-sm text-gray-500 mb-2">
          Kéo và thả ảnh vào đây hoặc nhấn để chọn ảnh
        </p>

        <Input
          id="image"
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`preview-${index}`}
                className="w-full h-32 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 group-hover:scale-105 transition"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploadPreview;

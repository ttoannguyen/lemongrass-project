// import type { ImageUpload } from "@/types/image/ImageUpload";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { X } from "lucide-react";
// import { useRef } from "react";

// interface Props {
//   value: ImageUpload[]; // Controlled state
//   onChange: (images: ImageUpload[]) => void;
// }

// const ImageUploadPreview = ({ value, onChange }: Props) => {
//   const dropRef = useRef<HTMLDivElement>(null);

//   const previewUrls = value.map((img) => URL.createObjectURL(img.file));

//   const addFiles = (newFiles: File[]) => {
//     const existingNames = new Set(value.map((f) => f.file.name));
//     const uniqueFiles = newFiles.filter((f) => !existingNames.has(f.name));

//     const newImages: ImageUpload[] = uniqueFiles.map((file, index) => ({
//       file,
//       displayOrder: value.length + index,
//     }));

//     onChange([...value, ...newImages]);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       addFiles(Array.from(e.target.files));
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.dataTransfer.files) {
//       addFiles(Array.from(e.dataTransfer.files));
//     }
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const removeImage = (index: number) => {
//     const updated = value
//       .filter((_, i) => i !== index)
//       .map((img, idx) => ({
//         ...img,
//         displayOrder: idx,
//       }));
//     onChange(updated);
//   };

//   return (
//     <div className="space-y-2">
//       <Label htmlFor="image">Thêm ảnh</Label>

//       <div
//         ref={dropRef}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onClick={() => document.getElementById("image")?.click()}
//         className="border border-dashed border-gray-400 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50"
//       >
//         <p className="text-sm text-gray-500 mb-2">
//           Kéo và thả ảnh vào đây hoặc nhấn để chọn ảnh
//         </p>
//         <Input
//           id="image"
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleChange}
//           className="hidden"
//         />
//       </div>

//       {value.length > 0 && (
//         <div className="grid grid-cols-3 gap-2 mt-2">
//           {previewUrls.map((url, index) => (
//             <div key={index} className="relative group">
//               <img
//                 src={url}
//                 alt={`preview-${index}`}
//                 className="w-full h-32 object-cover rounded-md border"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeImage(index)}
//                 className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 group-hover:scale-105 transition"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUploadPreview;

import type { ImageUpload } from "@/types/image/ImageUpload";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { X } from "lucide-react";
import { useRef } from "react";

interface Props {
  value: ImageUpload[];
  onChange?: (images: ImageUpload[]) => void;
  addImage?: (file: File) => void;
  removeImage?: (index: number) => void;
}

const ImageUploadPreview = ({
  value,
  onChange,
  addImage,
  removeImage,
}: Props) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const previewUrls = value.map((img) => URL.createObjectURL(img.file));

  const addFiles = (newFiles: File[]) => {
    const existingNames = new Set(value.map((f) => f.file.name));
    const uniqueFiles = newFiles.filter((f) => !existingNames.has(f.name));

    if (addImage) {
      uniqueFiles.forEach((file) => addImage(file));
    } else if (onChange) {
      const newImages: ImageUpload[] = uniqueFiles.map((file, index) => ({
        file,
        displayOrder: value.length + index,
      }));
      onChange([...value, ...newImages]);
    }
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

  const handleRemove = (index: number) => {
    if (removeImage) {
      removeImage(index);
    } else if (onChange) {
      const updated = value
        .filter((_, i) => i !== index)
        .map((img, idx) => ({
          ...img,
          displayOrder: idx,
        }));
      onChange(updated);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image" className="text-headline">
        Thêm ảnh
      </Label>

      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById("image")?.click()}
        className="border border-dashed border-stroke rounded-md p-4 text-center cursor-pointer hover:bg-gray-50"
      >
        <p className="text-sm text-paragraph mb-2">
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

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`preview-${index}`}
                className="w-full h-32 object-cover rounded-md border border-stroke"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute cursor-pointer top-1 right-1 bg-headline bg-opacity-50 text-main rounded-full p-1 group-hover:scale-105 transition"
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

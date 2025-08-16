import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../ui/dialog"; // Assuming you have a Dialog component from your UI library
import { Button } from "../../ui/button";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useState } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; displayOrder: number }[];
  recipeTitle: string;
}

const ImageModal = ({ isOpen, onClose, images, recipeTitle }: ImageModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleDownloadAll = async () => {
    setLoading(true);
    const zip = new JSZip();

    // Fetch and add each image to the ZIP file
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const response = await fetch(image.url);
      const blob = await response.blob();
      zip.file(`recipe_${recipeTitle}_image_${i + 1}.webp`, blob);
    }

    // Generate ZIP file and trigger download
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${recipeTitle}_images.zip`);
      setLoading(false);
    });
  };

  const handleDownloadSingle = async (url: string, index: number) => {
    const response = await fetch(url);
    const blob = await response.blob();
    saveAs(blob, `recipe_${recipeTitle}_image_${index + 1}.webp`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Recipe Images</DialogTitle>
          <DialogDescription>
            View and download images for the recipe: {recipeTitle}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 p-4">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <img
                src={image.url}
                alt={`Recipe image ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg border"
              />
              <Button
                onClick={() => handleDownloadSingle(image.url, index)}
                className="text-sm"
              >
                Download Image {index + 1}
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 p-4">
          <Button
            onClick={handleDownloadAll}
            disabled={loading}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            {loading ? "Downloading..." : "Download All as ZIP"}
          </Button>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
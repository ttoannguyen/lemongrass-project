import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import type { ImageResponse } from "@/types/image/ImageResponse";

interface ImageWithDimensions {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface Props {
  images: ImageResponse[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageData: ImageWithDimensions[];
}

export const RecipeImagePreview = ({
  images,
  initialIndex,
  open,
  onOpenChange,
  imageData,
}: Props) => {
  const [previewImageData, setPreviewImageData] = useState<
    ImageWithDimensions[]
  >(
    images.map((img) => ({
      url: img.url,
      alt: img.alt,
      width: imageData.find((d) => d.url === img.url)?.width || 0,
      height: imageData.find((d) => d.url === img.url)?.height || 0,
    }))
  );

  useEffect(() => {
    setPreviewImageData(
      images.map((img) => ({
        url: img.url,
        alt: img.alt,
        width: imageData.find((d) => d.url === img.url)?.width || 0,
        height: imageData.find((d) => d.url === img.url)?.height || 0,
      }))
    );
  }, [images, imageData]);

  const handleImageLoad = (index: number, width: number, height: number) => {
    setPreviewImageData((prev) =>
      prev.map((img, i) =>
        i === index && img.width === 0 && img.height === 0
          ? { ...img, width, height }
          : img
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-transparent shadow-none p-0 max-w-[90vw] max-h-[90vh] border-0">
        <DialogTitle className="sr-only">Xem ảnh</DialogTitle>
        <Carousel opts={{ startIndex: initialIndex }} className="relative">
          <CarouselContent>
            {images.map((img, i) => {
              const { width = 800, height = 800 } = previewImageData[i] || {};
              const aspectRatio = height > 0 ? width / height : 1;
              const maxWidth = window.innerWidth * 0.9;
              const maxHeight = window.innerHeight * 0.9;
              const scaledWidth = Math.min(maxWidth, width);
              const scaledHeight = scaledWidth / aspectRatio;
              const finalHeight = Math.min(scaledHeight, maxHeight);
              const finalWidth = finalHeight * aspectRatio;

              return (
                <CarouselItem key={img.url ?? `preview-${i}`}>
                  <img
                    src={img.url ?? "https://via.placeholder.com/800"}
                    alt={img.alt ?? `Ảnh ${i + 1}`}
                    className="w-auto h-auto object-contain mx-auto"
                    style={{
                      width: `${finalWidth}px`,
                      height: `${finalHeight}px`,
                    }}
                    onLoad={(e) => {
                      const imgElement = e.target as HTMLImageElement;
                      handleImageLoad(
                        i,
                        imgElement.naturalWidth,
                        imgElement.naturalHeight
                      );
                    }}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-10 h-10" />
              <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-10 h-10" />
            </>
          )}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

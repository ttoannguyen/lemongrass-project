import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { ImageResponse } from "@/types/image/ImageResponse";
import ImageBox from "./ImageBox";

type Props = {
  image: ImageResponse[];
};

const FeedImageTemplate = ({ image }: Props) => {
  const showCarousel = image.length >= 4;

  const getItemWidthClass = () => {
    if (image.length === 1) return "w-full";
    if (image.length === 2) return "w-1/2";
    return "w-1/3";
  };

  if (!showCarousel) {
    return (
      <div className="flex gap-0.5 w-full h-[200px] overflow-hidden">
        {image.map((img, i) => (
          <div key={i} className={`${getItemWidthClass()} h-[200px]`}>
            <AspectRatio ratio={1 / 1} className="w-full h-[200px]">
              <ImageBox
                src={img.url ?? ""}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full h-[200px] overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        className="w-full h-full"
      >
        <CarouselContent className="h-full gap-0.5">
          {image.map((img, i) => (
            <CarouselItem
              key={i}
              className="p-0! min-w-[33.3333%] max-w-[33.3333%] h-full"
            >
              <AspectRatio ratio={1 / 1} className="w-full h-full">
                <ImageBox
                  src={img.url ?? ""}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full" />
      </Carousel>
    </div>
  );
};

export default FeedImageTemplate;

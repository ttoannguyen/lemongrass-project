import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { ImageResponse } from "@/types/image/ImageResponse";
import ImageBox from "./ImageBox";

type Props = {
  image: ImageResponse[];
};

const FeedImageTemplate = ({ image }: Props) => {
  const images = image.slice(0, 5);
  const extraCount = image.length - 5;

  const renderSingle = () => (
    <AspectRatio ratio={1 / 1} className="w-full h-full overflow-hidden">
      {/* <img src={images[0].url} alt="" className="object-cover w-full h-full" /> */}
      <ImageBox src={image[0].url ?? ""} />
    </AspectRatio>
  );

  const renderDouble = () => (
    <div className="grid grid-cols-2 gap-[2px] w-full h-full">
      {images.map((img, i) => (
        <AspectRatio key={i} ratio={1 / 2} className="overflow-hidden">
          {/* <img src={img.url} alt="" className="object-cover w-full h-full" /> */}
          <ImageBox src={img.url ?? ""} />
        </AspectRatio>
      ))}
    </div>
  );

  const renderTriple = () => (
    <div className="flex flex-col gap-[2px] w-full h-full">
      <AspectRatio ratio={2 / 1} className="overflow-hidden">
        <ImageBox src={image[0].url ?? ""} />
      </AspectRatio>
      <div className="flex gap-[2px] flex-1">
        {images.slice(1).map((img, i) => (
          <AspectRatio key={i} ratio={1 / 1} className="w-full overflow-hidden">
            <ImageBox src={img.url ?? ""} />
          </AspectRatio>
        ))}
      </div>
    </div>
  );

  const renderQuad = () => (
    <div className="grid grid-cols-2 grid-rows-2 gap-[2px] w-full h-full">
      {images.map((img, i) => (
        <AspectRatio key={i} ratio={1 / 1} className="overflow-hidden">
          {/* <img src={img.url} alt="" className="object-cover w-full h-full" /> */}
          <ImageBox src={img.url ?? ""} />
        </AspectRatio>
      ))}
    </div>
  );

  const renderFive = () => (
    <div className="flex gap-[2px] w-full h-full">
      {/* Left 2 images */}
      <div className="flex flex-col gap-[2px] flex-1">
        {images.slice(0, 2).map((img, i) => (
          <AspectRatio key={i} ratio={1 / 1} className="flex-1 overflow-hidden">
            {/* <img src={img.url} alt="" className="object-cover w-full h-full" /> */}
            <ImageBox src={img.url ?? ""} />
          </AspectRatio>
        ))}
      </div>

      {/* Right 3 images */}
      <div className="flex flex-col gap-[2px] flex-1">
        {images.slice(2, 5).map((img, i) => (
          <div key={i} className="relative flex-1 overflow-hidden">
            <AspectRatio ratio={1 / 1} className="h-full">
              {/* <img
                src={img.url}
                alt=""
                className="object-cover w-full h-full transition-transform hover: "
              /> */}
              <ImageBox src={img.url ?? ""} />
            </AspectRatio>
            {i === 2 && extraCount > 0 && (
              <div className="absolute inset-0 bg-black/40 text-white text-xl flex items-center justify-center">
                +{extraCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderByCount = (count: number) => {
    switch (count) {
      case 1:
        return renderSingle();
      case 2:
        return renderDouble();
      case 3:
        return renderTriple();
      case 4:
        return renderQuad();
      default:
        return renderFive();
    }
  };

  return (
    <div className="w-full max-w-2xl aspect-square">
      {renderByCount(images.length)}
    </div>
  );
};

export default FeedImageTemplate;

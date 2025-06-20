import { AspectRatio } from "../ui/aspect-ratio";
import { ImageWithSkeleton } from "../ui/image-with-skeleton"; // import custom image component

type Props = {
  src: string;
  alt?: string;
  ratio?: number;
};

const CoverImage = ({ src, alt = "Cover image", ratio = 16 / 9 }: Props) => {
  return (
    <AspectRatio
      ratio={ratio}
      className="rounded-0 overflow-hidden bg-gray-300"
    >
      <ImageWithSkeleton
        src={src}
        alt={alt}
        className="h-full w-full object-cover bg-background"
        classNameWrapper="w-full h-full"
      />
    </AspectRatio>
  );
};

export default CoverImage;

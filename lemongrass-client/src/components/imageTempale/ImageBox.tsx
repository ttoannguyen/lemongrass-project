type ImageBoxProps = {
  src: string;
  alt?: string;
  overlayText?: string;
};

const ImageBox = ({ src = "", alt = "", overlayText }: ImageBoxProps) => (
  <div className="relative group w-full h-full overflow-hidden cursor-pointer">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition duration-300"
    />
    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300" />
    {overlayText && (
      <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
        {overlayText}
      </div>
    )}
  </div>
);

export default ImageBox;

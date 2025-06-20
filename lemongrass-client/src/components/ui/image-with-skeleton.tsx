// components/ui/image-with-skeleton.tsx
import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type ImageWithSkeletonProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  classNameWrapper?: string;
};

export const ImageWithSkeleton = ({
  src,
  alt,
  className,
  classNameWrapper,
  ...props
}: ImageWithSkeletonProps) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className={classNameWrapper}>
      {!loaded && <Skeleton className={`w-full h-full ${className}`} />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`${className} ${loaded ? "block" : "hidden"}`}
        {...props}
      />
    </div>
  );
};

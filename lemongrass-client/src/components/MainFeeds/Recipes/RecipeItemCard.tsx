// import { useState, useEffect } from "react";
// import type { RecipeFeedItem } from "@/types/feed/RecipeFeedItem";
// // import { ImageGrid } from "./ImageGrid";
// import { RecipeImagePreview } from "@/components/MainFeeds/Recipes/RecipeImageReview";

// type Props = {
//   recipe: RecipeFeedItem;
// };

// type ImageWithDimensions = {
//   url?: string;
//   alt?: string;
//   width?: number;
//   height?: number;
// };

// const RecipeItemCard = ({ recipe }: Props) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [initialIndex, setInitialIndex] = useState(0);
//   const [imageData, setImageData] = useState<ImageWithDimensions[]>([]);

//   const images = recipe.imageResponses ?? [];
//   const maxDisplayImages = 5;
//   const displayImages = images.slice(0, maxDisplayImages);
//   const moreCount =
//     images.length > maxDisplayImages ? images.length - maxDisplayImages : 0;

//   useEffect(() => {
//     setImageData(
//       displayImages.map((img) => ({
//         url: img.url,
//         alt: img.alt,
//         width: 0,
//         height: 0,
//       }))
//     );
//   }, [displayImages, recipe.imageResponses]);

//   const handleImageLoad = (index: number, width: number, height: number) => {
//     setImageData((prev) =>
//       prev.map((img, i) => (i === index ? { ...img, width, height } : img))
//     );
//   };

//   const handleImageClick = (index: number) => {
//     setInitialIndex(index);
//     setPreviewOpen(true);
//   };

//   const getGridLayout = (total: number) => {
//     switch (total) {
//       case 1:
//         return "grid-cols-1";
//       case 2:
//         return "grid-cols-2";
//       case 3:
//         return "grid grid-cols-2 gap-1";
//       case 4:
//         return "grid grid-cols-2 gap-1";
//       case 5:
//         return "grid grid-cols-3 gap-1";
//       default:
//         return "grid-cols-1";
//     }
//   };

//   const getImageStyles = (
//     index: number,
//     total: number,
//     img: ImageWithDimensions
//   ) => {
//     const { width = 300, height = 300 } = img;
//     const aspectRatio = height > 0 ? width / height : 1;
//     const baseHeight = 300;
//     const maxContainerHeight = 500;

//     let dynamicHeight = baseHeight;
//     if (total === 1) {
//       dynamicHeight = Math.min(baseHeight * aspectRatio, maxContainerHeight);
//     } else if (total === 2) {
//       dynamicHeight = Math.min(
//         baseHeight * 0.8 * aspectRatio,
//         maxContainerHeight * 0.6
//       );
//     } else if (total === 3) {
//       if (index === 0) {
//         dynamicHeight = Math.min(
//           baseHeight * 0.8 * aspectRatio,
//           maxContainerHeight * 0.6
//         );
//       } else {
//         dynamicHeight = Math.min(
//           baseHeight * 0.4 * aspectRatio,
//           maxContainerHeight * 0.3
//         );
//       }
//     } else if (total === 4) {
//       dynamicHeight = Math.min(
//         baseHeight * 0.5 * aspectRatio,
//         maxContainerHeight * 0.4
//       );
//     } else if (total === 5) {
//       if (index === 0) {
//         dynamicHeight = Math.min(
//           baseHeight * 0.8 * aspectRatio,
//           maxContainerHeight * 0.6
//         );
//       } else {
//         dynamicHeight = Math.min(
//           baseHeight * 0.4 * aspectRatio,
//           maxContainerHeight * 0.3
//         );
//       }
//     }

//     return {
//       height: `${dynamicHeight}px`,
//       gridColumn: total >= 3 && index === 0 ? "span 1" : undefined,
//       gridRow:
//         total === 3 && index === 0
//           ? "span 2"
//           : total === 5 && index === 0
//           ? "span 2"
//           : undefined,
//     };
//   };

//   return (
//     <div className="rounded-lg border shadow hover:shadow-md transition p-4 bg-white dark:bg-gray-800">
//       {displayImages.length > 0 && (
//         <div
//           className={`grid ${getGridLayout(
//             displayImages.length
//           )} max-h-[500px] overflow-hidden mb-4`}
//         >
//           {/* {displayImages.map((img, index) => (
//             <ImageGrid
//               key={img.url ?? `img-${index}`}
//               src={img.url}
//               alt={img.alt ?? `Ảnh ${index + 1}`}
//               className="transition-transform hover:scale-102 w-full"
//               style={getImageStyles(
//                 index,
//                 displayImages.length,
//                 imageData[index] || {}
//               )}
//               onClick={() => handleImageClick(index)}
//               isLast={index === displayImages.length - 1}
//               moreCount={moreCount}
//               onLoad={(width, height) => handleImageLoad(index, width, height)}
//             />
//           ))} */}
//         </div>
//       )}
//       <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
//         {recipe.title}
//       </h3>
//       <p className="text-sm text-gray-600 dark:text-gray-300">
//         {recipe.category} • {recipe.difficulty}
//       </p>

//       <RecipeImagePreview
//         images={images}
//         initialIndex={initialIndex}
//         open={previewOpen}
//         onOpenChange={setPreviewOpen}
//         imageData={imageData}
//       />
//     </div>
//   );
// };

// export default RecipeItemCard;

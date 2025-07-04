// // ImageGallery.tsx

// import "photoswipe/style.css";

// const ImageGallery = ({ images }: { images: string[] }) => {
//   return (
//     <Gallery>
//       <div className="grid grid-cols-2 gap-2">
//         {images.map((src, index) => (
//           <Item
//             key={index}
//             original={src}
//             thumbnail={src}
//             width="1200"
//             height="800"
//           >
//             {({ ref, open }) => (
//               <img
//                 ref={ref as React.MutableRefObject<HTMLImageElement>}
//                 onClick={open}
//                 src={src}
//                 alt=""
//                 className="cursor-pointer rounded object-cover"
//               />
//             )}
//           </Item>
//         ))}
//       </div>
//     </Gallery>
//   );
// };

// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../ui/dialog";
// import { Button } from "../../ui/button";
// import { useRef, useState } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import RecipeExportTemplate from "./RecipeExportTemplate";
// import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
// import { ScrollArea } from "@/components/ui/scroll-area";

// interface RecipeExportModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   recipe: RecipeResponse;
// }

// const RecipeExportModal = ({ isOpen, onClose, recipe }: RecipeExportModalProps) => {
//   const exportRef = useRef<HTMLDivElement | null>(null);
//   const [includeImages, setIncludeImages] = useState(true);
//   const [fontSize, setFontSize] = useState(16);
//   const [primaryColor, setPrimaryColor] = useState("#4A4A4A");
//   const [isGenerating, setIsGenerating] = useState(false);

//   // const handleGeneratePDF = async () => {
//   //   if (!exportRef.current) return;
//   //   setIsGenerating(true);

//   //   try {
//   //     const canvas = await html2canvas(exportRef.current, {
//   //       scale: 2,
//   //       useCORS: true,
//   //       allowTaint: false,
//   //       logging: false,
//   //     });

//   //     const imgData = canvas.toDataURL("image/png");
//   //     const pdf = new jsPDF({
//   //       orientation: "portrait",
//   //       unit: "mm",
//   //       format: "a4",
//   //     });

//   //     const imgWidthMm = 190;
//   //     const imgWidthPx = canvas.width;
//   //     const imgHeightPx = canvas.height;
//   //     const imgHeightMm = (imgHeightPx * imgWidthMm) / imgWidthPx;

//   //     let position = 10;
//   //     pdf.addImage(imgData, "PNG", 10, position, imgWidthMm, imgHeightMm);

//   //     let heightLeft = imgHeightMm - (297 - 20);
//   //     while (heightLeft > 0) {
//   //       pdf.addPage();
//   //       const nextPosition = -(imgHeightMm - heightLeft - 10);
//   //       pdf.addImage(imgData, "PNG", 10, nextPosition, imgWidthMm, imgHeightMm);
//   //       heightLeft -= (297 - 20);
//   //     }

//   //     pdf.save(`${recipe.title}.pdf`);
//   //   } catch (err) {
//   //     console.error("Export PDF error:", err);
//   //     alert("Không thể tạo PDF. Kiểm tra console để biết lỗi.");
//   //   } finally {
//   //     setIsGenerating(false);
//   //     onClose();
//   //   }
//   // };

//   const handleGeneratePDF = async () => {
//   if (!exportRef.current) return;
//   setIsGenerating(true);

//   // Clone node để xử lý riêng, tránh ảnh hưởng UI
//   const clone = exportRef.current.cloneNode(true) as HTMLElement;

//   // Tìm và thay thế màu oklch bằng hex hoặc rgb
//   clone.querySelectorAll("*").forEach((el) => {
//     const style = window.getComputedStyle(el);

//     const bg = style.backgroundColor;
//     if (bg && bg.includes("oklch")) {
//       (el as HTMLElement).style.backgroundColor = "#ffffff";
//     }

//     const color = style.color;
//     if (color && color.includes("oklch")) {
//       (el as HTMLElement).style.color = "#000000";
//     }

//     const border = style.borderColor;
//     if (border && border.includes("oklch")) {
//       (el as HTMLElement).style.borderColor = "#cccccc";
//     }
//   });

//   // Gắn clone vào DOM tạm
//   clone.style.position = "absolute";
//   clone.style.left = "-9999px";
//   document.body.appendChild(clone);

//   try {
//     const canvas = await html2canvas(clone, {
//       scale: 2,
//       useCORS: true,
//       allowTaint: false,
//       logging: false,
//       backgroundColor: "#fff",
//     });

//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });

//     const imgWidthMm = 190;
//     const imgWidthPx = canvas.width;
//     const imgHeightPx = canvas.height;
//     const imgHeightMm = (imgHeightPx * imgWidthMm) / imgWidthPx;

//     let position = 10;
//     pdf.addImage(imgData, "PNG", 10, position, imgWidthMm, imgHeightMm);

//     let heightLeft = imgHeightMm - (297 - 20);
//     while (heightLeft > 0) {
//       pdf.addPage();
//       const nextPosition = -(imgHeightMm - heightLeft - 10);
//       pdf.addImage(imgData, "PNG", 10, nextPosition, imgWidthMm, imgHeightMm);
//       heightLeft -= (297 - 20);
//     }

//     pdf.save(`${recipe.title}.pdf`);
//   } catch (err) {
//     console.error("Export PDF error:", err);
//     alert("Không thể tạo PDF. Kiểm tra console để biết lỗi.");
//   } finally {
//     setIsGenerating(false);
//     document.body.removeChild(clone);
//     onClose();
//   }
// };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="w-full sm:max-w-[95vw] max-h-[90vh] p-4">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-semibold">Tùy chỉnh & Xem trước</DialogTitle>
//           <DialogDescription>Chỉnh định dạng công thức và xem trước trước khi xuất PDF.</DialogDescription>
//         </DialogHeader>

//         <div className="flex flex-col lg:flex-row gap-6 mt-4 h-[calc(100%-90px)]">
//           {/* Sidebar tùy chỉnh */}
//           <div className="w-full lg:w-1/3 p-4 border rounded-lg bg-gray-50 shadow-sm overflow-auto">
//             <h3 className="text-lg font-semibold mb-4">Tùy chỉnh</h3>

//             <div className="space-y-4">
//               <label className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={includeImages}
//                   onChange={(e) => setIncludeImages(e.target.checked)}
//                   className="h-4 w-4"
//                 />
//                 <span className="text-sm font-medium">Bao gồm hình ảnh</span>
//               </label>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Kích thước chữ (px)</label>
//                 <input
//                   type="number"
//                   value={fontSize}
//                   onChange={(e) => setFontSize(Number(e.target.value))}
//                   min={12}
//                   max={24}
//                   className="w-full border rounded-md p-2 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Màu chính</label>
//                 <input
//                   type="color"
//                   value={primaryColor}
//                   onChange={(e) => setPrimaryColor(e.target.value)}
//                   className="w-full h-10 border rounded-md"
//                 />
//               </div>

//               <div className="flex gap-3 mt-2">
//                 <Button onClick={handleGeneratePDF} disabled={isGenerating} className="flex-1">
//                   {isGenerating ? "Đang tạo PDF..." : "Tải PDF"}
//                 </Button>
//                 <Button onClick={onClose} variant="outline" className="flex-1">
//                   Hủy
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Preview */}
//           <div className="w-full lg:w-2/3">
//             <ScrollArea className="h-[72vh] w-full rounded-md border bg-white">
//               <div className="p-4 flex justify-center">
//                 <div ref={exportRef} className="bg-white">
//                   <RecipeExportTemplate
//                     recipe={recipe}
//                     includeImages={includeImages}
//                     fontSize={fontSize}
//                     primaryColor={primaryColor}
//                   />
//                 </div>
//               </div>
//             </ScrollArea>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default RecipeExportModal;
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image"; // Fallback library
import RecipeExportTemplate from "./RecipeExportTemplate";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import { ScrollArea } from "@/components/ui/scroll-area";

// Utility to convert color to hex and debug
const normalizeColor = (color: string): string => {
  console.log("Normalizing color:", color);
  try {
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
      return color;
    }
    const div = document.createElement("div");
    div.style.color = color;
    document.body.appendChild(div);
    const computedColor = window.getComputedStyle(div).color;
    document.body.removeChild(div);

    const rgbMatch = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch;
      const hex = `#${parseInt(r).toString(16).padStart(2, "0")}${parseInt(g)
        .toString(16)
        .padStart(2, "0")}${parseInt(b).toString(16).padStart(2, "0")}`;
      console.log("Converted to hex:", hex);
      return hex;
    }
    console.warn("Color parsing failed, using fallback:", color);
    return "#4A4A4A";
  } catch (err) {
    console.error("Error normalizing color:", color, err);
    return "#4A4A4A";
  }
};

// Sanitize styles to remove oklch and other unsupported colors
const sanitizeStyles = (element: HTMLElement) => {
  const elements = element.querySelectorAll("*") as NodeListOf<HTMLElement>;
  elements.forEach((el) => {
    const styles = window.getComputedStyle(el);
    if (styles.color.includes("oklch")) {
      console.warn(
        "Found oklch in color:",
        el.tagName,
        el.className,
        styles.color
      );
      el.style.color = "#333333";
    }
    if (styles.backgroundColor.includes("oklch")) {
      console.warn(
        "Found oklch in backgroundColor:",
        el.tagName,
        el.className,
        styles.backgroundColor
      );
      el.style.backgroundColor = "#ffffff";
    }
    if (styles.borderColor.includes("oklch")) {
      console.warn(
        "Found oklch in borderColor:",
        el.tagName,
        el.className,
        styles.borderColor
      );
      el.style.borderColor = "#000000";
    }
  });
};

interface RecipeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: RecipeResponse;
}

const RecipeExportModal = ({
  isOpen,
  onClose,
  recipe,
}: RecipeExportModalProps) => {
  const exportRef = useRef<HTMLDivElement | null>(null);
  const [includeImages, setIncludeImages] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [primaryColor, setPrimaryColor] = useState("#4A4A4A");
  const [isGenerating, setIsGenerating] = useState(false);

  // const handleGeneratePDF = async () => {
  //   if (!exportRef.current) return;
  //   setIsGenerating(true);

  //   // Clone the export node to avoid modifying the UI
  //   const clone = exportRef.current.cloneNode(true) as HTMLElement;
  //   clone.style.position = "absolute";
  //   clone.style.left = "-9999px";
  //   document.body.appendChild(clone);

  //   try {
  //     // Sanitize styles in the clone
  //     sanitizeStyles(clone);

  //     // Debug: Log any remaining oklch colors
  //     const elements = clone.querySelectorAll("*");
  //     elements.forEach((el) => {
  //       const styles = window.getComputedStyle(el);
  //       if (
  //         styles.color.includes("oklch") ||
  //         styles.backgroundColor.includes("oklch") ||
  //         styles.borderColor.includes("oklch")
  //       ) {
  //         console.warn(
  //           "Found oklch after sanitization:",
  //           el.tagName,
  //           el.className,
  //           {
  //             color: styles.color,
  //             backgroundColor: styles.backgroundColor,
  //             borderColor: styles.borderColor,
  //           }
  //         );
  //       }
  //     });

  //     // Try html2canvas first
  //     let imgData: string;
  //     try {
  //       const canvas = await html2canvas(clone, {
  //         scale: 2,
  //         useCORS: true,
  //         allowTaint: false,
  //         logging: true,
  //         backgroundColor: "#ffffff",
  //       });
  //       imgData = canvas.toDataURL("image/png");
  //     } catch (html2canvasError) {
  //       console.warn(
  //         "html2canvas failed, falling back to dom-to-image:",
  //         html2canvasError
  //       );
  //       // Fallback to dom-to-image
  //       imgData = await domtoimage.toPng(clone, {
  //         quality: 1,
  //         width: clone.offsetWidth * 2,
  //         height: clone.offsetHeight * 2,
  //       });
  //     }

  //     const pdf = new jsPDF({
  //       orientation: "portrait",
  //       unit: "mm",
  //       format: "a4",
  //     });

  //     const imgWidthMm = 190;
  //     const imgWidthPx = clone.offsetWidth * 2;
  //     const imgHeightPx = clone.offsetHeight * 2;
  //     const imgHeightMm = (imgHeightPx * imgWidthMm) / imgWidthPx;

  //     // const  position = 10;
  //     // pdf.addImage(imgData, "PNG", 10, position, imgWidthMm, imgHeightMm);

  //     // let heightLeft = imgHeightMm - (297 - 20);
  //     // while (heightLeft > 0) {
  //     //   pdf.addPage();
  //     //   const nextPosition = -(imgHeightMm - heightLeft - 10);
  //     //   pdf.addImage(imgData, "PNG", 10, nextPosition, imgWidthMm, imgHeightMm);
  //     //   heightLeft -= (297 - 20);
  //     // }

  //     const pageHeight = 297; // Chiều cao A4 (mm)
  //     const margin = 10;

  //     let y = margin;
  //     let heightLeft = imgHeightMm;

  //     pdf.addImage(imgData, "PNG", margin, y, imgWidthMm, imgHeightMm);
  //     heightLeft -= pageHeight - 2 * margin;

  //     while (heightLeft > 0) {
  //       pdf.addPage();
  //       y = -(imgHeightMm - heightLeft) + margin;
  //       pdf.addImage(imgData, "PNG", margin, y, imgWidthMm, imgHeightMm);
  //       heightLeft -= pageHeight - 2 * margin;
  //     }

  //     pdf.save(`${recipe.title}.pdf`);
  //   } catch (err) {
  //     console.error("Export PDF error:", err);
  //     alert("Không thể tạo PDF. Kiểm tra console để biết lỗi.");
  //   } finally {
  //     document.body.removeChild(clone);
  //     setIsGenerating(false);
  //     onClose();
  //   }
  // };
 const handleGeneratePDF = async () => {
  if (!exportRef.current) return;
  setIsGenerating(true);

  try {
    const canvas = await html2canvas(exportRef.current, {
      scale: 2,
      useCORS: true,
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width mm
    const pageHeight = 297; // A4 height mm

    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeightPx = (pageHeight * canvas.width) / imgWidth; // chiều cao 1 trang tính theo px canvas

    let heightLeft = canvas.height;
    let position = 0;

    while (heightLeft > 0) {
      // tạo canvas con cho mỗi trang
      const canvasPage = document.createElement("canvas");
      const ctx = canvasPage.getContext("2d")!;

      canvasPage.width = canvas.width;
      canvasPage.height = Math.min(pageHeightPx, heightLeft);

      ctx.drawImage(
        canvas,
        0,
        position,
        canvas.width,
        canvasPage.height,
        0,
        0,
        canvas.width,
        canvasPage.height
      );

      const imgData = canvasPage.toDataURL("image/png");
      const imgHeightMm =
        (canvasPage.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeightMm);

      heightLeft -= pageHeightPx;
      position += pageHeightPx;

      if (heightLeft > 0) {
        pdf.addPage();
      }
    }

    pdf.save(`${recipe.title}.pdf`);
  } catch (err) {
    console.error("Export PDF error:", err);
  } finally {
    setIsGenerating(false);
    onClose();
  }
};



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-[95vw] max-h-[90vh] p-4 export-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Tùy chỉnh & Xem trước
          </DialogTitle>
          <DialogDescription>
            Chỉnh định dạng công thức và xem trước trước khi xuất PDF.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-6 mt-4 h-[calc(100%-90px)]">
          {/* Sidebar tùy chỉnh */}
          <div className="w-full lg:w-1/3 p-4 border rounded-lg bg-gray-50 shadow-sm overflow-auto">
            <h3 className="text-lg font-semibold mb-4">Tùy chỉnh</h3>

            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={includeImages}
                  onChange={(e) => setIncludeImages(e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="text-sm font-medium">Bao gồm hình ảnh</span>
              </label>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Kích thước chữ (px)
                </label>
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  min={12}
                  max={24}
                  className="w-full border rounded-md p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Màu chính
                </label>
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) =>
                    setPrimaryColor(normalizeColor(e.target.value))
                  }
                  className="w-full h-10 border rounded-md"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <Button
                  onClick={handleGeneratePDF}
                  disabled={isGenerating}
                  className="flex-1"
                >
                  {isGenerating ? "Đang tạo PDF..." : "Tải PDF"}
                </Button>
                <Button onClick={onClose} variant="outline" className="flex-1">
                  Hủy
                </Button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="w-full lg:w-2/3">
            <ScrollArea className="h-[72vh] w-full rounded-md border bg-white">
              <div className="p-4 flex justify-center">
                <div ref={exportRef} className="bg-white">
                  <RecipeExportTemplate
                    recipe={recipe}
                    includeImages={includeImages}
                    fontSize={fontSize}
                    primaryColor={normalizeColor(primaryColor)}
                  />
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeExportModal;

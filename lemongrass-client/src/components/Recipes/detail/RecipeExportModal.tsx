import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import RecipeExportTemplate from "./RecipeExportTemplate";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RecipeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: RecipeResponse;
}

const RecipeExportModal = ({ isOpen, onClose, recipe }: RecipeExportModalProps) => {
  const exportRef = useRef<HTMLDivElement | null>(null);
  const [includeImages, setIncludeImages] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [primaryColor, setPrimaryColor] = useState("#4A4A4A");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    if (!exportRef.current) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(exportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidthMm = 190;
      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;
      const imgHeightMm = (imgHeightPx * imgWidthMm) / imgWidthPx;

      let position = 10;
      pdf.addImage(imgData, "PNG", 10, position, imgWidthMm, imgHeightMm);

      let heightLeft = imgHeightMm - (297 - 20);
      while (heightLeft > 0) {
        pdf.addPage();
        const nextPosition = -(imgHeightMm - heightLeft - 10);
        pdf.addImage(imgData, "PNG", 10, nextPosition, imgWidthMm, imgHeightMm);
        heightLeft -= (297 - 20);
      }

      pdf.save(`${recipe.title}.pdf`);
    } catch (err) {
      console.error("Export PDF error:", err);
      alert("Không thể tạo PDF. Kiểm tra console để biết lỗi.");
    } finally {
      setIsGenerating(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-[95vw] max-h-[90vh] p-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Tùy chỉnh & Xem trước</DialogTitle>
          <DialogDescription>Chỉnh định dạng công thức và xem trước trước khi xuất PDF.</DialogDescription>
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
                <label className="block text-sm font-medium mb-1">Kích thước chữ (px)</label>
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
                <label className="block text-sm font-medium mb-1">Màu chính</label>
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-full h-10 border rounded-md"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <Button onClick={handleGeneratePDF} disabled={isGenerating} className="flex-1">
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
                    primaryColor={primaryColor}
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

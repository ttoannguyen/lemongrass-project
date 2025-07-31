import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RecipeCreateRequest } from "@/types/Recipe/RecipeRequest";

type Props = {
  open: boolean;
  onClose: () => void;
  data: RecipeCreateRequest;
  ingredientTemplates: { id: string; name: string }[];
  units: { id: string; name: string }[];
};

const PreviewRecipe = ({
  open,
  onClose,
  data,
  units,
  ingredientTemplates,
}: Props) => {
  const getNameById = (list: { id: string; name: string }[], id: string) =>
    list.find((item) => item.id === id)?.name || id;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Xem trước công thức</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <p className="text-sm text-muted-foreground">{data.description}</p>
            <p className="text-sm mt-1">
              ⏱ {data.cookingTime} phút · 👨‍👩‍👧‍👦 {data.servings} khẩu phần · 🔥{" "}
              {data.difficulty}
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Nguyên liệu</h3>
            <ul className="list-disc pl-5 text-sm">
              {data.ingredients?.map((i, idx) => (
                <li key={idx}>
                  {i.quantity} {getNameById(units, i.unitId)} -{" "}
                  {getNameById(ingredientTemplates, i.templateId)}{" "}
                  {i.note && `(${i.note})`}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Hướng dẫn</h3>
            <ol className="list-decimal pl-5 text-sm space-y-2">
              {data.instructions?.map((ins, idx) => (
                <li key={idx}>
                  <p>{ins.description}</p>
                  {ins.images?.length > 0 && (
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {ins.images.map((img, j) =>
                        img.previewUrl ? (
                          <img
                            key={j}
                            src={img.previewUrl}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        ) : null
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {data.images?.length > 0 && (
            <div>
              <h3 className="font-semibold">Ảnh món ăn</h3>
              <div className="flex gap-2 flex-wrap">
                {data.images.map((img, i) =>
                  img.previewUrl ? (
                    <img
                      key={i}
                      src={img.previewUrl}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewRecipe;

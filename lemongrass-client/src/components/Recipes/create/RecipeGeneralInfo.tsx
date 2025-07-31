import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import UploadImage from "../../imageTempale/UploadImage";
import { TRANSLATION_KEYS } from "@/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { Textarea } from "@/components/ui/textarea";
import { Difficulty } from "@/types/enums/difficulty.enum";
import { Button } from "@/components/ui/button";
import { GenericDropdown } from "@/components/generic-dropdown";
import type { CategoryResponse } from "@/types/category/CategoryResponse";
import { CategorySelector } from "./CategorySelector";
import type { ImageUpload } from "@/types/image/ImageUpload";
import { Trash2 } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Props {
  title: string;
  setTitle: (value: string) => void;
  servings: number;
  setServings: (value: number) => void;
  cookingTime: number;
  setCookingTime: (value: number) => void;
  description: string;
  setDescription: (value: string) => void;
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
  categoryIds: string[];
  categories: CategoryResponse[];
  setCategoryIds: (value: string[]) => void;
  onUpload: (files: ImageUpload[]) => void; // Đổi thành mảng để hỗ trợ nhiều ảnh
  onRemoveImage: (index: number) => void;
  recipeImages: ImageUpload[];
}

const options = [
  { id: Difficulty.EASY, name: "Dễ" },
  { id: Difficulty.MEDIUM, name: "Trung bình" },
  { id: Difficulty.HARD, name: "Khó" },
];

const RecipeGeneralInfo = ({
  title,
  setTitle,
  servings,
  setServings,
  cookingTime,
  setCookingTime,
  description,
  setDescription,
  difficulty,
  setDifficulty,
  categories,
  categoryIds,
  setCategoryIds,
  onUpload,
  onRemoveImage,
  recipeImages,
}: Props) => {
  const { t } = useTranslation();
  const cuisineCategories = categories.filter((c) => c.type === "CUISINE");
  const mealTypeCategories = categories.filter((c) => c.type === "MEAL_TYPE");
  const occasionCategories = categories.filter((c) => c.type === "OCCASION");

  const firstImage =
    recipeImages.length > 0
      ? recipeImages.reduce((prev, curr) =>
          (prev.displayOrder ?? 0) < (curr.displayOrder ?? 0) ? prev : curr
        )
      : null;
  const getFirstImageIndex = () => {
    if (!firstImage) return -1;
    return recipeImages.findIndex(
      (img) => img.displayOrder === firstImage.displayOrder
    );
  };
  const categoryGroups = [
    {
      label: t(TRANSLATION_KEYS.createRecipe.cuisine),
      categories: cuisineCategories,
      placeholder: "Chọn kiểu ẩm thực",
    },
    {
      label: t(TRANSLATION_KEYS.createRecipe.mealType),
      categories: mealTypeCategories,
      placeholder: "Chọn loại bữa ăn",
    },
    {
      label: t(TRANSLATION_KEYS.createRecipe.occasion),
      categories: occasionCategories,
      placeholder: "Chọn dịp đặc biệt",
    },
  ];

  return (
    <div className="w-full max-w-lg">
      <h1 className="text-paragraph font-semibold text-lg mt-4 mb-2 mx-2">
        {t(TRANSLATION_KEYS.createRecipe.generalInfo).toUpperCase()}
      </h1>

      <div className="bg-white p-4 rounded-md shadow-sm">
        <div className="flex gap-2 mb-4">
          {firstImage ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="relative w-full">
                  <img
                    src={
                      firstImage.file
                        ? URL.createObjectURL(firstImage.file)
                        : ""
                    }
                    className="w-60 mx-auto h-40 object-contain rounded-sm"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-0 right-0 p-1"
                    onClick={() => onRemoveImage(getFirstImageIndex())}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </HoverCardTrigger>
              <HoverCardContent >
                <div className="flex gap-4">
                  {recipeImages.map((image, index) => (
                    <div key={`${image.file}-${index}`} className="relative">
                      <img
                        src={image.file ? URL.createObjectURL(image.file) : ""}
                        alt={`Ảnh ${index + 1}`}
                        className="w-36 h-24 object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 p-1 rounded-full"
                        onClick={() => onRemoveImage(index)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                  {recipeImages.length < 3 && (
                    <UploadImage onUpload={onUpload} className="w-36 h-24 bg-main"/>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <UploadImage onUpload={onUpload} className="w-full bg-main" />
          )}
          {/* {recipeImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.file ? URL.createObjectURL(image.file) : ""}
                alt={`Ảnh công thức ${index + 1}`}
                className="w-24 h-16 object-cover rounded-sm"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-0 right-0 p-1"
                onClick={() => onRemoveImage(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <UploadImage onUpload={onUpload} /> */}
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <div className="flex flex-col gap-1">
            <Label className="text-paragraph font-semibold mb-2">
              {t(TRANSLATION_KEYS.createRecipe.name)}
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`${t(TRANSLATION_KEYS.eg)}: ${t(
                TRANSLATION_KEYS.createRecipe.namePlaceholder
              )}`}
              className="border-stroke/20 border focus-visible:ring-0 focus-visible:border-stroke/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-paragraph font-semibold my-2">Mô tả</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ví dụ: Một bữa ăn nhanh và ngon..."
              className="h-30 border-stroke/20 border focus-visible:ring-0 focus-visible:border-stroke/40"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6 mt-2 pb-1">
            <div className="w-full flex flex-col gap-5">
              {categoryGroups.map((group, idx) => (
                <div key={idx}>
                  <Label className="text-paragraph font-semibold mb-2">
                    {group.label}
                  </Label>
                  <CategorySelector
                    categories={group.categories}
                    selectedIds={categoryIds.filter((id) =>
                      group.categories.some((c) => c.id === id)
                    )}
                    onChange={(ids) => {
                      const otherIds = categoryIds.filter(
                        (id) => !group.categories.some((c) => c.id === id)
                      );
                      setCategoryIds([...otherIds, ...ids]);
                    }}
                    placeholder={group.placeholder}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <Label className="text-paragraph font-semibold mb-2">
                  {t(TRANSLATION_KEYS.createRecipe.difficulty)}
                </Label>
                <GenericDropdown
                  buttonClassName="md:w-34"
                  value={difficulty}
                  options={options}
                  onChange={(value) => setDifficulty(value as Difficulty)}
                  placeholder="Chọn độ khó"
                />
              </div>

              <div className="flex flex-col">
                <Label className="text-paragraph font-semibold mb-2">
                  {t(TRANSLATION_KEYS.createRecipe.duration)}
                </Label>
                <div className="flex items-center md:w-34">
                  <Input
                    type="number"
                    value={cookingTime}
                    min={0}
                    onChange={(e) => setCookingTime(Number(e.target.value))}
                    className="rounded-r-none border-stroke/20 w-24 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <Button
                    variant="disable"
                    className="rounded-l-none border border-stroke/20 bg-main text-sm text-muted-foreground"
                  >
                    Phút
                  </Button>
                </div>
              </div>

              <div className="flex flex-col">
                <Label className="text-paragraph font-semibold mb-2">
                  {t(TRANSLATION_KEYS.createRecipe.number)}
                </Label>
                <div className="flex items-center md:w-34">
                  <Input
                    type="number"
                    value={servings}
                    min={0}
                    onChange={(e) => setServings(Number(e.target.value))}
                    className="rounded-r-none border-stroke/20 w-24 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <Button
                    variant="disable"
                    className="rounded-l-none p-2.5 border border-stroke/20 bg-main text-sm text-muted-foreground"
                  >
                    Người
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeGeneralInfo;

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import UploadImage from "../imageTempale/UploadImage";
import { TRANSLATION_KEYS } from "@/locales/translationKeys";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  setTitle: (val: string) => void;
  servings: number;
  setServings: (val: number) => void;
  cookingTime: number;
  setCookingTime: (val: number) => void;
  onUpload: (file: File) => void;
}

const RecipeGeneralInfo = ({
  title,
  setTitle,
  servings,
  setServings,
  cookingTime,
  setCookingTime,
  onUpload,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex-1/3 p-2 m-4">
      <h1 className="text-paragraph font-medium">
        {t(TRANSLATION_KEYS.createRecipe.generalInfo).toUpperCase()}
      </h1>
      <div className="bg-white p-4 rounded-md">
        <UploadImage onUpload={onUpload} />
        <div className="flex flex-col gap-4 mt-10">
          <div>
            <Label className="mb-2">
              {t(TRANSLATION_KEYS.createRecipe.name)}
            </Label>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`${t(TRANSLATION_KEYS.eg)}: ${t(
                TRANSLATION_KEYS.createRecipe.namePlaceholder
              )}`}
              className="border-stroke/10 border-2 focus-visible:!ring-0 focus-visible:border-stroke/40"
              value={title}
            />
          </div>

          <div>
            <Label className="mb-2">
              {t(TRANSLATION_KEYS.createRecipe.number)}
            </Label>
            <div className="relative w-full">
              <Input
                type="number"
                min={1}
                onChange={(e) => setServings(Number(e.target.value))}
                placeholder={`${t(TRANSLATION_KEYS.eg)}: 4 ${t(
                  TRANSLATION_KEYS.or
                )} 3-5`}
                className="pr-16 border-stroke/10 border-2 focus-visible:!ring-0 focus-visible:border-stroke/40"
                value={servings}
              />
              <p className="absolute right-3 top-1/2 -translate-y-1/2 text-paragraph font-medium text-sm">
                person
              </p>
            </div>
          </div>

          <div>
            <Label className="mb-2">
              {t(TRANSLATION_KEYS.createRecipe.duration)}
            </Label>
            <div className="relative w-full">
              <Input
                type="number"
                onChange={(e) => setCookingTime(Number(e.target.value))}
                placeholder="30"
                className="pr-16 border-stroke/10 border-2 focus-visible:!ring-0 focus-visible:border-stroke/40"
                value={cookingTime}
              />
              <p className="absolute right-3 top-1/2 -translate-y-1/2 text-paragraph font-medium text-sm">
                minute
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeGeneralInfo;

import { useTranslation } from "react-i18next";
import { TRANSLATION_KEYS } from "@/locales/translationKeys";
import { useState } from "react";
import useCreateRecipe from "@/hooks/useCreateRecipe";
import RecipeGeneralInfo from "./RecipeGeneralInfo";
import { CircleAlert } from "lucide-react";
import IngredientList from "./IngredientList";

import type { IngredientResponse } from "@/types/ingredient/IngredientResponse";

const Create = () => {
  const { t } = useTranslation();

  // ✅ Giả lập 2 nguyên liệu mẫu
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([
    {
      id: "1",
      name: "Bell pepper",
      aliases: ["Ớt chuông"],
      allowedUnits: [{ id: "pcs", name: "pcs", minValue: 1, stepSize: 1 }],
    },
    {
      id: "2",
      name: "Ground beef",
      aliases: ["Thịt bò xay"],
      allowedUnits: [{ id: "gram", name: "g", minValue: 50, stepSize: 50 }],
    },
  ]);

  const {
    title,
    setTitle,
    servings,
    setServings,
    cookingTime,
    setCookingTime,
  } = useCreateRecipe({ templates: ingredients });

  const handleUpload = (file: File) => {
    console.log("Uploaded file:", file);
  };

  return (
    <div className="flex bg-main">
      <RecipeGeneralInfo
        title={title}
        setTitle={setTitle}
        servings={servings}
        setServings={setServings}
        cookingTime={cookingTime}
        setCookingTime={setCookingTime}
        onUpload={handleUpload}
      />

      <div className="w-full flex-2/3 p-2 m-4">
        <h1 className="text-paragraph font-medium">
          {t(TRANSLATION_KEYS.createRecipe.detailInfo).toUpperCase()}
        </h1>
        <div className="flex gap-2 flex-col">
          <div className="bg-white p-4 rounded-md">
            <div className="font-medium text-paragraph flex items-center">
              <p className="text-sm mr-2">
                {t(TRANSLATION_KEYS.createRecipe.ingredient)}
              </p>
              <CircleAlert className="size-3 text-paragraph my-auto" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-md">
            {/* ✅ Truyền state và setState để cho phép chỉnh sửa */}
            <IngredientList
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

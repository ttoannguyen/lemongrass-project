import type { IngredientResponse } from "@/types/ingredient/IngredientResponse";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GenericCombobox } from "../../generic-combobox";
import { useTranslation } from "react-i18next";
import { TRANSLATION_KEYS } from "@/locales/translationKeys";
import { Button } from "../../ui/button";
import type { RecipeIngredientRequest } from "@/types/Recipe/RecipeIngredientRequest";

type Props = {
  ingredient: RecipeIngredientRequest;
  index: number;
  sortableId: string;
  allItems: RecipeIngredientRequest[];
  templateIngredients: IngredientResponse[];
  onChangeIngredient: (
    index: number,
    data: Partial<RecipeIngredientRequest>
  ) => void;
  onDeleteIngredient: () => void;
};

const SortableIngredientItem = ({
  ingredient,
  index,
  sortableId,
  allItems,
  templateIngredients,
  onChangeIngredient,
  onDeleteIngredient,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: sortableId });
  const { t } = useTranslation();

  const selectedIds = allItems
    .filter((_, i) => i !== index)
    .map((item) => item.templateId)
    .filter((id) => id !== "");

  const availableOptions = templateIngredients.filter(
    (ing) => !selectedIds.includes(ing.id)
  );

  const selectedIngredient = templateIngredients.find(
    (ing) => ing.id === ingredient.templateId
  );

  const mergedOptions =
    selectedIngredient &&
    !availableOptions.find((i) => i.id === selectedIngredient.id)
      ? [selectedIngredient, ...availableOptions]
      : availableOptions;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center p-2 bg-white border border-stroke/10 rounded-md shadow-sm gap-2"
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-move p-2 text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Ingredient Combobox */}
      <GenericCombobox
        defaultValue="Nguyên liệu"
        onChange={(templateId) => {
          const selected = templateIngredients.find(
            (ing) => ing.id === templateId
          );
          onChangeIngredient(index, {
            templateId,
            unitId: selected?.allowedUnits[0]?.id || "",
          });
        }}
        value={ingredient.templateId}
        options={mergedOptions.map((i) => ({ id: i.id, name: i.name }))}
        placeholder={"Nguyên liệu"}
        // placeholder={t(TRANSLATION_KEYS.selectIngredient)}
        buttonClassName="w-60 justify-between bg-white text-paragraph border-stroke/30 hover:bg-main"
        contentClassName="w-60 p-0 bg-white"
      />

      {/* Quantity + Unit */}
      <div className="flex flex-row border-none overflow-hidden w-[170px]">
        <Input
          type="number"
          value={ingredient.quantity}
          min={0}
          onChange={(e) =>
            onChangeIngredient(index, {
              quantity: Number(e.target.value),
            })
          }
          className="rounded-r-none rounded-sm focus:ring-0! rounded-l border border-stroke/30! border-r-0 w-20 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <GenericCombobox
          value={ingredient.unitId ?? ""}
          defaultValue="Đơn vị"
          options={
            selectedIngredient?.allowedUnits.map((unit) => ({
              id: unit.id,
              name: unit.name,
            })) ?? []
          }
          onChange={(value) => onChangeIngredient(index, { unitId: value })}
          placeholder={
            t(TRANSLATION_KEYS.searchText) +
            " " +
            t(TRANSLATION_KEYS.createRecipe.unit)
          }
          buttonClassName="rounded-l-none rounded-r border-stroke/30 bg-main w-[90px] text-left"
          contentClassName="w-[170px] p-0 bg-white"
        />
      </div>

      <Input
        type="text"
        value={ingredient.note ?? ""}
        onChange={(e) => onChangeIngredient(index, { note: e.target.value })}
        placeholder={t(TRANSLATION_KEYS.createRecipe.noteIngredient)}
        className="flex-1 border-stroke/30 focus:ring-0! min-w-[200px]"
      />

      <Button
        variant={"none"}
        size="sm"
        className="bg-tertiary text-white"
        onClick={onDeleteIngredient}
      >
        <Trash2 />
      </Button>
    </div>
  );
};

export default SortableIngredientItem;

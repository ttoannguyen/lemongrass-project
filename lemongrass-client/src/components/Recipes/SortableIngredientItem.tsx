import { useIngredientTemplates } from "@/hooks/queries/useIngredientTemplate";
import type { IngredientResponse } from "@/types/ingredient/IngredientResponse";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GenericCombobox } from "../generic-combobox";
import { useTranslation } from "react-i18next";
import { TRANSLATION_KEYS } from "@/locales/translationKeys";

type IngredientWithExtra = IngredientResponse & {
  quantity?: number;
  unitId?: string;
  note?: string;
};

type Props = {
  ingredient: IngredientWithExtra;
  allItems: IngredientWithExtra[];
  onChangeIngredient: (id: string, data: Partial<IngredientWithExtra>) => void;
};

const SortableIngredientItem = ({
  ingredient,
  allItems,
  onChangeIngredient,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: ingredient.id });

  const { t } = useTranslation();

  const { data: allIngredients = [] } = useIngredientTemplates();

  const selectedIds = allItems
    .filter((item) => item.id !== ingredient.id)
    .map((item) => item.id);

  const availableOptions = allIngredients.filter(
    (ing) => !selectedIds.includes(ing.id)
  );

  const selectedIngredient = allIngredients.find(
    (ing) => ing.id === ingredient.id
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
      {...attributes}
      className="flex flex-wrap items-center gap-3 py-3 px-4 border border-stroke/10 rounded bg-white shadow-sm"
    >
      {/* Drag handle */}
      <div
        {...listeners}
        className="cursor-grab select-none text-lg text-muted-foreground"
      >
        <GripVertical />
      </div>

      {/* Ingredient Combobox */}
      <GenericCombobox
        onChange={(id) => onChangeIngredient(ingredient.id, { id })}
        value={ingredient.id}
        options={mergedOptions.map((i) => ({ id: i.id, name: i.name }))}
        placeholder={t(TRANSLATION_KEYS.selectIngredient)}
        buttonClassName="w-60 justify-between bg-white text-paragraph border-paragraph hover:bg-main"
        contentClassName="w-60 p-0 bg-white"
      />

      {/* Quantity + Unit */}
      <div className="flex flex-row border-none overflow-hidden w-[170px]">
        <Input
          type="number"
          value={ingredient.quantity ?? 0}
          min={0}
          onChange={(e) =>
            onChangeIngredient(ingredient.id, {
              quantity: Number(e.target.value),
            })
          }
          className="rounded-r-none rounded-l border border-r-0 w-20 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <GenericCombobox
          value={ingredient.unitId ?? ""}
          options={
            selectedIngredient?.allowedUnits.map((unit) => ({
              id: unit.id,
              name: unit.name,
            })) ?? []
          }
          onChange={(value) =>
            onChangeIngredient(ingredient.id, { unitId: value })
          }
          placeholder={
            t(TRANSLATION_KEYS.searchText) + " "+
            t(TRANSLATION_KEYS.createRecipe.unit)
          }
          buttonClassName="rounded-l-none rounded-r bg-main w-[90px] text-left"
          contentClassName="w-[170px] p-0 bg-white"
        />
      </div>

      {/* Note input */}
      <Input
        type="text"
        value={ingredient.note ?? ""}
        onChange={(e) =>
          onChangeIngredient(ingredient.id, { note: e.target.value })
        }
        placeholder={t(TRANSLATION_KEYS.createRecipe.noteIngredient)}
        className="flex-1 min-w-[200px]"
      />
    </div>
  );
};

export default SortableIngredientItem;

import { useState } from "react";
import clsx from "clsx";
import { useCategoryGroupedByType } from "@/hooks/sort/useCategoryGroupedByType";

export default function MealTypeSelector({
  onSelect,
}: {
  onSelect?: (type: string) => void;
}) {
  const { grouped } = useCategoryGroupedByType();

  const mealTypes = grouped?.MEAL_TYPE || [];

  const [selected, setSelected] = useState(mealTypes[0]?.name || "");
  const handleClick = (type: string) => {
    setSelected(type);
    onSelect?.(type);
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {mealTypes.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.name)}
          className={clsx(
            "capitalize px-6 py-2 rounded-full text-sm font-semibold transition-all",
            selected === item.name
              ? "bg-rose-50 text-black border border-emerald-900"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          {item.name.toLocaleLowerCase()}
        </button>
      ))}
    </div>
  );
}

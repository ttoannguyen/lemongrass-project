import { GenericCombobox } from "./generic-combobox";

type Option = {
  id: string;
  name: string;
};

export function IngredientCombobox({
  value,
  options,
  onChange,
}: {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}) {
  return (
    <GenericCombobox
      onChange={onChange}
      value={value}
      options={options}
      placeholder="Chọn nguyên liệu"
      buttonClassName="w-60! justify-between bg-white text-paragraph border-paragraph hover:bg-main "
      contentClassName="w-60! p-0 bg-white"
    />
  );
}

import { useFormContext, Controller } from "react-hook-form";
import { Select } from "@/components/ui/select";
import { RecipeCategory } from "@/types/Recipe";

export default function CategoryForm() {
  const { control } = useFormContext();

  return (
    <Controller
      name="category"
      control={control}
      render={({ field }) => (
        <Select {...field}>
          {Object.values(RecipeCategory).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      )}
    />
  );
}

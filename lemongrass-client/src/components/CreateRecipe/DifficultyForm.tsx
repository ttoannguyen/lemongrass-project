import { useFormContext, Controller } from "react-hook-form";
import { Select } from "@/components/ui/select";
import { RecipeDifficulty } from "@/types/Recipe";

export default function DifficultyForm() {
  const { control } = useFormContext();

  return (
    <div>
      <label>Difficulty</label>
      <Controller
        name="difficulty"
        control={control}
        render={({ field }) => (
          <Select {...field}>
            {Object.values(RecipeDifficulty).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        )}
      />
    </div>
  );
}

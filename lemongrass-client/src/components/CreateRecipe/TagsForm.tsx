import { Controller, useFormContext } from "react-hook-form";
import TagsInput from "@/components/ui/TagsInput";

export default function TagsForm() {
  const { control } = useFormContext();

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field }) => <TagsInput {...field} />}
    />
  );
}

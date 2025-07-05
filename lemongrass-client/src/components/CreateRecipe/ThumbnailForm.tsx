import { Controller, useFormContext } from "react-hook-form";
import Dropzone from "@/components/ui/Dropzone";

export default function ThumbnailForm() {
  const { control } = useFormContext();

  return (
    <Controller
      name="thumbnail"
      control={control}
      render={({ field }) => <Dropzone onDrop={field.onChange} />}
    />
  );
}

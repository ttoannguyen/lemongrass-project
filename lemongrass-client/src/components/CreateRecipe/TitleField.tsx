import { useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const TitleField = () => {
  const { register } = useFormContext();
  return (
    <div>
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        id="title"
        {...register("title", { required: true })}
      />
    </div>
  );
};

export default TitleField;

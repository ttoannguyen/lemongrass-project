import { useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const DescriptionField = () => {
  const { register } = useFormContext();
  return (
    <div>
      <Label htmlFor="description">Description</Label>
      <Input
        id="description"
        {...register("description", { required: true })}
      />
    </div>
  );
};

export default DescriptionField;

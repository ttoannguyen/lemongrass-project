import { useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const CookingTimeField = () => {
  const { register } = useFormContext();
  return (
    <div>
      <Label>Cooking Time (minutes)</Label>
      <Input type="number" {...register("cookingtime")} />
    </div>
  );
};

export default CookingTimeField;

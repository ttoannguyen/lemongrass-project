import { useFormContext } from "react-hook-form";
import { Label } from "../../ui/label";

const DifficultyField = () => {
  const { register } = useFormContext();
  return (
    <div>
      <Label>Difficulty</Label>
      <select {...register("difficulty")}>
        <option value="EASY">EASY</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HARD">HARD</option>
      </select>
    </div>
  );
};

export default DifficultyField;

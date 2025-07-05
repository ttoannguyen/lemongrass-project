import { useFormContext } from "react-hook-form";

export default function DurationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor="duration">Duration (minutes)</label>
      <input
        type="number"
        id="duration"
        {...register("duration", { valueAsNumber: true })}
      />
      {errors.duration && <p>{errors.duration.message}</p>}
    </div>
  );
}

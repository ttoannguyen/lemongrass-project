import { useFormContext } from "react-hook-form";

export default function DescriptionForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        {...register("description", {
          required: "Description is required",
          minLength: {
            value: 10,
            message: "Description must be at least 10 characters",
          },
        })}
        className="border p-2 w-full h-32"
      />
      {errors.description?.message && (
        <p className="text-red-500 text-sm mt-1">
          {String(errors.description.message)}
        </p>
      )}
    </div>
  );
}

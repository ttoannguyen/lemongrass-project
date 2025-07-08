import { useFormContext } from "react-hook-form";

export default function TitleField() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="block text-sm font-medium">Title</label>
      <input
        {...register("title")}
        className={`w-full border px-2 py-1 rounded ${
          errors.title ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="Enter recipe title"
      />
      {errors.title && (
        <p className="text-sm text-red-500 mt-1">
          {errors.title.message as string}
        </p>
      )}
    </div>
  );
}

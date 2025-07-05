import { useFormContext } from "react-hook-form";

export default function TitleForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        {...register("title", { required: "Title is required" })}
      />
      {errors.title?.message && (
        <p className="text-red-500 text-sm mt-1">
          {String(errors.title.message)}
        </p>
      )}
    </div>
  );
}

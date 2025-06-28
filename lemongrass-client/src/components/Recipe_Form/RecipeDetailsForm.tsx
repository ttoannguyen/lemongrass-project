// interface Props {
//   register: UseFormRegister<RecipeFormValues>;
//   errors: FieldErrors<RecipeFormValues>;
// }

// export const RecipeDetailsForm = ({ register, errors }: Props) => (
//   <div className="grid gap-4">
//     <input
//       {...register("title", { required: "Title is required" })}
//       placeholder="Title"
//     />
//     {errors.title && <p>{errors.title.message}</p>}

//     <textarea {...register("description")} placeholder="Description" />

//     <select {...register("difficulty")}>
//       <option value="EASY">Easy</option>
//       <option value="MEDIUM">Medium</option>
//       <option value="HARD">Hard</option>
//     </select>

//     <input
//       type="number"
//       {...register("preparationTime")}
//       placeholder="Preparation time (minutes)"
//     />
//   </div>
// );

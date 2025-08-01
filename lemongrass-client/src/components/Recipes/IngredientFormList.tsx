// import { TRANSLATION_KEYS } from "@/locales/translationKeys";
// import { useTranslation } from "react-i18next";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

// type Ingredient = { name: string; quantity: string };
// interface Props {
//   ingredients: Ingredient[];
//   onChange: (ingredients: Ingredient[]) => void;
// }

// const IngredientFormList = ({ ingredients, onChange }: Props) => {
//   const { t } = useTranslation();
//   const handleChange = (
//     index: number,
//     field: keyof Ingredient,
//     value: string
//   ) => {
//     const updated = [...ingredients];
//     updated[index][field] = value;
//     onChange(updated);
//   };

//   const handleAdd = () => {
//     onChange([...ingredients, { name: "", quantity: "" }]);
//   };

//   const handleRemove = (index: number) => {
//     const updated = ingredients.filter((_, i) => i !== index);
//     onChange(updated);
//   };

//   return (
//     <div>
//       <h3 className="font-semibold">
//         {t(TRANSLATION_KEYS.createRecipe.ingredient)}
//       </h3>
//       {ingredients.map((ingredient, index) => (
//         <div key={index} className="flex gap-2 items-center">
//           <Input
//             placeholder="Tên"
//             value={ingredient.name}
//             onChange={(e) => handleChange(index, "name", e.target.value)}
//           />
//           <Input
//             placeholder="Số lượng"
//             value={ingredient.quantity}
//             onChange={(e) => handleChange(index, "quantity", e.target.value)}
//           />
//           <Button variant="destructive" onClick={() => handleRemove(index)}>
//             X
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default IngredientFormList;

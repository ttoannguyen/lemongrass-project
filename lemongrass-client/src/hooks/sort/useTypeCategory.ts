import { useCategoryQuery } from "../queries/useCategoryQuery";

export const useTypeCategory = () => {
  const categories = useCategoryQuery();

  const uniqueTypes = categories.data
    ? [...new Set(categories.data.map((item) => item.type))]
    : [];

  return uniqueTypes;
};

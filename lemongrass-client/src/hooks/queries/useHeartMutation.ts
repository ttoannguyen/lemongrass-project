// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export const useReactionPost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ name }: { name: string }) =>
//       categoryService.addCategory(name),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["categories"] });
//     },
//   });
// };

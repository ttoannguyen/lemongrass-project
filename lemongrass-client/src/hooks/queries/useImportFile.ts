import { excelService } from "@/services/uploadFile/excel.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useImportFileExcelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => excelService.upload(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredient_templates"] });
    },
  });
};

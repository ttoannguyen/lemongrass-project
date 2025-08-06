import api from "@/lib/axios";

export const excelService = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post("/import/excel", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};

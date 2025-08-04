import api from "@/lib/axios";
import type { Account } from "@/types";
import type { BaseResponse } from "@/types/BaseResponse";

export const accountService = {
  getAccountById: async (id: string): Promise<Account> => {
    const res = await api.get<BaseResponse<Account>>(`/accounts/${id}`);
    console.log(res.data.result);
    if (res.data.code !== 1000) {
      throw new Error("Login failed: Invalid res code");
    }
    return res.data.result;
  },

  getAccounts: async (): Promise<Account[]> => {
    const res = await api.get<BaseResponse<Account[]>>("/accounts");
    return res.data.result;
  },

  myInfo: async (): Promise<Account> => {
    const res = await api.get<BaseResponse<Account>>("/accounts/myInfo");
    return res.data.result;
  },

  updateMyInfo: async (
    data: Partial<Omit<Account, "id" | "avatarUrl">>,
    avatar?: File | null
  ): Promise<Account> => {
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    if (avatar) {
      formData.append("avatar", avatar);
    }

    const res = await api.put<BaseResponse<Account>>(
      "/accounts/myInfo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.result;
  },
};

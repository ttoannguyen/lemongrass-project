import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type {
  UnitCreateRequest,
  UnitUpdateRequest,
} from "@/types/units/UnitCreateRequest";
import type { UnitResponse } from "@/types/units/UnitResponse";

export const unitService = {
  getUnits: async (): Promise<UnitResponse[]> => {
    const res = await api.get<BaseResponse<UnitResponse[]>>("/units");
    return res.data.result;
  },

  createUnit: async (data: UnitCreateRequest): Promise<UnitResponse> => {
    const res = await api.post<BaseResponse<UnitResponse>>("units", data);
    return res.data.result;
  },

  updateUnit: async (data: UnitUpdateRequest): Promise<UnitResponse> => {
    const res = await api.put<BaseResponse<UnitResponse>>(
      `units/${data.id}`,
      data
    );
    return res.data.result;
  },

  deleteUnit: async (id: string): Promise<void> => {
    await api.delete<BaseResponse<void>>(`units/${id}`);
  },
};

import { unitService } from "@/services/unit/unit.service";
import type { UnitResponse } from "@/types/units/UnitResponse";
import { useQuery } from "@tanstack/react-query";

export const useUnitQuery = () => {
  return useQuery<UnitResponse[]>({
    queryKey: ["units"],
    queryFn: unitService.getUnits,
    staleTime: 5 * 60 * 1000,
  });
};

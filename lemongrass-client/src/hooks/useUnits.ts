import type { Unit } from "@/types/units/Unit";
import { useEffect, useState } from "react";

export const useUnits = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await fetch("/api/units");
        const data = await res.json();
        setUnits(data.result);
      } catch (err) {
        console.error("Failed to fetch units", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  return { units, loading };
};

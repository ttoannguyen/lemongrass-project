import { useMemo, useState } from "react";

type SortOrder = "asc" | "desc";

function normalizeString(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function useSearchAndSort<T, K extends keyof T>(
  items: T[],
  options: {
    searchKey: keyof T;
    sortKeys: readonly K[];
    initialSortKey: K;
    initialSortOrder: SortOrder;
  }
) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<K>(options.initialSortKey);
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    options.initialSortOrder
  );

  const filteredAndSortedItems = useMemo(() => {
    const filtered = items.filter((item) =>
      normalizeString(String(item[options.searchKey])).includes(
        normalizeString(searchTerm)
      )
    );

    const sorted = [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [items, options.searchKey, searchTerm, sortKey, sortOrder]);

  return {
    searchTerm,
    setSearchTerm,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    filteredAndSortedItems,
  };
}

export default useSearchAndSort;

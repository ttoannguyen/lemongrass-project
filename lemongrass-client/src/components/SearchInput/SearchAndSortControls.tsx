// components/SearchInput/SearchAndSortControls.tsx
"use client";

import { Input } from "@/components/ui/input";

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortKey: "name" | "createdDate" | "lastModifiedDate";
  setSortKey: (value: "name" | "createdDate" | "lastModifiedDate") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
};

const SearchAndSortControls = ({
  searchTerm,
  setSearchTerm,
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
}: Props) => {
  return (
    <>
      <Input
        placeholder="Tìm kiếm theo tên..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-40 rounded-none"
      />
      <select
        className="border cursor-pointer h-9 px-2 py-1 text-sm"
        value={sortKey}
        onChange={(e) =>
          setSortKey(
            e.target.value as "name" | "createdDate" | "lastModifiedDate"
          )
        }
      >
        <option value="name">Sắp xếp theo tên</option>
        {/* <option value="type">Sắp xếp theo loại</option> */}
        <option value="createdDate">Sắp xếp theo ngày tạo</option>
        <option value="lastModifiedDate">Sắp xếp theo ngày chỉnh sửa</option>
      </select>
      <select
        className="border cursor-pointer h-9 not-first-of-type:px-2 py-1 text-sm"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
      >
        <option value="asc">Tăng dần</option>
        <option value="desc">Giảm dần</option>
      </select>
    </>
  );
};

export default SearchAndSortControls;

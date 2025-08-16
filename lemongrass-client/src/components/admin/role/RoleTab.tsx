// // RoleList.tsx
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import RoleForm from "./RoleForm";
// import { useRoleQuery } from "@/hooks/queries/useRoleQuery";
// import type { Role } from "@/types";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import useSearchAndSort from "@/hooks/sort/useSearchAndSort";
// import SearchAndSortControls from "@/components/searchInput/SearchAndSortControls";

// const RoleTab = () => {
//   // const { data: roles = [] } = useRoleQuery();
//   const [selectedRole, setSelectedRole] = useState<Role | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { data: roles = [], isLoading } = useRoleQuery(); // Fetch roles

//   const {
//     searchTerm,
//     setSearchTerm,
//     sortKey,
//     setSortKey,
//     sortOrder,
//     setSortOrder,
//     filteredAndSortedItems: filteredRoles,
//   } = useSearchAndSort<Role>(roles, {
//     searchKey: "name",
//     sortKeys: ["name", "createdDate", "lastModifiedDate"],
//     initialSortKey: "name",
//     initialSortOrder: "asc",
//   });

//   console.log(roles);
//   const handleSelectRole = (role: Role) => {
//     setSelectedRole(role);
//   };

//   const handleCreateNew = () => {
//     setSelectedRole(null);
//     setIsModalOpen(true);
//   };
//   useEffect(() => {
//     if (selectedRole) {
//       const updated = roles.find((r) => r.name === selectedRole.name);
//       if (updated) {
//         setSelectedRole(updated);
//       }
//     }
//   }, [roles]);

//   if (isLoading) return <p className="p-4">Đang tải vai trò...</p>;

//   return (
//     <div className="flex flex-col h-full overflow-hidden">
//       <div className="p-3 border-b bg-gray-50 flex items-center justify-between gap-4">
//         <div className="font-semibold text-base">Vai trò</div>
//         <div className="flex gap-2">
//           <SearchAndSortControls
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             sortKey={sortKey}
//             setSortKey={setSortKey}
//             sortOrder={sortOrder}
//             setSortOrder={setSortOrder}
//           />
//           <Button
//             className="rounded-none cursor-pointer"
//             onClick={handleCreateNew}
//           >
//             Thêm danh vai trò
//           </Button>
//         </div>
//       </div>

//       <div className="flex flex-1 overflow-hidden border-y divide-x">
//         <div className="w-64 bg-gray-50 overflow-y-auto text-sm">
//           {/* {roles.map((role) => (
//             <div
//               key={role.name}
//               onClick={() => handleSelectRole(role)}
//               className={`px-3 py-2 cursor-pointer hover:bg-gray-100 border-b select-none ${
//                 selectedRole?.name === role.name
//                   ? "bg-gray-100 font-medium"
//                   : ""
//               }`}
//             >
//               {role.name}
//             </div>
//           ))} */}
//           {filteredRoles.map((role) => (
//             <div
//               key={role.name}
//               onClick={() => handleSelectRole(role)}
//               className={`px-3 py-2 cursor-pointer hover:bg-gray-100 border-b select-none ${
//                 selectedRole?.name === role.name
//                   ? "bg-gray-100 font-medium"
//                   : ""
//               }`}
//             >
//               {role.name}
//             </div>
//           ))}
//           {/* </div> */}

//           {/* Detail View */}
//           {/* <div className="flex-1 overflow-y-auto text-sm">
//           {selectedRole ? (
//             <div className="p-4 space-y-3">
//               <div className="flex justify-between items-center border-b pb-2">
//                 <h2 className="font-semibold text-base">
//                   Vai trò: {selectedRole.name}
//                 </h2>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setIsModalOpen(true)}
//                 >
//                   Sửa
//                 </Button>
//               </div>

//               <p className="text-muted-foreground">
//                 {selectedRole.description}
//               </p>

//               <div>
//                 <p className="font-medium mb-1">Người tạo / cập nhật:</p>
//                 <p className="text-muted-foreground text-sm">
//                   {selectedRole.createdBy} (
//                   {new Date(selectedRole.createdDate).toLocaleString()})
//                 </p>
//                 <p className="text-muted-foreground text-sm">
//                   {selectedRole.lastModifiedBy} (
//                   {new Date(selectedRole.lastModifiedDate).toLocaleString()})
//                 </p>
//               </div>

//               <div>
//                 <p className="font-medium mb-1">Danh sách quyền hạn:</p>
//                 <ul className="list-disc ml-6 text-muted-foreground space-y-2">
//                   {selectedRole.permissions.map((p) => (
//                     <li key={p.name}>
//                       <div>
//                         <span className="font-medium">{p.name}</span> –{" "}
//                         {p.description}
//                       </div>
//                       <div className="text-xs text-gray-500 ml-2">
//                         Tạo: {p.createdBy} (
//                         {new Date(p.createdDate).toLocaleDateString()}) | Sửa:{" "}
//                         {p.lastModifiedBy} (
//                         {new Date(p.lastModifiedDate).toLocaleDateString()})
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ) : (
//             <div className="p-4 text-muted-foreground">
//               Chọn một vai trò để xem chi tiết
//             </div>
//           )}
//         </div>*/}
//         </div>
//       </div>

//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="max-w-xl w-full">
//           <DialogTitle>
//             {selectedRole ? "Sửa vai trò" : "Tạo vai trò mới"}
//           </DialogTitle>
//           <DialogDescription>
//             {selectedRole
//               ? "Chỉnh sửa thông tin và quyền hạn cho vai trò đã chọn."
//               : "Tạo một vai trò mới và chỉ định quyền hạn cụ thể."}
//           </DialogDescription>

//           <RoleForm
//             role={
//               selectedRole
//                 ? {
//                     name: selectedRole.name,
//                     description: selectedRole.description,
//                     permissions: selectedRole.permissions.map((p) => p.name),
//                   }
//                 : null
//             }
//             onClose={() => {
//               setIsModalOpen(false);
//             }}
//             onUpdateSuccess={(updated) => {
//               const updatedFull = roles.find((r) => r.name === updated.name);
//               if (updatedFull) setSelectedRole(updatedFull);
//             }}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default RoleTab;

"use client";

import SearchAndSortControls from "@/components/searchInput/SearchAndSortControls";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useRoleQuery } from "@/hooks/queries/useRoleQuery";
import useSearchAndSort from "@/hooks/sort/useSearchAndSort";
import type { Role } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import RoleForm from "./RoleForm";

type SortableRoleKey = "name" | "description";

const RoleTab = () => {
  const { data: roles = [] } = useRoleQuery();

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    filteredAndSortedItems: filteredRoles,
  } = useSearchAndSort<Role, SortableRoleKey>(roles, {
    searchKey: "name",
    sortKeys: ["name", "description"],
    initialSortKey: "name",
    initialSortOrder: "asc",
  });

  const handleCreateNew = () => {
    setSelectedRole(null);
    setIsCreateDialogOpen(true);
  };

  const openEditSheet = (role: Role) => {
    setSelectedRole(role);
    setIsEditSheetOpen(true);
  };

  return (
    <div className="p-6">
      {/* Search + Sort + Thêm */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex ml-auto gap-2">
          <SearchAndSortControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <Button onClick={handleCreateNew}>Thêm vai trò</Button>
        </div>
      </div>

      {/* Bảng danh sách vai trò */}
      <table className="min-w-full border border-gray-300 text-sm table-auto [&>tbody>tr>td]:py-4 [&>thead>tr>th]:py-4">
        <thead className="bg-gray-100 text-center border-b border-gray-300">
          <tr>
            <th className="w-48 border-r">Tên</th>
            <th className="border-r">Quyền</th>
            <th className="w-28 border-r">Người tạo</th>
            <th className="w-38 border-r">Ngày tạo</th>
            <th className="w-28 border-r">Cập nhật bởi</th>
            <th className="w-38 border-r">Ngày cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map((role: Role) => (
            <tr
              key={role.name}
              className="text-center border-t border-gray-300 cursor-pointer hover:bg-gray-50"
              onClick={() => openEditSheet(role)}
            >
              <td className="border-r">{role.name}</td>
              <td className="border-r text-left px-2">
                {role.permissions?.map((p) => p.name).join(", ") || "-"}
              </td>
              <td className="border-r">{role.createdBy || "-"}</td>
              <td className="border-r">
                {role.createdDate
                  ? format(new Date(role.createdDate), "dd/MM/yyyy HH:mm")
                  : "-"}
              </td>
              <td className="border-r">{role.lastModifiedBy || "-"}</td>
              <td className="border-r">
                {role.lastModifiedDate
                  ? format(new Date(role.lastModifiedDate), "dd/MM/yyyy HH:mm")
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-xl w-full">
          <DialogTitle>Tạo vai trò mới</DialogTitle>
          <DialogDescription>
            Tạo một vai trò mới và chỉ định quyền hạn cụ thể.
          </DialogDescription>
          <RoleForm
            role={null}
            onClose={() => setIsCreateDialogOpen(false)}
            onUpdateSuccess={() => setIsCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent
          side="right"
          className="w-[480px] h-screen flex flex-col p-4"
        >
          <SheetHeader>
            <SheetTitle>Chỉnh sửa vai trò</SheetTitle>
          </SheetHeader>

          {selectedRole && (
            <RoleForm
              role={{
                name: selectedRole.name,
                description: selectedRole.description,
                permissions: selectedRole.permissions.map((p) => p.name),
              }}
              onClose={() => {
                setIsEditSheetOpen(false);
                setSelectedRole(null);
              }}
              onUpdateSuccess={() => {
                setIsEditSheetOpen(false);
                setSelectedRole(null);
              }}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default RoleTab;

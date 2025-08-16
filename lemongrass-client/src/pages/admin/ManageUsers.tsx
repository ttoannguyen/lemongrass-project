// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { User, Edit, Trash2 } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useAllAccountsQuery } from "@/hooks/queries/useAccountQuery";
// export interface Role {
//   name: string;
//   description: string;
// }

// export interface Account {
//   id: string;
//   email: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   dob?: string;
//   address?: string;
//   inactive: boolean;
//   bio: string;
//   roles: Role[];
//   profilePictureUrl?: string;
//   createdBy: string;
//   createdDate: string;
//   lastModifiedBy: string;
//   lastModifiedDate: string;
//   deleted: boolean;
// }

// const ManageUsers = () => {
//   const [users, setUsers] = useState<Account[]>([]);
//   const [loading, setLoading] = useState(false);
//   const { data: accounts = [], isLoading } = useAllAccountsQuery();
//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-4">Quản lý người dùng</h1>

//       <Card className="p-4 border-none! shadow-0">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Người dùng</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Vai trò</TableHead>
//               <TableHead>Trạng thái</TableHead>
//               <TableHead className="text-right">Thao tác</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {accounts.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell className="flex items-center gap-3">
//                   <Avatar className="h-10 w-10">
//                     <AvatarImage src={user.profilePictureUrl} />
//                     <AvatarFallback>
//                       {user.firstName[0]}
//                       {user.lastName[0]}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <div className="font-medium">
//                       {user.firstName} {user.lastName}
//                     </div>
//                     <div className="text-xs text-muted-foreground">
//                       @{user.username}
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell className="space-x-1">
//                   {user.roles.map((role) => (
//                     <Badge key={role.name} variant="outline">
//                       {role.name}
//                     </Badge>
//                   ))}
//                 </TableCell>
//                 <TableCell>
//                   <Badge
//                     variant={
//                       user.inactive || user.deleted ? "destructive" : "default"
//                     }
//                     className={cn(user.deleted && "line-through")}
//                   >
//                     {user.deleted
//                       ? "Đã xóa"
//                       : user.inactive
//                       ? "Bị khóa"
//                       : "Hoạt động"}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="text-right space-x-2">
//                   <Button size="icon" variant="outline">
//                     <User className="w-4 h-4" />
//                   </Button>
//                   <Button size="icon" variant="outline">
//                     <Edit className="w-4 h-4" />
//                   </Button>
//                   <Button size="icon" variant="destructive">
//                     <Trash2 className="w-4 h-4" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {!users.length && !loading && (
//               <TableRow>
//                 <TableCell
//                   colSpan={5}
//                   className="text-center text-muted-foreground py-10"
//                 >
//                   Không có người dùng nào.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </Card>
//     </div>
//   );
// };

// export default ManageUsers;

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAllAccountsQuery } from "@/hooks/queries/useAccountQuery";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Định nghĩa interface Role và Account không thay đổi
export interface Role {
  name: string;
  description: string;
}

export interface Account {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  dob?: string;
  address?: string;
  inactive: boolean;
  bio: string;
  roles: Role[];
  profilePictureUrl?: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  deleted: boolean;
}

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; userId?: string }>({
    open: false,
  });
  const { data: accounts = [], isLoading } = useAllAccountsQuery();


  // Hàm tìm kiếm
  const filteredUsers = useMemo(() => {
    return accounts.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [accounts, searchTerm]);

  // Phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Xử lý xóa người dùng
  const handleDelete = (userId: string) => {
    setDeleteDialog({ open: true, userId });
  };

  const confirmDelete = () => {
    // Giả lập API call để xóa người dùng
    // Thay thế bằng API thực tế của bạn
    toast({
      title: "Thành công",
      description: `Người dùng với ID ${deleteDialog.userId} đã được xóa.`,
    });
    setDeleteDialog({ open: false });
  };

  // Xử lý chuyển trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>

      {/* Thanh tìm kiếm */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="Tìm kiếm người dùng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card className="p-4 border-none! shadow-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Người dùng</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  Đang tải...
                </TableCell>
              </TableRow>
            ) : currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.profilePictureUrl} />
                      <AvatarFallback>
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        @{user.username}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="space-x-1">
                    {user.roles.map((role) => (
                      <Badge key={role.name} variant="outline">
                        {role.name}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.inactive || user.deleted ? "destructive" : "default"
                      }
                      className={cn(user.deleted && "line-through")}
                    >
                      {user.deleted
                        ? "Đã xóa"
                        : user.inactive
                        ? "Bị khóa"
                        : "Hoạt động"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="icon" variant="outline">
                      <User className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-10"
                >
                  Không tìm thấy người dùng nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <div>
              Hiển thị {indexOfFirstUser + 1}-
              {Math.min(indexOfLastUser, filteredUsers.length)} của{" "}
              {filteredUsers.length} người dùng
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Trước
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Sau
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Dialog xác nhận xóa */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog({ open: false })}
            >
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUsers;
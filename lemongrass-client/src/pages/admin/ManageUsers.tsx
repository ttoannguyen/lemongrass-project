import { useEffect, useState } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { useAllAccountsQuery } from "@/hooks/queries/useAccountQuery";
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
  const [users, setUsers] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: accounts = [], isLoading } = useAllAccountsQuery();
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await getAccounts(); // Gọi API
  //       setUsers(res);
  //     } catch (err) {
  //       console.error("Lỗi khi lấy danh sách người dùng:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Quản lý người dùng</h1>

      <Card className="p-4">
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
            {accounts.map((user) => (
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
                  <Button size="icon" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!users.length && !loading && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-10"
                >
                  Không có người dùng nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ManageUsers;

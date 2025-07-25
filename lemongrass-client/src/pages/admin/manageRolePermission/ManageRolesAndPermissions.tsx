// ManageRolesAndPermissions.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoleTab from "@/components/admin/role/RoleTab";
import PermissionTab from "@/components/admin/permission/PermissionTab";

const ManageRolesAndPermissions = () => {
  return (
    <div className="flex flex-col h-full text-sm">
      <Tabs
        defaultValue="roles"
        className="flex-1 flex flex-col overflow-hidden gap-0"
      >
        <TabsList className="h-12 flex items-stretch">
          <TabsTrigger
            value="roles"
            className="rounded-none px-4 h-full flex items-center justify-center data-[state=active]:bg-black data-[state=active]:text-white cursor-pointer"
          >
            Vai trò
          </TabsTrigger>
          <TabsTrigger
            value="permissions"
            className="rounded-none px-4 h-full flex items-center justify-center  data-[state=active]:bg-black data-[state=active]:text-white cursor-pointer"
          >
            Quyền hạn
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="flex-1 overflow-hidden">
          <RoleTab />
        </TabsContent>
        <TabsContent value="permissions" className="flex-1 overflow-hidden">
          <PermissionTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageRolesAndPermissions;

import StaffSidebar from "@/components/staff/StaffSidebar";
import { Outlet } from "react-router-dom";

const StaffLayout = () => {
  return (
    <div className="flex h-screen">
      <StaffSidebar />
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default StaffLayout;

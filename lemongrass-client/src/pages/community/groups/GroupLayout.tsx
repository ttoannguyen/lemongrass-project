import { Outlet } from "react-router-dom";
import GroupSidebar from "./GroupSidebar";
import GroupHeader from "./GroupHeader";

const GroupLayout = () => {
  return (
    <div className="flex min-h-screen">
      <GroupSidebar />
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <GroupHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default GroupLayout;

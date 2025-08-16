import { NavLink, useParams } from "react-router-dom";

const GroupSidebar = () => {
  const { groupId } = useParams();

  return (
    <div className="w-64 border-r px-4 py-6 space-y-4">
      <h2 className="text-lg font-semibold">Nhóm</h2>
      <ul className="space-y-2 text-sm">
        <li>
          <NavLink
            to={`/community/group/${groupId}`}
            className="hover:underline"
          >
            Trang chính
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/community/group/${groupId}/admin`}
            className="hover:underline"
          >
            Quản lý nhóm
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default GroupSidebar;

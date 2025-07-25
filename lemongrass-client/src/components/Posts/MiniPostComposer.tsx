import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext"; // thêm dòng này
import { CreatePostModal } from "../community/CreatePostModel";
import { Input } from "../ui/input";
import AvataProfile from "../profile/AvataProfile";

export const MiniPostComposer = () => {
  const [open, setOpen] = useState(false);
  const { account } = useAuth();

  if (!account) return null;

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 bg-white p-4 rounded-xl shadow cursor-pointer hover:bg-gray-50"
      >
        <AvataProfile account={account} />
        <div className="flex-1">
          <Input
            readOnly
            placeholder="Bạn đang nghĩ gì?"
            className="cursor-pointer bg-gray-100"
          />
        </div>
      </div>

      {open && <CreatePostModal onClose={() => setOpen(false)} />}
    </>
  );
};

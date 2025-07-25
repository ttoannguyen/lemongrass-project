import { useState } from "react";
import { CreatePostModal } from "./CreatePostModel";
import { useAuth } from "@/contexts/AuthContext";

const PostComposer = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { account } = useAuth();
  console.log(account);

  return (
    <>
      <div
        onClick={handleOpen}
        className="flex items-center gap-3 bg-white rounded-xl shadow px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
      >
        <img
          src={account?.profilePictureUrl || "/src/assets/images/user.png"}
          // alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="text-gray-500">Bạn đang nghĩ gì?</p>
      </div>

      {open && <CreatePostModal onClose={handleClose} />}
    </>
  );
};

export default PostComposer;

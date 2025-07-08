import HeaderProfile from "@/components/Profile/HeaderProfile";
// import { useAuth } from "@/contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useAccountQuery } from "@/hooks/queries/useAccountQuery"; // hook bạn đã viết

const Profile = () => {
  // const { account } = useAuth();
  const { accountId } = useParams<{ accountId: string }>();
  // console.log(accountId, account?.id, accountId === account?.id);
  // const isMe = !accountId || accountId === account?.id;
  const {
    data: fetchedUser,
    isLoading,
    error,
  } = useAccountQuery(accountId || "");

  const userProfile =  fetchedUser;

  if (isLoading) return <div>Đang tải...</div>;
  if (!userProfile) return <div>Không tìm thấy người dùng.</div>;
  if (error) return <div>Lỗi khi tải thông tin người dùng.</div>;

  return (
    <div className="mx-auto md:w-240">
      <HeaderProfile account={userProfile} />
    </div>
  );
};

export default Profile;

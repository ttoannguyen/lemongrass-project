import HeaderProfile from "@/components/Profile/HeaderProfile";
import { useParams } from "react-router-dom";
import { useAccountQuery } from "@/hooks/queries/useAccountQuery";
import { useAuth } from "@/contexts/AuthContext";
import HeartIcon from "@/components/icons/HeartIcon";
const Profile = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const {
    data: fetchedUser,
    isLoading,
    error,
  } = useAccountQuery(accountId || "");

  const account = fetchedUser;

  const { account: currentAccount } = useAuth();

  if (isLoading) return <div>Đang tải...</div>;
  if (!account) return <div>Không tìm thấy người dùng.</div>;
  if (error) return <div>Lỗi khi tải thông tin người dùng.</div>;

  return (
    <div className="mx-auto md:w-240">
      <HeaderProfile account={account} currentUser={currentAccount} />

      {/* SVG được tách ra component */}
      <HeartIcon className="w-6 h-6 border-none " />
    </div>
  );
};

export default Profile;

import HeaderProfile from "@/components/Profile/HeaderProfile";
import { useParams } from "react-router-dom";
import { useAccountQuery } from "@/hooks/queries/useAccountQuery";
const Profile = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const {
    data: fetchedUser,
    isLoading,
    error,
  } = useAccountQuery(accountId || "");

  const account = fetchedUser;

  if (isLoading) return <div>Đang tải...</div>;
  if (!account) return <div>Không tìm thấy người dùng.</div>;
  if (error) return <div>Lỗi khi tải thông tin người dùng.</div>;

  return (
    <div className="mx-auto md:w-240">
      <HeaderProfile account={account} />
    </div>
  );
};

export default Profile;

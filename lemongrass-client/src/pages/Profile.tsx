import HeaderProfile from "@/components/Profile/HeaderProfile";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { account } = useAuth();
  return (
    <div className="mx-auto md:w-240">
      <HeaderProfile account={account} />
    </div>
  );
};

export default Profile;

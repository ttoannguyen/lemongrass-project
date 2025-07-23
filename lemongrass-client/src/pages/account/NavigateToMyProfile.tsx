import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const NavigateToMyProfile = () => {
  const { account: currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/" />;
  return <Navigate to={`/account/${currentUser.id}`} replace />;
};

export default NavigateToMyProfile;

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import { login } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError("");
    try {
      const response = await login(email, password);
      setUser(response.data.user); // Lưu thông tin user vào context
      localStorage.setItem("token", response.data.token); // Lưu token
      navigate("/"); // Chuyển hướng về trang chủ
    } catch (err) {
      setError(
        err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sfpro">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Đăng nhập
        </h2>
        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
        <p className="mt-4 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

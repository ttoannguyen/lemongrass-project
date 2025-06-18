import { LoginForm } from "@/components/login-form";

const Login = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm className="" />
      </div>
    </div>
  );
};

export default Login;

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import loginImage from "@/assets/images/login_.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, type ChangeEvent } from "react";
import { authService } from "@/services/auth.service";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

interface FormData {
  username: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await authService.login(formData);
      const { token, account } = data.result;

      login(token, account);
      console.log(account);

      queryClient.invalidateQueries();

      // Lấy vai trò đầu tiên (hoặc lọc theo ưu tiên nếu cần)
      const primaryRole = account.roles[0]?.name.toUpperCase();

      if (primaryRole === "ADMIN") {
        navigate("/admin");
      } else if (primaryRole === "STAFF") {
        navigate("/staff");
      } else {
        navigate("/");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 mb-10">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Đăng nhập vào Lemongrass
                </p>
              </div>
              {error && (
                <div className="text-destructive text-sm text-center">
                  {error}
                </div>
              )}
              <div className="grid gap-3">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="Tên đăng nhập"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Đang đăng nhập...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
              <div className="text-center text-sm">
                Chưa có tài khoản?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Đăng ký
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={loginImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

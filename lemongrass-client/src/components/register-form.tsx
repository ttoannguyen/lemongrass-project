import { useState, type ChangeEvent, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Step1Form {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Step2Form {
  firstName: string;
  lastName: string;
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [step, setStep] = useState<1 | 2>(1);
  const [step1, setStep1] = useState<Step1Form>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [step2, setStep2] = useState<Step2Form>({
    firstName: "",
    lastName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeStep1 = (e: ChangeEvent<HTMLInputElement>) => {
    setStep1({ ...step1, [e.target.id]: e.target.value });
    setError("");
  };

  const handleChangeStep2 = (e: ChangeEvent<HTMLInputElement>) => {
    setStep2({ ...step2, [e.target.id]: e.target.value });
    setError("");
  };

  const handleNext = () => {
    if (
      !step1.username ||
      !step1.password ||
      !step1.confirmPassword ||
      !step1.email
    ) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (step1.password !== step1.confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!step2.firstName || !step2.lastName) {
      setError("Vui lòng điền đầy đủ thông tin cá nhân.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const payload = {
        username: step1.username,
        password: step1.password,
        email: step1.email,
        firstName: step2.firstName,
        lastName: step2.lastName,
      };

      await authService.register(payload); // gọi API backend Spring để đăng ký
      navigate("/login");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã xảy ra lỗi";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("max-w-md mx-auto", className)} {...props}>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-center">
              {step === 1 ? "Tạo tài khoản" : "Thông tin cá nhân"}
            </h2>

            {error && (
              <div className="text-destructive text-sm text-center">
                {error}
              </div>
            )}

            {step === 1 ? (
              <>
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={step1.username}
                    onChange={handleChangeStep1}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={step1.email}
                    onChange={handleChangeStep1}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    value={step1.password}
                    onChange={handleChangeStep1}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    value={step1.confirmPassword}
                    onChange={handleChangeStep1}
                    required
                  />
                </div>
                <Button type="button" className="w-full" onClick={handleNext}>
                  Tiếp theo
                </Button>
              </>
            ) : (
              <>
                <div className="grid gap-3">
                  <Label htmlFor="firstName">Họ và tên</Label>
                  <Input
                    id="firstName"
                    value={step2.firstName}
                    onChange={handleChangeStep2}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="lastName">Email</Label>
                  <Input
                    id="lastName"
                    value={step2.lastName}
                    onChange={handleChangeStep2}
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Đang đăng ký...
                    </>
                  ) : (
                    "Đăng ký"
                  )}
                </Button>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

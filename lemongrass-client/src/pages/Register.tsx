import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link } from "react-router-dom";

const schema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Username must contain only letters and numbers"
      ),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: RegisterFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg space-y-6"
    >
      <h1 className="text-2xl font-bold text-center text-secondary">
        Register
      </h1>

      {/* Username */}
      <div>
        <label className="block font-medium text-secondary">
          Username
          <input
            type="text"
            {...register("username")}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </label>
        {touchedFields.username && errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block font-medium text-secondary">
          Email
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </label>
        {touchedFields.email && errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block font-medium text-secondary">
          Password
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </label>
        {touchedFields.password && errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block font-medium text-secondary">
          Confirm Password
          <input
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </label>
        {touchedFields.confirmPassword && errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Show Password Checkbox */}
      <div className="flex items-center ">
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={(e) => setShowPassword(e.target.checked)}
          className="h-4 w-4 border-secondary border-1 rounded"
        />
        <label htmlFor="showPassword" className="text-sm pl-2 text-secondary">
          Show password
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Register
      </button>
      <p>
        You already have a account?{" "}
        <Link to={"/login"} className="text-green-500 underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;

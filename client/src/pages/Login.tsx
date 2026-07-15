import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";

import { loginSchema } from "../validators/auth.validator";
import type { LoginSchema } from "../validators/auth.validator";
import { login } from "../services/auth.service";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await login(data);

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] rounded-xl bg-white p-8 shadow-xl"
      >
        <h1 className="mb-2 text-center text-4xl font-bold text-blue-600">
          FinSight
        </h1>

        <p className="mb-8 text-center text-gray-500">
          AI Investment Research Platform
        </p>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="mb-2 w-full rounded-lg border p-3"
        />

        {errors.email && (
          <p className="mb-3 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="mb-2 w-full rounded-lg border p-3"
        />

        {errors.password && (
          <p className="mb-4 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}

        <button
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="mt-5 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
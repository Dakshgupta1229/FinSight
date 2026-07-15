import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import {
  registerSchema,
  type RegisterSchema,
} from "../validators/auth.validator";

import { register as registerUser } from "../services/auth.service";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await registerUser(data);

      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[420px] rounded-xl bg-white p-8 shadow-xl"
      >
        <h1 className="mb-2 text-center text-4xl font-bold text-blue-600">
          FinSight
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Create your account
        </p>

        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="mb-2 w-full rounded-lg border border-gray-300 p-3 text-black placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
        />

        {errors.name && (
          <p className="mb-3 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="mb-2 w-full rounded-lg border border-gray-300 p-3 text-black placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
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
          className="mb-2 w-full rounded-lg border border-gray-300 p-3 text-black placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
        />

        {errors.password && (
          <p className="mb-4 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Creating Account..." : "Register"}
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-blue-600"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
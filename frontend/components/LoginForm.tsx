"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFormValues, loginSchema } from "@/app/schemas/auth.schema";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error("Error en el inicio de sesión");
      } else {
        localStorage.setItem("token", result.token);
        router.push("/dashboard");
      }

      // console.log("Datos válidos:", data);
    } catch (_err) {
      setError("Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* EMAIL */}
      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* ERROR DEL SERVIDOR */}
      {error && <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>}

      <button type="submit" disabled={isSubmitting || loading}>
        {isSubmitting || loading ? "Ingresando..." : "Login"}
      </button>
    </form>
  );
}
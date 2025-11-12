"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Input } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/store";

//  Define and validate the login form inputs.
const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginInput = z.infer<typeof LoginSchema>;

export default function SigninForm() {
  // Configure React Hook Form with Zod validation.
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();
  const { login } = useAuthStore();

  // Hold feedback messages for the user.
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //  Call our Next.js API route with the form data.
  const onLogin: SubmitHandler<LoginInput> = async ({ email, password }) => {
    try {
      setServerError("");
      setSuccessMessage("");

      const response = await axios.post("/api/auth/login", { email, password });

      // Update auth store with login state
      const token = response.data.token || "authenticated"; // Use token if available, otherwise placeholder
      login(token, email);

      setSuccessMessage("Login successful! Taking you to the dashboard…");
      reset();

      //  Redirect after a short delay so the message is visible.
      setTimeout(() => router.push("/profile"), 800);
    } catch (error: any) {
      console.error("Login failed", error);
      setServerError(
        error?.response?.data?.error ||
          "Sorry, we could not log you in. Please try again."
      );
    }
  };

  return (
    <div className=" flex items-center justify-center px-4">
      <div className="bg-card dark:bg-card w-full max-w-md rounded-2xl  p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-[#5751E1]">
          {isSubmitting ? "Processing..." : "Welcome Back"}
        </h1>
        <p className="text-gray-500 text-center mb-6">Login to your account</p>

        {/*  Display messages returned from the API. */}
        {serverError && (
          <p className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600">
            {serverError}
          </p>
        )}
        {successMessage && (
          <p className="mb-4 rounded-md bg-green-100 p-3 text-sm text-green-600">
            {successMessage}
          </p>
        )}

        <form
          className="space-y-5 "
          onSubmit={handleSubmit(onLogin)}
          autoComplete="off"
        >
          {/*  Collect the email address. */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Email"
                id="email"
                type="email"
                placeholder="you@example.com"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              />
            )}
          />

          {/*  Collect the password. */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Password"
                id="password"
                type="password"
                placeholder="••••••••"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#5751E1] text-white rounded-full font-medium"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-[#5751E1] hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

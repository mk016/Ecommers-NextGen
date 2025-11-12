"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@heroui/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

//  Validate the form inputs on the client side with Zod.
const SignupSchema = z
  .object({
    username: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    // check?????
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function SignupPage() {
  //  Set up React Hook Form with our validation schema.
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
  });

  //  Track server-side messages in component state.
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  //  Send the validated data to our API route.
  const onSignup: SubmitHandler<FormInput> = async ({
    username,
    email,
    password,
  }) => {
    try {
      setServerError("");
      setSuccessMessage("");

      await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });

      setSuccessMessage("Account created successfully! Redirecting to login…");

      //  Clear the form after a successful response.
      reset();

      //  Redirect the user to the login page after a short delay.
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      console.error("Signup failed", error);
      setServerError(
        error?.response?.data?.error ||
          "Sorry, something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-card dark:bg-card w-full max-w-md rounded-2xl  p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-[#5751E1]">
          {isSubmitting ? "Processing..." : "Create your account"}
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Sign up for a new account
        </p>

        {/*  Show success or error messages to the user. */}
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
          className="space-y-5"
          onSubmit={handleSubmit(onSignup)}
          autoComplete="off"
        >
          {/*  Collect the user's name. */}
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Username"
                id="username"
                type="text"
                placeholder="Your username"
                isInvalid={!!errors.username}
                errorMessage={errors.username?.message}
              />
            )}
          />

          {/*  Collect the user's email address. */}
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

          {/*  Collect the user's password. */}
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

          {/*  Confirm the password to reduce typos. */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#5751E1] text-white rounded-full font-medium"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#5751E1] hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

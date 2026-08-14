import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlertCircle,
  GraduationCap,
  Lock,
  Mail,
} from "lucide-react";

import { useAppDispatch } from "../hooks";
import { setCredentials } from "../store/slices/authSlice";
import authService from "../services/authService";

// ========================================
// Validation Schema
// ========================================

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// ========================================
// Login Component
// ========================================

function Login() {
  const dispatch = useAppDispatch();

  const [loginError, setLoginError] = useState("");

  // ========================================
  // React Hook Form
  // ========================================

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ========================================
  // Submit Handler
  // ========================================

  const onSubmit = async (data) => {
    try {
      // Clear previous error
      setLoginError("");

      // Call login API
      const response = await authService.login(data);

      // Save credentials in Redux
      dispatch(
        setCredentials({
          user: response.user,
          token: response.token,
        })
      );

      // Save token
      localStorage.setItem("token", response.token);

      console.log("Login successful:", response);
    } catch (error) {
      console.error("Login failed:", error);

      // Backend responded
      if (error.response) {
        setLoginError(
          error.response.data?.message ||
            "Login failed. Please check your credentials."
        );
      }

      // Request was sent but server didn't respond
      else if (error.request) {
        setLoginError(
          "Unable to connect to the server. Please try again later."
        );
      }

      // Something else went wrong
      else {
        setLoginError(
          "Something went wrong. Please try again."
        );
      }
    }
  };

  // ========================================
  // UI
  // ========================================

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen items-center justify-center px-4 py-8">

        <div className="w-full max-w-md">

          {/* ==================================
              Logo
          ================================== */}

          <div className="mb-8 flex flex-col items-center text-center">

            <div
              className="
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-xl
                bg-primary
              "
            >
              <GraduationCap className="h-7 w-7 text-white" />
            </div>

            <h1 className="text-2xl font-bold text-text">
              Bootcamp LMS
            </h1>

            <p className="mt-2 text-sm text-text-muted">
              Sign in to continue to your learning dashboard
            </p>

          </div>

          {/* ==================================
              Login Card
          ================================== */}

          <div
            className="
              rounded-2xl
              border
              border-border
              bg-surface
              p-6
              shadow-sm
              sm:p-8
            "
          >

            {/* Card Header */}

            <div className="mb-6">

              <h2 className="text-xl font-semibold text-text">
                Welcome back
              </h2>

              <p className="mt-1 text-sm text-text-muted">
                Enter your credentials to continue.
              </p>

            </div>

            {/* ==================================
                Login Error
            ================================== */}

            {loginError && (
              <div
                className="
                  mb-5
                  flex
                  items-start
                  gap-3
                  rounded-lg
                  border
                  border-danger/20
                  bg-danger/10
                  px-4
                  py-3
                  text-sm
                  text-danger
                "
              >
                <AlertCircle
                  className="
                    mt-0.5
                    h-5
                    w-5
                    shrink-0
                  "
                />

                <p>{loginError}</p>
              </div>
            )}

            {/* ==================================
                Login Form
            ================================== */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* ==================================
                  Email
              ================================== */}

              <div>

                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-text
                  "
                >
                  Email
                </label>

                <div className="relative">

                  <Mail
                    className="
                      pointer-events-none
                      absolute
                      left-3
                      top-1/2
                      h-5
                      w-5
                      -translate-y-1/2
                      text-text-muted
                    "
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    {...register("email")}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-border
                      bg-surface
                      py-2.5
                      pl-10
                      pr-3
                      text-sm
                      text-text
                      outline-none
                      transition
                      placeholder:text-text-muted
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  />

                </div>

                {/* Email Error */}

                {errors.email && (
                  <p className="mt-1.5 text-xs text-danger">
                    {errors.email.message}
                  </p>
                )}

              </div>

              {/* ==================================
                  Password
              ================================== */}

              <div>

                <label
                  htmlFor="password"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-text
                  "
                >
                  Password
                </label>

                <div className="relative">

                  <Lock
                    className="
                      pointer-events-none
                      absolute
                      left-3
                      top-1/2
                      h-5
                      w-5
                      -translate-y-1/2
                      text-text-muted
                    "
                  />

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...register("password")}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-border
                      bg-surface
                      py-2.5
                      pl-10
                      pr-3
                      text-sm
                      text-text
                      outline-none
                      transition
                      placeholder:text-text-muted
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  />

                </div>

                {/* Password Error */}

                {errors.password && (
                  <p className="mt-1.5 text-xs text-danger">
                    {errors.password.message}
                  </p>
                )}

              </div>

              {/* ==================================
                  Remember Me / Forgot Password
              ================================== */}

              <div className="flex items-center justify-between">

                <label
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-2
                  "
                >

                  <input
                    type="checkbox"
                    className="
                      h-4
                      w-4
                      rounded
                      border-border
                      text-primary
                      focus:ring-primary
                    "
                  />

                  <span className="text-sm text-text-muted">
                    Remember me
                  </span>

                </label>

                <button
                  type="button"
                  className="
                    text-sm
                    font-medium
                    text-primary
                    hover:underline
                  "
                >
                  Forgot password?
                </button>

              </div>

              {/* ==================================
                  Submit Button
              ================================== */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-primary
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-primary/90
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary/20
                  focus:ring-offset-2
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />

                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

            </form>

          </div>

          {/* ==================================
              Footer
          ================================== */}

          <p className="mt-6 text-center text-xs text-text-muted">
            © 2026 Bootcamp LMS. All rights reserved.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck,
} from "lucide-react";

import { useAppDispatch } from "../../hooks";
import { setCredentials } from "../../store/slices/authSlice";
import authService from "../../services/authService";
import BrandLogo from "../../components/common/BrandLogo";
import bannerImg from "../../assets/images/banner.png";

// ========================================
// Validation Schema
// ========================================

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Username or email is required"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'create'

  const from = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoginError("");

      const response = await authService.login(data);

      const token = response.token || response.data?.token;
      const user = response.user || response.data?.user;

      if (!token || !user) {
        setLoginError("Invalid authentication response from server.");
        return;
      }

      localStorage.setItem("token", token);

      dispatch(
        setCredentials({
          user,
          token,
        })
      );

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);

      if (error.response) {
        setLoginError(
          error.response.data?.message ||
            "Login failed. Please check your credentials."
        );
      } else if (error.request) {
        setLoginError(
          "Unable to connect to the server. Please check your backend connection."
        );
      } else {
        setLoginError("Something went wrong. Please try again.");
      }
    }
  };

  const handleAdminQuickFill = () => {
    setValue("email", "admin@example.com");
    setValue("password", "admin1234");
    setLoginError("");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8F9FA]">
      {/* =========================================================
          Left Column: Perfectly Scaled SMIT LMS Banner
      ========================================================= */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 relative h-full bg-[#EDF4FC] p-4 lg:p-6 items-center justify-center overflow-hidden">
        <div className="relative flex h-full w-full items-center justify-center">
          <img
            src={bannerImg}
            alt="Saylani Mass IT Training Bootcamp LMS Banner"
            className="max-h-full max-w-full h-auto w-auto object-contain rounded-2xl shadow-xl border border-white/80 transition-all duration-300"
          />
        </div>
      </div>

      {/* =========================================================
          Right Column: Account Access Form Panel
      ========================================================= */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2 xl:w-5/12 overflow-y-auto">
        <div className="w-full max-w-md space-y-7 py-6">
          {/* SMIT Brand Logo */}
          <div>
            <BrandLogo size="lg" />
          </div>

          {/* Header */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
              ACCOUNT ACCESS
            </span>
            <h2 className="mt-1 font-serif text-3xl font-bold text-text">
              Welcome back
            </h2>
          </div>

          {/* Mode Tabs */}
          <div className="flex border-b border-border text-sm font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`pb-3 transition ${
                activeTab === "login"
                  ? "border-b-2 border-primary text-primary"
                  : "text-text-muted hover:text-text"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("create")}
              className={`ml-8 pb-3 transition ${
                activeTab === "create"
                  ? "border-b-2 border-primary text-primary"
                  : "text-text-muted hover:text-text"
              }`}
            >
              Create Password
            </button>
          </div>

          {activeTab === "create" ? (
            <div className="rounded-xl border border-border bg-white p-6 text-center shadow-sm space-y-3">
              <p className="text-sm text-text">
                Password setup links are issued by your campus administrator. Please contact your campus office to receive your credentials.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Return to Login
              </button>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Error Alert */}
              {loginError && (
                <div className="flex items-start gap-3 rounded-lg border border-danger/20 bg-danger/10 p-4 text-xs font-medium text-danger">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{loginError}</p>
                </div>
              )}

              {/* Username / Email Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-text"
                  >
                    Username or Email
                  </label>
                  <span className="text-[11px] font-semibold text-emerald-600">
                    Required
                  </span>
                </div>

                <input
                  id="email"
                  type="text"
                  placeholder="Enter your username or email"
                  autoComplete="username"
                  {...register("email")}
                  className="w-full border-b border-border bg-transparent py-2.5 text-sm text-text outline-none transition focus:border-primary placeholder:text-text-muted/60"
                />

                <p className="mt-1.5 text-[11px] text-text-muted">
                  Issued by your campus admin.
                </p>

                {errors.email && (
                  <p className="mt-1 text-xs text-danger">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold text-text"
                  >
                    Password
                  </label>
                  <span className="text-[11px] font-semibold text-emerald-600">
                    Required
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...register("password")}
                    className="w-full border-b border-border bg-transparent py-2.5 pr-10 text-sm text-text outline-none transition focus:border-primary placeholder:text-text-muted/60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs text-danger">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-primary py-3.5 text-sm font-semibold text-white transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60 shadow-md"
              >
                {isSubmitting ? "Logging in to portal..." : "Log in to portal"}
              </button>

              {/* Divider */}
              <div className="relative my-3 flex items-center justify-center">
                <div className="w-full border-t border-border" />
                <span className="absolute bg-[#F8F9FA] px-3 text-[10px] font-bold text-text-muted">
                  OR
                </span>
              </div>

              {/* Admin Quick Fill Button */}
              <button
                type="button"
                onClick={handleAdminQuickFill}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-white py-3 text-xs font-semibold text-text shadow-sm transition hover:bg-gray-50"
              >
                <UserCheck className="h-4 w-4 text-primary" />
                <span>Fill Admin Demo Credentials</span>
              </button>
            </form>
          )}

          {/* Footer help */}
          <div className="pt-2 text-center text-xs text-text-muted">
            Trouble signing in?{" "}
            <a
              href="mailto:support@saylaniwelfare.com"
              className="font-semibold text-primary hover:underline"
            >
              Contact your campus office
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
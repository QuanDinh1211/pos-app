"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/UserContext";

const page = () => {
  const { login } = useAuth();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!loginForm.username || !loginForm.password) {
      toast.error("Vui lòng nhập tài khoản và mật khẩu");
      return;
    }

    setLoading(true);

    try {
      const success = await login(loginForm.username, loginForm.password);

      if (success) {
        toast.success("Đăng nhập thành công!");
        router.push("/");
      } else {
        toast.error("Tài khoản hoặc mật khẩu không chính xác");
      }
    } catch (err) {
      toast.error("Đăng nhập thất bại. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="relative z-10 w-full max-w-[440px] px-gutter">
        <div className="bg-surface-container-lowest rounded-lg p-lg shadow-[0px_20px_40px_rgba(0,0,0,0.05)] border border-surface-variant/30 flex flex-col items-center">
          {/* <!-- Brand Logo --> */}
          <div className="mb-lg flex flex-col items-center gap-sm">
            <img
              alt="Icey POS Logo"
              className="w-24 h-24 object-contain"
              src="/image/logo.png"
            />
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
              ICEY POS
            </h1>
            <p className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-widest">
              Store Management
            </p>
          </div>
          {/* <!-- Login Form --> */}
          <form className="w-full space-y-md" onSubmit={handleSubmit}>
            {/* <!-- Username/Email Field --> */}
            <div className="space-y-xs">
              <label
                className="font-label-lg text-label-lg text-on-surface-variant ml-sm"
                htmlFor="username"
              >
                Email or Username
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-secondary">
                  person
                </span>
                <input
                  className="w-full h-touch-target-min pl-12 pr-4 bg-surface-container border-2 border-transparent rounded-lg focus:border-secondary focus:ring-0 transition-all font-body-md text-on-surface outline-none placeholder:text-on-surface-variant/50"
                  id="username"
                  name="username"
                  placeholder="manager@iceypos.com"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
                  disabled={loading}
                  required
                />
              </div>
            </div>
            {/* <!-- Password Field --> */}
            <div className="space-y-xs">
              <label
                className="font-label-lg text-label-lg text-on-surface-variant ml-sm"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-secondary">
                  lock
                </span>
                <input
                  className="w-full h-touch-target-min pl-12 pr-12 bg-surface-container border-2 border-transparent rounded-lg focus:border-secondary focus:ring-0 transition-all font-body-md text-on-surface outline-none placeholder:text-on-surface-variant/50"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  disabled={loading}
                  required
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
            {/* <!-- Action Items --> */}
            <div className="flex justify-end pt-xs">
              <a
                className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            {/* <!-- Primary Button --> */}
            <button
              className="button-press w-full h-touch-target-min bg-primary-container text-on-primary-container font-headline-md text-headline-md rounded-lg shadow-sm hover:shadow-md hover:bg-primary-container/90 transition-all flex items-center justify-center gap-2 mt-md disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-on-primary-container border-t-transparent"></span>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </form>
          {/* <!-- Footer Info --> */}
          <div className="mt-xl flex flex-col items-center gap-sm">
            <p className="font-body-md text-body-md text-on-surface-variant/70 text-center px-md">
              Welcome back! Please enter your credentials to access the
              terminal.
            </p>
            <div className="flex gap-md mt-sm">
              <button className="flex items-center gap-1 font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  help
                </span>
                Support
              </button>
              <button className="flex items-center gap-1 font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  language
                </span>
                English (US)
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;

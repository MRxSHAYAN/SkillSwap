import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  KeyRound,
  ArrowLeft,
  Mail,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Send OTP, 2: Reset Password, 3: Success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [otpSentMessage, setOtpSentMessage] = useState("");

  // ─── Step 1: Send OTP ─────────────────────────────────────────────────────
  const handleSendOtp = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setOtpSentMessage("");
    setIsSendingOtp(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send OTP. Please try again.");
        return;
      }

      setIsOtpSent(true);
      setOtpSentMessage("OTP sent! Check your email inbox (or server console in dev mode).");
    } catch (err) {
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Allow resend by resetting OTP state
  const handleResendOtp = () => {
    setIsOtpSent(false);
    setOtp("");
    setOtpSentMessage("");
    setError("");
    handleSendOtp();
  };

  // ─── Step 1 Submit: Proceed to Step 2 ─────────────────────────────────────
  const handleProceedToReset = (e) => {
    e.preventDefault();

    if (!isOtpSent) {
      setError("Please click 'Send OTP' to receive your verification code.");
      return;
    }
    if (!otp || otp.trim().length < 6) {
      setError("Please enter the complete 6-digit OTP code.");
      return;
    }

    setError("");
    setStep(2);
  };

  // ─── Step 2 Submit: Reset Password ────────────────────────────────────────
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please check and try again.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Password reset failed. Please try again.");
        // If OTP is invalid/expired, go back to step 1
        if (res.status === 400 || res.status === 404) {
          setStep(1);
          setIsOtpSent(false);
          setOtp("");
          setOtpSentMessage("");
        }
        return;
      }

      // Success! Navigate to login with a success notification
      navigate("/login", {
        state: {
          successMessage: "Password reset successfully! Please sign in with your new password.",
        },
      });
    } catch (err) {
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Step indicator ───────────────────────────────────────────────────────
  const StepDot = ({ num }) => (
    <div
      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
        step >= num
          ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
          : "bg-slate-200 text-slate-400"
      }`}
    >
      {step > num ? <CheckCircle2 size={14} /> : num}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 flex flex-col justify-center items-center px-4 py-12">
      {/* Background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-200/20 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/60 p-6 sm:p-8 space-y-6 relative z-10">

        {/* Top Icon Badge */}
        <div className="flex flex-col items-center gap-3">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
              step === 3
                ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                : "bg-blue-50 border-blue-100 text-blue-600"
            }`}
          >
            {step === 3 ? <CheckCircle2 size={28} /> : <KeyRound size={26} />}
          </div>

          {/* Step indicator */}
          {step !== 3 && (
            <div className="flex items-center gap-2">
              <StepDot num={1} />
              <div className={`h-0.5 w-8 transition-all ${step >= 2 ? "bg-blue-600" : "bg-slate-200"}`} />
              <StepDot num={2} />
            </div>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-[fadeIn_0.3s_ease]">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* OTP Sent Success Banner */}
        {otpSentMessage && !error && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium animate-[fadeIn_0.3s_ease]">
            <CheckCircle2 size={15} className="shrink-0 mt-0.5" />
            <span>{otpSentMessage}</span>
          </div>
        )}

        {/* ── STEP 1: Send OTP + Enter Code ── */}
        {step === 1 && (
          <>
            <div className="text-center space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Reset Your Password
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Enter your email to receive a one-time verification code.
              </p>
            </div>

            <form onSubmit={handleProceedToReset} className="space-y-4">
              {/* Email field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail size={15} className="absolute left-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    id="fp-email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    disabled={isOtpSent && !isSendingOtp}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-28 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60 transition-all"
                  />
                  {/* Send / Resend OTP button inside input */}
                  {!isOtpSent ? (
                    <button
                      type="button"
                      id="btn-send-otp"
                      onClick={handleSendOtp}
                      disabled={isSendingOtp}
                      className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 text-white text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {isSendingOtp ? (
                        <>
                          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending
                        </>
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      id="btn-resend-otp"
                      onClick={handleResendOtp}
                      disabled={isSendingOtp}
                      className="absolute right-1.5 px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <RefreshCw size={11} />
                      Resend
                    </button>
                  )}
                </div>
              </div>

              {/* OTP field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    6-Digit OTP Code
                  </label>
                  {!isOtpSent && (
                    <span className="text-[11px] text-slate-400">
                      Click "Send OTP" first
                    </span>
                  )}
                </div>
                <div className="relative">
                  <ShieldCheck size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    id="fp-otp"
                    maxLength={6}
                    value={otp}
                    disabled={!isOtpSent}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setOtp(val);
                      if (error) setError("");
                    }}
                    placeholder={isOtpSent ? "Enter 6-digit code" : "———"}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all tracking-[0.3em] font-mono"
                  />
                  {otp.length === 6 && (
                    <CheckCircle2 size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                  )}
                </div>
              </div>

              <button
                type="submit"
                id="btn-verify-otp"
                disabled={!isOtpSent || otp.length < 6}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Verify Code & Continue</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </>
        )}

        {/* ── STEP 2: Set New Password ── */}
        {step === 2 && (
          <>
            <div className="text-center space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Create New Password
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                OTP verified for <span className="font-semibold text-blue-600">{email}</span>. Set your new password.
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  New Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="fp-new-password"
                    required
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {/* Password strength hint */}
                {newPassword.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          newPassword.length >= i * 3
                            ? newPassword.length >= 12
                              ? "bg-emerald-500"
                              : newPassword.length >= 8
                              ? "bg-amber-400"
                              : "bg-red-400"
                            : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="fp-confirm-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Repeat your new password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 transition-all ${
                      confirmPassword && newPassword !== confirmPassword
                        ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400/20"
                        : confirmPassword && newPassword === confirmPassword
                        ? "border-emerald-400 focus:border-emerald-400 focus:ring-emerald-400/20"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {confirmPassword && (
                  <p className={`text-[11px] font-medium mt-0.5 ${
                    newPassword === confirmPassword ? "text-emerald-600" : "text-rose-600"
                  }`}>
                    {newPassword === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  id="btn-back-to-step1"
                  onClick={() => {
                    setStep(1);
                    setError("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="flex-shrink-0 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft size={14} />
                  Back
                </button>

                <button
                  type="submit"
                  id="btn-reset-password"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          </>
        )}

        {/* ── STEP 3: Success ── (fallback, normally redirected) */}
        {step === 3 && (
          <div className="text-center space-y-4 py-2">
            <h2 className="text-lg font-bold text-slate-900">Password Changed!</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Your password has been successfully updated. You can now log in with your new password.
            </p>
            <a
              href="/login"
              id="btn-go-to-login"
              className="inline-block w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-md shadow-blue-500/20"
            >
              Sign In Now
            </a>
          </div>
        )}

        {/* Back to Login link */}
        {step !== 3 && (
          <div className="pt-4 border-t border-slate-100 text-center">
            <a
              href="/login"
              id="link-back-to-login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Sign In</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
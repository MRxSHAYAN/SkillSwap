import React, { useState } from "react";
import { KeyRound, ArrowLeft, Mail, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email & OTP, 2: New Password, 3: Success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  // Handle "Send OTP" inside the input field
  const handleSendOtp = () => {
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address first.");
      return;
    }
    setError("");
    setIsSendingOtp(true);

    // Simulate API call to send OTP
    setTimeout(() => {
      setIsSendingOtp(false);
      setIsOtpSent(true);
    }, 1200);
  };

  // Handle Step 1 Submit (Verifying OTP)
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      setError("Please click 'Send OTP' first.");
      return;
    }
    if (otp.length < 6) {
      setError("Please enter a valid 6-digit OTP code.");
      return;
    }

    setError("");
    setIsVerifying(true);

    // Simulate API verification
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2); // Move to Set New Password step
    }, 1000);
  };

  // Handle Step 2 Submit (Password Reset)
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    setIsVerifying(true);

    // Simulate API password update
    setTimeout(() => {
      setIsVerifying(false);
      setStep(3); // Success Screen
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
        
        {/* Top Icon Badge */}
        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mx-auto">
          {step === 3 ? <CheckCircle2 size={24} className="text-emerald-600" /> : <KeyRound size={22} />}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
            {error}
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <>
            <div className="text-center space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Reset Password
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Enter your email to receive a verification code.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail
                    size={16}
                    className="absolute left-3.5 text-slate-400"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp || isOtpSent}
                    className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-500 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    {isSendingOtp ? "Sending..." : isOtpSent ? "Sent ✓" : "Send OTP"}
                  </button>
                </div>
              </div>
    
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Enter 6-Digit OTP
                </label>
                <div className="relative">
                  <ShieldCheck
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    disabled={!isOtpSent}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="e.g. 123456"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 disabled:opacity-50 transition-all tracking-widest font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying || !isOtpSent}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer flex items-center justify-center"
              >
                {isVerifying ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Verify Code & Continue"
                )}
              </button>
            </form>
          </>
        )}

        {/* Step 2*/}
        {step === 2 && (
          <>
            <div className="text-center space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Create New Password
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Please enter and confirm your new password.
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-2xs cursor-pointer flex items-center justify-center"
              >
                {isVerifying ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </>
        )}

        {/* Step 3*/}
        {step === 3 && (
          <div className="text-center space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Password Changed!</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Your password has been successfully updated. You can now log in with your new password.
            </p>
            <a
              href="/login"
              className="inline-block w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-2xs"
            >
              Sign In Now
            </a>
          </div>
        )}

        {/* Back to Login Link */}
        {step !== 3 && (
          <div className="pt-4 border-t border-slate-100 text-center">
            <a
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Sign In</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Mail, ShieldCheck, Lock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../../../components/common/button.jsx";
import { Input } from "../../../components/common/input.jsx";
import { Card } from "../../../components/common/card.jsx";

export default function ForgotPasswordForm({ onSwitchMode }) {
  // --- STEPS: 'REQUEST', 'VERIFY', 'RESET' ---
  const [step, setStep] = useState('REQUEST');
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Refs for OTP auto-focus
  const otpRefs = useRef([]);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordsMatch = confirmPassword.length > 0 && newPassword === confirmPassword;
  const isOtpComplete = otp.every(digit => digit !== '');

  // OTP Change Handler
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  // OTP Backspace Handler
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleRequestOtp = (e) => {
    e.preventDefault();
    // TODO: Connect to backend /auth/forgot-password
    console.log("Requesting OTP for:", email);
    setStep('VERIFY');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // TODO: Connect to backend /auth/verify-otp (or just save it locally)
    console.log("Verifying OTP:", otp.join(''));
    setStep('RESET');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // TODO: Connect to backend /auth/reset-password
    console.log("Resetting password...");
    onSwitchMode('login');
  };

  return (
    <Card
      variant="dark"
      hoverable={false}
      className="w-full max-w-md rounded-2xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {step === 'REQUEST' && "Forgot Password?"}
          {step === 'VERIFY' && "Check your Email"}
          {step === 'RESET' && "New Password"}
        </h1>
        <p className="mt-1 text-sm text-slate-400 font-medium">
          {step === 'REQUEST' && "No worries, we'll send you reset instructions."}
          {step === 'VERIFY' && `We sent a 6-digit code to ${email}`}
          {step === 'RESET' && "Please choose a strong new password."}
        </p>
      </div>

      <form className="space-y-6">
        {/* STEP 1: EMAIL REQUEST */}
        {step === 'REQUEST' && (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <Input
                  id="forgot-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="dark"
                  icon={<Mail className="w-4 h-4" />}
                />
              </div>
            </div>
            <Button
              disabled={!isEmailValid}
              onClick={handleRequestOtp}
              className={`w-full h-11 text-sm font-bold tracking-wide rounded-2xl transition-all ${
                isEmailValid ? "bg-[#ff8c42] text-white hover:bg-[#e67e3b]" : "bg-slate-800 text-white/40 cursor-not-allowed opacity-50"
              }`}
            >
              Send OTP Code
            </Button>
          </div>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === 'VERIFY' && (
          <div className="space-y-6">
            <div className="flex justify-between gap-2">
              {otp.map((digit, i) => (
                  <Input
                    id={`otp-digit-${i}`}
                    name={`otp-digit-${i}`}
                    ref={(el) => (otpRefs.current[i] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    variant="dark"
                    containerClassName="w-12 h-12"
                    className="text-center text-xl font-bold px-0 focus:shadow-[0_0_0_2px_#4db8ff,0_0_15px_rgba(77,184,255,0.4)]"
                    autoComplete="one-time-code"
                  />
              ))}
            </div>
            <div className="space-y-3">
              <Button
                disabled={!isOtpComplete}
                onClick={handleVerifyOtp}
                className={`w-full h-11 text-sm font-bold tracking-wide rounded-2xl transition-all ${
                  isOtpComplete ? "bg-[#ff8c42] text-white hover:bg-[#e67e3b]" : "bg-slate-800 text-white/40 opacity-50"
                }`}
              >
                Verify Code
              </Button>
              <button 
                type="button"
                onClick={() => setStep('REQUEST')}
                className="w-full text-center text-xs font-bold text-slate-500 hover:text-white transition-colors"
                style={{ padding: '0.5rem' }}
              >
                Wait, I entered the wrong email
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === 'RESET' && (
          <div className="space-y-5">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    id="new-password"
                    name="new-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Minimal 8 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    variant="dark"
                    icon={<Lock className="w-4 h-4" />}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    id="confirm-new-password"
                    name="confirm-new-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="dark"
                    icon={<Lock className="w-4 h-4" />}
                  />
                </div>
                {isPasswordsMatch && (
                  <p className="mt-2 text-xs text-emerald-500 flex items-center gap-1 font-bold">
                    <CheckCircle size={12} /> Passwords match perfectly
                  </p>
                )}
              </div>
            </div>
            <Button
              disabled={!isPasswordsMatch || newPassword.length < 8}
              onClick={handleResetPassword}
              className={`w-full h-11 text-sm font-bold tracking-wide rounded-2xl transition-all ${
                isPasswordsMatch && newPassword.length >= 8 
                  ? "bg-[#ff8c42] text-white hover:bg-[#e67e3b]" 
                  : "bg-slate-800 text-white/40 opacity-50"
              }`}
            >
              Reset Password
            </Button>
          </div>
        )}

        {/* Back to Login */}
        <div className="pt-4 text-center">
          <button
            type="button"
            onClick={() => onSwitchMode('login')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#ff8c42] hover:text-[#e67e3b] hover:underline underline-offset-2 transition-all duration-300"
          >
            <ArrowLeft size={14} /> Back to Sign In
          </button>
        </div>
      </form>
    </Card>
  );
}

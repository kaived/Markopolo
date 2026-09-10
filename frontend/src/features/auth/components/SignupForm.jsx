import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "../../../components/common/button.jsx";
import { Input } from "../../../components/common/input.jsx";
import { Card } from "../../../components/common/card.jsx";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

// Assets are now in public/icons/ (no import needed)
const GoogleIcon = "/icons/google.svg";
const FacebookIcon = "/icons/facebook.svg";
const AppleIcon = "/icons/apple.svg";

// helpers
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRules = {
  length: (v) => v.length >= 8,
  uppercase: (v) => /[A-Z]/.test(v),
  number: (v) => /\d/.test(v),
  special: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
};

const filterEmailInput = (value) =>
  value.replace(/[^a-zA-Z0-9@._-]/g, "").replace(/(@.*)@/g, "$1");

export default function SignupForm({ onSwitchMode }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  // ------------------ STATE ------------------
  const [email, setEmail] = useState("");
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const isPasswordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  // ------------------ DERIVED VALUES ------------------
  const isEmailValid = emailRegex.test(email);

  const passwordValidation = {
    length: passwordRules.length(password),
    uppercase: passwordRules.uppercase(password),
    number: passwordRules.number(password),
    special: passwordRules.special(password),
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const isFormValid =
    isEmailValid && isPasswordValid && password === confirmPassword;

  const handleSubmit = (e) => {
    e?.preventDefault();
    const userData = login(email, password);
    
    if (userData.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  // ------------------ UI ------------------
  return (
    <Card
      variant="dark"
      hoverable={false}
      className="w-full max-w-md rounded-2xl px-6 py-8 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-slate-400 font-medium">
          Enter your email below to create your account
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
            Email
          </label>

          <Input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(filterEmailInput(e.target.value))}
            onBlur={() => setIsEmailTouched(true)}
            placeholder="Enter your email"
            variant="dark"
          />

          {isEmailTouched && email && !isEmailValid && (
            <div className="mt-2 flex items-center gap-1.5 text-rose-400 animate-in fade-in slide-in-from-left-2 duration-300">
              <AlertCircle size={14} strokeWidth={2.5} />
              <p className="text-[11px] font-bold tracking-tight">Please enter a valid email address</p>
            </div>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
            Password
          </label>

          <Input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            placeholder="Create your password"
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => {
              if (!password) setIsPasswordFocused(false);
            }}
            variant="dark"
          />

          {isPasswordFocused && (
            <div className="mt-3 p-2.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Security Strength Header */}
              <div className="flex items-center justify-between px-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Password Strength</span>
                {password && (
                  <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 ${
                    Object.values(passwordValidation).filter(Boolean).length === 4 ? "text-emerald-500" : 
                    Object.values(passwordValidation).filter(Boolean).length >= 2 ? "text-[#ff8c42]" : "text-rose-400"
                  }`}>
                    {Object.values(passwordValidation).filter(Boolean).length === 4 ? "Excellent" : 
                     Object.values(passwordValidation).filter(Boolean).length >= 2 ? "Moderate" : "Weak"}
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden flex gap-1">
                {[1, 2, 3, 4].map((step) => {
                  const strengthCount = Object.values(passwordValidation).filter(Boolean).length;
                  const isActive = strengthCount >= step;
                  let barColor = "bg-white/5";
                  
                  if (isActive) {
                    barColor = strengthCount === 4 ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" : 
                               strengthCount >= 2 ? "bg-[#ff8c42]" : "bg-rose-400";
                  }

                  return (
                    <div 
                      key={step}
                      className={`h-full flex-1 transition-all duration-700 ${barColor}`}
                    />
                  );
                })}
              </div>

              {/* Requirements Grid */}
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: "Min. 8 Characters", valid: passwordValidation.length },
                  { label: "Min. 1 Uppercase", valid: passwordValidation.uppercase },
                  { label: "Min. 1 Number", valid: passwordValidation.number },
                  { label: "Min. 1 Special", valid: passwordValidation.special }
                ].map((req) => (
                  <div 
                    key={req.label}
                    className={`
                      flex items-center gap-2 px-2.5 py-1 rounded-xl border transition-all duration-300
                      ${req.valid 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" 
                        : "bg-white/[0.02] border-white/5 text-slate-500"}
                    `}
                  >
                    <div className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                      req.valid ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-700"
                    }`} />
                    <span className="text-[10px] font-bold tracking-tight">{req.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
            Confirm Password
          </label>
          <Input
            id="signup-confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            placeholder="Re-type your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="dark"
          />

          {isPasswordMismatch && (
            <div className="mt-2 flex items-center gap-1.5 text-rose-400 animate-in fade-in slide-in-from-left-2 duration-300">
              <AlertCircle size={14} strokeWidth={2.5} />
              <p className="text-[11px] font-bold tracking-tight">Passwords do not match</p>
            </div>
          )}
        </div>

        {/* Submit */}
        <Button
          disabled={!isFormValid}
          type="submit"
          className={`
            w-full h-11 text-sm font-bold tracking-wide transition-all rounded-2xl shadow-lg
            ${
              isFormValid
                ? "text-white bg-[#ff8c42] hover:bg-[#e67e3b] shadow-orange-500/20"
                : "text-white/40 bg-slate-800 cursor-not-allowed opacity-50"
            }
          `}
        >
          Create Account
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-wider">
          <div className="h-px flex-1 bg-white/10" />
          Or continue with
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Social */}
        <div className="grid grid-cols-3 gap-3">
          <Button type="button" className="h-11 border border-white/10 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
            <img src={GoogleIcon} alt="Google" className="h-6 w-6 object-contain" />
          </Button>
          <Button type="button" className="h-11 border border-white/10 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
            <img src={AppleIcon} alt="Apple" className="h-6 w-6 invert brightness-0 object-contain" />
          </Button>
          <Button type="button" className="h-11 border border-white/10 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
            <img src={FacebookIcon} alt="Facebook" className="h-6 w-6 object-contain" />
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-400 font-medium">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => onSwitchMode && onSwitchMode("login")}
            className="text-[#ff8c42] hover:text-[#e67e3b] font-bold hover:underline underline-offset-2"
          >
            Sign in
          </button>
        </p>

        {/* Terms footer */}
        <p className="mt-4 text-center text-[10px] text-slate-500 font-medium leading-relaxed">
          By signing up, you agree to our{" "}
          <button type="button" className="text-[#007acc] hover:text-[#1a8cff] hover:underline underline-offset-2 font-bold transition-all duration-300">Terms of Service</button> and{" "}
          <button type="button" className="text-[#007acc] hover:text-[#1a8cff] hover:underline underline-offset-2 font-bold transition-all duration-300">Privacy Policy</button>.
        </p>
      </form>
    </Card>
  );
}

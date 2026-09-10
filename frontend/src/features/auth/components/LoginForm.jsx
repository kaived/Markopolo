import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../components/common/button.jsx";
import { Input } from "../../../components/common/input.jsx";
import { Card } from "../../../components/common/card.jsx";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

// Assets are now in public/icons/ (no import needed)
const GoogleIcon = "/icons/google.svg";
const FacebookIcon = "/icons/facebook.svg";
const AppleIcon = "/icons/apple.svg";

export default function LoginForm({ onSwitchMode }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  // STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e) => {
    e?.preventDefault();
    setError("");

    try {
      const userData = login(email, password);
      
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Card
      variant="dark"
      hoverable={false}
      className="
        w-full max-w-md
        rounded-2xl
        px-6 py-8 sm:p-8
        shadow-[0_20px_40px_rgba(0,0,0,0.4)]
      "
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-slate-400 font-medium">
          Login with your Google, Apple or Facebook account
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
          <p className="text-xs font-bold text-red-500 tracking-wide uppercase italic">
            {error}
          </p>
        </div>
      )}

      <div className="space-y-3">
        <Button className="w-full h-11 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-2xl transition-all">
          <span className="inline-flex items-center gap-2 w-44 whitespace-nowrap">
            <img src={GoogleIcon} alt="Google" className="h-6 w-6 shrink-0 object-contain" />
            <span>Login with Google</span>
          </span>
        </Button>

        <Button className="w-full h-11 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-2xl transition-all">
          <span className="inline-flex items-center gap-2 w-44 whitespace-nowrap">
            <img src={AppleIcon} alt="Apple" className="h-6 w-6 shrink-0 invert brightness-0 object-contain" />
            <span>Login with Apple</span>
          </span>
        </Button>

        <Button className="w-full h-11 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-2xl transition-all">
          <span className="inline-flex items-center gap-2 w-44 whitespace-nowrap">
            <img src={FacebookIcon} alt="Facebook" className="h-6 w-6 shrink-0 object-contain" />
            <span>Login with Facebook</span>
          </span>
        </Button>
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-wider">
        <div className="h-px flex-1 bg-white/10" />
        Or continue with
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
          Email
        </label>

        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="dark"
        />
      </div>

      {/* Password */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Password
          </label>
          <button
            type="button"
            onClick={() => onSwitchMode && onSwitchMode("forgot-password")}
            className="text-[11px] font-semibold text-[#007acc] hover:text-[#1a8cff] hover:underline underline-offset-2 transition-all duration-300"
          >
            Forgot your password?
          </button>
        </div>

        <Input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          variant="dark"
        />
      </div>

      {/* Submit */}
      <Button
        disabled={!isFormValid}
        onClick={handleSubmit}
        className={`
          w-full h-11 text-sm font-bold tracking-wide transition-all rounded-2xl shadow-lg
          ${
            isFormValid
              ? "text-white bg-[#ff8c42] hover:bg-[#e67e3b] shadow-orange-500/20"
              : "text-white/40 bg-slate-800 cursor-not-allowed opacity-50"
          }
        `}
      >
        Login
      </Button>

      {/* Footer */}
      <p className="mt-8 text-center text-sm text-slate-400 font-medium">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => onSwitchMode && onSwitchMode("signup")}
          className="text-[#ff8c42] hover:text-[#e67e3b] font-bold hover:underline underline-offset-2"
        >
          Sign up
        </button>
      </p>
    </Card>
  );
}

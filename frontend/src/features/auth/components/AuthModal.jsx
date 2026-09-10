import { useState, useEffect } from "react";
import { X } from "lucide-react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function AuthModal({ isOpen, onClose, initialMode = "login" }) {
  const [authMode, setAuthMode] = useState(initialMode);

  // Sync initialMode when modal opens
  useEffect(() => {
    if (isOpen) {
      setAuthMode(initialMode);
    }
  }, [isOpen, initialMode]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center px-8 sm:px-4 py-4">
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md transform transition-all animate-in zoom-in-95 duration-300">
        {/* Close Button Inside Card */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-50 p-1.5 md:p-2 rounded-full bg-white hover:bg-slate-100 text-slate-900 transition-all shadow-sm flex items-center justify-center border border-white/5"
          aria-label="Close Modal"
        >
          <X className="w-[15px] h-[15px] md:w-[18px] md:h-[18px]" />
        </button>

        {/* Form Content */}
        {authMode === "login" && (
          <LoginForm onSwitchMode={setAuthMode} />
        )}
        {authMode === "signup" && (
          <SignupForm onSwitchMode={setAuthMode} />
        )}
        {authMode === "forgot-password" && (
          <ForgotPasswordForm onSwitchMode={setAuthMode} />
        )}

      </div>
    </div>
  );
}

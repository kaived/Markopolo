import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Building2 } from "lucide-react";
import { Button } from "../common/button.jsx";
import AuthModal from "../../features/auth/components/AuthModal";
import { useAuth } from "../../features/auth/context/AuthContext";

export default function Navbar() {
  const { 
    isAuthModalOpen, 
    authMode, 
    openLogin, 
    openSignup, 
    closeAuthModal 
  } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/", hideOnHome: true },
    { name: "About", path: "/about" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Category Reviews", path: "/categories" },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "opacity-100 visible z-[10000]" : "opacity-0 invisible pointer-events-none z-[-1]"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <nav className={`fixed top-0 left-0 right-0 w-full ${isMenuOpen ? "z-[10001]" : "z-[60]"}`}>
        {/* Full-width Background & Shadow Layer */}
        <div className="absolute inset-0 h-20 bg-[#020617]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(255,255,255,0.12)] z-20" />
        
        {/* Content Container */}
        <div className="relative mx-auto flex h-20 max-w-[1550px] items-center justify-between px-6 lg:px-12 z-30">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl sm:text-[26px] md:text-3xl font-black tracking-tighter zalando-sans-expanded bg-gradient-to-r from-[#ff8c42] to-[#007acc] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,140,66,0.2)] pr-2 py-1 leading-normal"
          >
            Markopolo
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6 text-sm font-bold text-white/90">
              {navLinks.map((link) => (
                (link.hideOnHome && isHomePage) ? null : (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className="relative group hover:text-[#ff8c42] transition-colors duration-300"
                  >
                    {link.name}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#ff8c42] transition-all duration-300 group-hover:w-full" />
                  </Link>
                )
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link 
                to="/business" 
                className="hidden lg:flex items-center gap-2 px-5 h-11 text-sm font-bold text-white border border-white/20 rounded-2xl hover:border-[#ff8c42] hover:text-[#ff8c42] hover:bg-[#ff8c42]/5 transition-all duration-500 group"
              >
                <Building2 size={14} className="text-white/60 group-hover:text-[#ff8c42] transition-colors duration-500" />
                For Businesses
              </Link>
              
              <Button
                onClick={openLogin}
                className="px-8 h-11 text-sm font-bold tracking-wide text-white bg-[#ff8c42] rounded-2xl shadow-sm hover:bg-[#e67e3b] hover:shadow-md transition-all duration-500 active:scale-95 lg:active:scale-100"
              >
                Sign In
              </Button>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <Button
              onClick={openLogin}
              className="px-6 h-8 text-xs font-bold text-white bg-[#ff8c42] rounded-xl [@media(hover:hover)]:hover:bg-[#e67e3b] shadow-sm transition-all active:scale-95 active:bg-[#e67e3b]/80"
            >
              Sign In
            </Button>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] group transition-all active:scale-90"
              aria-label="Toggle Menu"
            >
              <div className={`w-6 h-[2.5px] bg-white transition-all duration-300 rounded-full origin-center ${isMenuOpen ? "rotate-45 translate-y-[4.25px]" : ""}`} />
              <div className={`w-6 h-[2.5px] bg-white transition-all duration-300 rounded-full origin-center ${isMenuOpen ? "-rotate-45 -translate-y-[4.25px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`absolute left-0 w-full bg-[#020617] backdrop-blur-2xl transition-all duration-300 ease-in-out z-10 lg:hidden top-20 ${
            isMenuOpen 
              ? "opacity-100 visible h-auto pt-6 pb-6 shadow-[0_20px_40px_rgba(255,255,255,0.05)]" 
              : "opacity-0 invisible h-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col items-start gap-1 px-8 sm:px-12">
            {navLinks.map((link) => (
              (link.hideOnHome && isHomePage) ? null : (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-left py-4 text-base font-bold text-white/90 border-b border-white/5 hover:text-[#ff8c42] transition-colors tracking-wide"
                >
                  {link.name}
                </Link>
              )
            ))}

            <Link 
              to="/business" 
              onClick={() => setIsMenuOpen(false)}
              className="w-full mt-6 flex items-center justify-center gap-2.5 h-12 text-base font-bold text-[#ff8c42] border border-[#ff8c42]/20 rounded-2xl bg-[#ff8c42]/5 [@media(hover:hover)]:hover:bg-[#ff8c42]/10 [@media(hover:hover)]:hover:border-[#ff8c42]/30 transition-all active:scale-[0.98] active:bg-[#ff8c42]/10"
            >
              <Building2 size={16} className="text-[#ff8c42]" />
              For Businesses
            </Link>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode={authMode}
      />
    </>
  );
}

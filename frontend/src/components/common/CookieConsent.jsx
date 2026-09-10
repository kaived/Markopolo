import React, { useState, useEffect } from "react";
import { Cookie, ShieldCheck, ChevronRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * CookieConsent Component
 * A professional, category-based cookie consent banner aligned with Markopolo policies.
 */
const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem("markopolo_cookie_consent");
    if (!savedConsent) {
      setTimeout(() => setIsVisible(true), 1500); // Gentle entry delay
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const handleDeclineAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
    };
    saveConsent(onlyNecessary);
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  const saveConsent = (prefs) => {
    localStorage.setItem("markopolo_cookie_consent", JSON.stringify(prefs));
    setIsVisible(false);
    // Here you would typically trigger your tag manager/analytics scripts
  };

  const togglePreference = (key) => {
    if (key === "necessary") return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[13000] px-6 sm:px-10 pb-6 sm:pb-8 pointer-events-none flex justify-center">
      <div className="w-full max-w-[1400px] pointer-events-auto">
        <div className="bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-[28px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-6 lg:gap-12 text-center lg:text-left">
            <div className="flex flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#007acc]/10 items-center justify-center ring-1 ring-blue-500/20">
              <Cookie size={28} className="text-[#007acc] sm:hidden" />
              <Cookie size={32} className="text-[#007acc] hidden sm:block" />
            </div>

            <div className="flex-1 max-w-2xl">
              <h3 className="text-lg sm:text-xl font-black text-white mb-2 zalando-sans-expanded uppercase tracking-tight">Your Privacy Choice</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
                We use cookies to improve your experience. Some are essential for the site to function, while others help us understand and improve how you use Markopolo. 
                View our <Link to="/cookie-policy" className="text-[#007acc] hover:underline transition-colors font-bold">Cookie Policy</Link> for details.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full lg:w-auto">
              <button 
                onClick={handleDeclineAll}
                className="w-full sm:w-auto px-8 h-12 text-sm font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all active:scale-95"
              >
                Reject Optional
              </button>
              <button 
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-12 h-12 text-sm font-black text-white bg-[#007acc] hover:bg-[#005f99] rounded-2xl shadow-md shadow-blue-500/10 transition-all active:scale-95"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

import { useState } from "react";
import { Send, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { Input } from "../../../components/common/input.jsx";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <div className="w-full">
      {/* Absolute Autofill Glitch Fix - Component Level Inject */}
      <style>
        {`
          .autofill-neutral:-webkit-autofill,
          .autofill-neutral:-webkit-autofill:hover, 
          .autofill-neutral:-webkit-autofill:focus, 
          .autofill-neutral:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 1000px #0f172a inset !important;
            -webkit-text-fill-color: white !important;
            caret-color: white !important;
            transition: background-color 5000s ease-in-out 0s !important;
            border-radius: inherit;
          }
        `}
      </style>

      <div className="w-full flex flex-col lg:flex-row bg-[#0f172a] relative overflow-hidden">
        {/* LEFT: Midnight Value Proposition Panel */}
        <div 
          data-aos="fade-right"
          className="w-full lg:w-[42%] bg-[#0f172a] py-14 px-8 sm:px-12 lg:pl-[12%] lg:pr-20 text-white relative flex flex-col justify-center min-h-[350px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#007acc]/10 to-transparent pointer-events-none" />

          <div className="relative z-10 text-left max-w-lg lg:max-w-none ml-0">
            <span className="inline-flex items-center justify-center px-4 h-7 pt-0.5 rounded-full bg-white/5 text-[#ff8c42] text-[10px] font-black uppercase tracking-[0.25em] mb-6 border border-[#ff8c42]/20 shadow-[0_0_15px_rgba(255,140,66,0.1)]">
              Join the Movement
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-4xl font-black mb-8 zalando-sans-expanded leading-[1.1] tracking-tighter">
              Why Join <br className="hidden sm:block" />
              <span className="text-[#007acc] drop-shadow-[0_0_10px_rgba(0,122,204,0.2)]">Markopolo?</span>
            </h3>
            
            <ul className="space-y-6">
              <li className="flex items-center gap-5 text-base font-bold text-slate-300 transition-transform duration-300 hover:translate-x-1">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <Zap size={20} className="text-[#ff8c42] fill-[#ff8c42]/10" />
                </div>
                <span>Instant updates on top reviews</span>
              </li>
              <li className="flex items-center gap-5 text-base font-bold text-slate-300 transition-transform duration-300 hover:translate-x-1">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-[#ff8c42] fill-[#ff8c42]/10" />
                </div>
                <span>Exclusive access to hidden gems</span>
              </li>
              <li className="flex items-center gap-5 text-base font-bold text-slate-300 transition-transform duration-300 hover:translate-x-1">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <Sparkles size={20} className="text-[#ff8c42] fill-[#ff8c42]/10" />
                </div>
                <span>Build a better society with us</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT: Midnight Theme Inline Form - Signature Sapphire Focus */}
        <div 
          data-aos="fade-left"
          className="flex-1 bg-[#0f172a] py-14 px-8 sm:px-12 lg:pl-24 lg:pr-[12%] flex flex-col justify-center relative lg:border-l border-white/5">
          <div className="max-w-xl ml-0">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-white zalando-sans-expanded tracking-tighter mb-4 leading-[1.1]">
              Unlock The Discovery Circle <br className="hidden sm:block" />
              <span className="text-[#007acc] drop-shadow-[0_0_10px_rgba(0,122,204,0.2)]">Premium Weekly Briefing</span>
            </h2>
            
            <p className="text-slate-400 text-base mb-10 font-medium leading-relaxed max-w-lg opacity-90">
              Authentic insights, hidden gems, and exclusive community updates delivered weekly. Join our growing community today.
            </p>

            {isSubscribed ? (
               <div className="flex items-center gap-6 p-8 rounded-2xl bg-[#020617] border border-white/10 animate-in fade-in zoom-in duration-700">
                  <div className="w-16 h-16 rounded-full bg-[#007acc] flex items-center justify-center shadow-xl shadow-[#007acc]/20">
                     <span className="text-white text-2xl font-black">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-black text-xl">System Synced!</h4>
                    <p className="text-slate-400 font-bold">Welcome to the inner circle.</p>
                  </div>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch">
                <Input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-label="Email address for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  variant="dark"
                  containerClassName="w-full h-12 sm:max-w-[340px]"
                  className="px-5 font-bold h-12"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="
                    h-12 px-10 w-full sm:w-auto bg-[#ff8c42] text-white font-black rounded-2xl 
                    shadow-md shadow-[#ff8c42]/10 [@media(hover:hover)]:hover:bg-[#e67e3b]
                    transition-all duration-300 active:scale-95 lg:active:scale-100
                    disabled:opacity-70 flex items-center justify-center gap-3 tracking-wide whitespace-nowrap
                  "
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe Now
                      <Send size={18} strokeWidth={2.5} className="rotate-[-10deg]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

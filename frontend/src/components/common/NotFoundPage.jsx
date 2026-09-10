import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import AppRoutes from "../../routes/appRouter";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ff8c42]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#007acc]/5 blur-[120px] rounded-full" />
      
      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Animated 404 Text */}
        <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-black leading-none tracking-tighter select-none">
          <span className="bg-gradient-to-b from-white/20 to-white/5 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            404
          </span>
        </h1>
        
        {/* Error Message */}
        <div className="mt-[-20px] sm:mt-[-40px]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Lost in the <span className="text-[#ff8c42]">Void?</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-lg mx-auto leading-relaxed mb-12">
            The page you're looking for has moved, been deleted, or never existed in this timeline. Let's get you back on track.
          </p>
          
          {/* Action Button */}
          <div className="flex justify-center">
            <Link
              to={AppRoutes.MainPage}
              className="group flex items-center gap-2.5 px-10 h-14 bg-[#ff8c42] text-white font-black rounded-2xl shadow-[0_10px_20px_rgba(255,140,66,0.2)] hover:shadow-[0_15px_30px_rgba(255,140,66,0.3)] hover:bg-[#e67e3b] transition-all duration-300 active:scale-[0.98] tracking-wide"
            >
              <Home size={20} className="transition-transform group-hover:scale-110" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

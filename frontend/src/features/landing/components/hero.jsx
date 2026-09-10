import { Link } from "react-router-dom";
import { Button } from "../../../components/common/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../../auth/context/AuthContext";

export default function Hero() {
  const { openSignup } = useAuth();
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#020617] flex items-center justify-center pt-32 pb-32 lg:pt-40 lg:pb-32">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-100 contrast-[1.05] brightness-[1.1] saturate-[1.1] transform-gpu will-change-transform"
      >
        <source src="https://res.cloudinary.com/dvml8hdph/video/upload/q_auto:best/f_auto/e_sharpen:100/v1775117853/hero-bg-video_dbxwsr.mp4" type="video/mp4" />
      </video>
      
      {/* Cinematic dark overlay - minimized for clarity */}
      <div className="absolute inset-0 bg-slate-950/10 pointer-events-none z-[1]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <h1 
          data-aos="fade-up"
          className="
          zalando-sans-expanded
          text-white
          text-5xl font-extrabold leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl
          drop-shadow-2xl
        ">
          The Future of <br className="hidden sm:block" />
          <span className="text-[#ff8c42]">Trusted Social Discovery</span>
        </h1>
        
        <p 
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-6 max-w-xl text-lg text-slate-100/90 sm:text-xl leading-relaxed drop-shadow-md">
          The definitive hub for authentic insights. Join a community that values truth, discovery, and the power of shared experiences.
        </p>
        
        <div 
          data-aos="fade-up"
          data-aos-delay="400"
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button 
            onClick={openSignup}
            className="
              group h-12 w-full sm:w-52 px-8 text-base font-semibold text-white
              [@media(hover:hover)]:hover:bg-[#e67e3b]
              shadow-lg shadow-orange-500/20 transition-all duration-300
              active:scale-95 lg:active:scale-100
              rounded-2xl flex items-center justify-center gap-2
              bg-[#ff8c42]
            "
          >
            Get Started
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Link to="/categories" className="w-full sm:w-auto">
             <Button className="
              h-12 w-full sm:w-52 px-8 text-base font-semibold text-white
              [@media(hover:hover)]:hover:bg-[#005f99]
              shadow-lg shadow-blue-500/20 transition-all duration-300
              active:scale-95 lg:active:scale-100
              rounded-2xl flex items-center justify-center
              bg-[#007acc]
             ">
               Discover Reviews
             </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

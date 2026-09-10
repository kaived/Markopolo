import React from "react";
import { 
  Search, 
  ShieldCheck, 
  MessageSquare, 
  Trophy,
  Sparkles
} from "lucide-react";

/**
 * HowItWorks Section Component
 * Extracted from the standalone page to be used as a high-fidelity landing page section.
 */
const HowItWorksSection = () => {
  const steps = [
    {
      id: "01",
      icon: Search,
      title: "Share Your Experience",
      description: "Provide details about a product or service you use.",
      color: "from-blue-500 to-indigo-500",
      accent: "bg-blue-500/10 text-blue-400"
    },
    {
      id: "02",
      icon: ShieldCheck,
      title: "Secure Verification",
      description: "Authenticate your usage through digital history or cryptographic proof. We ensure every review is tied to a real experience.",
      color: "from-purple-500 to-pink-500",
      accent: "bg-purple-500/10 text-purple-400"
    },
    {
      id: "03",
      icon: MessageSquare,
      title: "Write Your Review",
      description: "Provide your honest feedback to help others make better decisions.",
      color: "from-orange-500 to-red-500",
      accent: "bg-orange-500/10 text-orange-400"
    },
    {
      id: "04",
      icon: Trophy,
      title: "Build Your Reputation",
      description: "Increase your reliability score and earn recognition for top-quality reviews.",
      color: "from-emerald-500 to-teal-500",
      accent: "bg-emerald-500/10 text-emerald-400"
    }
  ];

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden bg-[#020617]">
      {/* Subtle Atmospheric Glows */}
      <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-[#007acc]/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-[-5%] w-[40%] h-[40%] bg-[#ff8c42]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
        {/* Section Header */}
        <div 
          data-aos="fade-up"
          className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#007acc]/10 border border-[#007acc]/20 mb-6 font-bold tracking-widest text-[#007acc] text-[10px] uppercase">
             <Sparkles size={14} />
             How Markopolo Works
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            How Markopolo Works
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Follow these four steps to share your review and contribute to the community.
          </p>
        </div>

        {/* Timeline Content */}
        <div className="max-w-5xl mx-auto relative">
          {/* Visual Continuity Line (Desktop) — Full-length alignment with 1st and 4th card edges */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-700/50 -translate-x-1/2" />

          {steps.map((step, index) => (
            <div 
              key={step.id}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className={`relative flex flex-col md:flex-row items-center gap-12 mb-32 last:mb-0 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Live Timeline Dot — anchored to left:50% just like the line */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center z-20">
                <div className={`w-3 h-3 rounded-full relative ${step.accent.split(' ')[1]}`}>
                  <div className="absolute inset-0 rounded-full bg-current animate-ping opacity-40" />
                  <div className="absolute inset-0 rounded-full bg-current" />
                </div>
              </div>

              {/* Visual Element */}
              <div className="flex-1 flex justify-center">
                <div className="relative group">
                  <div className={`absolute -inset-4 bg-gradient-to-tr ${step.color} opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-opacity duration-500`} />
                  <div className="relative w-64 h-64 rounded-[40px] bg-[#021124] border border-white/10 flex items-center justify-center p-10 overflow-hidden shadow-2xl">
                     <div className="absolute top-0 right-0 p-6 opacity-10">
                        <span className="text-6xl font-black text-white">{step.id}</span>
                     </div>
                     <step.icon size={80} className="text-white animate-floating" />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className={`flex-1 text-center ${index % 2 === 1 ? "md:text-right" : "md:text-left"}`}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${step.accent} mb-4`}>
                  <span className="text-xs font-black uppercase tracking-widest">Step {step.id}</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-base text-slate-400 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

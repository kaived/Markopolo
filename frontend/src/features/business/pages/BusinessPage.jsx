import React from "react";
import { Link } from "react-router-dom";
import { 
  Building2, 
  BarChart3, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  Zap,
  ArrowRight,
  Mail,
  CheckCircle2,
  Lock
} from "lucide-react";
import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import { Card } from "../../../components/common/card";
import { Input } from "../../../components/common/input";
import { Button } from "../../../components/common/button";

const BusinessPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col selection:bg-[#007acc]/30">
      <Navbar />

      <main className="flex-1 pt-20 pb-0 overflow-x-hidden">
        {/* --- HERO SECTION --- */}
        <section className="relative px-6 sm:px-12 md:px-16 pt-16 mb-24">
          {/* Atmospheric Glows */}
          <div className="absolute -top-32 left-1/4 w-[700px] h-[700px] bg-[#007acc]/20 blur-[160px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#00f5d4]/15 blur-[160px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
            {/* Professional Badge */}
            <div 
              data-aos="fade-up"
              className="mb-12 px-4 py-1 rounded-full bg-[#007acc]/10 flex items-center gap-3 animate-fade-in border-none">
              <span className="flex h-2 w-2 rounded-full bg-[#007acc] animate-pulse" />
              <span className="text-xs font-black text-[#007acc] uppercase tracking-[0.25em]">
                Coming Soon
              </span>
            </div>

            <h1 
              data-aos="fade-up"
              data-aos-delay="200"
              className="
              text-[30px] sm:text-5xl md:text-7xl font-extrabold text-white tracking-tighter zalando-sans-expanded mb-8
              leading-[1.15] drop-shadow-2xl w-full
            ">
              Scale Your Brand with <br />
              <span className="text-[#ff8c42]">Total Social Trust</span>
            </h1>

            <p 
              data-aos="fade-up"
              data-aos-delay="300"
              className="max-w-2xl text-lg md:text-xl text-slate-100/70 font-medium leading-relaxed mb-12">
              Transform raw community insights into actionable growth. 
              Built for forward-thinking brands who value authentic consumption and verified discovery.
            </p>

            {/* Waitlist Call to Action */}
            <div 
              data-aos="fade-up"
              data-aos-delay="400"
              className="mt-12 w-full max-w-xl relative group flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-2">
              <Input 
                id="waitlist-email"
                name="email"
                autoComplete="email"
                variant="dark"
                icon={<Mail size={20} />}
                placeholder="Enter your business email"
                type="email"
                containerClassName="h-12 w-full bg-[#021124] border-white/5"
                className="text-base font-bold placeholder:text-sm"
              />
              <button className="
                h-12 px-8 w-full sm:w-auto bg-[#007acc] text-white text-sm font-bold tracking-wide rounded-2xl
                [@media(hover:hover)]:hover:bg-[#005f99] transition-all duration-300 transform active:scale-95 lg:active:scale-100
                whitespace-nowrap shadow-lg flex-shrink-0
              ">
                Join Waitlist
              </button>
            </div>
            
            <p 
              data-aos="fade-up"
              data-aos-delay="500"
              className="mt-4 mb-8 text-[10px] md:text-[11px] text-slate-500 font-bold uppercase tracking-wider md:tracking-widest flex items-center justify-center gap-2 px-2 text-center whitespace-nowrap">
              <Lock size={12} className="text-[#007acc] flex-shrink-0" />
              Limited Early Access for Platinum Partners
            </p>
          </div>
        </section>

        {/* --- CORE PILLARS --- */}
        <section className="px-8 md:px-16 mb-20 md:mb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: ShieldCheck,
                  title: "Verified Profiles",
                  desc: "Secure your brand's digital identity. Every interaction is cryptographically tied to verified consumption.",
                  color: "text-emerald-400",
                  bg: "bg-emerald-400/10",
                  border: "border-emerald-400/20"
                },
                {
                  icon: BarChart3,
                  title: "Advanced Analytics",
                  desc: "Go beyond likes. Track sentiment flow, discovery patterns, and long-term brand equity in real-time.",
                  color: "text-blue-400",
                  bg: "bg-blue-400/10",
                  border: "border-blue-400/20"
                },
                {
                  icon: Users,
                  title: "Community Trust",
                  desc: "Engage your most vocal advocates. Build loyalty through transparency and direct, verified dialogue.",
                  color: "text-orange-400",
                  bg: "bg-orange-400/10",
                  border: "border-orange-400/20"
                }
              ].map((feature, i) => (
                <div 
                  key={i} 
                  data-aos="fade-up" 
                  data-aos-delay={i * 100}
                >
                  <Card 
                    variant="dark"
                    innerGlow
                    rounded="rounded-[2.5rem]"
                    className="p-10 flex flex-col group cursor-default h-full"
                  >
                    <div className={`mb-8 w-14 h-14 rounded-2xl ${feature.bg} border ${feature.border} flex items-center justify-center transition-all duration-500`}>
                      <feature.icon size={28} className={feature.color} />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">{feature.title}</h3>
                    <p className="text-slate-400 text-sm font-bold leading-relaxed">{feature.desc}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- PLATFORM MILESTONES SECTION --- */}
        <section className="relative pt-12 md:pt-16 pb-16 px-8 md:px-16 overflow-hidden">
          {/* Section-Specific Atmospheric Glow */}
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#007acc]/10 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-14 lg:gap-20 items-center relative z-10">
            <div className="flex-1">
              <h2 
                data-aos="fade-right"
                className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-10 leading-tight">
                Platform <span className="text-[#007acc]">Milestones</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  "Verified Consumer Rewards Engine",
                  "Direct Brand-to-User Feedback Loop",
                  "Hyper-Local Sentiment Hotmaps",
                  "Market Value Impact Tracking"
                ].map((item, i) => (
                  <div 
                    key={i} 
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                    className="flex items-center gap-5 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#007acc]/10 border border-[#007acc]/20 flex items-center justify-center transition-all duration-300">
                      <CheckCircle2 size={18} className="text-[#007acc]" />
                    </div>
                    <span className="text-base font-bold text-slate-300 group-hover:text-white transition-colors cursor-default">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div 
              data-aos="zoom-in"
              className="relative group/milestone">
              {/* Feature Focal Point */}
              <div className="absolute inset-0 bg-[#007acc]/20 blur-[80px] rounded-full group-hover/milestone:bg-[#ff8c42]/10 transition-colors duration-700" />
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-[2.5rem] bg-[#021124] border border-white/5 flex flex-col items-center justify-center transition-all duration-700 shadow-2xl">
                <TrendingUp size={90} className="text-[#007acc]/40 transition-all duration-700" />
                <div className="mt-6 px-5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-[#007acc] uppercase tracking-[0.3em]">
                  V1.2 Q4-26
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BusinessPage;

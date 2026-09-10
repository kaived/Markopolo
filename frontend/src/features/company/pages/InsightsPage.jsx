import React from 'react';
import { AreaChart, Clock } from 'lucide-react';
import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";

const InsightsPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-20">
        <section className="px-6 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#ff8c42]/10 border border-[#ff8c42]/20 mb-8 animate-pulse">
            <Clock size={16} className="text-[#ff8c42]" />
            <span className="text-[#ff8c42] text-xs font-black uppercase tracking-widest">Under Construction</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#007acc] to-[#ff8c42] leading-[1.1] pb-4 px-2">
            Data-Driven <br /> Society Analysis.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed font-bold mb-12">
            Our insights engine is currently analyzing global feedback to provide radical transparency into societal trends. Stay tuned for the unveiling.
          </p>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] inline-flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#007acc]/10 flex items-center justify-center ring-1 ring-[#007acc]/20">
              <AreaChart size={32} className="text-[#007acc]" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Real-time Analytics</h3>
              <p className="text-slate-500 text-sm">We're building the most advanced platform for verified feedback analysis.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InsightsPage;

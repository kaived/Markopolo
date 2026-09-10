import React from 'react';
import { Mail, Clock } from 'lucide-react';
import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-20">
        <section className="px-6 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#007acc]/10 border border-[#007acc]/20 mb-8 animate-pulse">
            <Clock size={16} className="text-[#007acc]" />
            <span className="text-[#007acc] text-xs font-black uppercase tracking-widest">Connect With Us</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff8c42] to-[#007acc] leading-[1.1] pb-4 px-2">
            Let's Start a <br /> Conversation.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed font-bold mb-12">
            Have questions about radical transparency or want to join the movement? Our contact system is currently being optimized for authentic engagement.
          </p>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] inline-flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#ff8c42]/10 flex items-center justify-center ring-1 ring-[#ff8c42]/20">
              <Mail size={32} className="text-[#ff8c42]" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Direct Outreach</h3>
              <p className="text-slate-500 text-sm">For urgent inquiries, email us at <span className="text-[#007acc]">hello@markopolo.com</span></p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;

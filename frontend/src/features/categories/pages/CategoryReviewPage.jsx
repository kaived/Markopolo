import React from 'react';
import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import { Timer } from "lucide-react";

const CategoryReviewPage = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col pt-20">
            <Navbar />
            
            <main className="flex-grow flex items-center justify-center py-24">
                <div className="text-center px-6 max-w-3xl mx-auto">
                    {/* Animated Icon Container */}
                    <div className="mb-12 flex justify-center">
                        <div className="w-20 h-20 rounded-3xl bg-[#ff8c42]/10 flex items-center justify-center ring-1 ring-[#ff8c42]/20">
                            <Timer size={40} className="text-[#ff8c42]" />
                        </div>
                    </div>

                    {/* Gradient Heading */}
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff8c42] to-[#007acc] leading-normal pb-6">
                        Coming Soon!
                    </h1>

                    {/* Descriptive Text */}
                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium mb-10">
                        Our verified category deep-dives are currently in development. <br />
                        We're building the standard for authentic industry insights.
                    </p>

                    {/* Subtle Badge */}
                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#ff8c42]/5 border border-[#ff8c42]/20 text-xs font-black text-[#ff8c42] uppercase tracking-[0.15em] shadow-[0_0_20px_rgba(255,140,66,0.05)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff8c42] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff8c42]"></span>
                        </span>
                        Alpha Access: Strategic Discovery • Phase 1.0
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CategoryReviewPage;

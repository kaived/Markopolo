import React from "react";
import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import HowItWorksSection from "../components/HowItWorksSection";

/**
 * Standalone How It Works Page
 * Renders the high-fidelity HowItWorksSection with dedicated page-level spacing.
 */
const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col selection:bg-[#007acc]/30">
      <Navbar />

      <main className="flex-1 pt-12 pb-24">
        <HowItWorksSection />
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;

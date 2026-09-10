import { Link } from 'react-router-dom';
import { ArrowRight, Telescope, Rocket, ShieldCheck, Users, Zap } from 'lucide-react';
import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import { Card } from "../../../components/common/card";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-6 max-w-7xl mx-auto" style={{ marginBottom: "80px" }}>
          <div 
            data-aos="fade-up"
            className="text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff8c42] to-[#007acc] leading-[1.1] pb-4 px-2">
              Verified Insights,<br />Radical Transparency.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed font-bold">
              Markopolo is a platform for radical transparency, where verified insights drive societal progress.
            </p>
          </div>
        </section>

        {/* Vision & Mission Cards */}
        <section className="px-6 max-w-7xl mx-auto mb-16 md:mb-24">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Our Vision Card */}
            <Card 
              data-aos="fade-right"
              variant="dark" 
              hoverable={true} 
              className="p-8 md:p-10 flex flex-col items-start text-left border-white/[0.05]"
            >
              {/* Icon & Title Row */}
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-[#007acc]/10 flex items-center justify-center ring-1 ring-[#007acc]/20">
                  <Telescope size={28} className="text-[#007acc]" />
                </div>
                <span className="text-[#007acc] text-base font-black uppercase tracking-[0.2em]">Our Vision</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.2] text-white mb-6">
                Empowering every voice to <br /><span className="text-[#007acc]">shape a better future.</span>
              </h2>

              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                Markopolo captures collective wisdom to ensure every verified voice drives society forward by providing a professional bridge between raw feedback and actionable progress.
              </p>
            </Card>

            {/* Our Mission Card */}
            <Card 
              data-aos="fade-left"
              variant="dark" 
              hoverable={true} 
              className="p-8 md:p-10 flex flex-col items-start text-left border-white/[0.05]"
            >
              {/* Icon & Title Row */}
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-[#ff8c42]/10 flex items-center justify-center ring-1 ring-[#ff8c42]/20">
                  <Rocket size={28} className="text-[#ff8c42]" />
                </div>
                <span className="text-[#ff8c42] text-base font-black uppercase tracking-[0.2em]">Our Mission</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.1] text-white mb-6">
                The most trusted network for <br /><span className="text-[#ff8c42]">authentic insights.</span>
              </h2>

              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                We empower organizations through a reliable platform where verified feedback translates directly into actionable growth and meaningful societal advancement.
              </p>
            </Card>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="bg-white/[0.02] pt-16 pb-16 md:pt-20 md:pb-24">
          <div className="px-6 max-w-7xl mx-auto">
            <div 
              data-aos="fade-up"
              className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 text-white">Built on <span className="text-[#ff8c42]">Integrity</span></h2>
              <p className="text-slate-400 max-w-xl mx-auto">Our principles are the foundation of everything we build, ensuring a safe and honest space for all.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card 
                data-aos="fade-up"
                data-aos-delay="0"
                variant="dark" 
                hoverable={true} 
                className="p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center mb-6 ring-1 ring-blue-400/20">
                  <ShieldCheck size={24} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Verified Truth</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Every review is cross-referenced through our proprietary validation engine to ensure authenticity and trust within the ecosystem.
                </p>
              </Card>

              <Card 
                data-aos="fade-up"
                data-aos-delay="150"
                variant="dark" 
                hoverable={true} 
                className="p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-400/10 flex items-center justify-center mb-6 ring-1 ring-orange-400/20">
                  <Users size={24} className="text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Radical Inclusion</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We champion the diverse voices of our global community, fostering a culture where every perspective adds value to the collective society.
                </p>
              </Card>

              <Card 
                data-aos="fade-up"
                data-aos-delay="300"
                variant="dark" 
                hoverable={true} 
                className="p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-400/10 flex items-center justify-center mb-6 ring-1 ring-indigo-400/20">
                  <Zap size={24} className="text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Rapid Innovation</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  By leveraging real-time data, we help brands and people evolve faster, turning insights into meaningful action instantly.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section 
          data-aos="fade-up"
          className="px-6 pt-16 pb-3 md:pt-24 md:pb-6 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">Ready to shape<br />the next chapter?</h2>
          <p className="text-slate-400 mb-10 text-lg">Join thousands of verified contributors today.</p>
          <Link to="/" className="inline-block mx-auto">
            <button
              className="group h-11 px-8 bg-[#ff8c42] text-white font-black rounded-2xl shadow-sm [@media(hover:hover)]:hover:shadow-md transition-all duration-300 active:scale-95 lg:active:scale-100 tracking-wide flex items-center gap-2"
            >
              Start Your Journey
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;

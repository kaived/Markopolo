import { FileText, ChevronRight } from "lucide-react";
import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using Markopolo ("the Platform"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this Platform. These Terms apply to all visitors, users, and others who access the Platform.`,
  },
  {
    id: "description",
    title: "2. Description of Service",
    content: `Markopolo is a review and insights platform that enables verified users to share, discover, and engage with authentic feedback about products, services, and organizations. We reserve the right to modify, suspend, or discontinue the Platform at any time with or without notice.`,
  },
  {
    id: "accounts",
    title: "3. User Accounts",
    content: `To access certain features, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate, current, and complete information during registration. Markopolo reserves the right to terminate accounts that violate these Terms.`,
  },
  {
    id: "content",
    title: "4. User-Generated Content",
    content: `You retain ownership of content you submit to Markopolo. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute it in connection with the Platform. You are solely responsible for the accuracy and legality of your content. We reserve the right to remove any content that violates our Community Guidelines.`,
  },
  {
    id: "prohibited",
    title: "5. Prohibited Activities",
    content: `You agree not to: (a) engage in fraudulent, abusive, or illegal activity; (b) post false, misleading, or defamatory reviews; (c) impersonate any person or entity; (d) attempt to gain unauthorized access to our systems; (e) use automated tools to scrape or bulk-download data; (f) harass or threaten other users. Violations may result in immediate account termination.`,
  },
  {
    id: "intellectual",
    title: "6. Intellectual Property",
    content: `The Platform and its original content, features, and functionality are owned by Markopolo and protected by international copyright, trademark, and other intellectual property laws. You may not copy, reproduce, distribute, or create derivative works of our proprietary content without express written permission.`,
  },
  {
    id: "disclaimers",
    title: "7. Disclaimers & Limitation of Liability",
    content: `The Platform is provided on an "as is" and "as available" basis without warranties of any kind. Markopolo does not warrant that the Platform will be uninterrupted, error-free, or free of viruses. To the fullest extent permitted by law, Markopolo shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.`,
  },
  {
    id: "governing",
    title: "8. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Markopolo operates, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.`,
  },
  {
    id: "changes",
    title: "9. Changes to Terms",
    content: `We reserve the right to update these Terms at any time. We will notify users of material changes via email or a prominent notice on the Platform. Your continued use of the Platform after changes are posted constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.`,
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        {/* Hero */}
        <section className="px-6 max-w-4xl lg:max-w-7xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#007acc]/10 flex items-center justify-center ring-1 ring-[#007acc]/20">
              <FileText size={24} className="text-[#007acc]" />
            </div>
            <span className="text-[#007acc] text-sm font-black uppercase tracking-[0.2em]">Legal</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 leading-[1.1] pb-2">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl lg:max-w-3xl">
            Please read these terms carefully before using Markopolo. They govern your access to and use of our platform.
          </p>
          <p className="text-slate-500 text-sm mt-4 font-medium">
            Last updated: <span className="text-slate-400">April 1, 2026</span>
          </p>
        </section>

        {/* Quick Nav */}
        <section className="px-6 max-w-4xl lg:max-w-7xl mx-auto mb-16">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-xs font-black text-[#007acc] uppercase tracking-[0.2em] mb-4">Table of Contents</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#ff8c42] transition-colors duration-200 group"
                  >
                    <ChevronRight size={14} className="text-slate-600 group-hover:text-[#ff8c42] transition-colors duration-200" />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Content Sections */}
        <section className="px-6 max-w-4xl lg:max-w-7xl mx-auto">
          <div className="space-y-10">
            {sections.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="border-l-2 border-[#007acc]/30 pl-6 group hover:border-[#007acc] transition-colors duration-300"
              >
                <h2 className="text-xl font-black text-white mb-3 group-hover:text-[#007acc] transition-colors duration-300">
                  {s.title}
                </h2>
                <p className="text-slate-400 leading-relaxed text-[15px]">{s.content}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-16 p-8 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
            <h2 className="text-lg font-black text-white mb-2">Questions about these Terms?</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              If you have any questions about our Terms of Service, please contact our legal team at{" "}
              <a href="mailto:legal@markopolo.com" className="text-[#007acc] hover:text-[#ff8c42] transition-colors duration-200 font-bold">
                legal@markopolo.com
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

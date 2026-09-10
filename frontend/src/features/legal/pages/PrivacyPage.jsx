import { ShieldCheck, ChevronRight } from "lucide-react";
import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";

const sections = [
  {
    id: "overview",
    title: "1. Overview",
    content: `Markopolo ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit and use our platform. Please read this policy carefully. If you disagree with its terms, please discontinue use of the Platform.`,
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    content: `We may collect information about you in the following ways: (a) Information you provide directly, such as name, email address, profile photo, and review content when you register or use our services; (b) Automatically collected information, such as IP address, browser type, operating system, referring URLs, and usage data collected via cookies and similar technologies; (c) Third-party information. If you connect social accounts, we may receive profile information from those providers.`,
  },
  {
    id: "use",
    title: "3. How We Use Your Information",
    content: `We use the information we collect to: operate, maintain, and improve the Platform; process transactions and send related notices; respond to customer service requests; send promotional communications (with your consent); monitor and analyze usage and trends; detect and prevent fraudulent or abusive activity; comply with legal obligations; and personalize your experience on Markopolo.`,
  },
  {
    id: "sharing",
    title: "4. Sharing of Information",
    content: `We do not sell your personal information. We may share your information with: (a) trusted service providers who assist us in operating the Platform under strict confidentiality obligations; (b) business partners with your consent; (c) law enforcement or government agencies when required by law; (d) a successor entity in the event of a merger, acquisition, or sale of assets, with notice provided to you.`,
  },
  {
    id: "cookies",
    title: "5. Cookies & Tracking Technologies",
    content: `We use cookies, web beacons, and similar technologies to enhance your experience, analyze traffic, and personalize content. You can control cookie preferences through your browser settings or our Cookie Preference Center. Note that disabling certain cookies may affect Platform functionality. For full details, see our Cookie Policy.`,
  },
  {
    id: "retention",
    title: "6. Data Retention",
    content: `We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time. We may retain certain information as required by law or for legitimate business purposes such as fraud prevention and dispute resolution.`,
  },
  {
    id: "security",
    title: "7. Security of Your Information",
    content: `We implement industry-standard security measures including encryption in transit (TLS), hashed passwords, and access controls to protect your personal information. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security and encourage you to use strong, unique passwords.`,
  },
  {
    id: "rights",
    title: "8. Your Rights & Choices",
    content: `Depending on your location, you may have the following rights: access to your personal data, correction of inaccurate data, deletion of your data ("right to be forgotten"), restriction or objection to processing, and data portability. To exercise these rights, contact us at privacy@markopolo.com. We will respond within 30 days.`,
  },
  {
    id: "children",
    title: "9. Children's Privacy",
    content: `Markopolo is not intended for users under the age of 16. We do not knowingly collect personal information from children. If you believe a child under 16 has provided us with personal information, please contact us immediately and we will take steps to remove that information and terminate the child's account.`,
  },
  {
    id: "updates",
    title: "10. Updates to This Policy",
    content: `We may update this Privacy Policy periodically. When we do, we will revise the "Last updated" date and, where appropriate, notify you by email or through a prominent notice on the Platform. We encourage you to review this Policy regularly to stay informed about how we protect your information.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        {/* Hero */}
        <section className="px-6 max-w-4xl lg:max-w-7xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#ff8c42]/10 flex items-center justify-center ring-1 ring-[#ff8c42]/20">
              <ShieldCheck size={24} className="text-[#ff8c42]" />
            </div>
            <span className="text-[#ff8c42] text-sm font-black uppercase tracking-[0.2em]">Legal</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 leading-[1.1] pb-2">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl lg:max-w-3xl">
            Your privacy is fundamental to us. This policy describes how Markopolo collects, uses, and protects your personal information.
          </p>
          <p className="text-slate-500 text-sm mt-4 font-medium">
            Last updated: <span className="text-slate-400">April 1, 2026</span>
          </p>
        </section>

        {/* Quick Nav */}
        <section className="px-6 max-w-4xl lg:max-w-7xl mx-auto mb-16">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-xs font-black text-[#ff8c42] uppercase tracking-[0.2em] mb-4">Table of Contents</h2>
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
                className="border-l-2 border-[#ff8c42]/30 pl-6 group hover:border-[#ff8c42] transition-colors duration-300"
              >
                <h2 className="text-xl font-black text-white mb-3 group-hover:text-[#ff8c42] transition-colors duration-300">
                  {s.title}
                </h2>
                <p className="text-slate-400 leading-relaxed text-[15px]">{s.content}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-16 p-8 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
            <h2 className="text-lg font-black text-white mb-2">Privacy Questions or Requests?</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              To exercise your privacy rights or ask questions about this policy, contact our Data Protection Officer at{" "}
              <a href="mailto:privacy@markopolo.com" className="text-[#ff8c42] hover:text-[#007acc] transition-colors duration-200 font-bold">
                privacy@markopolo.com
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

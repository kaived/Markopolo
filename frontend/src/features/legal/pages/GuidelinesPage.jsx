import { BookOpen, ChevronRight, Star, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";

const dos = [
  "Write honest, firsthand reviews based on your genuine experience.",
  "Be specific and constructive. Describe what was helpful or what could improve.",
  "Disclose any conflicts of interest (e.g., if you received a free product).",
  "Treat all users with respect, regardless of differing opinions.",
  "Report suspicious or abusive content using our built-in reporting tools.",
  "Keep your account information accurate and up to date.",
];

const donts = [
  "Post fake, fabricated, or incentivized reviews without disclosure.",
  "Use hate speech, harassment, or personal attacks toward individuals or groups.",
  "Share private or confidential information about others without consent.",
  "Create multiple accounts to manipulate ratings or reviews.",
  "Impersonate another person, brand, or organization.",
  "Engage in coordinated campaigns to artificially inflate or deflate ratings.",
];

const sections = [
  {
    id: "purpose",
    title: "1. Purpose of These Guidelines",
    content:
      "Markopolo's Community Guidelines exist to maintain a trustworthy, respectful, and genuinely useful platform for everyone. These guidelines apply to all content submitted to Markopolo, including reviews, comments, profile information, and messages. Violation of these guidelines may result in content removal, account suspension, or permanent ban.",
  },
  {
    id: "content-standards",
    title: "2. Content Standards",
    content:
      "All content must be original, truthful, and based on real experiences. Reviews should be relevant to the subject being reviewed. We do not allow off-topic content, spam, promotional material (unless clearly disclosed), or content designed to mislead. Content that is factually incorrect and potentially harmful to individuals or organizations may be removed.",
  },
  {
    id: "respect",
    title: "3. Respect & Civility",
    content:
      "We welcome critical feedback, but it must be expressed respectfully. Personal attacks, threats, bullying, and discriminatory language based on race, gender, religion, nationality, sexual orientation, disability, or any other protected characteristic are strictly prohibited. Robust debate is welcome; abuse is not.",
  },
  {
    id: "authenticity",
    title: "4. Authenticity & Conflicts of Interest",
    content:
      "Reviews must reflect genuine experiences. If you have a personal or financial relationship with the subject of your review (e.g., you are an employee, investor, or competitor), you must disclose this. Reviews written under conditions of compensation, coercion, or conflict of interest without disclosure will be removed.",
  },
  {
    id: "privacy",
    title: "5. Privacy & Personal Data",
    content:
      "Do not share another person's private information, including contact details, home address, financial information, or any data they have not publicly disclosed. Publishing such information ('doxxing') is a serious violation that will result in immediate account termination and may be reported to law enforcement.",
  },
  {
    id: "intellectual-property",
    title: "6. Intellectual Property",
    content:
      "Only post content you own or have the right to share. Do not reproduce copyrighted text, images, or other media without proper authorization. If you believe content on Markopolo infringes your intellectual property rights, please submit a DMCA takedown request through our designated legal channel.",
  },
  {
    id: "enforcement",
    title: "7. Enforcement & Appeals",
    content:
      "Our trust and safety team reviews flagged content and account reports. Decisions are made in good faith based on these Guidelines. If you believe a decision was made in error, you may submit an appeal within 14 days through your account settings. We aim to respond to all appeals within 7 business days.",
  },
];

export default function CommunityGuidelinesPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        {/* Hero */}
        <section className="px-6 max-w-4xl lg:max-w-7xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 flex items-center justify-center ring-1 ring-emerald-400/20">
              <BookOpen size={24} className="text-emerald-400" />
            </div>
            <span className="text-emerald-400 text-sm font-black uppercase tracking-[0.2em]">Legal</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 leading-[1.1] pb-2">
            Community Guidelines
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl lg:max-w-3xl">
            Our community thrives on trust, honesty, and respect. These guidelines help us maintain a safe and meaningful space for everyone.
          </p>
          <p className="text-slate-500 text-sm mt-4 font-medium">
            Last updated: <span className="text-slate-400">April 1, 2026</span>
          </p>
        </section>

        {/* Do's & Don'ts */}
        <section className="px-6 max-w-4xl lg:max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do's */}
            <div className="bg-emerald-400/[0.04] border border-emerald-400/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5 -ml-1">
                <CheckCircle size={20} className="text-emerald-400" />
                <h2 className="text-sm font-black text-emerald-400 uppercase tracking-[0.2em]">What We Encourage</h2>
              </div>
              <ul className="space-y-3">
                {dos.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                    <Star size={14} className="text-emerald-400 mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts */}
            <div className="bg-red-400/[0.04] border border-red-400/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5 -ml-1">
                <XCircle size={20} className="text-red-400" />
                <h2 className="text-sm font-black text-red-400 uppercase tracking-[0.2em]">What Is Not Allowed</h2>
              </div>
              <ul className="space-y-3">
                {donts.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                    <AlertTriangle size={14} className="text-red-400 mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Sections */}
        <section className="px-6 max-w-4xl lg:max-w-7xl mx-auto">
          <div className="space-y-10">
            {sections.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="border-l-2 border-emerald-400/30 pl-6 group hover:border-emerald-400 transition-colors duration-300"
              >
                <h2 className="text-xl font-black text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                  {s.title}
                </h2>
                <p className="text-slate-400 leading-relaxed text-[15px]">{s.content}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-16 p-8 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
            <h2 className="text-lg font-black text-white mb-2">See Something That Violates These Guidelines?</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Use the in-app report button on any review or profile, or reach out to our Trust & Safety team at{" "}
              <a href="mailto:safety@markopolo.com" className="text-emerald-400 hover:text-[#ff8c42] transition-colors duration-200 font-bold">
                safety@markopolo.com
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

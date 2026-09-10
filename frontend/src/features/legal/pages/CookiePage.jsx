import { Cookie, ChevronRight, ToggleLeft } from "lucide-react";
import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";

const cookieTypes = [
  {
    name: "Strictly Necessary",
    required: true,
    color: "text-emerald-400",
    ring: "ring-emerald-400/20",
    bg: "bg-emerald-400/10",
    description:
      "These cookies are essential for the Platform to function correctly. They enable core features like user authentication, session management, and security. They cannot be disabled.",
    examples: ["session_token", "csrf_token", "auth_state"],
  },
  {
    name: "Performance & Analytics",
    required: false,
    color: "text-[#007acc]",
    ring: "ring-[#007acc]/20",
    bg: "bg-[#007acc]/10",
    description:
      "These cookies help us understand how visitors interact with the Platform by collecting anonymous usage data. This allows us to improve performance and user experience.",
    examples: ["_ga", "_gid", "mp_analytics"],
  },
  {
    name: "Functional",
    required: false,
    color: "text-violet-400",
    ring: "ring-violet-400/20",
    bg: "bg-violet-400/10",
    description:
      "Functional cookies remember your preferences and settings (like language, theme, or region) to provide a personalized experience on return visits.",
    examples: ["user_prefs", "locale", "ui_theme"],
  },
  {
    name: "Marketing & Targeting",
    required: false,
    color: "text-[#ff8c42]",
    ring: "ring-[#ff8c42]/20",
    bg: "bg-[#ff8c42]/10",
    description:
      "These cookies are used to deliver relevant advertisements and track the effectiveness of our marketing campaigns across partner websites. We share this data only with trusted advertising partners.",
    examples: ["_fbp", "ads_id", "campaign_track"],
  },
];

const sections = [
  {
    id: "what-are-cookies",
    title: "1. What Are Cookies?",
    content:
      "Cookies are small text files placed on your device when you visit a website. They help websites remember information about your visit, making your next visit easier and more useful. Cookies can be 'session' cookies (deleted when you close your browser) or 'persistent' cookies (remaining for a defined period).",
  },
  {
    id: "how-we-use",
    title: "2. How We Use Cookies",
    content:
      "Markopolo uses cookies to keep you signed in, remember your preferences, analyze site traffic and patterns, personalize content, and measure the effectiveness of marketing campaigns. Our cookies are set either by Markopolo directly (first-party) or by trusted third-party services we use.",
  },
  {
    id: "third-party",
    title: "3. Third-Party Cookies",
    content:
      "Some cookies on our Platform are set by third-party providers such as Google Analytics, Meta Pixel, and other analytics or advertising services. These third parties have their own privacy policies governing cookie usage. We recommend reviewing those policies for full transparency.",
  },
  {
    id: "manage",
    title: "4. Managing Your Preferences",
    content:
      "You can control non-essential cookies through our Cookie Preference Center accessible from any page footer. You may also manage cookies through your browser settings. Most browsers allow you to refuse or delete cookies. Note that disabling certain cookies may impact Platform functionality and your experience.",
  },
  {
    id: "updates",
    title: "5. Updates to This Policy",
    content:
      "We may update this Cookie Policy as our use of cookies evolves or applicable law changes. Updates will be reflected by revising the 'Last updated' date. Where required by law, we will seek your renewed consent for any material changes.",
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        {/* Hero */}
        <section className="px-6 max-w-4xl lg:max-w-7xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-violet-400/10 flex items-center justify-center ring-1 ring-violet-400/20">
              <Cookie size={24} className="text-violet-400" />
            </div>
            <span className="text-violet-400 text-sm font-black uppercase tracking-[0.2em]">Legal</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 leading-[1.1] pb-2">
            Cookie Policy
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl lg:max-w-3xl">
            We believe in full transparency about how we use cookies and similar technologies on the Markopolo platform.
          </p>
          <p className="text-slate-500 text-sm mt-4 font-medium">
            Last updated: <span className="text-slate-400">April 1, 2026</span>
          </p>
        </section>

        {/* Cookie Types Cards */}
        <section className="px-6 max-w-4xl lg:max-w-7xl mx-auto mb-16">
          <h2 className="text-xs font-black text-violet-400 uppercase tracking-[0.2em] mb-6">Types of Cookies We Use</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cookieTypes.map((type) => (
              <div
                key={type.name}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${type.bg} flex items-center justify-center ring-1 ${type.ring}`}>
                    <ToggleLeft size={20} className={type.color} />
                  </div>
                  <span
                    className={`text-xs font-black px-2.5 py-1 rounded-full ${
                      type.required
                        ? "bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20"
                        : "bg-white/5 text-slate-500 ring-1 ring-white/10"
                    }`}
                  >
                    {type.required ? "Always On" : "Optional"}
                  </span>
                </div>
                <h3 className={`font-black text-base mb-2 ${type.color}`}>{type.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{type.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {type.examples.map((ex) => (
                    <code key={ex} className="text-xs bg-white/5 text-slate-500 px-2 py-0.5 rounded-lg font-mono">
                      {ex}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sections */}
        <section className="px-6 max-w-4xl lg:max-w-7xl mx-auto">
          <div className="space-y-10">
            {sections.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="border-l-2 border-violet-400/30 pl-6 group hover:border-violet-400 transition-colors duration-300"
              >
                <h2 className="text-xl font-black text-white mb-3 group-hover:text-violet-400 transition-colors duration-300">
                  {s.title}
                </h2>
                <p className="text-slate-400 leading-relaxed text-[15px]">{s.content}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-16 p-8 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
            <h2 className="text-lg font-black text-white mb-2">Cookie Questions?</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              For questions about our use of cookies, please contact us at{" "}
              <a href="mailto:privacy@markopolo.com" className="text-violet-400 hover:text-[#ff8c42] transition-colors duration-200 font-bold">
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

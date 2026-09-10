
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What is Markopolo?",
    answer: "Markopolo is a community-driven platform where users can discover, share, and read authentic reviews about local businesses, restaurants, hotels, and services. We help you make informed decisions based on real experiences."
  },
  {
    id: 2,
    question: "How do I submit a review?",
    answer: "Simply create an account, search for the business you want to review, and click 'Write a Review'. Share your experience, rate the service, and help others in the community make better choices."
  },
  {
    id: 3,
    question: "Are the reviews verified?",
    answer: "Yes! We use a combination of AI moderation and community reporting to ensure reviews are authentic. We also verify users through email and phone verification to maintain trust and quality."
  },
  {
    id: 4,
    question: "Can businesses respond to reviews?",
    answer: "Absolutely! Business owners can claim their listings and respond to reviews. This creates a transparent dialogue between businesses and customers, helping resolve issues and build trust."
  },
  {
    id: 5,
    question: "Is Markopolo free to use?",
    answer: "Yes, Markopolo is completely free for users to browse reviews, write reviews, and interact with the community. Business listings also have a free tier with optional premium features."
  },
  {
    id: 6,
    question: "How can I connect with other reviewers?",
    answer: "Use our Connections feature to follow reviewers whose taste matches yours. You can also join community discussions, share tips, and build a network of trusted local guides."
  }
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div 
      className={`
        group rounded-3xl border transition-all duration-500 overflow-hidden
        ${isOpen 
          ? 'bg-[#0f172a] border-[#007acc]/40 shadow-[0_0_40px_rgba(0,122,204,0.15)]' 
          : 'bg-[#020617] border-white/10 hover:border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'}
      `}
    >
      <button
        onClick={onToggle}
        className="
          w-full flex items-center justify-between py-6 px-8
          text-left transition-colors relative z-20
        "
      >
        <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
          {faq.question}
        </span>
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          transition-all duration-500
          ${isOpen ? 'bg-[#007acc] text-white rotate-180' : 'bg-white/5 text-slate-500 group-hover:text-slate-300'}
        `}>
          <ChevronDown size={20} strokeWidth={2.5} />
        </div>
      </button>
      <div
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-8 pb-8 text-base text-slate-400 leading-relaxed border-t border-white/5 pt-6">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full py-24 overflow-hidden bg-[#020617] z-10">
      {/* Deep Sapphire Atmospheric Glows (Distinct Support Vibe) */}
      <div className="absolute top-0 left-0 h-[500px] w-[500px] bg-[#007acc]/10 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] bg-[#8b5cf6]/5 blur-[130px] rounded-full translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <div className="relative mx-auto max-w-[1750px] px-6 md:px-12">
        {/* Section Header */}
        <div 
          data-aos="fade-up"
          className="text-left mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white zalando-sans-expanded tracking-tight drop-shadow-sm mb-4">
            Common <span className="text-[#007acc]">Questions</span>
          </h2>
          <p className="text-slate-400 text-lg font-medium tracking-wide">
            Everything you need to know about the Markopolo discovery community.
          </p>
        </div>

        {/* FAQ List: Midnight Slate Accordion System */}
        <div className="flex flex-col gap-5">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <FAQItem
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => toggleFAQ(faq.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

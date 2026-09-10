import { Link } from "react-router-dom";
import { Heart, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

// Zero-Dependency Modern Social Icons (Using Lucide-React + React-Icons for branding)
const SocialIcons = {
  Instagram: (props) => <Instagram size={20} strokeWidth={2} className="antialiased" {...props} />,
  Facebook: (props) => <Facebook size={20} strokeWidth={2} className="antialiased" {...props} />,
  LinkedIn: (props) => <Linkedin size={20} strokeWidth={2} className="antialiased" {...props} />,
  X: (props) => <FaXTwitter size={20} className="antialiased" {...props} />,
  YouTube: (props) => <Youtube size={20} strokeWidth={2} className="antialiased" {...props} />,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Insights", path: "/insights" },
      { name: "Contact", path: "/contact" },
    ],
    "Quick Links": [
      { name: "Trending Now", path: "/trending" },
      { name: "Newest Reviews", path: "/newest-reviews" },
      { name: "Help Center", path: "/help-center" },
      { name: "Society Blog", path: "/society-blog" },
    ],
    Platform: [
      { name: "Verified Reviews", path: "/verified" },
      { name: "Top This Week", path: "/last-weeks-reviews" },
      { name: "Popular Reviews", path: "/connections" },
      { name: "Browse All", path: "/browse" },
    ],
    Legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "Guidelines", path: "/guidelines" },
    ],
  };

  return (
    <footer className="bg-[#080c1d] relative">
      {/* Absolute Interaction Shield - Bulletproof Sticky Hover Fix */}
      <style>
        {`
          @media (hover: hover) and (pointer: fine) {
            .social-btn:hover {
              background-color: var(--brand-color) !important;
              color: white !important;
              border-color: transparent !important;
              box-shadow: 0 10px 25px rgba(255, 255, 255, 0.08);
            }
            .footer-link:hover {
              color: #ff8c42 !important;
              transform: translateX(4px);
            }
            .bottom-bar-group:hover .bottom-bar-text {
              color: #94a3b8 !important; /* text-slate-400 */
            }
            .bottom-bar-group:hover .bottom-bar-heart {
              transform: scale(1.25);
            }
          }
        `}
      </style>

      <div className="mx-auto max-w-7xl px-6 pt-12 md:pt-16 pb-8 md:pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          
          {/* Logo & Slogan Section */}
          <div className="col-span-2 lg:col-span-2">
            <div
              className="text-2xl sm:text-[26px] md:text-3xl font-black tracking-tighter zalando-sans-expanded bg-gradient-to-r from-[#ff8c42] to-[#007acc] bg-clip-text text-transparent inline-block mb-4 drop-shadow-[0_0_15px_rgba(255,140,66,0.2)] pr-2 cursor-default select-none"
            >
              Markopolo
            </div>
            <p className="text-slate-400 text-base leading-relaxed max-w-xs font-bold italic opacity-80 mb-8">
              Your opinion matters to build a better society!
            </p>

            {/* Social Icons - Zero Dependency Automatic Floating */}
            <div className="flex items-center gap-3">
              {[
                { icon: SocialIcons.Instagram, name: "Instagram", color: "#E1306C" },
                { icon: SocialIcons.Facebook, name: "Facebook", color: "#1877F2" },
                { icon: SocialIcons.LinkedIn, name: "LinkedIn", color: "#0077B5" },
                { icon: SocialIcons.X, name: "X", color: "#000000" },
                { icon: SocialIcons.YouTube, name: "YouTube", color: "#FF0000" }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  style={{ "--brand-color": social.color }}
                  className="
                    social-btn w-10 h-10 rounded-xl bg-white/5 border border-white/10 
                    flex items-center justify-center text-slate-400 
                    transition-all duration-300 group
                    active:scale-95 active:opacity-60
                  "
                  aria-label={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3 className="text-xs font-bold text-[#007acc]/80 uppercase tracking-[0.2em] mb-6 cursor-default">
                {category}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="footer-link text-sm font-bold text-slate-400 active:opacity-60 transition-all duration-300 block active:scale-[0.98]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar: Decentralized Horizon */}
        <div className="mt-10 md:mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-500 font-bold tracking-wide">
            © {currentYear} Markopolo. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 bottom-bar-group cursor-default">
            <span className="text-xs text-slate-500 font-bold tracking-wide transition-colors duration-300 bottom-bar-text">
              Built with
            </span>
            <Heart size={14} className="text-red-500 fill-red-500/20 transition-transform duration-500 bottom-bar-heart" />
            <span className="text-xs text-slate-500 font-bold tracking-wide transition-colors duration-300 bottom-bar-text">
              for society
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

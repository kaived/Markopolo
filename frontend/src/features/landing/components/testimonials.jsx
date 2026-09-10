import { useState, useEffect, useRef } from "react";
import { Quote, Star, User } from "lucide-react";
import { Card } from "../../../components/common/card";

const testimonials = [
  {
    id: 1,
    content: "Markopolo helped me find the best restaurants in my area. The reviews are honest and detailed. It's become my go-to app for trying new places!",
    author: "Priya Mehta",
    role: "Food Blogger",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    rating: 5,
  },
  {
    id: 2,
    content: "As a business owner, I love how Markopolo connects me with my customers. The feedback helps me improve, and the platform is so easy to use.",
    author: "Rajesh Kumar",
    role: "Restaurant Owner",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g",
    rating: 5,
  },
  {
    id: 3,
    content: "I've discovered so many hidden gems through Markopolo. From cafes to fitness studios, the community reviews are always spot on!",
    author: "Ananya Singh",
    role: "Travel Enthusiast",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302h",
    rating: 5,
  },
  {
    id: 4,
    content: "The Connections feature is amazing! I follow local foodies and always find great recommendations. This app changed how I explore the city.",
    author: "Vikram Patel",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024i",
    rating: 5,
  },
  {
    id: 5,
    content: "I was skeptical at first, but Markopolo's verified reviews gave me confidence. Now I trust the platform for all my local search needs.",
    author: "Sneha Kapoor",
    role: "Marketing Manager",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704j",
    rating: 4,
  },
  {
    id: 6,
    content: "As a new resident, Markopolo helped me settle in by finding the best services around. The community is incredibly helpful and welcoming!",
    author: "Arjun Reddy",
    role: "Data Analyst",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302k",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activePage, setActivePage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const autoRotateInterval = useRef(null);

  useEffect(() => {
    const startRotation = () => {
      if (autoRotateInterval.current) clearInterval(autoRotateInterval.current);
      autoRotateInterval.current = setInterval(() => {
        if (!isHovering) {
          setActivePage((prev) => (prev + 1) % testimonials.length);
        }
      }, 3000);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startRotation();
      } else {
        clearInterval(autoRotateInterval.current);
      }
    };

    startRotation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(autoRotateInterval.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isHovering]);

  return (
    <section className="relative w-full py-24 bg-[#020617] overflow-hidden">
      {/* Exotic Crimson Atmospheric Glows */}
      <div className="absolute top-0 left-0 h-[500px] w-[500px] bg-[#ff4d4d]/5 blur-[100px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="relative mx-auto max-w-[1440px] px-6">
        {/* Section Header */}
        <div 
          className="mb-12 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#007acc]/10 border border-[#007acc]/20 text-[#007acc] text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Community Echoes
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white zalando-sans-expanded tracking-tighter drop-shadow-sm mb-6">
            Real Stories. <span className="text-[#007acc]">Verified Truth.</span>
          </h2>
          <p className="mt-3 text-slate-400 text-lg font-medium max-w-2xl mx-auto">
            Where every voice resonates with truth. Experience the collective wisdom of thousands, verified for you.
          </p>
        </div>

        {/* 3D Side-by-Side Carousel Container */}
        <div 
          className="relative h-[460px] w-full flex items-center justify-center perspective-[1500px]"
          onMouseEnter={() => {
            if (window.matchMedia("(hover: hover)").matches) setIsHovering(true);
          }}
          onMouseLeave={() => setIsHovering(false)}
        >
          {testimonials.map((testimonial, index) => {
            const total = testimonials.length;
            
            // Logic to determine relative position (0=center, 1/-1=side, others=hidden)
            let diff = index - activePage;
            
            // Normalize diff to be within [-total/2, total/2]
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const isLeft = diff === -1 || (activePage === 0 && diff === total - 1);
            const isRight = diff === 1 || (activePage === total - 1 && diff === - (total - 1));
            
            // Simplified relative diff for only 3 visible items
            // However, we want it to be more robust for different total counts
            const position = diff; // This will be -1, 0, or 1 for the 3 visible cards

            // Transformation styles
            let translateX = 0;
            let translateZ = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 0;
            let zIndex = 0;

            if (position === 0) {
              // Center
              translateX = 0;
              translateZ = 0;
              rotateY = 0;
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (position === 1) {
              // Right
              translateX = 350; 
              translateZ = -300;
              rotateY = -35;
              scale = 0.8;
              opacity = 0.4;
              zIndex = 20;
            } else if (position === -1) {
              // Left
              translateX = -350;
              translateZ = -300;
              rotateY = 35;
              scale = 0.8;
              opacity = 0.4;
              zIndex = 20;
            } else {
              // Strictly hide all other cards to prevent glitches
              // Keep them in their lateral lanes to prevent "flying through center"
              opacity = 0;
              zIndex = 0;
              translateZ = -500;
              translateX = position > 0 ? 450 : -450;
              scale = 0.5;
            }

            // Final Responsive & Anti-Overlap Logic
            if (typeof window !== "undefined") {
              const screenWidth = window.innerWidth;
              const isMobile = screenWidth < 640;
              const isTablet = screenWidth >= 640 && screenWidth < 1024;
              
              if (isMobile) {
                // Mobile: High-Visibility 3-Card Stack (per latest request)
                translateX = position === 1 ? 185 : position === -1 ? -185 : 0; 
                if (position !== 0) {
                  scale = 0.4; 
                  opacity = 0.6; 
                } else {
                  scale = 0.85; // Bold primary visibility for phones
                }
              } else if (isTablet) {
                // Tablet: High-Visibility Fit (per latest request)
                translateX = position === 1 ? 230 : position === -1 ? -230 : 0; 
                if (position !== 0) {
                  scale = 0.6; 
                  opacity = 0.6; 
                } else {
                  scale = 0.8; // Bold primary visibility for tablets
                }
              } else {
                // Desktop: 3 Cards, Wide Spread (already 620px)
              }
            }

            return (
              <div
                key={testimonial.id}
                className="absolute w-full max-w-[340px] md:max-w-[580px] will-change-transform preserve-3d"
                style={{
                  transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: opacity,
                  zIndex: position === 0 ? 40 : (Math.abs(position) <= 1.5 ? 30 : -1000),
                  pointerEvents: position === 0 ? "auto" : "none",
                  transition: Math.abs(position) <= 1.5
                    ? "transform 600ms cubic-bezier(0.34, 1.25, 0.64, 1), opacity 600ms cubic-bezier(0.34, 1.25, 0.64, 1), visibility 600ms cubic-bezier(0.34, 1.25, 0.64, 1), filter 600ms ease-in-out" 
                    : "none",
                  visibility: Math.abs(position) <= 1.5 ? "visible" : "hidden",
                  filter: position === 0 ? "blur(0px)" : "blur(4px)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <Card
                  variant="none"
                  hoverable={isCenter}
                  innerGlow={isCenter}
                  rounded="rounded-[3rem]"
                  className={`
                    relative w-full p-10 md:p-12 min-h-[460px] md:min-h-0
                    ${isCenter ? "bg-[#0f172a]" : "bg-[#1e293b]/80"}
                    border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                    backdrop-blur-sm
                  `}
                >
                  <Quote 
                    size={64} 
                    className={`absolute top-8 right-8 transition-opacity duration-700 ${isCenter ? "opacity-10 text-[#007acc]" : "opacity-0"}`} 
                  />

                  <div className="flex gap-1.5 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        className={`transition-all duration-700 ${i < testimonial.rating ? "fill-[#ff8c42] text-[#ff8c42] drop-shadow-[0_0_8px_rgba(255,140,66,0.5)]" : "text-white/5"}`} 
                      />
                    ))}
                  </div>

                  <p className="text-slate-200 text-lg md:text-xl italic font-medium leading-[1.8] mb-12 line-clamp-6 md:line-clamp-4">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-[#007acc]/10 border border-[#007acc]/20 flex items-center justify-center">
                      <User size={28} className="text-[#007acc]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white">{testimonial.author}</h4>
                      <p className="text-xs font-black text-[#60a5fa] uppercase tracking-wider">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-4 mt-0">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActivePage(i)}
              className={`
                group relative h-2 transition-all duration-500 rounded-full
                ${activePage === i 
                  ? "w-12 bg-[#007acc]" 
                  : "w-2 bg-white/20 hover:bg-white/40"}
              `}
              aria-label={`Go to testimonial ${i + 1}`}
            >
              {activePage === i && (
                <span className="absolute inset-0 bg-[#007acc] blur-[8px] opacity-60 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

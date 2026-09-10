
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Toggle visibility based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top with grounding nudge animation
  const scrollToTop = () => {
    setIsClicked(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    
    // Smoothly return arrow to home position
    setTimeout(() => setIsClicked(false), 400);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-24 right-7 sm:bottom-28 sm:right-9
        flex items-center justify-center
        w-12 h-12 rounded-full
        bg-[#ff8c42] 
        text-white shadow-md
        [@media(hover:hover)]:hover:shadow-lg 
        active:scale-95 lg:active:scale-100
        transition-all duration-300
        z-[9999] overflow-hidden
        ${isVisible ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-8"}
      `}
      aria-label="Scroll to top"
    >
      <ArrowUp 
        size={24} 
        strokeWidth={3} 
        className={`transition-all duration-400 transform ${isClicked ? "-translate-y-2" : "translate-y-0"}`} 
      />
    </button>
  );
}

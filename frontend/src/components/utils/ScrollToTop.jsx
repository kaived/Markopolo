import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * Ensures the window scrolls to (0, 0) on every route change.
 * This provides a standard "multi-page" feel in an SPA.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the page on pathname change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // "instant" for immediate reset, "smooth" if preferred
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;

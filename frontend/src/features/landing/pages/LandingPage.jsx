import Navbar from "../../../components/layout/navbar";
import Hero from "../components/hero";
import TrendingReviews from "../components/trendingReviews";
import TodaysReviews from "../components/todaysReviews";
import LastWeeksReviews from "../components/lastWeeksReviews";
import FAQ from "../components/faq";
import Newsletter from "../components/newsletter";
import Testimonials from "../components/testimonials";
import Footer from "../../../components/layout/footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Landing() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  return (
    <>
      <Navbar />
      <Hero />
      <TrendingReviews />
      <TodaysReviews />
      <LastWeeksReviews />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
    </>
  );
}

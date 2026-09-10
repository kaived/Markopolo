import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Star, User, Quote, Heart, BadgeCheck } from "lucide-react";
import { Card } from "../../../components/common/card.jsx";

const lastWeeksReviews = [
  {
    id: 101,
    author: "Amit Kapoor",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026025a",
    rating: 5,
    place: "The Grand Palace Hotel",
    content: "Impeccable service and stunning rooms. Our anniversary trip was perfect!",
    isFavorite: true,
  },
  {
    id: 102,
    author: "Neha Sharma",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705a",
    rating: 4,
    place: "Spice Garden Restaurant",
    content: "Authentic flavors with great ambiance. The biryani was outstanding.",
  },
  {
    id: 103,
    author: "Raj Malhotra",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026303a",
    rating: 5,
    place: "Elite Fitness Club",
    content: "Best gym equipment in the city. Personal trainers are top-notch!",
    isFavorite: true,
  },
  {
    id: 104,
    author: "Pooja Reddy",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705c",
    rating: 4,
    place: "Lakeside Café",
    content: "Beautiful views and great coffee. Perfect spot for remote work.",
  },
  {
    id: 105,
    author: "Karan Singh",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026025b",
    rating: 5,
    place: "City Mall Cinema",
    content: "Premium experience with recliner seats. Sound quality is exceptional!",
  },
  {
    id: 106,
    author: "Sanya Gupta",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026303b",
    rating: 5,
    place: "Zen Spa & Wellness",
    content: "Most relaxing spa experience ever. The aromatherapy massage was divine.",
  },
];

export default function LastWeeksReviews() {
  const [favorites, setFavorites] = useState({});
  const [animatingId, setAnimatingId] = useState(null);

  const toggleFavorite = (e, id) => {
    e.preventDefault();
    const isFavoriting = !favorites[id];
    setFavorites(prev => ({
      ...prev,
      [id]: isFavoriting
    }));
    
    if (isFavoriting) {
      setAnimatingId(id);
      setTimeout(() => setAnimatingId(null), 300);
    }
  };

  // Use 2x duplication for a MATHEMATICALLY SEAMLESS infinite scroll (-50% translation)
  const duplicatedReviews = [...lastWeeksReviews, ...lastWeeksReviews];

  return (
    <section className="relative w-full py-24 overflow-hidden bg-[#020617] z-10 transition-colors duration-1000">
      {/* Cosmic Emerald Atmospheric Glows (Distinct Discovery Vibe) */}
      <div className="absolute top-0 left-0 h-[400px] w-[400px] bg-[#007acc]/5 blur-[100px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-[#00f5d4]/10 blur-[130px] rounded-full translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div 
        className="relative w-full px-8 md:px-16 mb-12 text-left">
        {/* Section Header */}
        <Link 
          to="/last-weeks-reviews" 
          className="inline-flex items-center gap-3 group transition-colors"
        >
          <h2 className="text-3xl font-extrabold text-white zalando-sans-expanded tracking-tight drop-shadow-sm">
            Last Week's Reviews
          </h2>
          <ChevronRight 
            size={28} 
            className="text-[#007acc] transition-all group-hover:translate-x-2" 
          />
        </Link>
        <p className="mt-3 text-slate-400 text-sm font-medium tracking-wide">
          The definitive weekly collection. Elite insights from our top-rated community.
        </p>
      </div>

      {/* Full-Width Carousel Wrapper (Synchronized with Today's Reviews Precision) */}
      <div 
        className="relative w-full pl-8 md:pl-16">
        <div 
          className="relative flex overflow-hidden py-10"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent 100%)',
            perspective: '1px',
            WebkitPerspective: '1px',
            transform: 'translate3d(0, 0, 0)'
          }}
        >

          <div 
            className="flex gap-10 animate-scroll-reverse hover:pause transform-gpu antialiased will-change-transform"
            style={{ width: "max-content" }}
          >
            {duplicatedReviews.map((review, index) => (
              <Card
                key={`${review.id}-${index}`}
                as={Link}
                to={`/review/${review.id}`}
                variant="dark"
                innerGlow
                rounded="rounded-[2.5rem]"
                className="
                  group flex-shrink-0 w-[280px] h-[400px] overflow-hidden
                  flex flex-col transform-gpu p-0
                "
              >
                {/* 
                  STABILITY HACK: ZERO-ARTIFACT SKIN
                  Removed static borders to prevent 'Aliasing Leaks'.
                */}
                
                {/* Top Section - Original Stylized Height */}
                <div className="relative h-36 flex-shrink-0 bg-gradient-to-br from-[#007acc]/20 via-[#007acc]/10 to-[#ff8c42]/10 flex items-center justify-center border-b border-white/5">
                  <Quote size={56} className="text-[#007acc]/20" />
                  
                  {/* Top-Left: Star Rating Badge */}
                  <div className="absolute top-5 left-5 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ff8c42]/10 border border-[#ff8c42]/20 shadow-sm backdrop-blur-md">
                    <Star size={12} className="fill-[#ff8c42] text-[#ff8c42]" />
                    <span className="text-[10px] font-black text-[#ff8c42] tracking-tighter">
                      {review.rating}.0
                    </span>
                  </div>

                  {/* Floating Favorite Action */}
                  <button 
                    onClick={(e) => toggleFavorite(e, review.id)}
                    className={`absolute top-4 right-5 z-30 p-2 rounded-full transition-all duration-300 ${favorites[review.id] || review.isFavorite ? "text-rose-500 fill-rose-500/10" : "text-white/10 hover:text-white/30"}`}
                  >
                    <Heart 
                      size={22} 
                      className={`transition-all duration-300 ${animatingId === review.id ? "scale-150" : "scale-100"} ${favorites[review.id] || review.isFavorite ? "fill-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" : "hover:scale-110"}`} 
                    />
                  </button>

                  {/* User Icon Overlay */}
                  <div className="absolute -bottom-6 left-6">
                    <div className="w-14 h-14 rounded-full bg-slate-950 border-4 border-[#020617] flex items-center justify-center shadow-xl">
                      <User size={24} className="text-[#007acc]" />
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Robust Content Flow */}
                <div className="flex-1 p-7 pt-10 flex flex-col min-h-0 overflow-hidden">
                  {/* Author & Place */}
                  <h3 className="text-sm font-black text-white tracking-wide flex items-center gap-2">
                    {review.author}
                    <BadgeCheck size={16} className="text-[#007acc] fill-[#007acc]/10" />
                  </h3>
                  <p className="text-[11px] font-medium text-slate-400 mb-4">
                    reviewed <span className="text-[#60a5fa] font-bold">{review.place}</span>
                  </p>

                  {/* Review Content */}
                  <div className="flex-1 min-h-0">
                    <p className="text-[13px] text-slate-300 italic leading-[1.6] line-clamp-4">
                      "{review.content}"
                    </p>
                  </div>

                  {/* Grounded Button (Pushed to bottom) */}
                  <div className="mt-auto pt-6 border-t border-white/5 flex justify-center">
                    <div className="
                      min-w-[160px] py-2.5 text-[11px] font-black
                      bg-[#007acc] text-white rounded-2xl text-center
                      hover:bg-[#005f99] transition-all duration-300
                      active:scale-95 shadow-md uppercase tracking-[0.2em]
                    ">
                      View Details
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

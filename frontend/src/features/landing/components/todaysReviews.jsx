import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Star, User, Heart, BadgeCheck, ChevronLeft, Quote } from "lucide-react";
import { Card } from "../../../components/common/card.jsx";

const todaysReviews = [
  {
    id: 1,
    author: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024e",
    rating: 5,
    place: "Sunset Café",
    content: "The ambiance was perfect for a quiet evening. Coffee was exceptional!",
    isFavorite: true,
  },
  {
    id: 2,
    author: "Rahul Verma",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
    rating: 4.5,
    place: "Tech Hub Co-working",
    content: "Great workspace with fast WiFi. Could use more meeting rooms.",
  },
  {
    id: 3,
    author: "Ananya Gupta",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302e",
    rating: 5,
    place: "Mountain View Resort",
    content: "Breathtaking views and excellent service. A must-visit!",
    isFavorite: true,
  },
  {
    id: 4,
    author: "Vikram Singh",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
    rating: 5,
    place: "Urban Fitness Studio",
    content: "Best gym in town. Trainers are knowledgeable and motivating.",
  },
  {
    id: 5,
    author: "Sneha Patel",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024c",
    rating: 4,
    place: "Garden Restaurant",
    content: "Beautiful outdoor seating. Food was delicious but a bit pricey.",
    isFavorite: true,
  },
  {
    id: 6,
    author: "Arjun Mehta",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026302f",
    rating: 5,
    place: "Beachside Bungalow",
    content: "Perfect getaway spot. Waking up to the sound of waves was magical.",
  },
];

export default function TodaysReviews() {
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

  // Duplicate items for seamless infinite scroll
  const duplicatedReviews = [...todaysReviews, ...todaysReviews];

  return (
    <section className="relative w-full py-24 overflow-hidden bg-[#020617] z-10 transition-colors duration-1000">
      {/* Cyan-Sapphire Atmospheric Glows (Distinct Discovery Vibe) */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-[#007acc]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 h-[600px] w-[600px] bg-cyan-500/10 blur-[130px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <div 
        className="relative w-full px-8 md:px-16 mb-12 text-left">
        {/* Section Header */}
        <Link 
          to="/todays-reviews" 
          className="inline-flex items-center gap-3 group transition-colors"
        >
          <h2 className="text-3xl font-extrabold text-white zalando-sans-expanded tracking-tight drop-shadow-sm">
            Today's Top Reviews
          </h2>
          <ChevronRight 
            size={28} 
            className="text-[#007acc] transition-all group-hover:translate-x-2" 
          />
        </Link>
        <p className="mt-3 text-slate-400 text-sm font-medium tracking-wide">
          The real-time pulse of discovery. Experience the latest community insights as they happen.
        </p>
      </div>

      {/* Full-Width Carousel Wrapper */}
      <div 
        className="relative w-full pl-8 md:pl-16">
        <div 
          className="relative flex overflow-hidden py-4"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent 100%)',
            perspective: '1px',
            transform: 'translate3d(0, 0, 0)'
          }}
        >

          <div 
            className="flex gap-8 animate-scroll hover:pause transform-gpu antialiased will-change-transform"
            style={{ width: "max-content" }}
          >
            {duplicatedReviews.map((review, index) => (
              <Card
                key={`${review.id}-${index}`}
                as={Link}
                to={`/review/${review.id}`}
                variant="none"
                innerGlow
                rounded="rounded-[2.5rem]"
                className="
                  group flex-shrink-0 w-[340px] h-[210px] overflow-hidden
                  flex flex-col transform-gpu antialiased p-0
                  bg-[#020617] border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.15)]
                  hover:shadow-[0_15px_35px_rgba(0,122,204,0.1)]
                  hover:border-[#007acc]/40 transition-all duration-500
                  -mr-[1px]
                "
              >
                {/* 
                  STABILITY HACK: ZERO-ARTIFACT SKIN
                  Removed static borders to prevent 'Aliasing Leaks'.
                */}
                {/* Floating Favorite Action (Enhanced Pop Animation) */}
                <button 
                  onClick={(e) => toggleFavorite(e, review.id)}
                  className={`absolute top-4 right-5 z-30 p-2 rounded-full transition-all duration-300 ${favorites[review.id] || review.isFavorite ? "text-rose-500 fill-rose-500/10" : "text-white/10 hover:text-white/30"}`}
                >
                  <Heart 
                    size={22} 
                    className={`transition-all duration-300 ${animatingId === review.id ? "scale-150" : "scale-100"} ${favorites[review.id] || review.isFavorite ? "fill-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" : "hover:scale-110"}`} 
                  />
                </button>
                
                {/* Header: User & Rating */}
                <div className="flex items-center justify-between mb-4 p-5 pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                      <User size={18} className="text-[#007acc]" />
                    </div>
                    <div className="flex-1 pr-6">
                      <h3 className="text-sm font-bold text-white/90 leading-tight flex items-center gap-1.5">
                        {review.author}
                        <BadgeCheck size={14} className="text-[#007acc] fill-[#007acc]/10" />
                      </h3>
                      <p className="text-[11px] font-medium text-slate-400">
                        reviewed <span className="text-[#60a5fa] font-bold">{review.place}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-5 flex-1 line-clamp-2">
                  <p className="text-[13px] italic text-slate-300 leading-relaxed">
                    "{review.content}"
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="mt-4 p-5 pt-5 flex justify-between items-center border-t border-white/5">
                  {/* 5-Star Rating System */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => {
                      const isFull = i < Math.floor(review.rating);
                      const isHalf = i === Math.floor(review.rating) && review.rating % 1 !== 0;
                      return (
                        <div key={i} className="relative">
                          <Star size={12} className="text-white/10" />
                          {(isFull || isHalf) && (
                            <div 
                              className="absolute inset-0 overflow-hidden" 
                              style={{ width: isFull ? '100%' : '50%' }}
                            >
                              <Star size={12} className="fill-[#ff8c42] text-[#ff8c42]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <span className="ml-1.5 text-[11px] font-black text-[#ff8c42]">
                      {review.rating % 1 === 0 ? `${review.rating}.0` : review.rating}
                    </span>
                  </div>

                  <div className="
                    px-5 py-2 bg-[#007acc] text-white rounded-2xl
                    text-[10px] font-black uppercase tracking-widest 
                    hover:bg-[#005f99] transition-all duration-300
                    active:scale-95 shadow-lg
                  ">
                    Explore Now
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

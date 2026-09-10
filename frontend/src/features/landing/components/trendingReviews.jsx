import React, { useState } from "react";
import { Star, ThumbsUp, MessageSquare, ArrowRight, User, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../../../components/common/card.jsx";

const reviews = [
  {
    id: 1,
    author: "Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    rating: 5,
    place: "The Golden Spoon",
    content: "Absolutely phenomenal experience! The atmosphere was electric and the food was out of this world.",
    likes: 124,
    comments: 12
  },
  {
    id: 2,
    author: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    rating: 4,
    place: "Tech Haven",
    content: "Great selection of gadgets. Staff was helpful but the checkout line was a bit long.",
    likes: 85,
    comments: 4
  },
  {
    id: 3,
    author: "Emily Davis",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    rating: 5,
    place: "Mountain View Hotel",
    content: "The view from the room was breathtaking. Best weekend getaway ever!",
    likes: 243,
    comments: 28
  },
  {
    id: 4,
    author: "David Wilson",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
    rating: 5,
    place: "Blue Ocean Resort",
    content: "A peaceful retreat with stunning sunset views. Highly recommend for couples looking for a quiet escape.",
    likes: 156,
    comments: 18
  },
  {
    id: 5,
    author: "Jessica Lee",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024b",
    rating: 4,
    place: "Urban Brew",
    content: "Best coffee in town! The industrial vibe and friendly baristas make it a perfect afternoon workspace.",
    likes: 92,
    comments: 7
  },
  {
    id: 6,
    author: "Robert Brown",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026302c",
    rating: 5,
    place: "Skyline Gym",
    content: "High-tech equipment and world-class trainers. The community atmosphere is very motivating for long-term goals.",
    likes: 312,
    comments: 42
  }
];

export default function TrendingReviews() {
  const [likedReviews, setLikedReviews] = useState({});
  const [animatingId, setAnimatingId] = useState(null);

  const toggleLike = (e, id) => {
    e.preventDefault();
    const isLiking = !likedReviews[id];
    setLikedReviews(prev => ({
      ...prev,
      [id]: isLiking
    }));
    
    if (isLiking) {
      setAnimatingId(id);
      setTimeout(() => setAnimatingId(null), 300);
    }
  };

  return (
    <section className="relative w-full py-24 overflow-hidden bg-[#020617] z-10 transition-colors duration-1000">
      {/* Royal Violet Atmospheric Glows (Distinct Discovery Vibe) */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-[#8b5cf6]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[600px] w-[600px] bg-[#4338ca]/10 blur-[130px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div 
          data-aos="fade-up"
          data-aos-duration="600"
          className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl zalando-sans-expanded tracking-tight drop-shadow-sm">
            Top Trending Reviews
          </h2>
          <span className="mt-8 mb-3 px-3 py-1 rounded-full bg-[#007acc] text-white text-xs font-bold tracking-wider uppercase shadow-md shadow-blue-500/10">
            Community Voices
          </span>
          <p className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
            See what the community is talking about. Discover top-rated experiences curated just for you.
          </p>
        </div>

        {/* Review Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 5).map((review, index) => (
            <Card 
              key={review.id}
              as={Link}
              to="/trending-reviews"
              variant="dark"
              innerGlow
              rounded="rounded-[2.5rem]"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={index * 50}
              className="group flex flex-col p-8 h-[340px] overflow-hidden"
            >
              {/* Header: User & Rating */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center ring-2 ring-white/10 shadow-inner overflow-hidden">
                      <User size={20} className="text-[#007acc]" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#020617] text-[10px] shadow-sm border border-white/10">
                       ⭐
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white/90 flex items-center gap-1.5">
                      {review.author}
                      <BadgeCheck size={15} className="text-[#007acc] fill-[#007acc]/10" />
                    </h3>
                    <p className="text-xs font-medium text-slate-400">reviewed <span className="text-[#60a5fa] font-bold">{review.place}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-[#ff8c42]/10 px-2.5 py-1 rounded-full border border-[#ff8c42]/20">
                  <Star size={14} className="fill-[#ff8c42] text-[#ff8c42]" />
                  <span className="text-xs font-bold text-[#ff8c42]">{review.rating}.0</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden">
                <p className="text-[15px] leading-relaxed text-slate-300 italic line-clamp-4">
                  "{review.content}"
                </p>
              </div>

              {/* Footer: Actions */}
              <div className="mt-8 flex justify-between items-center w-full border-t border-white/5 pt-6">
                <button 
                  onClick={(e) => toggleLike(e, review.id)}
                  className={`group/btn flex items-center gap-2 text-xs font-semibold transition-all duration-300 ${likedReviews[review.id] ? "text-[#ff8c42]" : "text-slate-400 hover:text-[#ff8c42]"}`}
                >
                  <ThumbsUp 
                    size={16} 
                    className={`transition-all duration-300 ${animatingId === review.id ? "scale-125" : "scale-100"} ${likedReviews[review.id] ? "fill-[#ff8c42] text-[#ff8c42]" : ""}`} 
                  />
                  {review.likes + (likedReviews[review.id] ? 1 : 0)} <span className="hidden sm:inline">Likes</span>
                </button>
                <div className="group/btn flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#007acc] transition-colors">
                  <span className="hidden sm:inline">Comment</span>
                  <MessageSquare size={16} className="transition-transform group-hover/btn:scale-110" />
                </div>
              </div>
            </Card>
          ))}

          {/* Explore More Card - Synchronized Height */}
          <Card
            as={Link}
            to="/trending-reviews"
            variant="dark"
            rounded="rounded-[2.5rem]"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="300"
            className="group flex flex-col items-center justify-center p-8 h-[340px] border-dashed hover:border-[#007acc]/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#007acc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#007acc]/10 border border-[#007acc]/20 group-hover:bg-[#007acc] transition-all duration-500">
              <ArrowRight size={28} className="text-[#007acc] group-hover:text-white transition-colors" />
            </div>
            <h3 className="mb-3 text-xl font-black text-white uppercase tracking-tight">See More</h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-[200px] mx-auto text-center">
              Browse our complete feed of verified trending reviews and discover your next favorite experience.
            </p>
            <div className="mt-8 text-[11px] font-black text-[#007acc] uppercase tracking-[0.2em] transition-all">
              View All Trending Reviews
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

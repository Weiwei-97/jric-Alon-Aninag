import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { RESORT_IMAGES } from '../data/resortData';
import { 
  Camera, 
  Heart, 
  Sparkles, 
  MapPin, 
  Share2, 
  Plus, 
  X, 
  Check, 
  Flame,
  Award
} from 'lucide-react';

export const SocialFeed: React.FC = () => {
  const { socialPosts, addSocialPost, likeSocialPost, currentUser, addNotification } = useResort();

  const [isSubmitOpen, setIsSubmitOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(currentUser?.name || 'Bea & Miguel');
  const [userHandle, setUserHandle] = useState<string>('@bea_miguel_sipalay');
  const [location, setLocation] = useState<string>('Sunset Deck • Poblacion Beach');
  const [caption, setCaption] = useState<string>('Unreal golden hour glow at Alon Aninag! 🌅 Soul rested and batteries 100% recharged! #GlowAtAlon');
  const [tag, setTag] = useState<string>('#GlowAtAlon');
  const [selectedPresetImage, setSelectedPresetImage] = useState<string>(RESORT_IMAGES.sunsetDeck);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSocialPost({
      userName,
      userHandle,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      image: selectedPresetImage,
      caption,
      location,
      tag
    });
    setIsSubmitOpen(false);
  };

  return (
    <section id="reviews" className="py-20 bg-[#FAF7F2] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADFCB] text-[#5C4E3F] text-xs font-semibold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5 text-[#C88A32]" />
              #GlowAtAlon Guest Wall
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] tracking-tight mb-2">
              Stories & Photos from Our Travelers
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5A48]">
              Share your Alon & Aninag moments on Instagram & TikTok to win a free 2-night stay every month!
            </p>
          </div>

          <button
            onClick={() => setIsSubmitOpen(true)}
            className="px-5 py-3 rounded-full bg-[#C88A32] hover:bg-[#B87A24] text-white text-xs sm:text-sm font-bold shadow-md transition cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Post Your Photo & Story</span>
          </button>
        </div>

        {/* Polaroid Style Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-3.5 pb-5 rounded-2xl shadow-md border border-[#E5DAC4] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo frame */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-[#EADFCB]">
                  <img
                    src={post.image}
                    alt={post.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded font-mono">
                    {post.tag}
                  </span>
                </div>

                {/* User author info */}
                <div className="flex items-center gap-2.5 mb-2">
                  <img
                    src={post.avatar}
                    alt={post.userName}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-[#C88A32]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#2C241D] truncate">{post.userName}</p>
                    <p className="text-[10px] text-[#8C7B68] truncate">{post.userHandle}</p>
                  </div>
                </div>

                {/* Caption */}
                <p className="text-xs text-[#5C4E3F] leading-relaxed line-clamp-3 mb-3">
                  {post.caption}
                </p>
              </div>

              {/* Bottom footer: Location & Likes */}
              <div className="pt-2 border-t border-[#F0E8D9] flex items-center justify-between text-[11px] text-[#8C7B68]">
                <span className="flex items-center gap-1 truncate max-w-[150px]">
                  <MapPin className="w-3 h-3 text-[#C88A32] shrink-0" />
                  <span className="truncate">{post.location}</span>
                </span>

                <button
                  onClick={() => likeSocialPost(post.id)}
                  className="flex items-center gap-1 text-[#E76F51] hover:scale-110 transition cursor-pointer font-bold"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{post.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* UGC Contest Banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DAC4] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E4A853]/20 flex items-center justify-center text-[#C88A32] shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#2C241D]">
                Monthly #GlowAtAlon UGC Contest
              </h4>
              <p className="text-xs sm:text-sm text-[#6B5A48]">
                Tag <strong>@alon.aninag.sipalay</strong> with hashtag <strong>#GlowAtAlon</strong> on your Instagram stories, TikToks or posts. The top voted photo each month wins a complimentary weekend stay in our Sunset Master Villa!
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSubmitOpen(true)}
            className="px-6 py-3 rounded-full bg-[#2C241D] hover:bg-[#1E1712] text-white text-xs sm:text-sm font-bold shadow-md transition whitespace-nowrap cursor-pointer"
          >
            Submit Entry
          </button>
        </div>
      </div>

      {/* Story Submission Modal */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E0D5C1] shadow-2xl relative">
            <button
              onClick={() => setIsSubmitOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF7F2] text-[#4A3E31]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#E4A853] text-[#2C241D] flex items-center justify-center font-bold">
                📷
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2C241D]">Share Your Sipalay Story</h3>
                <p className="text-xs text-[#7A6A58]">Join the #GlowAtAlon guest wall</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#6B5A48] mb-1 uppercase">Your Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#6B5A48] mb-1 uppercase">IG / TikTok Handle</label>
                  <input
                    type="text"
                    value={userHandle}
                    onChange={(e) => setUserHandle(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#6B5A48] mb-1 uppercase">Location at Resort</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#6B5A48] mb-1 uppercase">Select Photo from Stay</label>
                <div className="grid grid-cols-4 gap-2">
                  {[RESORT_IMAGES.hero, RESORT_IMAGES.suite, RESORT_IMAGES.sunsetDeck, RESORT_IMAGES.bonfire].map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="thumbnail"
                      referrerPolicy="no-referrer"
                      onClick={() => setSelectedPresetImage(img)}
                      className={`w-full aspect-square object-cover rounded-xl border-2 transition cursor-pointer ${
                        selectedPresetImage === img ? 'border-[#C88A32] scale-105' : 'border-transparent opacity-70'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#6B5A48] mb-1 uppercase">Caption / Travel Memory</label>
                <textarea
                  rows={3}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#C88A32] hover:bg-[#B87A24] text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
              >
                Post to Polaroid Guest Wall
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

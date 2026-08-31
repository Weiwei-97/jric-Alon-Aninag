import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { ACTIVITIES_DATA, RESORT_IMAGES } from '../data/resortData';
import { Activity } from '../types';
import { 
  Waves, 
  Compass, 
  Flame, 
  Clock, 
  Check, 
  Heart, 
  Calendar, 
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';

export const ActivitiesSection: React.FC = () => {
  const { formatPrice, addNotification, openBookingModal } = useResort();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [bookedSuccess, setBookedSuccess] = useState<boolean>(false);

  const handleBookActivity = (act: Activity) => {
    addNotification('Experience Booked', `${act.title} scheduled! Our resort activity concierge will coordinate your guide.`, 'booking');
    setBookedSuccess(true);
    setTimeout(() => {
      setBookedSuccess(false);
      setSelectedActivity(null);
    }, 1800);
  };

  return (
    <section id="activities" className="py-20 bg-[#FAF7F2] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADFCB] text-[#5C4E3F] text-xs font-semibold uppercase tracking-wider mb-3">
            <Waves className="w-3.5 h-3.5 text-[#508991]" />
            Adventures & Soulful Moments
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] tracking-tight mb-4">
            Curated Sipalay Experiences
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A48] leading-relaxed">
            From exploring secret hidden lagoons at Tinagong Dagat to diving historical shipwrecks in Campomanes Bay, and gathering around our nightly beachfront soul bonfires.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {ACTIVITIES_DATA.map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E5DAC4] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-[#EADFCB]">
                <img
                  src={act.image}
                  alt={act.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
                  {act.category}
                </div>
                {act.popular && (
                  <div className="absolute top-4 right-4 bg-[#E4A853] text-[#2C241D] text-xs px-3 py-1 rounded-full font-bold shadow-md">
                    ★ Guest Favorite
                  </div>
                )}
                <div className="absolute bottom-3 left-4 right-4 text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#E4A853]" /> {act.duration}
                  </span>
                  <span>{act.schedule}</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C241D] mb-2 group-hover:text-[#C88A32] transition-colors">
                    {act.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6B5A48] leading-relaxed mb-4">
                    {act.description}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    <p className="text-[11px] uppercase font-bold text-[#8C7B68] tracking-wider">What’s Included:</p>
                    {act.includes.map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#4A3E31]">
                        <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0" />
                        <span className="truncate">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EFE8DC] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-[#8C7B68] uppercase font-bold block">Experience Rate</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-xl sm:text-2xl font-bold text-[#2C241D]">
                        {act.pricePHP === 0 ? 'Free (In-House Guests)' : formatPrice(act.pricePHP)}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#8C7B68] block">{act.priceNote}</span>
                  </div>

                  <button
                    onClick={() => setSelectedActivity(act)}
                    className="px-5 py-2.5 rounded-xl bg-[#2C241D] hover:bg-[#1E1712] text-white text-xs font-bold transition shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Book Experience</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E4A853]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Events, Weddings & Honeymoon Banner */}
        <div className="bg-linear-to-r from-[#2C241D] to-[#3E3227] rounded-3xl p-8 sm:p-12 text-white border border-[#524436] shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#E4A853] text-xs font-bold uppercase mb-4">
              <Heart className="w-3.5 h-3.5" />
              Intimate Weddings, Honeymoon & Soul Celebrations
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
              Say "I Do" as the Sipalay Sun Melts into the Sea
            </h3>
            <p className="text-xs sm:text-sm text-[#E0D5C1] leading-relaxed mb-6">
              Full resort buyout for up to 36 guests across our 12 beachfront rooms. We arrange custom bamboo arch floral arrangements, Negrense acoustic live band, beach bonfires, lantern releases, and private boat trips.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => addNotification('Wedding Inquiry Received', 'Our event coordinator will contact you via email with our Sipalay Wedding Guide!', 'alert')}
                className="px-6 py-3 rounded-full bg-[#E4A853] hover:bg-[#D49843] text-[#2C241D] font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
              >
                Inquire for Weddings & Events
              </button>
              <button
                onClick={() => openBookingModal()}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition cursor-pointer"
              >
                Book Honeymoon Suite
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Booking Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#E0D5C1] shadow-2xl relative">
            <button
              onClick={() => setSelectedActivity(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF7F2] text-[#4A3E31]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#508991] text-white flex items-center justify-center font-bold">
                🌊
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2C241D]">{selectedActivity.title}</h3>
                <p className="text-xs text-[#7A6A58]">{selectedActivity.duration} • {selectedActivity.schedule}</p>
              </div>
            </div>

            {bookedSuccess ? (
              <div className="p-6 bg-green-50 rounded-2xl text-center border border-green-200">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-2">
                  <Check className="w-6 h-6" />
                </div>
                <p className="font-bold text-sm text-[#2C241D]">Activity Reserved!</p>
                <p className="text-xs text-green-700 mt-1">Our team has added this to your stay itinerary.</p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE4D3] space-y-2">
                  <p className="font-bold text-[#2C241D]">Included in this experience:</p>
                  <ul className="space-y-1">
                    {selectedActivity.includes.map((inc, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[#5C4E3F]">
                        <Check className="w-3.5 h-3.5 text-[#2A9D8F]" /> {inc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-[#EFE8DC]">
                  <span>Total Rate:</span>
                  <span className="font-serif text-base text-[#2C241D]">
                    {selectedActivity.pricePHP === 0 ? 'Complimentary' : formatPrice(selectedActivity.pricePHP)}
                  </span>
                </div>

                <button
                  onClick={() => handleBookActivity(selectedActivity)}
                  className="w-full py-3 rounded-xl bg-[#C88A32] hover:bg-[#B87A24] text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
                >
                  Confirm Activity Booking
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

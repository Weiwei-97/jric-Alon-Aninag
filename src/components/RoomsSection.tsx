import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { ROOMS_DATA } from '../data/resortData';
import { Room } from '../types';
import { 
  Users, 
  Maximize, 
  Wifi, 
  Eye, 
  Check, 
  Sparkles, 
  Calendar, 
  ChevronRight,
  ShieldCheck,
  Coffee,
  Bath,
  Wind,
  X
} from 'lucide-react';

export const RoomsSection: React.FC = () => {
  const { formatPrice, openBookingModal, t, searchQuery } = useResort();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedRoomModal, setSelectedRoomModal] = useState<Room | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const categories = [
    { id: 'all', label: 'All 12 Beachfront Rooms' },
    { id: 'Villa', label: 'Villas & Master' },
    { id: 'Suite', label: 'Suites' },
    { id: 'Loft', label: 'Barkada Lofts' },
    { id: 'Deluxe', label: 'Deluxe Rooms' }
  ];

  const filteredRooms = ROOMS_DATA.filter((room) => {
    const matchesCategory = activeCategory === 'all' || room.category === activeCategory;
    const matchesSearch = !searchQuery || 
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="rooms" className="py-20 bg-[#F8F5F2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-teal-50 text-[#006D77] border border-teal-200/60 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#006D77]" />
            Intimate Boutique Accommodations
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight mb-4 font-normal">
            12 Cozy Rooms Facing the Sea
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Every room at Alon Aninag is crafted with warm teak wood, crisp white linens, and natural rattan elements. 
            Designed to let you wake up to the rhythm of Poblacion Beach and rest your soul at sunset.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-sm text-xs sm:text-sm font-semibold uppercase tracking-wider transition cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#006D77] text-white shadow-sm'
                  : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* View Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-sm font-medium flex items-center gap-1.5 border border-white/20 uppercase tracking-wider">
                  <Eye className="w-3.5 h-3.5 text-[#83C5BE]" />
                  <span>{room.view}</span>
                </div>

                {/* Availability Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur text-stone-900 text-xs px-3 py-1 rounded-sm font-bold shadow-sm flex items-center gap-1.5 border border-stone-200">
                  <span className="w-2 h-2 rounded-full bg-[#006D77]" />
                  <span>{room.availableUnits} of {room.totalUnits} left</span>
                </div>

                {/* Bottom Quick Specs Overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-stone-200 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/10">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#83C5BE]" /> Up to {room.capacity.maxTotal} guests
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize className="w-3.5 h-3.5 text-[#83C5BE]" /> {room.sizeSqM} m²
                  </span>
                  <span className="flex items-center gap-1">
                    <Wifi className="w-3.5 h-3.5 text-[#83C5BE]" /> Starlink 150M
                  </span>
                </div>
              </div>

              {/* Room Info Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] uppercase font-bold tracking-widest text-[#006D77]">
                      {room.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-stone-800">
                      <span className="text-[#E29578]">★</span>
                      <span>{room.rating.toFixed(2)}</span>
                      <span className="text-stone-400 font-normal">({room.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-2 group-hover:text-[#006D77] transition-colors">
                    {room.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
                    {room.tagline}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-1.5 mb-6">
                    {room.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-[#006D77] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Action Row */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold block tracking-wider">
                      Starting Rate
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                        {formatPrice(room.pricePHP)}
                      </span>
                      <span className="text-xs text-stone-500">/ {t('night', 'night')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedRoomModal(room);
                        setActiveImageIndex(0);
                      }}
                      className="px-3.5 py-2 rounded-sm border border-stone-300 hover:bg-stone-50 text-xs font-semibold text-stone-700 uppercase tracking-wider transition cursor-pointer"
                    >
                      {t('viewDetails', 'Details')}
                    </button>

                    <button
                      onClick={() => openBookingModal(room.id)}
                      className="px-4 sm:px-5 py-2 rounded-sm bg-[#006D77] hover:bg-[#00555d] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm hover:shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#83C5BE]" />
                      <span>{t('bookNow', 'Book')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room Details Modal */}
      {selectedRoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedRoomModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Carousel */}
            <div className="relative aspect-16/9 rounded-lg overflow-hidden mb-4 bg-stone-100">
              <img
                src={selectedRoomModal.images[activeImageIndex] || selectedRoomModal.images[0]}
                alt={selectedRoomModal.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-xs text-white bg-black/60 px-3 py-1.5 rounded-sm">
                <span>{selectedRoomModal.view}</span>
                <span>Photo {activeImageIndex + 1} of {selectedRoomModal.images.length}</span>
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
              {selectedRoomModal.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-14 rounded-sm overflow-hidden border-2 shrink-0 transition cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#006D77]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Room Specs Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-stone-100">
              <div>
                <span className="text-xs uppercase font-bold text-[#006D77] tracking-widest">
                  {selectedRoomModal.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {selectedRoomModal.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400 block uppercase tracking-wider">Nightly Rate</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {formatPrice(selectedRoomModal.pricePHP)}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              {selectedRoomModal.description}
            </p>

            {/* Amenities Grid */}
            <div className="mb-6">
              <h4 className="font-bold text-xs uppercase tracking-widest text-stone-400 mb-3">
                Included Room Amenities & Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedRoomModal.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-800 bg-stone-50 p-2.5 rounded-sm border border-stone-200">
                    <Check className="w-4 h-4 text-[#006D77] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-stone-500">
                <p>✓ Free Cancellation up to 48 hours before check-in</p>
                <p>✓ 30% Downpayment deposit confirms booking</p>
              </div>
              <button
                onClick={() => {
                  const rId = selectedRoomModal.id;
                  setSelectedRoomModal(null);
                  openBookingModal(rId);
                }}
                className="px-6 py-3 rounded-sm bg-[#006D77] hover:bg-[#00555d] text-white font-bold text-xs uppercase tracking-widest shadow-md transition cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#83C5BE]" />
                <span>Reserve This Room</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

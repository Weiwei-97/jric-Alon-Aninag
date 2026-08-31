import React, { useState } from 'react';
import { RESORT_IMAGES } from '../data/resortData';
import { 
  Sparkles, 
  Eye, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Play, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Compass
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Resort' | 'Rooms' | 'Sunset & Bonfire' | 'Dining' | 'Sipalay';
  image: string;
  caption: string;
}

export const GallerySection: React.FC<{
  isVirtualTourOpen: boolean;
  onCloseVirtualTour: () => void;
  onOpenVirtualTour: () => void;
}> = ({ isVirtualTourOpen, onCloseVirtualTour, onOpenVirtualTour }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isOceanAudioPlaying, setIsOceanAudioPlaying] = useState<boolean>(false);
  const [tourHotspot, setTourHotspot] = useState<string>('deck');

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'Golden Hour at Poblacion Beach',
      category: 'Resort',
      image: RESORT_IMAGES.hero,
      caption: 'Alon Aninag Boutique Resort nestled along the warm sands of Poblacion Beach at sunset.'
    },
    {
      id: 'g-2',
      title: 'Aninag Master Villa Oceanfront Suite',
      category: 'Rooms',
      image: RESORT_IMAGES.suite,
      caption: 'Minimalist wood & white aesthetic interiors facing the panoramic Sipalay sea.'
    },
    {
      id: 'g-3',
      title: 'Sunset Viewing Deck & Acoustic Dining',
      category: 'Sunset & Bonfire',
      image: RESORT_IMAGES.sunsetDeck,
      caption: 'Warm bistro lights, craft cocktails, and gentle ocean breezes at twilight.'
    },
    {
      id: 'g-4',
      title: 'Authentic Negrense Beachfront Feast',
      category: 'Dining',
      image: RESORT_IMAGES.dining,
      caption: 'Grilled local blue marlin, charcoal chicken inasal, and fresh Guimaras mangoes.'
    },
    {
      id: 'g-5',
      title: 'Soul Night Campfire & Acoustic Bonfire',
      category: 'Sunset & Bonfire',
      image: RESORT_IMAGES.bonfire,
      caption: 'Gathering around the glowing driftwood fire under a starry tropical sky.'
    },
    {
      id: 'g-6',
      title: 'Tinagong Dagat Hidden Lagoons & Bridges',
      category: 'Sipalay',
      image: RESORT_IMAGES.islets,
      caption: 'Emerald waters and wooden footbridges connecting limestone islets in Sipalay.'
    },
    {
      id: 'g-7',
      title: 'Campomanes Bay Coral Sanctuary Dive',
      category: 'Sipalay',
      image: RESORT_IMAGES.diving,
      caption: '25-meter crystal visibility, vibrant marine turtles, and WWII wreck diving.'
    },
    {
      id: 'g-8',
      title: 'Golden Sand Coast of Sugar Beach',
      category: 'Sipalay',
      image: RESORT_IMAGES.beachDay,
      caption: 'Gentle waves and barefoot walks along the 2km pristine coastline.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos (8)' },
    { id: 'Resort', label: 'Resort & Grounds' },
    { id: 'Rooms', label: 'Rooms & Villas' },
    { id: 'Sunset & Bonfire', label: 'Sunset & Bonfires' },
    { id: 'Dining', label: 'Negrense Dining' },
    { id: 'Sipalay', label: 'Sipalay Attractions' }
  ];

  const filteredItems = galleryItems.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  // Synthesize gentle ocean wave sound using Web Audio API
  const toggleOceanSound = () => {
    if (!isOceanAudioPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          // Generate pink/white noise buffer for ocean surf
          const bufferSize = ctx.sampleRate * 2;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          let lastOut = 0.0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (lastOut + 0.02 * white) / 1.02;
            lastOut = data[i];
            data[i] *= 0.15;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          noise.loop = true;

          // Gentle low-pass filter
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(350, ctx.currentTime);

          noise.connect(filter);
          filter.connect(ctx.destination);
          noise.start();
          (window as any)._oceanNoiseSource = noise;
          (window as any)._oceanAudioCtx = ctx;
        }
      } catch {
        // Fallback gracefully
      }
      setIsOceanAudioPlaying(true);
    } else {
      if ((window as any)._oceanNoiseSource) {
        try {
          (window as any)._oceanNoiseSource.stop();
          (window as any)._oceanAudioCtx?.close();
        } catch {}
      }
      setIsOceanAudioPlaying(false);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADFCB] text-[#5C4E3F] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C88A32]" />
              Visual Sanctuary
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] tracking-tight mb-2">
              Resort Gallery & 360° Virtual Tour
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5A48]">
              Wood & white aesthetics, warm golden lights, and the soulful ambiance of Poblacion Beach.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleOceanSound}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition cursor-pointer border ${
                isOceanAudioPlaying
                  ? 'bg-[#508991] text-white border-[#508991] animate-pulse'
                  : 'bg-[#FAF7F2] text-[#4A3E31] border-[#DDD0B9] hover:bg-[#F3EDE2]'
              }`}
              title="Toggle Ambient Sipalay Ocean Surf Sound"
            >
              {isOceanAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#8C7B68]" />}
              <span>{isOceanAudioPlaying ? 'Ocean Sound: ON' : 'Play Ambient Waves'}</span>
            </button>

            <button
              onClick={onOpenVirtualTour}
              className="px-5 py-2.5 rounded-full bg-[#2C241D] hover:bg-[#1E1712] text-white text-xs font-bold transition shadow-md cursor-pointer flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 text-[#E4A853] fill-[#E4A853]" />
              <span>Launch 360° Tour</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#C88A32] text-white shadow-xs'
                  : 'bg-[#FAF7F2] border border-[#DDD0B9] text-[#5C4E3F] hover:bg-[#F0E7D8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-square bg-[#EADFCB] cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold text-[#E4A853] mb-1">
                  {item.category}
                </span>
                <h4 className="font-serif text-sm font-bold leading-tight mb-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-white/80 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() => setSelectedPhotoIndex(prev => (prev! > 0 ? prev! - 1 : filteredItems.length - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => setSelectedPhotoIndex(prev => (prev! < filteredItems.length - 1 ? prev! + 1 : 0))}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full text-center">
            <img
              src={filteredItems[selectedPhotoIndex].image}
              alt={filteredItems[selectedPhotoIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto mx-auto rounded-2xl shadow-2xl object-contain"
            />
            <div className="mt-4 text-white">
              <span className="text-xs font-bold text-[#E4A853] uppercase">
                {filteredItems[selectedPhotoIndex].category}
              </span>
              <h3 className="font-serif text-xl font-bold mt-1">
                {filteredItems[selectedPhotoIndex].title}
              </h3>
              <p className="text-xs text-white/80 max-w-xl mx-auto mt-1">
                {filteredItems[selectedPhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 360° Virtual Tour Interactive Modal */}
      {isVirtualTourOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#1A140E] text-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden border border-[#524436] shadow-2xl relative flex flex-col">
            {/* Tour Header */}
            <div className="p-4 sm:p-5 bg-black/60 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E4A853] text-[#2C241D] flex items-center justify-center font-bold">
                  🧭
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold">
                    Alon Aninag 360° Interactive Virtual Tour
                  </h3>
                  <p className="text-xs text-white/60">
                    Explore our beachfront paradise in Poblacion Beach, Sipalay
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleOceanSound}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
                    isOceanAudioPlaying ? 'bg-[#508991] text-white' : 'bg-white/10 hover:bg-white/20 text-white/80'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isOceanAudioPlaying ? 'Waves Active' : 'Sound'}</span>
                </button>

                <button
                  onClick={onCloseVirtualTour}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tour Viewport */}
            <div className="relative flex-1 min-h-[420px] bg-black overflow-hidden flex items-center justify-center">
              <img
                src={
                  tourHotspot === 'deck' ? RESORT_IMAGES.sunsetDeck :
                  tourHotspot === 'room' ? RESORT_IMAGES.suite :
                  tourHotspot === 'bonfire' ? RESORT_IMAGES.bonfire :
                  tourHotspot === 'dining' ? RESORT_IMAGES.dining : RESORT_IMAGES.hero
                }
                alt="360 Tour View"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover animate-subtle-pan"
              />

              {/* Hotspot Pins on the 360 Stage */}
              {tourHotspot === 'deck' && (
                <>
                  <button
                    onClick={() => setTourHotspot('bonfire')}
                    className="absolute bottom-24 left-[35%] bg-black/70 hover:bg-[#E4A853] text-white hover:text-black px-3 py-1.5 rounded-full text-xs font-bold border border-white/40 shadow-xl transition cursor-pointer flex items-center gap-1.5 animate-bounce"
                  >
                    🔥 <span>Step to Beach Bonfire</span>
                  </button>

                  <button
                    onClick={() => setTourHotspot('room')}
                    className="absolute top-28 right-[30%] bg-black/70 hover:bg-[#E4A853] text-white hover:text-black px-3 py-1.5 rounded-full text-xs font-bold border border-white/40 shadow-xl transition cursor-pointer flex items-center gap-1.5"
                  >
                    🛏️ <span>Enter Sunset Villa</span>
                  </button>
                </>
              )}

              {tourHotspot === 'room' && (
                <button
                  onClick={() => setTourHotspot('deck')}
                  className="absolute bottom-16 right-[40%] bg-black/70 hover:bg-[#E4A853] text-white hover:text-black px-3 py-1.5 rounded-full text-xs font-bold border border-white/40 shadow-xl transition cursor-pointer flex items-center gap-1.5"
                >
                  🌅 <span>Walk onto Sunset Balcony</span>
                </button>
              )}

              {/* Compass overlay */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#E4A853] animate-spin-slow" />
                <span>Facing West (Sunset Horizon • Poblacion Beach)</span>
              </div>
            </div>

            {/* Tour Hotspot Navigation Tabs */}
            <div className="p-3.5 bg-black/80 border-t border-white/10 flex items-center justify-center gap-2 overflow-x-auto">
              {[
                { id: 'deck', label: 'Sunset Deck & Bar' },
                { id: 'room', label: 'Aninag Master Villa' },
                { id: 'bonfire', label: 'Beachfront Bonfire' },
                { id: 'dining', label: 'Local Negrense Dining' },
                { id: 'beach', label: 'Resort Beachfront' }
              ].map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setTourHotspot(spot.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    tourHotspot === spot.id
                      ? 'bg-[#E4A853] text-[#2C241D] shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white/80'
                  }`}
                >
                  {spot.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

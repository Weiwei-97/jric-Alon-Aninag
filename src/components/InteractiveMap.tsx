import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { ATTRACTONS_DATA, RESORT_INFO } from '../data/resortData';
import { Attraction } from '../types';
import { 
  MapPin, 
  Compass, 
  Navigation, 
  Bookmark, 
  Share2, 
  Clock, 
  Sparkles, 
  Eye, 
  Check, 
  Waves, 
  Camera,
  Layers,
  ChevronRight,
  Route
} from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const { 
    savedAttractionIds, 
    toggleSaveAttraction, 
    addNotification, 
    distanceToResortKm,
    requestUserLocation 
  } = useResort();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction>(ATTRACTONS_DATA[0]);
  const [mapZoom, setMapZoom] = useState<'overview' | 'detail'>('overview');

  const categories = [
    { id: 'all', label: 'All Sipalay Spots' },
    { id: 'Diving', label: 'Diving & Reefs' },
    { id: 'Island Hopping', label: 'Islets & Lagoons' },
    { id: 'Beach', label: 'Beaches' },
    { id: 'Viewpoint', label: 'Viewpoints' },
    { id: 'Culture & Food', label: 'Local Culture' }
  ];

  const filteredAttractions = ATTRACTONS_DATA.filter(
    (attr) => activeCategory === 'all' || attr.category === activeCategory
  );

  const handleShareItinerary = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Check out my Sipalay travel route from Alon Aninag Boutique Resort: ${selectedAttraction.name} (${selectedAttraction.distanceKm} km away) - Where Waves Rest and Souls Glow!`
      );
      addNotification('Route Copied', 'Sipalay travel route link copied to clipboard!', 'alert');
    } else {
      addNotification('Shared', 'Route shared successfully!', 'alert');
    }
  };

  return (
    <section id="map" className="py-20 bg-[#FAF7F2] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADFCB] text-[#5C4E3F] text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#508991]" />
            Explore Sipalay City • Southern Negros
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] tracking-tight mb-4">
            Interactive Tourist Map & Diving Spots
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A48] leading-relaxed">
            Alon Aninag is located directly on Poblacion Beach (near Jazz Inn), the perfect base to explore Sipalay’s hidden lagoons, emerald islets, world-class shipwreck dive sites, and sunset viewpoints.
          </p>
        </div>

        {/* Category Filters & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#508991] text-white shadow-md'
                    : 'bg-white border border-[#DDD0B9] text-[#5C4E3F] hover:bg-[#F3EDE2]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => requestUserLocation()}
              className="px-3.5 py-1.5 rounded-full bg-white border border-[#DDD0B9] hover:bg-[#FAF7F2] text-xs font-semibold text-[#2C241D] flex items-center gap-1.5 transition cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-[#E4A853]" />
              <span>{distanceToResortKm !== null ? `GPS Active (${distanceToResortKm}km)` : 'Locate My Distance'}</span>
            </button>

            <button
              onClick={handleShareItinerary}
              className="px-3.5 py-1.5 rounded-full bg-[#2C241D] text-white hover:bg-[#1E1712] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Trip Route</span>
            </button>
          </div>
        </div>

        {/* Map & Detail Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Map Visualizer Canvas/SVG */}
          <div className="lg:col-span-7 bg-[#E8EFF1] rounded-3xl p-5 border border-[#D0DFE2] shadow-md relative overflow-hidden flex flex-col justify-between min-h-[460px]">
            {/* Custom Sipalay Coastline & Lagoon Stylized Map */}
            <div className="relative w-full h-[400px] bg-linear-to-b from-[#A5D8E6] via-[#BCE6F1] to-[#88C6D6] rounded-2xl overflow-hidden border border-[#9FCBD8] p-4 select-none shadow-inner">
              {/* Landmass shapes representing Sipalay Coast & Inlets */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="none">
                {/* Coastline curve */}
                <path
                  d="M 600,0 L 420,0 Q 360,80 390,160 Q 430,220 340,290 Q 280,330 310,400 L 600,400 Z"
                  fill="#EFE7D8"
                  stroke="#D8CCB5"
                  strokeWidth="3"
                />
                {/* Coastal Inlets / Tinagong Dagat Lagoons */}
                <circle cx="270" cy="180" r="16" fill="#A1D8B1" stroke="#87C498" strokeWidth="2" opacity="0.9" />
                <circle cx="295" cy="195" r="12" fill="#A1D8B1" stroke="#87C498" strokeWidth="2" opacity="0.9" />
                <circle cx="280" cy="225" r="18" fill="#A1D8B1" stroke="#87C498" strokeWidth="2" opacity="0.9" />
                <circle cx="250" cy="210" r="14" fill="#A1D8B1" stroke="#87C498" strokeWidth="2" opacity="0.9" />
                
                {/* Sugar Beach curve */}
                <path
                  d="M 410,50 Q 380,80 395,120"
                  fill="none"
                  stroke="#E4A853"
                  strokeWidth="4"
                  strokeDasharray="4 2"
                />

                {/* Sipalay Ocean Waves decor */}
                <path d="M 50,60 Q 70,50 90,60 T 130,60" fill="none" stroke="#68B0C2" strokeWidth="1.5" opacity="0.6" />
                <path d="M 80,260 Q 100,250 120,260 T 160,260" fill="none" stroke="#68B0C2" strokeWidth="1.5" opacity="0.6" />
                <path d="M 40,340 Q 60,330 80,340 T 120,340" fill="none" stroke="#68B0C2" strokeWidth="1.5" opacity="0.6" />

                {/* Route line connecting Resort to selected attraction */}
                <line
                  x1="390"
                  y1="160"
                  x2={
                    selectedAttraction.id === 'attr-tinagong-dagat' ? 275 :
                    selectedAttraction.id === 'attr-sugar-beach' ? 395 :
                    selectedAttraction.id === 'attr-campomanes-bay' ? 180 :
                    selectedAttraction.id === 'attr-punta-ballo' ? 150 :
                    selectedAttraction.id === 'attr-perth-paradise' ? 320 : 390
                  }
                  y2={
                    selectedAttraction.id === 'attr-tinagong-dagat' ? 200 :
                    selectedAttraction.id === 'attr-sugar-beach' ? 80 :
                    selectedAttraction.id === 'attr-campomanes-bay' ? 320 :
                    selectedAttraction.id === 'attr-punta-ballo' ? 360 :
                    selectedAttraction.id === 'attr-perth-paradise' ? 250 : 160
                  }
                  stroke="#E76F51"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              </svg>

              {/* Pin 1: ALON ANINAG RESORT (Home Pin) */}
              <div 
                className="absolute left-[62%] top-[38%] -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                onClick={() => setSelectedAttraction(ATTRACTONS_DATA[5])}
              >
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#E76F51] border-3 border-white shadow-xl flex items-center justify-center text-white text-base animate-bounce">
                    🌊
                  </div>
                  <div className="mt-1 bg-[#2C241D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
                    Alon Aninag (You Are Here)
                  </div>
                </div>
              </div>

              {/* Pin 2: Tinagong Dagat */}
              <div
                className="absolute left-[44%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                onClick={() => setSelectedAttraction(ATTRACTONS_DATA[0])}
              >
                <div className="flex flex-col items-center group">
                  <div className={`w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white transition-transform group-hover:scale-125 ${
                    selectedAttraction.id === 'attr-tinagong-dagat' ? 'bg-[#508991] ring-4 ring-[#508991]/30' : 'bg-[#2A9D8F]'
                  }`}>
                    🏝️
                  </div>
                  <span className="text-[9px] font-bold bg-white/90 text-[#2C241D] px-1.5 py-0.2 rounded mt-0.5">
                    Tinagong Dagat
                  </span>
                </div>
              </div>

              {/* Pin 3: Sugar Beach */}
              <div
                className="absolute left-[66%] top-[20%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                onClick={() => setSelectedAttraction(ATTRACTONS_DATA[1])}
              >
                <div className="flex flex-col items-center group">
                  <div className={`w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white transition-transform group-hover:scale-125 ${
                    selectedAttraction.id === 'attr-sugar-beach' ? 'bg-[#C88A32] ring-4 ring-[#C88A32]/30' : 'bg-[#E4A853]'
                  }`}>
                    🏖️
                  </div>
                  <span className="text-[9px] font-bold bg-white/90 text-[#2C241D] px-1.5 py-0.2 rounded mt-0.5">
                    Sugar Beach
                  </span>
                </div>
              </div>

              {/* Pin 4: Perth Paradise */}
              <div
                className="absolute left-[53%] top-[62%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                onClick={() => setSelectedAttraction(ATTRACTONS_DATA[2])}
              >
                <div className="flex flex-col items-center group">
                  <div className={`w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white transition-transform group-hover:scale-125 ${
                    selectedAttraction.id === 'attr-perth-paradise' ? 'bg-[#508991] ring-4 ring-[#508991]/30' : 'bg-[#2A9D8F]'
                  }`}>
                    📸
                  </div>
                  <span className="text-[9px] font-bold bg-white/90 text-[#2C241D] px-1.5 py-0.2 rounded mt-0.5">
                    Perth Viewpoint
                  </span>
                </div>
              </div>

              {/* Pin 5: Campomanes Bay Dive Sanctuary */}
              <div
                className="absolute left-[30%] top-[78%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                onClick={() => setSelectedAttraction(ATTRACTONS_DATA[3])}
              >
                <div className="flex flex-col items-center group">
                  <div className={`w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white transition-transform group-hover:scale-125 ${
                    selectedAttraction.id === 'attr-campomanes-bay' ? 'bg-[#1D3557] ring-4 ring-[#1D3557]/30' : 'bg-[#457B9D]'
                  }`}>
                    🤿
                  </div>
                  <span className="text-[9px] font-bold bg-white/90 text-[#2C241D] px-1.5 py-0.2 rounded mt-0.5">
                    Campomanes Dive Reef
                  </span>
                </div>
              </div>

              {/* Pin 6: Punta Ballo */}
              <div
                className="absolute left-[24%] top-[88%] -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
                onClick={() => setSelectedAttraction(ATTRACTONS_DATA[4])}
              >
                <div className="flex flex-col items-center group">
                  <div className={`w-7 h-7 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white transition-transform group-hover:scale-125 ${
                    selectedAttraction.id === 'attr-punta-ballo' ? 'bg-[#E76F51]' : 'bg-[#F4A261]'
                  }`}>
                    🐢
                  </div>
                  <span className="text-[9px] font-bold bg-white/90 text-[#2C241D] px-1.5 py-0.2 rounded mt-0.5">
                    Punta Ballo
                  </span>
                </div>
              </div>

              {/* Map Legend Overlay */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs p-2.5 rounded-xl border border-white/50 text-[10px] text-[#2C241D] shadow-xs space-y-1">
                <div className="font-bold text-[#8C7B68] uppercase text-[9px]">Sipalay Coast Map</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#E76F51]" /> Alon Aninag Resort</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1D3557]" /> Scuba & Wreck Dives</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#2A9D8F]" /> Islets & Lagoons</div>
              </div>
            </div>

            {/* Quick Sipalay Travel Route Info */}
            <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-[#5C4E3F] px-2 gap-2">
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 text-[#C88A32]" />
                <span className="font-bold">Route from Resort:</span>
                <span>{selectedAttraction.distanceKm} km • {selectedAttraction.travelTime}</span>
              </div>
              <span className="text-[11px] text-[#8C7B68]">Bangka boats & local tricycle shuttles depart directly from our front gate.</span>
            </div>
          </div>

          {/* Attraction Details Panel */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DAC4] shadow-md flex flex-col justify-between">
            <div>
              {/* Image & Category */}
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-5 bg-[#EADFCB]">
                <img
                  src={selectedAttraction.image}
                  alt={selectedAttraction.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
                  {selectedAttraction.category}
                </div>
                <button
                  onClick={() => toggleSaveAttraction(selectedAttraction.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition cursor-pointer ${
                    savedAttractionIds.includes(selectedAttraction.id)
                      ? 'bg-[#E4A853] text-[#2C241D]'
                      : 'bg-black/50 text-white hover:bg-black/70'
                  }`}
                  title="Save to My Trip Itinerary"
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Title & Distance */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C241D]">
                    {selectedAttraction.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#8C7B68] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C88A32]" />
                    <span>{selectedAttraction.distanceKm} km from Alon Aninag Resort</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#2C241D] bg-[#FBF7F0] px-2.5 py-1 rounded-lg border border-[#EDE4D3]">
                    ★ {selectedAttraction.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5C4E3F] leading-relaxed mb-4">
                {selectedAttraction.description}
              </p>

              {/* Highlights & Best Time */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-[#4A3E31]">
                  <Clock className="w-4 h-4 text-[#508991] shrink-0" />
                  <span><strong>Best Time:</strong> {selectedAttraction.bestTimeToVisit}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#4A3E31]">
                  <Camera className="w-4 h-4 text-[#C88A32] shrink-0" />
                  <span><strong>Activity:</strong> {selectedAttraction.activityType}</span>
                </div>
              </div>

              {/* Highlights Chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {selectedAttraction.highlights.map((h, i) => (
                  <span key={i} className="text-[11px] bg-[#FAF7F2] text-[#6B5A48] px-2.5 py-1 rounded-lg border border-[#EDE4D3]">
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#EFE8DC] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => toggleSaveAttraction(selectedAttraction.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  savedAttractionIds.includes(selectedAttraction.id)
                    ? 'bg-[#EADFCB] text-[#2C241D]'
                    : 'bg-white border border-[#DDD0B9] text-[#4A3E31] hover:bg-[#FAF7F2]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 text-[#C88A32]" />
                <span>{savedAttractionIds.includes(selectedAttraction.id) ? 'Saved in Itinerary' : 'Save Destination'}</span>
              </button>

              <button
                onClick={handleShareItinerary}
                className="px-4 py-2.5 rounded-xl bg-[#2C241D] hover:bg-[#1E1712] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#E4A853]" />
                <span>Share Route</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { MENU_ITEMS, RESORT_IMAGES } from '../data/resortData';
import { MenuItem } from '../types';
import { 
  Utensils, 
  Wine, 
  Coffee, 
  Flame, 
  Sparkles, 
  Clock, 
  Check, 
  Calendar,
  X,
  PhoneCall
} from 'lucide-react';

export const DiningSection: React.FC = () => {
  const { formatPrice, addNotification } = useResort();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);
  const [tableDate, setTableDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [tableTime, setTableTime] = useState<string>('5:30 PM (Golden Hour Sunset)');
  const [tableGuests, setTableGuests] = useState<number>(2);
  const [tableNotes, setTableNotes] = useState<string>('Sunset deck outdoor table facing Poblacion ocean');
  const [isTableBooked, setIsTableBooked] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'Full Negrense Menu' },
    { id: 'Breakfast', label: 'Breakfast & Silog' },
    { id: 'Lunch', label: 'Lunch Specials' },
    { id: 'Dinner', label: 'Dinner & Inasal' },
    { id: 'Bar & Cocktails', label: 'Sunset Cocktails & Bar' }
  ];

  const filteredMenu = MENU_ITEMS.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTableBooked(true);
    addNotification(
      '🍽️ Sunset Table Reserved',
      `Table reserved for ${tableGuests} guests on ${tableDate} at ${tableTime} at Alon Sunset Deck!`,
      'booking'
    );
    setTimeout(() => {
      setIsTableBooked(false);
      setIsTableModalOpen(false);
    }, 2000);
  };

  return (
    <section id="dining" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-teal-50 text-[#006D77] border border-teal-200/60 text-xs font-bold uppercase tracking-widest mb-3">
            <Utensils className="w-3.5 h-3.5 text-[#006D77]" />
            Flavors of Southern Negros
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight mb-4 font-normal">
            Beachfront Dining & Sunset Cocktails
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Fresh morning catch from Poblacion fishermen, legendary Bacolod chicken inasal seared over charcoal, native batwan souring fruit, and handcrafted Don Papa rum cocktails as the golden sun dips into the ocean.
          </p>
        </div>

        {/* Feature Spotlight Card */}
        <div className="mb-12 bg-[#F8F5F2] rounded-lg overflow-hidden border border-stone-200 grid grid-cols-1 lg:grid-cols-12 shadow-sm">
          <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-auto">
            <img
              src={RESORT_IMAGES.dining}
              alt="Negrense Feast at Alon Aninag"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-sm font-medium uppercase tracking-wider">
              Daily Catch & Authentic Inasal
            </div>
          </div>
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#006D77] font-bold uppercase tracking-widest mb-2">
                <Flame className="w-4 h-4 text-[#E29578]" />
                <span>The Alon Culinary Philosophy</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
                Local, Soulful & Fresh from the Sea
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                We believe food should nourish both the body and the soul. Our kitchen partners directly with local Poblacion fishermen and organic Negros farms. Enjoy dining with your feet in the sand or on our panoramic sunset deck.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs text-stone-800 mb-6">
                <div className="bg-white p-3 rounded-sm border border-stone-200">
                  <p className="font-bold text-stone-900">🌅 Sunset Deck Hours</p>
                  <p className="text-stone-500">6:30 AM – 10:00 PM</p>
                </div>
                <div className="bg-white p-3 rounded-sm border border-stone-200">
                  <p className="font-bold text-stone-900">🛎️ Room Service</p>
                  <p className="text-stone-500">All 12 rooms 24/7</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsTableModalOpen(true)}
                className="px-6 py-3 rounded-sm bg-[#006D77] hover:bg-[#00555d] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#83C5BE]" />
                <span>Reserve Sunset Deck Table</span>
              </button>
              <span className="text-xs text-stone-500">or dial <strong>ext. 101</strong> from your room</span>
            </div>
          </div>
        </div>

        {/* Menu Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-sm text-xs sm:text-sm font-semibold uppercase tracking-wider transition cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#006D77] text-white shadow-sm'
                  : 'bg-[#F8F5F2] border border-stone-300 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-5 border border-stone-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#006D77] bg-teal-50 px-2 py-0.5 rounded-sm border border-teal-100">
                    {item.category}
                  </span>
                  <span className="font-serif text-lg font-bold text-stone-900">
                    {formatPrice(item.pricePHP)}
                  </span>
                </div>

                <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">
                  {item.name}
                </h4>
                {item.localName && (
                  <p className="text-xs text-stone-500 italic font-serif mb-2">
                    {item.localName}
                  </p>
                )}

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Tags */}
              <div className="pt-3 border-t border-stone-100 flex flex-wrap gap-1.5 items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-sm border border-stone-200 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => addNotification('Order Added', `${item.name} requested. Our team will contact your room shortly.`, 'alert')}
                  className="text-xs font-bold text-[#006D77] hover:text-[#00555d] uppercase tracking-wider transition cursor-pointer"
                >
                  + Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Reservation Modal */}
      {isTableModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-lg max-w-md w-full p-6 sm:p-7 border border-stone-200 shadow-2xl relative">
            <button
              onClick={() => setIsTableModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-[#006D77] text-white flex items-center justify-center font-bold">
                🍽️
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">Sunset Deck Reservation</h3>
                <p className="text-xs text-stone-500">Alon Aninag • Poblacion Beach Frontage</p>
              </div>
            </div>

            {isTableBooked ? (
              <div className="p-6 bg-teal-50 rounded-lg text-center border border-teal-200">
                <div className="w-10 h-10 rounded-full bg-[#006D77] text-white flex items-center justify-center mx-auto mb-2">
                  <Check className="w-6 h-6" />
                </div>
                <p className="font-bold text-sm text-stone-900">Table Reserved Successfully!</p>
                <p className="text-xs text-teal-800 mt-1">Our staff will have your sunset table prepared.</p>
              </div>
            ) : (
              <form onSubmit={handleBookTable} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1 uppercase tracking-wider text-[10px]">Reservation Date</label>
                  <input
                    type="date"
                    value={tableDate}
                    onChange={(e) => setTableDate(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-sm font-semibold text-stone-900"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1 uppercase tracking-wider text-[10px]">Preferred Time</label>
                  <select
                    value={tableTime}
                    onChange={(e) => setTableTime(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-sm font-semibold text-stone-900 cursor-pointer"
                  >
                    <option value="7:30 AM - 9:30 AM">7:30 AM - 9:30 AM (Morning Ocean Breakfast)</option>
                    <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM (Lunch Special)</option>
                    <option value="5:30 PM (Golden Hour Sunset)">5:30 PM (Golden Hour Sunset & Bonfire)</option>
                    <option value="7:00 PM - 9:00 PM">7:00 PM - 9:00 PM (Candlelit Night Dinner)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1 uppercase tracking-wider text-[10px]">Number of Guests</label>
                  <select
                    value={tableGuests}
                    onChange={(e) => setTableGuests(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-sm font-semibold text-stone-900 cursor-pointer"
                  >
                    <option value={2}>2 Guests (Couple setup)</option>
                    <option value={4}>4 Guests (Barkada table)</option>
                    <option value={6}>6 Guests (Family feast)</option>
                    <option value={8}>8+ Guests (Group event)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1 uppercase tracking-wider text-[10px]">Special Table Preferences</label>
                  <input
                    type="text"
                    value={tableNotes}
                    onChange={(e) => setTableNotes(e.target.value)}
                    placeholder="e.g. Near bonfire pit, candlelit anniversary, high chair needed"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-sm text-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-sm bg-[#006D77] hover:bg-[#00555d] text-white font-bold text-xs uppercase tracking-widest shadow-md transition cursor-pointer mt-2"
                >
                  Confirm Table Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

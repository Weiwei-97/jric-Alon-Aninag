import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { RESORT_INFO } from '../data/resortData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  WifiOff, 
  Heart, 
  Lock,
  Waves
} from 'lucide-react';

export const Footer: React.FC<{ onOpenAdmin: () => void }> = ({ onOpenAdmin }) => {
  const { openOfflineModal, addNotification, weather } = useResort();
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    addNotification('Welcome to Alon & Aninag', 'Check your inbox for your 10% promo code: SOULSUNSET!', 'alert');
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#1A1A1A] text-white border-t border-stone-800">
      {/* Newsletter Strip */}
      <div className="border-b border-stone-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#83C5BE] uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-[#83C5BE]" />
              <span>Join the Alon Sunset Circle</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight">
              Receive 10% Off Your First Sipalay Getaway
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Exclusive promo codes, island hopping guides, and low-season specials.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="flex w-full md:w-auto gap-2 max-w-md">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-3 bg-stone-900 border border-stone-700 rounded-sm text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#006D77]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#006D77] hover:bg-[#00555d] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-sm transition shadow-sm whitespace-nowrap cursor-pointer"
            >
              {subscribed ? 'Subscribed! ✨' : 'Get Promo Code'}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#006D77] text-white flex items-center justify-center font-bold text-lg">
                🌊
              </div>
              <div>
                <span className="font-serif text-xl font-normal tracking-tight text-white block">
                  Alon & Aninag
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#83C5BE] block">
                  Boutique Beach Resort
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              "Where Waves Rest and Souls Glow." An intimate 12-room beachfront haven situated on Poblacion Beach, Sipalay City, Negros Occidental.
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#83C5BE] shrink-0" />
                <span>Poblacion Beach (beside Jazz Inn), Sipalay City, Negros Occidental 6113</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#83C5BE] shrink-0" />
                <span>+63 917 582 2566 • Front Desk 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#83C5BE] shrink-0" />
                <span>stay@alonaninag-sipalay.ph</span>
              </div>
            </div>
          </div>

          {/* Column 2: Accommodations */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#83C5BE] mb-4">
              Accommodations
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><a href="#rooms" className="hover:text-white transition">Aninag Master Villa</a></li>
              <li><a href="#rooms" className="hover:text-white transition">Alon Sunset Suite</a></li>
              <li><a href="#rooms" className="hover:text-white transition">Amihan Deluxe Garden</a></li>
              <li><a href="#rooms" className="hover:text-white transition">Baybayin Beachfront Cottage</a></li>
              <li><a href="#rooms" className="hover:text-white transition">12-Room Resort Buyout</a></li>
            </ul>
          </div>

          {/* Column 3: Experiences */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#83C5BE] mb-4">
              Experiences
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><a href="#map" className="hover:text-white transition">Tinagong Dagat Islets</a></li>
              <li><a href="#map" className="hover:text-white transition">Campomanes Wreck Diving</a></li>
              <li><a href="#activities" className="hover:text-white transition">Nightly Acoustic Bonfires</a></li>
              <li><a href="#dining" className="hover:text-white transition">Sunset Deck Negrense Dining</a></li>
              <li><a href="#loyalty" className="hover:text-white transition">Glow Club Loyalty Rewards</a></li>
            </ul>
          </div>

          {/* Column 4: Quick Access & Utilities */}
          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#83C5BE] mb-4">
              Travel Utilities
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={openOfflineModal}
                  className="flex items-center gap-1.5 hover:text-white transition cursor-pointer text-left"
                >
                  <WifiOff className="w-3.5 h-3.5 text-[#83C5BE]" />
                  <span>Offline Itinerary & Guide</span>
                </button>
              </li>
              <li>
                <a href="#map" className="hover:text-white transition">
                  Interactive Sipalay Map
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition">
                  #GlowAtAlon Guest Wall
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 text-[#E29578] hover:underline transition cursor-pointer font-semibold"
                >
                  <Lock className="w-3 h-3" />
                  <span>Staff / Manager Portal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Weather Strip */}
      <div className="border-t border-stone-800 py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} Alon Aninag Boutique Beach Resort Corp. All rights reserved. Sipalay City, Negros Occidental.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#83C5BE]">
              🌊 High Tide: {weather.highTide} • Sunset: {weather.sunsetTime}
            </span>
            <span className="text-stone-700">•</span>
            <span>DOT Accredited Resort (Negros Occidental)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

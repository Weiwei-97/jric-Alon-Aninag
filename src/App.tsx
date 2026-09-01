import React, { useState } from 'react';
import { ResortProvider, useResort } from './context/ResortContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RoomsSection } from './components/RoomsSection';
import { InteractiveMap } from './components/InteractiveMap';
import { DiningSection } from './components/DiningSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { GallerySection } from './components/GallerySection';
import { SocialFeed } from './components/SocialFeed';
import { LoyaltyProgram } from './components/LoyaltyProgram';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { OfflineItineraryModal } from './components/OfflineItineraryModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { WifiOff, Sparkles, MapPin } from 'lucide-react';

const ResortAppContent: React.FC = () => {
  const { isOfflineMode, toggleOfflineMode, weather } = useResort();
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#2D3436] font-sans antialiased selection:bg-[#006D77] selection:text-white">
      {/* Offline Mode Indicator Bar */}
      {isOfflineMode && (
        <div className="bg-[#006D77] text-white px-4 py-2 text-xs font-semibold flex items-center justify-between sticky top-0 z-50 border-b border-teal-900 shadow-md">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <span className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-[#83C5BE] animate-pulse" />
              <span>
                <strong>Offline Travel Mode Active:</strong> All your reservations, itineraries, and emergency guides are loaded locally.
              </span>
            </span>
            <button
              onClick={toggleOfflineMode}
              className="text-[11px] bg-white/20 hover:bg-white/30 px-3 py-1 rounded-sm uppercase tracking-wider font-bold transition cursor-pointer"
            >
              Resume Online
            </button>
          </div>
        </div>
      )}

      {/* Public Guest Website Layout */}
      {!isAdminOpen ? (
        <>
          <Header onOpenAdmin={() => setIsAdminOpen(true)} />
          <main>
            <Hero onOpenVirtualTour={() => setIsVirtualTourOpen(true)} />
            <RoomsSection />
            <InteractiveMap />
            <DiningSection />
            <ActivitiesSection />
            <GallerySection
              isVirtualTourOpen={isVirtualTourOpen}
              onCloseVirtualTour={() => setIsVirtualTourOpen(false)}
              onOpenVirtualTour={() => setIsVirtualTourOpen(true)}
            />
            <SocialFeed />
            <LoyaltyProgram />
          </main>
          <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

          {/* Interactive Modals & Floating Widgets */}
          <BookingModal />
          <OfflineItineraryModal />
          <AuthModal />
          <LiveChatWidget />
        </>
      ) : (
        /* Staff / Manager Admin Portal */
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
};

export function App() {
  return (
    <ResortProvider>
      <ResortAppContent />
    </ResortProvider>
  );
}

export default App;

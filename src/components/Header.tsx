import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  Sun, 
  Moon, 
  Globe, 
  Coins, 
  Bell, 
  Search, 
  MapPin, 
  Wifi, 
  WifiOff, 
  User, 
  Menu as MenuIcon, 
  X, 
  ShieldCheck, 
  Calendar, 
  Compass,
  Sparkles,
  Phone,
  Bookmark
} from 'lucide-react';
import { CURRENCY_RATES } from '../data/resortData';
import { CurrencyCode, LanguageCode } from '../types';

export const Header: React.FC<{
  onOpenMyBookings?: () => void;
  onOpenAdmin?: () => void;
}> = ({ onOpenMyBookings, onOpenAdmin }) => {
  const {
    currency,
    setCurrency,
    language,
    setLanguage,
    t,
    weather,
    openBookingModal,
    currentUser,
    userRole,
    setUserRole,
    openAuthModal,
    logoutUser,
    notifications,
    unreadNotificationsCount,
    markNotificationsAsRead,
    isOfflineMode,
    setIsOfflineMode,
    setIsOfflineModalOpen,
    searchQuery,
    setSearchQuery,
    requestUserLocation,
    distanceToResortKm,
    currentSection,
    setCurrentSection
  } = useResort();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('home', 'Home') },
    { id: 'rooms', label: t('rooms', 'Rooms & Suites') },
    { id: 'dining', label: t('dining', 'Dining & Bar') },
    { id: 'map', label: t('map', 'Sipalay Map & Diving') },
    { id: 'activities', label: t('activities', 'Activities') },
    { id: 'gallery', label: t('gallery', 'Gallery & 360°') },
    { id: 'reviews', label: t('reviews', 'Reviews & UGC') },
    { id: 'loyalty', label: t('loyalty', 'Glow Club') },
    { id: 'about', label: t('about', 'About') }
  ];

  const handleNavClick = (id: string) => {
    setCurrentSection(id);
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const languagesList: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hil', label: 'Hiligaynon (Ilonggo)', flag: '🇵🇭' },
    { code: 'fil', label: 'Filipino / Tagalog', flag: '🇵🇭' },
    { code: 'ceb', label: 'Cebuano / Bisaya', flag: '🇵🇭' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs transition-all">
      {/* Top Notification / Utility Bar */}
      <div className="bg-[#1A1A1A] text-stone-300 text-xs py-2 px-4 sm:px-8 flex flex-wrap justify-between items-center gap-2 border-b border-stone-800">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="flex items-center gap-1.5 font-medium text-[#83C5BE]">
            <Sun className="w-3.5 h-3.5 text-[#E29578] animate-spin-slow" />
            <span className="tracking-wide">Sipalay Live: {weather.temperatureC}°C • {weather.condition}</span>
          </span>
          <span className="hidden md:inline-block text-stone-600">•</span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-[#83C5BE]" />
            <span className="tracking-wide">Poblacion Beach, Sipalay City, Negros Occidental</span>
            {distanceToResortKm !== null && (
              <span className="text-[#E29578] font-semibold">({distanceToResortKm} km away)</span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Geolocation Button */}
          <button
            onClick={() => requestUserLocation()}
            className="hidden sm:flex items-center gap-1 hover:text-[#83C5BE] transition cursor-pointer text-xs uppercase tracking-wider"
            title="Locate nearest distance to Alon Aninag"
          >
            <Compass className="w-3.5 h-3.5 text-[#83C5BE]" />
            <span>Find Nearby</span>
          </button>

          {/* Offline Mode Toggle */}
          <button
            onClick={() => setIsOfflineModalOpen(true)}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[11px] font-bold uppercase tracking-wider transition cursor-pointer ${
              isOfflineMode ? 'bg-[#006D77] text-white' : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
            title="Access your itineraries without internet connectivity"
          >
            {isOfflineMode ? <WifiOff className="w-3 h-3 text-[#83C5BE]" /> : <Wifi className="w-3 h-3 text-[#83C5BE]" />}
            <span>{isOfflineMode ? 'Offline Active' : 'Offline Mode'}</span>
          </button>

          {/* Admin Switcher Shortcut */}
          <button
            onClick={() => {
              if (userRole === 'admin') setUserRole('customer');
              else setUserRole('admin');
            }}
            className={`hidden lg:flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[11px] font-bold uppercase tracking-wider transition cursor-pointer ${
              userRole === 'admin' ? 'bg-[#E29578] text-white font-bold' : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>{userRole === 'admin' ? 'Admin Portal' : 'Staff Login'}</span>
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo - Professional Polish */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-sm bg-[#006D77] flex items-center justify-center shadow-md text-white font-serif text-lg font-bold tracking-tight group-hover:bg-[#00555d] transition-colors">
              🌊
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-serif tracking-widest text-[#006D77] font-bold">
                ALON ANINAG
              </h1>
              <span className="text-[10px] tracking-[0.3em] uppercase text-stone-500 font-medium">
                Boutique Beach Resort
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-6 text-xs sm:text-sm font-medium uppercase tracking-wider">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-1 transition-colors cursor-pointer ${
                  currentSection === item.id 
                    ? 'border-b-2 border-[#006D77] text-[#006D77] font-bold' 
                    : 'text-stone-600 hover:text-[#006D77]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Tools & Booking CTA */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Input Trigger */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-white border border-stone-300 rounded-md px-3 py-1.5 shadow-xs">
                  <Search className="w-4 h-4 text-stone-400 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search rooms, dining, diving..."
                    className="text-xs outline-hidden w-36 sm:w-44 text-stone-800"
                    autoFocus
                  />
                  <button 
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                    className="text-stone-400 hover:text-stone-700 ml-1 text-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-md text-stone-600 hover:text-[#006D77] hover:bg-stone-100 transition cursor-pointer"
                  title="Search Resort"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
                  setIsLangDropdownOpen(false);
                  setIsNotifDropdownOpen(false);
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-stone-200 bg-stone-50 hover:bg-white text-xs font-semibold text-stone-700 transition cursor-pointer shadow-xs"
                title="Change Currency"
              >
                <Coins className="w-3.5 h-3.5 text-[#006D77]" />
                <span className="uppercase">{currency}</span>
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-stone-200 py-1 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 border-b border-stone-100 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    Select Currency
                  </div>
                  {Object.entries(CURRENCY_RATES).map(([code, data]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code as CurrencyCode);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-50 transition cursor-pointer ${
                        currency === code ? 'text-[#006D77] font-bold bg-teal-50/50' : 'text-stone-700'
                      }`}
                    >
                      <span className="font-medium">{code} ({data.symbol})</span>
                      <span className="text-[11px] text-stone-400">{data.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLangDropdownOpen(!isLangDropdownOpen);
                  setIsCurrencyDropdownOpen(false);
                  setIsNotifDropdownOpen(false);
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-stone-200 bg-stone-50 hover:bg-white text-xs font-semibold text-stone-700 transition cursor-pointer shadow-xs"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#006D77]" />
                <span className="uppercase">{language}</span>
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-stone-200 py-1 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 border-b border-stone-100 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    Language Selection
                  </div>
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-50 transition cursor-pointer ${
                        language === lang.code ? 'text-[#006D77] font-bold bg-teal-50/50' : 'text-stone-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotifDropdownOpen(!isNotifDropdownOpen);
                  setIsLangDropdownOpen(false);
                  setIsCurrencyDropdownOpen(false);
                  setIsUserMenuOpen(false);
                  markNotificationsAsRead();
                }}
                className="relative p-2 rounded-md text-stone-600 hover:text-[#006D77] hover:bg-stone-100 transition cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E29578] rounded-full animate-ping" />
                )}
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E29578] rounded-full" />
                )}
              </button>

              {isNotifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-stone-200 p-3 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#006D77]">
                      Notifications & Updates
                    </span>
                    <span className="text-[11px] text-stone-400">{notifications.length} alerts</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs">
                        <div className="font-semibold text-stone-800 flex justify-between items-center mb-0.5">
                          <span>{notif.title}</span>
                          <span className="text-[10px] text-stone-400 font-normal">{notif.time}</span>
                        </div>
                        <p className="text-stone-600 text-[11px] leading-relaxed">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Account / Profile Menu */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => {
                    setIsUserMenuOpen(!isUserMenuOpen);
                    setIsLangDropdownOpen(false);
                    setIsCurrencyDropdownOpen(false);
                    setIsNotifDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-md border border-stone-200 bg-white hover:bg-stone-50 transition cursor-pointer text-xs"
                >
                  <div className="w-6 h-6 rounded-sm bg-[#006D77] text-white flex items-center justify-center font-bold text-[11px]">
                    {currentUser.firstName.charAt(0)}
                  </div>
                  <span className="hidden md:inline-block font-semibold text-stone-800 max-w-[90px] truncate">
                    {currentUser.firstName}
                  </span>
                  <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.2 bg-teal-50 text-[#006D77] rounded font-medium">
                    {currentUser.loyaltyTier}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-stone-300 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 transition cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-[#006D77]" />
                  <span className="uppercase tracking-wider text-[11px]">Sign In</span>
                </button>
              )}

              {isUserMenuOpen && currentUser && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-3 z-50 animate-fadeIn">
                  <div className="pb-3 mb-2 border-b border-stone-100">
                    <p className="font-bold text-sm text-stone-900">{currentUser.name}</p>
                    <p className="text-xs text-stone-500 truncate">{currentUser.email}</p>
                    <div className="mt-2 flex items-center justify-between text-xs bg-stone-50 p-2 rounded-md border border-stone-200">
                      <span className="text-stone-600">Glow Tier:</span>
                      <span className="font-bold text-[#006D77]">{currentUser.loyaltyTier} ({currentUser.loyaltyPoints} pts)</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        onOpenMyBookings();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 rounded transition flex items-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#006D77]" />
                      My Bookings & E-Vouchers
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick('loyalty');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 rounded transition flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E29578]" />
                      Glow Club Loyalty Rewards
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick('map');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 rounded transition flex items-center gap-2"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-[#006D77]" />
                      Saved Sipalay Itinerary
                    </button>
                    <div className="pt-2 mt-2 border-t border-stone-100">
                      <button
                        onClick={() => {
                          logoutUser();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded transition"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Book Now CTA Button - Professional Polish */}
            <button
              onClick={() => openBookingModal()}
              className="bg-[#006D77] hover:bg-[#00555d] text-white px-5 sm:px-6 py-2.5 rounded-sm text-xs sm:text-sm uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t('bookNow', 'Book Now')}</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-stone-700 hover:bg-stone-100 transition cursor-pointer"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn shadow-lg">
          <div className="grid grid-cols-2 gap-2 py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-md text-xs uppercase tracking-wider font-semibold transition cursor-pointer ${
                  currentSection === item.id
                    ? 'bg-teal-50 text-[#006D77] border-l-2 border-[#006D77]'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 flex flex-wrap gap-2">
            <button
              onClick={() => {
                if (onOpenMyBookings) {
                  onOpenMyBookings();
                } else {
                  openBookingModal();
                }
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2 px-3 bg-stone-50 rounded-md border border-stone-200 text-xs font-semibold text-stone-800 flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              <Calendar className="w-3.5 h-3.5 text-[#006D77]" />
              My Bookings
            </button>
            <button
              onClick={() => {
                setIsOfflineModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2 px-3 bg-stone-50 rounded-md border border-stone-200 text-xs font-semibold text-stone-800 flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              <WifiOff className="w-3.5 h-3.5 text-[#006D77]" />
              Offline Itinerary
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

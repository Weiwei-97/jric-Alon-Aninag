import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CurrencyCode, 
  LanguageCode, 
  Reservation, 
  UserAccount, 
  ChatMessage, 
  NotificationItem, 
  UserReview, 
  SocialPost,
  Attraction
} from '../types';
import { 
  ROOMS_DATA, 
  CURRENCY_RATES, 
  REVIEWS_DATA, 
  SOCIAL_POSTS, 
  ATTRACTONS_DATA, 
  BOOKING_ADDONS 
} from '../data/resortData';
import confetti from 'canvas-confetti';

interface WeatherInfo {
  temperatureC: number;
  tempC?: number;
  condition: string;
  humidity: number;
  windKmH: number;
  sunsetTime: string;
  seaCondition: string;
  uvIndex: number;
  highTide?: string;
}

interface ResortContextType {
  // Localization & Currency
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  language: LanguageCode;
  setLanguage: (l: LanguageCode) => void;
  formatPrice: (amountPHP: number) => string;
  t: (key: string, defaultText?: string) => string;

  // Weather & Conditions
  weather: WeatherInfo;
  refreshWeather: () => void;

  // Bookings & Reservations
  reservations: Reservation[];
  createBooking: (reservation: Omit<Reservation, 'id' | 'referenceNumber' | 'createdAt'>) => Promise<Reservation>;
  cancelBooking: (id: string) => void;
  updateBookingStatus: (id: string, status: Reservation['bookingStatus']) => void;
  getBookingByReference: (ref: string) => Reservation | undefined;
  activeBookingModalRoomId: string | null;
  openBookingModal: (roomId?: string) => void;
  closeBookingModal: () => void;
  lastConfirmedBooking: Reservation | null;
  setLastConfirmedBooking: (b: Reservation | null) => void;

  // User Account & Loyalty
  currentUser: UserAccount | null;
  userRole: 'customer' | 'staff' | 'admin';
  setUserRole: (role: 'customer' | 'staff' | 'admin') => void;
  loginUser: (emailOrUser: string | Partial<UserAccount>, role?: 'customer' | 'staff' | 'admin', name?: string) => void;
  logoutUser: () => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
  openAuthModal: (initialTab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  savedAttractionIds: string[];
  toggleSaveAttraction: (id: string) => void;

  // Social & Reviews
  reviews: UserReview[];
  addReview: (review: Omit<UserReview, 'id' | 'date' | 'likes'>) => void;
  socialPosts: SocialPost[];
  addSocialPost: (post: Omit<SocialPost, 'id' | 'timestamp' | 'likes'>) => void;
  likeSocialPost: (id: string) => void;

  // Live Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  sendMessage: (text: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  toggleChat: () => void;
  isSupportTyping: boolean;

  // Notifications
  notifications: NotificationItem[];
  addNotification: (title: string, message: string, type?: NotificationItem['type']) => void;
  markNotificationsAsRead: () => void;
  unreadNotificationsCount: number;

  // Offline Mode & Itinerary
  isOfflineMode: boolean;
  setIsOfflineMode: (offline: boolean) => void;
  toggleOfflineMode: () => void;
  isOfflineModalOpen: boolean;
  setIsOfflineModalOpen: (open: boolean) => void;
  openOfflineModal: () => void;
  closeOfflineModal: () => void;

  // Search & Navigation
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
  userCoords: { lat: number; lng: number } | null;
  requestUserLocation: () => Promise<boolean>;
  distanceToResortKm: number | null;
}

const UI_DICTIONARY: Record<LanguageCode, Record<string, string>> = {
  en: {
    home: 'Home',
    about: 'About',
    rooms: 'Rooms & Suites',
    availability: 'Availability',
    bookNow: 'Book Your Stay',
    dining: 'Dining & Cocktails',
    amenities: 'Amenities',
    activities: 'Activities & Tours',
    gallery: 'Gallery',
    map: 'Interactive Map',
    experiences: 'Experiences',
    reviews: 'Reviews & UGC',
    loyalty: 'Glow Club Rewards',
    contact: 'Contact Us',
    checkIn: 'Check-In',
    checkOut: 'Check-Out',
    guests: 'Guests',
    whereWavesRest: 'Where Waves Rest and Souls Glow',
    restGlowRepeat: 'Rest. Glow. Repeat.',
    poblacionBeach: 'Poblacion Beach, Sipalay City',
    night: 'night',
    perNight: 'per night',
    viewDetails: 'See Details',
    myBooking: 'My Booking',
    adminDashboard: 'Resort Admin'
  },
  fil: {
    home: 'Tahanan',
    about: 'Tungkol sa Amin',
    rooms: 'Mga Kuwarto at Villa',
    availability: 'Tingnan ang Bakante',
    bookNow: 'Mag-book Ngayon',
    dining: 'Pagkain at Bar',
    amenities: 'Pasilidad',
    activities: 'Mga Aktibidad at Tour',
    gallery: 'Galerya ng Larawan',
    map: 'Interaktibong Mapa',
    experiences: 'Karanasan',
    reviews: 'Mga Komento at Larawan',
    loyalty: 'Glow Rewards Program',
    contact: 'Makipag-ugnayan',
    checkIn: 'Araw ng Dating',
    checkOut: 'Araw ng Alis',
    guests: 'Bilang ng Bisita',
    whereWavesRest: 'Kung Saan Namamahinga ang Alon at Kumikinang ang Kaluluwa',
    restGlowRepeat: 'Pahinga. Ningning. Ulitin.',
    poblacionBeach: 'Poblacion Beach, Sipalay City',
    night: 'gabi',
    perNight: 'bawat gabi',
    viewDetails: 'Tingnan ang Detalye',
    myBooking: 'Aking Reserbasyon',
    adminDashboard: 'Admin Panel'
  },
  hil: {
    home: 'Balay',
    about: 'Parte sa Alon Aninag',
    rooms: 'Mga Hulot kag Villa',
    availability: 'Tan-awa ang Bakante',
    bookNow: 'Mag-book Dayon',
    dining: 'Pagkaon kag Inasal',
    amenities: 'Pasilidad',
    activities: 'Mga Lagaw kag Sakayan',
    gallery: 'Mga Retrato',
    map: 'Mapa sang Sipalay',
    experiences: 'Matahom nga Experiensya',
    reviews: 'Panghuna-huna sang Bisita',
    loyalty: 'Glow Club Premyo',
    contact: 'Tawgi Kami',
    checkIn: 'Adlaw sang Pag-abot',
    checkOut: 'Adlaw sang Paghalin',
    guests: 'Pila ka Tawo',
    whereWavesRest: 'Sa Diin Nagapahuway ang Balod kag Nagasiga ang Kalag',
    restGlowRepeat: 'Pahuway. Siga. Liwat.',
    poblacionBeach: 'Poblacion Baybayon, Sipalay',
    night: 'gab-i',
    perNight: 'kada gab-i',
    viewDetails: 'Tan-awa ang Detalye',
    myBooking: 'Akon Booking',
    adminDashboard: 'Resort Admin'
  },
  ceb: {
    home: 'Panimalay',
    about: 'Mahitungod Kanato',
    rooms: 'Mga Kwarto ug Villa',
    availability: 'Susiha ang Bakante',
    bookNow: 'Mag-book Karon',
    dining: 'Kalan-on ug Bar',
    amenities: 'Pasilidad',
    activities: 'Mga Kalihokan ug Tour',
    gallery: 'Galeriya',
    map: 'Mapa sa Sipalay',
    experiences: 'Mga Kasinatian',
    reviews: 'Mga Pagsusi sa Bisita',
    loyalty: 'Glow Club Programa',
    contact: 'Kontaka Kami',
    checkIn: 'Adlaw sa Pag-abot',
    checkOut: 'Adlaw sa Paggikan',
    guests: 'Mga Bisita',
    whereWavesRest: 'Kung Diin Mopahulay ang Balod ug Modan-ag ang Kalag',
    restGlowRepeat: 'Pahulay. Dan-ag. Usba.',
    poblacionBeach: 'Poblacion Beach, Sipalay City',
    night: 'gabii',
    perNight: 'matag gabii',
    viewDetails: 'Tan-awa ang Detalye',
    myBooking: 'Akong Booking',
    adminDashboard: 'Admin Panel'
  },
  es: {
    home: 'Inicio',
    about: 'Sobre Nosotros',
    rooms: 'Habitaciones y Villas',
    availability: 'Disponibilidad',
    bookNow: 'Reservar Ahora',
    dining: 'Gastronomía y Bar',
    amenities: 'Comodidades',
    activities: 'Actividades y Excursiones',
    gallery: 'Galería',
    map: 'Mapa Interactivo',
    experiences: 'Experiencias',
    reviews: 'Opiniones y Fotos',
    loyalty: 'Club Glow Recompensas',
    contact: 'Contacto',
    checkIn: 'Llegada',
    checkOut: 'Salida',
    guests: 'Huéspedes',
    whereWavesRest: 'Donde las olas descansan y las almas brillan',
    restGlowRepeat: 'Descansa. Brilla. Repite.',
    poblacionBeach: 'Playa Población, Ciudad de Sipalay',
    night: 'noche',
    perNight: 'por noche',
    viewDetails: 'Ver Detalles',
    myBooking: 'Mi Reserva',
    adminDashboard: 'Panel de Administración'
  },
  ja: {
    home: 'ホーム',
    about: '当リゾートについて',
    rooms: '客室＆ヴィラ',
    availability: '空室確認',
    bookNow: '今すぐ予約',
    dining: 'レストラン＆バー',
    amenities: '施設・設備',
    activities: 'アクティビティ＆ツアー',
    gallery: 'ギャラリー',
    map: '周辺マップ',
    experiences: '体験',
    reviews: '口コミ・写真',
    loyalty: 'グロウクラブ特典',
    contact: 'お問い合わせ',
    checkIn: 'チェックイン',
    checkOut: 'チェックアウト',
    guests: '宿泊人数',
    whereWavesRest: '波が憩い、魂が輝く場所',
    restGlowRepeat: '休息。輝き。くりかえし。',
    poblacionBeach: 'シパライ市ポブラシオンビーチ',
    night: '泊',
    perNight: '1泊あたり',
    viewDetails: '詳細を見る',
    myBooking: '予約確認',
    adminDashboard: '管理画面'
  },
  ko: {
    home: '홈',
    about: '리조트 소개',
    rooms: '객실 및 빌라',
    availability: '실시간 예약 현황',
    bookNow: '지금 예약하기',
    dining: '다이닝 & 바',
    amenities: '부대시설',
    activities: '액티비티 & 투어',
    gallery: '갤러리',
    map: '인터랙티브 지도',
    experiences: '특별한 경험',
    reviews: '리얼 후기 & 피드',
    loyalty: '글로우 클럽 리워드',
    contact: '문의하기',
    checkIn: '체크인',
    checkOut: '체크아웃',
    guests: '투숙 인원',
    whereWavesRest: '파도가 쉬어가고 영혼이 빛나는 곳',
    restGlowRepeat: '휴식. 빛남. 반복.',
    poblacionBeach: '시팔라이 포블라시온 비치',
    night: '박',
    perNight: '1박 기준',
    viewDetails: '상세 정보',
    myBooking: '내 예약 관리',
    adminDashboard: '관리자 대시보드'
  }
};

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-101',
    referenceNumber: 'ALON-2026-8192',
    roomId: 'room-aninag-villa',
    roomName: 'Aninag Sunset Master Villa',
    guestName: 'Patricia Gonzales',
    firstName: 'Patricia',
    lastName: 'Gonzales',
    email: 'patricia.g@gmail.com',
    phone: '+63 917 882 1234',
    checkInDate: '2026-09-04',
    checkOutDate: '2026-09-06',
    nights: 2,
    adults: 2,
    children: 0,
    roomCount: 1,
    selectedAddons: [BOOKING_ADDONS[1]], // Bonfire dinner
    specialRequests: 'Celebrating 3rd Wedding Anniversary. Sunset beach table please!',
    promoCodeApplied: 'GLOWSUNSET',
    discountAmountPHP: 640,
    totalAmountPHP: 7410,
    depositPaidPHP: 2223,
    balanceDuePHP: 5187,
    paymentMethod: 'GCash',
    paymentStatus: 'Paid Deposit',
    bookingStatus: 'Confirmed',
    createdAt: '2026-08-30T10:15:00Z',
    dietaryRequirements: 'Seafood lovers, no pork',
    estimatedArrivalTime: '3:00 PM'
  },
  {
    id: 'res-102',
    referenceNumber: 'ALON-2026-9041',
    roomId: 'room-barkada-loft',
    roomName: 'Barkada Glow Loft',
    guestName: 'Joshua Miguel Tan',
    firstName: 'Joshua Miguel',
    lastName: 'Tan',
    email: 'joshua.tan@outlook.com',
    phone: '+63 920 911 8832',
    checkInDate: '2026-09-11',
    checkOutDate: '2026-09-13',
    nights: 2,
    adults: 4,
    children: 0,
    roomCount: 1,
    selectedAddons: [BOOKING_ADDONS[2]], // Island hopping
    specialRequests: 'Barkada trip from Bacolod. Need late check-in at 6 PM.',
    promoCodeApplied: 'BARKADA2026',
    discountAmountPHP: 700,
    totalAmountPHP: 8100,
    depositPaidPHP: 2430,
    balanceDuePHP: 5670,
    paymentMethod: 'Maya',
    paymentStatus: 'Paid Deposit',
    bookingStatus: 'Confirmed',
    createdAt: '2026-08-29T14:40:00Z',
    estimatedArrivalTime: '6:00 PM'
  }
];

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'concierge',
    senderName: 'Ate Maria (Alon Concierge)',
    text: 'Maayong adlaw! 🌴 Welcome to Alon Aninag Boutique Beach Resort in Poblacion Beach, Sipalay! How can we make your tropical getaway unforgettable today?',
    timestamp: 'Just now',
    options: ['Check Room Availability', 'How to get from Bacolod/Dumaguete?', 'Island Hopping & Diving Rates', 'Book Sunset Bonfire Dinner']
  }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '🌴 Welcome to Alon & Aninag',
    message: 'Where Waves Rest and Souls Glow. Enjoy complimentary sunset bonfire tonight from 5:30 PM!',
    time: '10m ago',
    type: 'alert',
    read: false
  },
  {
    id: 'notif-2',
    title: '✨ September Promo: #GlowAtAlon',
    message: 'Book 2 nights or more and get a complimentary Sunset Don Papa Rum Punch for two with code SOULSUNSET.',
    time: '1h ago',
    type: 'promo',
    read: false
  },
  {
    id: 'notif-3',
    title: '☀️ Sipalay Weather Perfect for Diving',
    message: 'Calm seas & 25m water visibility in Campomanes Bay today. Great day for coral snorkeling!',
    time: '3h ago',
    type: 'weather',
    read: false
  }
];

const safeGetItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSetItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage errors in restricted contexts
  }
};

const ResortContext = createContext<ResortContextType | undefined>(undefined);

export const ResortProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('PHP');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isSupportTyping, setIsSupportTyping] = useState<boolean>(false);

  const toggleOfflineMode = () => setIsOfflineMode(prev => !prev);
  const openOfflineModal = () => setIsOfflineModalOpen(true);
  const closeOfflineModal = () => setIsOfflineModalOpen(false);
  const toggleChat = () => setIsChatOpen(prev => !prev);

  // Weather state (Sipalay City conditions)
  const [weather, setWeather] = useState<WeatherInfo>({
    temperatureC: 29,
    tempC: 29,
    condition: 'Sunny & Gentle Sea Breeze',
    humidity: 74,
    windKmH: 12,
    sunsetTime: '5:58 PM',
    highTide: '3:45 PM (1.4m)',
    seaCondition: 'Calm & Crystal Clear (0.3m wave height)',
    uvIndex: 7
  });

  // Reservations
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = safeGetItem('alon_aninag_reservations');
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  const [activeBookingModalRoomId, setActiveBookingModalRoomId] = useState<string | null>(null);
  const [lastConfirmedBooking, setLastConfirmedBooking] = useState<Reservation | null>(null);

  // Auth & Roles
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = safeGetItem('alon_aninag_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      id: 'usr-guest-1',
      name: 'Camille Tan',
      firstName: 'Camille',
      lastName: 'Tan',
      email: 'camille.tan@example.com',
      phone: '+63 917 555 9012',
      role: 'customer',
      loyaltyPoints: 340,
      loyaltyTier: 'Wave',
      savedDestinations: ['attr-tinagong-dagat', 'attr-campomanes-bay'],
      bookingHistory: ['ALON-2026-8192']
    };
  });
  const [userRole, setUserRole] = useState<'customer' | 'staff' | 'admin'>('customer');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Social & Reviews
  const [reviews, setReviews] = useState<UserReview[]>(() => {
    try {
      const saved = safeGetItem('alon_aninag_reviews');
      return saved ? JSON.parse(saved) : REVIEWS_DATA;
    } catch {
      return REVIEWS_DATA;
    }
  });

  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(() => {
    try {
      const saved = safeGetItem('alon_aninag_social');
      return saved ? JSON.parse(saved) : SOCIAL_POSTS;
    } catch {
      return SOCIAL_POSTS;
    }
  });

  // Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = safeGetItem('alon_aninag_chat');
      return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
    } catch {
      return INITIAL_CHAT_MESSAGES;
    }
  });
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = safeGetItem('alon_aninag_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // GPS / Geolocation
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [distanceToResortKm, setDistanceToResortKm] = useState<number | null>(null);

  // Saved destinations
  const [savedAttractionIds, setSavedAttractionIds] = useState<string[]>(() => {
    try {
      const saved = safeGetItem('alon_aninag_saved_destinations');
      return saved ? JSON.parse(saved) : ['attr-tinagong-dagat', 'attr-campomanes-bay', 'attr-sugar-beach'];
    } catch {
      return ['attr-tinagong-dagat', 'attr-campomanes-bay', 'attr-sugar-beach'];
    }
  });

  // Save to local storage on changes
  useEffect(() => {
    safeSetItem('alon_aninag_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    safeSetItem('alon_aninag_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    safeSetItem('alon_aninag_social', JSON.stringify(socialPosts));
  }, [socialPosts]);

  useEffect(() => {
    safeSetItem('alon_aninag_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    safeSetItem('alon_aninag_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    safeSetItem('alon_aninag_saved_destinations', JSON.stringify(savedAttractionIds));
  }, [savedAttractionIds]);

  useEffect(() => {
    if (currentUser) {
      safeSetItem('alon_aninag_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Currency price formatting
  const formatPrice = (amountPHP: number): string => {
    const targetRate = CURRENCY_RATES[currency] || CURRENCY_RATES.PHP;
    const converted = amountPHP * targetRate.rateToPHP;

    if (currency === 'PHP') {
      return `₱${Math.round(converted).toLocaleString()}`;
    } else if (currency === 'USD') {
      return `$${converted.toFixed(2)}`;
    } else if (currency === 'EUR') {
      return `€${converted.toFixed(2)}`;
    } else if (currency === 'JPY') {
      return `¥${Math.round(converted).toLocaleString()}`;
    } else if (currency === 'KRW') {
      return `₩${Math.round(converted).toLocaleString()}`;
    } else if (currency === 'AUD') {
      return `A$${converted.toFixed(2)}`;
    } else if (currency === 'SGD') {
      return `S$${converted.toFixed(2)}`;
    }
    return `₱${Math.round(amountPHP).toLocaleString()}`;
  };

  // Translation helper
  const t = (key: string, defaultText?: string): string => {
    const langDict = UI_DICTIONARY[language] || UI_DICTIONARY.en;
    if (langDict[key]) return langDict[key];
    if (UI_DICTIONARY.en[key]) return UI_DICTIONARY.en[key];
    return defaultText || key;
  };

  const refreshWeather = () => {
    const variations = [
      { temp: 30, cond: 'Sunny with Golden Sunset Glow', wave: 'Gentle (0.2m)' },
      { temp: 28, cond: 'Clear Sky & Cool Tropical Breeze', wave: 'Calm & Glassy (0.1m)' },
      { temp: 29, cond: 'Golden Hour Perfection', wave: 'Serene Sunset Swell (0.3m)' }
    ];
    const pick = variations[Math.floor(Math.random() * variations.length)];
    setWeather(prev => ({
      ...prev,
      temperatureC: pick.temp,
      condition: pick.cond,
      seaCondition: pick.wave
    }));
  };

  // Create booking
  const createBooking = async (data: Omit<Reservation, 'id' | 'referenceNumber' | 'createdAt'>): Promise<Reservation> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newRef = `ALON-2026-${randomSuffix}`;
    const newReservation: Reservation = {
      ...data,
      id: `res-${Date.now()}`,
      referenceNumber: newRef,
      createdAt: new Date().toISOString()
    };

    setReservations(prev => [newReservation, ...prev]);
    setLastConfirmedBooking(newReservation);

    // Add points to user account
    if (currentUser) {
      const pointsEarned = Math.round(newReservation.totalAmountPHP / 100);
      setCurrentUser(prev => {
        if (!prev) return prev;
        const updatedPoints = prev.loyaltyPoints + pointsEarned;
        let newTier: UserAccount['loyaltyTier'] = prev.loyaltyTier;
        if (updatedPoints >= 1000) newTier = 'Golden Glow';
        else if (updatedPoints >= 500) newTier = 'Sunbeam';
        else if (updatedPoints >= 200) newTier = 'Wave';
        
        return {
          ...prev,
          loyaltyPoints: updatedPoints,
          loyaltyTier: newTier,
          bookingHistory: [newRef, ...prev.bookingHistory]
        };
      });
    }

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E4A853', '#2C241D', '#508991', '#F4A261']
      });
    } catch {
      // Ignore if confetti is not available
    }

    // Push notification
    addNotification(
      '🎉 Booking Confirmed!',
      `Your reservation #${newRef} for ${newReservation.roomName} is confirmed. An automated confirmation voucher has been sent to ${newReservation.email}.`,
      'booking'
    );

    return newReservation;
  };

  const cancelBooking = (id: string) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, bookingStatus: 'Cancelled' } : r));
    addNotification('Reservation Status Updated', 'Your booking reservation status was updated.', 'booking');
  };

  const updateBookingStatus = (id: string, status: Reservation['bookingStatus']) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, bookingStatus: status } : r));
    addNotification('Reservation Updated', `Reservation status changed to ${status}`, 'booking');
  };

  const getBookingByReference = (ref: string): Reservation | undefined => {
    return reservations.find(r => r.referenceNumber.trim().toUpperCase() === ref.trim().toUpperCase());
  };

  const openBookingModal = (roomId?: string) => {
    setActiveBookingModalRoomId(roomId || ROOMS_DATA[0].id);
  };

  const closeBookingModal = () => {
    setActiveBookingModalRoomId(null);
  };

  const openAuthModal = (initialTab: 'login' | 'signup' = 'login') => {
    setAuthModalMode(initialTab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const loginUser = (
    emailOrUser: string | Partial<UserAccount>,
    role: 'customer' | 'staff' | 'admin' = 'customer',
    name?: string
  ) => {
    if (typeof emailOrUser === 'object') {
      const newUser: UserAccount = {
        id: emailOrUser.id || `usr-${Date.now()}`,
        name: emailOrUser.name || `${emailOrUser.firstName || 'Maria'} ${emailOrUser.lastName || 'Santos'}`,
        firstName: emailOrUser.firstName || 'Maria',
        lastName: emailOrUser.lastName || 'Santos',
        email: emailOrUser.email || 'maria.santos@gmail.com',
        phone: emailOrUser.phone || '+63 917 582 2566',
        role: emailOrUser.role || role,
        loyaltyPoints: emailOrUser.loyaltyPoints || 340,
        loyaltyTier: emailOrUser.loyaltyTier || 'Wave',
        savedDestinations: emailOrUser.savedDestinations || ['attr-tinagong-dagat', 'attr-sugar-beach'],
        bookingHistory: emailOrUser.bookingHistory || ['ALON-2026-8192']
      };
      setCurrentUser(newUser);
      setUserRole(newUser.role);
      setIsAuthModalOpen(false);
      addNotification('Welcome to Alon!', `Signed in as ${newUser.name}`, 'alert');
      return;
    }

    const email = emailOrUser;
    const accountName = name || email.split('@')[0];
    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name: accountName,
      firstName: accountName.split(' ')[0] || 'Guest',
      lastName: accountName.split(' ')[1] || 'Traveler',
      email: email,
      phone: '+63 917 582 0000',
      role: role,
      loyaltyPoints: role === 'customer' ? 350 : 1200,
      loyaltyTier: role === 'customer' ? 'Wave' : 'Golden Glow',
      savedDestinations: ['attr-tinagong-dagat', 'attr-sugar-beach'],
      bookingHistory: ['ALON-2026-8192']
    };
    setCurrentUser(newUser);
    setUserRole(role);
    setIsAuthModalOpen(false);
    addNotification('Welcome back!', `Signed in as ${newUser.name} (${role.toUpperCase()})`, 'alert');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setUserRole('customer');
    addNotification('Signed Out', 'You have been logged out safely.', 'alert');
  };

  const toggleSaveAttraction = (id: string) => {
    setSavedAttractionIds(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(item => item !== id) : [...prev, id];
      const attr = ATTRACTONS_DATA.find(a => a.id === id);
      if (!exists && attr) {
        addNotification('Destination Saved', `${attr.name} added to your saved itinerary!`, 'alert');
      }
      return next;
    });
  };

  const addReview = (reviewData: Omit<UserReview, 'id' | 'date' | 'likes'>) => {
    const newRev: UserReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: 1
    };
    setReviews(prev => [newRev, ...prev]);
    addNotification('Review Submitted', 'Thank you for sharing your experience with the Alon & Aninag community!', 'alert');
  };

  const addSocialPost = (postData: Omit<SocialPost, 'id' | 'timestamp' | 'likes'>) => {
    const newPost: SocialPost = {
      ...postData,
      id: `soc-${Date.now()}`,
      timestamp: 'Just now',
      likes: 1
    };
    setSocialPosts(prev => [newPost, ...prev]);
    addNotification('Story Shared', 'Your photo was posted to the #GlowAtAlon guest wall!', 'alert');
  };

  const likeSocialPost = (id: string) => {
    setSocialPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type'] = 'alert') => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random()}`,
      title,
      message,
      time: 'Just now',
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const sendChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: currentUser?.name || 'Guest Traveler',
      text,
      timestamp: 'Just now',
      encrypted: true
    };
    setChatMessages(prev => [...prev, userMsg]);

    // Simulated Smart Concierge Response
    setTimeout(() => {
      let replyText = 'Thank you for your message! Our front desk at Poblacion Beach is happy to help you with your stay, airport transfers from Bacolod/Dumaguete, or booking our sunset bonfire dinners. Feel free to call us directly at 0917-582-ALON.';
      const lower = text.toLowerCase();

      if (lower.includes('rate') || lower.includes('price') || lower.includes('cost') || lower.includes('room')) {
        replyText = 'Our boutique room rates range from ₱1,800/night for the Soul Deluxe Queen to ₱3,500/night for the Barkada Loft and Aninag Sunset Master Villa (₱3,200/night). All bookings include breakfast, high-speed Starlink Wi-Fi, and complimentary sunset bonfire sessions!';
      } else if (lower.includes('direction') || lower.includes('bacolod') || lower.includes('dumaguete') || lower.includes('get there') || lower.includes('location')) {
        replyText = 'We are located directly beachfront at Poblacion Beach, Sipalay City (right next to Jazz Inn along the beach road). From Bacolod or Dumaguete, it takes ~3.5 hours. We can arrange private air-conditioned resort van pickups for you!';
      } else if (lower.includes('island') || lower.includes('tour') || lower.includes('tinagong') || lower.includes('boat')) {
        replyText = 'Our Island Hopping Safari visits Tinagong Dagat, Sugar Beach, and Campomanes Bay. The private boat is ₱1,800 for up to 4 persons. Would you like to add this to your room reservation?';
      } else if (lower.includes('food') || lower.includes('inasal') || lower.includes('dinner') || lower.includes('menu') || lower.includes('restaurant')) {
        replyText = 'Our beachfront kitchen serves fresh grilled Sipalay blue marlin, authentic Negrense chicken inasal with garlic rice, batwan sinigang, and our signature Don Papa sunset rum punch! Room service and deck dining are available all day.';
      } else if (lower.includes('wifi') || lower.includes('internet')) {
        replyText = 'Yes! We provide blazing fast Starlink Satellite Wi-Fi (150+ Mbps) throughout all rooms, the beach lounge, and sunset deck—perfect for remote work and uploading your travel reels!';
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'concierge',
        senderName: 'Ate Maria (Alon Concierge)',
        text: replyText,
        timestamp: 'Just now',
        encrypted: true
      };
      setChatMessages(prev => [...prev, botMsg]);
    }, 900);
  };

  // GPS Geolocation Handler
  const requestUserLocation = async (): Promise<boolean> => {
    if (!navigator.geolocation) {
      addNotification('GPS Unavailable', 'Geolocation is not supported by your browser.', 'alert');
      return false;
    }

    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserCoords(coords);

          // Calculate Haversine distance to Sipalay Resort (lat: 9.7523, lng: 122.4042)
          const R = 6371; // km
          const dLat = (coords.lat - 9.7523) * (Math.PI / 180);
          const dLng = (coords.lng - 122.4042) * (Math.PI / 180);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(9.7523 * (Math.PI / 180)) *
              Math.cos(coords.lat * (Math.PI / 180)) *
              Math.sin(dLng / 2) *
              Math.sin(dLng / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const dist = Math.round(R * c);
          setDistanceToResortKm(dist);

          addNotification('GPS Located', `You are ~${dist} km from Alon Aninag Boutique Resort in Sipalay!`, 'alert');
          resolve(true);
        },
        error => {
          // Fallback simulation (e.g. Bacolod or Manila)
          setUserCoords({ lat: 10.6766, lng: 122.9509 }); // Bacolod approx
          setDistanceToResortKm(165);
          addNotification('GPS Simulation', 'Estimated from Western Visayas (~165 km to Sipalay).', 'alert');
          resolve(true);
        },
        { timeout: 8000 }
      );
    });
  };

  return (
    <ResortContext.Provider
      value={{
        currency,
        setCurrency,
        language,
        setLanguage,
        formatPrice,
        t,
        weather,
        refreshWeather,
        reservations,
        createBooking,
        cancelBooking,
        updateBookingStatus,
        getBookingByReference,
        activeBookingModalRoomId,
        openBookingModal,
        closeBookingModal,
        lastConfirmedBooking,
        setLastConfirmedBooking,
        currentUser,
        userRole,
        setUserRole,
        loginUser,
        logoutUser,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal,
        savedAttractionIds,
        toggleSaveAttraction,
        reviews,
        addReview,
        socialPosts,
        addSocialPost,
        likeSocialPost,
        chatMessages,
        sendChatMessage,
        sendMessage: sendChatMessage,
        isChatOpen,
        setIsChatOpen,
        toggleChat,
        isSupportTyping,
        notifications,
        addNotification,
        markNotificationsAsRead,
        unreadNotificationsCount,
        isOfflineMode,
        setIsOfflineMode,
        toggleOfflineMode,
        isOfflineModalOpen,
        setIsOfflineModalOpen,
        openOfflineModal,
        closeOfflineModal,
        searchQuery,
        setSearchQuery,
        currentSection,
        setCurrentSection,
        userCoords,
        requestUserLocation,
        distanceToResortKm
      }}
    >
      {children}
    </ResortContext.Provider>
  );
};

export const useResort = () => {
  const context = useContext(ResortContext);
  if (!context) throw new Error('useResort must be used within a ResortProvider');
  return context;
};

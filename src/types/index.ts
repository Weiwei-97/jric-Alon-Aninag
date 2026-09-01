export type CurrencyCode = 'PHP' | 'USD' | 'EUR' | 'JPY' | 'KRW' | 'AUD' | 'SGD';

export type LanguageCode = 'en' | 'fil' | 'hil' | 'ceb' | 'es' | 'ja' | 'ko';

export interface Room {
  id: string;
  name: string;
  category: 'Villa' | 'Suite' | 'Loft' | 'Deluxe';
  tagline: string;
  pricePHP: number;
  capacity: {
    adults: number;
    children: number;
    maxTotal: number;
  };
  bedType: string;
  sizeSqM: number;
  view: 'Beachfront Ocean View' | 'Direct Beach Walkout' | 'Sunset Sea View' | 'Tropical Garden & Sea';
  description: string;
  features: string[];
  amenities: string[];
  images: string[];
  availableUnits: number;
  totalUnits: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export interface BookingAddon {
  id: string;
  name: string;
  description: string;
  pricePHP: number;
  perPerson?: boolean;
  category: 'transfer' | 'dining' | 'activity' | 'wellness';
}

export interface Reservation {
  id: string;
  referenceNumber: string;
  roomId: string;
  roomName: string;
  guestName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  children: number;
  roomCount: number;
  selectedAddons: BookingAddon[];
  specialRequests?: string;
  promoCodeApplied?: string;
  discountAmountPHP: number;
  totalAmountPHP: number;
  depositPaidPHP: number;
  balanceDuePHP: number;
  paymentMethod: 'GCash' | 'Maya' | 'Card' | 'Bank Transfer' | 'Cash at Check-In';
  paymentStatus: 'Paid Deposit' | 'Fully Paid' | 'Pending Verification';
  bookingStatus: 'Confirmed' | 'Checked-In' | 'Completed' | 'Cancelled';
  createdAt: string;
  guestId?: string;
  dietaryRequirements?: string;
  estimatedArrivalTime?: string;
}

export interface Attraction {
  id: string;
  name: string;
  category: 'Diving' | 'Beach' | 'Viewpoint' | 'Island Hopping' | 'Culture & Food';
  distanceKm: number;
  travelTime: string;
  description: string;
  highlights: string[];
  lat: number;
  lng: number;
  image: string;
  bestTimeToVisit: string;
  activityType: string;
  rating: number;
}

export interface MenuItem {
  id: string;
  name: string;
  localName?: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Sunset Deck Drinks' | 'Bar & Cocktails' | 'Negrense Specials';
  pricePHP: number;
  description: string;
  tags: ('Chef Signature' | 'Local Catch' | 'Vegetarian' | 'Negrense Classic' | 'Gluten-Free' | 'Cocktail')[];
  image: string;
  available: boolean;
}

export interface Activity {
  id: string;
  title: string;
  category: 'Water Sports' | 'Island Hopping' | 'Diving' | 'Eco-Tours' | 'Soul & Wellness';
  duration: string;
  pricePHP: number;
  priceNote: string;
  description: string;
  includes: string[];
  schedule: string;
  image: string;
  popular?: boolean;
}

export interface UserReview {
  id: string;
  author: string;
  userType: 'Couple' | 'Barkada / Group' | 'Solo Traveler' | 'Family';
  origin: string;
  rating: number;
  date: string;
  roomStayed: string;
  title: string;
  comment: string;
  photos?: string[];
  likes: number;
  verifiedStay: boolean;
  avatar: string;
}

export interface SocialPost {
  id: string;
  userName: string;
  userHandle: string;
  avatar: string;
  image: string;
  caption: string;
  location: string;
  likes: number;
  timestamp: string;
  tag: string;
}

export interface LoyaltyTier {
  name: 'Sand' | 'Wave' | 'Sunbeam' | 'Golden Glow';
  minStays: number;
  pointsMultiplier: number;
  color: string;
  perks: string[];
}

export interface UserAccount {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'customer' | 'staff' | 'admin';
  loyaltyPoints: number;
  loyaltyTier: 'Sand' | 'Wave' | 'Sunbeam' | 'Golden Glow';
  savedDestinations: string[];
  bookingHistory: string[];
  avatar?: string;
  memberSince?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  encrypted?: boolean;
  options?: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'booking' | 'promo' | 'alert' | 'weather';
  read: boolean;
}

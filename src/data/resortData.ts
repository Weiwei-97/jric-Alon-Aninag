import { Room, BookingAddon, Attraction, MenuItem, Activity, UserReview, SocialPost, LoyaltyTier } from '../types';

import heroImg from '../assets/images/alon_resort_hero_1788181474178.jpg';
import suiteImg from '../assets/images/alon_room_suite_1788181490218.jpg';
import sunsetDeckImg from '../assets/images/alon_sunset_deck_1788181502814.jpg';
import diningImg from '../assets/images/alon_dining_food_1788181542228.jpg';
import bonfireImg from '../assets/images/alon_bonfire_night_1788181556425.jpg';

export const RESORT_IMAGES = {
  hero: heroImg,
  suite: suiteImg,
  sunsetDeck: sunsetDeckImg,
  dining: diningImg,
  bonfire: bonfireImg,
  beachDay: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  islets: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
  diving: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
  kayaking: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
  cottage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
  polaroid: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
};

export const RESORT_INFO = {
  name: 'Alon Aninag Boutique Beach Resort',
  shortName: 'Alon & Aninag',
  tagline: 'Where Waves Rest and Souls Glow',
  alternativeTagline: 'Rest. Glow. Repeat.',
  concept: 'Boutique beachfront retreat in Poblacion Beach, Sipalay City • Affordable, aesthetic, soulful • 12 cozy rooms facing the sea • Perfect for young travelers, couples, and small families',
  location: {
    address: 'Poblacion Beach (near Jazz Inn / Sunset Baywalk), Sipalay City, Negros Occidental 6111, Philippines',
    coordinates: { lat: 9.7523, lng: 122.4042 },
    nearestAirports: ['Bacolod-Silay Airport (BCD - 3.5 hrs)', 'Dumaguete-Sibulan Airport (DGT - 3.5 hrs)'],
    travelNote: 'Direct scenic coastal road via South National Highway with air-conditioned resort shuttles & Ceres bus lines available.'
  },
  contact: {
    phone: '+63 917 582 2566 (0917-582-ALON)',
    telephone: '(034) 473-2026',
    email: 'stay@alonaninag-resort.ph',
    inquiriesEmail: 'concierge@alonaninag-resort.ph',
    social: {
      instagram: '@alon.aninag.sipalay',
      facebook: 'fb.com/AlonAninagResort',
      tiktok: '@alonaninag'
    }
  },
  stats: {
    totalRooms: 12,
    beachfrontDistance: '0 meters (Direct Sand Walkout)',
    satisfactionRate: '99.4%',
    verifiedReviews: 348
  }
};

export const ROOMS_DATA: Room[] = [
  {
    id: 'room-aninag-villa',
    name: 'Aninag Sunset Master Villa',
    category: 'Villa',
    tagline: 'Panoramic sea-facing sunset haven with private oceanfront balcony & hammock',
    pricePHP: 3200,
    capacity: { adults: 2, children: 1, maxTotal: 3 },
    bedType: '1 King Plush Pillow-Top Bed',
    sizeSqM: 42,
    view: 'Beachfront Ocean View',
    description: 'Our crown jewel at Alon Aninag. Perched right on the golden sands of Poblacion Beach with wide sliding glass doors, handcrafted teak headboards, woven rattan accents, and a private wooden balcony tailored for golden hour soul-watching.',
    features: [
      'Private sunset viewing balcony with woven hammock',
      'En-suite stone bathroom with hot & cold rain shower',
      'Ultra-quiet split inverter air conditioning',
      'Complimentary high-speed Starlink Wi-Fi (150+ Mbps)',
      'Locally sourced artisan bath essentials & Negrense bathrobes',
      'Mini-refrigerator, French press coffee station & electric kettle'
    ],
    amenities: ['Oceanfront Balcony', 'High-Speed Wi-Fi', 'Rain Shower', 'Daily Housekeeping', 'Breakfast for 2', 'Welcome Fresh Buko Drink', 'Smart TV with Netflix'],
    images: [suiteImg, heroImg, sunsetDeckImg],
    availableUnits: 2,
    totalUnits: 3,
    rating: 4.98,
    reviewCount: 114,
    featured: true
  },
  {
    id: 'room-alon-oceanfront',
    name: 'Alon Oceanfront Cozy Suite',
    category: 'Suite',
    tagline: 'Step directly from your wooden veranda onto the soft warm sand of Poblacion Beach',
    pricePHP: 2600,
    capacity: { adults: 2, children: 2, maxTotal: 4 },
    bedType: '1 Queen Bed + 1 Daybed Lounger',
    sizeSqM: 34,
    view: 'Direct Beach Walkout',
    description: 'Designed for couples and soul-searchers who love waking up to the gentle murmur of ocean waves. Features crisp organic linen, warm ambient mood lighting, a dedicated writing/work nook, and direct beach step-out access.',
    features: [
      'Direct ground-level step-out to Poblacion shoreline',
      'Custom wooden daybed converting to extra single sleeper',
      'Warm golden lighting & signature lemongrass-pandan aroma',
      'Work-friendly desk with fast Wi-Fi and universal charging',
      'Organic coconut toiletries in refillable ceramic pump bottles'
    ],
    amenities: ['Beach Walkout', 'Fast Wi-Fi', 'Hot Rain Shower', 'Complimentary Breakfast', 'Mini Fridge', 'Work Nook', 'Beach Towels & Tote Bag'],
    images: [heroImg, suiteImg, diningImg],
    availableUnits: 3,
    totalUnits: 4,
    rating: 4.95,
    reviewCount: 92,
    featured: true
  },
  {
    id: 'room-barkada-loft',
    name: 'Barkada Glow Loft',
    category: 'Loft',
    tagline: 'Aesthetic multi-level bunk & loft suite created for youth barkadas and fun group trips',
    pricePHP: 3500,
    capacity: { adults: 4, children: 1, maxTotal: 5 },
    bedType: '2 Queen Beds + 1 Upper Loft Bunk',
    sizeSqM: 48,
    view: 'Tropical Garden & Sea',
    description: 'The ultimate barkada haven in Sipalay. High ceilings, industrial-boho rattan lamps, board games shelf, multiple charging ports for cameras and phones, and ample space for group storytelling and guitar jamming after sunset.',
    features: [
      'Split-level design with loft mezzanine and lounge corner',
      'Acoustic guitar and vintage card & board games collection',
      '5 separate plush beds with personal reading lamps & USB-C ports',
      'Double vanity bathroom sink for seamless group prep',
      'Large gear rack for dive bags, snorkel masks, and slippers'
    ],
    amenities: ['Sleeps up to 5', 'Double Vanity', 'High-Speed Wi-Fi', 'Board Games & Cards', 'Breakfast for 4 Included', 'Bluetooth Sound Speaker', 'Filtered Drinking Water'],
    images: [bonfireImg, suiteImg, sunsetDeckImg],
    availableUnits: 1,
    totalUnits: 2,
    rating: 4.92,
    reviewCount: 78,
    featured: true
  },
  {
    id: 'room-soul-deluxe',
    name: 'Soul Deluxe Queen',
    category: 'Deluxe',
    tagline: 'Minimalist wood & white haven delivering maximum comfort at an accessible rate',
    pricePHP: 1800,
    capacity: { adults: 2, children: 0, maxTotal: 2 },
    bedType: '1 Queen Bed',
    sizeSqM: 26,
    view: 'Sunset Sea View',
    description: 'Our most sought-after budget-friendly boutique room. Built with clean lines, light oak furnishings, warm recessed lighting, and silent air conditioning. The perfect sanctuary after a full day of island hopping in Sipalay.',
    features: [
      'Clean minimalist Japanese-Scandinavian aesthetic',
      'Orthopedic queen mattress with 300-thread count cotton sheets',
      'Hot & cold water shower with good water pressure',
      'Soundproofed walls ensuring peaceful slumber',
      'Complimentary morning native hot chocolate or barako coffee'
    ],
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'Hot Shower', 'Morning Coffee/Tablea', 'Eco-friendly Toiletries', 'Luggage Bench'],
    images: [suiteImg, heroImg, diningImg],
    availableUnits: 2,
    totalUnits: 3,
    rating: 4.90,
    reviewCount: 64,
    featured: false
  }
];

export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: 'addon-shuttle-bacolod',
    name: 'Private Roundtrip Shuttle (Bacolod or Dumaguete to Sipalay)',
    description: 'Comfortable air-conditioned private van pick-up and drop-off directly to our resort lobby.',
    pricePHP: 3800,
    category: 'transfer'
  },
  {
    id: 'addon-bonfire-dinner',
    name: 'Soul Sunset Bonfire & Romantic Seafood Platter Setup',
    description: 'Private candlelit beach table with bonfire, Negrense grilled seafood feast, and a bottle of wine.',
    pricePHP: 1650,
    category: 'dining'
  },
  {
    id: 'addon-island-hopping-pass',
    name: 'Sipalay 4-Islet Boat Tour & Snorkeling Gear for 2',
    description: 'Private boat tour visiting Tinagong Dagat, Sugar Beach, Campomanes Bay, and Snorkel Sanctuary.',
    pricePHP: 1800,
    category: 'activity'
  },
  {
    id: 'addon-massage-wellness',
    name: 'In-Room Hilot Healing Massage (60 mins)',
    description: 'Traditional Negrense virgin coconut oil massage performed by our certified local wellness therapist.',
    pricePHP: 650,
    category: 'wellness'
  },
  {
    id: 'addon-diving-intro',
    name: 'Discover Scuba Diving Pass with Master Instructor',
    description: 'Complete introductory dive including gear, orientation, boat transfer, and underwater photos.',
    pricePHP: 2800,
    category: 'activity'
  }
];

export const ATTRACTONS_DATA: Attraction[] = [
  {
    id: 'attr-tinagong-dagat',
    name: 'Tinagong Dagat (Hidden Sea)',
    category: 'Island Hopping',
    distanceKm: 8.5,
    travelTime: '18 mins by Tricycle / 25 mins by Bangka',
    description: 'A labyrinth of dozen limestone islets linked by charming hanging bridges. Emerald saltwater lagoons ideal for leisurely kayaking, bamboo raft floating, and capturing iconic bridge photos.',
    highlights: ['Hanging footbridges', 'Kayaking in quiet lagoons', 'Limestone cliffs', 'Lush marine flora'],
    lat: 9.7125,
    lng: 122.3912,
    image: RESORT_IMAGES.islets,
    bestTimeToVisit: '8:00 AM – 11:00 AM (Calm water)',
    activityType: 'Sightseeing & Photography',
    rating: 4.9
  },
  {
    id: 'attr-sugar-beach',
    name: 'Sugar Beach (Langub Beach)',
    category: 'Beach',
    distanceKm: 5.2,
    travelTime: '12 mins by Bangka from Poblacion',
    description: 'A 2-kilometer strip of soft golden-brown sand framed by coconut palms and gentle rolling waves. Perfect for barefoot walks, volleyball, paddleboarding, and relaxed beachside cafés.',
    highlights: ['Fine golden sand', 'Safe gentle swimming', 'Beach volleyball', 'Rustic beach bars'],
    lat: 9.7741,
    lng: 122.4089,
    image: RESORT_IMAGES.beachDay,
    bestTimeToVisit: '2:00 PM – 6:00 PM (Sunset walk)',
    activityType: 'Swimming & Sunbathing',
    rating: 4.8
  },
  {
    id: 'attr-perth-paradise',
    name: 'Perth Paradise Resort Viewpoint',
    category: 'Viewpoint',
    distanceKm: 7.8,
    travelTime: '15 mins by Tricycle / Motorbike',
    description: 'Famous hilltop infinity pool overlooking the world-renowned panoramic vista of Sipalay’s scattered green islets and sparkling blue sea, often compared to Palawan and Halong Bay.',
    highlights: ['Iconic 360-degree panorama', 'Infinity pool photo spot', 'Drone photography paradise'],
    lat: 9.7214,
    lng: 122.3895,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    bestTimeToVisit: 'Early morning or 4:00 PM',
    activityType: 'Viewpoint & Photography',
    rating: 4.9
  },
  {
    id: 'attr-campomanes-bay',
    name: 'Campomanes Bay & Diving Sanctuary',
    category: 'Diving',
    distanceKm: 12.0,
    travelTime: '22 mins by Boat from Poblacion',
    description: 'The premier scuba diving and snorkeling hub of Southern Negros. Pristine coral gardens, historical cargo shipwrecks, drop-off walls, and frequent sightings of sea turtles and spotted eagle rays.',
    highlights: ['Vibrant coral gardens', 'WWII shipwreck dive', 'Clear 25m visibility', 'Sea turtle sightings'],
    lat: 9.6948,
    lng: 122.3762,
    image: RESORT_IMAGES.diving,
    bestTimeToVisit: '7:00 AM – 1:00 PM (High visibility)',
    activityType: 'Scuba Diving & Snorkeling',
    rating: 5.0
  },
  {
    id: 'attr-punta-ballo',
    name: 'Punta Ballo White Beach & Reef',
    category: 'Beach',
    distanceKm: 14.5,
    travelTime: '25 mins by Tricycle / Van',
    description: 'A 1-kilometer pristine white sand beach surrounded by rich coral drop-offs starting just 50 meters from the shoreline. Excellent for shore snorkeling and tranquil beach relaxation.',
    highlights: ['White sand stretch', 'Immediate coral reef drop-off', 'Secluded & peaceful', 'Family friendly'],
    lat: 9.6821,
    lng: 122.3820,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    bestTimeToVisit: 'All day',
    activityType: 'Beach & Marine Conservation',
    rating: 4.85
  },
  {
    id: 'attr-poblacion-sunset',
    name: 'Poblacion Beach Sunset Promenade (Alon Aninag Frontage)',
    category: 'Culture & Food',
    distanceKm: 0.1,
    travelTime: '0 mins (Right at our resort doorstep)',
    description: 'Our home beach. Golden hour magic where the sky blazes in amber and violet. Lined with local seafood stalls, friendly local fishermen, and our own sunset deck acoustic sessions.',
    highlights: ['Unobstructed sunset horizon', 'Live acoustic soul nights', 'Local Negrense street food', 'Safe shallow water'],
    lat: 9.7523,
    lng: 122.4042,
    image: RESORT_IMAGES.sunsetDeck,
    bestTimeToVisit: '5:00 PM – 7:30 PM (Golden Hour)',
    activityType: 'Sunset & Dining',
    rating: 4.98
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'menu-inasal',
    name: 'Authentic Bacolod Chicken Inasal',
    localName: 'Inasal nga Manok with Sinamak & Calamansi',
    category: 'Dinner',
    pricePHP: 280,
    description: 'Chargrilled native chicken marinated in lemongrass, native ginger, coconut vinegar, and golden annatto oil. Served with piping-hot garlic annatto rice and spiced sinamak vinegar.',
    tags: ['Negrense Classic', 'Chef Signature'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-marlin',
    name: 'Sipalay Fisherman’s Grilled Blue Marlin',
    localName: 'Inihaw nga Blue Marlin',
    category: 'Dinner',
    pricePHP: 390,
    description: 'Fresh catch delivered directly by Poblacion fishermen this morning. Seared over mangrove charcoal with garlic butter glaze and sea salt calamansi relish.',
    tags: ['Local Catch', 'Chef Signature'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-sinigang-batwan',
    name: 'Tangigue Sinigang sa Native Batwan',
    localName: 'Sinigang nga Tangigue sa Batwan',
    category: 'Lunch',
    pricePHP: 360,
    description: 'The soul soup of Negros. Fresh Spanish mackerel stewed in broth soured naturally with fresh forest batwan fruit, kangkong, radish, and green chili.',
    tags: ['Negrense Classic'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-breakfast-silog',
    name: 'Alon Sunrise Chorizo Recado Silog',
    localName: 'Chorizo Negrense Silog',
    category: 'Breakfast',
    pricePHP: 220,
    description: 'Two sweet-savory artisan Negrense chorizos, two sunny-side farm eggs, garlic heirloom mountain rice, and pickled papaya atchara. Includes fresh brewed native tablea chocolate.',
    tags: ['Negrense Classic'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-smoothie-bowl',
    name: 'Guimaras-Negros Golden Mango Bowl',
    localName: 'Tropikal Mango & Chia Bowl',
    category: 'Breakfast',
    pricePHP: 210,
    description: 'Thick creamy smoothie of sweet Guimaras mangoes, coconut milk, topped with toasted granola, banana slices, chia seeds, and Negros wild honey.',
    tags: ['Vegetarian', 'Gluten-Free'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-cocktail-aninag',
    name: 'Aninag Golden Hour Sunset Rum Punch',
    localName: 'Aninag Signature Cocktail',
    category: 'Bar & Cocktails',
    pricePHP: 240,
    description: 'Aged Don Papa Negrense rum, fresh passion fruit nectar, calamansi juice, ginger syrup, and a splash of sparkling coconut soda served in a bamboo tumbler.',
    tags: ['Cocktail', 'Chef Signature'],
    image: sunsetDeckImg,
    available: true
  },
  {
    id: 'menu-piaya-dessert',
    name: 'Crispy Muscovado Piaya a la Mode',
    localName: 'Mainit nga Piaya with Vanilla Bean Ice Cream',
    category: 'Sunset Deck Drinks',
    pricePHP: 150,
    description: 'Hot flaky flatbread stuffed with molten organic Negros muscovado sugar, paired with artisanal carabao milk vanilla ice cream and roasted sesame.',
    tags: ['Negrense Classic', 'Vegetarian'],
    image: diningImg,
    available: true
  }
];

export const ACTIVITIES_DATA: Activity[] = [
  {
    id: 'act-island-hopping',
    title: 'Ultimate Sipalay Islets & Hidden Lagoon Boat Safari',
    category: 'Island Hopping',
    duration: '4 - 5 Hours (Half Day)',
    pricePHP: 1800,
    priceNote: 'for up to 4 guests (includes boat & local boatman)',
    description: 'Explore Sipalay’s hidden coastlines on our motorized outrigger banca. Cruise past Tinagong Dagat limestone formations, swim in Sugar Beach, and snorkel at the Marine Sanctuary.',
    includes: ['Private motorized outrigger banca', 'Licensed local captain & guide', 'Snorkel masks & life vests', 'Cold bottled water & fresh tropical fruits'],
    schedule: 'Departures daily at 8:30 AM & 1:30 PM',
    image: RESORT_IMAGES.kayaking,
    popular: true
  },
  {
    id: 'act-scuba-diving',
    title: 'Campomanes Bay Guided Scuba Dive & Wreck Exploration',
    category: 'Diving',
    duration: '3 Hours',
    pricePHP: 2800,
    priceNote: 'per diver (Certified or Discover Scuba)',
    description: 'Descend into Sipalay’s crystal clear waters. Visit shallow reef drop-offs, swim alongside sea turtles, and explore the intact WWII Japanese cargo wreck in Campomanes Bay.',
    includes: ['Full scuba gear (tank, BCD, regulator, wetsuit)', 'PADI certified divemaster guide', 'Boat transfer & marine park environmental fees', 'Underwater GoPro photo/video package'],
    schedule: 'Daily dives at 8:00 AM & 11:00 AM',
    image: RESORT_IMAGES.diving,
    popular: true
  },
  {
    id: 'act-sunset-bonfire',
    title: 'Alon Sunset Acoustic Soul Session & Beach Bonfire',
    category: 'Soul & Wellness',
    duration: 'Every evening 5:30 PM – 9:30 PM',
    pricePHP: 0,
    priceNote: 'Complimentary for in-house resort guests',
    description: 'Gather around the glowing driftwood bonfire as twilight settles over Poblacion Beach. Enjoy gentle live acoustic melodies from local Negrense musicians, marshmallow roasting, and cozy storytelling under the stars.',
    includes: ['Complimentary bonfire access', 'Live acoustic music set', 'Campfire marshmallows & skewers', 'Beach beanbags & woven mats'],
    schedule: 'Wednesdays through Sundays at 5:30 PM',
    image: RESORT_IMAGES.bonfire,
    popular: true
  },
  {
    id: 'act-kayak-paddle',
    title: 'Sunset Stand-Up Paddleboard & Clear Kayak Rental',
    category: 'Water Sports',
    duration: 'Per Hour',
    pricePHP: 300,
    priceNote: 'per board / kayak',
    description: 'Glide quietly over the calm waters of Poblacion Bay. Our transparent clear kayaks let you see the sandy seabed and darting fish beneath as the sun sinks into the horizon.',
    includes: ['Clear kayak or SUP board', 'Carbon fiber paddle', 'Safety life jacket', 'Brief 5-minute safety coaching'],
    schedule: 'Available all day (6:00 AM – 6:00 PM)',
    image: RESORT_IMAGES.beachDay,
    popular: false
  }
];

export const REVIEWS_DATA: UserReview[] = [
  {
    id: 'rev-1',
    author: 'Camille & Marco Tan',
    userType: 'Couple',
    origin: 'Iloilo City',
    rating: 5,
    date: 'August 24, 2026',
    roomStayed: 'Aninag Sunset Master Villa',
    title: 'The best sunset and warmest hospitality we’ve ever experienced!',
    comment: 'Alon Aninag is everything we hoped for and more. Waking up right on Poblacion beach with that gentle sea breeze and the wood & white aesthetics was pure therapy. The sunset deck with their Don Papa cocktail and acoustic bonfire night made our anniversary truly unforgettable. Sulit na sulit!',
    likes: 38,
    verifiedStay: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-2',
    author: 'Jian Carlo & the Barkada',
    userType: 'Barkada / Group',
    origin: 'Bacolod City',
    rating: 5,
    date: 'August 18, 2026',
    roomStayed: 'Barkada Glow Loft',
    title: 'Unbelievable vibe, super fast Wi-Fi, and amazing inasal!',
    comment: 'We booked the Barkada Loft for 4 friends. The room was super spacious, the Wi-Fi was blazing fast for all our reels and TikToks, and the staff helped us arrange our boat to Tinagong Dagat in 5 minutes flat. Also, do not miss the grilled blue marlin and chicken inasal for dinner!',
    likes: 29,
    verifiedStay: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-3',
    author: 'David Harrison',
    userType: 'Solo Traveler',
    origin: 'Sydney, Australia',
    rating: 5,
    date: 'August 10, 2026',
    roomStayed: 'Alon Oceanfront Cozy Suite',
    title: 'Hidden gem in Southern Negros. 10/10 diving & peace.',
    comment: 'I spent 4 nights here diving Campomanes Bay. The resort is intimate, peaceful, and beautifully designed. No massive crowds like Boracay or El Nido, just genuine Filipino warmth, stunning sunset views, and great espresso in the morning. Will definitely return next year.',
    likes: 19,
    verifiedStay: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'soc-1',
    userName: 'Kaye Bautista',
    userHandle: '@kaye_travels',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    image: sunsetDeckImg,
    caption: 'Golden hour at @alon.aninag.sipalay hit differently today 🌅 Where waves rest and souls glow indeed! #GlowAtAlon #SipalayCity #NegrosOccidental',
    location: 'Sunset Deck • Poblacion Beach',
    likes: 428,
    timestamp: '2 hours ago',
    tag: '#GlowAtAlon'
  },
  {
    id: 'soc-2',
    userName: 'Miguel & Bea',
    userHandle: '@wanderingtwosome',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    image: heroImg,
    caption: 'Direct beachfront walkout from our room! Waking up to the morning tide in Sipalay is pure medicine for the tired soul 🌊☕️ #AlonAninagResort #StayWithUs',
    location: 'Aninag Master Villa',
    likes: 612,
    timestamp: '5 hours ago',
    tag: '#SoulGlow'
  },
  {
    id: 'soc-3',
    userName: 'Barkada Trippers PH',
    userHandle: '@barkadatrippers',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    image: bonfireImg,
    caption: 'Acoustic jams + beach bonfire + marshmallows = barkada core memory unlocked 🔥🏖️ Shoutout to the amazing staff at Alon & Aninag! #RestGlowRepeat',
    location: 'Beachfront Bonfire Pit',
    likes: 384,
    timestamp: '1 day ago',
    tag: '#BarkadaTrip'
  },
  {
    id: 'soc-4',
    userName: 'Chef Nadine Rivera',
    userHandle: '@nadine_eats',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    image: diningImg,
    caption: 'That grilled Sipalay blue marlin and native chicken inasal with batwan sinigang broth. Authentic Negrense goodness right on the beach 🍽️✨ #FoodieNegros',
    location: 'Alon Beachfront Dining',
    likes: 519,
    timestamp: '2 days ago',
    tag: '#NegrenseFlavors'
  }
];

export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    name: 'Sand',
    minStays: 0,
    pointsMultiplier: 1.0,
    color: '#D4A373',
    perks: ['Earn 1 Glow Point per ₱100 spent', 'Complimentary welcome fresh coconut drink', 'Free high-speed Starlink Wi-Fi access', 'Member-only flash secret promo codes']
  },
  {
    name: 'Wave',
    minStays: 2,
    pointsMultiplier: 1.25,
    color: '#4A90E2',
    perks: ['All Sand perks', 'Early check-in from 12:00 PM (subject to availability)', 'Complimentary sunset cocktail on the deck for 2', '10% discount on island hopping tours']
  },
  {
    name: 'Sunbeam',
    minStays: 4,
    pointsMultiplier: 1.5,
    color: '#E67E22',
    perks: ['All Wave perks', 'Guaranteed late check-out until 2:00 PM', 'Free room upgrade on birthday month', '15% discount on in-room massage & dining', 'Dedicated VIP concierge channel']
  },
  {
    name: 'Golden Glow',
    minStays: 7,
    pointsMultiplier: 2.0,
    color: '#E4A853',
    perks: ['All Sunbeam perks', 'Free 1-night stay voucher upon reaching tier', 'Complimentary private roundtrip shuttle van', 'Personalized chef sunset dinner experience', 'Complimentary bottle of Don Papa Rum reserve']
  }
];

export const CURRENCY_RATES: Record<string, { symbol: string; rateToPHP: number; name: string }> = {
  PHP: { symbol: '₱', rateToPHP: 1, name: 'Philippine Peso' },
  USD: { symbol: '$', rateToPHP: 0.0175, name: 'US Dollar' },
  EUR: { symbol: '€', rateToPHP: 0.0162, name: 'Euro' },
  JPY: { symbol: '¥', rateToPHP: 2.65, name: 'Japanese Yen' },
  KRW: { symbol: '₩', rateToPHP: 24.2, name: 'Korean Won' },
  AUD: { symbol: 'A$', rateToPHP: 0.0268, name: 'Australian Dollar' },
  SGD: { symbol: 'S$', rateToPHP: 0.0235, name: 'Singapore Dollar' }
};

export const FAQ_DATA = [
  {
    question: 'Where exactly is Alon Aninag located in Sipalay?',
    answer: 'We are situated directly on the shoreline of Poblacion Beach, Sipalay City, Negros Occidental. We are right next to the town’s scenic beachfront strip, just 2 minutes from Poblacion Baywalk and within short walking distance to local cafes and tricycle terminals.'
  },
  {
    question: 'How do I get to Sipalay from Bacolod or Dumaguete?',
    answer: 'From Bacolod City (Bacolod-Silay Airport), it is a 3.5 to 4-hour scenic drive south via Ceres Liner air-conditioned bus or private resort van. From Dumaguete City, it takes approximately 3.5 hours via Mabinay/Kabankalan or via the southern coastal highway. We offer door-to-door private airport shuttle transfers.'
  },
  {
    question: 'What are the check-in and check-out times?',
    answer: 'Standard check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in and late check-out can be requested upon booking and are prioritized for Glow Club members.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept GCash, Maya (PayMaya), Major Credit & Debit Cards (Visa, Mastercard, JCB, American Express), Online Bank Transfers (BDO, BPI, UnionBank), and Cash at the front desk. A 30% downpayment deposit is required to confirm online reservations.'
  },
  {
    question: 'Is there reliable Wi-Fi and mobile signal at the resort?',
    answer: 'Yes! We have high-speed Starlink Satellite Internet throughout all 12 rooms, the sunset deck, and the beachfront dining area with speeds averaging 150+ Mbps. Mobile signal for Globe, Smart, and DITO is strong along Poblacion Beach.'
  },
  {
    question: 'Are walk-ins accepted?',
    answer: 'Yes, walk-in guests are always warmly welcomed at our front desk! However, because we only have 12 intimate rooms, we strongly recommend reserving in advance, especially for weekend getaways and peak holiday seasons.'
  }
];

export const TRANSLATION_PHRASES = [
  { english: 'Good morning', hiligaynon: 'Maayong aga', tagalog: 'Magandang umaga', cebuano: 'Maayong buntag', context: 'Morning greeting' },
  { english: 'Good evening', hiligaynon: 'Maayong gab-i', tagalog: 'Magandang gabi', cebuano: 'Maayong gabii', context: 'Evening greeting' },
  { english: 'Thank you very much', hiligaynon: 'Madamo nga salamat', tagalog: 'Maraming salamat', cebuano: 'Daghang salamat', context: 'Polite appreciation' },
  { english: 'How much is this?', hiligaynon: 'Tag-pila ini?', tagalog: 'Magkano ito?', cebuano: 'Tagpila kini?', context: 'Asking price' },
  { english: 'Where is the beach?', hiligaynon: 'Diin ang baybayon?', tagalog: 'Nasaan ang dalampasigan?', cebuano: 'Asa ang baybayon?', context: 'Directions' },
  { english: 'Delicious food!', hiligaynon: 'Namit gid ang pagkaon!', tagalog: 'Napakasarap ng pagkain!', cebuano: 'Lami kaayo ang pagkaon!', context: 'Dining compliment' },
  { english: 'Let us take a photo', hiligaynon: 'Mapalitrato kita', tagalog: 'Magpa-picture tayo', cebuano: 'Magpa-picture ta', context: 'Social & photos' },
  { english: 'Is this boat available for tour?', hiligaynon: 'Available ba ini nga sakayan para sa tour?', tagalog: 'Available ba ang bangkang ito para sa tour?', cebuano: 'Available ba kining sakayan para sa tour?', context: 'Island hopping' }
];

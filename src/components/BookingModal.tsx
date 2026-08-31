import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { ROOMS_DATA, BOOKING_ADDONS } from '../data/resortData';
import { Room, BookingAddon, Reservation } from '../types';
import { 
  X, 
  Calendar, 
  Users, 
  Check, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  QrCode, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Info,
  ChevronRight,
  ArrowLeft,
  DollarSign,
  Smartphone,
  Receipt
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    activeBookingModalRoomId,
    closeBookingModal,
    createBooking,
    formatPrice,
    currency,
    currentUser,
    lastConfirmedBooking,
    setLastConfirmedBooking
  } = useResort();

  // Selected Room
  const selectedRoom: Room = ROOMS_DATA.find(r => r.id === activeBookingModalRoomId) || ROOMS_DATA[0];

  // Wizard Step: 1 = Dates & Addons, 2 = Guest Info & Special Requests, 3 = Payment Gateway, 4 = Confirmation & E-Voucher
  const [step, setStep] = useState<number>(lastConfirmedBooking ? 4 : 1);

  // Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 2);
  const nextDayStr = nextDay.toISOString().split('T')[0];

  const [checkInDate, setCheckInDate] = useState<string>(todayStr);
  const [checkOutDate, setCheckOutDate] = useState<string>(nextDayStr);
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<BookingAddon[]>([]);

  // Guest Details
  const [firstName, setFirstName] = useState<string>(currentUser?.firstName || '');
  const [lastName, setLastName] = useState<string>(currentUser?.lastName || '');
  const [email, setEmail] = useState<string>(currentUser?.email || '');
  const [phone, setPhone] = useState<string>(currentUser?.phone || '+63 917 ');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [dietaryRequirements, setDietaryRequirements] = useState<string>('');
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState<string>('2:00 PM - 4:00 PM');
  
  // Promo code
  const [promoCodeInput, setPromoCodeInput] = useState<string>('SOULSUNSET');
  const [appliedPromo, setAppliedPromo] = useState<string>('SOULSUNSET');
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(10);
  const [promoMessage, setPromoMessage] = useState<string>('10% Sunset Glow Discount applied!');

  // Payment method & Deposit choice
  const [depositOption, setDepositOption] = useState<'30_percent' | 'full'>('30_percent');
  const [paymentMethod, setPaymentMethod] = useState<'GCash' | 'Maya' | 'Card' | 'Bank Transfer' | 'Cash at Check-In'>('GCash');
  const [gcashPhone, setGcashPhone] = useState<string>('0917 582 2566');
  const [cardNumber, setCardNumber] = useState<string>('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState<string>('08/28');
  const [cardCvv, setCardCvv] = useState<string>('782');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Completed booking reference state
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(lastConfirmedBooking);

  useEffect(() => {
    if (lastConfirmedBooking) {
      setConfirmedReservation(lastConfirmedBooking);
      setStep(4);
    } else if (activeBookingModalRoomId) {
      setStep(1);
    }
  }, [activeBookingModalRoomId, lastConfirmedBooking]);

  // Calculate nights
  const calculateNights = (): number => {
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  };

  const nights = calculateNights();
  const roomBaseTotalPHP = selectedRoom.pricePHP * nights * roomCount;
  const addonsTotalPHP = selectedAddons.reduce((sum, a) => sum + a.pricePHP, 0);
  const grossTotalPHP = roomBaseTotalPHP + addonsTotalPHP;
  const discountAmountPHP = Math.round((grossTotalPHP * promoDiscountPercent) / 100);
  const netTotalPHP = grossTotalPHP - discountAmountPHP;
  const depositRequiredPHP = depositOption === '30_percent' ? Math.round(netTotalPHP * 0.3) : netTotalPHP;
  const balanceDuePHP = netTotalPHP - depositRequiredPHP;

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'SOULSUNSET' || code === 'GLOWATALON') {
      setAppliedPromo(code);
      setPromoDiscountPercent(10);
      setPromoMessage('✨ 10% Welcome Promo Code Applied!');
    } else if (code === 'BARKADA2026' || code === 'GLOWBARKADA') {
      setAppliedPromo(code);
      setPromoDiscountPercent(12);
      setPromoMessage('🎉 12% Barkada Group Discount Applied!');
    } else if (code === 'SIPALAY5') {
      setAppliedPromo(code);
      setPromoDiscountPercent(5);
      setPromoMessage('🌴 5% Sipalay Local Explorer Promo Applied!');
    } else {
      setAppliedPromo('');
      setPromoDiscountPercent(0);
      setPromoMessage('❌ Invalid Promo Code. Try "SOULSUNSET" or "GLOWBARKADA"');
    }
  };

  const toggleAddon = (addon: BookingAddon) => {
    setSelectedAddons(prev => 
      prev.some(a => a.id === addon.id) 
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const handleConfirmReservation = async () => {
    if (!firstName || !lastName || !email || !phone) {
      alert('Please fill out all required guest fields.');
      return;
    }

    setIsProcessing(true);

    setTimeout(async () => {
      const res = await createBooking({
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        guestName: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
        phone,
        checkInDate,
        checkOutDate,
        nights,
        adults,
        children: childrenCount,
        roomCount,
        selectedAddons,
        specialRequests,
        dietaryRequirements,
        estimatedArrivalTime,
        promoCodeApplied: appliedPromo,
        discountAmountPHP,
        totalAmountPHP: netTotalPHP,
        depositPaidPHP: depositRequiredPHP,
        balanceDuePHP,
        paymentMethod,
        paymentStatus: depositOption === 'full' ? 'Fully Paid' : 'Paid Deposit',
        bookingStatus: 'Confirmed'
      });

      setConfirmedReservation(res);
      setIsProcessing(false);
      setStep(4);
    }, 1200);
  };

  const handlePrintOrDownload = () => {
    window.print();
  };

  if (!activeBookingModalRoomId && !lastConfirmedBooking) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#E0D5C1] shadow-2xl relative flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#FAF7F2] border-b border-[#E8DFC8] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E4A853] text-[#2C241D] flex items-center justify-center font-bold text-lg shadow-xs">
              🌊
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2C241D]">
                {step === 4 ? 'Booking Confirmation & Voucher' : 'Reserve Your Stay at Alon & Aninag'}
              </h3>
              <p className="text-xs text-[#7A6A58]">
                {step === 4 ? 'Reservation successfully confirmed and secured' : `${selectedRoom.name} • Poblacion Beach, Sipalay City`}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setLastConfirmedBooking(null);
              closeBookingModal();
            }}
            className="p-2 rounded-full bg-white hover:bg-[#EDE4D3] text-[#4A3E31] transition cursor-pointer border border-[#E0D5C1]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Progress Steps Indicator */}
        {step < 4 && (
          <div className="px-6 py-3 bg-[#F4EDE0] border-b border-[#E5DAC4] flex items-center justify-between text-xs font-semibold text-[#6B5A48] overflow-x-auto">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#C88A32] font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#C88A32] text-white' : 'bg-[#DDD0B9] text-[#2C241D]'}`}>1</span>
              <span>Dates & Add-ons</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#A08E7B]" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#C88A32] font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#C88A32] text-white' : 'bg-[#DDD0B9] text-[#2C241D]'}`}>2</span>
              <span>Guest Details</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#A08E7B]" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#C88A32] font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#C88A32] text-white' : 'bg-[#DDD0B9] text-[#2C241D]'}`}>3</span>
              <span>Secure Payment</span>
            </div>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="p-6 sm:p-8 flex-1">
          {/* STEP 1: Dates, Guests, Room & Addons */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Room Card Preview */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFC8]">
                <img
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.name}
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-36 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#C88A32] uppercase">{selectedRoom.category}</span>
                    <span className="text-xs font-bold text-[#2C241D]">★ {selectedRoom.rating.toFixed(2)}</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#2C241D]">{selectedRoom.name}</h4>
                  <p className="text-xs text-[#6B5A48]">{selectedRoom.bedType} • {selectedRoom.view}</p>
                </div>
                <div className="text-right sm:border-l sm:border-[#E8DFC8] sm:pl-4">
                  <span className="text-[10px] text-[#8C7B68] block">Rate per night</span>
                  <span className="font-serif text-xl font-bold text-[#2C241D]">
                    {formatPrice(selectedRoom.pricePHP)}
                  </span>
                </div>
              </div>

              {/* Booking Calendar Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#6B5A48] mb-1 uppercase">Check-In</label>
                  <input
                    type="date"
                    min={todayStr}
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full p-2.5 text-xs font-semibold bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B5A48] mb-1 uppercase">Check-Out</label>
                  <input
                    type="date"
                    min={checkInDate || todayStr}
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full p-2.5 text-xs font-semibold bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B5A48] mb-1 uppercase">Adults (12+ yrs)</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full p-2.5 text-xs font-semibold bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D]"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Adults</option>
                    <option value={5}>5 Adults (Barkada)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B5A48] mb-1 uppercase">Children (0-11 yrs)</label>
                  <select
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="w-full p-2.5 text-xs font-semibold bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D]"
                  >
                    <option value={0}>0 Children</option>
                    <option value={1}>1 Child (Free stay)</option>
                    <option value={2}>2 Children</option>
                  </select>
                </div>
              </div>

              {/* Add-on Experiences & Services Selection */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7B68] mb-3">
                  Enhance Your Stay with Authentic Sipalay Experiences
                </h4>
                <div className="space-y-2.5">
                  {BOOKING_ADDONS.map((addon) => {
                    const isChecked = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                          isChecked 
                            ? 'bg-[#FBF7F0] border-[#C88A32] shadow-xs' 
                            : 'bg-white border-[#E5DAC4] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 border ${
                            isChecked ? 'bg-[#C88A32] border-[#C88A32] text-white' : 'border-[#A08E7B] bg-white'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#2C241D]">{addon.name}</p>
                            <p className="text-[11px] text-[#6B5A48] leading-tight">{addon.description}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#2C241D] whitespace-nowrap">
                          +{formatPrice(addon.pricePHP)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Promo Code Box */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8]">
                <label className="block text-xs font-bold text-[#6B5A48] mb-1.5 uppercase">
                  Have a Promo Code or Glow Member Voucher?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="e.g. SOULSUNSET, GLOWBARKADA"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-[#DDD0B9] rounded-xl text-[#2C241D] uppercase font-bold"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-[#2C241D] hover:bg-[#1E1712] text-white text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    Apply Code
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-xs mt-2 font-medium ${appliedPromo ? 'text-[#2A9D8F]' : 'text-[#E76F51]'}`}>
                    {promoMessage}
                  </p>
                )}
              </div>

              {/* Summary Bar & Step 1 CTA */}
              <div className="pt-4 border-t border-[#EFE8DC] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#8C7B68] block">Estimated Total for {nights} Night{nights > 1 ? 's' : ''}</span>
                  <span className="font-serif text-2xl font-bold text-[#2C241D]">
                    {formatPrice(netTotalPHP)}
                  </span>
                  {appliedPromo && (
                    <span className="text-xs text-[#2A9D8F] ml-2 font-semibold">
                      (Saved {formatPrice(discountAmountPHP)})
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-[#C88A32] hover:bg-[#B87A24] text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  <span>Continue to Guest Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Guest Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#6B5A48] mb-1 uppercase">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Maria"
                    className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B5A48] mb-1 uppercase">Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Santos"
                    className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B5A48] mb-1 uppercase">Email Address (For Automated E-Voucher) *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. maria.santos@gmail.com"
                    className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B5A48] mb-1 uppercase">Mobile Number (GCash / SMS Alerts) *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+63 917 123 4567"
                    className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#6B5A48] mb-1 uppercase">Estimated Arrival Time at Sipalay</label>
                  <select
                    value={estimatedArrivalTime}
                    onChange={(e) => setEstimatedArrivalTime(e.target.value)}
                    className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D]"
                  >
                    <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM (Early Check-In Request)</option>
                    <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM (Standard Arrival)</option>
                    <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM (Sunset Arrival)</option>
                    <option value="After 6:00 PM">After 6:00 PM (Late Night Arrival)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B5A48] mb-1 uppercase">Dietary Preferences or Allergies</label>
                  <input
                    type="text"
                    value={dietaryRequirements}
                    onChange={(e) => setDietaryRequirements(e.target.value)}
                    placeholder="e.g. Seafood lover, Vegetarian, Halal, No shellfish"
                    className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6B5A48] mb-1 uppercase">
                  Special Requests (Anniversary, Birthday, Quiet Room, Flower Bouquet, Guitar Setup)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Let us know how our team can make your stay extra memorable..."
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D]"
                />
              </div>

              <div className="pt-4 border-t border-[#EFE8DC] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-[#DDD0B9] text-xs font-semibold text-[#5C4E3F] hover:bg-[#FAF7F2] transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Dates</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!firstName || !lastName || !email || !phone) {
                      alert('Please fill out all required guest fields (First Name, Last Name, Email, Phone).');
                      return;
                    }
                    setStep(3);
                  }}
                  className="px-6 py-3 rounded-xl bg-[#C88A32] hover:bg-[#B87A24] text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  <span>Proceed to Payment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Secure Payment Gateway */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Deposit Selection Choice */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7B68] mb-3">
                  Select Deposit / Payment Option
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setDepositOption('30_percent')}
                    className={`p-4 rounded-2xl border transition cursor-pointer ${
                      depositOption === '30_percent' 
                        ? 'bg-[#FBF7F0] border-[#C88A32] ring-2 ring-[#C88A32]/20' 
                        : 'bg-white border-[#E5DAC4] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#2C241D]">30% Downpayment Deposit</span>
                      <span className="font-serif text-base font-bold text-[#C88A32]">{formatPrice(Math.round(netTotalPHP * 0.3))}</span>
                    </div>
                    <p className="text-[11px] text-[#6B5A48]">
                      Secure your room now. Settle the remaining {formatPrice(netTotalPHP - Math.round(netTotalPHP * 0.3))} upon check-in at Sipalay.
                    </p>
                  </div>

                  <div
                    onClick={() => setDepositOption('full')}
                    className={`p-4 rounded-2xl border transition cursor-pointer ${
                      depositOption === 'full' 
                        ? 'bg-[#FBF7F0] border-[#C88A32] ring-2 ring-[#C88A32]/20' 
                        : 'bg-white border-[#E5DAC4] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#2C241D]">Full Prepayment (100%)</span>
                      <span className="font-serif text-base font-bold text-[#2C241D]">{formatPrice(netTotalPHP)}</span>
                    </div>
                    <p className="text-[11px] text-[#6B5A48]">
                      Hassle-free express check-in. Everything settled in advance with instant digital voucher.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Method Channels */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7B68] mb-3">
                  Select Payment Gateway
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'GCash', label: 'GCash', icon: '📱', color: '#007DFE' },
                    { id: 'Maya', label: 'Maya / PayMaya', icon: '💳', color: '#1B9A59' },
                    { id: 'Card', label: 'Credit / Debit Card', icon: '💳', color: '#2C241D' },
                    { id: 'Bank Transfer', label: 'BDO / BPI Bank', icon: '🏦', color: '#B87A24' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`p-3 rounded-2xl border text-xs font-bold transition cursor-pointer flex flex-col items-center gap-1 ${
                        paymentMethod === method.id 
                          ? 'bg-[#2C241D] text-white border-[#2C241D] shadow-md' 
                          : 'bg-[#FAF7F2] text-[#4A3E31] border-[#DDD0B9] hover:bg-[#F3EDE2]'
                      }`}
                    >
                      <span className="text-base">{method.icon}</span>
                      <span>{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Gateway Specific Interface */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8]">
                {paymentMethod === 'GCash' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#007DFE] flex items-center gap-1.5">
                        <QrCode className="w-4 h-4" /> GCash Official Merchant QR & Express Pay
                      </span>
                      <span className="text-xs font-bold text-[#2C241D]">
                        Amount to Pay: {formatPrice(depositRequiredPHP)}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-[#E2D5BE]">
                      <div className="w-28 h-28 bg-[#007DFE]/10 rounded-xl flex flex-col items-center justify-center p-2 border border-[#007DFE]/30 text-center">
                        <QrCode className="w-16 h-16 text-[#007DFE]" />
                        <span className="text-[9px] font-bold text-[#007DFE] mt-1">Scan via GCash App</span>
                      </div>
                      <div className="flex-1 text-xs space-y-1.5">
                        <p className="font-bold text-[#2C241D]">Alon Aninag Boutique Beach Resort Corp.</p>
                        <p className="text-[#6B5A48]">GCash Verified Number: <strong>0917-582-2566</strong></p>
                        <p className="text-[11px] text-[#8C7B68]">Or enter your GCash mobile number below for instant one-time PIN prompt:</p>
                        <input
                          type="tel"
                          value={gcashPhone}
                          onChange={(e) => setGcashPhone(e.target.value)}
                          className="w-full p-2 bg-[#FAF7F2] border border-[#DDD0B9] rounded-lg text-xs font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Maya' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1B9A59]">Maya Checkout & QR Ph Verified</span>
                      <span className="text-xs font-bold text-[#2C241D]">Pay: {formatPrice(depositRequiredPHP)}</span>
                    </div>
                    <p className="text-xs text-[#6B5A48]">
                      Supports Maya Wallet, QR Ph, GrabPay, and ShopeePay transfers. Deposit will be confirmed in real-time.
                    </p>
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2C241D] flex items-center gap-1">
                        <CreditCard className="w-4 h-4 text-[#C88A32]" /> 256-Bit Encrypted Card Payment
                      </span>
                      <span className="text-xs font-bold text-[#2C241D]">Pay: {formatPrice(depositRequiredPHP)}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-[#8C7B68] uppercase">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full p-2 bg-white border border-[#DDD0B9] rounded-lg text-xs font-mono font-bold"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C7B68] uppercase">Expiry</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full p-2 bg-white border border-[#DDD0B9] rounded-lg text-xs font-mono font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#8C7B68] uppercase">CVV</label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full p-2 bg-white border border-[#DDD0B9] rounded-lg text-xs font-mono font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Bank Transfer' && (
                  <div className="space-y-2 text-xs text-[#2C241D]">
                    <p className="font-bold">Official Resort Accounts:</p>
                    <div className="p-3 bg-white rounded-xl border border-[#E2D5BE] space-y-1">
                      <p>🏦 <strong>BDO Sipalay:</strong> 0081-9231-4491 (Alon Aninag Resort Corp)</p>
                      <p>🏦 <strong>BPI Bacolod Main:</strong> 4219-0821-33 (Alon Aninag Resort Corp)</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown Final Review */}
              <div className="p-4 bg-white rounded-2xl border border-[#E2D5BE] space-y-1.5 text-xs text-[#5C4E3F]">
                <div className="flex justify-between">
                  <span>{selectedRoom.name} ({nights} nights × {formatPrice(selectedRoom.pricePHP)}):</span>
                  <span className="font-semibold text-[#2C241D]">{formatPrice(roomBaseTotalPHP)}</span>
                </div>
                {addonsTotalPHP > 0 && (
                  <div className="flex justify-between">
                    <span>Selected Add-ons ({selectedAddons.length}):</span>
                    <span className="font-semibold text-[#2C241D]">+{formatPrice(addonsTotalPHP)}</span>
                  </div>
                )}
                {discountAmountPHP > 0 && (
                  <div className="flex justify-between text-[#2A9D8F] font-semibold">
                    <span>Promo Discount ({appliedPromo}):</span>
                    <span>-{formatPrice(discountAmountPHP)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-[#EFE8DC] font-bold text-sm text-[#2C241D]">
                  <span>Total Amount:</span>
                  <span>{formatPrice(netTotalPHP)}</span>
                </div>
                <div className="flex justify-between font-bold text-[#C88A32] text-xs">
                  <span>Amount Due Now ({depositOption === '30_percent' ? '30% Deposit' : 'Full Payment'}):</span>
                  <span>{formatPrice(depositRequiredPHP)}</span>
                </div>
                {depositOption === '30_percent' && (
                  <div className="flex justify-between text-[11px] text-[#8C7B68]">
                    <span>Balance Due Upon Check-In:</span>
                    <span>{formatPrice(balanceDuePHP)}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#EFE8DC] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-[#DDD0B9] text-xs font-semibold text-[#5C4E3F] hover:bg-[#FAF7F2] transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Details</span>
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleConfirmReservation}
                  className="px-6 py-3.5 rounded-xl bg-linear-to-r from-[#2A9D8F] to-[#264653] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-xl transition cursor-pointer flex items-center gap-2"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Securing Booking & Generating E-Voucher...</span>
                    </div>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confirm & Pay {formatPrice(depositRequiredPHP)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Automated E-Voucher & Booking Confirmation */}
          {step === 4 && confirmedReservation && (
            <div className="space-y-6 animate-fadeIn">
              {/* Green Success Banner */}
              <div className="bg-[#E7F6F2] border border-[#2A9D8F]/30 p-5 rounded-3xl text-center">
                <div className="w-12 h-12 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center mx-auto mb-2 shadow-md">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#2C241D]">
                  Reservation Confirmed & Secured!
                </h4>
                <p className="text-xs text-[#2A9D8F] font-bold mt-0.5">
                  Automated email confirmation voucher sent to: {confirmedReservation.email}
                </p>
                <div className="mt-3 inline-block bg-white px-4 py-1.5 rounded-full border border-[#2A9D8F]/30 text-xs font-mono font-bold text-[#2C241D]">
                  Reservation Reference: <span className="text-[#C88A32]">{confirmedReservation.referenceNumber}</span>
                </div>
              </div>

              {/* Digital E-Voucher Card */}
              <div className="bg-[#FAF7F2] border-2 border-dashed border-[#C88A32] rounded-3xl p-6 relative shadow-md">
                <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-[#E8DFC8] gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌊</span>
                    <div>
                      <h5 className="font-serif font-bold text-base text-[#2C241D]">Alon Aninag Boutique Beach Resort</h5>
                      <p className="text-[11px] text-[#7A6A58]">Poblacion Beach, Sipalay City, Negros Occidental</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-[#2A9D8F] bg-green-100 px-2 py-0.5 rounded">
                      {confirmedReservation.paymentStatus}
                    </span>
                    <p className="text-xs font-mono font-bold text-[#2C241D] mt-0.5">
                      REF: {confirmedReservation.referenceNumber}
                    </p>
                  </div>
                </div>

                {/* Voucher Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-[#8C7B68] uppercase font-bold block">Primary Guest</span>
                    <span className="font-bold text-[#2C241D]">{confirmedReservation.guestName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8C7B68] uppercase font-bold block">Room Reserved</span>
                    <span className="font-bold text-[#2C241D]">{confirmedReservation.roomName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8C7B68] uppercase font-bold block">Dates & Nights</span>
                    <span className="font-bold text-[#2C241D]">{confirmedReservation.checkInDate} to {confirmedReservation.checkOutDate} ({confirmedReservation.nights}n)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8C7B68] uppercase font-bold block">Guests</span>
                    <span className="font-bold text-[#2C241D]">{confirmedReservation.adults} Adults{confirmedReservation.children > 0 ? `, ${confirmedReservation.children} Child` : ''}</span>
                  </div>
                </div>

                {/* QR Code & Payment Breakdown */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#E8DFC8] bg-white p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-[#2C241D] rounded-xl flex items-center justify-center text-white">
                      <QrCode className="w-12 h-12" />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-[#2C241D]">Contactless Fast Check-in QR</p>
                      <p className="text-[11px] text-[#7A6A58]">Present this voucher or QR at Poblacion Beach front desk.</p>
                      <p className="text-[10px] text-[#C88A32] font-semibold">Earned +{Math.round(confirmedReservation.totalAmountPHP / 100)} Glow Club Points!</p>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <p className="text-[#6B5A48]">Deposit Paid: <strong>{formatPrice(confirmedReservation.depositPaidPHP)}</strong> ({confirmedReservation.paymentMethod})</p>
                    <p className="text-[#2C241D] font-bold">Remaining Balance Due: <strong>{formatPrice(confirmedReservation.balanceDuePHP)}</strong></p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={handlePrintOrDownload}
                  className="px-5 py-2.5 rounded-xl border border-[#DDD0B9] text-xs font-bold text-[#2C241D] hover:bg-[#FAF7F2] transition flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#C88A32]" />
                  <span>Download / Print E-Voucher</span>
                </button>

                <button
                  onClick={() => {
                    setLastConfirmedBooking(null);
                    closeBookingModal();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#2C241D] hover:bg-[#1E1712] text-white text-xs font-bold transition shadow-md cursor-pointer"
                >
                  Done & Return to Resort Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

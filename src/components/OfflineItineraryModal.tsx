import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { ATTRACTONS_DATA, RESORT_INFO, ROOMS_DATA } from '../data/resortData';
import { 
  WifiOff, 
  Download, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Check, 
  FileText, 
  Compass, 
  X, 
  AlertCircle,
  QrCode,
  Calendar
} from 'lucide-react';

export const OfflineItineraryModal: React.FC = () => {
  const { 
    isOfflineModalOpen, 
    closeOfflineModal, 
    reservations, 
    savedAttractionIds,
    formatPrice,
    isOfflineMode,
    toggleOfflineMode,
    addNotification
  } = useResort();

  const [activeTab, setActiveTab] = useState<'vouchers' | 'attractions' | 'directions' | 'emergency'>('vouchers');
  const [isSavedLocally, setIsSavedLocally] = useState<boolean>(true);

  if (!isOfflineModalOpen) return null;

  const savedAttractions = ATTRACTONS_DATA.filter(a => savedAttractionIds.includes(a.id));

  const emergencyContacts = [
    { name: 'Alon Aninag Front Desk / Reception', phone: '+63 917 582 2566', address: 'Poblacion Beach (Next to Jazz Inn), Sipalay' },
    { name: 'Sipalay City Tourism Office', phone: '+63 920 945 8821', address: 'City Hall Complex, Sipalay City' },
    { name: 'Philippine Coast Guard Sipalay Sub-Station', phone: '+63 917 724 1982', address: 'Barangay 1, Sipalay Wharf' },
    { name: 'Sipalay City Health & Emergency Medical Unit', phone: '+63 34 473 0021', address: 'National Highway, Sipalay' },
    { name: 'Sipalay Tourist Police Station', phone: '+63 998 598 6231', address: 'Poblacion, Sipalay City' },
    { name: 'Poblacion Tricycle Drivers Association (TODAC)', phone: '+63 945 221 8832', address: 'Sipalay Public Market Terminal' }
  ];

  const handleDownloadOfflineBundle = () => {
    try {
      const offlineBundle = {
        resort: RESORT_INFO,
        reservations,
        savedAttractions,
        emergencyContacts,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('alon_aninag_offline_bundle', JSON.stringify(offlineBundle));
      setIsSavedLocally(true);
      addNotification('Offline Ready', 'All booking vouchers, itinerary & offline guides saved to your device cache!', 'booking');
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#E0D5C1] shadow-2xl relative flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#FAF7F2] border-b border-[#E8DFC8] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#508991] text-white flex items-center justify-center font-bold">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2C241D]">
                Offline Travel Itinerary & Emergency Guide
              </h3>
              <p className="text-xs text-[#7A6A58]">
                Accessible even in low-signal Sipalay coves and island hopping tours
              </p>
            </div>
          </div>

          <button
            onClick={closeOfflineModal}
            className="p-2 rounded-full bg-white hover:bg-[#EDE4D3] text-[#4A3E31] transition cursor-pointer border border-[#E0D5C1]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offline Simulation Banner */}
        <div className="px-6 py-3 bg-[#E8EFF1] border-b border-[#D0DFE2] flex items-center justify-between text-xs text-[#2C241D]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2A9D8F] animate-ping" />
            <span className="font-semibold">
              {isOfflineMode ? '📵 Offline Mode Simulation ACTIVE (No internet required)' : '🟢 Online Mode (Cached offline data is synced)'}
            </span>
          </div>

          <button
            onClick={toggleOfflineMode}
            className="px-3 py-1 bg-white hover:bg-[#FAF7F2] text-[#2C241D] font-bold text-[11px] rounded-lg border border-[#DDD0B9] transition cursor-pointer"
          >
            {isOfflineMode ? 'Switch to Online' : 'Simulate Offline'}
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="p-4 bg-[#F5EFE6] border-b border-[#E5DAC4] flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'vouchers', label: `My Booking Vouchers (${reservations.length})`, icon: FileText },
            { id: 'attractions', label: `Saved Spots (${savedAttractions.length})`, icon: Compass },
            { id: 'directions', label: 'How to Get Here (Routes)', icon: MapPin },
            { id: 'emergency', label: 'Sipalay Emergency Hotlines', icon: Phone }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#2C241D] text-white shadow-xs'
                    : 'bg-white text-[#5C4E3F] hover:bg-[#FAF7F2] border border-[#DDD0B9]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 flex-1 space-y-6">
          {/* TAB 1: Booking Vouchers */}
          {activeTab === 'vouchers' && (
            <div className="space-y-4">
              {reservations.length === 0 ? (
                <div className="text-center py-8 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#DDD0B9]">
                  <FileText className="w-10 h-10 text-[#8C7B68] mx-auto mb-2 opacity-60" />
                  <h4 className="font-serif text-base font-bold text-[#2C241D]">No Reservations Saved Yet</h4>
                  <p className="text-xs text-[#6B5A48] mt-1">Book any room to store your instant offline voucher here.</p>
                </div>
              ) : (
                reservations.map((res) => (
                  <div
                    key={res.id}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DAC4] space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#E8DFC8] gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#C88A32]">Confirmed Reservation</span>
                        <h4 className="font-serif text-base font-bold text-[#2C241D]">{res.roomName}</h4>
                        <p className="text-xs text-[#7A6A58]">{res.guestName} • {res.nights} nights ({res.checkInDate} to {res.checkOutDate})</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-800 rounded">
                          {res.paymentStatus}
                        </span>
                        <p className="text-xs font-mono font-bold text-[#2C241D] mt-1">
                          REF: {res.referenceNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#4A3E31]">
                      <div>
                        <p>Total: <strong>{formatPrice(res.totalAmountPHP)}</strong></p>
                        <p>Deposit Paid: <strong>{formatPrice(res.depositPaidPHP)}</strong> ({res.paymentMethod})</p>
                      </div>
                      <div className="w-12 h-12 bg-[#2C241D] text-white rounded-lg flex items-center justify-center">
                        <QrCode className="w-9 h-9" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Saved Attractions */}
          {activeTab === 'attractions' && (
            <div className="space-y-4">
              {savedAttractions.length === 0 ? (
                <div className="text-center py-8 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#DDD0B9]">
                  <Compass className="w-10 h-10 text-[#8C7B68] mx-auto mb-2 opacity-60" />
                  <h4 className="font-serif text-base font-bold text-[#2C241D]">No Saved Destinations</h4>
                  <p className="text-xs text-[#6B5A48] mt-1">Click the bookmark icon on any attraction on our interactive map.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedAttractions.map((attr) => (
                    <div key={attr.id} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DAC4] flex gap-3">
                      <img
                        src={attr.image}
                        alt={attr.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 object-cover rounded-xl shrink-0"
                      />
                      <div className="flex-1 text-xs">
                        <span className="text-[9px] uppercase font-bold text-[#C88A32]">{attr.category}</span>
                        <h5 className="font-serif font-bold text-sm text-[#2C241D]">{attr.name}</h5>
                        <p className="text-[11px] text-[#7A6A58]">{attr.distanceKm} km from Resort • {attr.travelTime}</p>
                        <p className="text-[11px] text-[#2A9D8F] font-semibold mt-1">Best time: {attr.bestTimeToVisit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Directions & Getting to Sipalay */}
          {activeTab === 'directions' && (
            <div className="space-y-4 text-xs text-[#4A3E31]">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DAC4]">
                <h4 className="font-serif text-base font-bold text-[#2C241D] mb-2">
                  🚗 Route 1: From Bacolod City / Silay Airport (Approx. 4.5 hrs)
                </h4>
                <p className="leading-relaxed mb-2">
                  1. Board a Ceres Liner bus at Bacolod South Terminal bound for Hinoba-an via Sipalay.<br />
                  2. Alight at Sipalay City Public Market / Bus Terminal.<br />
                  3. Take a 5-minute tricycle ride to <strong>Poblacion Beach</strong> (Alon Aninag is right beside Jazz Inn).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DAC4]">
                <h4 className="font-serif text-base font-bold text-[#2C241D] mb-2">
                  ✈️ Route 2: From Dumaguete City / Airport (Approx. 4 hrs)
                </h4>
                <p className="leading-relaxed mb-2">
                  1. Board a Ceres bus from Dumaguete Terminal to Sipalay via Bayawan / Hinoba-an.<br />
                  2. Enjoy the scenic coastline drive of Southern Negros.<br />
                  3. Alight at Sipalay Plaza and ask for Alon Aninag on Poblacion Beach.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DAC4]">
                <h4 className="font-serif text-base font-bold text-[#2C241D] mb-2">
                  🚐 Resort Private Van Shuttle Service
                </h4>
                <p className="leading-relaxed">
                  We offer direct private air-conditioned airport transfers from Bacolod (₱4,500) and Dumaguete (₱4,200). Can be reserved during booking or via front desk.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: Emergency Contacts */}
          {activeTab === 'emergency' && (
            <div className="space-y-3">
              {emergencyContacts.map((contact, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DAC4] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <p className="font-bold text-[#2C241D]">{contact.name}</p>
                    <p className="text-[11px] text-[#7A6A58]">{contact.address}</p>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#DDD0B9] text-[#2C241D] font-mono font-bold hover:bg-[#EFE8DC] transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C88A32]" />
                    <span>{contact.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-[#FAF7F2] border-t border-[#E8DFC8] flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-20">
          <button
            onClick={handleDownloadOfflineBundle}
            className="px-5 py-2.5 rounded-xl bg-[#508991] hover:bg-[#3D6E75] text-white text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Cache / Refresh All Offline Data</span>
          </button>

          <button
            onClick={closeOfflineModal}
            className="px-6 py-2.5 rounded-xl bg-[#2C241D] hover:bg-[#1E1712] text-white text-xs font-bold transition cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

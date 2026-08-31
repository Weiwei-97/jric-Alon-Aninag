import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { LOYALTY_TIERS } from '../data/resortData';
import { 
  Sparkles, 
  Award, 
  Gift, 
  ShieldCheck, 
  Check, 
  Crown, 
  Zap, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const LoyaltyProgram: React.FC = () => {
  const { currentUser, openAuthModal, addNotification, formatPrice } = useResort();
  const [redeemedRewardId, setRedeemedRewardId] = useState<string | null>(null);

  const rewardsCatalog = [
    {
      id: 'rew-cocktail',
      title: 'Don Papa Sunset Rum Punch for 2',
      pointsRequired: 150,
      description: 'Enjoy two handcrafted signature cocktails at the sunset viewing deck.',
      category: 'Dining'
    },
    {
      id: 'rew-late-checkout',
      title: 'Guaranteed 2:00 PM Late Check-Out',
      pointsRequired: 200,
      description: 'Sleep in and soak up an extra morning of Poblacion sea breezes.',
      category: 'Stay'
    },
    {
      id: 'rew-hilot',
      title: '60-Minute Negrense Hilot Massage',
      pointsRequired: 450,
      description: 'Traditional healing coconut oil massage in your oceanfront room.',
      category: 'Wellness'
    },
    {
      id: 'rew-island-tour',
      title: 'Tinagong Dagat Private Boat Safari',
      pointsRequired: 800,
      description: 'Private 4-hour motorized banca tour exploring Sipalay islets and reefs.',
      category: 'Adventure'
    }
  ];

  const handleRedeem = (reward: typeof rewardsCatalog[0]) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    if (currentUser.loyaltyPoints < reward.pointsRequired) {
      addNotification(
        'Insufficient Glow Points',
        `You need ${reward.pointsRequired - currentUser.loyaltyPoints} more points to redeem ${reward.title}. Keep booking to earn!`,
        'alert'
      );
      return;
    }

    setRedeemedRewardId(reward.id);
    addNotification(
      '🎁 Reward Voucher Redeemed!',
      `You redeemed: ${reward.title}. Voucher code GLOW-${Math.floor(1000 + Math.random() * 9000)} generated!`,
      'booking'
    );

    setTimeout(() => {
      setRedeemedRewardId(null);
    }, 3000);
  };

  return (
    <section id="loyalty" className="py-20 bg-white border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADFCB] text-[#5C4E3F] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E4A853]" />
            Glow Club Loyalty Rewards
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] tracking-tight mb-4">
            Rest. Glow. Repeat. Earn Rewards on Every Stay.
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A48] leading-relaxed">
            Every booking and dining experience at Alon Aninag earns you Glow Points redeemable for island boat tours, sunset drinks, room upgrades, and complimentary stays.
          </p>
        </div>

        {/* Member Status Card */}
        <div className="mb-14 bg-linear-to-br from-[#2C241D] via-[#3B2F23] to-[#1E1712] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-[#524436] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E4A853] text-xs font-bold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5" />
              {currentUser ? `Current Tier: ${currentUser.loyaltyTier}` : 'Join Glow Club for Free'}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              {currentUser ? `Welcome back, ${currentUser.firstName}!` : 'Start Earning 1 Glow Point per ₱100 Spent'}
            </h3>
            <p className="text-xs sm:text-sm text-[#DDD0B9] leading-relaxed">
              {currentUser
                ? `You have ${currentUser.loyaltyPoints} Glow Points available in your account. You are only 160 points away from the Sunbeam Tier!`
                : 'Sign up in seconds to unlock instant welcome drinks, member-exclusive secret rates, and automatic point accumulation.'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center min-w-[220px]">
            <span className="text-[11px] uppercase tracking-wider text-white/70 font-bold block mb-1">
              Your Glow Balance
            </span>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#E4A853] mb-2">
              {currentUser ? currentUser.loyaltyPoints : '0'} <span className="text-sm font-sans font-normal text-white">pts</span>
            </div>
            {currentUser ? (
              <span className="text-xs text-[#2A9D8F] font-bold bg-[#2A9D8F]/20 px-3 py-1 rounded-full inline-block">
                ✓ Wave Status Active
              </span>
            ) : (
              <button
                onClick={() => openAuthModal('signup')}
                className="w-full py-2.5 px-4 bg-[#E4A853] hover:bg-[#D49843] text-[#2C241D] font-bold rounded-xl text-xs transition shadow-md cursor-pointer"
              >
                Sign Up & Claim 100 Pts
              </button>
            )}
          </div>
        </div>

        {/* Tier Roadmap Grid */}
        <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#2C241D] text-center mb-8">
          Membership Tiers & Exclusive Perks
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {LOYALTY_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                currentUser?.loyaltyTier === tier.name
                  ? 'bg-[#FAF7F2] border-[#C88A32] shadow-lg ring-2 ring-[#C88A32]/30'
                  : 'bg-white border-[#E5DAC4] hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${tier.color}20`, color: tier.color }}
                  >
                    {tier.name} Tier
                  </span>
                  <span className="text-xs text-[#8C7B68] font-semibold">
                    {tier.minStays === 0 ? '0 stays' : `${tier.minStays}+ stays`}
                  </span>
                </div>

                <div className="font-serif text-xl font-bold text-[#2C241D] mb-1">
                  {tier.pointsMultiplier}x Points Rate
                </div>
                <p className="text-[11px] text-[#6B5A48] mb-4">
                  Earn {tier.pointsMultiplier} point per ₱100 on all resort spending.
                </p>

                <ul className="space-y-2 mb-6">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#4A3E31]">
                      <Check className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {currentUser?.loyaltyTier === tier.name ? (
                <div className="py-2 text-center text-xs font-bold text-[#C88A32] bg-[#FAF7F2] rounded-xl border border-[#EDE4D3]">
                  Your Current Level
                </div>
              ) : (
                <div className="py-2 text-center text-xs text-[#8C7B68] bg-[#F5EFE6] rounded-xl">
                  {tier.minStays} Stays Required
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Redeemable Rewards Catalog */}
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#E5DAC4]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h4 className="font-serif text-2xl font-bold text-[#2C241D]">
                Redeem Your Glow Points
              </h4>
              <p className="text-xs sm:text-sm text-[#6B5A48]">
                Instant digital vouchers sent straight to your email.
              </p>
            </div>
            <span className="text-xs font-bold text-[#C88A32] bg-white px-3 py-1.5 rounded-xl border border-[#DDD0B9]">
              Instant Voucher Delivery
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {rewardsCatalog.map((rew) => (
              <div
                key={rew.id}
                className="bg-white rounded-2xl p-5 border border-[#E2D5BE] flex flex-col justify-between shadow-xs hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold text-[#8C7B68] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#EDE4D3]">
                      {rew.category}
                    </span>
                    <span className="text-xs font-bold text-[#C88A32]">
                      {rew.pointsRequired} Pts
                    </span>
                  </div>

                  <h5 className="font-serif text-sm font-bold text-[#2C241D] mb-1.5">
                    {rew.title}
                  </h5>

                  <p className="text-xs text-[#6B5A48] leading-relaxed mb-4">
                    {rew.description}
                  </p>
                </div>

                <button
                  onClick={() => handleRedeem(rew)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    redeemedRewardId === rew.id
                      ? 'bg-green-600 text-white'
                      : 'bg-[#2C241D] hover:bg-[#1E1712] text-white'
                  }`}
                >
                  {redeemedRewardId === rew.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Voucher Redeemed!</span>
                    </>
                  ) : (
                    <>
                      <Gift className="w-3.5 h-3.5 text-[#E4A853]" />
                      <span>Redeem Reward</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

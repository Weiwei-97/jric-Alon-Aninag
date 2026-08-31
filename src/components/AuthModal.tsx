import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  X, 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Check, 
  Crown,
  ShieldCheck
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, openAuthModal, loginUser, currentUser } = useResort();

  const [email, setEmail] = useState<string>('maria.santos@gmail.com');
  const [password, setPassword] = useState<string>('••••••••');
  const [firstName, setFirstName] = useState<string>('Maria');
  const [lastName, setLastName] = useState<string>('Santos');
  const [phone, setPhone] = useState<string>('+63 917 582 2566');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      phone,
      loyaltyPoints: 340,
      loyaltyTier: 'Wave',
      memberSince: '2025'
    });
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#E0D5C1] shadow-2xl relative">
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF7F2] text-[#4A3E31] hover:bg-[#EDE4D3] transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-full bg-[#E4A853] text-[#2C241D] flex items-center justify-center font-bold text-lg">
            👑
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#2C241D]">
              {authModalMode === 'login' ? 'Welcome Back to Alon' : 'Join the Glow Club'}
            </h3>
            <p className="text-xs text-[#7A6A58]">
              {authModalMode === 'login' ? 'Access your reservations & loyalty points' : 'Earn 100 bonus points upon registration'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 p-1 bg-[#FAF7F2] rounded-xl mb-5 text-xs font-bold text-[#6B5A48]">
          <button
            type="button"
            onClick={() => openAuthModal('login')}
            className={`py-2 rounded-lg transition ${authModalMode === 'login' ? 'bg-white text-[#2C241D] shadow-xs' : ''}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => openAuthModal('signup')}
            className={`py-2 rounded-lg transition ${authModalMode === 'signup' ? 'bg-white text-[#2C241D] shadow-xs' : ''}`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {authModalMode === 'signup' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#6B5A48] mb-1 uppercase">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-[#6B5A48] mb-1 uppercase">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-[#6B5A48] mb-1 uppercase">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-[#6B5A48] mb-1 uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium"
              required
            />
          </div>

          {authModalMode === 'signup' && (
            <div>
              <label className="block font-bold text-[#6B5A48] mb-1 uppercase">Mobile Number (For GCash / SMS)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#2C241D] hover:bg-[#1E1712] text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer mt-2"
          >
            {authModalMode === 'login' ? 'Sign In to Glow Account' : 'Sign Up & Collect 100 Glow Pts'}
          </button>
        </form>

        {/* Member Perk snippet */}
        <div className="mt-5 pt-4 border-t border-[#EFE8DC] text-[11px] text-[#6B5A48] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E4A853] shrink-0" />
          <span>Members enjoy 10% lower rates and free welcome sunset cocktail.</span>
        </div>
      </div>
    </div>
  );
};

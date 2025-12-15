import React, { useState } from 'react';
import { FXWidget } from '../components/FXWidget';
import { Button } from '../components/ui/Button';
import { Globe, ShoppingBag, Heart, ChevronRight, Briefcase, Users, ShieldCheck, MapPin } from 'lucide-react';
import { UserRole } from '../types';

interface LandingProps {
  onLogin: (role: UserRole) => void;
}

export const Landing: React.FC<LandingProps> = ({ onLogin }) => {
  const [isBusiness, setIsBusiness] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden transition-colors duration-1000">
      {/* Background Ambience */}
      <div className={`absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${isBusiness ? 'bg-purple-900/30' : 'bg-red-900/30'}`} />
      <div className={`absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none transition-colors duration-1000 ${isBusiness ? 'bg-sky-900/20' : 'bg-green-900/20'}`} />

      {/* Nav */}
      <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter text-white">Tokasi<span className={isBusiness ? "text-purple-400" : "text-red-500"}>.</span></div>
        <div className="flex gap-4">
          <Button variant="glass" size="sm" onClick={() => onLogin(isBusiness ? UserRole.BUSINESS : UserRole.CONSUMER)}>Log In</Button>
          <Button size="sm" onClick={() => onLogin(isBusiness ? UserRole.BUSINESS : UserRole.CONSUMER)}>Sign Up</Button>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-8 lg:pt-16 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          
          {/* Toggle */}
          <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <button 
              onClick={() => setIsBusiness(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isBusiness ? 'bg-white text-black shadow-lg' : 'text-neutral-400 hover:text-white'}`}
            >
              For Shoppers
            </button>
            <button 
              onClick={() => setIsBusiness(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isBusiness ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' : 'text-neutral-400 hover:text-white'}`}
            >
              For Vendors
            </button>
          </div>
          
          <div className="space-y-4">
             {isBusiness ? (
                <>
                  <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1] animate-fade-in">
                    Power your business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">Diaspora Commerce</span>.
                  </h1>
                  <p className="text-lg text-neutral-400 max-w-lg leading-relaxed animate-fade-in">
                    Create your storefront, accept payments directly in Naira, and let the Canadian diaspora drive sales to you.
                  </p>
                </>
             ) : (
                <>
                  <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1] animate-fade-in">
                    The bridge between <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">Canada</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-white">Nigeria</span>.
                  </h1>
                  <p className="text-lg text-neutral-400 max-w-lg leading-relaxed animate-fade-in">
                    Find vetted vendors in Lagos & Abuja. Pay securely with your Canadian Bank Account (CAD). Earn commissions referring friends.
                  </p>
                </>
             )}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="group" onClick={() => onLogin(isBusiness ? UserRole.BUSINESS : UserRole.CONSUMER)}>
              {isBusiness ? 'Launch Storefront' : 'Explore Vendors'} <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16}/>
            </Button>
            <Button variant="glass" size="lg" onClick={() => onLogin(isBusiness ? UserRole.BUSINESS : UserRole.CONSUMER)}>
              {isBusiness ? 'Vendor Tools' : 'Become an Affiliate'}
            </Button>
          </div>

          <div className="pt-8 flex gap-8 border-t border-white/5">
            {[
              { label: 'Active in', val: 'Canada & NG' },
              { label: 'Volume Processed', val: '$50M+' },
              { label: 'Affiliate Payouts', val: '$5M+' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-medium text-white">{stat.val}</div>
                <div className="text-xs uppercase tracking-wider text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <FXWidget />
          {/* Decorative elements behind widget */}
          <div className={`absolute -z-10 top-10 -right-10 w-full h-full border border-white/5 rounded-3xl backdrop-blur-sm -rotate-6 scale-95 transition-colors duration-500 ${isBusiness ? 'bg-purple-900/20' : 'bg-red-900/10'}`} />
        </div>
      </main>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-3 gap-6">
          {(isBusiness ? [
            { icon: ShieldCheck, title: "Verified Storefront", desc: "Get a professional page to showcase your services. Build trust with international clients instantly." },
            { icon: Users, title: "Affiliate Engine", desc: "Turn customers into marketers. Issue unique codes and pay commissions only on successful transactions." },
            { icon: Globe, title: "Receive Naira Instantly", desc: "We process the CAD payment and settle directly into your local Naira account via Paystack." }
          ] : [
            { icon: ShoppingBag, title: "Curated Marketplace", desc: "Discover the best photographers, caterers, and logistics companies in Nigeria, verified by Tokasi." },
            { icon: Heart, title: "Promote & Earn", desc: "Love a vendor? Share your unique referral code. When your friends pay them, you get paid in CAD." },
            { icon: MapPin, title: "Pay with Interac", desc: "Fund your wallet or pay vendors directly using Interac e-Transfer or Direct Deposit." }
          ]).map((f, i) => (
            <div key={i} className="glass-panel p-8 rounded-2xl border-t border-white/10 hover:bg-white/5 transition-colors group">
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 transition-colors text-white ${isBusiness ? 'group-hover:bg-purple-500/20 group-hover:text-purple-400' : 'group-hover:bg-red-500/20 group-hover:text-red-400'}`}>
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">{f.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
import React from 'react';
import { User, Currency } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CreditCard, Lock, ArrowRight, ShieldCheck, Zap, Users, Building2, Wallet, Smartphone } from 'lucide-react';

interface PayoutsProps {
  user: User;
}

export const Payouts: React.FC<PayoutsProps> = ({ user }) => {
  // Determine if this is a Nigerian entity based on currency usage
  const isNigerianEntity = user.walletBalance[Currency.NGN] > 0 || user.email.endsWith('.ng');

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
      
      <div className="text-center space-y-2 mb-10">
         <h1 className="text-3xl font-semibold text-white glow-text">Smart Payouts</h1>
         <p className="text-neutral-400">
            {isNigerianEntity 
              ? "Withdraw earnings directly to your local bank account." 
              : "Withdraw your earnings via Interac or Direct Deposit."}
         </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
         {/* Wallet Summary */}
         <Card className="bg-gradient-to-br from-neutral-900 to-black border-white/10">
            <h3 className="text-sm text-neutral-400 uppercase tracking-wider mb-6">Available Balance</h3>
            
            <div className="space-y-6">
               <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-sky-900/30 flex items-center justify-center text-sky-400">
                        <Zap size={18} />
                     </div>
                     <div>
                        <div className="text-sm text-white">Services</div>
                        <div className="text-xs text-neutral-500">Invoices paid</div>
                     </div>
                  </div>
                  <div className="text-xl font-medium text-white">
                     {isNigerianEntity ? '₦' : '$'}
                     {isNigerianEntity 
                        ? user.walletBalance[Currency.NGN].toLocaleString() 
                        : user.walletBalance[Currency.CAD].toLocaleString()}
                  </div>
               </div>

               <div className="flex justify-between items-center p-4 rounded-xl bg-violet-900/10 border border-violet-500/20">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-violet-900/30 flex items-center justify-center text-violet-400">
                        <Users size={18} />
                     </div>
                     <div>
                        <div className="text-sm text-white">Affiliate Bonus</div>
                        <div className="text-xs text-violet-300/70">Passive income</div>
                     </div>
                  </div>
                  <div className="text-xl font-medium text-violet-300">
                      {isNigerianEntity ? '₦' : '$'}
                      {/* converting affiliate dummy earnings for display if ngn */}
                      {isNigerianEntity 
                        ? ((user.affiliateEarnings || 0) * 1600).toLocaleString() 
                        : user.affiliateEarnings?.toLocaleString()}
                  </div>
               </div>

               <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <span className="text-neutral-400 text-sm">Total Withdrawable</span>
                  <span className="text-3xl font-light text-white">
                      {isNigerianEntity ? '₦' : '$'}
                      {isNigerianEntity
                        ? (user.walletBalance[Currency.NGN] + ((user.affiliateEarnings || 0) * 1600)).toLocaleString()
                        : ((user.walletBalance[Currency.CAD] || 0) + (user.affiliateEarnings || 0)).toLocaleString()}
                  </span>
               </div>
            </div>
         </Card>

         {/* Cashout Actions */}
         <div className="space-y-4">
             {/* Gamification Banner */}
             <div className="p-1 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-900/50">
                <div className="bg-black/90 rounded-xl p-4 flex items-center justify-between">
                   <div>
                      <div className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-300 uppercase tracking-wider mb-1">
                         Boost Your Payout
                      </div>
                      <p className="text-sm text-white">Refer 2 more vendors to unlock <span className="text-emerald-400 font-bold">Instant Payouts</span></p>
                   </div>
                   <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Lock size={14} className="text-white" />
                   </div>
                </div>
             </div>

             {/* Dynamic Payout Method */}
             {isNigerianEntity ? (
                <Card className="hover:border-emerald-500/30 transition-colors cursor-pointer group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <Building2 size={80} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-[#0BA4DB] rounded-lg text-white">
                                <Wallet size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                                    Paystack <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-neutral-300 font-normal">by Stripe</span>
                                </h3>
                                <p className="text-sm text-neutral-400">Direct to Local Bank (NGN)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
                            <ShieldCheck size={12} className="text-emerald-500"/> GTBank, Zenith, Access & more
                        </div>
                        <Button fullWidth className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                            Withdraw to Bank
                        </Button>
                    </div>
                </Card>
             ) : (
                <Card className="hover:border-yellow-500/30 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-yellow-500 rounded-lg text-black">
                            <Smartphone size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-white">Interac e-Transfer</h3>
                            <p className="text-sm text-neutral-400">Canadian Bank Accounts</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
                        <ShieldCheck size={12} className="text-emerald-500"/> Auto-deposit enabled • Instant
                    </div>
                    <Button fullWidth className="group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                        Withdraw Funds
                    </Button>
                </Card>
             )}

              <Card className="opacity-75 border-dashed border-white/20">
                <div className="flex items-center gap-4 mb-2">
                   <div className="p-3 bg-neutral-800 rounded-lg text-neutral-400">
                      <Zap size={24} />
                   </div>
                   <div>
                      <h3 className="text-lg font-medium text-neutral-300">Crypto (USDC)</h3>
                      <p className="text-sm text-neutral-500">Polygon Network</p>
                   </div>
                </div>
                <p className="text-xs text-amber-500 mt-2 mb-4">Coming Soon</p>
             </Card>
         </div>
      </div>
    </div>
  );
};
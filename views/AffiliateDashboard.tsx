import React from 'react';
import { User, AffiliateStat } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Copy, Share2, TrendingUp, Users, DollarSign, Award, ChevronRight, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { AFFILIATE_DATA } from '../constants';

interface AffiliateDashboardProps {
  user: User;
}

export const AffiliateDashboard: React.FC<AffiliateDashboardProps> = ({ user }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase tracking-wider flex items-center gap-1">
               <Award size={12} /> Tokasi Partner
            </span>
          </div>
          <h1 className="text-4xl font-semibold text-white glow-text">Partner Hub</h1>
          <p className="text-neutral-400 mt-2 max-w-lg">
            Promote your favorite vendors. When they get paid through Tokasi using your code, you earn cash.
          </p>
        </div>
        <Button variant="glass" className="backdrop-blur-xl border-violet-500/30 text-violet-100">
           <ShoppingBag size={16} className="mr-2"/> Browse Marketplace
        </Button>
      </div>

      {/* Main Wave Chart Card */}
      <Card className="relative overflow-hidden min-h-[400px] border-violet-500/20 glow-box">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-violet-900/10 to-transparent pointer-events-none" />
         
         <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
               <p className="text-sm text-violet-300 mb-1">Total Commissions (This Week)</p>
               <h2 className="text-5xl font-bold text-white tracking-tight">$530.00</h2>
            </div>
             <div className="flex gap-2">
               {['1D', '1W', '1M', '1Y'].map(period => (
                 <button key={period} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${period === '1W' ? 'bg-violet-600 text-white' : 'bg-white/5 text-neutral-400 hover:text-white'}`}>
                   {period}
                 </button>
               ))}
             </div>
         </div>

         <div className="h-[280px] w-full relative z-10 -ml-2">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={AFFILIATE_DATA}>
               <defs>
                 <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                   <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{fill: '#a3a3a3', fontSize: 12}} dy={10} />
               <Tooltip 
                 contentStyle={{ backgroundColor: 'rgba(17, 10, 40, 0.9)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                 itemStyle={{ color: '#fff' }}
               />
               <Area 
                 type="monotone" 
                 dataKey="earnings" 
                 stroke="#8b5cf6" 
                 strokeWidth={3}
                 fillOpacity={1} 
                 fill="url(#colorEarnings)" 
               />
             </AreaChart>
           </ResponsiveContainer>
         </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
         {/* Active Campaigns */}
         <Card className="lg:col-span-2 bg-gradient-to-br from-violet-900/20 to-black border-violet-500/20">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Users size={18} className="text-violet-400"/> Your Active Campaigns
            </h3>
            
            <div className="space-y-4">
                {/* Campaign 1 */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-xs font-bold text-white">LLH</div>
                       <div>
                           <div className="text-sm font-medium text-white">Lagos Logistics Hub</div>
                           <div className="text-xs text-neutral-400">Commission: 2.5% per transaction</div>
                       </div>
                   </div>
                   <div className="flex items-center gap-3 bg-black/40 px-3 py-2 rounded-lg border border-white/10">
                       <code className="text-sm font-mono text-violet-300">LLH-CHIOMA-24</code>
                       <Copy size={14} className="text-neutral-500 cursor-pointer hover:text-white" />
                   </div>
                </div>

                {/* Campaign 2 */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-xs font-bold text-white">EGE</div>
                       <div>
                           <div className="text-sm font-medium text-white">Eko Grand Events</div>
                           <div className="text-xs text-neutral-400">Commission: 1.0% per transaction</div>
                       </div>
                   </div>
                   <div className="flex items-center gap-3 bg-black/40 px-3 py-2 rounded-lg border border-white/10">
                       <code className="text-sm font-mono text-violet-300">EKO-VIP-GUEST</code>
                       <Copy size={14} className="text-neutral-500 cursor-pointer hover:text-white" />
                   </div>
                </div>
            </div>

            <Button fullWidth className="mt-6 bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]">
               Find More Vendors to Promote
            </Button>
         </Card>

         {/* Tier Progress */}
         <Card className="relative overflow-hidden">
            <div className="relative z-10">
               <h3 className="text-lg font-medium text-white mb-6">Partner Status</h3>
               
               <div className="space-y-6">
                  <div>
                     <div className="flex justify-between text-sm mb-2">
                        <span className="text-white">Gold Tier</span>
                        <span className="text-neutral-400">850 pts</span>
                     </div>
                     <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                     </div>
                     <p className="text-xs text-neutral-500 mt-2">Reach 1000 pts to reduce your own withdrawal fees to 0%.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Total Volume Driven</div>
                        <div className="text-lg text-white font-medium">$14,250.00</div>
                  </div>
               </div>
            </div>
         </Card>
      </div>

      <h3 className="text-xl font-medium text-white pt-4">Recent Conversions</h3>
      <div className="grid gap-3">
         {[
            { name: 'Shipping Payment', vendor: 'Lagos Logistics', date: '2 hrs ago', status: 'Completed', earn: '+$12.50' },
            { name: 'Wedding Deposit', vendor: 'Eko Grand', date: '5 hrs ago', status: 'Pending', earn: '...'},
            { name: 'Freight Invoice', vendor: 'Lagos Logistics', date: '1 day ago', status: 'Completed', earn: '+$45.00' }
         ].map((ref, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center font-bold text-xs text-neutral-300">
                     <ArrowUpRight size={14} />
                  </div>
                  <div>
                     <div className="text-sm font-medium text-white">{ref.name}</div>
                     <div className="text-xs text-neutral-500">Vendor: {ref.vendor} • {ref.date}</div>
                  </div>
               </div>
               <div className="text-right">
                  <div className="text-sm font-medium text-emerald-400">{ref.earn}</div>
                  <div className="text-[10px] text-neutral-500">{ref.status}</div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};
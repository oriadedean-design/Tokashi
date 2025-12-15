import React from 'react';
import { User, Transaction, Currency } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowUpRight, Search, Plus, CreditCard, ShoppingBag, Heart, Smartphone } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

interface ConsumerDashboardProps {
  user: User;
  transactions: readonly Transaction[];
}

const data = [
  { name: 'Mon', amt: 240 },
  { name: 'Tue', amt: 139 },
  { name: 'Wed', amt: 980 },
  { name: 'Thu', amt: 390 },
  { name: 'Fri', amt: 480 },
  { name: 'Sat', amt: 380 },
  { name: 'Sun', amt: 430 },
];

export const ConsumerDashboard: React.FC<ConsumerDashboardProps> = ({ user, transactions }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-white">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="text-neutral-400 mt-1">Support your family and shop Nigerian vendors from Canada.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="glass" size="sm">
            <ShoppingBag size={16} className="mr-2"/> Marketplace
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2"/> Send CAD
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Wallet Balance */}
        <Card className="lg:col-span-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Heart size={180} />
            </div>
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm font-medium text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                 <img src="https://flagcdn.com/ca.svg" width="16" alt="Canada" className="rounded-sm opacity-80" />
                 CAD Balance
              </p>
              <h2 className="text-5xl font-light text-white mt-2">
                ${user.walletBalance[Currency.CAD].toLocaleString()}
              </h2>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded border border-emerald-500/20">
              Active
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
             <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                <div className="text-xs text-neutral-400 mb-1 flex items-center gap-1">
                   <img src="https://flagcdn.com/us.svg" width="12" alt="US" className="opacity-50" />
                   USD Wallet
                </div>
                <div className="text-lg text-white">${user.walletBalance[Currency.USD]}</div>
             </div>
             <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                <div className="text-xs text-neutral-400 mb-1">Add Money</div>
                <div className="text-sm text-white flex items-center gap-2">
                   <Smartphone size={14} className="text-yellow-500"/> Interac e-Transfer
                </div>
             </div>
             <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors border border-white/5">
                <Plus size={20} className="text-neutral-400" />
             </div>
          </div>
        </Card>

        {/* Quick Transfer / FX Snippet */}
        <Card className="flex flex-col justify-center">
            <h3 className="text-lg font-medium text-white mb-4">Quick Send (CAD)</h3>
             <div className="space-y-4">
                {['Mums House Reno', 'Lagos Logistics', 'Tunde (Cousin)'].map((name, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-xs font-bold text-sky-400">
                                {name[0]}
                            </div>
                            <div className="text-sm">
                                <div className="text-white group-hover:text-emerald-400 transition-colors">{name}</div>
                                <div className="text-neutral-500 text-xs">Last sent 2 days ago</div>
                            </div>
                        </div>
                        <ArrowUpRight size={16} className="text-neutral-600 group-hover:text-white" />
                    </div>
                ))}
             </div>
             <Button variant="secondary" className="mt-6 w-full text-xs">View All Contacts</Button>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Spending Chart */}
        <Card className="lg:col-span-2 min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-white">Transaction Volume (CAD)</h3>
                <select className="bg-neutral-900 border border-white/10 rounded-lg text-xs text-neutral-400 p-1">
                    <option>This Week</option>
                    <option>This Month</option>
                </select>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                            contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="amt" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>

        {/* Recent Transactions List */}
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-white">Recent</h3>
                <Search size={16} className="text-neutral-500" />
            </div>
            <div className="space-y-1">
                {transactions.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-3 -mx-3 rounded-xl hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'PAYMENT' ? 'bg-purple-500/10 text-purple-400' : 'bg-sky-500/10 text-sky-400'}`}>
                                {t.type === 'PAYMENT' ? <ShoppingBag size={18} /> : <ArrowUpRight size={18} />}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white">{t.recipientName}</div>
                                <div className="text-xs text-neutral-500">{t.date}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-medium text-white">
                                -${t.amount} <span className="text-xs text-neutral-500">{t.currency}</span>
                            </div>
                            <div className={`text-[10px] uppercase tracking-wider font-bold ${t.status === 'COMPLETED' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                {t.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
             <Button variant="glass" className="w-full mt-6 text-xs">View All Activity</Button>
        </Card>
      </div>
    </div>
  );
};
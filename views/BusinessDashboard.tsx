import React from 'react';
import { User, Invoice } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, Download, Users, Briefcase, ChevronRight, TrendingUp, ShieldCheck } from 'lucide-react';
import { MOCK_INVOICES } from '../constants';

interface BusinessDashboardProps {
  user: User;
}

export const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ user }) => {
  return (
    <div className="space-y-8 animate-fade-in">
       {/* Header */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/20 uppercase tracking-wider">Trusted Vendor</span>
             <span className="text-neutral-500 text-xs flex items-center gap-1"><ShieldCheck size={10}/> Verified</span>
          </div>
          <h1 className="text-3xl font-semibold text-white">{user.name} Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="glass" size="sm">
            <Users size={16} className="mr-2"/> Affiliates
          </Button>
          <Button size="sm">
            <FileText size={16} className="mr-2"/> Send Invoice
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Sales', val: '$142,500', trend: '+12%', color: 'text-emerald-400' },
          { label: 'Trust Score', val: '98/100', trend: 'Excellent', color: 'text-purple-400' },
          { label: 'Pending Orders', val: '4', trend: 'Ship by Friday', color: 'text-sky-400' },
          { label: 'Affiliate Payouts', val: '$1,200', trend: '5 Partners', color: 'text-amber-400' },
        ].map((stat, i) => (
          <Card key={i} className="p-5">
             <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">{stat.label}</p>
             <h3 className="text-2xl text-white font-medium">{stat.val}</h3>
             <p className={`text-xs mt-2 ${stat.color} flex items-center gap-1`}>
                <TrendingUp size={12}/> {stat.trend}
             </p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Invoice Management */}
        <Card className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <FileText size={18} className="text-sky-400"/> Recent Orders & Invoices
                </h3>
                <Button variant="glass" size="sm" className="text-xs">View All</Button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs text-neutral-500 uppercase tracking-wider border-b border-white/5">
                            <th className="pb-3 pl-2 font-medium">Customer</th>
                            <th className="pb-3 font-medium">Amount</th>
                            <th className="pb-3 font-medium">Due Date</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 pr-2 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {MOCK_INVOICES.map(inv => (
                            <tr key={inv.id} className="group border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                <td className="py-4 pl-2 font-medium text-white">{inv.clientName}</td>
                                <td className="py-4 text-neutral-300">${inv.amount.toLocaleString()}</td>
                                <td className="py-4 text-neutral-400">{inv.dueDate}</td>
                                <td className="py-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                                        inv.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                        inv.status === 'OVERDUE' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                        'bg-sky-500/10 text-sky-400 border-sky-500/20'
                                    }`}>
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="py-4 pr-2 text-right">
                                    <button className="text-neutral-400 hover:text-white transition-colors">
                                        <ChevronRight size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>

        {/* Storefront Preview / Actions */}
        <div className="space-y-6">
            <Card className="relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-sky-900/20" />
                 <div className="relative z-10">
                    <h3 className="text-lg font-medium text-white mb-2">Your Vendor Profile</h3>
                    <p className="text-sm text-neutral-400 mb-6">Trust Badge: Active. Complete 2 more verified orders to reach Gold Status.</p>
                    
                    <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10 mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded bg-neutral-700 flex-shrink-0" />
                            <div>
                                <div className="h-2 w-24 bg-neutral-600 rounded mb-1" />
                                <div className="h-2 w-16 bg-neutral-700 rounded" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                             <div className="h-20 w-full bg-neutral-700/50 rounded" />
                             <div className="h-20 w-full bg-neutral-700/50 rounded" />
                        </div>
                    </div>

                    <Button fullWidth variant="secondary">Edit Services</Button>
                 </div>
            </Card>

            <Card>
                <h3 className="text-lg font-medium text-white mb-4">Quick Tools</h3>
                <div className="space-y-2">
                    <Button variant="glass" fullWidth className="justify-start h-auto py-3 text-sm">
                        <Briefcase size={16} className="mr-3 text-sky-400"/> Create Service Quote
                    </Button>
                    <Button variant="glass" fullWidth className="justify-start h-auto py-3 text-sm">
                        <Download size={16} className="mr-3 text-sky-400"/> Export Transaction Data
                    </Button>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};
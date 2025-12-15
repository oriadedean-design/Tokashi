import React, { useState } from 'react';
import { Landing } from './views/Landing';
import { ConsumerDashboard } from './views/ConsumerDashboard';
import { BusinessDashboard } from './views/BusinessDashboard';
import { AffiliateDashboard } from './views/AffiliateDashboard';
import { VendorStorefront } from './views/VendorStorefront';
import { Payouts } from './views/Payouts';
import { MOCK_USER_CONSUMER, MOCK_USER_BUSINESS, MOCK_TRANSACTIONS } from './constants';
import { User, UserRole } from './types';
import { Home, LayoutGrid, Settings, LogOut, Briefcase, Users, DollarSign, Store } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = (role: UserRole) => {
    if (role === UserRole.CONSUMER) {
        setCurrentUser(MOCK_USER_CONSUMER);
        setCurrentView('dashboard');
    }
    if (role === UserRole.BUSINESS) {
        setCurrentUser(MOCK_USER_BUSINESS);
        setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  // Render specific views based on auth state
  if (!currentUser) {
    return (
      <div className="min-h-screen font-sans selection:bg-violet-500/30">
        <Landing onLogin={handleLogin} />
        {/* Debug Switcher for Demo Purposes */}
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 p-4 bg-black/80 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl">
           <div className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest mb-1">Demo Access</div>
           <button onClick={() => handleLogin(UserRole.CONSUMER)} className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded transition-colors">Login as Consumer</button>
           <button onClick={() => handleLogin(UserRole.BUSINESS)} className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-2 rounded transition-colors">Login as Vendor</button>
        </div>
      </div>
    );
  }

  // Authenticated Layout
  return (
    <div className="min-h-screen font-sans flex overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-black/20 backdrop-blur-xl flex flex-col h-screen fixed lg:relative z-40 hidden lg:flex">
        <div className="p-6 border-b border-white/5">
           <div className="text-xl font-bold tracking-tighter text-white">Tokasi<span className="text-violet-500">.</span></div>
        </div>
        
        <div className="flex-1 py-6 px-3 space-y-1">
          <NavItem active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} icon={Home} label="Dashboard" />
          
          {currentUser.role === UserRole.CONSUMER && (
             <NavItem active={currentView === 'marketplace'} onClick={() => setCurrentView('marketplace')} icon={LayoutGrid} label="Marketplace" />
          )}

          {currentUser.role === UserRole.BUSINESS && (
            <>
             <NavItem active={currentView === 'affiliates'} onClick={() => setCurrentView('affiliates')} icon={Users} label="Affiliates" />
             <NavItem active={currentView === 'storefront'} onClick={() => setCurrentView('storefront')} icon={Store} label="Storefront" />
             <NavItem active={currentView === 'payouts'} onClick={() => setCurrentView('payouts')} icon={DollarSign} label="Payouts" />
             <NavItem active={currentView === 'invoices'} onClick={() => setCurrentView('invoices')} icon={Briefcase} label="Invoices" />
            </>
          )}
          
          <NavItem active={currentView === 'settings'} onClick={() => setCurrentView('settings')} icon={Settings} label="Settings" />
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 mb-3 border border-white/5">
             <img src={currentUser.avatarUrl} alt="avatar" className="w-8 h-8 rounded-full bg-neutral-700" />
             <div className="overflow-hidden">
                <div className="text-sm font-medium truncate text-white">{currentUser.name}</div>
                <div className="text-[10px] text-neutral-400 truncate">{currentUser.email}</div>
             </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 text-sm text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto relative">
        {/* Top Fade for Scroll */}
        <div className="sticky top-0 h-10 w-full bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto p-6 lg:p-12 pb-32">
          {currentUser.role === UserRole.CONSUMER ? (
            <ConsumerDashboard user={currentUser} transactions={MOCK_TRANSACTIONS} />
          ) : (
             <>
                {currentView === 'dashboard' && <BusinessDashboard user={currentUser} />}
                {currentView === 'affiliates' && <AffiliateDashboard user={currentUser} />}
                {currentView === 'storefront' && <VendorStorefront user={currentUser} />}
                {currentView === 'payouts' && <Payouts user={currentUser} />}
                {/* Fallbacks for demo views not yet fully implemented */}
                {currentView === 'invoices' && <BusinessDashboard user={currentUser} />} 
                {currentView === 'settings' && <div className="text-center text-neutral-500 mt-20">Settings Module Loading...</div>}
             </>
          )}
        </div>
      </main>

    </div>
  );
};

const NavItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
      active 
        ? 'bg-violet-600/10 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.1)] border border-violet-500/20' 
        : 'text-neutral-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon size={18} className={active ? 'text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : 'text-neutral-500'} />
    {label}
  </button>
);

export default App;
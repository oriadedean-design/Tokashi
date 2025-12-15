import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, RefreshCw, ShieldCheck, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Currency } from '../types';

interface FXWidgetProps {
  className?: string;
  showDecorations?: boolean;
}

export const FXWidget: React.FC<FXWidgetProps> = ({ className = '', showDecorations = true }) => {
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<Currency>(Currency.CAD);
  const [toCurrency, setToCurrency] = useState<Currency>(Currency.NGN);
  const [rate, setRate] = useState<number>(1180.45);
  const [loading, setLoading] = useState(false);

  // Simulate API fetch for quote
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Mock rates for Nigeria Corridor
      const rates: Record<string, number> = {
        'USD-NGN': 1605.50,
        'GBP-NGN': 2030.20,
        'CAD-NGN': 1180.45, // Primary Pair
        'EUR-NGN': 1720.10,
        'NGN-USD': 0.00062,
        'NGN-GBP': 0.00049,
        'NGN-CAD': 0.00084,
      };
      
      // Fallback or self-conversion
      if (fromCurrency === toCurrency) {
        setRate(1);
      } else {
        const key = `${fromCurrency}-${toCurrency}`;
        const baseRate = rates[key] || 1; 
        setRate(baseRate);
      }
      
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [fromCurrency, toCurrency, amount]);

  // Format large numbers (like NGN) nicely
  const formatCurrency = (val: number, currency: Currency) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const convertedAmount = amount * rate;
  const fee = 0; // Promotional Zero Fee

  return (
    <Card className={`relative overflow-hidden border-t border-white/20 shadow-2xl shadow-sky-900/20 ${className}`}>
      {showDecorations && (
        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
          <Zap size={120} className="text-red-500" />
        </div>
      )}

      <div className="relative z-10 space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-medium tracking-wide text-white">Send Home</h3>
          <span className="flex items-center text-xs text-emerald-400 gap-1 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> 
            Live Rate
          </span>
        </div>

        {/* You Send */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold pl-1">You send</label>
          <div className="flex items-center gap-4 bg-neutral-900/50 p-4 rounded-2xl border border-white/5 focus-within:border-red-500/50 transition-colors">
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="bg-transparent text-3xl font-light text-white w-full focus:outline-none placeholder-neutral-600"
            />
            <select 
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value as Currency)}
              className="bg-neutral-800 text-white font-medium rounded-lg px-3 py-2 border-none focus:ring-1 focus:ring-red-500 cursor-pointer"
            >
              {Object.values(Currency).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Connector */}
        <div className="relative flex justify-center -my-2 z-20">
          <button 
            onClick={() => {
              setFromCurrency(toCurrency);
              setToCurrency(fromCurrency);
            }}
            className="bg-neutral-800 border border-white/10 p-2 rounded-full hover:bg-neutral-700 hover:scale-110 transition-all shadow-lg"
          >
            <ArrowRightLeft size={16} className="text-red-400" />
          </button>
        </div>

        {/* They Receive */}
        <div className="space-y-2">
           <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold pl-1">They receive</label>
          <div className="flex items-center gap-4 bg-neutral-900/50 p-4 rounded-2xl border border-white/5">
            <div className={`text-3xl font-light w-full truncate ${loading ? 'opacity-50 blur-sm' : 'text-green-400'}`}>
              {formatCurrency(convertedAmount, toCurrency)}
            </div>
             <select 
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value as Currency)}
              className="bg-neutral-800 text-white font-medium rounded-lg px-3 py-2 border-none focus:ring-1 focus:ring-green-500 cursor-pointer"
            >
              {Object.values(Currency).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 py-2">
          <div className="flex justify-between text-xs text-neutral-400">
            <span>Exchange Rate</span>
            <span className="text-white font-mono">1 {fromCurrency} = {rate.toFixed(2)} {toCurrency}</span>
          </div>
          <div className="flex justify-between text-xs text-neutral-400">
            <span>Processing Fee</span>
            <span className="text-white font-mono">{fee === 0 ? 'FREE' : `${fee} ${fromCurrency}`}</span>
          </div>
           <div className="flex justify-between text-xs text-neutral-400">
            <span>Arrives</span>
            <span className="text-emerald-400">Instantly</span>
          </div>
        </div>

        <Button fullWidth size="lg">
          Send Now
        </Button>

        <div className="flex justify-center items-center gap-2 text-[10px] text-neutral-500 uppercase tracking-widest">
          <ShieldCheck size={12} /> Regulated by FINTRAC
        </div>
      </div>
    </Card>
  );
};
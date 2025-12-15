import React, { useState } from 'react';
import { User, VendorProfile, Currency } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MapPin, Star, Edit3, Image as ImageIcon, CheckCircle, Share2, Eye, Zap, Megaphone } from 'lucide-react';
import { MOCK_VENDORS } from '../constants';

interface VendorStorefrontProps {
  user: User;
}

export const VendorStorefront: React.FC<VendorStorefrontProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [joinedAffiliate, setJoinedAffiliate] = useState(false);
  // Simulate fetching logged in vendor profile, fallback to first mock
  const profile = MOCK_VENDORS[0]; 

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      
      {/* Action Bar */}
      <div className="flex justify-between items-center sticky top-0 z-30 bg-black/50 backdrop-blur-md py-4 -mx-6 px-6 border-b border-white/5">
        <h1 className="text-2xl font-semibold text-white">Storefront</h1>
        <div className="flex gap-3">
           <Button variant="secondary" size="sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <><Eye size={16} className="mr-2"/> View As Customer</> : <><Edit3 size={16} className="mr-2"/> Edit Profile</>}
           </Button>
           <Button variant="primary" size="sm">
              <Share2 size={16} className="mr-2"/> Share Link
           </Button>
        </div>
      </div>

      {/* Hero Cover */}
      <div className="relative h-[300px] w-full rounded-3xl overflow-hidden group">
         <img src={profile.coverImage} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
         
         <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="flex justify-between items-end">
               <div>
                  <div className="flex items-center gap-2 mb-2">
                     <span className="bg-sky-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Verified Vendor</span>
                     <div className="flex text-amber-400">
                        {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                     </div>
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-2">{profile.businessName}</h1>
                  <p className="text-lg text-neutral-300 max-w-2xl">{profile.tagline}</p>
               </div>
               <div className="text-right hidden sm:block">
                  <div className="text-sm text-neutral-400">Starting at</div>
                  <div className="text-2xl font-medium text-white">
                     ₦{profile.hourlyRate.min.toLocaleString()}
                  </div>
               </div>
            </div>
         </div>
         
         {isEditing && (
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur rounded-full p-2 cursor-pointer hover:bg-white/20 transition-colors">
               <ImageIcon size={20} className="text-white" />
            </div>
         )}
      </div>

      {/* Info Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <section>
               <h3 className="text-xl font-medium text-white mb-4">About</h3>
               <p className="text-neutral-400 leading-relaxed">
                  {profile.description || "Leading provider of premium services for the diaspora community. We ensure quality, transparency, and timely delivery for all your needs back home."}
               </p>
            </section>

            <section>
               <h3 className="text-xl font-medium text-white mb-4">Portfolio</h3>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(profile.images || []).map((img, i) => (
                     <div key={i} className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer">
                        <img src={img} alt={`Portfolio ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                           <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                     </div>
                  ))}
                  {isEditing && (
                     <div className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center hover:border-violet-500/50 hover:bg-violet-500/10 transition-all cursor-pointer">
                        <div className="text-center">
                           <ImageIcon size={24} className="mx-auto text-neutral-500 mb-2"/>
                           <span className="text-xs text-neutral-400">Add Photo</span>
                        </div>
                     </div>
                  )}
               </div>
            </section>
         </div>

         <div className="space-y-6">
            
            {/* Affiliate CTA Card */}
            {!isEditing && (
              <Card className="border-violet-500/30 bg-gradient-to-br from-violet-900/20 to-black relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                     <Megaphone size={80} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-medium text-white mb-2">Promote & Earn</h3>
                    <p className="text-sm text-neutral-400 mb-4">
                       Like this vendor? Refer clients to them and earn <span className="text-emerald-400 font-bold">2.5%</span> on every paid invoice.
                    </p>
                    {joinedAffiliate ? (
                        <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                           <div className="text-xs text-neutral-500 mb-1">Your Unique Code</div>
                           <div className="font-mono text-violet-300 text-lg flex justify-between items-center">
                              LLH-{user.name.split(' ')[0].toUpperCase()}-24
                              <CheckCircle size={16} className="text-emerald-500" />
                           </div>
                        </div>
                    ) : (
                        <Button fullWidth onClick={() => setJoinedAffiliate(true)} className="bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                           Join Affiliate Program
                        </Button>
                    )}
                  </div>
              </Card>
            )}

            <Card>
               <h3 className="text-lg font-medium text-white mb-4">Services</h3>
               <div className="space-y-3">
                  {profile.services.map((s, i) => (
                     <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                        <CheckCircle size={16} className="text-emerald-500" />
                        <span className="text-sm text-neutral-200">{s}</span>
                     </div>
                  ))}
                  {isEditing && (
                     <Button variant="glass" fullWidth size="sm" className="text-xs">+ Add Service</Button>
                  )}
               </div>
            </Card>

            <Card>
               <h3 className="text-lg font-medium text-white mb-4">Location</h3>
               <div className="flex items-start gap-3 text-neutral-400 mb-4">
                  <MapPin size={20} className="text-violet-400 mt-1" />
                  <div>
                     <p className="text-white">{profile.location}</p>
                     <p className="text-xs mt-1">Available for travel within Nigeria</p>
                  </div>
               </div>
               <div className="h-32 w-full rounded-xl bg-neutral-800 relative overflow-hidden">
                  {/* Mock Map */}
                  <div className="absolute inset-0 bg-neutral-700 opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-500">Map View</div>
               </div>
            </Card>
         </div>
      </div>

    </div>
  );
};
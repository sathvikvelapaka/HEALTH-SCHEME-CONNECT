
import React from 'react';
import type { HospitalWithBedStatus } from '../pages/SearchResultsPage';
import { useLanguage } from '../contexts/LanguageContext';
import { BedIcon, StarIcon, LocationPinIcon } from './icons';

interface HospitalCardProps {
  hospital: HospitalWithBedStatus;
  onSelect: () => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onSelect }) => {
  const { t } = useLanguage();
  const totalAvailableBeds = hospital.bedStatus ? (Number(hospital.bedStatus.available_general) || 0) + (Number(hospital.bedStatus.available_icu) || 0) + (Number(hospital.bedStatus.available_maternity) || 0) : 0;
  
  const bedMetricColor = totalAvailableBeds > 10 ? 'text-green-600 dark:text-green-400' : totalAvailableBeds > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400';
  const distance = (Math.random() * 5 + 1).toFixed(1); // Mock distance

  return (
    <div 
      className="group flex flex-col bg-white dark:bg-gray-800 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:-translate-y-3 cursor-pointer overflow-hidden"
      onClick={onSelect}
    >
      {/* Image Area */}
      <div className="h-52 relative p-6 flex items-end overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img 
            src={hospital.image || `https://ui-avatars.com/api/?name=${hospital.name}&background=random&size=512`} 
            alt={hospital.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {e.currentTarget.src = `https://ui-avatars.com/api/?name=${hospital.name}&background=random&size=512`}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="relative z-10 flex items-end gap-4 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
             <div className="w-18 h-18 rounded-2xl bg-white dark:bg-gray-900 p-1.5 shadow-2xl shrink-0 group-hover:rotate-3 transition-transform">
                <img 
                    src={`https://ui-avatars.com/api/?name=${hospital.name.charAt(0)}&background=random&color=fff&size=128&font-size=0.5&bold=true`} 
                    alt="Logo" 
                    className="w-full h-full rounded-xl object-cover"
                />
             </div>
             <div className="mb-2">
                 <div className="bg-primary-blue/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm mb-1.5 w-fit">
                    <StarIcon className="w-2.5 h-2.5 fill-current" />
                    <span>POPULAR</span>
                 </div>
             </div>
        </div>
        
        {hospital.is_nabh && (
             <div className="absolute top-5 right-5 z-20">
                 <span className="bg-white/10 backdrop-blur-xl text-white text-[10px] font-extrabold tracking-widest py-1.5 px-4 rounded-full border border-white/20 shadow-2xl">
                     NABH ACCREDITED
                 </span>
             </div>
        )}
      </div>
      
      <div className="p-8 pt-10 flex flex-col flex-grow">
        <div className="mb-6">
          <h3 className="font-extrabold text-2xl text-text-primary leading-tight mb-2 group-hover:text-primary-blue transition-colors line-clamp-1 tracking-tight">{hospital.name}</h3>
          <div className="flex items-center text-sm text-text-secondary font-bold mt-1">
              <div className="p-1.5 bg-gray-50 dark:bg-gray-700 rounded-lg mr-2 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                  <LocationPinIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-blue transition-colors" />
              </div>
              <span className="truncate">{hospital.city}</span>
              <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
              <span className="text-primary-blue dark:text-blue-400">{distance} {t('kmAway')}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="bg-gray-50 dark:bg-gray-700/40 rounded-2xl p-4 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700 group-hover:border-primary-blue/20 transition-colors">
                 <div className="flex items-center gap-1.5 text-text-primary font-black text-xl mb-0.5">
                     <span>{Number(hospital.rating || 0).toFixed(1)}</span>
                     <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
                 </div>
                 <span className="text-[10px] text-text-muted font-black uppercase tracking-widest">{t('rating')}</span>
             </div>
             <div className="bg-gray-50 dark:bg-gray-700/40 rounded-2xl p-4 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700 group-hover:border-primary-blue/20 transition-colors">
                 <div className={`flex items-center gap-1.5 font-black text-xl mb-0.5 ${bedMetricColor}`}>
                     <span>{totalAvailableBeds}</span>
                     <BedIcon className="w-6 h-6" />
                 </div>
                 <span className="text-[10px] text-text-muted font-black uppercase tracking-widest">{t('bedsFree')}</span>
             </div>
        </div>
        
        <div className="mt-auto space-y-6">
             <div>
                <p className="text-[10px] font-black text-text-muted mb-3 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-8 h-px bg-gray-200 dark:bg-gray-700"></span>
                    Accepted Schemes
                </p>
                <div className="flex flex-wrap gap-2 h-8 overflow-hidden">
                    {hospital.schemes_accepted?.slice(0, 3).map((scheme, i) => (
                        <span key={i} className="text-[10px] font-black bg-blue-50 dark:bg-blue-900/50 text-primary-blue dark:text-blue-300 py-1.5 px-3 rounded-lg border border-blue-100 dark:border-blue-800/50 shadow-sm">
                            {scheme}
                        </span>
                    ))}
                    {hospital.schemes_accepted && hospital.schemes_accepted.length > 3 && (
                        <span className="text-[10px] font-black bg-gray-100 dark:bg-gray-700 text-text-muted py-1.5 px-3 rounded-lg">+{hospital.schemes_accepted.length - 3}</span>
                    )}
                </div>
             </div>
        
            <button className="w-full group-hover:bg-primary-blue group-hover:text-white text-primary-blue bg-blue-50 dark:bg-gray-700/50 dark:text-blue-300 dark:group-hover:bg-primary-blue dark:group-hover:text-white font-extrabold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-xl group-hover:shadow-blue-500/30">
                {t('viewDetails')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;

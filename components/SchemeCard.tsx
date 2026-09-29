
import React, { useState } from 'react';
import type { Scheme, Hospital, Page } from '../types';
import { getHospitalsForScheme } from '../services/apiService';
import { ExternalLinkIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface SchemeCardProps {
  scheme: Scheme;
  city: string;
  onNavigate?: (page: Page, params?: any) => void;
}

const DEFAULT_COVERED_TREATMENTS = [
  { name: 'Coronary Artery Bypass (CABG)', dept: 'Cardiology', coverage: 'Up to ₹2,50,000', cashless: true },
  { name: 'Cardiac Angioplasty & Stenting', dept: 'Cardiology', coverage: 'Up to ₹1,20,000', cashless: true },
  { name: 'Total Knee / Hip Joint Replacement', dept: 'Orthopedics', coverage: 'Up to ₹1,80,000', cashless: true },
  { name: 'Chemotherapy & Oncology Care', dept: 'Oncology', coverage: '100% Package Covered', cashless: true },
  { name: 'Hemodialysis (Per Session)', dept: 'Nephrology', coverage: 'Free Cashless Under Scheme', cashless: true },
  { name: 'Cataract Surgery (Phaco + IOL)', dept: 'Ophthalmology', coverage: '100% Cashless Package', cashless: true },
  { name: 'Normal Delivery & C-Section', dept: 'Maternity', coverage: '100% Cashless Package', cashless: true },
  { name: 'Appendectomy / Gallbladder Surgery', dept: 'General Surgery', coverage: 'Full Package Covered', cashless: true },
];

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, city, onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'hospitals' | 'treatments'>('hospitals');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { language, t } = useLanguage();

  const toggleExpand = async () => {
    const shouldExpand = !isExpanded;
    setIsExpanded(shouldExpand);

    if (shouldExpand && hospitals.length === 0) {
      setIsLoading(true);
      try {
        const data = await getHospitalsForScheme(scheme.id, city);
        setHospitals(data);
      } catch (error) {
        console.error("Failed to fetch hospitals for scheme:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const eligibilityText = (() => {
    if (scheme.eligibility_criteria?.bpl_families || scheme.eligibility_criteria?.white_card_holders) {
      return 'BPL / White Card Holders';
    }
    if (scheme.code === 'PMJAY') {
      return 'Based on SECC 2011 data';
    }
    if (scheme.state && scheme.government_level === 'State') {
      return `For residents of ${scheme.state}`;
    }
    return 'Eligible Citizens & Families';
  })();
  
  const schemeName = scheme.name_local?.[language] || scheme.name;
  const schemeDescription = scheme.description_local?.[language] || scheme.description;

  return (
    <div className="bg-bg-secondary rounded-[2rem] shadow-lg p-7 border-2 border-transparent hover:border-primary-blue/20 dark:hover:border-primary-blue/30 dark:border-gray-700 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-2xl font-extrabold text-primary-blue dark:text-blue-400 font-heading tracking-tight leading-tight">{schemeName}</h2>
          <span className="text-xs font-black bg-blue-100 dark:bg-blue-900/60 text-primary-blue dark:text-blue-300 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-700 shrink-0 ml-3">
            {scheme.code}
          </span>
        </div>
        <p className="text-text-secondary text-sm mb-6 font-medium leading-relaxed opacity-90">{schemeDescription}</p>
      </div>

      <div className="pt-5 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest">{t('coverageLimit')}</p>
            <p className="text-3xl font-black text-primary-green dark:text-green-400">
              {scheme.coverage_limit > 0 ? `₹${scheme.coverage_limit.toLocaleString('en-IN')}` : 'Comprehensive'}
            </p>
            <p className="text-[11px] text-text-muted font-semibold">Per Family / Per Year</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center gap-1 bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2.5 py-1 rounded-lg text-xs font-bold border border-green-200 dark:border-green-800">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
              100% Cashless
            </span>
            <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-lg text-xs font-bold border border-blue-200 dark:border-blue-800">
              Pre-existing Covered
            </span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 mb-5">
          <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest mb-1">{t('eligibility')}</p>
          <p className="text-xs font-bold text-text-primary">{eligibilityText}</p>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-1 gap-2.5">
        <button 
          onClick={toggleExpand}
          className={`w-full text-sm font-extrabold py-3.5 px-5 rounded-xl transition-all flex justify-center items-center gap-2 shadow-sm active:scale-95 ${
            isExpanded 
              ? 'bg-primary-blue text-white shadow-blue-500/20' 
              : 'bg-blue-50 dark:bg-blue-900/40 text-primary-blue dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800'
          }`}
        >
          {isLoading ? (
            <svg className="animate-spin h-4 w-4 mr-2 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isLoading ? t('loading') : isExpanded ? 'Hide Hospitals & Treatments' : 'View Hospitals & Treatments Covered'}
          {!isLoading && (
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {scheme.official_website && (
          <a 
            href={scheme.official_website}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-xs bg-gray-100 dark:bg-gray-800 text-text-primary font-bold py-2.5 px-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex justify-center items-center gap-2 border border-gray-200 dark:border-gray-700"
          >
            {t('officialSite')}
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {isExpanded && (
        <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-4 duration-300 space-y-4">
          {/* Sub-tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('hospitals')}
              className={`pb-2 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'hospitals'
                  ? 'border-primary-blue text-primary-blue dark:text-blue-400'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              🏥 Empanelled Hospitals ({hospitals.length})
            </button>
            <button
              onClick={() => setActiveTab('treatments')}
              className={`pb-2 px-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'treatments'
                  ? 'border-primary-blue text-primary-blue dark:text-blue-400'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              💊 Treatments Covered (8)
            </button>
          </div>

          {/* Tab 1: Empanelled Hospitals */}
          {activeTab === 'hospitals' && (
            <div className="space-y-3">
              <p className="text-[11px] font-extrabold text-text-muted uppercase tracking-wider">
                Empanelled in {city} (Showing {hospitals.length})
              </p>
              {isLoading ? (
                <div className="space-y-2">
                  <div className="h-12 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl"></div>
                  <div className="h-12 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl opacity-60"></div>
                </div>
              ) : hospitals.length > 0 ? (
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {hospitals.map(h => (
                    <div 
                      key={h.id} 
                      className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-blue/50 transition-all flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-sm text-text-primary leading-snug">{h.name}</h4>
                          <p className="text-[11px] text-text-secondary">{h.address}, {h.city}</p>
                        </div>
                        <span className="shrink-0 text-xs font-extrabold text-amber-500 bg-amber-50 dark:bg-amber-900/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                          ⭐ {Number(h.rating || 0).toFixed(1)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1.5 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-[11px] text-text-muted font-bold">
                          🛏️ {h.available_icu ?? 10} ICU · {h.available_general ?? 40} Gen Beds
                        </span>
                        {onNavigate && (
                          <button
                            onClick={() => onNavigate(Page.HOSPITAL_DETAIL, { hospitalId: h.id })}
                            className="text-xs font-bold text-primary-blue hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 hover:underline"
                          >
                            View Hospital & Schemes →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-center border border-amber-100 dark:border-amber-900/50">
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400">
                    No hospitals found empanelled for {scheme.code} in {city}.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Treatments Covered */}
          {activeTab === 'treatments' && (
            <div className="space-y-3">
              <p className="text-[11px] font-extrabold text-text-muted uppercase tracking-wider">
                Key Surgeries & Medical Procedures Covered Under {scheme.code}
              </p>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {DEFAULT_COVERED_TREATMENTS.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-text-primary">{item.name}</p>
                      <p className="text-[10px] text-text-muted font-semibold">{item.dept}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-success bg-green-50 dark:bg-green-900/40 px-2 py-0.5 rounded-md border border-green-200 dark:border-green-800 block">
                        {item.coverage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-xl text-[11px] text-primary-blue dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                💡 <strong>How to claim:</strong> Visit any empanelled hospital listed in the tab above with your Ration Card or Scheme Card. Head to the Arogya Mitra counter for instant pre-authorization.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SchemeCard;

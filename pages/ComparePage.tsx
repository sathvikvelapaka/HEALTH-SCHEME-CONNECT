
import React, { useState, useEffect } from 'react';
import { getSchemes, searchHospitals } from '../services/apiService';
import type { Scheme, Hospital } from '../types';
import { MOCK_HOSPITALS } from '../data/mockData';
import { ExternalLinkIcon, StarIcon, BedIcon, CertificateIcon } from '../components/icons';
import { useLanguage } from '../contexts/LanguageContext';

const SchemeComparisonCard: React.FC<{ scheme: Scheme }> = ({ scheme }) => {
    const { t, language } = useLanguage();
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
        return 'Varies, check official website';
    })();
    
    const schemeName = scheme.name_local?.[language] || scheme.name;
    const schemeDescription = scheme.description_local?.[language] || scheme.description;

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl flex flex-col justify-between h-full relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div>
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <span className="text-[10px] font-black tracking-widest text-primary-blue bg-blue-50 dark:bg-blue-900/50 px-3 py-1 rounded-full uppercase mb-2 inline-block">
                            {scheme.government_level} LEVEL
                        </span>
                        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white font-heading tracking-tight leading-tight group-hover:text-primary-blue transition-colors">{schemeName}</h3>
                    </div>
                    <span className="text-xs font-black bg-blue-50 dark:bg-blue-900/50 text-primary-blue dark:text-blue-300 py-1.5 px-3.5 rounded-xl border border-blue-100 dark:border-blue-800/50 shrink-0 ml-4">
                        {scheme.code}
                    </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 font-medium opacity-90">{schemeDescription}</p>
                
                <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <span className="text-xs text-text-muted font-bold uppercase tracking-wider">{t('coverageLimit')}</span>
                        <span className="text-xl font-black text-primary-green dark:text-green-400">
                            ₹{scheme.coverage_limit > 0 ? scheme.coverage_limit.toLocaleString('en-IN') : 'Varies'}
                        </span>
                    </div>
                     <div className="space-y-1 pl-1">
                        <p className="text-xs text-text-muted font-bold uppercase tracking-wider">{t('eligibility')}</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{eligibilityText}</p>
                    </div>
                     <div className="space-y-1 pl-1">
                        <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Cashless Facility</p>
                        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            100% Cashless Support Verified
                        </p>
                    </div>
                </div>
            </div>

            {scheme.official_website && (
                 <a 
                    href={scheme.official_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-sm bg-primary-blue text-white font-extrabold py-4 px-6 rounded-2xl hover:bg-blue-600 transition-all flex justify-center items-center gap-2 mt-8 shadow-lg shadow-blue-500/15"
                >
                    {t('applyOfficialSite')}
                    <ExternalLinkIcon className="h-4.5 w-4.5" />
                </a>
            )}
        </div>
    );
};

const HospitalComparisonCard: React.FC<{ hospital: Hospital }> = ({ hospital }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl h-full relative overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div>
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <span className="text-[10px] font-black tracking-widest text-primary-blue bg-blue-50 dark:bg-blue-900/50 px-3 py-1 rounded-full uppercase mb-2 inline-block">
                            Verified Network Partner
                        </span>
                        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white font-heading tracking-tight leading-tight group-hover:text-primary-blue transition-colors">{hospital.name}</h3>
                        <p className="text-xs text-text-muted font-bold mt-1.5 flex items-center gap-1">
                            📍 {hospital.city}, {hospital.state}
                        </p>
                    </div>
                    {hospital.is_nabh && (
                        <span className="text-[10px] font-black bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 py-1.5 px-3.5 rounded-xl border border-emerald-100 dark:border-emerald-800/50 shrink-0 ml-4">
                            NABH
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 my-6">
                    <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800/80 text-center">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">{t('rating')}</p>
                        <p className="text-lg font-black text-gray-900 dark:text-white flex items-center justify-center gap-1">
                            ⭐ {Number(hospital.rating || 0).toFixed(1)}
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800/80 text-center">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">{t('totalBeds')}</p>
                        <p className="text-lg font-black text-gray-900 dark:text-white">
                            {hospital.total_beds}
                        </p>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center text-sm pl-1">
                        <span className="text-text-secondary font-semibold">{t('consultingFee')}</span>
                        <span className="font-extrabold text-gray-900 dark:text-white">₹{hospital.consulting_fee.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm pl-1">
                        <span className="text-text-secondary font-semibold">Emergency Services</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Available 24/7
                        </span>
                    </div>
                    <div className="space-y-2 pl-1 pt-2">
                        <p className="text-xs text-text-muted font-bold uppercase tracking-wider">{t('schemesAccepted')}</p>
                        <div className="flex flex-wrap gap-2">
                            {hospital.schemes_accepted?.map(code => (
                                <span key={code} className="text-[10px] font-black bg-blue-50 dark:bg-blue-900/40 text-primary-blue dark:text-blue-300 py-1.5 px-3 rounded-lg border border-blue-100/60 dark:border-blue-800/50">
                                    {code}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <a
                href={`https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-sm bg-transparent border-2 border-primary-blue text-primary-blue hover:bg-blue-50 dark:hover:bg-blue-950/20 font-extrabold py-3.5 px-6 rounded-2xl transition-all flex justify-center items-center gap-2 mt-8 text-center"
            >
                Get Location & Directions
                <ExternalLinkIcon className="h-4.5 w-4.5" />
            </a>
        </div>
    );
};


const ComparePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'schemes' | 'hospitals'>('schemes');
    const { t, language } = useLanguage();
    
    // Scheme state
    const [allSchemes, setAllSchemes] = useState<Scheme[]>([]);
    const [selectedScheme1, setSelectedScheme1] = useState<string>('');
    const [selectedScheme2, setSelectedScheme2] = useState<string>('');

    // Hospital state
    const uniqueCities = [...new Set(MOCK_HOSPITALS.map(h => h.city))].sort();
    const [hospitalsInCity, setHospitalsInCity] = useState<Hospital[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>(uniqueCities[0] || '');
    const [selectedHospital1, setSelectedHospital1] = useState<string>('');
    const [selectedHospital2, setSelectedHospital2] = useState<string>('');
    const [loadingHospitals, setLoadingHospitals] = useState(false);


    useEffect(() => {
        getSchemes().then(data => {
            setAllSchemes(data);
            if (data.length >= 2) {
                setSelectedScheme1(data[0].id);
                setSelectedScheme2(data[1].id);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedCity) {
            setLoadingHospitals(true);
            searchHospitals(selectedCity, '').then(data => {
                setHospitalsInCity(data);
                setSelectedHospital1('');
                setSelectedHospital2('');
                if (data.length >= 2) {
                    setSelectedHospital1(data[0].id);
                    setSelectedHospital2(data[1].id);
                }
                setLoadingHospitals(false);
            });
        }
    }, [selectedCity]);

    const scheme1 = allSchemes.find(s => s.id === selectedScheme1);
    const scheme2 = allSchemes.find(s => s.id === selectedScheme2);
    const hospital1 = hospitalsInCity.find(h => h.id === selectedHospital1);
    const hospital2 = hospitalsInCity.find(h => h.id === selectedHospital2);

    return (
        <div className="space-y-8 pb-12">
             {/* Header */}
             <div className="text-center bg-gradient-to-r from-white to-blue-50/50 dark:from-gray-900 dark:to-gray-800/30 p-12 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="relative z-10">
                    <span className="text-primary-blue font-bold tracking-widest text-xs uppercase bg-blue-100/60 dark:bg-blue-900/40 px-4 py-1.5 rounded-full mb-4 inline-block">Decision Support Matrix</span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white font-heading tracking-tight leading-none mb-4">{t('compareTitle')}</h1>
                    <p className="text-text-secondary max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
                      {t('compareSubtitle')}
                    </p>
                </div>
            </div>

            {/* Selector bar */}
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 space-y-6">
                {/* Tabs */}
                <div className="flex justify-center">
                    <div className="bg-gray-100 dark:bg-gray-900 p-1.5 rounded-2xl flex items-center gap-1">
                        <button
                            onClick={() => setActiveTab('schemes')}
                            className={`px-8 py-3 rounded-xl font-bold text-sm tracking-tight transition-all duration-300 ${activeTab === 'schemes' ? 'bg-primary-blue text-white shadow-lg shadow-blue-500/20 scale-[1.02]' : 'text-text-secondary hover:text-text-primary bg-transparent'}`}
                        >
                            {t('compareSchemes')}
                        </button>
                        <button
                            onClick={() => setActiveTab('hospitals')}
                            className={`px-8 py-3 rounded-xl font-bold text-sm tracking-tight transition-all duration-300 ${activeTab === 'hospitals' ? 'bg-primary-blue text-white shadow-lg shadow-blue-500/20 scale-[1.02]' : 'text-text-secondary hover:text-text-primary bg-transparent'}`}
                        >
                            {t('compareHospitals')}
                        </button>
                    </div>
                </div>

                {/* Grid Inputs */}
                {activeTab === 'schemes' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 max-w-4xl mx-auto">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">{t('selectScheme1')}</label>
                            <div className="relative group">
                                <select 
                                    value={selectedScheme1} 
                                    onChange={e => setSelectedScheme1(e.target.value)} 
                                    className="w-full p-4.5 pl-12 appearance-none border-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 rounded-2xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 text-gray-900 dark:text-white font-bold shadow-sm transition-all cursor-pointer"
                                >
                                    <option value="">Choose first scheme</option>
                                    {allSchemes.map(s => <option key={s.id} value={s.id}>{s.name_local?.[language] || s.name}</option>)}
                                </select>
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none group-hover:scale-110 transition-transform">🛡️</span>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">{t('selectScheme2')}</label>
                            <div className="relative group">
                                <select 
                                    value={selectedScheme2} 
                                    onChange={e => setSelectedScheme2(e.target.value)} 
                                    className="w-full p-4.5 pl-12 appearance-none border-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 rounded-2xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 text-gray-900 dark:text-white font-bold shadow-sm transition-all cursor-pointer"
                                >
                                    <option value="">Choose second scheme</option>
                                    {allSchemes.filter(s => s.id !== selectedScheme1).map(s => <option key={s.id} value={s.id}>{s.name_local?.[language] || s.name}</option>)}
                                </select>
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none group-hover:scale-110 transition-transform">🛡️</span>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
                            </div>
                        </div>
                    </div>
                )}

                 {activeTab === 'hospitals' && (
                    <div className="space-y-6 max-w-4xl mx-auto pt-2">
                        <div className="w-full md:w-1/2 mx-auto space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Select City Network</label>
                            <div className="relative group">
                                <select 
                                    value={selectedCity} 
                                    onChange={e => setSelectedCity(e.target.value)} 
                                    className="w-full p-4.5 pl-12 appearance-none border-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 rounded-2xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 text-gray-900 dark:text-white font-bold shadow-sm transition-all cursor-pointer"
                                >
                                     {uniqueCities.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none group-hover:scale-110 transition-transform">📍</span>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
                            </div>
                        </div>

                        {loadingHospitals ? (
                            <div className="text-center py-4">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue mx-auto"></div>
                              <p className="mt-2 text-xs font-bold text-text-muted">{t('loadingHospitals')}</p>
                            </div>
                        ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">{t('selectHospital1')}</label>
                                <div className="relative group">
                                    <select 
                                        value={selectedHospital1} 
                                        onChange={e => setSelectedHospital1(e.target.value)} 
                                        className="w-full p-4.5 pl-12 appearance-none border-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 rounded-2xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 text-gray-900 dark:text-white font-bold shadow-sm transition-all cursor-pointer"
                                    >
                                        <option value="">{t('selectHospital1')}</option>
                                        {hospitalsInCity.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                                    </select>
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none group-hover:scale-110 transition-transform">🏥</span>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">{t('selectHospital2')}</label>
                                <div className="relative group">
                                    <select 
                                        value={selectedHospital2} 
                                        onChange={e => setSelectedHospital2(e.target.value)} 
                                        className="w-full p-4.5 pl-12 appearance-none border-2 border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 rounded-2xl focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 text-gray-900 dark:text-white font-bold shadow-sm transition-all cursor-pointer"
                                    >
                                        <option value="">{t('selectHospital2')}</option>
                                        {hospitalsInCity.filter(h => h.id !== selectedHospital1).map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                                    </select>
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none group-hover:scale-110 transition-transform">🏥</span>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                )}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {activeTab === 'schemes' && scheme1 && scheme2 && (
                    <>
                        <SchemeComparisonCard scheme={scheme1} />
                        <SchemeComparisonCard scheme={scheme2} />
                    </>
                )}
                 {activeTab === 'hospitals' && hospital1 && hospital2 && (
                    <>
                        <HospitalComparisonCard hospital={hospital1} />
                        <HospitalComparisonCard hospital={hospital2} />
                    </>
                )}
            </div>

            {/* Zero state / missing selections info */}
            {((activeTab === 'schemes' && (!scheme1 || !scheme2)) || (activeTab === 'hospitals' && (!hospital1 || !hospital2))) && (
                <div className="text-center py-20 bg-white dark:bg-gray-800/40 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 max-w-2xl mx-auto shadow-sm">
                    <div className="text-5xl mb-4 opacity-75">📊</div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">Incomplete Selection</h3>
                    <p className="text-text-muted px-6 text-sm font-medium leading-relaxed max-w-md mx-auto">{t('selectTwoToCompare', t(activeTab))}</p>
                </div>
            )}
        </div>
    );
};

export default ComparePage;


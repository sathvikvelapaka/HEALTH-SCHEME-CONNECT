
import React, { useState, useEffect, useCallback } from 'react';
import { getHospitalById, getSchemesForHospital, getReviewsForHospital, getBedStatusForHospital, getTreatmentsForHospital, addReview } from '../services/apiService';
import type { Hospital, Scheme, Review, BedStatus, Treatment, HospitalTreatment, Page } from '../types';
import BedStatusTile from '../components/BedStatusTile';
import ReviewCard from '../components/ReviewCard';
import HospitalSidebar from '../components/HospitalSidebar';
import { RupeeIcon } from '../components/icons';
import { useLanguage } from '../contexts/LanguageContext';

interface HospitalDetailPageProps {
  hospitalId: string;
  onNavigate: (page: Page) => void;
}

const StarRatingInput: React.FC<{ rating: number; setRating: (rating: number) => void }> = ({ rating, setRating }) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        onClick={() => setRating(star)}
        className={`w-8 h-8 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const HospitalDetailPage: React.FC<HospitalDetailPageProps> = ({ hospitalId, onNavigate }) => {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bedStatus, setBedStatus] = useState<BedStatus | null>(null);
  const [treatments, setTreatments] = useState<{ treatment: Treatment; details: HospitalTreatment }[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('treatments');
  const [selectedSchemeCode, setSelectedSchemeCode] = useState<string>('ALL');
  const [treatmentSearch, setTreatmentSearch] = useState<string>('');
  const { t } = useLanguage();

  // Review form state
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewBody, setNewReviewBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [hospData, schemeData, reviewData, bedData, treatmentData] = await Promise.all([
          getHospitalById(hospitalId),
          getSchemesForHospital(hospitalId),
          getReviewsForHospital(hospitalId),
          getBedStatusForHospital(hospitalId),
          getTreatmentsForHospital(hospitalId),
        ]);
        setHospital(hospData);
        setSchemes(schemeData);
        setReviews(reviewData);
        setBedStatus(bedData);
        setTreatments(treatmentData);
      } catch (error) {
        console.error("Failed to fetch hospital details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [hospitalId]);

  const handleReviewSubmit = useCallback(async (e: React.FormEvent) => {
      e.preventDefault();
      if (newReviewRating === 0 || !newReviewTitle || !newReviewBody) {
          alert('Please fill out all fields in the review.');
          return;
      }
      setIsSubmitting(true);
      try {
          const newReview = await addReview({
              hospital_id: hospitalId,
              user_id: 'u-mock', // Mock user ID
              rating: newReviewRating,
              title: newReviewTitle,
              body: newReviewBody,
          });
          setReviews(prev => [newReview, ...prev]);
          // Reset form
          setNewReviewRating(0);
          setNewReviewTitle('');
          setNewReviewBody('');
      } catch (error) {
          console.error('Failed to submit review', error);
          alert('There was an error submitting your review.');
      } finally {
          setIsSubmitting(false);
      }
  }, [hospitalId, newReviewRating, newReviewTitle, newReviewBody]);


  if (loading) {
    return <div className="text-center py-20">{t('loadingDetails')}</div>;
  }
  if (!hospital) {
    return <div className="text-center py-20 text-error">{t('hospitalNotFound')}</div>;
  }

  // Filter treatments by search query
  const filteredTreatments = treatments.filter(({ treatment }) => 
    treatment.name.toLowerCase().includes(treatmentSearch.toLowerCase()) ||
    treatment.code.toLowerCase().includes(treatmentSearch.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative h-80 md:h-96 rounded-[2.5rem] overflow-hidden shadow-xl">
         <img 
            src={hospital.image || `https://ui-avatars.com/api/?name=${hospital.name}&background=random&size=1024`} 
            alt={hospital.name} 
            className="w-full h-full object-cover"
            onError={(e) => {e.currentTarget.src = `https://ui-avatars.com/api/?name=${hospital.name}&background=random&size=1024`}}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="bg-primary-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Hospital</span>
                        {hospital.is_nabh && <span className="bg-white/20 text-white backdrop-blur-md border border-white/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">NABH Accredited</span>}
                        <span className="bg-emerald-500/90 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                          🛡️ {schemes.length} Schemes Accepted
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white font-heading mb-2 leading-tight">{hospital.name}</h1>
                    <p className="text-gray-300 text-lg flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                        {hospital.address}, {hospital.city}, {hospital.state}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 min-w-[80px]">
                        <p className="text-2xl font-bold text-white">{Number(hospital.rating || 0).toFixed(1)}</p>
                        <p className="text-xs text-gray-300 uppercase tracking-wider font-bold">Rating</p>
                    </div>
                     <div className="text-center bg-primary-blue/90 backdrop-blur-md border border-blue-400/30 rounded-2xl p-3 min-w-[80px]">
                        <p className="text-2xl font-bold text-white">{hospital.total_beds}</p>
                        <p className="text-xs text-blue-100 uppercase tracking-wider font-bold">Total Beds</p>
                    </div>
                </div>
            </div>
         </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {bedStatus && <BedStatusTile status={bedStatus} />}

          {/* Accepted Health Schemes Showcase */}
          <div className="bg-bg-secondary rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">🛡️</span>
                  <h2 className="text-2xl font-extrabold font-heading text-text-primary">Accepted Health Schemes ({schemes.length})</h2>
                </div>
                <p className="text-sm text-text-secondary">
                  Eligible patients can receive cashless admissions, diagnostics, and surgical treatments under these empanelled government programs:
                </p>
              </div>
              <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 self-start md:self-auto shrink-0 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Cashless Desk Active
              </span>
            </div>

            {schemes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schemes.map((s) => (
                  <div 
                    key={s.id}
                    onClick={() => setSelectedSchemeCode(s.code)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      selectedSchemeCode === s.code 
                        ? 'border-primary-blue bg-blue-50/50 dark:bg-blue-950/30 shadow-md ring-2 ring-primary-blue/20' 
                        : 'border-gray-200/80 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40 hover:border-primary-blue/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 text-xs font-black bg-primary-blue text-white rounded-md">
                          {s.code}
                        </span>
                        <span className="text-xs font-extrabold text-text-muted">
                          {s.government_level || 'Central'} Scheme
                        </span>
                      </div>
                      <h3 className="font-extrabold text-base text-text-primary mb-1 leading-snug">{s.name}</h3>
                      <p className="text-xs text-text-secondary line-clamp-2 mb-3 leading-relaxed">{s.description}</p>
                    </div>

                    <div className="pt-3 border-t border-gray-200/60 dark:border-gray-800 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Annual Max Limit</p>
                        <p className="text-lg font-black text-primary-green dark:text-green-400">
                          {s.coverage_limit > 0 ? `₹${s.coverage_limit.toLocaleString('en-IN')}` : 'Comprehensive'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSchemeCode(s.code);
                        }}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                          selectedSchemeCode === s.code
                            ? 'bg-primary-blue text-white'
                            : 'bg-white dark:bg-gray-800 text-primary-blue border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {selectedSchemeCode === s.code ? 'Selected ✓' : 'Check Coverage →'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl text-center border border-amber-100 dark:border-amber-900/50">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                  This hospital accepts general billing and major private insurance TPAs.
                </p>
              </div>
            )}
          </div>

          {/* Services and Costs with Scheme Calculator */}
          <div className="bg-bg-secondary rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold font-heading text-text-primary">{t('servicesAndCosts')}</h2>
              <p className="text-xs text-text-secondary mt-1">
                Explore treatments, estimated package prices, and calculate what is covered under your government health scheme.
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 px-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('treatments')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'treatments' ? 'border-primary-blue text-primary-blue' : 'border-transparent text-text-secondary hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
                  >
                    {t('treatments')} & Surgeries ({treatments.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('consultations')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'consultations' ? 'border-primary-blue text-primary-blue' : 'border-transparent text-text-secondary hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
                  >
                    {t('consultationsAndCheckups')}
                  </button>
                </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'treatments' && (
                <div className="space-y-4">
                  {/* Scheme Calculator Controls */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="w-full md:w-auto flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Calculate Under:</span>
                      <button
                        onClick={() => setSelectedSchemeCode('ALL')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selectedSchemeCode === 'ALL'
                            ? 'bg-primary-blue text-white shadow-sm'
                            : 'bg-white dark:bg-gray-800 text-text-secondary border border-gray-200 dark:border-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        All Schemes
                      </button>
                      {schemes.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedSchemeCode(s.code)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            selectedSchemeCode === s.code
                              ? 'bg-primary-blue text-white shadow-sm'
                              : 'bg-white dark:bg-gray-800 text-text-secondary border border-gray-200 dark:border-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {s.code}
                        </button>
                      ))}
                      <button
                        onClick={() => setSelectedSchemeCode('NONE')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selectedSchemeCode === 'NONE'
                            ? 'bg-secondary-orange text-white shadow-sm'
                            : 'bg-white dark:bg-gray-800 text-text-secondary border border-gray-200 dark:border-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Private (No Scheme)
                      </button>
                    </div>

                    <div className="w-full md:w-60">
                      <input
                        type="text"
                        placeholder="Search treatments..."
                        value={treatmentSearch}
                        onChange={(e) => setTreatmentSearch(e.target.value)}
                        className="w-full px-3.5 py-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      />
                    </div>
                  </div>

                  {/* Treatments Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <tr>
                          <th scope="col" className="px-5 py-3.5 text-left text-xs font-bold text-text-secondary uppercase tracking-wider rounded-l-lg">{t('treatment')}</th>
                          <th scope="col" className="px-5 py-3.5 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">{t('estimatedCost')}</th>
                          <th scope="col" className="px-5 py-3.5 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">
                            {selectedSchemeCode === 'NONE' ? 'Insurance / Private' : `Scheme Coverage (${selectedSchemeCode})`}
                          </th>
                          <th scope="col" className="px-5 py-3.5 text-left text-xs font-bold text-text-secondary uppercase tracking-wider rounded-r-lg">{t('outOfPocket')}</th>
                        </tr>
                      </thead>
                      <tbody className="bg-bg-secondary divide-y divide-gray-100 dark:divide-gray-700/50">
                        {filteredTreatments.map(({ treatment, details }) => {
                          const isNoScheme = selectedSchemeCode === 'NONE';
                          const effectiveCoverageLimit = isNoScheme ? 0 : details.scheme_coverage_limit;
                          const outOfPocket = isNoScheme ? details.estimated_cost : Math.max(0, details.estimated_cost - details.scheme_coverage_limit);
                          const isFullyCovered = !isNoScheme && outOfPocket === 0;

                          return (
                            <tr key={treatment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                              <td className="px-5 py-4 whitespace-nowrap">
                                <p className="text-sm font-bold text-text-primary">{treatment.name}</p>
                                <span className="text-[10px] text-text-muted font-bold tracking-wider">{treatment.code}</span>
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap text-sm text-text-secondary">
                                ₹{details.estimated_cost.toLocaleString('en-IN')}
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap text-sm">
                                {isNoScheme ? (
                                  <span className="text-text-muted font-semibold text-xs">Self-pay / Cash</span>
                                ) : details.scheme_covered ? (
                                  <div className="flex flex-col">
                                    <span className="text-success font-bold text-xs">
                                      Covers up to ₹{details.scheme_coverage_limit.toLocaleString('en-IN')}
                                    </span>
                                    <span className="text-[10px] text-text-muted font-semibold">
                                      Under {selectedSchemeCode === 'ALL' ? (hospital.schemes_accepted?.[0] || 'Empanelled Scheme') : selectedSchemeCode}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-error font-bold text-xs">{t('notCovered')}</span>
                                )}
                              </td>
                              <td className="px-5 py-4 whitespace-nowrap text-sm">
                                {isFullyCovered ? (
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-base font-black text-success">₹0</span>
                                    <span className="bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-300 text-[10px] px-2 py-0.5 rounded-full font-black border border-green-200 dark:border-green-800">
                                      100% Cashless
                                    </span>
                                  </div>
                                ) : (
                                  <span className="font-extrabold text-secondary-orange text-sm">
                                    ₹{outOfPocket.toLocaleString('en-IN')}
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-blue-50/60 dark:bg-blue-900/20 p-3.5 rounded-xl border border-blue-100 dark:border-blue-800/50 flex items-start gap-2 text-xs text-text-secondary">
                    <span className="text-base">ℹ️</span>
                    <p>
                      <strong>Cashless Claim Process:</strong> Carry your Ration Card or Ayushman Bharat Golden Card with photo ID to the Arogya Mitra desk on the Ground Floor before admission. The hospital will initiate pre-authorization directly with the government scheme authority.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'consultations' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-lg text-primary-blue dark:text-blue-300 mb-2">{t('generalConsultation')}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">{t('consultationFeeDesc')}</p>
                        </div>
                        <p className="text-3xl font-extrabold text-text-primary mt-6">₹{hospital.consulting_fee.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-800/50 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-lg text-primary-green dark:text-green-300 mb-2">{t('basicHealthCheckup')}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">{t('checkupFeeDesc')}</p>
                        </div>
                        <p className="text-3xl font-extrabold text-text-primary mt-6">₹{hospital.checkup_fee.toLocaleString('en-IN')}</p>
                    </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Reviews */}
          <div className="bg-bg-secondary p-6 rounded-xl shadow-lg border dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 font-heading text-text-primary flex items-center gap-2">
                {t('userReviews')}
                <span className="text-sm font-normal text-text-muted bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">{reviews.length}</span>
            </h2>
            <div className="space-y-6">
              {reviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </div>

          {/* Add Review Form */}
          <div className="bg-bg-secondary p-8 rounded-xl shadow-lg border dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 font-heading text-text-primary">{t('leaveAReview')}</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wider">{t('yourRating')}</label>
                <StarRatingInput rating={newReviewRating} setRating={setNewReviewRating} />
              </div>
              <div className="space-y-2">
                <label htmlFor="reviewTitle" className="block text-sm font-bold text-text-secondary uppercase tracking-wider">{t('title')}</label>
                <input 
                    type="text" 
                    id="reviewTitle" 
                    value={newReviewTitle} 
                    onChange={e => setNewReviewTitle(e.target.value)} 
                    className="block w-full px-4 py-3 rounded-xl border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-blue focus:ring-primary-blue bg-gray-50 dark:bg-gray-800 text-text-primary transition-all outline-none border-2 border-transparent focus:border-primary-blue/50" 
                    placeholder="Summarize your experience"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="reviewBody" className="block text-sm font-bold text-text-secondary uppercase tracking-wider">{t('review')}</label>
                <textarea 
                    id="reviewBody" 
                    value={newReviewBody} 
                    onChange={e => setNewReviewBody(e.target.value)} 
                    rows={4} 
                    className="block w-full px-4 py-3 rounded-xl border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-blue focus:ring-primary-blue bg-gray-50 dark:bg-gray-800 text-text-primary transition-all outline-none border-2 border-transparent focus:border-primary-blue/50"
                    placeholder="Tell us more about the facilities, doctors, and staff..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-xl shadow-lg text-white bg-gradient-to-r from-primary-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue disabled:opacity-70 disabled:cursor-not-allowed transform transition-all hover:-translate-y-1 active:scale-95"
              >
                {isSubmitting ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('submitting')}
                    </span>
                ) : t('submitReview')}
              </button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-1">
            <HospitalSidebar hospital={hospital} />
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailPage;

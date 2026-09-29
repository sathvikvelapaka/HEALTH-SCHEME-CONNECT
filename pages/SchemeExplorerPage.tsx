
import React, { useState, useEffect } from 'react';
import { getSchemes } from '../services/apiService';
import type { Scheme, Page } from '../types';
import SchemeCard from '../components/SchemeCard';
import { useLanguage } from '../contexts/LanguageContext';

interface SchemeExplorerPageProps {
  onNavigate?: (page: Page, params?: any) => void;
}

const SchemeExplorerPage: React.FC<SchemeExplorerPageProps> = ({ onNavigate }) => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState('Hyderabad');
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true);
      const data = await getSchemes();
      setSchemes(data);
      setLoading(false);
    };
    fetchSchemes();
  }, []);

  const filteredSchemes = schemes.filter(scheme => 
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    scheme.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="text-center bg-bg-secondary p-8 rounded-lg shadow-md border dark:border-gray-700">
        <h1 className="text-4xl font-extrabold text-text-primary font-heading">{t('exploreSchemesTitle')}</h1>
        <p className="mt-2 text-lg text-text-secondary max-w-2xl mx-auto">
          {t('exploreSchemesSubtitle')}
        </p>
      </div>

      <div className="bg-bg-secondary p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center border dark:border-gray-700">
        <div className="w-full md:w-1/2">
            <input 
                type="text" 
                placeholder={t('searchByScheme')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-blue bg-bg-primary dark:bg-bg-secondary"
            />
        </div>
        <div className="w-full md:w-1/2">
            <label htmlFor="cityFilter" className="font-semibold text-text-secondary mr-2">{t('showHospitalsIn')}</label>
            <select
                id="cityFilter"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-blue bg-bg-primary dark:bg-bg-secondary font-bold"
              >
                <option value="Hyderabad">Hyderabad (Telangana)</option>
                <option value="Bangalore">Bangalore (Karnataka)</option>
                <option value="Delhi">Delhi (NCR)</option>
                <option value="Mumbai">Mumbai (Maharashtra)</option>
              </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto"></div>
          <p className="mt-4 text-text-secondary">{t('loadingSchemes')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSchemes.map(scheme => (
            <SchemeCard key={scheme.id} scheme={scheme} city={cityFilter} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SchemeExplorerPage;

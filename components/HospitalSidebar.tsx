
import React from 'react';
import type { Hospital } from '../types';
import { LocationPinIcon, PhoneIcon, MailIcon, CertificateIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface HospitalSidebarProps {
  hospital: Hospital;
}

const HospitalSidebar: React.FC<HospitalSidebarProps> = ({ hospital }) => {
  const { t } = useLanguage();
  const lon = hospital.longitude;
  const lat = hospital.latitude;
  // A small bounding box around the hospital coordinates to control the zoom level
  const bbox = `${lon - 0.005},${lat - 0.005},${lon + 0.005},${lat + 0.005}`;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;


  return (
    <aside className="sticky top-24 space-y-6">
      <div className="bg-bg-secondary rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <iframe
          src={mapUrl}
          width="100%"
          height="250"
          className="border-0 dark:filter dark:invert-[1] dark:hue-rotate-[180deg]"
          loading="lazy"
          title={`Map showing location of ${hospital.name}`}
        ></iframe>
        <div className="p-6">
          <h3 className="font-bold text-lg mb-4 font-heading text-text-primary">{t('hospitalInformation')}</h3>
          <ul className="space-y-3 text-text-secondary text-sm">
            <li className="flex items-start">
              <LocationPinIcon className="w-5 h-5 mr-3 mt-0.5 text-primary-blue flex-shrink-0" />
              <span>{hospital.address}, {hospital.city}, {hospital.state} - {hospital.pincode}</span>
            </li>
            <li className="flex items-center">
              <PhoneIcon className="w-5 h-5 mr-3 text-primary-blue" />
              <a href={`tel:${hospital.contact_number}`} className="hover:underline">{hospital.contact_number}</a>
            </li>
            <li className="flex items-center">
              <MailIcon className="w-5 h-5 mr-3 text-primary-blue" />
              <a href={`mailto:${hospital.email}`} className="hover:underline truncate">{hospital.email}</a>
            </li>
            {hospital.is_nabh && (
              <li className="flex items-center">
                <CertificateIcon className="w-5 h-5 mr-3 text-primary-green" />
                <span className="font-semibold text-primary-green">{t('nabhAccredited')}</span>
              </li>
            )}
          </ul>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full inline-block text-center bg-primary-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            {t('getDirections')}
          </a>
        </div>
      </div>

      {/* Scheme Helpdesk & Arogya Mitra Desk */}
      <div className="bg-bg-secondary rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg text-lg">🛡️</span>
          <div>
            <h4 className="font-bold text-sm text-text-primary">Arogya Mitra Scheme Desk</h4>
            <p className="text-[11px] text-text-muted">Ground Floor, Counter #4</p>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
          <p className="text-[11px] font-extrabold text-text-muted uppercase tracking-wider mb-2">Accepted Scheme Cards</p>
          <div className="flex flex-wrap gap-1.5">
            {hospital.schemes_accepted && hospital.schemes_accepted.length > 0 ? (
              hospital.schemes_accepted.map((code) => (
                <span key={code} className="px-2.5 py-1 text-xs font-black bg-blue-50 dark:bg-blue-950 text-primary-blue dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-800">
                  {code}
                </span>
              ))
            ) : (
              <span className="text-xs text-text-muted">No specific schemes listed</span>
            )}
          </div>
        </div>

        <div className="bg-blue-50/70 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-800/40 text-xs text-text-secondary space-y-1.5">
          <p className="font-bold text-primary-blue dark:text-blue-300">Documents needed for Cashless Claim:</p>
          <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
            <li>Aadhaar Card (Patient)</li>
            <li>Ration Card / Ayushman Golden Card</li>
            <li>Doctor's Prescription or Referral</li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default HospitalSidebar;

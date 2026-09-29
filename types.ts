
export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  contact_number: string;
  email: string;
  website?: string;
  image?: string;
  is_nabh: boolean;
  is_nabl?: boolean;
  total_beds: number;
  icu_beds: number;
  available_icu?: number;
  available_general?: number;
  available_maternity?: number;
  specialties?: string[];
  emergency_24x7?: boolean;
  ambulance_available?: boolean;
  rating?: number;
  review_count?: number;
  established_year?: number;
  schemes_accepted?: string[]; // Array of scheme codes
  facilities?: string[];
  consulting_fee: number;
  checkup_fee: number;
}

export interface Scheme {
  id: string;
  code: string;
  name: string;
  name_local?: { [key: string]: string };
  short_name?: string;
  logo_url?: string;
  coverage_limit: number;
  currency?: string;
  government_level?: 'Central' | 'State';
  state?: string;
  launch_year?: number;
  beneficiaries_count?: number;
  description: string;
  description_local?: { [key: string]: string };
  detailed_description?: string;
  eligibility_criteria?: any;
  eligibility: any; // Kept for some backward compatibility if needed.
  covered_treatments?: string[];
  excluded_treatments?: string[];
  claim_process?: string[];
  documents_required?: string[];
  official_website?: string;
  helpline_number?: string;
  mobile_app?: string;
  states_covered?: string[];
  empanelled_hospitals_count?: number;
  claims_processed?: number;
  success_stories_count?: number;
  average_claim_amount?: number;
  cashless?: boolean;
  pre_existing_conditions_covered?: boolean;
  family_floater?: boolean;
  age_limit?: number | null;
}


export interface Treatment {
  id: string;
  code: string;
  name: string;
}

export interface HospitalTreatment {
  hospital_id: string;
  treatment_id: string;
  estimated_cost: number;
  scheme_covered: boolean;
  scheme_coverage_limit: number;
}

export interface Review {
  id: string;
  hospital_id: string;
  user_id: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  created_at?: string;
}

export interface BedStatus {
  hospital_id: string;
  available_icu: number;
  available_general: number;
  available_maternity: number;
  last_updated: string;
}

export interface Empanelment {
  hospital_id: string;
  scheme_id: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'guest';
  avatar?: string;
}

export enum Page {
  HOME = 'HOME',
  SEARCH_RESULTS = 'SEARCH_RESULTS',
  HOSPITAL_DETAIL = 'HOSPITAL_DETAIL',
  SCHEME_EXPLORER = 'SCHEME_EXPLORER',
  COMPARE = 'COMPARE',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
}

export interface AppState {
  currentPage: Page;
  selectedHospitalId: string | null;
  selectedSchemeId: string | null;
  searchQuery: { city: string; scheme: string };
}
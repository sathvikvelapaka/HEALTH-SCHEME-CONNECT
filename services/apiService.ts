
const API_BASE_URL = '/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'API request failed' }));
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

export const searchHospitals = async (city, schemeCode) => {
  const url = new URL(`${window.location.origin}${API_BASE_URL}/hospitals`);
  if (city) url.searchParams.append('city', city);
  if (schemeCode) url.searchParams.append('schemeCode', schemeCode);
  
  const response = await fetch(url.toString());
  return handleResponse(response);
};

export const getHospitalById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/hospitals/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching hospital ${id}:`, error);
    return null;
  }
};

export const getSchemes = async () => {
  const response = await fetch(`${API_BASE_URL}/schemes`);
  return handleResponse(response);
};

export const getSchemesForHospital = async (hospitalId) => {
  // We can get the hospital then filter schemes, or have a dedicated endpoint
  // For "microservices" demonstration, let's assume we have specialized lookups
  const hospital = await getHospitalById(hospitalId);
  if (!hospital || !hospital.schemes_accepted) return [];
  
  const schemes = await getSchemes();
  return schemes.filter(s => hospital.schemes_accepted?.includes(s.code));
};

export const getHospitalsForScheme = async (schemeId, city) => {
  const url = new URL(`${window.location.origin}${API_BASE_URL}/schemes/${schemeId}/hospitals`);
  if (city) url.searchParams.append('city', city);
  
  const response = await fetch(url.toString());
  return handleResponse(response);
};

export const getReviewsForHospital = async (hospitalId) => {
  const response = await fetch(`${API_BASE_URL}/reviews/${hospitalId}`);
  return handleResponse(response);
};

export const getBedStatusForHospital = async (hospitalId) => {
  const response = await fetch(`${API_BASE_URL}/hospitals/${hospitalId}/beds`);
  return handleResponse(response);
};

export const getTreatmentsForHospital = async (hospitalId) => {
  const response = await fetch(`${API_BASE_URL}/hospitals/${hospitalId}/treatments`);
  return handleResponse(response);
};

export const addReview = async (review) => {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  return handleResponse(response);
};

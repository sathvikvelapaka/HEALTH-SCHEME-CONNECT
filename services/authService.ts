
const API_BASE_URL = '/api/auth';
const STORAGE_KEY = 'auth_user';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Auth failed' }));
    throw new Error(error.message || 'Auth failed');
  }
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  const { user, token } = await handleResponse(response);
  // Store user and token
  if (token) localStorage.setItem('auth_token', token);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
};

export const signup = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  
  const { user, token } = await handleResponse(response);
  if (token) localStorage.setItem('auth_token', token);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('auth_token');
};

export const getCurrentUser = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

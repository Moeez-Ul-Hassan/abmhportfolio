import { auth } from './firebase';

// Use the full backend URL for local development
const API_BASE = 'http://localhost:5000/api'; // Change for production if needed

async function getIdToken() {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  return await user.getIdToken();
}

async function apiFetch(url, options = {}) {
  const token = await getIdToken();
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };
  return fetch(API_BASE + url, { ...options, headers });
}

export async function apiGet(url) {
  const res = await apiFetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost(url, data, isForm = false) {
  const options = isForm
    ? { method: 'POST', body: data }
    : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
  const res = await apiFetch(url, options);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPut(url, data, isForm = false) {
  const options = isForm
    ? { method: 'PUT', body: data }
    : { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
  const res = await apiFetch(url, options);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiDelete(url) {
  const res = await apiFetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
} 
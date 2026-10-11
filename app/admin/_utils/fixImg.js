const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function fixImg(url) {
  if (!url) return null;
  const idx = url.indexOf('/media/');
  return idx !== -1 ? `${API}${url.slice(idx)}` : url;
}

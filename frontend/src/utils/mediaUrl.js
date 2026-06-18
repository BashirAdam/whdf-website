const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || '').replace(/\/$/, '');

export const getMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/api/')) return `${BACKEND_URL}${url}`;
  return url;
};
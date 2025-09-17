import { useState, useEffect } from 'react';
export function useThemeStorage(key = 'mini-loja-theme') {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem(key) || 'light'; } catch { return 'light'; }
  });
  useEffect(() => { try { localStorage.setItem(key, theme); } catch {} }, [key, theme]);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return [theme, setTheme];
}

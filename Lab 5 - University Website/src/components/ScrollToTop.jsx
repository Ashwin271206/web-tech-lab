import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Ensures every route change scrolls back to the top smoothly,
// instead of preserving scroll position from the previous page.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

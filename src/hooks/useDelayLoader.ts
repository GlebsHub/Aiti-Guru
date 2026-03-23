
import { useState, useEffect } from 'react';

export const useDelayedLoader = (isLoading: boolean, delay: number = 300): boolean => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isLoading) {
      timer = setTimeout(() => setShowLoader(true), delay);
    } else {
      timer = setTimeout(() => setShowLoader(false), 0);
    }
    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return showLoader;
};
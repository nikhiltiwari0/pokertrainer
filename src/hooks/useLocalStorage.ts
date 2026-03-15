'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom event name for cross-component localStorage sync within the same tab.
 * The native `storage` event only fires across tabs.
 */
const SYNC_EVENT = 'local-storage-sync';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Write to localStorage whenever state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // localStorage full or unavailable
    }
  }, [key, storedValue]);

  // Listen for sync events from other hook instances on the same page
  useEffect(() => {
    const handleSync = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.key !== key) return;
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch {
        // ignore parse errors
      }
    };

    // Same-tab sync
    window.addEventListener(SYNC_EVENT, handleSync);
    // Cross-tab sync
    window.addEventListener('storage', (e) => {
      if (e.key === key && e.newValue) {
        try { setStoredValue(JSON.parse(e.newValue)); } catch { /* ignore */ }
      }
    });

    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync);
    };
  }, [key]);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const nextValue = value instanceof Function ? value(prev) : value;
      // After React state updates, notify other hook instances
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: { key } }));
      }, 0);
      return nextValue;
    });
  }, [key]);

  return [storedValue, setValue];
}

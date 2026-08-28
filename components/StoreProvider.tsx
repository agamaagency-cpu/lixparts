"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface StoreState {
  favorites: string[];
  compare: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isComparing: (id: string) => boolean;
  clearCompare: () => void;
}

const StoreContext = createContext<StoreState | null>(null);

const FAV_KEY = "lix_favorites";
const CMP_KEY = "lix_compare";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const f = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
      const c = JSON.parse(localStorage.getItem(CMP_KEY) || "[]");
      if (Array.isArray(f)) setFavorites(f);
      if (Array.isArray(c)) setCompare(c);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem(CMP_KEY, JSON.stringify(compare));
  }, [compare, ready]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  }, []);

  const value = useMemo<StoreState>(
    () => ({
      favorites,
      compare,
      toggleFavorite,
      toggleCompare,
      isFavorite: (id) => favorites.includes(id),
      isComparing: (id) => compare.includes(id),
      clearCompare: () => setCompare([]),
    }),
    [favorites, compare, toggleFavorite, toggleCompare]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    // Безопасный фолбэк вне провайдера
    return {
      favorites: [],
      compare: [],
      toggleFavorite: () => {},
      toggleCompare: () => {},
      isFavorite: () => false,
      isComparing: () => false,
      clearCompare: () => {},
    };
  }
  return ctx;
}

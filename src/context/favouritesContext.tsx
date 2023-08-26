// context/FavoritesContext.tsx
import { getArrayFromLocalStorage } from "@/utils/localStorage";
import React, { createContext, useEffect, useState } from "react";

interface FavoritesContextValue {
  favorites: number[];
  addFavorite: (contact: number) => void;
  removeFavorite: (id: number) => void;
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
}

export const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(getArrayFromLocalStorage("favourites")!);
  }, []);

  const addFavorite = (contact: number) => {
    setFavorites([...favorites, contact]);
  };

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((contactId) => contactId !== id));
  };

  const contextValue: FavoritesContextValue = {
    favorites,
    addFavorite,
    removeFavorite,
    setFavorites,
  };

  return <FavoritesContext.Provider value={contextValue}>{children}</FavoritesContext.Provider>;
};

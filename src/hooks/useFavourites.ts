import { FavoritesContext } from "@/context/favouritesContext";
import { useContext } from "react";

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavoritesContext must be used within a FavoritesProvider");
  }
  return context;
};

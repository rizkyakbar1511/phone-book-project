// SearchContext.tsx
import React, { createContext, useState } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const contextValue = {
    searchQuery,
    setSearchQuery,
  };

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};

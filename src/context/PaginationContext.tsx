import React, { createContext, useState } from "react";

interface PaginationContextType {
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (perPage: number) => void;
}

export const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

interface PaginationProviderProps {
  children: React.ReactNode;
}

export const PaginationProvider: React.FC<PaginationProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const contextValue: PaginationContextType = {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
  };

  return <PaginationContext.Provider value={contextValue}>{children}</PaginationContext.Provider>;
};

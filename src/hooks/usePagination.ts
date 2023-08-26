import { PaginationContext } from "@/context/PaginationContext";
import { useContext } from "react";

const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};

export default usePagination;

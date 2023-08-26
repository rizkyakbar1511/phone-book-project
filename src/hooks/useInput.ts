import { InputContext } from "@/context/InputContext";
import { useContext } from "react";

const useInput = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInputContext must be used within a ContextProvider");
  }
  return context;
};

export default useInput;

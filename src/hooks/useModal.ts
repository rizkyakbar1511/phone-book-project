import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

export default useModal;

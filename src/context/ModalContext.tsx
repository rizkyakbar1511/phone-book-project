import React, { createContext, useState } from "react";

interface ModalState {
  [modalId: string]: boolean;
}

interface ModalContextType {
  modals: ModalState;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<ModalState>({});

  const openModal = (modalId: string) => {
    setModals((prevModals) => ({ ...prevModals, [modalId]: true }));
  };

  const closeModal = (modalId: string) => {
    setModals((prevModals) => ({ ...prevModals, [modalId]: false }));
  };

  return <ModalContext.Provider value={{ modals, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

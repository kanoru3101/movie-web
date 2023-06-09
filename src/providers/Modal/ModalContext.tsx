import React, { createContext, useContext, useState } from 'react';

type ModalContextProps = {
  isOpen: boolean;
  openModal: (modalContent?: React.ReactNode) => void;
  closeModal: () => void;
  modalContent?: React.ReactNode;
}

export const ModalContext = createContext<ModalContextProps>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});



export const ModalProvider: React.FC<{ children: any }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();

  const openModal = (content?: React.ReactNode) => {
    if (!isOpen) {
      setIsOpen(true);
      if (content) {
        setModalContent(content);
      }
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(undefined);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalContent }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

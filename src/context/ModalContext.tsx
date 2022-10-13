import React, { createContext, useState } from "react";

interface IModalContext {
  isModal: boolean;
  open: () => void;
  close: () => void;
}

export const ModalContext = createContext<IModalContext>({
    isModal: false,
    open: () => {},
    close: () => {}
});

export const ModalState = ({children}: {children: React.ReactNode}) => {

    const [isModal, setIsModal] = useState(false)

    const open = () => {
        setIsModal(true)
    }
    const close = () => {
        setIsModal(false)
    }

    return (
        <ModalContext.Provider value={{isModal, open, close}}>
            {children}
        </ModalContext.Provider>
    )
}
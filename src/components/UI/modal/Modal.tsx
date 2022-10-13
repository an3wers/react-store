import { ReactNode, FC } from "react";

interface ModalProps {
    children: ReactNode
    title: string
    onClose: () => void
}

const Modal: FC<ModalProps> = ({title, onClose, children}) => {

  function closeHandler() {
    onClose()
  }  
    
  return (
    <>
      <div className=" fixed bg-black/50 top-0 right-0 left-0 bottom-0" onClick={closeHandler}></div>
      <div className="w-[560px] p-5 rounded-xl bg-white absolute top-10 left-1/2 -translate-x-1/2 space-y-6">
        <div className="flex justify-between space-x-4">
            <h3 className=" font-bold text-xl">{title}</h3>
            <button type="button" onClick={closeHandler} className="font-bold">✕</button>
        </div>
        <div>
            {children}
        </div>
      </div>
    </>
  );
};

export default Modal;

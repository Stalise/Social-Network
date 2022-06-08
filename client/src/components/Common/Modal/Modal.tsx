import { FC, ReactElement, SyntheticEvent } from "react";

import styles from './Modal.module.scss';

interface IProps {
   children: ReactElement | any,
   isModal: boolean,
   setIsModal: (data: boolean) => void
}

const Modal: FC<IProps> = ({ isModal, setIsModal, children }) => {

   if (isModal === true) {
      document.body.style.overflow = "hidden";
   } else {
      document.body.style.overflow = "visible";
   }

   const closeModal = (e: SyntheticEvent) => {

      const element = e.target as HTMLElement;

      if (element.id === 'modal') {
         setIsModal(!isModal);
      }
   };

   return (
      <div
         onClick={e => closeModal(e)}
         className={`${styles.modalWrapper} ${isModal ? styles._active : ''}`}
         id="modal"
      >
         {children}
      </div>
   );
};

export default Modal;
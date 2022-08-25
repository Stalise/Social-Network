import { FC, ReactElement, SyntheticEvent } from 'react';

import s from './style.module.scss';

interface IProps {
   children: ReactElement | any,
   isModal: boolean,
   setIsModal: (data: boolean) => void
}

export const Modal: FC<IProps> = ({ isModal, setIsModal, children }) => {

   if (isModal === true) {
      document.body.style.overflow = 'hidden';
   } else {
      document.body.style.overflow = 'visible';
   }

   const closeModal = (e: SyntheticEvent) => {

      const element = e.target as HTMLElement;

      if (element.id === 'modal') {
         setIsModal(!isModal);
      }
   };

   return (
      <div
         onClick={ e => closeModal(e) }
         className={ `${s.modalWrapper} ${isModal ? s._active : ''}` }
         id="modal"
      >
         { children }
      </div>
   );
};

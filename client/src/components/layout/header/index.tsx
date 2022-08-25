import { FC } from 'react';
import { Link } from 'react-router-dom';

import { sagaActionCreator, sagasConstantsUser } from 'data/constants/saga';
import { useAppDispatch } from 'hooks/redux';

import { EditingForm } from './editing-form';

import s from './style.module.scss';

export const Header: FC = () => {

   const dispatch = useAppDispatch();

   return (
      <header className={ s.header }>
         <div className={ s.container }>
            <div className={ s.exit }>
               <button
                  onClick={ () => dispatch(sagaActionCreator(sagasConstantsUser.SAGA_LOGOUT_USER)) }
                  type="button"
                  className={ s.exitButton }
               >
                  Exit
               </button>
            </div>

            <Link to="/" className={ s.logo }>
               <div className={ s.logoIcon } />
               <p className={ s.logoText }>Social network</p>
            </Link>

            <EditingForm />
         </div>
      </header>
   );
};

import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { sagaActionCreator, sagasConstantsUser } from 'data/constants/saga';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

import { Loader } from 'components/common/loader';
import { Header } from 'components/layout/header';
import { Navigation } from 'components/layout/navigation';

import 'react-toastify/dist/ReactToastify.css';
import s from './style.module.scss';

export const Layout: FC = () => {

   const { status } = useAppSelector(state => state.userSlice);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(sagaActionCreator(sagasConstantsUser.SAGA_GET_ALL_PARAMS_USER));
   }, []);

   return (
      <div className={ s.wrapper } data-test-id="app-wrapper">
         <Header />
         <div className={ s.main }>
            <div className={ s.mainContainer }>
               <Navigation />

               { status === 'data' && <Loader /> }

               { status === 'ready' && <Outlet /> }
            </div>
         </div>
      </div>
   );
};

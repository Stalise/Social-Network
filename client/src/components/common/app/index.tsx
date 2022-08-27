import { FC, useEffect } from 'react';
import { AppRoutes } from 'routes/app-routes';

import { sagaActionCreator, sagasConstantsUser } from 'data/constants/saga';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

import { Loader } from 'components/common/loader';

import s from './style.module.scss';

export const App: FC = () => {

   const dispatch = useAppDispatch();

   const { status } = useAppSelector(state => state.userSlice);

   useEffect(() => {
      dispatch(sagaActionCreator(sagasConstantsUser.SAGA_CHECK_AUTH));
   }, []);

   if (status === 'pending') {
      return (
         <div className={ s.wrapper } data-test-id="app-wrapper">
            <Loader />
         </div>
      );
   }

   return (
      <AppRoutes />
   );
};

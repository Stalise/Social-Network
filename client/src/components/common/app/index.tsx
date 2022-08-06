import { FC, useEffect } from 'react';

import s from "./style.module.scss";
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { sagasConstantsUser, sagaActionCreator } from "data/constants/saga";

import { AppRoutes } from 'routes/app-routes';
import { Loader } from 'components/common/loader';

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

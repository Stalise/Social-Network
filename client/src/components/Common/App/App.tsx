import { FC, useEffect } from 'react';

import s from "./App.module.scss";
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { sagasConstants, sagaActionCreator } from "mock/constants/saga";

import AppRoutes from 'routes/AppRoutes';
import Loader from '../Loader/Loader';

const App: FC = () => {

   const { status } = useAppSelector(state => state.personSlice);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(sagaActionCreator(sagasConstants.SAGA_CHECK_AUTH));
   }, []);

   if (status === 'pending') {
      return (
         <div className={s.wrapper}>
            <Loader />
         </div>
      );
   }

   return (
      <AppRoutes />
   );
};

export default App;
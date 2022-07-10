import { FC, useEffect } from 'react';

import s from "./App.module.scss";
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { sagasConstantsUser, sagaActionCreator } from "mock/constants/saga";

import AppRoutes from 'routes/AppRoutes';
import Loader from 'components/Common/Loader/Loader';

const App: FC = () => {

   const { status } = useAppSelector(state => state.userSlice);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(sagaActionCreator(sagasConstantsUser.SAGA_CHECK_AUTH));
   }, []);

   if (status === 'pending') {
      return (
         <div className={ s.wrapper }>
            <Loader />
         </div>
      );
   }

   return (
      <AppRoutes />
   );
};

export default App;

import { FC, useEffect } from "react";
import { Outlet } from 'react-router-dom';

import s from "./Layout.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import { sagasConstants, sagaActionCreator } from "mock/constants/saga";
import { useAppDispatch } from "hooks/redux";

import Header from "components/Layout/Header/Header";
import Navigation from "components/Layout/Navigation/Navigation";

const Layout: FC = () => {

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(sagaActionCreator(sagasConstants.SAGA_GET_USER_DATA));
      dispatch(sagaActionCreator(sagasConstants.SAGA_GET_USER_POSTS));
   }, []);

   return (
      <div className={s.wrapper}>
         <Header />
         <div className={s.main}>
            <div className={s.mainContainer}>
               <Navigation />
               <Outlet />
            </div>
         </div>
      </div>
   );
};

export default Layout;
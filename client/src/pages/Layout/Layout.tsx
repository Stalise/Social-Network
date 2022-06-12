import { FC, useEffect } from "react";
import { Outlet } from 'react-router-dom';

import s from "./Layout.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import { sagasConstantsUser, sagaActionCreator } from "mock/constants/saga";
import { useAppDispatch, useAppSelector } from "hooks/redux";

import Header from "components/Layout/Header/Header";
import Navigation from "components/Layout/Navigation/Navigation";
import Loader from "components/Common/Loader/Loader";

const Layout: FC = () => {

   const { status } = useAppSelector(state => state.userSlice);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(sagaActionCreator(sagasConstantsUser.SAGA_GET_ALL_PARAMS_USER));
   }, []);

   return (
      <div className={s.wrapper}>
         <Header />
         <div className={s.main}>
            <div className={s.mainContainer}>
               <Navigation />

               {status === "data" && <Loader />}

               {status === "ready" && <Outlet />}
            </div>
         </div>
      </div>
   );
};

export default Layout;
import { FC, useEffect } from "react";
import { Outlet } from 'react-router-dom';

import s from "./style.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import { sagasConstantsUser, sagaActionCreator } from "data/constants/saga";
import { useAppDispatch, useAppSelector } from "hooks/redux";

import { Header } from "components/layout/header";
import { Navigation } from "components/layout/navigation";
import { Loader } from "components/common/loader";

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

               { status === "data" && <Loader /> }

               { status === "ready" && <Outlet /> }
            </div>
         </div>
      </div>
   );
};

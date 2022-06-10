import { FC, useState } from "react";

import s from "./AuthPage.module.scss";
import { useAppSelector } from "hooks/redux";
import { KeyType } from "types/helpers";

import Intro from "components/AuthPage/Intro/Intro";
import RegForm from "components/AuthPage/RegForm/RegForm";
import AuthForm from "components/AuthPage/AuthForm/AuthForm";
import Loader from "components/Common/Loader/Loader";

interface ITabs extends KeyType<boolean> {
   register: boolean,
   auth: boolean,
}

const AuthPage: FC = () => {

   const { status } = useAppSelector(state => state.userSlice);

   const [tabsState, tabsStateHandler] = useState<ITabs>({
      register: true,
      auth: false,
   });

   const tabsHandler = (tab: string): void => {
      const tabsFake: ITabs = { register: false, auth: false };
      tabsFake[tab] = true;

      tabsStateHandler(tabsFake);
   };

   return (
      <div className={s.wrapper}>
         <div className={s.container}>
            <Intro />

            <div className={s.tabs}>
               <button className={s.tabsReg} onClick={() => tabsHandler('register')}>Register</button>
               <button className={s.tabsAuth} onClick={() => tabsHandler('auth')}>Sign in</button>
            </div>

            {status === "auth"
               ?
               <Loader />
               :
               <div className={s.forms}>
                  <RegForm tabStatus={tabsState.register} />

                  <AuthForm tabStatus={tabsState.auth} />
               </div>
            }
         </div>
      </div>
   );
};

export default AuthPage;
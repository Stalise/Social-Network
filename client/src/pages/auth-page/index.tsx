import { FC, useState } from "react";

import s from "./style.module.scss";
import { useAppSelector } from "hooks/redux";
import { KeyType } from "types/helpers";

import { Intro } from "components/auth-page/intro";
import { RegForm } from "components/auth-page/reg-form";
import { AuthForm } from "components/auth-page/auth-form";
import { Loader } from "components/common/loader";

interface ITabs extends KeyType<boolean> {
   register: boolean,
   auth: boolean,
}

export const AuthPage: FC = () => {

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
      <div className={ s.wrapper } data-test-id="auth-page">
         <div className={ s.container }>
            <Intro />

            <div className={ s.tabs }>
               <button className={ s.tabsReg } onClick={ () => tabsHandler('register') }>Register</button>
               <button className={ s.tabsAuth } onClick={ () => tabsHandler('auth') }>Sign in</button>
            </div>

            { status === "auth"
               ?
               <Loader />
               :
               <div className={ s.forms }>
                  <RegForm tabStatus={ tabsState.register } />

                  <AuthForm tabStatus={ tabsState.auth } />
               </div>
            }
         </div>
      </div>
   );
};

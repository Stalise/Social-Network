import { FC, useState } from 'react';

import { useAppSelector } from 'hooks/redux';
import { TabsType } from 'types/common';

import { AuthForm } from 'components/auth-page/auth-form';
import { Intro } from 'components/auth-page/intro';
import { RegForm } from 'components/auth-page/reg-form';
import { Tabs } from 'components/auth-page/tabs';
import { Loader } from 'components/common/loader';

import s from './style.module.scss';

const TabsComponents = {
   'tab-1': <RegForm />,
   'tab-2': <AuthForm />,
};

export const AuthPage: FC = () => {

   const { status } = useAppSelector(state => state.userSlice);

   const [activeTab, setActiveTab] = useState<TabsType>('tab-1');

   return (
      <section className={ s.wrapper } data-test-id="auth-page">
         <div className={ s.container }>
            <Intro />

            <Tabs activeTab={ activeTab } setActiveTab={ setActiveTab } />

            { status === 'auth'
               ?
               <Loader />
               :
               <div className={ s.forms }>
                  { TabsComponents[activeTab] }
               </div>
            }
         </div>
      </section>
   );
};

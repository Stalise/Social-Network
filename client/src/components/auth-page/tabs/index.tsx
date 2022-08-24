import { FC } from 'react';

import s from "./style.module.scss";
import { TabsType } from 'types/common';

interface IProps {
   activeTab: TabsType,
   setActiveTab: (arg: TabsType) => void
}

export const Tabs: FC<IProps> = ({ activeTab, setActiveTab }) => {

   return (
      <div className={ s.wrapper }>
         <button
            onClick={ () => setActiveTab('tab-1') }
            className={ `${s.tab} ${activeTab === 'tab-1' && s._active}` }
         >
            Register
         </button>

         <button
            onClick={ () => setActiveTab('tab-2') }
            className={ `${s.tab} ${activeTab === 'tab-2' && s._active}` }
         >
            Sign in
         </button>
      </div>
   );
};

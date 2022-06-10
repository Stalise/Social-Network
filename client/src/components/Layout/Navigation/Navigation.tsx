import { FC } from "react";
import { Link } from "react-router-dom";

import s from "./Navigation.module.scss";
import { navigationItems } from "mock/navigationMock";

const Navigation: FC = () => {

   return (
      <aside className={s.navigation}>
         <ul className={s.list}>
            {navigationItems.map(elem => {
               return (
                  <li className={s.listItem} key={elem}>
                     <Link to={elem} className={s.listLink}></Link>
                  </li>
               );
            })}
         </ul>
      </aside>
   );
};

export default Navigation;
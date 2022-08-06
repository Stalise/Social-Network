import { FC } from "react";
import { Link } from "react-router-dom";

import s from "./style.module.scss";
import { navigationItems } from "data/navigation";

export const Navigation: FC = () => (
   <aside className={ s.navigation }>
      <ul className={ s.list }>
         { navigationItems.map(elem => (
            <li className={ s.listItem } key={ elem }>
               <Link className={ s.listLink } to={ elem } />
            </li>
         )) }
      </ul>
   </aside>
);

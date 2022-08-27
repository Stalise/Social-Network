import { FC } from 'react';
import { Link } from 'react-router-dom';

import { navigationItems } from 'data/navigation';

import s from './style.module.scss';

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

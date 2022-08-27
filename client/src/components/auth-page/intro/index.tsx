import { FC } from 'react';

import s from './style.module.scss';

export const Intro: FC = () => (
   <div className={ s.wrapper }>
      <p className={ s.title }>Welcome to</p>
      <div className={ s.logo }>
         <div className={ s.logoIcon } />
         <p className={ s.logoText }>Social network</p>
      </div>
   </div>
);

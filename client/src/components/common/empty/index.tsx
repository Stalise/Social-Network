import { FC } from 'react';

import s from './style.module.scss';

interface IProps {
   title?: string,
   image?: string,
}

export const Empty: FC<IProps> = ({ title, image }) => (
   <div className={ s.wrapper }>
      <div className={ s.imageContainer }>
         <img src={ `./images/${image}` } className={ s.image } alt="empty" />
      </div>
      <p className={ s.title }>{ title }</p>
   </div>
);

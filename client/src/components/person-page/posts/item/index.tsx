import { FC } from 'react';

import { IPost } from 'types/common';

import { Heart } from './Heart';
import { Image } from './image';

import s from './style.module.scss';

interface IProps {
   data: IPost,
}

export const Item: FC<IProps> = ({ data }) => (
   <div className={ s.wrapper }>
      <div className={ s.top }>
         <div className={ s.data }>{ data.date }</div>
      </div>
      <div className={ s.content }>
         <p className={ s.text }>{ data.text }</p>
         { data.img && <Image image={ data.img }/> }
      </div>
      <div className={ s.bottom }>
         <Heart data={ data } />
      </div>
   </div>
);

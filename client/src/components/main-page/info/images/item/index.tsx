import { FC } from 'react';

import { Urls } from 'data/constants/api';

import s from './style.module.scss';

interface IProps {
   url: string,
   index: number,
   lightboxHandler: (arg: number) => void,
}

export const Item: FC<IProps> = ({ url, index, lightboxHandler }) => (
   <div className={ s.wrapper }>
      <img
         className={ s.image }
         src={ `${Urls.cloudinary_url}${url}` }
         onClick={ () => lightboxHandler(index) }
         alt="gallery-pic"
      />
   </div>
);

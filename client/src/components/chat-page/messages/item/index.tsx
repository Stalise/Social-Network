import { FC, memo } from 'react';

import { Urls } from 'data/constants/api';
import { getTime } from 'helpers/common';
import { IMessage } from 'types/common';

import s from './style.module.scss';

interface IProps {
   data: IMessage,
}

export const Item: FC<IProps> = memo(({ data }) => {
   const { avatar, date, text, name, surname } = data;

   return (
      <>
         <div className={ s.wrapper }>
            <div className={ s.imageContainer }>
               <img
                  className={ s.image }
                  src={ `${Urls.cloudinary_url}${avatar}` }
                  alt="avatar" />
            </div>
            <div className={ s.content }>
               <div className={ s.info }>
                  <p className={ s.fullname }>{ `${name} ${surname}` }</p>
                  <p className={ s.time }>{ getTime(date) }</p>
               </div>
               <p className={ s.text }>{ text }</p>
            </div>
         </div>
      </>
   );
});

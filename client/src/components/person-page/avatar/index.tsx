import { FC, useState } from 'react';
import LightBox from 'fslightbox-react';

import { Urls } from 'data/constants/api';
import { useAppSelector } from 'hooks/redux';

import s from './style.module.scss';

export const Avatar: FC = () => {

   const { avatar } = useAppSelector(state => state.personSlice.data);

   const [toggler, setToggler] = useState<boolean>(false);

   const lightboxHandler = () => {
      setToggler(!toggler);
   };

   return (
      <div className={ s.wrapper }>
         <img
            className={ s.image }
            src={ `${Urls.cloudinary_url}${avatar}` }
            onClick={ lightboxHandler }
            alt="avatar"
         />

         <LightBox
            toggler={ toggler }
            sources={ [`${Urls.cloudinary_url}${avatar}`] }
         />
      </div>
   );
};

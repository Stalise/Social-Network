import { FC, useState } from 'react';
import LightBox from 'fslightbox-react';

import { Urls } from 'data/constants/api';

import s from './style.module.scss';

interface IProps {
   image: string,
}

export const Image: FC<IProps> = ({ image }) => {

   const [toggler, setToggler] = useState<boolean>(false);

   const lightboxHandler = () => {
      setToggler(!toggler);
   };

   return (
      <div className={ s.wrapper }>
         <img
            src={ `${Urls.cloudinary_url}${image}` }
            alt="post"
            onClick={ lightboxHandler }
            className={ s.image }
         />

         <LightBox
            toggler={ toggler }
            sources={ [`${Urls.cloudinary_url}${image}`] }
         />
      </div>
   );
};

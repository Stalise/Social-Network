import { FC, useState } from "react";
import LightBox from 'fslightbox-react';

import s from "./style.module.scss";
import { useAppSelector } from "hooks/redux";
import { Urls } from "data/constants/api";

export const Avatar: FC = () => {

   const { avatar } = useAppSelector(state => state.userSlice.data);

   const [toggler, setToggler] = useState<boolean>(false);

   const lightboxHandler = () => {
      setToggler(!toggler);
   };

   return (
      <div className={ s.avatar }>
         <img
            className={ s.avatarImage }
            src={ `${Urls.cloudinary_url}${avatar}` }
            onClick={ lightboxHandler }
            alt="user_avatar"
         />

         <LightBox
            toggler={ toggler }
            sources={ [`${Urls.cloudinary_url}${avatar}`] }
         />
      </div>
   );
};

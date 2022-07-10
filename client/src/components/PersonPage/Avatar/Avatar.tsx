import { FC } from "react";

import s from "./Avatar.module.scss";
import { Urls } from "mock/constants/api";
import { useAppSelector } from "hooks/redux";

const Avatar: FC = () => {

   const { avatar } = useAppSelector(state => state.personSlice.data);

   return (
      <div className={ s.avatar }>
         <img src={ `${Urls.cloudinary_url}${avatar}` } className={ s.avatarImage } alt="avatar" />
      </div>
   );
};

export default Avatar;

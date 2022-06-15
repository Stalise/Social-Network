import { FC } from "react";

import s from "./Info.module.scss";
import { Urls } from "mock/constants/api";
import { IChat } from "types/common";

interface IProps {
   chat: IChat,
}

const Info: FC<IProps> = ({ chat }) => {

   return (
      <div className={s.wrapper}>
         <div className={s.imageContainer}>
            <img src={`${Urls.cloudinary_url}${chat.avatar}`} className={s.image} alt="avatar" />
         </div>
         <div className={s.name}>
            <p className={s.forename}>{chat.forename}</p>
            <p className={s.surname}>{chat.surname}</p>
         </div>
      </div>
   );
};

export default Info;
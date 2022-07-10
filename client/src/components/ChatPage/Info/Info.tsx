import { FC } from "react";
import { useParams } from "react-router-dom";

import s from "./Info.module.scss";
import { useAppSelector } from "hooks/redux";
import { Urls } from "mock/constants/api";
import { IChat } from "types/common";

const Info: FC = () => {

   const params = useParams();
   const chat: IChat = useAppSelector(state => state.chatsSlice.chats.filter(elem => elem.id === Number(params.id))[0]);

   return (
      <div className={ s.wrapper }>
         <div className={ s.imageContainer }>
            <img src={ `${Urls.cloudinary_url}${chat.avatar}` } className={ s.image } alt="avatar" />
         </div>
         <div className={ s.name }>
            <p className={ s.forename }>{ chat.forename }</p>
            <p className={ s.surname }>{ chat.surname }</p>
         </div>
      </div>
   );
};

export default Info;

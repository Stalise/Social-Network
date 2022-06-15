import { FC, MouseEvent } from "react";
import { Link } from "react-router-dom";

import s from "./Chat.module.scss";
import { Urls } from "mock/constants/api";
import { sagasConstantsChat, sagaActionCreator } from "mock/constants/saga";
import { IChat } from "types/common";
import { useAppDispatch } from "hooks/redux";

interface IProps {
   data: IChat,
}

const Chat: FC<IProps> = ({ data }) => {

   const dispatch = useAppDispatch();

   const deleteHandler = (e: MouseEvent) => {
      e.preventDefault();
      dispatch(sagaActionCreator<number>(sagasConstantsChat.SAGA_DELETE_CHAT, data.id));
   };

   return (

      <Link to={`/chat/${data.id}`} className={s.link}>
         <div className={s.wrapper}>
            <div className={s.content}>
               <div className={s.imageContainer}>
                  <img src={`${Urls.cloudinary_url}${data.avatar}`} className={s.image} alt="avatar" />
               </div>
               {!data.messages.length
                  ?
                  <p className={s.fullname}>{`${data.forename} ${data.surname}`}</p>
                  :
                  <div className={s.text}>
                     <p className={s.name}>
                        {`${data.messages[data.messages.length - 1]?.name} ${data.messages[data.messages.length - 1]?.surname}`}:
                     </p>
                     <span className={s.message}>
                        {data.messages[data.messages.length - 1]?.text ? data.messages[data.messages.length - 1]?.text : ""}
                     </span>
                  </div>
               }
            </div>
            <div className={s.info}>
               <p className={s.date}>{data.messages[0]?.date ? data.messages[0].date : ""}</p>
               <div onClick={deleteHandler} className={s.delete} />
            </div>
         </div >
      </Link>
   );
};

export default Chat;
import { FC, memo } from "react";
import { Link, useNavigate, NavigateFunction } from "react-router-dom";

import s from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Urls } from "data/constants/api";
import { sagasConstantsFriend, sagasConstantsChat, sagaActionCreator } from "data/constants/saga";
import { ICreateChatPayload } from "types/sagas/chat";
import { IFriend } from "types/common";

interface IProps {
   data: IFriend,
}

export const Item: FC<IProps> = memo(({ data }) => {

   const dispatch = useAppDispatch();
   const navigate: NavigateFunction = useNavigate();

   const { chats, status } = useAppSelector(state => state.chatsSlice);

   const deleteHandler = () => {
      dispatch(sagaActionCreator<string>(sagasConstantsFriend.SAGA_DELETE_FRIEND, data.username));
   };

   const writeHandler = () => {
      const chat = chats.filter(elem => elem.username === data.username);

      if (chat.length) {
         navigate(`/chat/${chat[0].id}`);
      } else {
         dispatch(sagaActionCreator<ICreateChatPayload>(sagasConstantsChat.SAGA_CREATE_CHAT, { person_username: data.username, navigate }));
      }
   };

   return (
      <div className={ s.wrapper }>
         <div className={ s.content }>
            <Link to={ `/${data.username}` } className={ s.link }>
               <div className={ s.avatar }>
                  <img src={ `${Urls.cloudinary_url}${data.avatar}` } alt="avatar" className={ s.avatarImage }/>
               </div>
            </Link>
            <div className={ s.text }>
               <div className={ s.name }>
                  <p className={ s.forename }>{ data.name }</p>
                  <p className={ s.surname }>{ data.surname }</p>
               </div>
               <button
                  onClick={ writeHandler }
                  type="button"
                  className={ `${s.write} ${ status === "create" && s._pending}` }
               >
                  Write
               </button>
            </div>
         </div>
         <div onClick={ deleteHandler } className={ s.delete } />
      </div>
   );
});

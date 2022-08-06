import { FC, useLayoutEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import s from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { sagasConstantsFriend, sagasConstantsChat, sagaActionCreator } from "data/constants/saga";
import { FriendStatusType } from "types/common";
import { ICreateChatPayload } from "types/sagas/chat";

export const Actions: FC = () => {

   const dispatch = useAppDispatch();
   const navigate: NavigateFunction = useNavigate();

   const { friends } = useAppSelector(state => state.friendsSlice);
   const person_username = useAppSelector(state => state.personSlice.data.username);
   const { chats } = useAppSelector(state => state.chatsSlice);

   const [status, setStatus] = useState<FriendStatusType>("no");

   const friendHandler = () => {
      if (status === "friend" || status === "sent") return;

      if (status === "no") {
         dispatch(sagaActionCreator<string>(sagasConstantsFriend.SAGA_CREATE_FRIEND, person_username));
      } else if (status === "request") {
         dispatch(sagaActionCreator<string>(sagasConstantsFriend.SAGA_ACCEPT_FRIEND, person_username));
      }
   };

   const writeHandler = () => {
      const chat = chats.filter(elem => elem.username === person_username);

      if (chat.length) {
         navigate(`/chat/${chat[0].id}`);
      } else {
         dispatch(sagaActionCreator<ICreateChatPayload>(sagasConstantsChat.SAGA_CREATE_CHAT, { person_username, navigate }));
      }
   };

   useLayoutEffect(() => {
      const checkStatus = friends.filter(elem => elem.username === person_username);

      if (checkStatus.length) {
         setStatus(checkStatus[0].status);
      } else {
         setStatus("no");
      }

   }, [friends]);

   return (
      <div className={ s.wrapper }>
         <button onClick={ writeHandler } type="button" className={ s.write }>Write</button>

         <button
            onClick={ friendHandler }
            type="button"
            className={ `
               ${s.add}
               ${status === "friend" ? s._friend : ""}
               ${status === "request" ? s._request : ""}
               ${status === "sent" ? s._sent : ""}
            ` }
         />
      </div>
   );
};

import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import s from "./ChatPage.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { sagasConstantsChat, sagaActionCreator } from "mock/constants/saga";
import { IChat } from "types/common";

import Info from "components/ChatPage/Info/Info";
import Messages from "components/ChatPage/Messages/Messages";
import Write from "components/ChatPage/Write/Write";

const ChatPage: FC = () => {

   const params = useParams();
   const dispatch = useAppDispatch();
   const controller = new AbortController();
   const chat: IChat = useAppSelector(state => state.chatsSlice.chats.filter(elem => elem.id === Number(params.id))[0]);


   useEffect(() => {
      dispatch(sagaActionCreator<{ chat_id: number, controller: any }>(sagasConstantsChat.SAGA_GET_MESSAGE, { chat_id: chat.id, controller }));

      return () => {
         controller.abort();
      };
   }, []);

   return (
      <div className={s.wrapper}>
         <Info />

         <Messages />

         <Write />
      </div>
   );
};

export default ChatPage;
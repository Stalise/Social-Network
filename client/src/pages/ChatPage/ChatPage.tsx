import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import s from "./ChatPage.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { sagasConstantsChat, sagaActionCreator } from "mock/constants/saga";
import { IChat } from "types/common";

import Empty from "components/ChatPage/Empty/Empty";
import Info from "components/ChatPage/Info/Info";
import Message from "components/ChatPage/Message/Message";
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
         <Info chat={chat} />

         {!chat.messages.length && <Empty />}

         {chat.messages.length > 0 &&
            <>
               {chat.messages.map(elem => {
                  return <Message data={elem} key={elem.id} />;
               })}
            </>
         }
         <Write chat={chat} />
      </div>
   );
};

export default ChatPage;
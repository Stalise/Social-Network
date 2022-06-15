import { FC } from "react";
import { useParams } from "react-router-dom";

import s from "./ChatPage.module.scss";
import { useAppSelector } from "hooks/redux";
import { IChat } from "types/common";

import Empty from "components/ChatPage/Empty/Empty";
import Info from "components/ChatPage/Info/Info";
import Message from "components/ChatPage/Message/Message";
import Write from "components/ChatPage/Write/Write";

const ChatPage: FC = () => {

   const params = useParams();

   const chat: IChat = useAppSelector(state => state.chatsSlice.chats.filter(elem => elem.id === Number(params.id))[0]);

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
         <Write />
      </div>
   );
};

export default ChatPage;
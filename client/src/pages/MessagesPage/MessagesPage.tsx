import { FC } from "react";

import s from "./MessagesPage.module.scss";

import Chat from "components/MessagesPage/Chat/Chat";
import Empty from "components/MessagesPage/Empty/Empty";
import { useAppSelector } from "hooks/redux";

const MessagesPage: FC = () => {

   const { chats } = useAppSelector(state => state.chatsSlice);

   return (
      <div className={s.wrapper}>
         <p className={s.title}>My chats</p>

         {!chats.length && <Empty />}

         {chats.length > 0 &&
            <>
               {chats.map(elem => {
                  return <Chat data={elem} key={elem.id} />;
               })}
            </>
         }
      </div>
   );
};

export default MessagesPage;
import { FC, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import s from "./Messages.module.scss";
import { useAppSelector } from "hooks/redux";
import { IChat } from "types/common";

import Empty from "./Empty/Empty";
import Item from "./Item/Item";

const Messages: FC = () => {

   const params = useParams();
   const ref = useRef<HTMLDivElement | null>(null);
   const chat: IChat = useAppSelector(state => state.chatsSlice.chats.filter(elem => elem.id === Number(params.id))[0]);

   // двигаем скролл в самый низ сообщений
   useLayoutEffect(() => {
      if (ref.current) {
         ref.current.scrollTop = ref.current.scrollHeight;
      }
   }, []);

   return (
      <div className={s.wrapper} ref={ref}>
         {!chat.messages.length && <Empty />}

         {chat.messages.length > 0 &&
            <>
               {chat.messages.map(elem => {
                  return <Item data={elem} key={elem.id} />;
               })}
            </>
         }
      </div>
   );
};

export default Messages;
import { FC, Fragment, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { getHeight, sortMessagesWithDate } from 'helpers/messages';
import { useAppSelector } from 'hooks/redux';
import { IChat } from 'types/common';

import { Empty } from 'components/common/empty';

import { Item } from './item';

import s from './style.module.scss';

export const Messages: FC = () => {
   const params = useParams();
   const ref = useRef<HTMLDivElement | null>(null);
   const { messages }: IChat = useAppSelector(state => state.chatsSlice.chats.filter(chat => chat.id === Number(params.id))[0]);

   const sortedMessages = useMemo(() => sortMessagesWithDate(messages), [messages.length]);
   const sortedMessagesKeys = useMemo(() => Object.keys(sortedMessages), [sortedMessages]);

   // двигаем скролл в самый низ сообщений
   useEffect(() => {
      if (ref.current) {
         ref.current.scrollTop = getHeight(ref.current);
      }
   }, [getHeight(ref.current)]);

   return (
      <div className={ s.wrapper } ref={ ref }>
         { !messages.length && <Empty title="Start communicating 😉" image="write.png" /> }

         { messages.length > 0 &&
            <>
               {
                  sortedMessagesKeys.map(section => {
                     return (
                        <Fragment key={ section }>
                           <div className={ s.date } >
                              { section }
                           </div>

                           { sortedMessages[section].map(message => {

                              return <Item data={ message } key={ message.id } />;
                           }) }
                        </Fragment>
                     );
                  })
               }
            </>
         }
      </div>
   );
};

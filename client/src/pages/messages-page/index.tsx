import { FC, useEffect } from 'react';

import { sagaActionCreator, sagasConstantsChat } from 'data/constants/saga';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

import { Empty } from 'components/common/empty';
import { Loader } from 'components/common/loader';
import { Chat } from 'components/messages-page/chat';

import s from './style.module.scss';

export const MessagesPage: FC = () => {

   const dispatch = useAppDispatch();

   const { chats, status } = useAppSelector(state => state.chatsSlice);

   useEffect(() => {
      dispatch(sagaActionCreator(sagasConstantsChat.SAGA_GET_CHATS));
   }, []);

   return (
      <div className={ s.wrapper }>
         <p className={ s.title }>My chats</p>

         { status === 'pending' && <Loader /> }

         { status !== 'pending' &&
            <div className={ s.container }>
               { !chats.length && <Empty title="No messages yet 🙁" image="messages_icon.png" /> }

               { chats.length > 0 &&
                  <>
                     { chats.map(elem => (
                        <Chat data={ elem } key={ elem.id } />
                     )) }
                  </>
               }
            </div>
         }
      </div>
   );
};

import { FC, useEffect } from 'react';
import { Params, useParams } from 'react-router-dom';

import { sagaActionCreator, sagasConstantsChat } from 'data/constants/saga';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IChat } from 'types/common';
import { IGetMessagePayload } from 'types/sagas/chat';

import { Info } from 'components/chat-page/info';
import { Messages } from 'components/chat-page/messages';
import { Write } from 'components/chat-page/write';

import s from './style.module.scss';

export const ChatPage: FC = () => {

   const params: Params = useParams();
   const dispatch = useAppDispatch();
   const controller: AbortController = new AbortController();

   const chat: IChat = useAppSelector(state => state.chatsSlice.chats.filter(elem => elem.id === Number(params.id))[0]);

   useEffect(() => {
      dispatch(
         sagaActionCreator<IGetMessagePayload>(sagasConstantsChat.SAGA_GET_MESSAGE, { chat_id: chat.id, controller }),
      );

      return () => {
         controller.abort();
      };
   }, []);

   return (
      <div className={ s.wrapper }>
         <Info />

         <Messages />

         <Write />
      </div>
   );
};

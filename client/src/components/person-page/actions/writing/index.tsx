import { FC } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { sagaActionCreator, sagasConstantsChat } from 'data/constants/saga';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ICreateChatPayload } from 'types/sagas/chat';

import s from './style.module.scss';

export const Writing: FC = () => {

   const dispatch = useAppDispatch();
   const navigate: NavigateFunction = useNavigate();

   const person_username = useAppSelector(state => state.personSlice.data.username);
   const { chats, status } = useAppSelector(state => state.chatsSlice);

   const writeHandler = () => {
      const chat = chats.filter(elem => elem.username === person_username);

      if (chat.length) {
         navigate(`/chat/${chat[0].id}`);
      } else {
         dispatch(sagaActionCreator<ICreateChatPayload>(sagasConstantsChat.SAGA_CREATE_CHAT, { person_username, navigate }));
      }
   };

   return (
      <button
         onClick={ writeHandler }
         type="button"
         className={ `${s.write} ${ status === 'create' && s._pending}` }
      >
         Write
      </button>
   );
};

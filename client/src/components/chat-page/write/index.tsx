import { FC, KeyboardEvent, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { sagaActionCreator, sagasConstantsChat } from 'data/constants/saga';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IChat } from 'types/common';
import { ICreateMessagePayload } from 'types/sagas/chat';
import { changeTextareaHeight } from 'utils';
import { handleDate } from 'utils/handle-date';

import { FieldOverflowType } from './types';

import s from './style.module.scss';

export const Write: FC = () => {

   const params = useParams();
   const dispatch = useAppDispatch();
   const cloneField = useRef<HTMLDivElement | null>(null);

   const [fieldOverflow, setFieldOverflow] = useState<FieldOverflowType>('hidden');
   const [heightField, setHeightField] = useState<number>(45);
   const [text, setText] = useState<string>('');

   const chat: IChat = useAppSelector(state => state.chatsSlice.chats.filter(elem => elem.id === Number(params.id))[0]);
   const { status } = useAppSelector(state => state.chatsSlice);

   const writeHandler = () => {
      if (!text.trim().trim().length) return;

      const messageData: ICreateMessagePayload = {
         text,
         date: handleDate(),
         chat_id: chat.id,
      };

      dispatch(sagaActionCreator<ICreateMessagePayload>(sagasConstantsChat.SAGA_CREATE_MESSAGE, messageData));
      setText('');
   };

   const pressEnterHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter') {
         // preventDefault() отменяет перенос на другую строку при нажатии на Enter
         event.preventDefault();
         writeHandler();
      };
   };

   useLayoutEffect(() => {
      const cloneCurrentHeight = cloneField.current?.offsetHeight;

      // если при ввооде сообщения высота блока-клона становится больше чем textarea, то меняем высоту textarea
      if (cloneCurrentHeight !== undefined && cloneCurrentHeight !== heightField) {
         changeTextareaHeight(cloneCurrentHeight, setHeightField, setFieldOverflow, 220, 45);
      }
   });

   return (
      <div className={ s.wrapper }>
         <div className={ s.text }>
            <textarea
               className={ `${s.textField} ${fieldOverflow === 'auto' ? s._auto : ''}` }
               onChange={ e => setText(e.target.value) }
               value={ text }
               onKeyDown={ pressEnterHandler }
               placeholder="Write something..."
               style={{ height: heightField + 'px' }}
            >
            </textarea>

            <div ref={ cloneField } className={ s.textFieldClone }>{ text }</div>
         </div>

         <button
            onClick={ writeHandler }
            className={ `${s.send} ${status === 'message' ? s._active : ''}` }
            disabled={ status === 'message' ? true : false }
            type="button">
            Send
         </button>
      </div>
   );
};

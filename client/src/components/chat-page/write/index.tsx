import { FC, useState, useLayoutEffect, useRef, KeyboardEvent } from "react";
import { useParams } from "react-router-dom";

import s from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { heightHandler } from "helpers/post";
import { dateHandler } from "helpers/common";
import { sagasConstantsChat, sagaActionCreator } from "data/constants/saga";
import { IChat } from "types/common";
import { FieldOverflowType } from "./types";
import { ICreateMessagePayload } from "types/sagas/chat";

export const Write: FC = () => {

   const params = useParams();
   const dispatch = useAppDispatch();
   const cloneField = useRef<HTMLDivElement | null>(null);

   const [fieldOverflow, setFieldOverflow] = useState<FieldOverflowType>("hidden");
   const [heightField, setHeightField] = useState<number>(45);
   const [text, setText] = useState<string>("");

   const chat: IChat = useAppSelector(state => state.chatsSlice.chats.filter(elem => elem.id === Number(params.id))[0]);
   const { status } = useAppSelector(state => state.chatsSlice);

   const writeHandler = () => {
      if (!text.length) return;

      const messageData: ICreateMessagePayload = {
         text,
         date: dateHandler(),
         chat_id: chat.id,
      };

      dispatch(sagaActionCreator<ICreateMessagePayload>(sagasConstantsChat.SAGA_CREATE_MESSAGE, messageData));
      setText("");
   };

   const pressEnterHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter" && text.length) {
         event.preventDefault();
         writeHandler();
      };
   };

   useLayoutEffect(() => {
      const cloneCurrentHeight = cloneField.current?.offsetHeight;

      // если при вооде сообщения высота блока-клона становится больше чем textarea, то меняем высоту textarea
      if (cloneCurrentHeight !== undefined && cloneCurrentHeight !== heightField) {
         heightHandler(cloneCurrentHeight, heightField, setHeightField, setFieldOverflow, 220, 45);
      }
   });

   return (
      <div className={ s.wrapper }>
         <div className={ s.text }>
            <textarea
               className={ `${s.textField} ${fieldOverflow === "auto" ? s._auto : ""}` }
               onChange={ e => setText(e.target.value) }
               value={ text }
               onKeyDown={ pressEnterHandler }
               placeholder="Write something..."
               style={{ height: heightField + "px" }}
            >
            </textarea>

            <div ref={ cloneField } className={ s.textFieldClone }>{ text }</div>
         </div>

         <button
            onClick={ writeHandler }
            className={ `${s.send} ${status === "message" ? s._active : ""}` }
            disabled={ status === "message" ? true : false }
            type="button">
            Send
         </button>
      </div>
   );
};

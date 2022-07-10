import { FC, useState, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import s from "./Write.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { heightHandler } from "helpers/postHelpers";
import { dateHandler } from "helpers/commonHelpers";
import { sagasConstantsChat, sagaActionCreator } from "mock/constants/saga";
import { IChat } from "types/common";
import { FieldOverflowType, IPayloadCreateMessage } from "./types";

const Write: FC = () => {

   const params = useParams();
   const dispatch = useAppDispatch();
   const chat: IChat = useAppSelector(state => state.chatsSlice.chats.filter(elem => elem.id === Number(params.id))[0]);
   const { status } = useAppSelector(state => state.chatsSlice);
   const cloneField = useRef<HTMLDivElement | null>(null);

   const [fieldOverflow, setFieldOverflow] = useState<FieldOverflowType>("hidden");
   const [heightField, setHeightField] = useState<number>(45);
   const [text, setText] = useState<string>("");

   const writeHandler = () => {
      if (!text.length) return;

      const messageData: IPayloadCreateMessage = {
         text,
         date: dateHandler(),
         user_username: chat.username,
         chat_id: chat.id,
      };

      dispatch(sagaActionCreator<IPayloadCreateMessage>(sagasConstantsChat.SAGA_CREATE_MESSAGE, messageData));
      setText("");
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

export default Write;

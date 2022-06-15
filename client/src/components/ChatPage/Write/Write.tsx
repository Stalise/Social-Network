import { FC, useState, useLayoutEffect, useRef } from "react";

import s from "./Write.module.scss";
import { heightHandler } from "helpers/postHelpers";

export type FieldOverflowType = "hidden" | "auto";

const Write: FC = () => {

   const cloneField = useRef<HTMLDivElement | null>(null);

   const [fieldOverflow, setFieldOverflow] = useState<FieldOverflowType>("hidden");
   const [heightField, setHeightField] = useState<number>(45);
   const [text, setText] = useState<string>("");

   useLayoutEffect(() => {
      const cloneCurrentHeight = cloneField.current?.offsetHeight;

      if (cloneCurrentHeight !== undefined && cloneCurrentHeight !== heightField) {
         heightHandler(cloneCurrentHeight, heightField, setHeightField, setFieldOverflow, 220, 45);
      }
   });

   return (
      <div className={s.wrapper}>
         <div className={s.text}>
            <textarea
               className={`${s.textField} ${fieldOverflow === "auto" ? s._auto : ""}`}
               onChange={e => setText(e.target.value)}
               value={text}
               placeholder="Write something..."
               style={{ height: heightField + "px" }}
            >
            </textarea>

            <div ref={cloneField} className={s.textFieldClone}>{text}</div>
         </div>

         <button className={s.send} type="button">Send</button>
      </div>
   );
};

export default Write;
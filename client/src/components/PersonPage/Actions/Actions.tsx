import { FC } from "react";

import s from "./Actions.module.scss";

const Actions: FC = () => {

   return (
      <div className={s.wrapper}>
         <button type="button" className={s.write}>Write</button>
         <button type="button" className={s.add}></button>
      </div>
   );
};

export default Actions;
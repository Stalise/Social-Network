import { FC } from "react";

import s from "./Empty.module.scss";

const Empty: FC = () => {

   return (
      <div className={s.wrapper}>
         <div className={s.imageContainer}>
            <img src="./images/img_571116.png" className={s.image} alt="empty" />
         </div>
         <p className={s.title}>No messages yet 🙁</p>
      </div>
   );
};

export default Empty;
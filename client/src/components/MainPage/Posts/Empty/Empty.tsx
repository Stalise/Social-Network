import { FC } from "react";

import s from "./Empty.module.scss";

const Empty: FC = () => {

   return (
      <div className={ s.empty }>
         <div className={ s.iconContainer }>
            <img src="./images/write.png" className={ s.icon } alt="empty" />
         </div>
         <p className={ s.title }>No posts yet 🙁</p>
      </div>
   );
};

export default Empty;

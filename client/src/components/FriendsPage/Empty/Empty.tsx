import { FC } from "react";

import s from "./Empty.module.scss";

const Empty: FC = () => {

   return (
      <div className={ s.wrapper }>
         <div className={ s.imageContainer }>
            <img src="./images/frinbed.png" className={ s.image } alt="empty" />
         </div>
         <p className={ s.title }>No friends yet 🙁</p>
      </div>
   );
};

export default Empty;

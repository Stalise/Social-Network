import { FC } from "react";

import s from "./Intro.module.scss";

const Intro: FC = () => {

   return (
      <div className={s.wrapper}>
         <p className={s.title}>Welcome to</p>
         <div className={s.logo}>
            <div className={s.logoIcon}></div>
            <p className={s.logoText}>Social network</p>
         </div>
      </div>
   );
};

export default Intro;
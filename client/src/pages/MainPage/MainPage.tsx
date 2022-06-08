import { FC } from "react";

import s from "./MainPage.module.scss";

import Avatar from "components/MainPage/Avatar/Avatar";
import UserInfo from "components/MainPage/UserInfo/UserInfo";

const MainPage: FC = () => {

   return (
      <div className={s.wrapper}>
         <div className={s.info}>
            <Avatar />
            <UserInfo />
         </div>
         <div className="page__bottom-container">
            {/* <NewPost
               setAllPosts={setAllPosts}
            /> */}
            {/* <AllPosts
               allPosts={allPosts}
               setAllPosts={setAllPosts}
            /> */}
         </div>
      </div>
   );
};

export default MainPage;
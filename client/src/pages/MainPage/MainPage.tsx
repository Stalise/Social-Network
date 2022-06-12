import { FC } from "react";

import s from "./MainPage.module.scss";

import Avatar from "components/MainPage/Avatar/Avatar";
import UserInfo from "components/MainPage/UserInfo/UserInfo";
import NewPost from "components/MainPage/NewPost/NewPost";
import Posts from "components/MainPage/Posts/Posts";

const MainPage: FC = () => {

   return (
      <div className={s.wrapper}>
         <div className={s.info}>
            <Avatar />
            <UserInfo />
         </div>
         <div>
            <NewPost />
            <Posts />
         </div>
      </div>
   );
};

export default MainPage;
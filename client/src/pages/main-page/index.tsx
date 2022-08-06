import { FC } from "react";

import s from "./style.module.scss";

import { Avatar } from "components/main-page/avatar";
import { NewPost } from "components/main-page/new-post";
import { UserInfo } from "components/main-page/info";
import { Posts } from "components/main-page/posts";

export const MainPage: FC = () => (
   <div className={ s.wrapper } data-test-id="main-page">
      <div className={ s.info }>
         <Avatar />
         <UserInfo />
      </div>
      <div>
         <NewPost />
         <Posts />
      </div>
   </div>
);

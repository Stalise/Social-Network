import { FC } from 'react';

import { Avatar } from 'components/main-page/avatar';
import { UserInfo } from 'components/main-page/info';
import { NewPost } from 'components/main-page/new-post';
import { Posts } from 'components/main-page/posts';

import s from './style.module.scss';

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

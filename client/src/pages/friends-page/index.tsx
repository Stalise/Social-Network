import { FC } from "react";

import s from "./style.module.scss";
import { useAppSelector } from "hooks/redux";

import { Empty } from "components/common/empty";
import { Friends } from "components/friends-page/friends";
import { Requests } from "components/friends-page/requests";
import { Sents } from "components/friends-page/sents";

export const FriendsPage: FC = () => {

   const allFriends = useAppSelector(state => state.friendsSlice.friends);

   return (
      <div className={ s.wrapper }>
         <p className={ s.title }>My friends</p>

         { !allFriends.length && <Empty title="No friends yet 🙁" image="frinbed.png" /> }

         <div className={ s.container }>
            <Requests />

            <Sents />

            <Friends />
         </div>
      </div >
   );
};

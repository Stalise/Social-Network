import { FC, useLayoutEffect, useState } from "react";

import s from "./FriendsPage.module.scss";
import { useAppSelector } from "hooks/redux";
import { IFriend } from "types/common";

import Empty from "components/FriendsPage/Empty/Empty";
import Friends from "components/FriendsPage/Friends/Friends";
import Requests from "components/FriendsPage/Requests/Requests";

const FriendsPage: FC = () => {

   const allFriends = useAppSelector(state => state.userSlice.friends);

   const [friends, setFriends] = useState<IFriend[]>([]);
   const [requests, setRequests] = useState<IFriend[]>([]);

   useLayoutEffect(() => {
      setFriends(allFriends.filter(elem => elem.status === "friend"));
      setRequests(allFriends.filter(elem => elem.status === "request"));

   }, [allFriends]);

   return (
      <div className={ s.wrapper }>
         <p className={ s.title }>My friends</p>

         { !allFriends.length && <Empty /> }

         <div className={ s.container }>
            { requests.length > 0 && <Requests data={ requests } /> }

            { friends.length > 0 && <Friends data={ friends } /> }
         </div>
      </div >
   );
};

export default FriendsPage;

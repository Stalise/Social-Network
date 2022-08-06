import { FC, useMemo } from "react";

import { useAppSelector } from "hooks/redux";

import { Item } from "./item";

export const Friends: FC = () => {

   const allFriends = useAppSelector(state => state.friendsSlice.friends);

   const friends = useMemo(() => {
      return allFriends.filter(elem => elem.status === "friend");
   }, [allFriends]);

   if (!friends.length) {
      return null;
   }

   return (
      <div>
         { friends.map(elem => (
            <Item data={ elem } key={ elem.username } />
         )) }
      </div>
   );
};

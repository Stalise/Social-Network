import { FC, useMemo } from "react";

import s from "./style.module.scss";

import { Item } from "./item";
import { useAppSelector } from "hooks/redux";

export const Requests: FC = () => {

   const allFriends = useAppSelector(state => state.friendsSlice.friends);

   const requests = useMemo(() => {
      return allFriends.filter(elem => elem.status === "request");
   }, [allFriends]);

   if (!requests.length) {
      return null;
   }

   return (
      <div className={ s.wrapper }>
         <p className={ s.title }>Friend requests</p>

         { requests.map(elem => (
            <Item data={ elem } key={ elem.username } />
         )) }
      </div>
   );
};

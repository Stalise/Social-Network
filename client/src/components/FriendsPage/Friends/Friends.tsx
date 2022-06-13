import { FC } from "react";

import { IFriend } from "types/common";

import User from "./User/User";

interface IProps {
   data: IFriend[],
}

const Friends: FC<IProps> = ({ data }) => {

   return (
      <div>
         {data.map(elem => <User data={elem} key={elem.username} />)}
      </div>
   );
};

export default Friends;
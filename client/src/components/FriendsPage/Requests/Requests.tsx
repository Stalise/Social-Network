import { FC } from "react";

import s from "./Requests.module.scss";
import { IFriend } from "types/common";

import User from "./User/User";

interface IProps {
   data: IFriend[],
}

const Requests: FC<IProps> = ({ data }) => {

   return (
      <div className={ s.wrapper }>
         <p className={ s.title }>Friend requests</p>

         { data.map(elem => <User data={ elem } key={ elem.username } />) }
      </div>
   );
};

export default Requests;

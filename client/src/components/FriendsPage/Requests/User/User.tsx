import { FC, memo } from "react";
import { Link } from "react-router-dom";

import s from "./User.module.scss";
import { useAppDispatch } from "hooks/redux";
import { Urls } from "mock/constants/api";
import { sagasConstantsFriend, sagaActionCreator } from "mock/constants/saga";
import { IFriend } from "types/common";

interface IProps {
   data: IFriend,
}

type ActionsType = "accept" | "reject";

const User: FC<IProps> = ({ data }) => {

   const dispatch = useAppDispatch();

   const actionsHandler = (arg: ActionsType) => {
      if (arg === "accept") {
         dispatch(sagaActionCreator<string>(sagasConstantsFriend.SAGA_ACCEPT_FRIEND, data.username));
      } else if (arg === "reject") {
         dispatch(sagaActionCreator<string>(sagasConstantsFriend.SAGA_DELETE_FRIEND, data.username));
      }
   };

   return (
      <div className={s.wrapper}>
         <Link to={`/${data.username}`} className={s.link}>
            <div className={s.avatar}>
               <img src={`${Urls.cloudinary_url}${data.avatar}`} className={s.avatarImage} alt="avatar" />
            </div>
         </Link>
         <div className={s.content}>
            <div className={s.name}>
               <p className={s.forename}>{data.name}</p>
               <p className={s.surname}>{data.surname}</p>
            </div>
            <div className={s.actions}>
               <button onClick={() => actionsHandler("accept")} type="button" className={s.accept}>Accept</button>
               <button onClick={() => actionsHandler("reject")} type="button" className={s.reject}>Reject</button>
            </div>
         </div>
      </div>
   );
};

export default memo(User);
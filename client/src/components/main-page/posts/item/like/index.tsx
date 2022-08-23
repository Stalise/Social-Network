import { FC } from "react";

import s from "./style.module.scss";
import { useAppDispatch } from "hooks/redux";
import { sagasConstantsPosts, sagaActionCreator } from "data/constants/saga";
import { IPost, ILike } from "types/common";

interface IProps {
   data: IPost,
}

export const Like: FC<IProps> = ({ data }) => {

   const dispatch = useAppDispatch();

   const clickHandler = () => {
      const likeData: ILike = {
         username: data.user_username,
         postId: data.id,
      };

      if (!data.isLike) {
         dispatch(sagaActionCreator<ILike>(sagasConstantsPosts.SAGA_USER_POST_CREATE_LIKE, likeData));
      } else {
         dispatch(sagaActionCreator<ILike>(sagasConstantsPosts.SAGA_USER_POST_DELETE_LIKE, likeData));
      }
   };

   return (
      <div className={ s.wrapper }>
         <div onClick={ clickHandler } className={ `${s.icon} ${data.isLike ? s._active : ""}` }></div>
         <div className={ s.number }>{ data.likes }</div>
      </div>
   );
};

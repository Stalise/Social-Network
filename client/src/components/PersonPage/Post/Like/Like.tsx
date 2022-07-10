import { FC } from "react";

import s from "./Like.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { sagaActionCreator, sagasConstantsPerson } from "mock/constants/saga";
import { IPost, ILike } from "types/common";

interface IProps {
   postData: IPost
}

const Like: FC<IProps> = ({ postData }) => {

   const dispatch = useAppDispatch();
   const { username } = useAppSelector(state => state.userSlice.data);

   const clickHandler = () => {
      const likeData: ILike = {
         username,
         postId: postData.id,
      };

      if (!postData.isLike) {
         dispatch(sagaActionCreator<ILike>(sagasConstantsPerson.SAGA_PERSON_POST_CREATE_LIKE, likeData));
      } else {
         dispatch(sagaActionCreator<ILike>(sagasConstantsPerson.SAGA_PERSON_POST_DELETE_LIKE, likeData));
      }
   };

   return (
      <div className={ s.wrapper }>
         <div onClick={ clickHandler } className={ `${s.icon} ${postData.isLike ? s._active : ""}` }></div>
         <div className={ s.number }>{ postData.likes }</div>
      </div>
   );
};

export default Like;

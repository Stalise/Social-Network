import { FC } from "react";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { sagaActionCreator, sagasConstantsPerson } from "data/constants/saga";
import { IPost, ILike } from "types/common";

import s from "./style.module.scss";

interface IProps {
   data: IPost,
}

export const Heart: FC<IProps> = ({ data }) => {

   const dispatch = useAppDispatch();

   const { username } = useAppSelector(state => state.userSlice.data);

   const clickHandler = () => {
      const likeData: ILike = {
         username,
         postId: data.id,
      };

      if (!data.isLike) {
         dispatch(sagaActionCreator<ILike>(sagasConstantsPerson.SAGA_PERSON_POST_CREATE_LIKE, likeData));
      } else {
         dispatch(sagaActionCreator<ILike>(sagasConstantsPerson.SAGA_PERSON_POST_DELETE_LIKE, likeData));
      }
   };

   return (
      <div className={ s.wrapper }>
         <div
            onClick={ clickHandler }
            className={ `${s.icon} ${data.isLike ? s._active : ""}` }
         />
         <div className={ s.number }>
            { data.likes }
         </div>
      </div>
   );
};

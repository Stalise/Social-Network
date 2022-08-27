import { FC } from 'react';

import { sagaActionCreator, sagasConstantsPosts } from 'data/constants/saga';
import { useAppDispatch } from 'hooks/redux';
import { ILike, IPost } from 'types/common';

import s from './style.module.scss';

interface IProps {
   data: IPost,
}

export const Heart: FC<IProps> = ({ data }) => {

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
         <div onClick={ clickHandler } className={ `${s.icon} ${data.isLike ? s._active : ''}` }></div>
         <div className={ s.number }>{ data.likes }</div>
      </div>
   );
};

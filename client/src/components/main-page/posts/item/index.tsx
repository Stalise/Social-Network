import { FC } from 'react';

import { sagaActionCreator, sagasConstantsPosts } from 'data/constants/saga';
import { useAppDispatch } from 'hooks/redux';
import { IPost } from 'types/common';

import { Image } from './image';
import { Like } from './Like';

import s from './style.module.scss';

interface IProps {
   data: IPost,
}

export const Item: FC<IProps> = ({ data }) => {

   const dispatch = useAppDispatch();

   const deleteHandler = () => {
      dispatch(sagaActionCreator<number>(sagasConstantsPosts.SAGA_USER_DELETE_POST, data.id));
   };

   return (
      <div className={ s.wrapper }>
         <div className={ s.top }>
            <div className={ s.data }>{ data.date }</div>
            <div onClick={ deleteHandler } className={ s.delete }/>
         </div>
         <div className={ s.content }>
            <p className={ s.text }>{ data.text }</p>
            { data.img && <Image image={ data.img }/> }
         </div>
         <div className={ s.bottom }>
            <Like data={ data } />
         </div>
      </div>
   );
};

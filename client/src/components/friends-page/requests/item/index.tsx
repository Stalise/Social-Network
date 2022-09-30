import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { Urls } from 'data/constants/api';
import { sagaActionCreator, sagasConstantsFriend } from 'data/constants/saga';
import { useAppDispatch } from 'hooks/redux';
import { IFriend } from 'types/common';

import s from './style.module.scss';

interface IProps {
   data: IFriend,
}

type ActionsType = 'accept' | 'reject';

export const Item: FC<IProps> = memo(({ data }) => {

   const dispatch = useAppDispatch();

   const actionsHandler = (arg: ActionsType) => {
      if (arg === 'accept') {
         dispatch(sagaActionCreator<string>(sagasConstantsFriend.SAGA_ACCEPT_FRIEND, data.username));
      } else if (arg === 'reject') {
         dispatch(sagaActionCreator<string>(sagasConstantsFriend.SAGA_DELETE_FRIEND, data.username));
      }
   };

   return (
      <div className={ s.wrapper }>
         <Link to={ `/person/${data.username}` } className={ s.link }>
            <div className={ s.avatar }>
               <img src={ `${Urls.cloudinary_url}${data.avatar}` } className={ s.avatarImage } alt="avatar" />
            </div>
         </Link>
         <div className={ s.content }>
            <div className={ s.name }>
               <p className={ s.forename }>{ data.name }</p>
               <p className={ s.surname }>{ data.surname }</p>
            </div>
            <div className={ s.actions }>
               <button onClick={ () => actionsHandler('accept') } type="button" className={ s.accept }>Accept</button>
               <button onClick={ () => actionsHandler('reject') } type="button" className={ s.reject }>Reject</button>
            </div>
         </div>
      </div>
   );
});

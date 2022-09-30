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

export const Item: FC<IProps> = memo(({ data }) => {

   const dispatch = useAppDispatch();

   const actionsHandler = () => {
      dispatch(sagaActionCreator<string>(sagasConstantsFriend.SAGA_DELETE_FRIEND, data.username));
   };

   return (
      <div className={ s.wrapper }>
         <Link to={ `/person/${data.username}` } className={ s.link }>
            <div className={ s.avatar }>
               <img
                  className={ s.avatarImage }
                  src={ `${Urls.cloudinary_url}${data.avatar}` }
                  alt="avatar"
               />
            </div>
         </Link>
         <div className={ s.content }>
            <div className={ s.name }>
               <p className={ s.forename }>{ data.name }</p>
               <p className={ s.surname }>{ data.surname }</p>
            </div>
            <div className={ s.actions }>
               <button
                  className={ s.reject }
                  onClick={ actionsHandler }
                  type="button"
               >
                  Cancel
               </button>
            </div>
         </div>
      </div>
   );
});

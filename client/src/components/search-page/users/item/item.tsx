import { FC } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

import { Urls } from 'data/constants/api';
import { sagaActionCreator, sagasConstantsChat } from 'data/constants/saga';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ISearchUser } from 'types/common';
import { ICreateChatPayload } from 'types/sagas/chat';

import s from './style.module.scss';

interface IProps {
   data: ISearchUser;
}

export const Item: FC<IProps> = ({ data }) => {

   const dispatch = useAppDispatch();
   const navigate: NavigateFunction = useNavigate();

   const { chats, status } = useAppSelector(state => state.chatsSlice);

   const writeHandler = () => {
      const chat = chats.filter(elem => elem.username === data.username);

      if (chat.length) {
         navigate(`/chat/${chat[0].id}`);
      } else {
         dispatch(sagaActionCreator<ICreateChatPayload>(sagasConstantsChat.SAGA_CREATE_CHAT, { person_username: data.username, navigate }));
      }
   };

   return (
      <div className={ s.wrapper }>
         <div className={ s.nameContainer }>
            <p className={ s.forename }>{ data.name }</p>
            <p className={ s.surname }>{ data.surname }</p>
         </div>
         <Link to={ `/person/${data.username}` }>
            <div className={ s.avatarContainer }>
               <img className={ s.avatar } src={ `${Urls.cloudinary_url}${data.avatar}` } alt="avatar"/>
            </div>
         </Link>
         <button className={ `${s.message} ${status === 'create' && s._create}` } onClick={ writeHandler }>
            Write
         </button>
      </div>
   );
};

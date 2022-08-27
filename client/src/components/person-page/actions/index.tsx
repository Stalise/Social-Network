import { FC, useLayoutEffect, useState } from 'react';

import { sagaActionCreator, sagasConstantsFriend } from 'data/constants/saga';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { FriendStatusType } from 'types/common';

import { Writing } from './writing';

import s from './style.module.scss';

export const Actions: FC = () => {

   const dispatch = useAppDispatch();

   const { friends } = useAppSelector(state => state.friendsSlice);
   const person_username = useAppSelector(state => state.personSlice.data.username);

   const [status, setStatus] = useState<FriendStatusType>('no');

   const friendHandler = () => {
      if (status === 'friend' || status === 'sent') return;

      if (status === 'no') {
         dispatch(sagaActionCreator<string>(sagasConstantsFriend.SAGA_CREATE_FRIEND, person_username));
      } else if (status === 'request') {
         dispatch(sagaActionCreator<string>(sagasConstantsFriend.SAGA_ACCEPT_FRIEND, person_username));
      }
   };

   useLayoutEffect(() => {
      const checkStatus = friends.filter(elem => elem.username === person_username);

      if (checkStatus.length) {
         setStatus(checkStatus[0].status);
      } else {
         setStatus('no');
      }

   }, [friends]);

   return (
      <div className={ s.wrapper }>
         <Writing />

         <button
            onClick={ friendHandler }
            type="button"
            className={ `
               ${s.add}
               ${status === 'friend' ? s._friend : ''}
               ${status === 'request' ? s._request : ''}
               ${status === 'sent' ? s._sent : ''}
            ` }
         />
      </div>
   );
};

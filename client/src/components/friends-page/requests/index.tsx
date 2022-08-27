import { FC, useMemo } from 'react';

import { useAppSelector } from 'hooks/redux';

import { Item } from './item';

import s from './style.module.scss';

export const Requests: FC = () => {

   const allFriends = useAppSelector(state => state.friendsSlice.friends);

   const requests = useMemo(() => {
      return allFriends.filter(elem => elem.status === 'request');
   }, [allFriends]);

   if (!requests.length) {
      return null;
   }

   return (
      <div className={ s.wrapper }>
         <p className={ s.title }>Friend requests</p>

         { requests.map(elem => (
            <Item data={ elem } key={ elem.username } />
         )) }
      </div>
   );
};

import { FC } from 'react';

import { ISearchUser } from 'types/common';

import { Item } from './item/item';

import s from './style.module.scss';

interface IProps {
   users: ISearchUser[],
}

export const Users: FC<IProps> = ({ users }) => {

   return (
      <div className={ s.wrapper }>
         { users.map(item => (
            <Item data={ item } key={ item.username }/>
         )) }
      </div>
   );
};

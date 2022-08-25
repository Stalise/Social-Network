import { FC, useState } from 'react';

import { ISearchUser } from 'types/common';

import { Empty } from 'components/common/empty';
import { Loader } from 'components/common/loader';
import { Search } from 'components/search-page/search';
import { Users } from 'components/search-page/users';

import s from './style.module.scss';

export const SearchPage: FC = () => {

   const [users, setUsers] = useState<ISearchUser[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   return (
      <div className={ s.wrapper }>
         <p className={ s.title }>Search people</p>

         <Search setUsers={ setUsers } setIsLoading={ setIsLoading } />

         { isLoading && <Loader /> }

         { !users.length && !isLoading && <Empty title="Find your friend 🧐" image="search.png"/> }

         { users && !isLoading && <Users users={ users } /> }
      </div>
   );
};

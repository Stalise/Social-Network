import { FC } from 'react';

import { useAppSelector } from 'hooks/redux';

import { Empty } from 'components/common/empty';
import { Item } from 'components/main-page/posts/item';

import s from './style.module.scss';

export const Posts: FC = () => {

   const { posts } = useAppSelector(state => state.postsSlice);

   return (
      <div className={ s.wrapper }>
         { !posts.length && <Empty title="No posts yet 🙁" image="write.png"/> }

         { posts.length > 0 &&
            <>
               { posts.map(elem => <Item data={ elem } key={ elem.id } />) }
            </>
         }
      </div>
   );
};

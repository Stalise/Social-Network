import { FC } from "react";

import s from "./Posts.module.scss";
import { useAppSelector } from "hooks/redux";

import Empty from "./Empty/Empty";
import Post from "components/MainPage/Post/Post";

const Posts: FC = () => {

   const { posts } = useAppSelector(state => state.postsSlice);

   return (
      <div className={ s.wrapper }>
         { !posts.length && <Empty /> }

         { posts.length > 0 &&
            <>
               { posts.map(elem => <Post postData={ elem } key={ elem.id } />) }
            </>
         }
      </div>
   );
};

export default Posts;

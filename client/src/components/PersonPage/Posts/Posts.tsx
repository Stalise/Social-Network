import { useAppSelector } from "hooks/redux";
import { FC } from "react";

import s from "./Posts.module.scss";

import Empty from "./Empty/Empty";
import Post from "components/PersonPage/Post/Post";

const Posts: FC = () => {

   const { posts } = useAppSelector(state => state.personSlice);

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

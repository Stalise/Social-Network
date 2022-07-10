import { FC } from "react";

import s from "./Post.module.scss";
import { Urls } from "mock/constants/api";
import { IPost } from "types/common";

import Like from "./Like/Like";

interface IProps {
   postData: IPost,
}

const Post: FC<IProps> = ({ postData }) => {

   return (
      <div className={ s.wrapper }>
         <div className={ s.top }>
            <div className={ s.data }>{ postData.date }</div>
         </div>
         <div className={ s.content }>
            <p className={ s.text }>{ postData.text }</p>
            { postData.img &&
               <div className={ s.imageContainer }>
                  <img src={ `${Urls.cloudinary_url}${postData.img}` } className={ s.image } alt="post" />
               </div>
            }
         </div>
         <div className={ s.bottom }>
            <Like postData={ postData } />
         </div>
      </div>
   );
};

export default Post;

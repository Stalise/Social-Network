import { FC } from "react";

import s from "./style.module.scss";
import { Urls } from "data/constants/api";
import { IPost } from "types/common";

import { Like } from "./Like";

interface IProps {
   data: IPost,
}

export const Item: FC<IProps> = ({ data }) => {

   return (
      <div className={ s.wrapper }>
         <div className={ s.top }>
            <div className={ s.data }>{ data.date }</div>
         </div>
         <div className={ s.content }>
            <p className={ s.text }>{ data.text }</p>
            { data.img &&
               <div className={ s.imageContainer }>
                  <img
                     className={ s.image }
                     src={ `${Urls.cloudinary_url}${data.img}` }
                     alt="post"
                  />
               </div>
            }
         </div>
         <div className={ s.bottom }>
            <Like data={ data } />
         </div>
      </div>
   );
};

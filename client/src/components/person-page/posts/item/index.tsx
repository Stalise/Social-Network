import { FC } from "react";

import s from "./style.module.scss";
import { IPost } from "types/common";

import { Like } from "./like";
import { Image } from "./image";

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
            { data.img && <Image image={ data.img }/> }
         </div>
         <div className={ s.bottom }>
            <Like data={ data } />
         </div>
      </div>
   );
};

import { FC, memo } from "react";

import s from "./style.module.scss";
import { Urls } from "data/constants/api";
import { IMessage } from "types/common";

interface IProps {
   data: IMessage,
}

export const Item: FC<IProps> = memo(({ data }) => (
   <div className={ s.wrapper }>
      <div className={ s.imageContainer }>
         <img
            className={ s.image }
            src={ `${Urls.cloudinary_url}${data.avatar}` }
            alt="avatar" />
      </div>
      <div className={ s.content }>
         <div className={ s.info }>
            <p className={ s.fullname }>{ `${data.name} ${data.surname}` }</p>
            <p className={ s.date }>{ data.date }</p>
         </div>
         <p className={ s.text }>{ data.text }</p>
      </div>
   </div>
));

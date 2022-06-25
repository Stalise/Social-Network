import { FC } from "react";

import s from "./Item.module.scss";
import { Urls } from "mock/constants/api";
import { IMessage } from "types/common";

interface IProps {
   data: IMessage,
}

const Item: FC<IProps> = ({ data }) => {

   return (
      <div className={s.wrapper}>
         <div className={s.imageContainer}>
            <img src={`${Urls.cloudinary_url}${data.avatar}`} className={s.image} alt="avatar" />
         </div>
         <div className={s.content}>
            <div className={s.info}>
               <p className={s.fullname}>{`${data.name} ${data.surname}`}</p>
               <p className={s.date}>{data.date}</p>
            </div>
            <p className={s.text}>{data.text}</p>
         </div>
      </div>
   );
};

export default Item;
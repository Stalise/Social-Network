import { FC } from "react";

import s from "./style.module.scss";
import { useAppDispatch } from "hooks/redux";
import { sagasConstantsPosts, sagaActionCreator } from "data/constants/saga";
import { Urls } from "data/constants/api";
import { IPost } from "types/common";

import { Like } from "./Like";

interface IProps {
   data: IPost,
}

export const Item: FC<IProps> = ({ data }) => {

   const dispatch = useAppDispatch();

   const deleteHandler = () => {
      dispatch(sagaActionCreator<number>(sagasConstantsPosts.SAGA_USER_DELETE_POST, data.id));
   };

   return (
      <div className={ s.wrapper }>
         <div className={ s.top }>
            <div className={ s.data }>{ data.date }</div>
            <div onClick={ deleteHandler } className={ s.delete }></div>
         </div>
         <div className={ s.content }>
            <p className={ s.text }>{ data.text }</p>
            { data.img &&
               <div className={ s.imageContainer }>
                  <img src={ `${Urls.cloudinary_url}${data.img}` } className={ s.image } alt="post" />
               </div>
            }
         </div>
         <div className={ s.bottom }>
            <Like data={ data } />
         </div>
      </div>
   );
};

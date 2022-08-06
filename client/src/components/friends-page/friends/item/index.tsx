import { FC, memo } from "react";
import { Link } from "react-router-dom";

import s from "./style.module.scss";
import { useAppDispatch } from "hooks/redux";
import { Urls } from "data/constants/api";
import { sagasConstantsFriend, sagaActionCreator } from "data/constants/saga";
import { IFriend } from "types/common";

interface IProps {
   data: IFriend,
}

// TODO: сделать функционал для кнопки Write

export const Item: FC<IProps> = memo(({ data }) => {

   const dispatch = useAppDispatch();

   const deleteHandler = () => {
      dispatch(sagaActionCreator<string>(sagasConstantsFriend.SAGA_DELETE_FRIEND, data.username));
   };

   return (
      <div className={ s.wrapper }>
         <div className={ s.content }>
            <Link to={ `/${data.username}` } className={ s.link }>
               <div className={ s.avatar }>
                  <img src={ `${Urls.cloudinary_url}${data.avatar}` } className={ s.avatarImage } alt="avatar" />
               </div>
            </Link>
            <div className={ s.text }>
               <div className={ s.name }>
                  <p className={ s.forename }>{ data.name }</p>
                  <p className={ s.surname }>{ data.surname }</p>
               </div>
               <button type="button" className={ s.message }>Write</button>
            </div>
         </div>
         <div onClick={ deleteHandler } className={ s.delete }></div>
      </div>
   );
});

import { FC, memo } from "react";

import s from "./style.module.scss";
import { useAppDispatch } from "hooks/redux";
import { Urls } from "data/constants/api";
import { sagasConstantsPhoto, sagaActionCreator } from "data/constants/saga";
import { IPhoto } from "types/common";

interface IProps {
   data: IPhoto,
   index: number,
   lightboxHandler: (arg: number) => void,
}

export const Item: FC<IProps> = memo(({ data, index, lightboxHandler }) => {

   const dispatch = useAppDispatch();

   const deleteHandler = () => {
      dispatch(sagaActionCreator<number>(sagasConstantsPhoto.SAGA_DELETE_PHOTO, data.id));
   };

   return (
      <div className={ s.wrapper }>
         <div className={ s.delete } onClick={ deleteHandler } />
         <img
            className={ s.image }
            src={ `${Urls.cloudinary_url}${data.img}` }
            onClick={ () => lightboxHandler(index) }
            alt="person_photo"
         />
      </div>
   );
});

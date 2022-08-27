import { FC, memo } from 'react';

import { Urls } from 'data/constants/api';
import { sagaActionCreator, sagasConstantsPhoto } from 'data/constants/saga';
import { useAppDispatch } from 'hooks/redux';
import { IPhoto } from 'types/common';

import s from './style.module.scss';

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

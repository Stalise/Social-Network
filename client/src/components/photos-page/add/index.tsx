import { FC } from 'react';

import { sagaActionCreator, sagasConstantsPhoto } from 'data/constants/saga';
import { transformFile } from 'helpers/common';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

import s from './style.module.scss';

export const Add: FC = () => {

   const dispatch = useAppDispatch();

   const { status } = useAppSelector(state => state.photosSlice);

   const createHandler = async (file: File | null) => {
      if (file !== null) {
         const updatedFile: string = await transformFile(file);

         dispatch(sagaActionCreator<string>(sagasConstantsPhoto.SAGA_ADD_PHOTO, updatedFile));
      };
   };

   return (
      <div className={ s.wrapper }>
         <label className={ `${s.container} ${status === 'create' ? s._pending : ''}` }>
            <input
               className={ s.field }
               onChange={ e => createHandler(e.target.files?.length ? e.target.files[0] : null) }
               type="file"
               name="filePhoto"
               accept="image/jpeg, image/png"
            />
            Add photo
         </label>
      </div>
   );
};

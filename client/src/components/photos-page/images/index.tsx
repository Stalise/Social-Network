import { FC, useMemo, useState } from 'react';
import LightBox from 'fslightbox-react';

import { getUrlsImages } from 'helpers/photo';
import { useAppSelector } from 'hooks/redux';

import { Item } from './item';

import s from './style.module.scss';

export const Images: FC = () => {

   const { photos } = useAppSelector(state => state.photosSlice);

   const [lightboxController, setLightboxController] = useState({
      toggler: false,
      slide: 1,
   });

   const urls = useMemo(() => {
      return getUrlsImages(photos);
   }, [photos]);

   const lightboxHandler = (index: number) => {
      setLightboxController({
         ...lightboxController,
         toggler: !lightboxController.toggler,
         slide: index,
      });
   };

   return (
      <div className={ s.wrapper }>
         { photos.map((item, index) => (
            <Item
               data={ item }
               index={ index + 1 }
               lightboxHandler={ lightboxHandler }
               key={ item.id }
            />
         )) }

         <LightBox
            toggler={ lightboxController.toggler }
            sources={ urls }
            slide={ lightboxController.slide }
         />
      </div>
   );
};

import { FC, useMemo, useState } from 'react';
import LightBox from 'fslightbox-react';

import { getUrlsImages } from 'helpers/photo';
import { useAppSelector } from 'hooks/redux';

import { Item } from './item';

import s from './style.module.scss';

export const Images: FC = () => {

   const photos = useAppSelector(state => state.personSlice.photos.filter((_, index) => index < 4));

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

         { photos.length
            ?
            <div className={ s.container }>
               { photos.map((elem, index) => (
                  <Item
                     url={ elem.img }
                     index={ index + 1 }
                     lightboxHandler={ lightboxHandler }
                     key={ elem.id }/>
               )) }
            </div>
            :
            null
         }

         <LightBox
            toggler={ lightboxController.toggler }
            sources={ urls }
            slide={ lightboxController.slide }
         />
      </div>
   );
};

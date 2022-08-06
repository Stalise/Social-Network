import { FC, useState, useMemo } from 'react';
import LightBox from 'fslightbox-react';

import s from "./style.module.scss";
import { useAppSelector } from 'hooks/redux';
import { getUrlsImages } from "helpers/photo";

import { Item } from './item';
import { Add } from './add';

export const Images: FC = () => {

   const photos = useAppSelector(state => state.photosSlice.photos.filter((_, index) => index < 4));

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

         <Add />

         <LightBox
            toggler={ lightboxController.toggler }
            sources={ urls }
            slide={ lightboxController.slide }
         />
      </div>
   );
};

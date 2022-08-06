import { FC } from "react";

import s from "./style.module.scss";
import { useAppSelector } from "hooks/redux";

import { Empty } from "components/common/empty";
import { Loader } from "components/common/loader";
import { Add } from "components/photos-page/add";
import { Images } from "components/photos-page/images";

export const PhotosPage: FC = () => {

   const { photos, status } = useAppSelector(state => state.photosSlice);

   if (status === "pending") {
      return <Loader />;
   }

   return (
      <div className={ s.wrapper }>
         <p className={ s.title }>My photos</p>

         <Add />

         { !photos.length && <Empty title={ "No photos yet 🙁" } image={ "photos.png" }/> }

         <Images />
      </div>
   );
};

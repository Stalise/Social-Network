import { Urls } from "data/constants/api";
import { IPhoto } from "types/common";

// создает урлы для fslightbox
export const getUrlsImages = ( data: IPhoto[] ): string[] => {
   const urls = data.map(item => `${Urls.cloudinary_url}${item.img}`);

   return urls;
};

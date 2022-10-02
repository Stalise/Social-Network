import { Urls } from 'data/constants/api';
import { IPhoto } from 'types/common';

/** создает урлы для fslightbox */
export const getImagesUrls = ( data: IPhoto[] ): string[] => (
   data.map(item => `${Urls.cloudinary_url}${item.img}`)
);

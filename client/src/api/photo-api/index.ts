import axios from "axios";
import { toast } from 'react-toastify';

import { Urls } from "data/constants/api";
import { apiResponsesMessage } from "data/constants/api";
import { defaultToast } from "data/constants/toast";
import { IPhoto } from "types/common";

export const instance = axios.create({
   baseURL: Urls.server_url,
   withCredentials: true,
});

export const photoApi = {
   getPhotos: async () => {
      try {
         const response = await instance.get<{ message: string, data: IPhoto[] }>(Urls.photo);

         return response.data.data;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return apiResponsesMessage.needAuth;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   addPhoto: async (data: string) => {
      try {
         const response = await instance.post<{ message: string, data: IPhoto }>(
            Urls.photo,
            { data },
            { headers: { "Content-Type": "application/json" } },
         );

         toast.success(response.data.message, defaultToast);
         return response.data.data;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return error.response.data.message;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   deletePhoto: async (data: number) => {
      try {
         await instance.delete<{ message: string }>(`${Urls.photo}/${data}`);

         return apiResponsesMessage.success;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return error.response.data.message;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },
};

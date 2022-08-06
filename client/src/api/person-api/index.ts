import axios from "axios";
import { toast } from 'react-toastify';

import { Urls } from "data/constants/api";
import { apiResponsesMessage } from "data/constants/api";
import { defaultToast } from "data/constants/toast";
import { IUserData, IFriend, IPhoto, IPost } from "types/common";

export const instance = axios.create({
   baseURL: Urls.server_url,
   withCredentials: true,
});

export const personApi = {
   getPersonData: async (data: string): Promise<IUserData | string> => {
      try {
         const response = await instance.get<{ message: string, userData: IUserData }>(`${Urls.person}/${data}`);

         return response.data.userData;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return apiResponsesMessage.needAuth;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   getPersonPosts: async (data: string) => {
      try {
         const response = await instance.get<{ message: string, posts: IPost[] }>(`${Urls.person_posts}/${data}`);

         return response.data.posts;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return apiResponsesMessage.needAuth;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   getPersonFriends: async (data: string) => {
      try {
         const response = await instance.get<{ message: string, friends: IFriend[] }>(`${Urls.person_friends}/${data}`);

         return response.data.friends;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return apiResponsesMessage.needAuth;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   getPersonPhotos: async (data: string) => {
      try {
         const response = await instance.get<{ message: string, data: IPhoto[] }>(`${Urls.person_photos}/${data}`);

         return response.data.data;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return apiResponsesMessage.needAuth;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },
};

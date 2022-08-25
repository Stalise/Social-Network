import { toast } from 'react-toastify';
import axios from 'axios';

import { apiResponsesMessage, Urls } from 'data/constants/api';
import { defaultToast } from 'data/constants/toast';
import { ILike, IPost } from 'types/common';

import { INewPostData } from 'components/main-page/new-post/types';

export const instance = axios.create({
   baseURL: Urls.server_url,
   withCredentials: true,
});

export const postApi = {
   getPosts: async () => {
      // const query: string = data.length === 1 ? `?user=${data[0]}` : `?user=${data[0]}&person=${data[1]}`;

      try {
         const response = await instance.get<{ message: string, posts: IPost[] }>(Urls.post);

         return response.data.posts;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return apiResponsesMessage.needAuth;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   createPost: async (data: INewPostData) => {
      try {
         const response = await instance.post<{ message: string, post: IPost }>(Urls.post, { ...data }, {
            headers: { 'Content-Type': 'application/json' },
         });

         return response.data.post;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return error.response.data.message;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   deletePost: async (data: number) => {
      try {
         await instance.delete<{ message: string }>(`${Urls.post}/${data}`);

         return apiResponsesMessage.success;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return error.response.data.message;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   createLike: async (data: ILike) => {
      try {
         await instance.post(Urls.like, { ...data }, {
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
         });

         return apiResponsesMessage.success;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return error.response.data.message;
         }

         if (error.response?.status === 409) {
            return error.response.data.message;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   deleteLike: async (data: ILike) => {
      try {
         await instance.delete(Urls.like, {
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            data: { ...data },
         });

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

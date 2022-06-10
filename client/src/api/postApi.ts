import axios from "axios";
import { toast } from 'react-toastify';

import { Urls } from "mock/constants/api";
import { apiResponsesMessage } from "mock/constants/api";
import { defaultToast } from "mock/constants/toast";
import { IPost, ILike } from "types/common";
import { INewPostData } from "components/MainPage/NewPost/types";

export const instance = axios.create({
   baseURL: Urls.server_url,
   withCredentials: true,
});

export const postApi = {
   getPosts: async (data: string) => {
      try {
         const response = await instance.get<{ message: string, posts: IPost[] }>(`${Urls.post}/${data}`);

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
            headers: { "Content-Type": "application/json" },
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
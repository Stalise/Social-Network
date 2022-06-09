import axios from "axios";
import { toast } from 'react-toastify';

import { Urls } from "mock/constants/api";
import { apiResponsesMessage } from "mock/constants/api";
import { defaultToast } from "mock/constants/toast";
import { IPost } from "types/user";
import { INewPostData } from "components/MainPage/NewPost/types";

export const instance = axios.create({
   baseURL: Urls.server_url,
   withCredentials: true,
});

export const postApi = {
   getPosts: async () => {
      try {
         const response = await instance.get<{ message: string, posts: IPost[] }>(Urls.post);

         return response.data.posts;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return error.response.data.message;
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
      } catch (error) {

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },
};
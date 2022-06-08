import axios from "axios";
import { toast } from 'react-toastify';

import { Urls } from "mock/constants/api";
import { apiResponsesMessage } from "mock/constants/api";
import { defaultToast } from "mock/constants/toast";
import { IPost } from "types/user";

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
};
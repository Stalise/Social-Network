import axios from "axios";
import { toast } from 'react-toastify';

import { Urls } from "mock/constants/api";
import { apiResponsesMessage } from "mock/constants/api";
import { defaultToast } from "mock/constants/toast";
import { IFriend } from "types/common";

export const instance = axios.create({
   baseURL: Urls.server_url,
   withCredentials: true,
});

export const friendApi = {
   getFriends: async (data: string) => {
      try {
         const response = await instance.get<{ message: string, friends: IFriend[] }>(`${Urls.friend}/${data}`);

         return response.data.friends;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return apiResponsesMessage.needAuth;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },
   createFriend: async (data: string[]) => {
      try {
         const response = await instance.post<{ message: string, friendData: IFriend }>(
            Urls.friend,
            { user_username: data[0], person_username: data[1] },
            { headers: { "Content-Type": "application/json" } },
         );

         return response.data.friendData;
      } catch (error: any) {
         if (error.response?.status === 409) {
            return error.response.data.status;
         }

         if (error.response?.status === 401) {
            return error.response.data.message;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },
   acceptFriend: async (data: string[]) => {
      try {
         await instance.patch<{ message: string }>(
            Urls.friend,
            { user_username: data[0], person_username: data[1] },
            { headers: { "Content-Type": "application/json" } },
         );

         return apiResponsesMessage.success;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return apiResponsesMessage.needAuth;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },
   deleteFriend: async (data: string[]) => {
      try {
         await instance.delete<{ message: string }>(Urls.friend, {
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            data: { user_username: data[0], person_username: data[1] },
         });

         toast.info(apiResponsesMessage.deleteFriend, defaultToast);
         return apiResponsesMessage.success;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return apiResponsesMessage.needAuth;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },
};
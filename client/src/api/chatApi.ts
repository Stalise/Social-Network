import axios from "axios";
import { toast } from 'react-toastify';

import { Urls } from "mock/constants/api";
import { apiResponsesMessage } from "mock/constants/api";
import { defaultToast } from "mock/constants/toast";
import { IChat } from "types/common";

export const instance = axios.create({
   baseURL: Urls.server_url,
   withCredentials: true,
});

export const chatApi = {
   getChats: async (data: string) => {
      try {
         const response = await instance.get<{ message: string, chats: IChat[] }>(`${Urls.chat}/${data}`);

         return response.data.chats;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return apiResponsesMessage.needAuth;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   createChat: async (data: string[]) => {

      try {
         const response = await instance.post<{ message: string, chat: IChat }>(
            Urls.chat,
            { user_username: data[0], person_username: data[1] },
            { headers: { "Content-Type": "application/json" } },
         );

         return response.data.chat;
      } catch (error) {
         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   deleteChat: async (data: number) => {
      try {
         await instance.delete<{ message: string }>(`${Urls.chat}/${data}`);

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
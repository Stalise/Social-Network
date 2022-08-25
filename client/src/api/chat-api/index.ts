import { toast } from 'react-toastify';
import axios from 'axios';

import { apiResponsesMessage, Urls } from 'data/constants/api';
import { defaultToast } from 'data/constants/toast';
import { IChat, IMessage } from 'types/common';
import { ICreateMessagePayload, IGetMessagePayload } from 'types/sagas/chat';

export const instance = axios.create({
   baseURL: Urls.server_url,
   withCredentials: true,
});

export const chatApi = {
   getChats: async () => {
      try {
         const response = await instance.get<{ message: string, chats: IChat[] }>(`${Urls.chat}`);

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
            { headers: { 'Content-Type': 'application/json' } },
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

   createMessage: async (data: ICreateMessagePayload) => {
      try {
         await instance.post<{ message: string }>(
            Urls.message,
            { ...data },
            { headers: { 'Content-Type': 'application/json' } },
         );

         return apiResponsesMessage.success;
      } catch (error) {
         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   getMessage: async (data: IGetMessagePayload) => {
      try {
         const response = await instance.get<{ message: string, data?: IMessage }>(
            `${Urls.message}/${data.chat_id}`,
            { signal: data.controller.signal },
         );

         return response.data.data;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return apiResponsesMessage.needAuth;
         }

         // когда время ожидания заканчивается, сервер прерывает запрос
         if (error.response?.status === 307) {
            return apiResponsesMessage.requestExpired;
         }

         // проверка что запрос был отменен через AbortController
         if (axios.isCancel(error)) {
            return apiResponsesMessage.unexpected;
         };

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },
};

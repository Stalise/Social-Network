import { toast } from 'react-toastify';
import axios from 'axios';

import { apiResponsesMessage, Urls } from 'data/constants/api';
import { defaultToast } from 'data/constants/toast';
import { IUserData } from 'types/common';

import { IRegFormState } from 'components/auth-page/reg-form/types';

export const instance = axios.create({
   baseURL: Urls.server_url,
   withCredentials: true,
});

export const userApi = {
   checkAuth: async (): Promise<string> => {
      try {
         const response = await instance.get<{ message: string, data: string }>(Urls.userAuth);

         return response.data.data;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return error.response.data.message;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   authUser: async (data: { username: string, password: string }): Promise<string> => {
      try {
         const response = await instance.post<{ message: string }>(Urls.userAuth, { ...data }, {
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
         });

         toast.success(response.data.message, defaultToast);
         return apiResponsesMessage.success;
      } catch (error: any) {
         if (error.response?.status === 401) {
            toast.warn(error.response.data.message, defaultToast);
            return error.response.data.message;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   regUser: async (data: IRegFormState): Promise<string> => {
      try {
         const response = await instance.post(Urls.user, { ...data }, {
            headers: { 'Content-Type': 'application/json' },
         });

         toast.success(response.data.message, defaultToast);
         return apiResponsesMessage.success;
      } catch (error: any) {
         if (error.response?.status === 401) {
            toast.warn(error.response.data.message, defaultToast);
            return error.response.data.message;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   logoutUser: async (): Promise<string> => {
      try {
         await instance.get(Urls.userLogout);

         return apiResponsesMessage.success;
      } catch (error: any) {

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },

   getUserData: async (data: string): Promise<IUserData | string> => {
      try {
         const response = await instance.get<{ message: string, userData: IUserData }>(`${Urls.user}/${data}`);

         return response.data.userData;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return apiResponsesMessage.needAuth;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },
};

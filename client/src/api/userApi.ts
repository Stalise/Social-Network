import axios from "axios";
import { toast } from 'react-toastify';

import { Urls } from "mock/constants/api";
import { apiResponsesMessage } from "mock/constants/api";
import { defaultToast } from "mock/constants/toast";
import { IRegFormState } from "components/AuthPage/RegForm/types";
import { IUserData } from "types/user";

export const instance = axios.create({
   baseURL: Urls.server_url,
   withCredentials: true,
});

export const userApi = {
   checkAuth: async (): Promise<string> => {
      try {
         await instance.get(Urls.userAuth);

         return apiResponsesMessage.success;
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

   getUserData: async (): Promise<IUserData | string> => {
      try {
         const response = await instance.get<{ message: string, userData: IUserData }>(Urls.user);
         
         return response.data.userData;
      } catch (error) {
         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },
};
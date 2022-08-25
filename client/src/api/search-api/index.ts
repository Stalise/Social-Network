import { toast } from 'react-toastify';
import axios from 'axios';

import { apiResponsesMessage, Urls } from 'data/constants/api';
import { defaultToast } from 'data/constants/toast';
import { IUserData } from 'types/common';

export const instance = axios.create({
   baseURL: Urls.server_url,
   withCredentials: true,
});

export const userApi = {
   findUser: async (data: string): Promise<string | IUserData> => {
      try {
         const response = await instance.get<{ message: string, data: IUserData }>(`${Urls.searchOne}${data}`);

         return response.data.data;
      } catch (error: any) {
         if (error.response?.status === 401) {
            return error.response.data.message;
         }

         if (error.response?.status === 412) {
            toast.info(error.response.data.message, defaultToast);
            return apiResponsesMessage.unexpected;
         }

         toast.warn(apiResponsesMessage.unexpected, defaultToast);
         return apiResponsesMessage.unexpected;
      }
   },
};

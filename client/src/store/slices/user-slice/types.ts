import { IUserData } from 'types/common';

export type StatusType = 'ready' | 'pending' | 'auth' | 'data';

export interface IState {
   isAuth: boolean,
   status: StatusType,
   data: IUserData,
}

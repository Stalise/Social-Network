import { IPhoto } from 'types/common';

export type StatusType = 'ready' | 'pending' | 'create';

export interface IState {
   photos: IPhoto[],
   status: StatusType,
}

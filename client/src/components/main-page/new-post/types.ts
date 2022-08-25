
export interface IPostState {
   text: string,
   img: File | string,
}

export interface INewPostData {
   text: string,
   img: string,
   date: string,
}

export type FieldOverflowType = 'hidden' | 'auto';

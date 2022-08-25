import { createSlice } from '@reduxjs/toolkit';

import { IPost } from 'types/common';

import { IState, StatusType } from './types';

const initialState: IState = {
   posts: [],
   status: 'ready',
};

export const postsSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {
      changePostStatusAction(state, { payload }: { payload: StatusType }) {
         state.status = payload;
      },
      addPostsAction(state, { payload }: { payload: IPost[] }) {
      // console.log(payload);
         state.posts = payload;
      },
      addPostAction(state, { payload }: { payload: IPost }) {
         state.posts.unshift(payload);
      },
      deletePostAction(state, { payload }: { payload: number }) {
         state.posts = state.posts.filter(elem => elem.id !== payload);
      },
      changeLikePostAction(state, { payload }: { payload: IPost }) {
         state.posts = state.posts.map(elem => {
            if (elem.id === payload.id) return payload;
            return elem;
         });
      },
   },
});

export const {
   changePostStatusAction,
   addPostsAction,
   addPostAction,
   deletePostAction,
   changeLikePostAction,
} = postsSlice.actions;

export default postsSlice.reducer;

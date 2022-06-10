import { createSlice } from "@reduxjs/toolkit";

import { IState, StatusType } from "./types";
import { IPost } from "types/common";

const initialState: IState = {
   posts: [],
   status: "ready",
};

export const postsSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {
      changePersonStatusAction(state, { payload }: { payload: StatusType }) {
         state.status = payload;
      },
      addPostsAction(state, { payload }: { payload: IPost[] }) {
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

export const { changePersonStatusAction, addPostsAction, addPostAction, deletePostAction, changeLikePostAction } = postsSlice.actions;

export default postsSlice.reducer;
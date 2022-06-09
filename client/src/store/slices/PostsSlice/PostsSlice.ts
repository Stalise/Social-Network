import { createSlice } from "@reduxjs/toolkit";

import { IState, StatusType } from "./types";
import { IPost } from "types/user";

const initialState: IState = {
   posts: [],
   status: "ready",
};

export const postsSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {
      changeStatusAction(state, { payload }: { payload: StatusType }) {
         state.status = payload;
      },
      addPostsAction(state, { payload }: { payload: IPost[] }) {
         state.posts = payload;
      },
      addPostAction(state, { payload }: { payload: IPost }) {
         state.posts.unshift(payload);
      },
   },
});

export const { changeStatusAction, addPostsAction, addPostAction } = postsSlice.actions;

export default postsSlice.reducer;
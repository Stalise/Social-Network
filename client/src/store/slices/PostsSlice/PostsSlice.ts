import { createSlice } from "@reduxjs/toolkit";

import { IState } from "./types";
import { IPost } from "types/user";

const initialState: IState = {
   posts: [],
};

export const postsSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {
      addPostsAction(state, { payload }: { payload: IPost[] }) {
         state.posts = payload;
      },
   },
});

export const { addPostsAction } = postsSlice.actions;

export default postsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

import { IState, StatusType } from './types';
import { IUserData, IPost } from "types/common";

const initialState: IState = {
   status: "ready",
   data: {
      username: "",
      name: "",
      surname: "",
      birth: "",
      city: "",
      avatar: "",
   },
   posts: [],
   photos: [],
};

export const personSlice = createSlice({
   name: "person",
   initialState,
   reducers: {
      changePersonStatusAction(state, { payload }: { payload: StatusType }) {
         state.status = payload;
      },
      addPersonDataAction(state, { payload }: { payload: IUserData }) {
         state.data = payload;
      },
      addPersonPostsAction(state, { payload }: { payload: IPost[] }) {
         state.posts = payload;
      },
      changePersonLikePostAction(state, { payload }: { payload: IPost }) {
         state.posts = state.posts.map(elem => {
            if (elem.id === payload.id) return payload;
            return elem;
         });
      },
   },
});

export const { changePersonStatusAction, addPersonDataAction, addPersonPostsAction, changePersonLikePostAction } = personSlice.actions;

export default personSlice.reducer;

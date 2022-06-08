import { createSlice } from "@reduxjs/toolkit";

import { IState, StatusType } from './types';
import { IUserData } from "types/user";

const initialState: IState = {
   isAuth: false,
   status: "pending",
   data: {
      username: "",
      name: "",
      surname: "",
      birth: "",
      city: "",
      avatar: "",
   },
   friends: [],
   requests_friends: [],
   photos: [],
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      changeUserStatusAction(state, { payload }: { payload: StatusType }) {
         state.status = payload;
      },
      changeAuthUserAction(state, { payload }: { payload: boolean }) {
         state.isAuth = payload;
      },
      addUserDataAction(state, { payload }: { payload: IUserData }) {
         state.data = payload;
      },
   },
});

export const { changeUserStatusAction, changeAuthUserAction, addUserDataAction } = userSlice.actions;

export default userSlice.reducer;
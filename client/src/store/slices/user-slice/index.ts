import { createSlice } from "@reduxjs/toolkit";

import { IState, StatusType } from './types';
import { IUserData } from "types/common";

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
      addUsernameAction(state, { payload }: { payload: string }) {
         state.data.username = payload;
      },
      addUserDataAction(state, { payload }: { payload: IUserData }) {
         state.data = payload;
      },
   },
});

export const {
   changeUserStatusAction,
   changeAuthUserAction,
   addUserDataAction,
   addUsernameAction,
} = userSlice.actions;

export default userSlice.reducer;

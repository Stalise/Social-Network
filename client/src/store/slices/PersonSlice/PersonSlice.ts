import { createSlice } from "@reduxjs/toolkit";

import { IState, StatusType } from './types';
import { IPersonData } from "types/common";

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

export const personSlice = createSlice({
   name: 'person',
   initialState,
   reducers: {
      changePersonStatusAction(state, { payload }: { payload: StatusType }) {
         state.status = payload;
      },
      changeAuthPersonAction(state, { payload }: { payload: boolean }) {
         state.isAuth = payload;
      },
      addPersonDataAction(state, { payload }: { payload: IPersonData }) {
         state.data = payload;
      },
   },
});

export const { changePersonStatusAction, changeAuthPersonAction, addPersonDataAction } = personSlice.actions;

export default personSlice.reducer;
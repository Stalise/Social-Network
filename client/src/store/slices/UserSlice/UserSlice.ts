import { createSlice } from "@reduxjs/toolkit";

import { IState, StatusType } from './types';
import { IFriend, IUserData } from "types/common";

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
      addUsernameAction(state, { payload }: { payload: string }) {
         state.data.username = payload;
      },
      addUserDataAction(state, { payload }: { payload: IUserData }) {
         state.data = payload;
      },
      addFriends(state, { payload }: { payload: IFriend[] }) {
         state.friends = payload;
      },
      addFriend(state, { payload }: { payload: IFriend }) {
         state.friends.push(payload);
      },
      changeFriendStatus(state, { payload }: { payload: IFriend }) {
         state.friends = state.friends.map(elem => {
            if (elem.username === payload.username) return payload;
            return elem;
         });
      },
      deleteFriend(state, { payload }: { payload: string }) {
         state.friends = state.friends.filter(elem => elem.username !== payload);
      },
   },
});

export const {
   changeUserStatusAction,
   changeAuthUserAction,
   addUserDataAction,
   addUsernameAction,
   addFriends,
   addFriend,
   changeFriendStatus,
   deleteFriend,
} = userSlice.actions;

export default userSlice.reducer;
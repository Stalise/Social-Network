import { createSlice } from "@reduxjs/toolkit";

import { IFriend } from "types/common";
import { IState } from "./types";


const initialState: IState = {
   friends: [],
   status: "ready",
};

export const friendsSlice = createSlice({
   name: 'friends',
   initialState,
   reducers: {
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
   addFriends,
   addFriend,
   changeFriendStatus,
   deleteFriend,
} = friendsSlice.actions;

export default friendsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

import { IPhoto } from "types/common";
import { IState, StatusType } from "./types";


const initialState: IState = {
   photos: [],
   status: "ready",
};

export const userSlice = createSlice({
   name: 'photos',
   initialState,
   reducers: {
      changeStatus(state, { payload }: { payload: StatusType }) {
         state.status = payload;
      },
      addPhotos(state, { payload }: { payload: IPhoto[] }) {
         state.photos = payload;
      },
      addPhoto(state, { payload }: { payload: IPhoto }) {
         state.photos.unshift(payload);
      },
      deletePhoto(state, { payload }: { payload: number }) {
         state.photos = state.photos.filter(elem => elem.id !== payload);
      },
   },
});

export const {
   changeStatus,
   addPhotos,
   addPhoto,
   deletePhoto,
} = userSlice.actions;

export default userSlice.reducer;

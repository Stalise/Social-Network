import { call, put } from "redux-saga/effects";

import { changeStatus, addPhoto, addPhotos, deletePhoto } from "store/slices/photos-slice/index";
import { changeAuthUserAction } from "store/slices/user-slice";
import { photoApi } from "api/photo-api/index";
import { apiResponsesMessage } from "data/constants/api";
import { IWorker } from "types/helpers";
import { IPhoto } from "types/common";

export function* workerFetchPhotos() {
   const response: IPhoto[] | string = yield call(photoApi.getPhotos);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      return;
   } else if (typeof (response) !== "string") {
      yield put(addPhotos(response));
   }
};

export function* workerAddPhoto(data: IWorker<string>) {
   yield put(changeStatus("create"));

   const response: IPhoto | string = yield call(photoApi.addPhoto, data.payload);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      yield put(changeStatus("ready"));
   } else if (typeof (response) !== "string") {
      yield put(addPhoto(response));

      yield put(changeStatus("ready"));
   }
};

export function* workerDeletePhoto(data: IWorker<number>) {
   const response: string = yield call(photoApi.deletePhoto, data.payload);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      return;
   } else if (response === apiResponsesMessage.success) {
      yield put(deletePhoto(data.payload));
   }
};

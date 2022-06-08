import { call, put } from "redux-saga/effects";

import { changeUserStatusAction, changeAuthUserAction, addUserDataAction } from "store/slices/UserSlice/UserSlice";
import { userApi } from "api/userApi";
import { apiResponsesMessage } from "mock/constants/api";
import { IAuthFormState } from "components/AuthPage/AuthForm/types";
import { IRegFormState } from "components/AuthPage/RegForm/types";
import { IUserData } from "types/user";

export function* workerCheckAuth() {
   const response: string = yield call(userApi.checkAuth);

   yield put(changeUserStatusAction("ready"));

   if (response === apiResponsesMessage.success) {
      yield put(changeAuthUserAction(true));
   }
};

export function* workerRegUser(data: { type: string, payload: IRegFormState }) {
   yield put(changeUserStatusAction("auth"));

   const response: string = yield call<any>(userApi.regUser, data.payload);

   if (response === apiResponsesMessage.success) {
      yield put(changeAuthUserAction(true));
   }

   yield put(changeUserStatusAction("ready"));
};

export function* workerAuthUser(data: { type: string, payload: IAuthFormState }) {
   yield put(changeUserStatusAction("auth"));

   const response: string = yield call<any>(userApi.authUser, data.payload);

   if (response === apiResponsesMessage.success) {
      yield put(changeAuthUserAction(true));
   }
   yield put(changeUserStatusAction("ready"));
}

export function* workerLogoutUser() {
   yield put(changeUserStatusAction("pending"));

   const response: string = yield call(userApi.logoutUser);

   if (response === apiResponsesMessage.success) {
      yield put(changeAuthUserAction(false));
   }

   yield put(changeUserStatusAction("ready"));
};

export function* workerGetUserData() {
   const response: IUserData | string = yield call(userApi.getUserData);

   if (typeof (response) !== "string") {
      yield put(addUserDataAction(response));
   }

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   }
};
import { call, put } from "redux-saga/effects";

import { changePersonStatusAction, changeAuthPersonAction, addPersonDataAction } from "store/slices/PersonSlice/PersonSlice";
import { userApi } from "api/personApi";
import { apiResponsesMessage } from "mock/constants/api";
import { IAuthFormState } from "components/AuthPage/AuthForm/types";
import { IRegFormState } from "components/AuthPage/RegForm/types";
import { IPersonData } from "types/common";
import { IWorker } from "types/helpers";

export function* workerCheckAuth() {
   const response: string = yield call(userApi.checkAuth);

   yield put(changePersonStatusAction("ready"));

   if (response === apiResponsesMessage.success) {
      yield put(changeAuthPersonAction(true));
   }
};

export function* workerRegPerson(data: IWorker<IRegFormState>) {
   yield put(changePersonStatusAction("auth"));

   const response: string = yield call<any>(userApi.regPerson, data.payload);

   if (response === apiResponsesMessage.success) {
      yield put(changeAuthPersonAction(true));
   }

   yield put(changePersonStatusAction("ready"));
};

export function* workerAuthPerson(data: IWorker<IAuthFormState>) {
   yield put(changePersonStatusAction("auth"));

   const response: string = yield call<any>(userApi.authPerson, data.payload);

   if (response === apiResponsesMessage.success) {
      yield put(changeAuthPersonAction(true));
   }
   yield put(changePersonStatusAction("ready"));
}

export function* workerLogoutPerson() {
   yield put(changePersonStatusAction("pending"));

   const response: string = yield call(userApi.logoutPerson);

   if (response === apiResponsesMessage.success) {
      yield put(changeAuthPersonAction(false));
   }

   yield put(changePersonStatusAction("ready"));
};

export function* workerGetPersonData() {
   const response: IPersonData | string = yield call(userApi.getPersonData);

   if (typeof (response) !== "string") {
      yield put(addPersonDataAction(response));
   }

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthPersonAction(false));
   }
};
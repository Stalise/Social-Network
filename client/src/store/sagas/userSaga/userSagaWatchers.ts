import { takeEvery } from "redux-saga/effects";

import { sagasConstants } from "mock/constants/saga";
import { workerGetUserData, workerCheckAuth, workerAuthUser, workerLogoutUser, workerRegUser } from "./userSagaWorkers";

export function* watcherCheckAuth() {
   yield takeEvery(sagasConstants.SAGA_CHECK_AUTH, workerCheckAuth);
}

export function* watcherRegUser() {
   yield takeEvery(sagasConstants.SAGA_REG_USER, workerRegUser);
}

export function* watcherAuthUser() {
   yield takeEvery(sagasConstants.SAGA_AUTH_USER, workerAuthUser);
}

export function* watcherLogoutUser() {
   yield takeEvery(sagasConstants.SAGA_LOGOUT_USER, workerLogoutUser);
}

export function* watcherGetUserData() {
   yield takeEvery(sagasConstants.SAGA_GET_USER_DATA, workerGetUserData);
}
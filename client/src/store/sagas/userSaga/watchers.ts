import { takeLatest } from "redux-saga/effects";

import { sagasConstants } from "mock/constants/saga";
import { workerGetUserData, workerCheckAuth, workerAuthUser, workerLogoutUser, workerRegUser } from "./workers";

export function* watcherCheckAuth() {
   yield takeLatest(sagasConstants.SAGA_CHECK_AUTH, workerCheckAuth);
}

export function* watcherRegUser() {
   yield takeLatest(sagasConstants.SAGA_REG_USER, workerRegUser);
}

export function* watcherAuthUser() {
   yield takeLatest(sagasConstants.SAGA_AUTH_USER, workerAuthUser);
}

export function* watcherLogoutUser() {
   yield takeLatest(sagasConstants.SAGA_LOGOUT_USER, workerLogoutUser);
}

export function* watcherGetUserData() {
   yield takeLatest(sagasConstants.SAGA_GET_USER_DATA, workerGetUserData);
}
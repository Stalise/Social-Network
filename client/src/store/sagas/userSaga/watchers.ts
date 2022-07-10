import { takeLatest } from "redux-saga/effects";

import { sagasConstantsUser } from "mock/constants/saga";
import { workerGetUserData, workerCheckAuth, workerAuthUser, workerLogoutUser, workerRegUser } from "./workers";

export function* watcherCheckAuth() {
   yield takeLatest(sagasConstantsUser.SAGA_CHECK_AUTH, workerCheckAuth);
}

export function* watcherRegUser() {
   yield takeLatest(sagasConstantsUser.SAGA_REG_USER, workerRegUser);
}

export function* watcherAuthUser() {
   yield takeLatest(sagasConstantsUser.SAGA_AUTH_USER, workerAuthUser);
}

export function* watcherLogoutUser() {
   yield takeLatest(sagasConstantsUser.SAGA_LOGOUT_USER, workerLogoutUser);
}

export function* watcherGetUserData() {
   yield takeLatest(sagasConstantsUser.SAGA_GET_USER_DATA, workerGetUserData);
}

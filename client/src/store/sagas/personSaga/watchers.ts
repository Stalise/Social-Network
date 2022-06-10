import { takeLatest } from "redux-saga/effects";

import { sagasConstants } from "mock/constants/saga";
import { workerGetPersonData, workerCheckAuth, workerAuthPerson, workerLogoutPerson, workerRegPerson } from "./workers";

export function* watcherCheckAuth() {
   yield takeLatest(sagasConstants.SAGA_CHECK_AUTH, workerCheckAuth);
}

export function* watcherRegUser() {
   yield takeLatest(sagasConstants.SAGA_REG_PERSON, workerRegPerson);
}

export function* watcherAuthUser() {
   yield takeLatest(sagasConstants.SAGA_AUTH_PERSON, workerAuthPerson);
}

export function* watcherLogoutUser() {
   yield takeLatest(sagasConstants.SAGA_LOGOUT_PERSON, workerLogoutPerson);
}

export function* watcherGetUserData() {
   yield takeLatest(sagasConstants.SAGA_GET_PERSON_DATA, workerGetPersonData);
}
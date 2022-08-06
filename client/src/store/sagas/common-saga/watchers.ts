import { takeLatest } from "redux-saga/effects";

import { workerAllUserParams, workerAllPersonParams } from "./workers";
import { sagasConstantsUser, sagasConstantsPerson } from "data/constants/saga";

export function* watcherAllUserParams() {
   yield takeLatest(sagasConstantsUser.SAGA_GET_ALL_PARAMS_USER, workerAllUserParams);
}

export function* watcherAllPersonParams() {
   yield takeLatest(sagasConstantsPerson.SAGA_GET_ALL_PARAMS_PERSON, workerAllPersonParams);
}

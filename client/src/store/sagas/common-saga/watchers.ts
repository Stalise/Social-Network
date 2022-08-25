import { takeLatest } from 'redux-saga/effects';

import { sagasConstantsPerson, sagasConstantsUser } from 'data/constants/saga';

import { workerAllPersonParams, workerAllUserParams } from './workers';

export function* watcherAllUserParams() {
   yield takeLatest(sagasConstantsUser.SAGA_GET_ALL_PARAMS_USER, workerAllUserParams);
}

export function* watcherAllPersonParams() {
   yield takeLatest(sagasConstantsPerson.SAGA_GET_ALL_PARAMS_PERSON, workerAllPersonParams);
}

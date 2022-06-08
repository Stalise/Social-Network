import { takeEvery } from "redux-saga/effects";

import { sagasConstants } from "mock/constants/saga";
import { workerGetUserPosts } from './postSagaWorkers';


export function* watcherGetUserPosts() {
   yield takeEvery(sagasConstants.SAGA_GET_USER_POSTS, workerGetUserPosts);
}
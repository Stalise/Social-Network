import { takeLatest } from "redux-saga/effects";

import { sagasConstants } from "mock/constants/saga";
import { workerGetUserPosts, workerCreatePost } from './workers';


export function* watcherGetUserPosts() {
   yield takeLatest(sagasConstants.SAGA_GET_USER_POSTS, workerGetUserPosts);
}

export function* watcherCreatePost() {
   yield takeLatest(sagasConstants.SAGA_CREATE_POST, workerCreatePost);
}
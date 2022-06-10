import { takeLatest } from "redux-saga/effects";

import { sagasConstants } from "mock/constants/saga";
import { workerGetUserPosts, workerCreatePost, workerDeletePost, workerCreateLike, workerDeleteLike } from './workers';


export function* watcherGetUserPosts() {
   yield takeLatest(sagasConstants.SAGA_GET_USER_POSTS, workerGetUserPosts);
}

export function* watcherCreatePost() {
   yield takeLatest(sagasConstants.SAGA_CREATE_POST, workerCreatePost);
}

export function* watcherDeletePost() {
   yield takeLatest(sagasConstants.SAGA_DELETE_POST, workerDeletePost);
}

export function* watcherCreateLike() {
   yield takeLatest(sagasConstants.SAGA_POST_CREATE_LIKE, workerCreateLike);
}

export function* watcherDeleteLike() {
   yield takeLatest(sagasConstants.SAGA_POST_DELETE_LIKE, workerDeleteLike);
}
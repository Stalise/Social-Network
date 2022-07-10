import { takeLatest } from "redux-saga/effects";

import { sagasConstantsPosts } from "mock/constants/saga";
import { workerGetUserPosts, workerCreatePost, workerDeletePost, workerCreateLike, workerDeleteLike } from './workers';

export function* watcherGetUserPosts() {
   yield takeLatest(sagasConstantsPosts.SAGA_GET_USER_POSTS, workerGetUserPosts);
}

export function* watcherCreatePost() {
   yield takeLatest(sagasConstantsPosts.SAGA_USER_CREATE_POST, workerCreatePost);
}

export function* watcherDeletePost() {
   yield takeLatest(sagasConstantsPosts.SAGA_USER_DELETE_POST, workerDeletePost);
}

export function* watcherCreateLike() {
   yield takeLatest(sagasConstantsPosts.SAGA_USER_POST_CREATE_LIKE, workerCreateLike);
}

export function* watcherDeleteLike() {
   yield takeLatest(sagasConstantsPosts.SAGA_USER_POST_DELETE_LIKE, workerDeleteLike);
}

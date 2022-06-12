import { takeLatest } from "redux-saga/effects";

import { sagasConstantsPerson } from "mock/constants/saga";
import { workerGetPersonData, workerGetPersonPosts, workerCreatePersonLikePost, workerDeletePersonLikePost } from "./workers";

export function* watcherGetPersonData() {
   yield takeLatest(sagasConstantsPerson.SAGA_GET_PERSON_DATA, workerGetPersonData);
}

export function* watcherGetPersonPosts() {
   yield takeLatest(sagasConstantsPerson.SAGA_GET_PERSON_DATA, workerGetPersonPosts);
}

export function* watcherCreatePostLike() {
   yield takeLatest(sagasConstantsPerson.SAGA_PERSON_POST_CREATE_LIKE, workerCreatePersonLikePost);
}

export function* watcherDeletePostLike() {
   yield takeLatest(sagasConstantsPerson.SAGA_PERSON_POST_DELETE_LIKE, workerDeletePersonLikePost);
}
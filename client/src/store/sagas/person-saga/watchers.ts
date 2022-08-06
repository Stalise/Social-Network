import { takeLatest } from "redux-saga/effects";

import { sagasConstantsPerson } from "data/constants/saga";
import {
   workerGetPersonData,
   workerGetPersonPosts,
   workerCreatePersonLikePost,
   workerDeletePersonLikePost,
   workerGetPersonFriends,
   workerFetchPersonPhotos,
} from "./workers";

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

export function* watcherGetPersonFriends() {
   yield takeLatest(sagasConstantsPerson.SAGA_GET_PERSON_FRIENDS, workerGetPersonFriends);
}

export function* watcherGetPersonPhotos() {
   yield takeLatest(sagasConstantsPerson.SAGA_GET_PERSON_PHOTOS, workerFetchPersonPhotos);
}

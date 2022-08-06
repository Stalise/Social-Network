import { call, put } from "redux-saga/effects";

import { workerGetUserData } from "store/sagas/user-saga/workers";
import { workerGetUserPosts } from "store/sagas/post-saga/workers";
import { workerGetFriends } from "store/sagas/friends-saga/workers";
import { workerGetChats } from "store/sagas/chats-saga/workers";
import { workerFetchPhotos } from "store/sagas/photo-saga/workers";
import { workerGetPersonData, workerGetPersonPosts, workerGetPersonFriends, workerFetchPersonPhotos } from "store/sagas/person-saga/workers";
import { changeUserStatusAction } from "store/slices/user-slice";
import { changePersonStatusAction } from "store/slices/person-slice";
import { IWorker } from "types/helpers";

// общая загрузка данных в одном воркере
export function* workerAllUserParams() {
   yield put(changeUserStatusAction("data"));
   yield call(workerGetUserData);
   yield call(workerGetUserPosts);
   yield call(workerGetFriends);
   yield call(workerGetChats);
   yield call(workerFetchPhotos);
   yield put(changeUserStatusAction("ready"));
}

export function* workerAllPersonParams(data: IWorker<string>) {
   yield put(changePersonStatusAction("data"));
   yield call(workerGetPersonData, data);
   yield call(workerGetPersonPosts, data);
   yield call(workerGetPersonFriends, data);
   yield call(workerFetchPersonPhotos, data);
   yield put(changePersonStatusAction("ready"));
}

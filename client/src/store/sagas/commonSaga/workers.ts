import { call, put } from "redux-saga/effects";

import { workerGetUserData } from "store/sagas/userSaga/workers";
import { workerGetUserPosts } from "store/sagas/postSaga/workers";
import { workerGetFriends } from "store/sagas/friendSaga/workers";
import { workerGetChats } from "store/sagas/chatsSaga/workers";
import { workerGetPersonData, workerGetPersonPosts } from "store/sagas/personSaga/workers";
import { changeUserStatusAction } from "store/slices/UserSlice/UserSlice";
import { changePersonStatusAction } from "store/slices/PersonSlice/PersonSlice";
import { IWorker } from "types/helpers";

// общая загрузка данных в одном воркере
export function* workerAllUserParams() {
   yield put(changeUserStatusAction("data"));
   yield call(workerGetUserData);
   yield call(workerGetUserPosts);
   yield call(workerGetFriends);
   yield call(workerGetChats);
   yield put(changeUserStatusAction("ready"));
}

export function* workerAllPersonParams(data: IWorker<string>) {
   yield put(changePersonStatusAction("data"));
   yield call(workerGetPersonData, data);
   yield call(workerGetPersonPosts, data);
   yield put(changePersonStatusAction("ready"));
}

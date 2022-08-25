import { takeLatest } from 'redux-saga/effects';

import { sagasConstantsFriend } from 'data/constants/saga';

import { workerAcceptFriend, workerCreateFriend, workerDeleteFriend, workerGetFriends } from './workers';

export function* watcherGetFriends() {
   yield takeLatest(sagasConstantsFriend.SAGA_GET_FRIENDS, workerGetFriends);
}

export function* watcherCreateFriend() {
   yield takeLatest(sagasConstantsFriend.SAGA_CREATE_FRIEND, workerCreateFriend);
}

export function* watcherAcceptFriend() {
   yield takeLatest(sagasConstantsFriend.SAGA_ACCEPT_FRIEND, workerAcceptFriend);
}

export function* watcherDeleteFriend() {
   yield takeLatest(sagasConstantsFriend.SAGA_DELETE_FRIEND, workerDeleteFriend);
}

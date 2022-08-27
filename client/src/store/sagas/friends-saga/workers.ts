import { call, put, select } from 'redux-saga/effects';

import { friendApi } from 'api/friend-api';
import { apiResponsesMessage } from 'data/constants/api';
import { addFriend, addFriends, changeFriendStatus, deleteFriend } from 'store/slices/friends-slice';
import { changeAuthUserAction } from 'store/slices/user-slice';
import { IFriend } from 'types/common';
import { IWorker } from 'types/helpers';

export function* workerGetFriends() {
   const { username } = yield select(store => store.userSlice.data);

   const response: string | IFriend[] = yield call(friendApi.getFriends, username);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      return;
   } else if (typeof (response) !== 'string') {
      yield put(addFriends(response));
   }
};

export function* workerCreateFriend(data: IWorker<string>) {
   const { friends } = yield select(store => store.userSlice);

   const response: string | IFriend = yield call(friendApi.createFriend, data.payload);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      return;
   } else if (typeof (response) === 'string') {
      let friend = friends.filter((elem: IFriend) => elem.username === data.payload);
      friend = { ...friend[0] };
      friend.status = response;

      yield put(changeFriendStatus(friend));
   } else if (typeof (response) !== 'string') {
      yield put(addFriend(response));
   }
};

export function* workerAcceptFriend(data: IWorker<string>) {
   const { friends } = yield select(store => store.userSlice);

   const response: string = yield call(friendApi.acceptFriend, data.payload);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      return;
   } else if (response === apiResponsesMessage.success) {
      let friend = friends.filter((elem: IFriend) => elem.username === data.payload);
      friend = { ...friend[0] };
      friend.status = 'friend';

      yield put(changeFriendStatus(friend));
   }
};

export function* workerDeleteFriend(data: IWorker<string>) {
   const response: string = yield call(friendApi.deleteFriend, data.payload);

   if (response === apiResponsesMessage.needAuth) yield put(changeAuthUserAction(false));
   else if (response === apiResponsesMessage.unexpected) return;

   if (response === apiResponsesMessage.success) {
      yield put(deleteFriend(data.payload));
   }
};

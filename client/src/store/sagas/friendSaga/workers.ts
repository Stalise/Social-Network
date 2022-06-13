import { call, put, select } from "redux-saga/effects";

import { changeAuthUserAction, addFriends, addFriend, changeFriendStatus, deleteFriend } from "store/slices/UserSlice/UserSlice";
import { friendApi } from "api/friendApi";
import { apiResponsesMessage } from "mock/constants/api";
import { IWorker } from "types/helpers";
import { IFriend } from "types/common";

export function* workerGetFriends() {
   const { username } = yield select(store => store.userSlice.data);

   const response: string | IFriend[] = yield call(friendApi.getFriends, username);

   if (response === apiResponsesMessage.needAuth) yield put(changeAuthUserAction(false));
   else if (response === apiResponsesMessage.unexpected) return;

   if (typeof (response) !== "string") {
      yield put(addFriends(response));
   }
};

export function* workerCreateFriend(data: IWorker<string>) {
   const { username } = yield select(store => store.userSlice.data);
   const { friends } = yield select(store => store.userSlice);

   const response: string | IFriend = yield call(friendApi.createFriend, [username, data.payload]);

   if (response === apiResponsesMessage.needAuth) yield put(changeAuthUserAction(false));
   else if (response === apiResponsesMessage.unexpected) return;

   if (typeof (response) === "string") {
      let friend = friends.filter((elem: IFriend) => elem.username === data.payload);
      friend = { ...friend[0] };

      yield put(changeFriendStatus(friend));
   } else {
      yield put(addFriend(response));
   }
};

export function* workerAcceptFriend(data: IWorker<string>) {
   const { username } = yield select(store => store.userSlice.data);
   const { friends } = yield select(store => store.userSlice);

   const response: string = yield call(friendApi.acceptFriend, [username, data.payload]);

   if (response === apiResponsesMessage.needAuth) yield put(changeAuthUserAction(false));
   else if (response === apiResponsesMessage.unexpected) return;

   if (response === apiResponsesMessage.success) {
      let friend = friends.filter((elem: IFriend) => elem.username === data.payload);
      friend = { ...friend[0] };
      friend.status = "friend";

      yield put(changeFriendStatus(friend));
   }
};

export function* workerDeleteFriend(data: IWorker<string>) {
   const { username } = yield select(store => store.userSlice.data);

   const response: string = yield call(friendApi.deleteFriend, [username, data.payload]);

   if (response === apiResponsesMessage.needAuth) yield put(changeAuthUserAction(false));
   else if (response === apiResponsesMessage.unexpected) return;

   if (response === apiResponsesMessage.success) {
      yield put(deleteFriend(data.payload));
   }
};
import { call, put, select } from "redux-saga/effects";

import { changeAuthUserAction } from "store/slices/user-slice";
import { addPersonDataAction, addPersonPostsAction, changePersonLikePostAction, addFriends, addPhotos } from "store/slices/person-slice";
import { personApi } from "api/person-api";
import { postApi } from "api/post-api";
import { apiResponsesMessage } from "data/constants/api";
import { IUserData, IPost, ILike, IFriend, IPhoto } from "types/common";
import { IWorker } from "types/helpers";

export function* workerGetPersonData(data: IWorker<string>) {
   const response: IUserData | string = yield call(personApi.getPersonData, data.payload);

   if (response === apiResponsesMessage.needAuth) yield put(changeAuthUserAction(false));
   else if (response === apiResponsesMessage.unexpected) return;

   if (typeof (response) !== "string") {
      yield put(addPersonDataAction(response));
   }
};

export function* workerGetPersonPosts(data: IWorker<string>) {
   const response: IPost[] | string = yield call(personApi.getPersonPosts, data.payload);

   if (response === apiResponsesMessage.needAuth) yield put(changeAuthUserAction(false));
   else if (response === apiResponsesMessage.unexpected) return;

   if (typeof (response) !== "string") {
      yield put(addPersonPostsAction(response));
   }
}

export function* workerCreatePersonLikePost(data: IWorker<ILike>) {
   const response: string = yield call(postApi.createLike, data.payload);

   if (response === apiResponsesMessage.success) {
      const { posts } = yield select(store => store.personSlice);

      let currentPost = posts.filter((elem: IPost) => elem.id === data.payload.postId);
      currentPost = { ...currentPost[0] };
      currentPost.isLike = true;
      currentPost.likes += 1;

      yield put(changePersonLikePostAction(currentPost));
   }

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   }
};

export function* workerDeletePersonLikePost(data: IWorker<ILike>) {
   const response: string = yield call(postApi.deleteLike, data.payload);

   if (response === apiResponsesMessage.success) {
      const { posts } = yield select(store => store.personSlice);

      let currentPost = posts.filter((elem: IPost) => elem.id === data.payload.postId);
      currentPost = { ...currentPost[0] };
      currentPost.isLike = false;
      currentPost.likes -= 1;

      yield put(changePersonLikePostAction(currentPost));
   }

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   }
};

export function* workerGetPersonFriends(data: IWorker<string>) {
   const response: string | IFriend[] = yield call(personApi.getPersonFriends, data.payload);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      return;
   } else if (typeof (response) !== "string") {
      yield put(addFriends(response));
   }
};

export function* workerFetchPersonPhotos(data: IWorker<string>) {
   const response: IPhoto[] | string = yield call(personApi.getPersonPhotos, data.payload);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      return;
   } else if (typeof (response) !== "string") {
      yield put(addPhotos(response));
   }
};

import { call, put, select } from "redux-saga/effects";

import { changeAuthUserAction } from "store/slices/UserSlice/UserSlice";
import { addPersonDataAction, addPersonPostsAction, changePersonLikePostAction } from "store/slices/PersonSlice/PersonSlice";
import { userApi } from "api/userApi";
import { postApi } from "api/postApi";
import { apiResponsesMessage } from "mock/constants/api";
import { IUserData, IPost, ILike } from "types/common";
import { IWorker } from "types/helpers";

export function* workerGetPersonData(data: IWorker<string>) {
   const response: IUserData | string = yield call(userApi.getUserData, data.payload);

   if (response === apiResponsesMessage.needAuth) yield put(changeAuthUserAction(false));
   else if (response === apiResponsesMessage.unexpected) return;

   if (typeof (response) !== "string") {
      yield put(addPersonDataAction(response));
   }
};

export function* workerGetPersonPosts(data: IWorker<string>) {
   const { username } = yield select(store => store.userSlice.data);

   const response: IPost[] | string = yield call(postApi.getPosts, [username, data.payload]);

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
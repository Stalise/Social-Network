import { call, put } from "redux-saga/effects";

import { changeAuthUserAction } from "store/slices/UserSlice/UserSlice";
import { addPostsAction } from "store/slices/PostsSlice/PostsSlice";
import { postApi } from "api/postApi";
import { apiResponsesMessage } from "mock/constants/api";
import { IPost } from "types/user";

export function* workerGetUserPosts() {
   const response: IPost[] | string = yield call(postApi.getPosts);

   if (typeof (response) !== "string") {
      yield put(addPostsAction(response));
   }

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   }
};
import { call, put } from "redux-saga/effects";

import { changeAuthUserAction } from "store/slices/UserSlice/UserSlice";
import { addPostsAction, addPostAction, changeStatusAction } from "store/slices/PostsSlice/PostsSlice";
import { postApi } from "api/postApi";
import { apiResponsesMessage } from "mock/constants/api";
import { IPost } from "types/user";
import { IWorker } from "types/common";
import { INewPostData } from "components/MainPage/NewPost/types";

export function* workerGetUserPosts() {
   const response: IPost[] | string = yield call(postApi.getPosts);

   if (typeof (response) !== "string") {
      yield put(addPostsAction(response));
   }

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   }
};

export function* workerCreatePost(data: IWorker<INewPostData>) {
   yield put(changeStatusAction("create"));

   const response: IPost | string = yield call(postApi.createPost, data.payload);

   if (typeof (response) !== "string") {
      yield put(addPostAction(response));
   }

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   }

   yield put(changeStatusAction("ready"));
};
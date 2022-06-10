import { call, put, select } from "redux-saga/effects";

import { changeAuthPersonAction } from "store/slices/PersonSlice/PersonSlice";
import { addPostsAction, addPostAction, deletePostAction, changePersonStatusAction, changeLikePostAction } from "store/slices/PostsSlice/PostsSlice";
import { postApi } from "api/postApi";
import { apiResponsesMessage } from "mock/constants/api";
import { IPost, ILike } from "types/common";
import { IWorker } from "types/helpers";
import { INewPostData } from "components/MainPage/NewPost/types";

export function* workerGetUserPosts() {
   const response: IPost[] | string = yield call(postApi.getPosts);

   if (typeof (response) !== "string") {
      yield put(addPostsAction(response));
   }

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthPersonAction(false));
   }
};

export function* workerCreatePost(data: IWorker<INewPostData>) {
   yield put(changePersonStatusAction("create"));

   const response: IPost | string = yield call(postApi.createPost, data.payload);

   if (typeof (response) !== "string") {
      yield put(addPostAction(response));
   }

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthPersonAction(false));
   }

   yield put(changePersonStatusAction("ready"));
};

export function* workerDeletePost(data: IWorker<number>) {
   const response: string = yield call(postApi.deletePost, data.payload);

   if (response === apiResponsesMessage.success) {
      yield put(deletePostAction(data.payload));
   }

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthPersonAction(false));
   }
};

export function* workerCreateLike(data: IWorker<ILike>) {
   const response: string = yield call(postApi.createLike, data.payload);

   if (response === apiResponsesMessage.success) {
      const { posts } = yield select(store => store.postsSlice);

      let currentPost = posts.filter((elem: IPost) => elem.id === data.payload.postId);
      currentPost = { ...currentPost[0] };
      currentPost.isLike = true;
      currentPost.likes += 1;

      yield put(changeLikePostAction(currentPost));
   }

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthPersonAction(false));
   }
};

export function* workerDeleteLike(data: IWorker<ILike>) {
   const response: string = yield call(postApi.deleteLike, data.payload);

   if (response === apiResponsesMessage.success) {
      const { posts } = yield select(store => store.postsSlice);

      let currentPost = posts.filter((elem: IPost) => elem.id === data.payload.postId);
      currentPost = { ...currentPost[0] };
      currentPost.isLike = false;
      currentPost.likes -= 1;

      yield put(changeLikePostAction(currentPost));
   }

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthPersonAction(false));
   }
};
import { call, put, select } from 'redux-saga/effects';

import { postApi } from 'api/post-api';
import { apiResponsesMessage } from 'data/constants/api';
import { addPostAction, addPostsAction, changeLikePostAction, changePostStatusAction, deletePostAction } from 'store/slices/posts-slice';
import { changeAuthUserAction } from 'store/slices/user-slice';
import { ILike, IPost } from 'types/common';
import { IWorker } from 'types/helpers';

import { INewPostData } from 'components/main-page/new-post/types';

export function* workerGetUserPosts() {
   const response: IPost[] | string = yield call(postApi.getPosts);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      return;
   } else if (typeof (response) !== 'string') {
      yield put(addPostsAction(response));
   }
};

export function* workerCreatePost(data: IWorker<INewPostData>) {
   yield put(changePostStatusAction('create'));

   const response: IPost | string = yield call(postApi.createPost, data.payload);

   if (typeof (response) !== 'string') {
      yield put(addPostAction(response));
   }

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   }

   yield put(changePostStatusAction('ready'));
};

export function* workerDeletePost(data: IWorker<number>) {
   const response: string = yield call(postApi.deletePost, data.payload);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      return;
   } else if (response === apiResponsesMessage.success) {
      yield put(deletePostAction(data.payload));
   }
};

export function* workerCreateLike(data: IWorker<ILike>) {
   const response: string = yield call(postApi.createLike, data.payload);

   if (response === apiResponsesMessage.needAuth) {
      yield put(changeAuthUserAction(false));
   } else if (response === apiResponsesMessage.unexpected) {
      return;
   } else if (response === apiResponsesMessage.success) {
      const { posts } = yield select(store => store.postsSlice);

      let currentPost = posts.filter((elem: IPost) => elem.id === data.payload.postId);
      currentPost = { ...currentPost[0] };
      currentPost.isLike = true;
      currentPost.likes += 1;

      yield put(changeLikePostAction(currentPost));
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
      yield put(changeAuthUserAction(false));
   }
};

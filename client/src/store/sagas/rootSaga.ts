import { call, spawn, all } from "redux-saga/effects";

import { watcherGetUserData, watcherCheckAuth, watcherAuthUser, watcherLogoutUser, watcherRegUser } from './userSaga/watchers';
import { watcherGetUserPosts, watcherCreatePost, watcherCreateLike, watcherDeletePost, watcherDeleteLike } from './postSaga/watchers';
import { watcherGetPersonData, watcherGetPersonPosts, watcherCreatePostLike, watcherDeletePostLike } from "./personSaga/watchers";
import { watcherGetFriends, watcherCreateFriend, watcherAcceptFriend, watcherDeleteFriend } from "./friendSaga/watchers";
import { watcherGetChats, watcherCreateChat, watcherDeleteChat, watcherCreateMessage, watcherGetMessage } from "./chatsSaga/watchers";
import { watcherAllUserParams, watcherAllPersonParams } from "./commonSaga/watchers";

const userSagas = [watcherGetUserData, watcherCheckAuth, watcherAuthUser, watcherLogoutUser, watcherRegUser];
const postsSagas = [watcherGetUserPosts, watcherCreatePost, watcherCreateLike, watcherDeletePost, watcherDeleteLike];
const personSagas = [watcherGetPersonData, watcherGetPersonPosts, watcherCreatePostLike, watcherDeletePostLike];
const friendSagas = [watcherGetFriends, watcherCreateFriend, watcherAcceptFriend, watcherDeleteFriend];
const chatSagas = [watcherGetChats, watcherCreateChat, watcherDeleteChat, watcherCreateMessage, watcherGetMessage];
const commonSagas = [watcherAllUserParams, watcherAllPersonParams];

export default function* rootSaga(): any {

   const sagas = [
      ...userSagas,
      ...postsSagas,
      ...personSagas,
      ...friendSagas,
      ...chatSagas,
      ...commonSagas,
   ];

   const retrySagas = yield sagas.map(saga => {
      // если сага возвращает ошибку, то её вызывает еще раз.
      return spawn(function* startSagas() {
         while (true) {
            try {
               yield call(saga);
               // если в catch не сделать break/исправить вызов саги, то может быть бесконечный цикл вызова
            } catch (e) {
               break;
            }
         }
      });
   });

   yield all(retrySagas);
}
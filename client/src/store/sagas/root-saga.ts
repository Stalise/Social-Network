import { call, spawn, all } from "redux-saga/effects";

import { watcherGetUserData, watcherCheckAuth, watcherAuthUser, watcherLogoutUser, watcherRegUser } from './user-saga/watchers';
import { watcherGetUserPosts, watcherCreatePost, watcherCreateLike, watcherDeletePost, watcherDeleteLike } from './post-saga/watchers';
import { watcherGetPersonData, watcherGetPersonPosts, watcherCreatePostLike, watcherDeletePostLike, watcherGetPersonFriends, watcherGetPersonPhotos } from "./person-saga/watchers";
import { watcherGetFriends, watcherCreateFriend, watcherAcceptFriend, watcherDeleteFriend } from "./friends-saga/watchers";
import { watcherGetChats, watcherCreateChat, watcherDeleteChat, watcherCreateMessage, watcherGetMessage } from "./chats-saga/watchers";
import { watcherAddPhoto, watcherGetPhotos, watcherDeletePhoto } from "./photo-saga/watchers";
import { watcherAllUserParams, watcherAllPersonParams } from "./common-saga/watchers";

const userSagas = [watcherGetUserData, watcherCheckAuth, watcherAuthUser, watcherLogoutUser, watcherRegUser];
const postsSagas = [watcherGetUserPosts, watcherCreatePost, watcherCreateLike, watcherDeletePost, watcherDeleteLike];
const personSagas = [
   watcherGetPersonData,
   watcherGetPersonPosts,
   watcherCreatePostLike,
   watcherDeletePostLike,
   watcherGetPersonFriends,
   watcherGetPersonPhotos,
];
const friendSagas = [watcherGetFriends, watcherCreateFriend, watcherAcceptFriend, watcherDeleteFriend];
const chatSagas = [watcherGetChats, watcherCreateChat, watcherDeleteChat, watcherCreateMessage, watcherGetMessage];
const photoSagas = [watcherAddPhoto, watcherGetPhotos, watcherDeletePhoto];
const commonSagas = [watcherAllUserParams, watcherAllPersonParams];

export default function* rootSaga(): any {

   const sagas = [
      ...userSagas,
      ...postsSagas,
      ...personSagas,
      ...friendSagas,
      ...chatSagas,
      ...photoSagas,
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
// TODO: попробовать реализацию через массовый импорт import * from ....

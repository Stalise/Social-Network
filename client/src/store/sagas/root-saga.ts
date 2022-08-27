import { all, call, spawn } from 'redux-saga/effects';

import { watcherCreateChat, watcherCreateMessage, watcherDeleteChat, watcherGetChats, watcherGetMessage } from './chats-saga/watchers';
import { watcherAllPersonParams, watcherAllUserParams } from './common-saga/watchers';
import { watcherAcceptFriend, watcherCreateFriend, watcherDeleteFriend, watcherGetFriends } from './friends-saga/watchers';
import { watcherCreatePostLike, watcherDeletePostLike, watcherGetPersonData, watcherGetPersonFriends, watcherGetPersonPhotos, watcherGetPersonPosts } from './person-saga/watchers';
import { watcherAddPhoto, watcherDeletePhoto, watcherGetPhotos } from './photo-saga/watchers';
import { watcherCreateLike, watcherCreatePost, watcherDeleteLike, watcherDeletePost, watcherGetUserPosts } from './post-saga/watchers';
import { watcherAuthUser, watcherCheckAuth, watcherGetUserData, watcherLogoutUser, watcherRegUser } from './user-saga/watchers';

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

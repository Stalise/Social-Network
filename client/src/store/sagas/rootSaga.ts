import { call, spawn, all } from "redux-saga/effects";
import { watcherGetUserData, watcherCheckAuth, watcherAuthUser, watcherLogoutUser, watcherRegUser } from './userSaga/watchers';
import { watcherGetUserPosts, watcherCreatePost } from './postSaga/watchers';

const userSagas = [watcherGetUserData, watcherCheckAuth, watcherAuthUser, watcherLogoutUser, watcherRegUser];
const postsSagas = [watcherGetUserPosts, watcherCreatePost];

export default function* rootSaga(): any {

   const sagas = [...userSagas, ...postsSagas];

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
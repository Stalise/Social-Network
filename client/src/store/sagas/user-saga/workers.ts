import { call, put, select } from 'redux-saga/effects';

import { userApi } from 'api/user-api';
import { apiResponsesMessage } from 'data/constants/api';
import { addUserDataAction, addUsernameAction, changeAuthUserAction, changeUserStatusAction } from 'store/slices/user-slice';
import { IUserData } from 'types/common';
import { IWorker } from 'types/helpers';

import { IAuthFormState } from 'components/auth-page/auth-form/types';
import { IRegFormState } from 'components/auth-page/reg-form/types';

export function* workerCheckAuth() {
   const response: string = yield call(userApi.checkAuth);

   if (response === apiResponsesMessage.needAuth ) {
      yield put(changeUserStatusAction('ready'));
   } else if (response === apiResponsesMessage.unexpected) {
      yield put(changeUserStatusAction('ready'));
   } else {
      yield put(addUsernameAction(response));

      yield put(changeAuthUserAction(true));

      yield put(changeUserStatusAction('data'));
   }
};

export function* workerRegUser(data: IWorker<IRegFormState>) {
   yield put(changeUserStatusAction('auth'));

   const response: string = yield call<any>(userApi.regUser, data.payload);

   if (response === apiResponsesMessage.success) {
      yield put(addUsernameAction(data.payload.username));
      yield put(changeAuthUserAction(true));
   }

   yield put(changeUserStatusAction('ready'));
};

export function* workerAuthUser(data: IWorker<IAuthFormState>) {
   yield put(changeUserStatusAction('auth'));

   const response: string = yield call<any>(userApi.authUser, data.payload);

   if (response === apiResponsesMessage.success) {
      yield put(addUsernameAction(data.payload.username));
      yield put(changeAuthUserAction(true));
   }
   yield put(changeUserStatusAction('ready'));
}

export function* workerLogoutUser() {
   yield put(changeUserStatusAction('pending'));

   const response: string = yield call(userApi.logoutUser);

   if (response === apiResponsesMessage.success) {
      yield put(changeAuthUserAction(false));
   }

   yield put(changeUserStatusAction('ready'));
};

export function* workerGetUserData() {
   const { username } = yield select(store => store.userSlice.data);

   const response: IUserData | string = yield call(userApi.getUserData, username);

   if (response === apiResponsesMessage.needAuth) yield put(changeAuthUserAction(false));
   else if (response === apiResponsesMessage.unexpected) return;

   if (typeof (response) !== 'string') {
      yield put(addUserDataAction(response));
   }
};

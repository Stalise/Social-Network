import { takeLatest } from 'redux-saga/effects';

import { sagasConstantsPhoto } from 'data/constants/saga';

import { workerAddPhoto, workerDeletePhoto, workerFetchPhotos } from './workers';

export function* watcherGetPhotos() {
   yield takeLatest(sagasConstantsPhoto.SAGA_GET_PHOTOS, workerFetchPhotos);
}

export function* watcherAddPhoto() {
   yield takeLatest(sagasConstantsPhoto.SAGA_ADD_PHOTO, workerAddPhoto);
}

export function* watcherDeletePhoto() {
   yield takeLatest(sagasConstantsPhoto.SAGA_DELETE_PHOTO, workerDeletePhoto);
}

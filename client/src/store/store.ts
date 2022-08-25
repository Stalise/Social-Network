import createSagaMiddleware from 'redux-saga';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import rootSaga from './sagas/root-saga';
import chatsSlice from './slices/chats-slice';
import friendsSlice from './slices/friends-slice';
import personSlice from './slices/person-slice';
import photosSlice from './slices/photos-slice';
import postsSlice from './slices/posts-slice';
import userSlice from './slices/user-slice';

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
   userSlice,
   personSlice,
   friendsSlice,
   postsSlice,
   photosSlice,
   chatsSlice,
});

export const setupStore = (initialState = {}) => {
   return configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
      middleware: [sagaMiddleware],
   });
};

export const store = setupStore();

sagaMiddleware.run(rootSaga);

// типизируем стор и диспатчи
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

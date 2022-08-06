import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';

import userSlice from "./slices/user-slice";
import personSlice from "./slices/person-slice";
import friendsSlice from './slices/friends-slice';
import postsSlice from "./slices/posts-slice";
import chatsSlice from "./slices/chats-slice";
import photosSlice from "./slices/photos-slice";
import rootSaga from './sagas/root-saga';

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

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';

import userSlice from "./slices/UserSlice/UserSlice";
import personSlice from "./slices/PersonSlice/PersonSlice";
import postsSlice from "./slices/PostsSlice/PostsSlice";
import chatsSlice from "./slices/ChatsSlice/ChatsSlice";
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
   userSlice,
   personSlice,
   postsSlice,
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
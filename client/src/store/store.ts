import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';

import personSlice from "./slices/PersonSlice/PersonSlice";
import postsSlice from "./slices/PostsSlice/PostsSlice";
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
   personSlice,
   postsSlice,
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
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user-slice.ts'
import chatReducer from './reducers/chat-slise.ts'

import { vacancyApi } from '../modules/search/api/vacancy-api.ts'
import { authorizationApi } from '../modules/authorization-form'
import { chatApi } from '../modules/chat/api/chat-api.ts'

const rootReducer = combineReducers({
  userReducer,
  chatReducer,
  [vacancyApi.reducerPath]: vacancyApi.reducer,
  [authorizationApi.reducerPath]: authorizationApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat([vacancyApi.middleware, authorizationApi.middleware, chatApi.middleware])
    },
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
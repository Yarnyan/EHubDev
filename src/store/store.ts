import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user-slice.ts'
import chatReducer from './reducers/chat-slise.ts'
import { vacancyApi } from '../modules/search/api/vacancy-api.ts'
import { authorizationApi } from '../modules/authorization-form'
import { userApi } from '../api'

const rootReducer = combineReducers({
  userReducer,
  chatReducer,
  [vacancyApi.reducerPath]: vacancyApi.reducer,
  [authorizationApi.reducerPath]: authorizationApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat([vacancyApi.middleware, authorizationApi.middleware, userApi.middleware])
    },
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
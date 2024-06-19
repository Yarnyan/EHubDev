import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user-slice.ts'
import chatReducer from './reducers/chat-slise.ts'
import { vacancyApi } from '../modules/search/api/vacancy-api.ts'
import { authorizationApi } from '../modules/authorization-form'
import { userApi } from '../api'
import { profileApi } from '../modules/profile/api/profile-api.ts'

const rootReducer = combineReducers({
  userReducer,
  chatReducer,
  [vacancyApi.reducerPath]: vacancyApi.reducer,
  [authorizationApi.reducerPath]: authorizationApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat([
        vacancyApi.middleware,
        authorizationApi.middleware,
        userApi.middleware,
        profileApi.middleware
      ])
    },
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
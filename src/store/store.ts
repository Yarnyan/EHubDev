import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user-slice.ts'
import chatReducer from './reducers/chat-slise.ts'
import { vacancyApi } from '../modules/search/api/vacancy-api.ts'
import { authorizationApi } from '../modules/authorization-form'
import { chatApi } from '../modules/chat/api/chat-api.ts'
import { userApi } from '../api/user-api.ts'
import { profileApi } from '../modules/profile/api/profile-api.ts'
import { portfolioApi } from '../modules/portfolio/api/portfolio-api.ts'


const rootReducer = combineReducers({
  userReducer,
  chatReducer,
  [vacancyApi.reducerPath]: vacancyApi.reducer,
  [authorizationApi.reducerPath]: authorizationApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [portfolioApi.reducerPath]: portfolioApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat([
        vacancyApi.middleware,
        authorizationApi.middleware,
        chatApi.middleware,
        userApi.middleware,
        portfolioApi.middleware
      ])
    },
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
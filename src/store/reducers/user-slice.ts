import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../models/User.ts'
import { authorizationApi } from '../../modules/authorization-form'
import { userApi } from '../../api'
import { profileApi } from '../../modules/profile/api/profile-api.ts'
import { IVacancy } from '../../models/Vacancy.ts'
import { vacancyApi } from '../../api/vacancy-api.ts'

interface UserSliceState {
  user: User | null | 'unknown'
  otherUsers: User[]
  vacancyList: IVacancy[]
}

const initialState: UserSliceState = {
  user: 'unknown',
  otherUsers: [],
  vacancyList: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeOtherUsers: (state) => {
      console.log('Removing other users...');
      state.otherUsers = [];
      console.log('Other users removed:', state.otherUsers);
    }
  },
  extraReducers: builder => {
    builder.addMatcher(authorizationApi.endpoints.registration.matchFulfilled, (_, action) => {
      localStorage.setItem('token', action.payload.token)
    })
    builder.addMatcher(authorizationApi.endpoints.authorization.matchFulfilled, (_, action) => {
      localStorage.setItem('token', action.payload.token)
    })
    builder.addMatcher(userApi.endpoints.getCurrentUserData.matchFulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addMatcher(profileApi.endpoints.putCurrentUserData.matchFulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addMatcher(userApi.endpoints.getCurrentUserData.matchRejected, (state) => {
      state.user = null
    })
    builder.addMatcher(userApi.endpoints.getAllUsers.matchFulfilled, (state, action) => {
      state.otherUsers = action.payload
    })
    builder.addMatcher(vacancyApi.endpoints.getAllVacancy.matchFulfilled, (state, action) => {
      state.vacancyList = action.payload
    })
    builder.addMatcher(userApi.endpoints.getUserById.matchFulfilled, (state, action) => {
      state.otherUsers = []
      state.otherUsers.push(action.payload)
    })
  },
})

export const {removeOtherUsers} = userSlice.actions
export default userSlice.reducer

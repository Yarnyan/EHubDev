import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../models/User.ts'
import { authorizationApi } from '../../modules/authorization-form'
import { userApi } from '../../api'

interface UserSliceState {
  user: User | null | 'unknown'
}

const initialState: UserSliceState = {
  user: {id: '1', type: 'user'}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

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
    // builder.addMatcher(userApi.endpoints.getCurrentUserData.matchRejected, (state) => {
    //   state.user = null
    // })
  },
})

export default userSlice.reducer
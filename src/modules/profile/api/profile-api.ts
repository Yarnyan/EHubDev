import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery, jsonRequestHeaders } from '../../../api'
import { User } from '../../../models/User.ts'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  endpoints: (build) => ({
    putCurrentUserData: build.mutation<User, {body: string, token: string}>({
      query: (data) => ({
        url: 'api/User/updateUser',
        headers: { 'Authorization': `bearer ${data.token}` },
        method: 'PUT',
        body: data.body,
      }),
    }),
  }),
})

export const { usePutCurrentUserDataMutation } = profileApi

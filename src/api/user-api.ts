import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-query-instance.ts'
import { jsonRequestHeaders } from './request-headers.ts'
import { User } from '../models/User.ts'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  endpoints: (build) => ({
    getCurrentUserData: build.query<User, string | null>({
      query: (token) => ({
        url: 'api/User/getUser',
        headers: { 'Authorization': `bearer ${token}` },
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetCurrentUserDataQuery } = userApi

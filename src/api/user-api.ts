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
    getAllUsers: build.query<User[], { token: string, params: string }>({
      query: (data) => ({
        url: `api/User/getUsers`,
        method: 'GET',
        headers: { 'Authorization': `bearer ${data.token}` },
        params: data.params,
      }),
    }),
    getUserById: build.query<User, { token: string, params: string }>({
      query: (data) => ({
        url: `api/User/getUserById`,
        method: 'GET',
        headers: { 'Authorization': `bearer ${data.token}` },
        params: data.params,
      }),
    }),
  }),
})

export const { useGetCurrentUserDataQuery, useLazyGetCurrentUserDataQuery, useLazyGetAllUsersQuery, useLazyGetUserByIdQuery } = userApi

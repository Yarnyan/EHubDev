import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-query-instance.ts'
import { jsonRequestHeaders } from './request-headers.ts'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  endpoints: (build) => ({
    refreshToken: build.mutation<string, void>({
      query: () => ({
        url: 'users/refresh',
        method: 'POST',
      }),
      transformResponse: (response: AuthResponse) => {
        return response.accessToken
      },
    }),
  }),
})

export const { useRefreshTokenMutation } = userApi

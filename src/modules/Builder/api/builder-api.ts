import { createApi } from '@reduxjs/toolkit/query/react'
import { User } from '../../../models/User.ts'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const builderApi = createApi({
  reducerPath: 'builderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL, credentials: 'include'
  }),
  endpoints: (build) => ({
    uploadResume: build.mutation<User, {body: FormData, token: string}>({
      query: (data) => ({
        url: 'api/User/uploadResume',
        headers: { 'Authorization': `bearer ${data.token}`},
        method: 'PUT',
        body: data.body,
      }),
    }),
  }),
})

export const {} = profileApi

import { createApi } from '@reduxjs/toolkit/query/react'
import { User } from '../../../models/User.ts'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (build) => ({
    putCurrentUserData: build.mutation<User, {body: string, token: string}>({
      query: (data) => ({
        url: 'api/User/updateUser',
        headers: { 'Authorization': `bearer ${data.token}`, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        method: 'PUT',
        body: data.body,
      }),
    }),
    uploadAvatar: build.mutation<User, {body: FormData, token: string}>({
      query: (data) => ({
        url: 'api/User/uploadAvatar',
        headers: { 'Authorization': `bearer ${data.token}`, 'Content-Type': 'multipart/form-data' },
        method: 'PUT',
        body: data.body,
      }),
    }),
  }),
})

export const { usePutCurrentUserDataMutation, useUploadAvatarMutation } = profileApi

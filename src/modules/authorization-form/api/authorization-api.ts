import { createApi } from '@reduxjs/toolkit/query/react'
import { UserData } from '../types/User-data.ts'
import { baseQuery, jsonRequestHeaders } from '../../../api'

export const authorizationApi = createApi({
  reducerPath: 'authorizationApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  endpoints: (build) => ({
    registration: build.mutation<string, UserData>({
      query: (registrationData) => ({
        url: `users/registration`,
        method: 'POST',
        body: registrationData,
      }),
    }),
    authorization: build.mutation<string, UserData>({
      query: (authorizationData) => ({
        url: `users/login`,
        method: 'POST',
        body: authorizationData,
      }),
    })
  })
})

export const {useRegistrationMutation, useAuthorizationMutation} = authorizationApi
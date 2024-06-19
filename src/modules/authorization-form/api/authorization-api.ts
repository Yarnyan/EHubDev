import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery, jsonRequestHeaders } from '../../../api'
import { AuthResponse } from '../types/Auth-response.ts'

export const authorizationApi = createApi({
  reducerPath: 'authorizationApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  endpoints: (build) => ({
    registration: build.mutation<AuthResponse, string>({
      query: (registrationData) => ({
        url: `api/Auth/signUp`,
        method: 'POST',
        body: registrationData,
      }),
    }),
    authorization: build.mutation<AuthResponse, string>({
      query: (authorizationData) => ({
        url: `api/Auth/signIn`,
        method: 'POST',
        body: authorizationData,
      }),
    })
  })
})

export const {useRegistrationMutation, useAuthorizationMutation} = authorizationApi
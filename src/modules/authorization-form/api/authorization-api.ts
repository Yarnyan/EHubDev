import { createApi } from '@reduxjs/toolkit/query/react'
import { UserData } from '../types/User-data.ts'
import { baseQuery, jsonRequestHeaders } from '../../../api'

export const authorizationApi = createApi({
  reducerPath: 'authorizationApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  endpoints: (build) => ({
    registration: build.mutation<string, string>({
      query: (registrationData) => ({
        url: `api/Auth/signUp`,
        method: 'POST',
        body: registrationData,
      }),
    }),
    authorization: build.mutation<string, Omit<UserData, 'userType'>>({
      query: (authorizationData) => ({
        url: `api/Auth/signIn`,
        method: 'POST',
        body: authorizationData,
      }),
    })
  })
})

export const {useRegistrationMutation, useAuthorizationMutation} = authorizationApi
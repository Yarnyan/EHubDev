import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-query-instance.ts'
import { jsonRequestHeaders } from './request-headers.ts'

import { IVacancy } from '../models/Vacancy.ts'

export const vacancyApi = createApi({
  reducerPath: 'vacancyApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  endpoints: (build) => ({
    getVacancy: build.query<IVacancy, void>({
      query: () => ({
        url: '/api/Vacancy/getAll',
        method: 'GET',
      }),
    }),
    getUserById: build.query<IVacancy, number>({
        query: (id) => ({
          url: `/api/Vacancy/getById/${id}`,
          method: 'GET',
        }),
      }),
    createVacancy: build.mutation<string, IVacancy>({
      query: (vacancy) => ({
        url: '/api/Vacancy/create',
        method: 'POST',
        body: vacancy
      }),
    }),
    updateVacancy: build.mutation<string, IVacancy>({
      query: (vacancy) => ({
        url: '/api/Vacancy/update',
        method: 'PUT',
        body: vacancy
      }),
    })
  }),
})

export const { useGetVacancyQuery, useGetUserByIdQuery, useCreateVacancyMutation, useUpdateVacancyMutation } = vacancyApi

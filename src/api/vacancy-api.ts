import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-query-instance.ts'
import { jsonRequestHeaders } from './request-headers.ts'
import { CardData } from '../models/Card-data.ts'

export const vacancyApi = createApi({
  reducerPath: 'vacancyApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  tagTypes: ['Vacancy'],
  endpoints: (build) => ({
    createVacancyCard: build.mutation<void, {body: string, token: string | null}>({
      query: (data) => ({
        url: `api/Vacancy/create`,
        method: 'POST',
        body: data.body,
        headers: { 'Authorization': `bearer ${data.token}` },
      }),
      invalidatesTags: ['Vacancy'],
    }),
    getVacancyById: build.query<CardData[], number | string>({
      query: (id) => ({
        url: `api/Vacancy/getByUserId?id=${id}`,
        method: 'GET',
      }),
      providesTags: ['Vacancy'],
    })
  })
})

export const {useCreateVacancyCardMutation, useLazyGetVacancyByIdQuery} = vacancyApi
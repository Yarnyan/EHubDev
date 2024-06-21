import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './base-query-instance.ts'
import { jsonRequestHeaders } from './request-headers.ts'
import { CardData } from '../models/Card-data.ts'
import { IVacancy } from '../models/Vacancy.ts'

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
    }),
    getAllVacancy: build.query<IVacancy[], {token: string, params: string}>({
      query: (data) => ({
        url: `api/Vacancy/getAll`,
        method: 'GET',
        headers: { 'Authorization': `bearer ${data.token}` },
        params: data.params
      }),
      providesTags: ['Vacancy'],
    }),
    deleteVacancy: build.mutation<void, void>({
      query: (data, id) => ({
        url: `api/Vacancy/removeById`,
        method: 'DELETE',
        headers: { 'Authorization': `bearer ${data.token}` },
        params: data.params
      }),
      invalidatesTags: ['Vacancy'],
    }),
  })
})

export const { useCreateVacancyCardMutation, useLazyGetVacancyByIdQuery, useLazyGetAllVacancyQuery, useDeleteVacancyMutation } = vacancyApi
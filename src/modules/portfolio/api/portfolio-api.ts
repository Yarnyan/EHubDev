import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery, jsonRequestHeaders } from '../../../api'
import { CardData } from '../../../models/Card-data.ts'

export const portfolioApi = createApi({
  reducerPath: 'portfolioApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  tagTypes: ['Portfolio'],
  endpoints: (build) => ({
    createPortfolioCard: build.mutation<void, {body: string, token: string | null}>({
      query: (data) => ({
        url: `api/Portfolio/create`,
        method: 'POST',
        body: data.body,
        headers: { 'Authorization': `bearer ${data.token}` },
      }),
      invalidatesTags: ['Portfolio'],
    }),
    getPortfolioById: build.query<CardData[], number | string>({
      query: (id) => ({
        url: `api/Portfolio/getByUserId?id=${id}`,
        method: 'GET',
      }),
      providesTags: ['Portfolio'],
    })
  })
})

export const {useCreatePortfolioCardMutation, useLazyGetPortfolioByIdQuery} = portfolioApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../api/base-query-instance.ts'
import { jsonRequestHeaders } from '../../../api/request-headers.ts'

import { IVacancy } from '../../../models/Vacancy.ts'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQuery(jsonRequestHeaders),
  endpoints: (build) => ({
    getVacancy: build.query<IVacancy, void>({
      query: () => ({
        url: '/api/Vacancy/getAll',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetVacancyQuery } = chatApi

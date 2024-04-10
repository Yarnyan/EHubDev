import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { HeadersType } from './request-headers.ts'

export const baseQuery = (requestHeaders: HeadersType) => fetchBaseQuery({
  baseUrl: import.meta.env.VITE_AUTOMATION_API_URL, credentials: 'include',
  prepareHeaders: (headers) => {
    Object.entries(requestHeaders).map(([key, value]) => {
      headers.set(key, value)
    })
    return headers
  },
})
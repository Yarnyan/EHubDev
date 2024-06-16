import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { HeadersType } from './request-headers.ts'

export const baseQuery = (requestHeaders: HeadersType) => fetchBaseQuery({
  baseUrl: 'http://31.28.113.222:8444', // credentials: 'include'
  prepareHeaders: (headers) => {
    Object.entries(requestHeaders).map(([key, value]) => {
      headers.set(key, value)
    })
    return headers
  },
})
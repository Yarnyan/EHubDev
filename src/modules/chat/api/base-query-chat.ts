import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { HeadersType } from '../../../api/request-headers'
export const baseQueryChat = (requestHeaders: HeadersType) => fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_CHAT_URL,
  prepareHeaders: (headers) => {
    Object.entries(requestHeaders).map(([key, value]) => {
      headers.set(key, value)
    })
    return headers
  },
})
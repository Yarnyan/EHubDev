import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';;
export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
    tagTypes: ['Post'],
    endpoints: (builder) => ({

    })
})
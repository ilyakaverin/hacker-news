import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { sliceIntoChunks } from '../service'


export const hackerNewsApi = createApi({
  reducerPath: 'hackerNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hacker-news.firebaseio.com/v0' }),
  endpoints: (builder) => ({
    HackerNewsApiBestStories: builder.query({
      query: ({ order, limit }) => `/beststories.json?&orderBy="$${order}"&limitToFirst=${limit}`,
      transformResponse: (data: number[]) => sliceIntoChunks(data, 12)
    }),
    HackerNewsApiGetItem: builder.query({
        query: (id) => `/item/${id}.json`,

      })
  }),
})

export const { useHackerNewsApiBestStoriesQuery, useHackerNewsApiGetItemQuery } = hackerNewsApi

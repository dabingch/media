import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'

const albumsApi = createApi({
	reducerPath: 'albums', // Anything you want
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3005',
	}),
	endpoints(builder) {
		return {
			// Give a simple name and define query or mutation
			fetchAlbums: builder.query({
				// user is the argument to pass to the 'query' function
				query: (user) => {
					return {
						url: '/albums', // path for this request
						// query string for this request
						params: {
							userId: user.id,
						},
						// request method
						method: 'GET',
					}
				},
			}),
			addAlbum: builder.mutation({
				query: (user) => {
					return {
						url: '/albums',
						method: 'POST',
						body: {
							userId: user.id,
							title: faker.commerce.productName(),
						},
					}
				},
			}),
		}
	},
})

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi
export { albumsApi }

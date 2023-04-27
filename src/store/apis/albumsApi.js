import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'

const pause = (duration) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration)
	})
}

const albumsApi = createApi({
	reducerPath: 'albums', // Anything you want
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3005',
		fetchFn: async (...args) => {
			// Remove for production
			await pause(1000)
			return fetch(...args)
		},
	}),
	endpoints(builder) {
		return {
			// Give a simple name and define query or mutation
			fetchAlbums: builder.query({
				// * Instead of provide array to hardcode tags, we return a dynamic function
				// * user is a arg to pass to the useFetch function
				providesTags: (result, error, user) => {
					return [{ type: 'Album', id: user.id }]
				},
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
				// * Once call this mutation, useFetchAlbumsQuery will be ran again
				invalidatesTags: (result, error, user) => {
					return [{ type: 'Album', id: user.id }]
				},
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

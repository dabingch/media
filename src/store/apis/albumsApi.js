import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
		}
	},
})

export const { useFetchAlbumsQuery } = albumsApi
export { albumsApi }

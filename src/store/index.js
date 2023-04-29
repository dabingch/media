import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from './slices/usersSlice'
// Redux toolkit query
import { setupListeners } from '@reduxjs/toolkit/query'
import { albumsApi } from './apis/albumsApi'
import { photosApi } from './apis/photosApi'

export const store = configureStore({
	reducer: {
		users: usersReducer,
		// RTK query
		[albumsApi.reducerPath]: albumsApi.reducer, // key is the reducerPath
		[photosApi.reducerPath]: photosApi.reducer,
	},
	// For RTK query
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(albumsApi.middleware)
			.concat(photosApi.middleware)
	},
})

setupListeners(store.dispatch)

// Export from index.js and fetchUsers.js
// so that we can access from store
// It is a good practice to import all modules from store
export * from './thunks/fetchUsers'
export * from './thunks/addUser'
export * from './thunks/removeUser'
export {
	useAddAlbumMutation,
	useFetchAlbumsQuery,
	useRemoveAlbumMutation,
} from './apis/albumsApi'
export {
	useFetchPhotosQuery,
	useAddPhotoMutation,
	useRemovePhotoMutation,
} from './apis/photosApi'
